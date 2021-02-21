const videoElement = document.getElementById("video");
const buttonSelect = document.getElementById("buttonSelect");
const buttonStart = document.getElementById("buttonStart");
const buttonStop = document.getElementById("buttonStop");

// Prompt to select media streami pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    // Catch Error here
  }
}
stopStreamedVideo = (videoElement) => {
  const mediaStream = videoElement.srcObject;
  const tracks = mediaStream.getTracks();

  tracks.forEach((track) => {
    track.stop();
  });
};

// Select Picture
buttonSelect.addEventListener("click", async () => {
  // Disable Button
  buttonSelect.disabled = true;
  // Select Picture in Picture
  await selectMediaStream();
  //Reset Button
  buttonSelect.disabled = false;
});

// Start picture in picture
buttonStart.addEventListener("click", async () => {
  // Disable Button
  buttonStart.disabled = true;
  // Start Picture in Picture
  await videoElement.requestPictureInPicture();
  //Reset Button
  buttonStart.disabled = false;
});

// Stop Picture in picture
buttonStop.addEventListener("click", () => {
  stopStreamedVideo(videoElement);
  // Closes the Picture In Picture window
  document.exitPictureInPicture();
});
