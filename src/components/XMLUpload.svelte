<script>
    // TODO: Typescriptify this file by creating a types file for the library
    import Dropzone from "svelte-file-dropzone";
    import { userStore } from "../utils/renderer/store";
    import { xmlToJson } from "../utils/renderer/xml-utils";
    import {
        ipcLoadJsonFromDb,
        ipcSendJsonToDb,
    } from "../utils/renderer/ipc-renderer";

    let state = "";

    function handleFilesSelect(e) {
        const { acceptedFiles, fileRejections } = e.detail;
        if (fileRejections.length === 1) {
            state = "rejected";
            return;
        }

        // Start processing the file
        state = "processing";
        let reader = new FileReader();
        reader.addEventListener("load", async (event) => {
            let res = xmlToJson(event.target.result);

            if (!res) {
                state = "rejected";
                return;
            }

            //userStore.set({ xml: res });
            //ipcSendJsonToDb(res);
            const result = await ipcLoadJsonFromDb();
            console.log(result);
        });
        reader.readAsText(acceptedFiles[0]);
    }
</script>

<div class="w-full h-full p-4">
    <Dropzone
        on:drop={handleFilesSelect}
        accept=".xml"
        containerClasses="w-full h-full flex justify-center items-center"
        containerStyles="border-radius: 8px;"
        multiple={false}
    >
        <div class="text-gray-500 text-center">
            <p>
                Upload your Rekordbox XML file by clicking or dragging it here
                to get started.
            </p>

            <p class="italic text-xs">
                Your Rekordbox XML file can be exported from rekordbox by going
                File > Export collection in xml format.
            </p>
            <p class="text-red-500">
                {#if state === "rejected"}
                    Make sure you upload a file with the .xml extension.
                {/if}
            </p>
            <p />
        </div>
    </Dropzone>
</div>
