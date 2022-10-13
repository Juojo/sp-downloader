<div align="center">
  <img alt="npm" src="https://img.shields.io/npm/v/sp-downloader?color=3388ff&style=plastic">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/juojo/sp-downloader?style=plastic">
  <img src="https://img.shields.io/badge/status-in_development-critical?style=plastic"> 
</div>

# sp-downloader

Spotify downloader (*sp-downloader*) is a simple command-line tool that can download tracks and playlists from spotify. All you need is a "share link" of the track you want to download to your pc.

### What you need

* FFMPEG installed on your pc.
* This module globally installed (`$ npm i -g sp-downloader`)

### How it works

Open your terminal and go to the directory where you want the song to be downloaded. Then run the command replacing `"<link>"` with the actual track/playlist link:
```
$ sp <link>
```
**Example:**
```
$ sp https://open.spotify.com/track/2hRlHXzOf14ArYmOPeAXsa?si=0905aef48cfd4256
```
> Note: if you are trying to download a playlist it will automatically create a new folder with the name of the playlist and the tracks will be inside that folder.
