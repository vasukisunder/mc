document.addEventListener('DOMContentLoaded', () => {
    const poemContainer = document.getElementById('poem-container');
    
    // Enhanced poem structure with linkWord property for each line
    const poem = [
        { text: "When past the threshold of the Gate we were,", linkWord: "threshold" },
        { text: "whose use the evil love of souls impairs,", linkWord: "evil love" },
        { text: "because it makes the crooked path seem straight,", linkWord: "crooked" },
        { text: "'t was by its sound I knew that it had closed;", linkWord: "closed" },
        { text: "and, had I turned mine eyes in its direction,", linkWord: "eyes" },
        { text: "what would have fittingly excused my fault?", linkWord: "fault" },
        { text: "We mounted through a fissure in the rock,", linkWord: "fissure" },
        { text: "which moved about to this side and to that,", linkWord: "moved" },
        { text: "as moves a wave that flees and draweth near.", linkWord: "wave" },
        { text: "\"A little skill must here be used by us,\"", linkWord: "skill" },
        { text: "my Leader then began, \"in keeping close,", linkWord: "close" },
        { text: "now here, now there, to the receding side.\"", linkWord: "now there" },
        { text: "This caused our steps to be so slow and short,", linkWord: "slow" },
        { text: "that to her bed the waning moon had gone", linkWord: "waning moon" },
        { text: "to rest herself again, ere we had issued", linkWord: "issued" },
        { text: "forth from that needle's eye; but when set free", linkWord: "needle's" },
        { text: "we were, and in the open up above,", linkWord: "open" },
        { text: "where back the Mountain's side recedes, I, weary,", linkWord: "recedes" },
        { text: "and both of us uncertain of our way,", linkWord: "uncertain" },
        { text: "stopped short upon a level place up there,", linkWord: "level place" },
        { text: "more lonely than are roads through desert lands." }
    ];

    // Track positions of all lines to avoid overlaps
    const occupiedSpaces = [];
    const lineElements = [];
    let currentLineIndex = 0;
    let prevLineElement = null;
    let prevLinkElement = null;
    
    // Dimensions for collision detection
    const lineWidth = 400; // Approx width
    const lineHeight = 30;  // Approx height

    // Function to create a poem line with a clickable word
    function createPoemLine(lineData, index, x, y) {
        // Create line container
        const lineElement = document.createElement('div');
        lineElement.className = 'poem-line';
        lineElement.style.left = `${x}px`;
        lineElement.style.top = `${y}px`;
        lineElement.dataset.index = index;
        lineElement.classList.add('hidden'); // Use class for visibility
        lineElement.style.zIndex = '1'; // Ensure text is above connecting lines
        
        // For the text and link
        let lineHTML = '';
        
        const text = lineData.text;
        const linkWord = lineData.linkWord;
        
        // Build the line HTML with the link
        if (linkWord && index < poem.length - 1) {
            // Create regex to find the link word/phrase with word boundaries
            const regex = new RegExp(`(\\b${linkWord}\\b)`, 'i');
            lineHTML = text.replace(regex, `<span class="keyword line-link" data-index="${index}" data-word="${linkWord.toLowerCase()}">$1</span>`);
        } else {
            lineHTML = text;
        }
        
        lineElement.innerHTML = lineHTML;
        poemContainer.appendChild(lineElement);
        
        // Add to occupied spaces
        const actualWidth = lineElement.offsetWidth;
        const actualHeight = lineElement.offsetHeight;
        
        occupiedSpaces.push({
            x: x,
            y: y,
            width: actualWidth,
            height: actualHeight,
            element: lineElement
        });
        
        lineElements.push(lineElement);
        
        // Trigger fade-in animation
        setTimeout(() => {
            lineElement.classList.remove('hidden');
        }, 10);
        
        // Find the link element and set up click handler
        const linkElement = lineElement.querySelector('.line-link');
        setupLineLink(linkElement, lineElement, index);
        
        return lineElement;
    }
    
    // Function to check for collision between rectangles
    function checkCollision(rect1, rect2, buffer = 20) {
        return !(rect1.x + rect1.width + buffer < rect2.x || 
                rect1.x > rect2.x + rect2.width + buffer || 
                rect1.y + rect1.height + buffer < rect2.y || 
                rect1.y > rect2.y + rect2.height + buffer);
    }
    
    // Function to find a valid position for a new line
    function findValidPosition(sourceX, sourceY) {
        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Safety margins to keep lines fully visible
        const margin = 30;
        const safeWidth = viewportWidth - (margin * 2) - lineWidth;
        const safeHeight = viewportHeight - (margin * 2) - lineHeight;
        
        const minDistance = 80;  // Minimum distance from source
        const maxDistance = Math.min(300, Math.min(safeWidth, safeHeight) * 0.6);  // Maximum distance
        const maxAttempts = 50;
        
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            // Generate a random angle (0-360 degrees)
            // Bias towards horizontal movement by adjusting angle distribution
            let angle;
            if (Math.random() < 0.7) {
                // 70% chance of more horizontal movement
                const horizontalBias = Math.random() * 60 - 30; // -30 to 30 degrees
                angle = Math.random() < 0.5 ? 
                    horizontalBias * (Math.PI / 180) : // Right-ish
                    (180 + horizontalBias) * (Math.PI / 180); // Left-ish
            } else {
                // 30% chance of any random direction
                angle = Math.random() * 2 * Math.PI;
            }
            
            // Generate random distance with preference for longer distances
            const distanceFactor = Math.min(0.2 + Math.random() * Math.random(), 1);
            const distance = minDistance + distanceFactor * (maxDistance - minDistance);
            
            // Calculate potential position
            let potentialX = sourceX + Math.cos(angle) * distance;
            let potentialY = sourceY + Math.sin(angle) * distance;
            
            // Ensure position is within viewport bounds
            const x = Math.max(margin, Math.min(viewportWidth - lineWidth - margin, potentialX - (lineWidth / 2)));
            const y = Math.max(margin, Math.min(viewportHeight - lineHeight - margin, potentialY - (lineHeight / 2)));
            
            // Create rect for collision detection
            const potentialRect = {
                x: x,
                y: y,
                width: lineWidth,
                height: lineHeight
            };
            
            // Check collision with existing lines
            let hasCollision = false;
            for (const space of occupiedSpaces) {
                if (checkCollision(potentialRect, space)) {
                    hasCollision = true;
                    break;
                }
            }
            
            // If no collision, we found a valid position
            if (!hasCollision) {
                return { x, y };
            }
        }
        
        // Fallback position if all else fails - find an area with least overlaps
        // Divide the screen into a grid and find the cell with the least occupancy
        const gridSize = 4; // 4x4 grid
        const cellWidth = viewportWidth / gridSize;
        const cellHeight = viewportHeight / gridSize;
        
        const grid = [];
        // Initialize grid counts
        for (let i = 0; i < gridSize; i++) {
            grid[i] = [];
            for (let j = 0; j < gridSize; j++) {
                grid[i][j] = 0;
            }
        }
        
        // Count occupancy in each grid cell
        for (const space of occupiedSpaces) {
            const cellX = Math.floor(space.x / cellWidth);
            const cellY = Math.floor(space.y / cellHeight);
            if (cellX >= 0 && cellX < gridSize && cellY >= 0 && cellY < gridSize) {
                grid[cellX][cellY]++;
            }
        }
        
        // Find cell with minimum occupancy
        let minOccupancy = Infinity;
        let bestCell = {x: 0, y: 0};
        
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] < minOccupancy) {
                    minOccupancy = grid[i][j];
                    bestCell = {x: i, y: j};
                }
            }
        }
        
        // Return position within the least occupied cell with some randomization
        return {
            x: (bestCell.x * cellWidth) + Math.random() * (cellWidth - lineWidth - 20) + 10,
            y: (bestCell.y * cellHeight) + Math.random() * (cellHeight - lineHeight - 20) + 10
        };
    }

    // Function to create connecting line between points
    function createConnectingLine(x1, y1, x2, y2) {
        const line = document.createElement('div');
        line.className = 'connecting-line';
        
        // Calculate distance and angle
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        // Ensure the line has at least a minimum length to be visible
        const minLength = 10;
        if (length < minLength) {
            // Extend the end point slightly in the same direction
            x2 = x1 + Math.cos(angle * Math.PI / 180) * minLength;
            y2 = y1 + Math.sin(angle * Math.PI / 180) * minLength;
        }
        
        // Set line styles
        line.style.width = `0px`; // Start at 0 width for animation
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = '0 0'; // Ensure proper rotation point
        line.style.zIndex = '0'; // Ensure connecting lines are behind text
        
        poemContainer.appendChild(line);
        
        // Trigger animation with a slightly longer delay
        setTimeout(() => {
            line.style.width = `${length}px`;
        }, 50); // Increased delay for more reliable animation
        
        return line; // Return the line element
    }

    // Modify the click handler to ensure proper line creation
    function setupLineLink(linkElement, lineElement, index) {
        if (linkElement && index < poem.length - 1) {
            linkElement.addEventListener('click', (e) => {
                // Add to inventory
                const word = e.target.dataset.word;
                if (typeof addToInventory === 'function') {
                    addToInventory(word);
                    e.target.classList.add('collected');
                }
                
                // Original line creation logic
                const nextIndex = index + 1;
                if (nextIndex < poem.length) {
                    // Get exact position of the link element within the container
                    const linkRect = linkElement.getBoundingClientRect();
                    const containerRect = poemContainer.getBoundingClientRect();
                    
                    // Calculate coordinates relative to the container
                    const linkX = linkRect.left - containerRect.left + (linkRect.width / 2);
                    const linkY = linkRect.top - containerRect.top + (linkRect.height / 2);
                    
                    // Find a valid position for the next line
                    const newPosition = findValidPosition(linkX, linkY);
                    
                    // Create the next line first
                    currentLineIndex++;
                    prevLineElement = lineElement;
                    prevLinkElement = linkElement;
                    const nextLineElement = createPoemLine(poem[currentLineIndex], currentLineIndex, newPosition.x, newPosition.y);
                    
                    // Force a reflow to ensure elements are properly positioned
                    void poemContainer.offsetWidth;
                    
                    // Create connecting line after a delay to ensure DOM is updated
                    setTimeout(() => {
                        try {
                            // Get the container rect again in case of any changes
                            const updatedContainerRect = poemContainer.getBoundingClientRect();
                            
                            // Get updated link position
                            const updatedLinkRect = linkElement.getBoundingClientRect();
                            const updatedLinkX = updatedLinkRect.left - updatedContainerRect.left + (updatedLinkRect.width / 2);
                            const updatedLinkY = updatedLinkRect.top - updatedContainerRect.top + (updatedLinkRect.height / 2);
                            
                            // Get the center position of the next line
                            const nextLineRect = nextLineElement.getBoundingClientRect();
                            
                            // Calculate destination point at the center of the next line
                            const nextLineX = nextLineRect.left - updatedContainerRect.left + (nextLineRect.width / 2);
                            const nextLineY = nextLineRect.top - updatedContainerRect.top + (nextLineRect.height / 2);
                            
                            // Create the connecting line
                            const connectionLine = createConnectingLine(updatedLinkX, updatedLinkY, nextLineX, nextLineY);
                            
                            // Store connection reference
                            nextLineElement.dataset.connectingLine = true;
                        } catch (error) {
                            console.error("Error creating connecting line:", error);
                            // Fallback method for connection line
                            try {
                                const fallbackLine = createConnectingLine(
                                    linkX, 
                                    linkY, 
                                    newPosition.x + (lineWidth / 2), 
                                    newPosition.y + (lineHeight / 2)
                                );
                            } catch (fallbackError) {
                                console.error("Fallback connection also failed:", fallbackError);
                            }
                        }
                    }, 150); // Increased timeout for reliability
                }
            });
        }
    }

    // Initialize the first line with a centered position
    const startX = (window.innerWidth / 2) - (lineWidth / 2);
    const startY = 100;
    createPoemLine(poem[currentLineIndex], currentLineIndex, startX, startY);
}); 