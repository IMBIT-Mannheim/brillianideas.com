//Launchbar
const tentacle_hook_audio = new Audio();
tentacle_hook_audio.src = "../audio/Tentacle Hook.mp3";

//Surround
const surround_welcome = new Audio();
surround_welcome.src = "../audio/Surround Sound.wav";

//Impressum
const audio_close = new Audio();
audio_close.src = "../audio/Bubbles close.mp3"

//Pfeiltasten
const bubbles_right2mid = new Audio();
bubbles_right2mid.src = "../audio/Bubbles quick right2mid.mp3";
const bubbles_left2mid = new Audio();
bubbles_left2mid.src = "../audio/Bubbles quick left2mid.mp3";

//quiz
const happy_dolphin = new Audio();
happy_dolphin.src = "../audio/Dolphin left2right.mp3"; //case green
const curious_whale = new Audio();
curious_whale.src = "../audio/Whale 4.mp3"; //case amber
const angry_octopus = new Audio();
angry_octopus.src = "../audio/Tentacle Splash 2.mp3"; //case red
const single_bubble_audio = new Audio();
single_bubble_audio.src = "../audio/Bubbles Quiz 1.mp3";

//Shortcut Mute "m"
var mute = true;

function playSoundeffect(soundeffect_const) {
  if (mute == false) {
    soundeffect_const.play();
  }
}

window.addEventListener('keydown', checkKeyPress, false);
function checkKeyPress(key) {
  if (key.keyCode == '77') {
    if (mute == true) {
      mute = false;
      document.getElementById("shortcutSoundeffects").classList.add('activeShortcut');
    }
    else {
      mute = true;
      document.getElementById("shortcutSoundeffects").classList.remove('activeShortcut');
    }
  }
}

// For Shortcut-Interaction in the Impressum
function activateSoundeffectsByImpressum() {
  mute = mute ? false : true;
  if (mute == false) {
    document.getElementById("shortcutSoundeffects").classList.add('activeShortcut');
  }
  else {
    document.getElementById("shortcutSoundeffects").classList.remove('activeShortcut');
  }
}