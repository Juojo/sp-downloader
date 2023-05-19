const ffmpeg = require('fluent-ffmpeg');

var ffmetadata = require("ffmetadata");

const fs = require('fs');

module.exports = async function(data) {
    var options = {
        attachments: ["./test_files/testCover.jpg"],
    };

    ffmetadata.write("./test_files/prueba.mp3", {}, options, function(err) {
        if (err) console.error("Error writing cover art");
        else console.log("Cover art added");
    });
}

// ! Por el momento no funciona bien, tendria que buscar una manera diferente de insertar los covers