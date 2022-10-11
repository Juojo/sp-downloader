#!/usr/bin/env node

const argv = require('yargs').argv;
const fs = require('fs');

if (argv._[0] !== undefined) {
    const content = argv._[0];

    if (typeof content === 'string') {
        fs.writeFile(`./test_files/${checkType(content)}.txt`, content, err => { // Crea un archivo en el directorio con nombre del tipo de link .txt
            if (err) throw err;
            console.log('Se escribio correctamente.');
        })
    } else {
        console.log('El dato ingresado solo puede ser de tipo "string".');
    }
}

function checkType(link) {
    if (typeof link === 'string') {
        if (link.includes('/track/')) return 'track';
        if (link.includes('/playlist/')) return 'playlist';
    } else {
        return link=undefined;
    }
}

// Spotify_song: https://open.spotify.com/track/2hRlHXzOf14ArYmOPeAXsa?si=d8dc9afda648413a
// Spotify_playlist: https://open.spotify.com/playlist/75JIYmNPr2Qo91Q9WX2Q7N?si=c695e548e31b4272