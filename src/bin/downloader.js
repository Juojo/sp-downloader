const ffmpeg = require('fluent-ffmpeg');

var ffmetadata = require("ffmetadata");

const fs = require('fs');;

module.exports = async function(data) {
    fs.writeFile(`./test_files/${data.preview.title}.mp3`, '', function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });
}

// CHECK => https://www.npmjs.com/package/ffmetadata