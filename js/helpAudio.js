// document.addEventListener('keypress', function (e) {
//   if (e.keyCode == "104") {
//     console.log("F1 pressed");
//     playLifebeltSound();
//     return;
//   }
// });

function playLifebeltSound() {
  checkKey({ "keyCode": 37 });
  var objDiv = document.getElementById("impressum");
  objDiv.scrollTop = objDiv.scrollHeight;
}

var audioKrake = new Audio('./audio/Krake_Hallo.mp3');
var audioAnker = new Audio('./audio/Anspielung_Anker.mp3');
var audioPfeiltasten = new Audio('./audio/Anspielung_Pfeiltasten.mp3');
var audioQuiz = new Audio('./audio/Anspielung_Quiz.mp3');
var audioEcholot = new Audio('./audio/Anspielung_Echolot.mp3');
var audioTaskbar = new Audio('./audio/Anspielung_Pfeiltasten_Taskbar.mp3');
var audioSwipe = new Audio('./audio/Anspielung_Swipe.mp3');
var audioSurroundSound = new Audio('./audio/Surround Sound.wav');

function togglePlay(audioFile) {
  console.log(audioFile);
  var selectedAudio;
  switch (audioFile) {
    case ("helpAudio1"):
      selectedAudio = audioKrake;
      break;
    case ("helpAudio2"):
      selectedAudio = audioAnker;
      break;
    case ("helpAudio3"):
      selectedAudio = audioPfeiltasten;
      break;
    case ("helpAudio4"):
      selectedAudio = audioQuiz;
      break;
    case ("helpAudio5"):
      selectedAudio = audioEcholot;
      break;
    case ("helpAudio6"):
      selectedAudio = audioTaskbar;
      break;
    case ("helpAudio7"):
      selectedAudio = audioSwipe;
      break;
    case ("helpAudio8"):
      selectedAudio = audioSurroundSound;
      break;
  }
  return selectedAudio.paused ? selectedAudio.play() : selectedAudio.pause();
};
// var playedAudio = 0;
// function playLifebeltSound() {
//   stopEchelot();
//   if (playedAudio == 0) {
//     var audio = new Audio('./audio/Krake_Hallo.mp3');
//     audio.play();
//     playedAudio++;
//   } else if (playedAudio == 1) {
//     var audio = new Audio('./audio/Anspielung_Anker.mp3');
//     audio.play();
//     playedAudio++;
//   } else if (playedAudio == 2) {
//     var audio = new Audio('./audio/Anspielung_Pfeiltasten.mp3');
//     audio.play();
//     playedAudio++;
//   } else if (playedAudio == 3) {
//     var audio = new Audio('./audio/Anspielung_Quiz.mp3');
//     audio.play();
//     playedAudio++;
//   } else if (playedAudio == 4) {
//     var audio = new Audio('./audio/Anspielung_Echolot.mp3');
//     audio.play();
//     playedAudio++;
//   } else if (playedAudio == 5) {
//     var audio = new Audio('./audio/Anspielung_Pfeiltasten_Taskbar.mp3');
//     audio.play();
//     playedAudio++;
//   } else if (playedAudio == 6) {
//     var audio = new Audio('./audio/Anspielung_Swipe.mp3');
//     audio.play();
//     playedAudio = 0;
//   }
// }