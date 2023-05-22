//const ffmpeg = require('fluent-ffmpeg');

const fs = require('fs');
const ytdl = require('ytdl-core');
const getFileName = require('./getFileName');

module.exports = async function(data, videoId) {
    const fileName = await getFileName(data.preview.title);

    await ytStream(videoId, fileName);    
}

async function ytStream(videoId, title) {
    if (ytdl.validateID(videoId)) {
        try {
            console.log('Audio stream is in progress...');
            ytdl(`http://www.youtube.com/watch?v=${videoId}`, { filter: 'audioonly' })
                .pipe(fs.createWriteStream(`./test_files/${title}.mp3`));
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