document.addEventListener('DOMContentLoaded', () => {
    let popupCount = 1;
    let currentVerseIndex = 0;
    
    // Verses from Dante's Purgatory with linked words
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
    
    // Setup popup links functionality using event delegation
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup-link')) {
            e.preventDefault();
            
            // Get random position on the page
            const x = Math.random() * (window.innerWidth - 400) + 20;
            const y = Math.random() * (window.innerHeight - 300) + 20;
            
            // Get the next verse in sequence
            const verse = purgatorioVerses[currentVerseIndex];
            currentVerseIndex = (currentVerseIndex + 1) % purgatorioVerses.length;
            
            // Create new popup
            const newPopup = createPopup(
                e.target.textContent,
                e.target.getAttribute('data-text'),
                verse,
                x,
                y
            );
            
            // Add to DOM
            document.body.appendChild(newPopup);
            
            // Make draggable
            makeDraggable(newPopup);
            
            // Start the fading effect after a delay
            setTimeout(() => {
                newPopup.classList.add('fading');
                
                // Remove from DOM after fading completes
                setTimeout(() => {
                    newPopup.remove();
                }, 8000); // Match the CSS transition duration
            }, 5000); // Wait 5 seconds before starting to fade
        }
    });
    
    /**
     * Create a new popup element with content from a verse
     */
    function createPopup(clickedWord, explanation, verse, x, y) {
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
        titleDiv.textContent = `${clickedWord} - ${verse.title}`;
        
        header.appendChild(titleDiv);
        
        // Create content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'popup-content';
        contentDiv.innerHTML = verse.text;
        
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
        }
        
        function closeDragElement() {
            // Stop moving when mouse button is released
            document.onmouseup = null;
            document.onmousemove = null;
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