export function getFileContents(file: File) {
    return new Promise<string>((resolve, reject) => {
        let contents = "";
        const reader = new FileReader();

        reader.onloadend = function (e: ProgressEvent<FileReader>) {
            contents = e.target.result as string;
            resolve(contents);
        }

        reader.onerror = function (e: ProgressEvent<FileReader>) {
            reject(e);
        }

        reader.readAsText(file);
    })
}