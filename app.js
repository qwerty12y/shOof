// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    checkMark = document.querySelector('#check-mark')

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        }).then(() => {
          setTimeout(() => {
            drawCardTargetTopLeft()
            drawCardTargetBottomLeft()
            drawCardTargetTopRight()
            drawCardTargetBottomRight()
          }, 500);
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

function drawCardTargetTopLeft() {
  const cardTarget = document.getElementById("card--target--top-left");
  const videoWidth = Number(window.innerWidth);
  const videoHeight = Number(window.innerHeight);
  console.log('videowidth', videoWidth)
  cardTarget.style.borderLeft = 'thick solid green';
  cardTarget.style.borderTop = 'thick solid green';
  if (videoWidth > 1000) {
    cardTarget.style.top = (videoHeight / 2) - (videoHeight / 4);
    cardTarget.style.left  = (videoWidth / 2) - (videoWidth / 6) - 150;
  } else {
    cardTarget.style.top = (videoHeight / 2) - 150;
    cardTarget.style.left  = 30;
  }
  cardTarget.style.zIndex = 100;
}

function drawCardTargetBottomLeft() {
  const cardTarget = document.getElementById("card--target--bottom-left");
  const videoWidth = Number(window.innerWidth);
  const videoHeight = Number(window.innerHeight);
  cardTarget.style.borderLeft = 'thick solid green';
  cardTarget.style.borderBottom = 'thick solid green';
  if (videoWidth > 1000) {
    cardTarget.style.top = (videoHeight / 2) - (videoHeight / 4) + 350;
    cardTarget.style.left  = (videoWidth / 2) - (videoWidth / 6) - 150;
  } else {
    cardTarget.style.top = (videoHeight / 2) + 30;
    cardTarget.style.left  = 30;
  }
  cardTarget.style.zIndex = 100;
}

function drawCardTargetTopRight() {
  const cardTarget = document.getElementById("card--target--top-right");
  const videoWidth = window.innerWidth;
  const videoHeight = window.innerHeight;
  cardTarget.style.borderRight = 'thick solid green';
  cardTarget.style.borderTop = 'thick solid green';
  if (videoWidth > 1000) {
    cardTarget.style.top = (videoHeight / 2) - (videoHeight / 4);
    cardTarget.style.right = (videoWidth / 2) - (videoWidth / 4);
  } else {
  cardTarget.style.top = (videoHeight / 2) - 150;
  cardTarget.style.right  = 30;
  }
  cardTarget.style.zIndex = 100;
}

function drawCardTargetBottomRight() {
  const cardTarget = document.getElementById("card--target--bottom-right");
  const videoWidth = window.innerWidth;
  const videoHeight = window.innerHeight;
  cardTarget.style.borderRight = 'thick solid green';
  cardTarget.style.borderBottom = 'thick solid green';
  if (videoWidth > 1000) {
    cardTarget.style.top = (videoHeight / 2) - (videoHeight / 4) + 350;
    cardTarget.style.right = (videoWidth / 2) - (videoWidth / 4);
  } else {
  cardTarget.style.top = (videoHeight / 2) + 30;
  cardTarget.style.right  = 30;
  }
  cardTarget.style.zIndex = 100;
}

function successOCR(){
  checkMark.classList.remove("invisible");
  checkMark.classList.add("taken-well");
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
  checkMark.classList.add("invisible");
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL("image/webp");

  Tesseract.recognize(cameraOutput.src).then(function (result) {
    var resultLines = result.lines.length
    if(resultLines > 5 ){
      return successOCR()
    } 
    
  });
  cameraOutput.classList.add("taken");

};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
