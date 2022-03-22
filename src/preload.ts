import Database from "better-sqlite3";
import { exposeIpc } from "./utils/electron/ipc-main";

// Create a database
new Database('prisma/rekuebox.db')

// Expose Prisma db commands to renderer
exposeIpc();