#!/usr/bin/node 

const fs = require('fs').promises;
const path = require('path');
const downloadFolder = "D:\\Donwloads";

const fileExtensions = {
    audios: [".mp3", ".wav", ".aac", ".flac"],
    books: [".epub", ".pdf", ".txt"],
    images: [".jpg", ".png", ".gif", ".bmp", ".svg"],
    videos: [".mp4", ".mkv", ".avi", ".mov"],
    programs: [".exe", ".dmg", ".jar"],
    documents: [".doc", ".docx", ".pdf", ".txt"]
}

async function readDirectory(){
    const directories = await fs.readdir(downloadFolder);
    return directories
}

async function moveFiles(){
    try{
        files = await readDirectory();

        for (const file of files){
            // construct the filepath of the current file
            const filepath = `${downloadFolder}\\${file}`;

            // check if the current file is a file or a directory
            const stats = await fs.stat(filepath);
            if (!stats.isFile(file)) continue

            // loop through file categories and file extensions
            for (const [key, value] of Object.entries(fileExtensions)){
                // if the file does not have a matching extension, continue to the next iteration
                if (!value.includes(path.extname(filepath)))continue

                // move the file to the appropriate directory based on its file extension
                fs.rename(filepath, `${downloadFolder}\\${key}\\${file}`)
                console.log(file, 'successfuly moved to ', `${downloadFolder}\\${key}\\file`)
            }
        }
    }catch(error){
    console.log(error)
    }
}

//Init process
moveFiles();




