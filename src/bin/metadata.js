const ffmpeg = require('fluent-ffmpeg');

var ffmetadata = require("ffmetadata");

const fs = require('fs');

module.exports = async function(data) {
    var metadata = {
      artist: "Me",
      title: "Titulo de la cancion",
    };

    // ! Si el archivo al que se esta apuntando no tiene contenido devuelve error: "Format mp3 detected only with low score of 1, misdetection possible!"
    ffmetadata.write(`./test_files/prueba.mp3`, metadata, function(err) {
        if (err) console.error("Error writing metadata", err);
        else console.log("Data written");
    });
}