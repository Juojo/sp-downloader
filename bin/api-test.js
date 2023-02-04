#!/usr/bin/env node

const commander = require('commander');
const ver = require('../lib/ver');

commander
  .option('-v, --version', 'show version', ver, '')
  .option('-nc, --nocover', "it will not save the cover")
  .parse(process.argv);

const fetch = require('isomorphic-unfetch');
const { getData, getPreview, getTracks, getDetails } = require('spotify-url-info')(fetch);

getTracks('https://open.spotify.com/track/4iaNmAvcZ6sPGvgZ6vQQdx?si=5dc3e296aed34226')
    .then(data => (
    console.log(data)
    ))

// getData, getPreview, getTracks, getDetails
//
// getData {

// }
