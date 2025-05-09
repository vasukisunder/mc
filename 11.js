document.addEventListener('DOMContentLoaded', () => {
    setupLightCaptcha();
    setupPathCaptcha();
    
    // Track completed captchas
    let completedCaptchas = 0;
    const totalCaptchas = 2;
    
    // Function to check if all captchas are completed
    function checkAllCompleted() {
        if (completedCaptchas === totalCaptchas) {
            document.querySelector('.completion-message').style.display = 'block';
            
            // Scroll to completion message
            setTimeout(() => {
                document.querySelector('.completion-message').scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
    
    // Light Intensity CAPTCHA
    function setupLightCaptcha() {
        const captcha = document.querySelector('#light-captcha');
        const items = captcha.querySelectorAll('.grid-item');
        const verifyButton = captcha.querySelector('.verify-button');
        
        // Add click event to items
        items.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('selected');
            });
        });
        
        // Add verification logic
        verifyButton.addEventListener('click', () => {
            const selectedItems = Array.from(items).filter(item => item.classList.contains('selected'));
            const correctItems = Array.from(items).filter(item => item.dataset.light === 'true');
            
            const allCorrect = selectedItems.length === correctItems.length && 
                               selectedItems.every(item => item.dataset.light === 'true');
            
            if (allCorrect) {
                verifyButton.textContent = 'Verified';
                verifyButton.classList.add('success');
                verifyButton.disabled = true;
                items.forEach(item => item.style.pointerEvents = 'none');
                
                completedCaptchas++;
                checkAllCompleted();
            } else {
                verifyButton.textContent = 'Try Again';
                verifyButton.classList.add('error');
                
                // Reset after a short delay
                setTimeout(() => {
                    verifyButton.textContent = 'Verify';
                    verifyButton.classList.remove('error');
                    items.forEach(item => item.classList.remove('selected'));
                }, 1500);
            }
        });
        
        // Add refresh functionality
        captcha.querySelector('.refresh-captcha').addEventListener('click', () => {
            items.forEach(item => item.classList.remove('selected'));
            verifyButton.textContent = 'Verify';
            verifyButton.classList.remove('error', 'success');
            verifyButton.disabled = false;
            items.forEach(item => item.style.pointerEvents = 'auto');
        });
    }
    
    // Path Selection CAPTCHA
    function setupPathCaptcha() {
        const captcha = document.querySelector('#path-captcha');
        const pathItems = captcha.querySelectorAll('.path-item');
        const verifyButton = captcha.querySelector('.verify-button');
        const pathContainer = captcha.querySelector('.path-selection');
        
        // Set up drag and drop
        let draggedItem = null;
        
        pathItems.forEach(item => {
            item.addEventListener('dragstart', function(e) {
                draggedItem = this;
                setTimeout(() => this.style.opacity = '0.5', 0);
            });
            
            item.addEventListener('dragend', function() {
                this.style.opacity = '1';
            });
            
            item.addEventListener('dragover', function(e) {
                e.preventDefault();
            });
            
            item.addEventListener('dragenter', function(e) {
                e.preventDefault();
                this.style.background = 'rgba(0,0,0,0.1)';
            });
            
            item.addEventListener('dragleave', function() {
                this.style.background = '';
            });
            
            item.addEventListener('drop', function(e) {
                e.preventDefault();
                this.style.background = '';
                
                if (draggedItem !== this) {
                    // Get the positions in the DOM
                    const allItems = Array.from(pathContainer.querySelectorAll('.path-item'));
                    const draggedIndex = allItems.indexOf(draggedItem);
                    const targetIndex = allItems.indexOf(this);
                    
                    // Swap the elements in the DOM
                    if (draggedIndex < targetIndex) {
                        pathContainer.insertBefore(draggedItem, this.nextSibling);
                    } else {
                        pathContainer.insertBefore(draggedItem, this);
                    }
                    
                    // Update order numbers
                    updateOrderNumbers();
                }
            });
        });
        
        function updateOrderNumbers() {
            const items = Array.from(pathContainer.querySelectorAll('.path-item'));
            items.forEach((item, index) => {
                item.querySelector('.order-number').textContent = index + 1;
            });
        }
        
        // Add verification logic
        verifyButton.addEventListener('click', () => {
            const currentOrder = Array.from(pathContainer.querySelectorAll('.path-item'))
                .map(item => parseInt(item.dataset.elevation));
            
            // Check if in ascending order
            const isAscending = currentOrder.every((val, i, arr) => !i || arr[i-1] < val);
            
            if (isAscending) {
                verifyButton.textContent = 'Verified';
                verifyButton.classList.add('success');
                verifyButton.disabled = true;
                pathItems.forEach(item => item.setAttribute('draggable', 'false'));
                
                completedCaptchas++;
                checkAllCompleted();
            } else {
                verifyButton.textContent = 'Try Again';
                verifyButton.classList.add('error');
                
                // Reset after a short delay
                setTimeout(() => {
                    verifyButton.textContent = 'Verify';
                    verifyButton.classList.remove('error');
                }, 1500);
            }
        });
        
        // Add refresh functionality
        captcha.querySelector('.refresh-captcha').addEventListener('click', () => {
            // Randomize order
            const items = Array.from(pathContainer.querySelectorAll('.path-item'));
            for (let i = items.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                pathContainer.insertBefore(items[j], items[i]);
            }
            
            updateOrderNumbers();
            verifyButton.textContent = 'Verify';
            verifyButton.classList.remove('error', 'success');
            verifyButton.disabled = false;
            pathItems.forEach(item => item.setAttribute('draggable', 'true'));
        });
    }
}); 