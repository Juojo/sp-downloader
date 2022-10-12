#!/usr/bin/env node

const fetch = require('isomorphic-unfetch');
const { getData, getPreview, getTracks, getDetails } = require('spotify-url-info')(fetch);

//let input = 'https://open.spotify.com/artist/2qWK8K2Jfh67UqtwY8tCW6?si=7691551a752f477d'
//let input = 'https://open.spotify.com/track/2hRlHXzOf14ArYmOPeAXsa?si=d8dc9afda648413a'
//let input = 'https://open.spotify.com/playlist/0bDw47MqOW1xKZ8Mdck10Y?si=6149c9a279c64b68'

let input = 'https://open.spotify.com/playlist/3qxSuTNp8RQ3QAnsQkMan4?si=e626a1b7b9d54dc4'

//var ids = [];
var track = new Map();

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
      .then(data => (
        //ids = [],
        console.log(`Se registro una playlist con ${Object.keys(data).length} canciones.`),
        loadTracks(data),
        console.log(track)
        // getPreview(id)
        //   .then(data => (
        //     showImages(ids)
        //   ))

        //console.log(data)
      ))
  ) : (
    // other
    console.log('nada')
  ));

// Carga las tracks de una playlist al Map: track
function loadTracks(data) {
  let i = 0
  while (data[i] !== undefined) {
      //console.log(data[i].name)
      //console.log(data[i].id)
      //ids.push(data[i].id)
      track.set(
        i, {
          id: `${data[i].id}`,
          title: `${data[i].name}`
        }
      )
      i++
  }
}

function showImages(id) {
    
    
}

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