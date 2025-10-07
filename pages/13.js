// List of frame image paths (replace with your actual frame images)
const frameImages = [
  ...Array.from({length: 200}, (_, i) => `assets/frames/ezgif-frame-${String(i+1).padStart(3, '0')}.jpg`)
];

const unfoldContainer = document.querySelector('.unfold-container');
let currentFrame = 0;
const UNFOLD_DELAY = 60; // ms between each frame unfolding

function addFrame(index, makeClickable = false) {
  if (index >= frameImages.length) return null;
  const frameDiv = document.createElement('div');
  frameDiv.className = 'unfold-frame';
  const img = document.createElement('img');
  img.src = frameImages[index];
  img.alt = `Frame ${index + 1}`;
  frameDiv.appendChild(img);
  if (makeClickable) {
    frameDiv.addEventListener('click', function handler() {
      if (index === currentFrame) {
        unfoldNextFrames();
        frameDiv.removeEventListener('click', handler);
      }
    });
  }
  unfoldContainer.appendChild(frameDiv);
  return frameDiv;
}

function unfoldNextFrames() {
  const framesToAdd = frameImages.length - (currentFrame + 1);
  let i = 1;
  function unfoldStep() {
    if (i > framesToAdd) return;
    const isLast = i === framesToAdd;
    currentFrame++;
    addFrame(currentFrame, isLast);
    if (!isLast) {
      setTimeout(unfoldStep, UNFOLD_DELAY);
    }
    i++;
  }
  unfoldStep();
}

// Initialize with the first frame clickable
addFrame(0, true); 