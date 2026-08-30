import * as SQLite from 'expo-sqlite';
import { Zikir } from '../types';

let db: SQLite.SQLiteDatabase | null = null;

export const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('zikirmatik.db');
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS zikirler (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        name        TEXT    NOT NULL,
        arabic_name TEXT    DEFAULT '',
        count       INTEGER NOT NULL DEFAULT 0,
        target      INTEGER NOT NULL DEFAULT 33,
        created_at  TEXT    NOT NULL
      );
      CREATE TABLE IF NOT EXISTS settings (
        key         TEXT PRIMARY KEY,
        value       TEXT
      );
    `);
  }
  return db;
};
