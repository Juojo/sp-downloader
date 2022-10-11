#!/usr/bin/env node

const fetch = require('isomorphic-unfetch');
const { getData, getPreview, getTracks, getDetails } = require('spotify-url-info')(fetch);

getTracks('https://open.spotify.com/playlist/0bDw47MqOW1xKZ8Mdck10Y?si=0d3ec7e055114eac')
  .then(data => (
    console.log(`La playlist ingresada tiene: ${data.lenght} canciones.`),
    showNames(data)
  ));

// Muestra nombres de las canciones que hay dentro de una playlist
function showNames(data) {
    let i = 0
    while (data[i] !== undefined) {
        console.log(data[i].name)
        i++
    }
}


// Fecha de subida => data.preview.date
// albumCover => data.preview.image

// Tipo => data.tracks[0].type
// Titulo => data.tracks[0].title
// Array de artistas => data.tracks[0].artists
// id => data.tracks[0].id
// uri (link que abre la cancion directamente en la aplicación de spfy) => data.tracks[0].uri
// Duracion => data.tracks[0].duration (maxDuration)
// Es explicito? => data.tracks[0].isExplicit