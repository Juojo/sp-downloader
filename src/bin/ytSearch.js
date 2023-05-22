const search = require('youtube-search-api');
const usetube = require('usetube');

module.exports = async function(data) {
    //const result = search.GetListByKeyword("csgo",[0],[1],[{type: 'channel'}])
    const searchTerms = `${data.preview.title} ${data.preview.artist}`

    const allVideos = await usetube.searchVideo(searchTerms);
    const firstResult = allVideos.videos[0];

    console.log(`Cancion de spotify: ${data.preview.title}\n\nBusqueda: ${searchTerms}\nVideo de youtube encontrado: ${firstResult.title}\nId de youtube encontrada: ${firstResult.id}`);
    return firstResult.id;
}