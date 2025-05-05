const songsArr = [
    "Bohemian Rhapsody",
    "Stairway to Heaven",
    "Imagine",
    "Hotel California",
    "Smells Like Teen Spirit",
    "Billie Jean",
    "Sweet Child O' Mine",
    "Shape of You",
    "Blinding Lights",
    "Rolling in the Deep",
    "Take On Me",
    "Hey Jude",
    "Wonderwall",
    "Shake It Off",
    "Uptown Funk",
    "Lose Yourself",
    "Thinking Out Loud",
    "Let It Be",
    "Bad Guy",
    "Levitating"
];

function removeSong(songsArr, songName){
    for (let i = 0; i < songsArr.length; i++) {
        const currSong = songsArr[i];
        if (currSong.toLowerCase() === songName.toLowerCase()) {
            console.log(currSong);
            songsArr.splice(i, 1); // effettua una rimozione
            break;
        }
    }
}

// Comportamento desiderato
// removeSong(songsArr, "Bad Guy");

// Definire una funzione che identifichi la canzone desiderata
function findSong(songName) {
    return (arraySong) => songName === arraySong
}
// Istanziare parzialmente un wrapper che identifichi la canzone richiesta
const songWrapper = findSong("Levitating");

songsArr.splice(songsArr.findIndex(songWrapper), 1)
console.log(songsArr);
