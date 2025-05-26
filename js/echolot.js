function functionActivateEcholot() {
    console.log("Echolot was: " + (echolotActive ? "Deactivated" : "Activated"));
    echolotActive = echolotActive ? false : true;
    if (echolotActive == true) {
        document.getElementById("shortcutEcholot").classList.add('activeShortcut');
    } else {
        document.getElementById("shortcutEcholot").classList.remove('activeShortcut');
    }
}

document.addEventListener('keypress', function (e) {
    if (e.keyCode == "101") {
        functionActivateEcholot();
        return;
    }
});
var echolotActive;
function listenEcholot() {
    echolotActive = false;
    echolotActivate();
}


function echolotActivate() {

    var frequence = 5000;

    var mX = -1;
    var mY = -1;

    function mousemove(event) {
        mX = event.clientX;
        mY = event.clientY;
    }
    window.addEventListener('mousemove', mousemove);
    // document.mousemove(function (event) {
    //     mX = event.pageX;
    //     mY = event.pageY;
    // });

    setInterval(function () {
        if (echolotActive) {
            var elements = [document.querySelector("#start_bg_ltr").getBoundingClientRect(), document.querySelector("#start_bg_rtl").getBoundingClientRect(), document.querySelector("#stoerer").getBoundingClientRect(), document.querySelector("#tentacle_img_small_launchbar").getBoundingClientRect()];
            // var elements = [<img alt="Tentakel" class="background_image" id="start_bg_ltr" src="img/tentakel_ltr.png" />, <img alt="Tentakel" class="background_image" id="start_bg_rtl" src="img/tentakel_rtl.png" />, <img alt="Tentakel" class="background_image" id="start_bg_rtl" src="img/tentakel_rtl.png" />, <img class="pointer" alt="Wie dual bin ich? Button" onclick="showmodal(this.id)" id="stoerer" src="img/stoerer.gif" />, <img id="tentacle_img_small_launchbar" class="img" alt="Launchbar Tentakel" src="img/launchbar/TentakelStick.png" onclick="toggleLaunchbar()"/>]
            // var elements = $('div[class *="pointer"]:visible,img[class *="pointer"]:visible, a:visible, span[class *="modul"]:visible').not("footer");
            // console.log(mX + "#" + mY);
            var closestDistance = 2000;
            var chosenElement;
            for (var x of elements) {
                // for (var y of x.children) {
                // console.log(x);
                // my_el = x;
                // console.log(my_el);
                deltaD = measureDistance(x, mX, mY);
                // console.log(deltaD);
                if (deltaD < closestDistance) {
                    closestDistance = deltaD;
                    chosenElement = x;
                }
            }

            // }
            // console.log(closestDistance);
            // console.log(chosenElement);
            playSound(closestDistance, frequence);
        }
        // console.log(measureDistance($my_el,mX,mY));
    }, frequence);

    function playSound(closestDistance, frequence) {
        var wHight = window.innerHeight;
        var wWidth = window.innerWidth;
        // console.log(closestDistance + "#" + (wHight + wWidth));
        var soundDelay = frequence * closestDistance * 2 / (wHight + wWidth);
        if (soundDelay < 150) {
            soundDelay = 151;
        }
        //   var makeSound = true;
        // while (makeSound) {
        // console.log("##" + soundDelay);
        var startTime = new Date().getTime();
        var interval = setInterval(function () {
            if (new Date().getTime() - startTime > frequence) {
                // console.log("STOP");
                clearInterval(interval);
                return;
            }
            if (echolotActive) {
                playSound2();
            }
        }, soundDelay)
        // }
    }
    function playSound2() {
        var audio = new Audio('./audio/EcholotSound.mp3');
        audio.play();

    }

    function measureDistance(my_element, mouseX, mouseY) {
        // console.log(my_element);
        return Math.floor(Math.sqrt(Math.pow(mouseX - (my_element.left + (my_element.width / 2)), 2) + Math.pow(mouseY - (my_element.top + (my_element.height / 2)), 2)));

    }
    // var sound = new Echo({
    //   urls: ['audio/whale.mp3', 'whale.ogg']
    // }).play();
    // }
}


function stopEchelot() {
    if (echolotActive == true) {
        functionActivateEcholot();
    }
}