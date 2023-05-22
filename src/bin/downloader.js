const ffmpeg = require('fluent-ffmpeg');

const fs = require('fs');;

const restrictedCharacters = ["#", "%", "&", "{", "}", "/", "<", ">", "*", "?", "$", "!", "'", `"`, ":", ";", ".", ",", "@", "+", "`", "|", "="];

module.exports = async function(data) {
    let title = data.preview.title
    console.log(title);

    for (i=0; i<restrictedCharacters.length; i++) {
        if (title.includes(restrictedCharacters[i])) {
            title = title.replaceAll(restrictedCharacters[i], "");
        }
    }
    title = title.replace(/ /g, "_");
    console.log(title);

    fs.writeFile(`./test_files/${title}.mp3`, '', function (err) {
        if (err) throw err;
        console.log('File was created successfully.');
    });
}

// CHECK => https://www.npmjs.com/package/ffmetadata