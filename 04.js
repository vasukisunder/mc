document.addEventListener('DOMContentLoaded', () => {
    let popupCount = 1;
    
    const purgatorioVerses = [
        {
            text: "With equal steps, like oxen going yoked, I went along beside that <a href='#' class='popup-link' data-text='Virgil, who is Dante's guide through Hell and Purgatory.'>burdened</a> soul, as long as my dear <a href='#' class='popup-link' data-text='Virgil refers to himself as Dante's teacher or pedagogue.'>Pedagogue</a> allowed.",
            title: "Canto X"
        },
        {
            text: "\"Downward turn thine eyes!\" he said to me, \"Well will it be, to <a href='#' class='popup-link' data-text='The souls in Purgatory must learn to calm themselves and resist temptation.'>calm</a> thee on thy way, that thou shouldst see the bed thy soles are treading.\"",
            title: "Canto XII"
        },
        {
            text: "This last request, dear Lord, is not, indeed, made for ourselves, who need not make it here, but is for their sake who behind us <a href='#' class='popup-link' data-text='Refers to the living who are still on Earth and will someday enter Purgatory.'>stayed</a>.",
            title: "Canto XI"
        },
        {
            text: "It showed, moreover, that hard pavement did, how costly once <a href='#' class='popup-link' data-text='Son of Amphiaraus and Eriphyle, who avenged his father by killing his mother.'>Alcmaeon</a> caused his mother's unlucky ornament to seem to her.",
            title: "Canto XII"
        },
        {
            text: "I saw proud <a href='#' class='popup-link' data-text='The ancient city of Troy, destroyed after a ten-year siege by the Greeks.'>Troy</a> in ashes and in caves. O Ilion, how degraded and how vile it showed thou wast, the image there perceived!",
            title: "Canto XII"
        },
        {
            text: "Lift up thy head! The time for going thus absorbed is passed. See there an <a href='#' class='popup-link' data-text='Angels appear at various points in Purgatory to guide souls upward.'>Angel</a> who is making ready to come toward us.",
            title: "Canto XII"
        },
        {
            text: "His arms he opened, then he oped his wings, and said to us: \"Come; near by are the <a href='#' class='popup-link' data-text='The steps that lead upward in Purgatory to the next terrace.'>steps</a>, and going up is easy after this.\"",
            title: "Canto XII"
        },
        {
            text: "Alas! how different are the passes here from those in <a href='#' class='popup-link' data-text='Hell or Inferno is the first realm that Dante visited in the Divine Comedy.'>Hell</a>! For one up here goes in with songs, but there below with frightful wails!",
            title: "Canto XII"
        },
        {
            text: "We now were at the summit of the stairs, where for the second time is cut away the Mount, ascent of which frees one from <a href='#' class='popup-link' data-text='The primary purpose of Purgatory is to cleanse souls of sin before they can enter Paradise.'>sin</a>.",
            title: "Canto XIII"
        },
        {
            text: "The voice which first passed flying, said aloud: \"They have no <a href='#' class='popup-link' data-text='A reference to the Wedding at Cana, where Jesus turned water into wine.'>wine</a>!\" and then behind us kept repeating it.",
            title: "Canto XIII"
        },
        {
            text: "\"What are these voices, Father?\" said I then; and ev'n while I was asking, lo, a third, which said: \"Love those, from whom ye've <a href='#' class='popup-link' data-text='The souls are learning to overcome envy by hearing examples of love.'>ill</a> received!\"",
            title: "Canto XIII"
        },
        {
            text: "Nor do I think there walks on earth to-day a man so hard, that he would not be pierced by <a href='#' class='popup-link' data-text='Dante feels sympathy for the souls in Purgatory, unlike those in Hell.'>sympathy</a> for what I then perceived.",
            title: "Canto XIII"
        }
    ];
    
    // Setup initial popup
    const initialPopup = document.getElementById('main-popup');
    makeDraggable(initialPopup);
    
    // Setup popup closing functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup-close')) {
            const popup = e.target.closest('.popup-container');
            if (popup.id !== 'main-popup') {
                popup.remove();
            }
        }
    });
    
    // Setup popup links functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup-link')) {
            e.preventDefault();
            
            // Get random position on the page
            const x = Math.random() * (window.innerWidth - 400) + 20;
            const y = Math.random() * (window.innerHeight - 300) + 20;
            
            // Create new popup
            const newPopup = createPopup(
                e.target.textContent,
                e.target.getAttribute('data-text'),
                x,
                y
            );
            
            // Add to DOM
            document.body.appendChild(newPopup);
            
            // Make draggable
            makeDraggable(newPopup);
        }
    });
    
    /**
     * Create a new popup element with linked content
     */
    function createPopup(title, textContent, x, y) {
        popupCount++;
        
        // Create popup element
        const popup = document.createElement('div');
        popup.className = 'popup-container';
        popup.id = `popup-${popupCount}`;
        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
        
        // Create header
        const header = document.createElement('div');
        header.className = 'popup-header';
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'popup-title';
        
        const closeButton = document.createElement('div');
        closeButton.className = 'popup-close';
        closeButton.innerHTML = '&times;';
        
        header.appendChild(titleDiv);
        header.appendChild(closeButton);
        
        // Create content - always use a random verse from Purgatorio with linked words
        const contentDiv = document.createElement('div');
        contentDiv.className = 'popup-content';
        
        // Get random verse with linked words
        const randomVerse = purgatorioVerses[Math.floor(Math.random() * purgatorioVerses.length)];
        contentDiv.innerHTML = randomVerse.text;
        
        // Set title based on whether this is from a clicked word
        if (textContent) {
            // Use clicked word as title with verse title
            titleDiv.textContent = title + ' - ' + randomVerse.title;
        } else {
            titleDiv.textContent = randomVerse.title;
        }
        
        // Assemble popup
        popup.appendChild(header);
        popup.appendChild(contentDiv);
        
        return popup;
    }
    
    /**
     * Make an element draggable
     */
    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        let trailElements = []; // Array to store trail elements
        let lastTrailTime = 0; // Track last time a trail element was created
        const TRAIL_INTERVAL = 60; // Milliseconds between trail elements
        const MAX_TRAIL_ELEMENTS = 12; // Maximum number of trail elements
        
        // Get the header for dragging
        const header = element.querySelector('.popup-header');
        if (header) {
            header.onmousedown = dragMouseDown;
        } else {
            element.onmousedown = dragMouseDown;
        }
        
        function dragMouseDown(e) {
            e.preventDefault();
            // Get mouse position at start
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            // Clear any existing trail elements
            clearTrailElements();
            
            // Move element on mouse move
            document.onmousemove = elementDrag;
            document.onmouseup = closeDragElement;
            
            // Bring to front
            element.style.zIndex = getHighestZIndex() + 1;
        }
        
        function elementDrag(e) {
            e.preventDefault();
            // Calculate new position
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            // Set element's new position
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
            
            // Create trail effect while dragging
            const now = Date.now();
            if (now - lastTrailTime > TRAIL_INTERVAL) {
                createTrailElement();
                lastTrailTime = now;
            }
        }
        
        function closeDragElement() {
            // Stop moving when mouse button is released
            document.onmouseup = null;
            document.onmousemove = null;
            
            // Fade out all trail elements
            trailElements.forEach((trail, index) => {
                setTimeout(() => {
                    trail.style.opacity = '0';
                }, index * 50);
                
                // Remove after fade out
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                    }
                }, 500 + index * 50);
            });
            
            // Clear trail array
            trailElements = [];
        }
        
        function createTrailElement() {
            // Clone the element for the trail
            const trail = element.cloneNode(true);
            trail.style.pointerEvents = 'none'; // Prevent interaction with trail elements
            trail.style.position = 'absolute';
            
            // Get actual position of the element
            const rect = element.getBoundingClientRect();
            trail.style.left = rect.left + 'px';
            trail.style.top = rect.top + 'px';
            
            trail.style.zIndex = parseInt(element.style.zIndex) - 1;
            trail.style.opacity = '0.85';
            trail.style.transition = 'opacity 0.5s ease-out';
            trail.classList.add('trail-element');
            
            // Remove transform if it exists (for initial popup)
            trail.style.transform = 'none';
            
            // Remove any ID to avoid duplicates
            trail.removeAttribute('id');
            
            // Append to the document
            document.body.appendChild(trail);
            
            // Add to array of trail elements
            trailElements.push(trail);
            
            // Remove oldest trail element if we have too many
            if (trailElements.length > MAX_TRAIL_ELEMENTS) {
                const oldestTrail = trailElements.shift();
                if (oldestTrail.parentNode) {
                    oldestTrail.parentNode.removeChild(oldestTrail);
                }
            }
        }
        
        function clearTrailElements() {
            // Remove any existing trail elements
            trailElements.forEach(trail => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
            });
            trailElements = [];
        }
    }
    
    /**
     * Get highest z-index value in the document
     */
    function getHighestZIndex() {
        let highestIndex = 10; // Start at 10 for initial popup
        const elements = document.getElementsByTagName('*');
        
        for (let i = 0; i < elements.length; i++) {
            const zIndex = parseInt(
                window.getComputedStyle(elements[i]).getPropertyValue('z-index')
            );
            
            if (zIndex > highestIndex && !isNaN(zIndex)) {
                highestIndex = zIndex;
            }
        }
        
        return highestIndex;
    }
}); 