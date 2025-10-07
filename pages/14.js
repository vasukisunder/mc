document.addEventListener('DOMContentLoaded', function() {
    const inventoryToggle = document.querySelector('.inventory-toggle');
    const inventoryContent = document.querySelector('.inventory-content');
    const inventoryIcon = inventoryToggle.querySelector('i');

    inventoryToggle.addEventListener('click', function() {
        inventoryContent.style.display = 
            inventoryContent.style.display === 'none' ? 'block' : 'none';
        inventoryIcon.style.transform = 
            inventoryContent.style.display === 'none' ? 'rotate(0deg)' : 'rotate(180deg)';
    });
}); 