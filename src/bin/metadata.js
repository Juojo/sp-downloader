const ffmpeg = require('fluent-ffmpeg');

var ffmetadata = require("ffmetadata");

const fs = require('fs');

module.exports = async function(data) {
    var metadata = {
      artist: "Me",
      title: "Titulo de la cancion",
    };

    ffmetadata.write("song.mp3", metadata, function(err) {
        if (err) console.error("Error writing metadata", err);
        else console.log("Data written");
    });
}