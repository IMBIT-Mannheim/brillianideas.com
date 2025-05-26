// Get the modal
var modalV = document.getElementsByClassName("modal-V");

// Get the button that opens the modal
var btnV = document.getElementsByClassName("myBtn-V1");

// Get the <span> element that closes the modal
var spanV = document.getElementsByClassName("close-V");

// When the user clicks the button, open the modal
btnV[0].onclick = function () {
  modalV[0].style.display = "block";
};

btnV[1].onclick = function () {
  modalV[1].style.display = "block";
};

btnV[2].onclick = function () {
  modalV[2].style.display = "block";
};

btnV[3].onclick = function () {
  modalV[3].style.display = "block";
};

btnV[4].onclick = function () {
  modalV[4].style.display = "block";
};

// When the user clicks on <span> (x), close the modal
spanV[0].onclick = function () {
  modalV[0].style.display = "none";
};

spanV[1].onclick = function () {
  modalV[1].style.display = "none";
};

spanV[2].onclick = function () {
  modalV[2].style.display = "none";
};
spanV[3].onclick = function () {
  modalV[3].style.display = "none";
};
spanV[4].onclick = function () {
  modalV[4].style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modalV[0]) {
    modalV[0].style.display = "none";
  }
  if (event.target == modalV[1]) {
    modalV[1].style.display = "none";
  }
  if (event.target == modalV[2]) {
    modalV[2].style.display = "none";
  }
  if (event.target == modalV[3]) {
    modalV[3].style.display = "none";
  }
  if (event.target == modalV[4]) {
    modalV[4].style.display = "none";
  }
};
