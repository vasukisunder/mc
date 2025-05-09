// Inventory functionality
const inventoryPanel = document.querySelector('.inventory-panel');
const inventoryToggle = document.querySelector('.inventory-toggle');
const inventoryContent = document.querySelector('.inventory-content');
let isInventoryExpanded = true;

// Initialize inventory from localStorage
let collectedItems = JSON.parse(localStorage.getItem('collectedItems')) || [];

// Function to update inventory display
function updateInventory() {
    inventoryContent.innerHTML = '';
    
    if (collectedItems.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'inventory-empty';
        emptyMessage.textContent = 'No items collected yet';
        inventoryContent.appendChild(emptyMessage);
    } else {
        collectedItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'inventory-item';
            itemElement.innerHTML = `
                <i class="fas fa-bookmark"></i>
                <span>${item}</span>
            `;
            inventoryContent.appendChild(itemElement);
        });
        
        // Add clear button if we have items - always add it when items exist
        const clearButton = document.createElement('button');
        clearButton.className = 'clear-inventory';
        clearButton.innerHTML = '<i class="fas fa-trash-alt"></i> Clear Collection';
        inventoryContent.appendChild(clearButton);
        
        clearButton.addEventListener('click', clearInventory);
    }
}

// Function to add item to inventory
function addToInventory(word) {
    if (!collectedItems.includes(word)) {
        collectedItems.push(word);
        localStorage.setItem('collectedItems', JSON.stringify(collectedItems));
        updateInventory();
        
        // Show inventory panel if it's the first item
        if (collectedItems.length === 1) {
            inventoryPanel.style.display = 'block';
        }
    }
}

// Function to clear the inventory
function clearInventory() {
    if (confirm('Are you sure you want to clear your collection? This cannot be undone.')) {
        // Clear the storage and array
        collectedItems = [];
        localStorage.removeItem('collectedItems');
        
        // Update the display
        updateInventory();
        
        // Remove 'collected' class from any keywords on the page
        document.querySelectorAll('.keyword.collected').forEach(elem => {
            elem.classList.remove('collected');
        });
        
        // Optionally hide the panel if it would normally be hidden when empty
        if (inventoryPanel.style.display === 'block' && document.querySelectorAll('.keyword').length === 0) {
            inventoryPanel.style.display = 'none';
        }
    }
}

// Toggle inventory panel
inventoryToggle.addEventListener('click', () => {
    isInventoryExpanded = !isInventoryExpanded;
    inventoryPanel.classList.toggle('collapsed');
    
    // Update visibility of content
    if (isInventoryExpanded) {
        // Show content with a slight delay to allow the panel to expand
        setTimeout(() => {
            inventoryContent.style.display = 'block';
            // Re-run updateInventory to ensure clear button is present
            updateInventory();
        }, 100);
    } else {
        inventoryContent.style.display = 'none';
    }
    
    // Update toggle icon
    inventoryToggle.innerHTML = isInventoryExpanded ? 
        '<i class="fas fa-chevron-down"></i>' : 
        '<i class="fas fa-bookmark"></i>';
});

// Helper: Recursively walk nodes and wrap keywords in text nodes only
function wrapKeywordInTextNodes(node, keywords) {
    if (node.nodeType === Node.TEXT_NODE) {
        let replaced = node.nodeValue;
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            replaced = replaced.replace(regex, match => {
                const isCollected = collectedItems.includes(match.toLowerCase());
                return `<span class=\"keyword${isCollected ? ' collected' : ''}\" data-word=\"${match.toLowerCase()}\">${match}</span>`;
            });
        });
        if (replaced !== node.nodeValue) {
            // Replace text node with HTML
            const temp = document.createElement('span');
            temp.innerHTML = replaced;
            while (temp.firstChild) {
                node.parentNode.insertBefore(temp.firstChild, node);
            }
            node.parentNode.removeChild(node);
        }
    } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
        // Don't process inside already keyword-wrapped spans
        if (!node.classList || !node.classList.contains('keyword')) {
            Array.from(node.childNodes).forEach(child => wrapKeywordInTextNodes(child, keywords));
        }
    }
}

// Make keywords clickable
function makeKeywordsClickable(keywords, elements) {
    const textElements = elements || document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, .popup-content');
    textElements.forEach(element => {
        wrapKeywordInTextNodes(element, keywords);
    });

    // Add click handlers to keywords
    document.querySelectorAll('.keyword').forEach(keyword => {
        keyword.addEventListener('click', (e) => {
            const word = e.target.dataset.word;
            addToInventory(word);
            e.target.classList.add('collected');
        });
    });
}

// Initialize when page loads
window.addEventListener('load', () => {
    // First update the inventory display to add items & clear button
    updateInventory();
    
    // Then show panel if there are collected items
    if (collectedItems.length > 0) {
        inventoryPanel.style.display = 'block';
    }
}); 