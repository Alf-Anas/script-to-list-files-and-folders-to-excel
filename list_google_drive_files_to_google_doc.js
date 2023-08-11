function myFunction() {
    const TYPE = {
        FOLDER: "FOLDER",
        FILE: "FILE",
    };

    // CHANGE THE FOLDER URL HERE
    const FOLDER_URL =
        "https://drive.google.com/drive/folders/qwertyuiop-asdfghjkl";
    const gDoc = DocumentApp.getActiveDocument().getBody();
    gDoc.clear();

    let outJSON = {};

    function listingFiles(listFiles) {
        let arrFiles = [];
        while (listFiles.hasNext()) {
            const file = listFiles.next();
            if (file != null) {
                arrFiles.push({
                    type: TYPE.FILE,
                    id: file.getId(),
                    name: file.getName(),
                    url: file.getUrl(),
                    size: file.getSize(),
                    fileType: file.getName().split(".").pop().toUpperCase(),
                    mimeType: file.getMimeType(),
                    dateCreated: file.getDateCreated(),
                    lastUpdated: file.getLastUpdated(),
                });
            }
        }
        return arrFiles;
    }

    function listingFolders(listFolders) {
        let arrFolders = [];
        while (listFolders.hasNext()) {
            const folder = listFolders.next();
            if (folder != null) {
                const mFiles = listingFiles(folder.getFiles());
                const mFolders = listingFolders(folder.getFolders());
                arrFolders.push({
                    type: TYPE.FOLDER,
                    id: folder.getId(),
                    name: folder.getName(),
                    url: folder.getUrl(),
                    size: folder.getSize(),
                    dateCreated: folder.getDateCreated(),
                    lastUpdated: folder.getLastUpdated(),
                    files: mFiles,
                    folders: mFolders,
                });
            }
        }
        return arrFolders;
    }

    function getMyFilesFromDrive() {
        const folder = DriveApp.getFolderById(FOLDER_URL.replace(/^.+\//, ""));
        const myFolders = folder.getFolders();
        const myFiles = folder.getFiles();

        outJSON = {
            type: TYPE.FOLDER,
            id: folder.getId(),
            name: folder.getName(),
            url: folder.getUrl(),
            files: listingFiles(myFiles),
            folders: listingFolders(myFolders),
        };

        gDoc.appendParagraph(JSON.stringify(outJSON));
        console.log(JSON.stringify(outJSON));
    }

    getMyFilesFromDrive();
}
