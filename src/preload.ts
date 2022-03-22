import Database from "better-sqlite3";
import { contextBridge, ipcRenderer } from "electron";
import type { RekordboxXmlJson } from "./utils/shared/xml-interfaces";

// Create a database
new Database('prisma/rekuebox.db')

// Expose Prisma db commands to renderer
contextBridge.exposeInMainWorld('ipcRenderer', {
    importRekordboxXmlJson: (xmlJson: RekordboxXmlJson) => ipcRenderer.invoke("importRekordboxXmlJson", xmlJson),
    loadJsonFromDb: () => ipcRenderer.invoke("loadJsonFromDb")
})

