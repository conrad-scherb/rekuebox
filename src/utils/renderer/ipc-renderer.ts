import type { RekordboxXmlJson } from "../shared/xml-interfaces";

declare global {
    interface Window {
        ipcRenderer: IpcRenderer
    }

    interface IpcRenderer {
        importRekordboxXmlJson: (json: RekordboxXmlJson) => Promise<boolean>
    }
}

export const { ipcRenderer } = window;

export async function ipcSendJsonToDb(json: RekordboxXmlJson): Promise<void> {
    await ipcRenderer.importRekordboxXmlJson(json);
}