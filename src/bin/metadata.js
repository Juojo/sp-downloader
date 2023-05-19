const ffmpeg = require('fluent-ffmpeg');

var ffmetadata = require("ffmetadata");

const fs = require('fs');

module.exports = async function(data) {
    // var artistString = data.preview.artist;
    // var separators = [',', '&'];
    // var artistArray = artistString.split(new RegExp(separators.join('|'), 'g')).map(function(item) {
    //   return item.trim();
    // });

    let artistWinString = data.preview.artist.replace(', ', ';').replace(' & ', ";");

    var metadata = {
      artist: artistWinString,
      title: `${data.preview.title}`,
      date: data.preview.date.slice(0, 4)
    };
  
    // ! Si el archivo al que se esta apuntando no tiene contenido devuelve error: "Format mp3 detected only with low score of 1, misdetection possible!"
    ffmetadata.write(`./test_files/prueba.mp3`, metadata, function(err) {
        if (err) console.error("Error writing metadata", err);
        else console.log("metadata written");
    });
}