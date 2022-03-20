import Database from 'better-sqlite3';

export function createDatabase() {
    const db = new Database('foobar.db');
}