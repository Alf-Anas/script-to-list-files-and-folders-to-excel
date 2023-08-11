function myFunction() {
    const TYPE = {
        FOLDER: "FOLDER",
        FILE: "FILE",
    };

    // Use this if you want to list all your drive
    // const ROOT_FOLDER = DriveApp.getRootFolder();

    // Use this if you want to list by folder link
    const FOLDER_URL =
        "https://drive.google.com/drive/folders/qwertyuiop-asdfghjkl";
    const ROOT_FOLDER = DriveApp.getFolderById(FOLDER_URL.replace(/^.+\//, ""));

    const gSheet = SpreadsheetApp.getActive();
    let folderSheet = null;

    const outRows = [];
    const listColumn = [
        "ID",
        "TYPE",
        "PATH",
        "NAME",
        "SIZE (BYTE)",
        "FILE_TYPE",
        "DATE_CREATED",
        "LAST_UPDATED",
        "URL",
    ];
    outRows.push(listColumn);

    function listingFiles(listFiles, currentPath) {
        while (listFiles.hasNext()) {
            const file = listFiles.next();
            if (file != null) {
                const mMimeType = file.getMimeType();
                const splitName = file.getName().split(".");
                const splitNamePop = file.getName().split(".").pop();
                const mFileType = mMimeType.includes("google-apps.document")
                    ? "DOC"
                    : mMimeType.includes("google-apps.spreadsheet")
                    ? "XLS"
                    : mMimeType.includes("google-apps.presentation")
                    ? "PPT"
                    : mMimeType.includes("google-apps.map")
                    ? "GOOGLE-MAP"
                    : mMimeType.includes("google-apps.form")
                    ? "GOOGLE-FORM"
                    : mMimeType.includes("google-apps.jam")
                    ? "GOOGLE-JAMBOARD"
                    : mMimeType.includes("google-apps.script")
                    ? "GOOGLE-SCRIPT"
                    : splitName.length > 1 && splitNamePop.length <= 4
                    ? splitNamePop.toUpperCase()
                    : mMimeType;

                const rowFile = [
                    file.getId(),
                    TYPE.FILE,
                    currentPath,
                    file.getName(),
                    file.getSize(),
                    mFileType,
                    file.getDateCreated(),
                    file.getLastUpdated(),
                    file.getUrl(),
                ];
                outRows.push(rowFile);
            }
        }
    }

    function listingFolders(listFolders, currentPath) {
        while (listFolders.hasNext()) {
            const folder = listFolders.next();
            if (folder != null) {
                const newPath = `${currentPath}${folder.getName()}/`;
                const rowFolder = [
                    folder.getId(),
                    TYPE.FOLDER,
                    currentPath,
                    folder.getName(),
                    folder.getSize(),
                    "",
                    folder.getDateCreated(),
                    folder.getLastUpdated(),
                    folder.getUrl(),
                ];
                outRows.push(rowFolder);

                listingFolders(folder.getFolders(), newPath);
                listingFiles(folder.getFiles(), newPath);
            }
        }
    }

    function getMyFilesFromDrive() {
        const folder = ROOT_FOLDER;
        const myFolders = folder.getFolders();
        const myFiles = folder.getFiles();
        const folderName = "script_" + folder.getName() || "script-sheet";
        folderSheet = gSheet.getSheetByName(folderName);
        if (!folderSheet) {
            gSheet.insertSheet(folderName);
        }
        folderSheet = gSheet.getSheetByName(folderName);
        folderSheet.clear();

        const rowFolder = [
            folder.getId(),
            TYPE.FOLDER,
            "/",
            folder.getName(),
            folder.getSize(),
            "",
            folder.getDateCreated(),
            folder.getLastUpdated(),
            folder.getUrl(),
        ];
        outRows.push(rowFolder);

        const currentPath = `/${folder.getName()}/`;
        listingFiles(myFiles, currentPath);
        listingFolders(myFolders, currentPath);

        folderSheet
            .getRange(1, 1, outRows.length, listColumn.length)
            .setValues(outRows);
    }

    getMyFilesFromDrive();
}
