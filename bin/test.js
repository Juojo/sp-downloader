#!/usr/bin/env node

const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const argv = require('yargs').argv;

const fetch = require('isomorphic-unfetch');
const { getData, getPreview, getTracks, getDetails } = require('spotify-url-info')(fetch);


function checkInput(input) {
  if (typeof input !== 'string') {
    console.log('El argumento ingresado es incorrecto, solo se pueden leer URL o URI. Ejemplo de URL: https://open.spotify.com/track/<id>');
    return false;
  }
  else if (input.includes('https://open.spotify.com/playlist/') || input.includes('https://open.spotify.com/track/') || input.includes('https://open.spotify.com/artist/')) {
    return true;
  }
  else {
    console.log('El argumento ingresado es incorrecto, solo se pueden leer URL o URI. Ejemplo de URL: https://open.spotify.com/track/<id>');
    return false;
  } 
}

var track = new Map();

if (argv._[0] !== undefined) {
  const input = argv._[0];

  if (checkInput(input) === true) {
    getData(input)
      .then(data => data.type === 'track' ? (
        // track
        getDetails(input)
          .then(data => (
            console.log(data.preview.image),
            console.log(data.tracks[0].type)
          ))
      ) : data.type === 'playlist' ? (
        // playlist
        getTracks(input)
          .then(async data => (
            console.log(`Se registro una playlist con ${Object.keys(data).length} canciones.`), // tambien se puede sacar con el tamaño del Map()
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
} else {
  console.log('No estas ingresando un argumento.');
}

// Carga las tracks de una playlist al Map: track
async function loadTracks(data) {
  let i = 0;
  while (data[i] !== undefined) {
    track.set(
      i, {
        id: `${data[i].id}`,
        title: `${data[i].name}`,
        uri: `${data[i].uri}`
      }
    );
    i++;
  }
}

async function loadImages() { // Tarda bastante, optimizar?
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