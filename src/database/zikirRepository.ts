import { getDB } from './db';
import { Zikir, ZikirFormData } from '../types';

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${mins}`;
};

export const getAll = async (): Promise<Zikir[]> => {
  const db = await getDB();
  const rows = await db.getAllAsync<any>(
    'SELECT * FROM zikirler ORDER BY created_at DESC'
  );
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    arabicName: r.arabic_name,
    count: r.count,
    target: r.target,
    createdAt: formatDate(r.created_at),
  }));
};

export const insert = async (data: ZikirFormData, count: number): Promise<number> => {
  const db = await getDB();
  const result = await db.runAsync(
    `INSERT INTO zikirler (name, arabic_name, count, target, created_at)
     VALUES (?, ?, ?, ?, ?)`,
    data.name,
    data.arabicName ?? '',
    count,
    data.target,
    new Date().toISOString()
  );
  return result.lastInsertRowId;
};

export const update = async (id: number, count: number, data?: ZikirFormData): Promise<void> => {
  const db = await getDB();
  if (data) {
    await db.runAsync(
      'UPDATE zikirler SET name = ?, arabic_name = ?, count = ?, target = ? WHERE id = ?',
      data.name,
      data.arabicName ?? '',
      count,
      data.target,
      id
    );
  } else {
    await db.runAsync('UPDATE zikirler SET count = ? WHERE id = ?', count, id);
  }
};

export const remove = async (id: number): Promise<void> => {
  const db = await getDB();
  await db.runAsync('DELETE FROM zikirler WHERE id = ?', id);
  // Eğer silinen zikir aktif olan zikirse, ayarı temizle
  const activeId = await getActiveZikirId();
  if (activeId === id) {
    await setActiveZikirId(null);
  }
};

export const setActiveZikirId = async (id: number | null): Promise<void> => {
  const db = await getDB();
  if (id !== null) {
    await db.runAsync(
      'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
      'active_zikir_id',
      String(id)
    );
  } else {
    await db.runAsync('DELETE FROM settings WHERE key = ?', 'active_zikir_id');
  }
};

export const getActiveZikirId = async (): Promise<number | null> => {
  const db = await getDB();
  const row = await db.getFirstAsync<any>(
    'SELECT value FROM settings WHERE key = ?',
    'active_zikir_id'
  );
  if (row && row.value) {
    return parseInt(row.value, 10);
  }
  return null;
};

export const getLastActiveZikir = async (): Promise<Zikir | null> => {
  const db = await getDB();
  const activeId = await getActiveZikirId();
  let row: any = null;

  if (activeId !== null) {
    row = await db.getFirstAsync<any>('SELECT * FROM zikirler WHERE id = ?', activeId);
  }

  if (!row) {
    row = await db.getFirstAsync<any>('SELECT * FROM zikirler ORDER BY created_at DESC LIMIT 1');
  }

  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    arabicName: row.arabic_name,
    count: row.count,
    target: row.target,
    createdAt: formatDate(row.created_at),
  };
};
