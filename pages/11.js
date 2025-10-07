document.addEventListener('DOMContentLoaded', () => {
    setupImageFlipCaptcha();
    setupElevationPathCaptcha();
    
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
    
    // Image Flip CAPTCHA
    function setupImageFlipCaptcha() {
        const captcha = document.querySelector('#image-flip-captcha');
        const items = captcha.querySelectorAll('.grid-item');
        const verifyButton = captcha.querySelector('.verify-button');
        const refreshButton = captcha.querySelector('.refresh-captcha');
        
        // Load and split both images
        const frontImage = new Image();
        const backImage = new Image();
        let imagesLoaded = 0;
        
        function setupGridItems() {
            if (imagesLoaded === 2) {
                // Create a canvas to split the images
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Calculate section size
                const sectionWidth = frontImage.width / 3;
                const sectionHeight = frontImage.height / 3;
                
                // Set canvas size to match section size
                canvas.width = sectionWidth;
                canvas.height = sectionHeight;
                
                // Split images into 9 sections and apply to grid items
                items.forEach((item, index) => {
                    const row = Math.floor(index / 3);
                    const col = index % 3;
                    
                    // Create front and back divs
                    const front = document.createElement('div');
                    const back = document.createElement('div');
                    front.className = 'grid-item-front';
                    back.className = 'grid-item-back';
                    
                    // Clear canvas and draw front section
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(
                        frontImage,
                        col * sectionWidth, row * sectionHeight,
                        sectionWidth, sectionHeight,
                        0, 0,
                        sectionWidth, sectionHeight
                    );
                    front.style.backgroundImage = `url(${canvas.toDataURL()})`;
                    
                    // Clear canvas and draw back section
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(
                        backImage,
                        col * sectionWidth, row * sectionHeight,
                        sectionWidth, sectionHeight,
                        0, 0,
                        sectionWidth, sectionHeight
                    );
                    back.style.backgroundImage = `url(${canvas.toDataURL()})`;
                    
                    // Clear the item and add the new divs
                    item.innerHTML = '';
                    item.appendChild(front);
                    item.appendChild(back);
                });
            }
        }
        
        frontImage.onload = function() {
            imagesLoaded++;
            setupGridItems();
        };
        
        backImage.onload = function() {
            imagesLoaded++;
            setupGridItems();
        };
        
        frontImage.src = 'assets/image 2.png';
        backImage.src = 'assets/image 1.png';
        
        // Add click event to items
        items.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('flipped');
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
                    items.forEach(item => {
                        item.classList.remove('selected');
                        item.classList.remove('flipped');
                    });
                }, 1500);
            }
        });
        
        // Add refresh functionality
        refreshButton.addEventListener('click', () => {
            items.forEach(item => {
                item.classList.remove('selected');
                item.classList.remove('flipped');
            });
            verifyButton.textContent = 'Verify';
            verifyButton.classList.remove('error', 'success');
            verifyButton.disabled = false;
            items.forEach(item => item.style.pointerEvents = 'auto');
        });
    }
    
    // Elevation Path CAPTCHA
    function setupElevationPathCaptcha() {
        const captcha = document.querySelector('#elevation-path-captcha');
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

    // False CAPTCHA (reCAPTCHA fake) functionality
    const recaptchaArea = document.querySelector('.recaptcha-checkbox-area');
    const recaptchaCheckbox = document.querySelector('.recaptcha-checkbox');
    const recaptchaLabel = document.querySelector('.recaptcha-label');
    const recaptchaPoetry = document.querySelector('.recaptcha-poetry');
    const recaptchaSubmit = document.querySelector('.recaptcha-submit');

    // Prevent checkbox from being checked
    recaptchaCheckbox.addEventListener('mousedown', e => {
        e.preventDefault();
    });
    recaptchaCheckbox.addEventListener('keydown', e => {
        e.preventDefault();
    });

    // Show poetry on hover is handled by CSS
    // Accept form on submit
    recaptchaSubmit.addEventListener('click', () => {
        setTimeout(() => {
            document.querySelector('.completion-message').style.display = 'block';
            document.querySelector('.completion-message').scrollIntoView({ behavior: 'smooth' });
        }, 600);
    });
}); 