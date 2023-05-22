module.exports = async function getFileName(title) {
    const restrictedCharacters = ["#", "%", "&", "{", "}", "/", "<", ">", "*", "?", "$", "!", "'", `"`, ":", ";", ".", ",", "@", "+", "`", "|", "="];
    
    for (i=0; i<restrictedCharacters.length; i++) {
        if (title.includes(restrictedCharacters[i])) {
            title = title.replaceAll(restrictedCharacters[i], "");
        }
    }
    title = title.replace(/ /g, "_");
    return title;
}