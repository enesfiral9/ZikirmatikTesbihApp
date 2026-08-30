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
};
