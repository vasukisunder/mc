// Verses from Dante's Purgatorio
const purgatorioVerses = [
    "From every change this place up here is free;",
    "whate'er Heaven's self from its own self receives,",
    "can be the cause of it, and nothing else;",
    "for neither rain, nor hail, nor snow, nor dew,",
    "nor frost falls any higher up than lies",
    "the little stairway of the three short steps;",
    "clouds neither dense or rarefied appear,",
    "nor lightning flashes, nor yet Thaumas' daughter,",
    "who often changes quarter in the world.",
    "Dry vapor goes no higher than the top",
    "of those three steps whereof I spoke to thee,",
    "Below, perhaps, it trembles more or less,",
    "but never quakes up here because of wind",
    "concealed, I know not how, inside the earth.",
    "It trembles here whenever any soul",
    "feels pure enough to rise, or starts to climb;",
    "and such a cry as this endorses it.",
    "Of purity the will alone gives proof,",
    "which, seizing on the soul, now wholly free",
    "to change its company, by willing helps it."
];

// Actual videos from assets folder
const availableVideos = [
    'assets/IMG_0822.mp4',
    'assets/IMG_0823.mp4',
    'assets/IMG_0845.mp4',
    'assets/IMG_0844.mp4',
    'assets/IMG_0850.mp4',
    'assets/IMG_0852.mp4',
    'assets/IMG_0864.mp4',
    'assets/IMG_1120.mp4',
    'assets/IMG_1163.mp4'

];

// Create a randomized array of video sources for the 20 verses
const videoSources = [];
for (let i = 0; i < 20; i++) {
    // Randomly pick one of the 6 videos
    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    videoSources.push(availableVideos[randomIndex]);
}

// Characters to use for scrambling
const scrambleChars = '`~!@#$%^&*()_+-=[]{}|;:",./<>?\\\'';

// Function to scramble text
function scrambleText(text, intensity) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        // Higher intensity means more scrambling
        if (Math.random() < intensity && text[i] !== ' ') {
            result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        } else {
            result += text[i];
        }
    }
    return result;
}

// Function to hide all videos
function hideAllVideos() {
    document.querySelectorAll('.background-video').forEach(v => {
        v.style.opacity = 0;
        v.pause();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Clear any existing content
    document.body.querySelectorAll('.verse-container, .video-container').forEach(el => el.remove());
    
    // Create video container
    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container';
    document.body.appendChild(videoContainer);
    
    // Create videos for each verse
    purgatorioVerses.forEach((text, index) => {
        const video = document.createElement('video');
        video.className = 'background-video';
        video.id = `video-${index}`;
        video.src = videoSources[index]; // Use the randomized video source
        video.muted = true;
        video.loop = true;
        video.preload = 'auto';
        video.style.opacity = 0;
        videoContainer.appendChild(video);
    });
    
    // Create verse container (on top of videos)
    const container = document.createElement('div');
    container.className = 'verse-container';
    document.body.appendChild(container);
    
    // Flag to track if mouse is over any square
    let mouseOverAnySquare = false;
    
    // Create grid cells directly from verses
    purgatorioVerses.forEach((text, index) => {
        const cell = document.createElement('div');
        cell.className = 'verse';
        cell.dataset.originalText = text;
        cell.dataset.videoIndex = index;
        
        // Create initial scrambled text
        const scrambledText = scrambleText(text, 0.7);
        cell.textContent = scrambledText;
        
        // Apply minimal blur for better readability
        cell.style.filter = 'blur(0.5px)';
        
        // Add to container
        container.appendChild(cell);
        
        // Add hover events for video control
        cell.addEventListener('mouseenter', () => {
            mouseOverAnySquare = true;
            const video = document.getElementById(`video-${index}`);
            if (video) {
                // Hide all other videos
                hideAllVideos();
                
                // Show and play this video
                video.style.opacity = 1;
                video.play().catch(e => console.log("Video play error:", e));
            }
        });
        
        cell.addEventListener('mouseleave', () => {
            mouseOverAnySquare = false;
            // Use setTimeout to allow for checking if mouse entered another square
            setTimeout(() => {
                if (!mouseOverAnySquare) {
                    hideAllVideos();
                }
            }, 50);
        });
    });
    
    // Also hide videos when mouse leaves the entire container
    container.addEventListener('mouseleave', () => {
        mouseOverAnySquare = false;
        hideAllVideos();
    });
    
    // Handle mouse movement for text effects
    document.addEventListener('mousemove', e => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        document.querySelectorAll('.verse').forEach(verse => {
            const rect = verse.getBoundingClientRect();
            const verseX = rect.left + rect.width / 2;
            const verseY = rect.top + rect.height / 2;
            
            // Calculate distance and proximity
            const dx = mouseX - verseX;
            const dy = mouseY - verseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Max distance for interaction - increased for easier activation
            const maxDistance = 250;
            const proximity = 1 - Math.min(1, distance / maxDistance);
            
            // Purify text based on proximity
            if (proximity > 0) {
                const originalText = verse.dataset.originalText;
                // Reduced scrambling intensity for easier reading
                const scrambleIntensity = 0.7 * (1 - proximity * 1.2);
                const purifiedText = scrambleText(originalText, scrambleIntensity);
                verse.textContent = purifiedText;
                
                // Adjust clarity - higher base opacity
                verse.style.opacity = 0.8 + proximity * 0.2;
                verse.style.filter = `blur(${Math.max(0, 0.5 - proximity * 0.5)}px)`;
                verse.style.transform = `scale(${1 + proximity * 0.05})`;
                
                // Add visible class for background change
                if (proximity > 0.4) {
                    verse.classList.add('visible');
                } else {
                    verse.classList.remove('visible');
                }
            } else {
                // Return to scrambled state when far - but still more readable
                verse.textContent = scrambleText(verse.dataset.originalText, 0.7);
                verse.style.opacity = 0.6;
                verse.style.filter = 'blur(0.5px)';
                verse.style.transform = 'scale(1)';
                verse.classList.remove('visible');
            }
        });
    });
}); 