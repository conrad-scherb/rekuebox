const Database = require("better-sqlite3");
const db = new Database('prisma/rekuebox.db', { verbose: console.log })

/*
const query = db.prepare(`CREATE TABLE IF contacts (
    contact_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL UNIQUE
)`);

query.run();*/

