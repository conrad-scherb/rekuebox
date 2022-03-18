const Database = require("better-sqlite3");
new Database('prisma/rekuebox.db', { verbose: console.log })