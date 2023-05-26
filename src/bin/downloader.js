//const ffmpeg = require('fluent-ffmpeg');

const fs = require('fs');
const ytdl = require('ytdl-core');

const getFileName = require('./getFileName');
const ytSearch = require("./ytSearch");

module.exports = async function(trackMap, playlistName) {
    let isPlaylist = false;

    let i = 0;
    while (trackMap.get(i) !== undefined) {
        let title = trackMap.get(i).title;
        let artist = trackMap.get(i).artist;

        let fileName = await getFileName(title);
        let videoId = await (ytSearch(title, artist));

        (trackMap.size>1) ? isPlaylist=true : isPlaylist=false;

        await ytStream(videoId, fileName, isPlaylist, playlistName);
        i++;
    }
    
}

async function ytStream(videoId, fileName, isPlaylist, playlistName) {
    if (isPlaylist) {
        filePath = `./test_files/${playlistName}/${fileName}.mp3`
    } else {
        filePath = `./test_files/${fileName}.mp3`
    }


    if (ytdl.validateID(videoId)) {
        try {
            console.log('Audio stream is in progress...');
            ytdl(`http://www.youtube.com/watch?v=${videoId}`, { filter: 'audioonly' })
                .pipe(fs.createWriteStream(filePath));
            console.log('Audio stream completed');
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log('YouTube video ID is not correct');
    }
    
}

async function createFIle(title) {
    fs.writeFile(`./test_files/${title}.mp3`, '', function (err) {
        if (err) throw err;
        console.log('File was created successfully.');
    });
}

// CHECK => https://www.npmjs.com/package/ffmetadata