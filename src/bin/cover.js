const ffmpeg = require('fluent-ffmpeg');

var ffmetadata = require("ffmetadata");

const fs = require('fs');

module.exports = async function(data) {
    var options = {
        attachments: ["./test_files/cover.jpg"],
    };

    ffmetadata.write("song.mp3", {}, options, function(err) {
        if (err) console.error("Error writing cover art");
        else console.log("Cover art added");
    });
}

