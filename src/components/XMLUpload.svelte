<script lang="ts">
    import Dropzone, { DropResponse } from "svelte-file-dropzone";
    import { xmlToJson } from "../utils/renderer/xml-utils";
    import { ipcSendJsonToDb } from "../utils/renderer/ipc-renderer";
    import { getFileContents } from "../utils/shared/file-utils";
    import { userStore } from "../utils/renderer/store";

    enum xmlLoadStates {
        idle,
        rejected,
        loading,
        loaded,
    }

    let xmlLoadState: xmlLoadStates = xmlLoadStates.idle;

    async function handleFilesSelect(e: DropResponse<File>) {
        const { acceptedFiles, fileRejections } = e.detail;
        if (fileRejections.length === 1) {
            xmlLoadState = xmlLoadStates.rejected;
            return;
        }

        xmlLoadState = xmlLoadStates.loading;

        let contents = await getFileContents(acceptedFiles[0]);
        let xml = await xmlToJson(contents);

        if (!xml) {
            xmlLoadState = xmlLoadStates.rejected;
            return;
        }

        userStore.set({ xml });
        await ipcSendJsonToDb(xml);
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
                {#if xmlLoadState === xmlLoadStates.rejected}
                    Make sure you upload a file with the .xml extension.
                {/if}
            </p>
            <p />
        </div>
    </Dropzone>
</div>
