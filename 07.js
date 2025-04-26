// Dante verses to hide in the text
const verses = [
    "Through me you pass into the city of woe",
    "Through me you pass into eternal pain",
    "Through me among the people lost for aye",
    "Justice the founder of my fabric moved",
    "To rear me was the task of power divine",
    "Supremest wisdom, and primeval love",
    "Before me things create were none, save things",
    "Eternal, and eternal I shall endure",
    "All hope abandon, ye who enter here",
    "The glory of Him who moveth everything",
    "Doth penetrate the universe, and shine",
    "In one part more and in another less",
    "The day was going, and the dusky air",
    "Released the living creatures that are on earth"
];

// Function to generate random gibberish text
function generateGibberish(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyz,.!? ';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// Function to scramble text
function scrambleText(text) {
    return text.split('').sort(() => Math.random() - 0.5).join('');
}

// Function to create a text chunk
function createTextChunk(text, isVerse = false) {
    const span = document.createElement('span');
    span.className = isVerse ? 'verse' : 'text-chunk';
    span.textContent = isVerse ? scrambleText(text) : text;
    
    if (isVerse) {
        const originalText = text;
        span.dataset.original = originalText;
        span.dataset.scrambled = span.textContent;
        
        span.addEventListener('mouseenter', () => {
            span.textContent = originalText;
        });
        
        span.addEventListener('mouseleave', () => {
            if (!span.classList.contains('revealed')) {
                span.textContent = span.dataset.scrambled;
            }
        });
        
        span.addEventListener('click', () => {
            span.classList.toggle('revealed');
            span.textContent = span.classList.contains('revealed') ? originalText : span.dataset.scrambled;
        });
    }
    
    return span;
}

// Function to fill the container with text and hidden verses
function fillContainer() {
    const container = document.getElementById('text-container');
    const totalLength = Math.floor(window.innerWidth * window.innerHeight * 0.15); // Adjust density
    let remainingLength = totalLength;
    const usedVerses = new Set();
    
    while (remainingLength > 0) {
        // Randomly decide whether to insert a verse or gibberish
        if (Math.random() < 0.1 && usedVerses.size < verses.length) {
            // Insert a random unused verse
            let verse;
            do {
                verse = verses[Math.floor(Math.random() * verses.length)];
            } while (usedVerses.has(verse));
            
            usedVerses.add(verse);
            container.appendChild(createTextChunk(verse, true));
            remainingLength -= verse.length;
        } else {
            // Insert gibberish
            const chunkLength = Math.min(
                Math.floor(Math.random() * 20) + 5,
                remainingLength
            );
            container.appendChild(createTextChunk(generateGibberish(chunkLength)));
            remainingLength -= chunkLength;
        }
        
        // Add space between chunks
        container.appendChild(document.createTextNode(' '));
    }
}

// Initialize the page
window.addEventListener('load', fillContainer);

// Resize handling
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        document.getElementById('text-container').innerHTML = '';
        fillContainer();
    }, 250);
}); 