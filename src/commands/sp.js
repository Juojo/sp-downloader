#!/usr/bin/env node

const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const commander = require('commander');
const ver = require('../lib/ver');

const downloadTrack = require('../bin/downloader.js')
const loadMetadata = require('../bin/metadata.js')
const loadCover = require('../bin/cover.js')

commander
  .option('-v, --version', 'show version', ver, '')
  .option('-nc, --nocover', "it will not save the cover")
  .parse(process.argv);

const fetch = require('isomorphic-unfetch');
const { getData, getPreview, getTracks, getDetails } = require('spotify-url-info')(fetch);

var track = new Map();

if (commander.args[0] !== undefined) {
  const input = commander.args[0];

  if (checkInput(input)) {
    getData(input)
      .then(data => data.type === 'track' ? (
        // track
        getDetails(input)
          .then(async data => (
            await downloadTrack(data),
            await loadMetadata(data),
            //await loadCover(data),
            // console.log(data.preview.image),
            // console.log(data.tracks[0].uri),
            // console.log(data.preview.title),
            console.log(data.preview.artist)
          ))
      ) : data.type === 'playlist' ? (
        // playlist
        getTracks(input)
          .then(async data => (
            console.log(`Se registro una playlist con ${Object.keys(data).length} canciones.`), // tambien se puede sacar con el tamaño del Map()
            //console.log(data),
            await loadTracks(data),
            await loadImages(),
            //,await loadImage()
            console.log(track)
          ))
      ) : (
        // other
        console.log('nada')
      ));
  }
} else if (commander._optionValues.version === true) {
  // Dejar vacio
} else {
  console.log('No estas ingresando un argumento.');
}

function checkInput(value) {
  if (typeof value !== 'string') {
    console.log('El argumento ingresado es incorrecto, solo se pueden leer URL o URI. Ejemplo de URL: https://open.spotify.com/track/<id>');
    return false;
  }
  else if (value.includes('https://open.spotify.com/playlist/') || value.includes('https://open.spotify.com/track/') || value.includes('https://open.spotify.com/artist/')) {
    return true;
  }
  else {
    console.log('El argumento ingresado es incorrecto, solo se pueden leer URL o URI. Ejemplo de URL: https://open.spotify.com/track/<id>');
    return false;
  } 
}

// Carga las tracks de una playlist al Map: track
async function loadTracks(data) {
  console.log('Cargando canciones...');
  let i = 0;
  while (data[i] !== undefined) {
    track.set(
      i, {
        uri: `${data[i].uri}`,
        title: `${data[i].name}`
      }
    );
    i++;
  }
}

async function loadImages() { // Tarda bastante, optimizar?
  if (commander._optionValues.nocover === true) {
    console.log("no se cargan covers");
    return;
  }
  
  console.log('Cargando covers... (esto puede tardar un rato)');
  for (i=0; i<track.size; i++) {
    await getPreview(track.get(i).uri)
    .then(data => (
      //console.log(`id: ${i} _ ${data.image}`),
      track.set(
        i, {
          ...track.get(i),
          img: `${data.image}`
        }
      )
    ))
  }
}


//let input = 'https://open.spotify.com/artist/2qWK8K2Jfh67UqtwY8tCW6?si=7691551a752f477d' // artista
//let input = 'https://open.spotify.com/track/2hRlHXzOf14ArYmOPeAXsa?si=d8dc9afda648413a' // cancion
//let input = 'https://open.spotify.com/playlist/0bDw47MqOW1xKZ8Mdck10Y?si=6149c9a279c64b68' // playlist con 2 canciones

//let input = 'https://open.spotify.com/playlist/4HU18uNfI8U7SQHDk1zoWm?si=f884ec0db09846bd' // playlist con 17 canciones

//let input = 'https://open.spotify.com/playlist/3qxSuTNp8RQ3QAnsQkMan4?si=e626a1b7b9d54dc4' // playlist con mas de 100 canciones


// function putCover() {
//   const albumCover = 'cover.png';
//   const path = 'example.mp3';
//   const tempPath = 'example.temp.mp3';
//   const strm = ffmpeg(path).addOutputOptions('-i', albumCover, '-map', '0:0', '-map', '1:0', '-c', 'copy', '-id3v2_version', '3').save(tempPath);
//   strm.on('end', () => {
//     fs.unlinkSync(path);
//     fs.renameSync(tempPath, path);
//     resolve();
//   });
// }

// ! Importante: getDetails no puede leer playlists, solo tracks => se podria chequear primero el tipo y despues ver a que se llama (get)

// SOLO PARA getDetails.

// Fecha de subida => data.preview.date
// albumCover => data.preview.image

// Tipo => data.tracks[0].type
// Titulo => data.tracks[0].title
// Array de artistas => data.tracks[0].artists
// id => data.tracks[0].id
// uri (link que abre la cancion directamente en la aplicación de spfy) => data.tracks[0].uri
// Duracion => data.tracks[0].duration (maxDuration)
// Es explicito? => data.tracks[0].isExplicit



// Para GETPREVIEW
// console.log(`Se registro una playlist con ${Object.keys(data).length} canciones.`),
// showNames(data)


// ? Basura:

// async function loadImage(uri, i) {
//   console.log(i);
//   getPreview(uri)
//     .then(async data => (
//       track.set(
//         i, {
//           ...track.get(i.id),
//           img: `${await data.image}`
//         }
//       )
//     ))
// }