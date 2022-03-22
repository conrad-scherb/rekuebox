import type { RekordboxXmlJson } from "../shared/xml-interfaces";
import { Writable, writable } from "svelte/store";

export interface Store {
    xml: RekordboxXmlJson;
}

export const userStore: Writable<Partial<Store>> = writable({});