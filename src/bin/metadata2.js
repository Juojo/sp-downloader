const NodeID3 = require('node-id3');

const getFileName = require('./getFileName');

module.exports = async function(data) {
    const fileName = await getFileName(data.preview.title);

    let artistWinString = data.preview.artist.replace(', ', ';').replace(' & ', ";");

    const filePath = `./test_files/${fileName}.mp3`

    const tags = {
        title: `${data.preview.title}`,
        artist: artistWinString,
        date: data.preview.date.slice(0, 4)
        //album: "TVアニメ「メイドインアビス」オリジナルサウンドトラック",
        //APIC: "./example/mia_cover.jpg",
        //TRCK: "27"
    }

    // Llamada a la función para verificar el archivo MP3
    if (await verificarArchivoMP3(filePath)) {
      NodeID3.write(tags, filePath, function(err) { 
        if (err) console.error("Error writing metadata", err);
        else console.log("metadata written");
      })
    }
    

    

    //const success = await NodeID3.write(tags, filepath)
    //(success) ? console.log("metadata written") : console.error("Error writing metadata");
}

async function verificarArchivoMP3(rutaArchivoMP3) {
    try {
      const tags = NodeID3.read(rutaArchivoMP3);
      // Si no se lanzó ninguna excepción, el archivo es válido y se pudieron leer los metadatos correctamente
      console.log('El archivo MP3 es válido:', tags);
      return true;
    } catch (error) {
      console.error('Error al verificar el archivo MP3:', error.message);
    }
  }