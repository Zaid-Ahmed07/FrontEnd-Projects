//Get DOM Elements
const container = document.getElementById('container');
const previousBtn = document.getElementById('previous');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const title = document.getElementById('song-title');
const albumArt = document.getElementById('album-art');

//Track Array
const tracks = ['Black sheep', 'National Anthem'];

//Index of Currently Playing Song
let trackIndex = 1;

//Load the initial track
loadTrack(tracks[trackIndex]);

//Function to load the selected track
function loadTrack(track) {
    //Update the text for the title of track
    title.innerText = track;
    //Update the src in the audio element with the audio file of the selected track
    audio.src = `music/${track}.mp3`;
    // Update the src in the img element with the image file of the selected track
    albumArt.src = `images/${track}.jpg`;
};

//Function to play the track
function playTrack() {
    //Add the second class 'play' to the container
    container.classList.add('play');
    //Remove the play icon and display the pause icon instead
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    //Play the track using the audio element
    audio.play();
};

//Function to pause the track
function pauseTrack() {
    //Remove the second class 'play' from the container
    container.classList.remove('play');
    //Remove the pause icon and display the play icon instead
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    //Pause the track using the audio element
    audio.pause();
}

// Function to switch to previous track
function prevTrack() {
    //Decrement the value of trackIndex by 1 to select the previous track from the track array
    trackIndex--;
    //Check if selected track index is less then 0
    if ( trackIndex <0 ){
        //Reassign the trackIndex to last track in the trackArray
        trackIndex = tracks.length - 1;
    };
    //Load the selected track
    loadTrack(tracks[trackIndex]);
    //Play the selected track
    playTrack();
};

// Function to switch to next track
function nextTrack() {
    //Increment the value of trackIndex by 1 to select the next track from the track array
    trackIndex++;
    //Check if selected track index is greater than the index of last track
    if ( trackIndex > tracks.length - 1 ){
        //Reassign the trackIndex to last track in the trackArray
        trackIndex = tracks.length - 1;
    };
    //Load the selected track
    loadTrack(tracks[trackIndex]);
    //Play the selected track
    playTrack();
}

//Function to update the rpogress bar
function updateProgress(e) {
    //Destruction the total duraation and currrentTime of the audio
    const { duration, currentTime } = e.srcElement;
    // Calculate the percentage of overall audio played usin currentTime and total duration
    const progressPercentage = currentTime / duration * 100;
    // Reassign width of progress bar using the progressPercentage
    progressBar.style.width = `${progressPercentage}%`;

}

//function to set the progress bar
function setProgress() {
    //Get the overall width in pixel for progress bar container
    const width = this.clientWidth;
    const clickLocation = e.offsetX;
    //Get the total duration of the track
    const duration = audio.duration;
//Reassign the currentTime of audio track by calculating based on above
     audio.currentTime = clickLocation / width * duration;
};

//Event Listener 
//1. Listen for click on the play button
playBtn.addEventListener('click', () => {
    //Check if track id playing
    const isPlaying = container.classList.contains('play');
    //Conditional statement based on status of audio playback
    if(isPlaying) {
        //If the track is playing, play the track
        pauseTrack();
    } else {
        //If the track is not playing, play the track
        playTrack();
    }
});

//2. Listen for click on the previousBtn
previousBtn.addEventListener('click', prevTrack);

//3. Listen for click on the previousBtn
nextBtn.addEventListener('click', nextTrack);

// 4. Listen for a timeupdate on a audio element
audio.addEventListener('timeupdate', updateProgress);

//5. Listen for click on the progress bar
progress.addEventListener('click', setProgress);

// 6. Listen for end of
audio.addEventListener('ended', nextTrack)
