## Script to list files and folders to spreadsheet format

### List Files to Excel in Windows

Download the Excel Macro files [ExcelScript_ListFileAndSubFolder.xlsm](ExcelScript_ListFileAndSubFolder.xlsm)  that already has a script inside it, open the file, and follow the instruction inside the excel file. 


### List Files from Google Drive to Google Spreadsheet

Create new google sheet, cleck menu "Extensions" and choose "Apps Script". Copy the code from [list_google_drive_files_to_google_sheet.js](list_google_drive_files_to_google_sheet.js) and paste it in the Apps Script editor. Change the FOLDER_URL with the URL of the Google Drive Folder. Click save and run it. if it asked for the permission to access the Google Drive, accept it. The list of all files and folders will be created in the new sheet,


### List Files to created nested JSON from Google Drive to Google Doc

Create new google doc, cleck menu "Extensions" and choose "Apps Script". Copy the code from [list_google_drive_files_to_google_doc.js](list_google_drive_files_to_google_doc.js) and paste it in the Apps Script editor. Change the FOLDER_URL with the URL of the Google Drive Folder. Click save and run it. if it asked for the permission to access the Google Drive, accept it. The nested JSON files and folders will be stringify in Google Doc body. Use it for your own apps or something.


### Created a Google Drive browser app from Nested JSON

[https://github.com/Alf-Anas/gdrive-list-app](https://github.com/Alf-Anas/gdrive-list-app)
Clone this repository, use master branch if you want to make a web app, use add-capatitor if you want to make in as a mobile app.
Save the nested JSON that you created before to .json file, and change the existing json file in the source code. Build and use the apps.
