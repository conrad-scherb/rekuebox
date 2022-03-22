declare module "svelte-file-dropzone" {
    export default function Dropzone(
        props: DropzoneProps
    ): JSX.Element;

    export interface DropzoneProps {
        accept: string,
        containerStyles: string,
        containerClasses: string,
        multiple: boolean,
    }

    export interface DropResponse<T extends File> {
        detail: {
            acceptedFiles: T[],
            fileRejections: FileRejection[]
        }
        event: DropEvent
    }
}