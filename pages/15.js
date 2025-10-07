document.addEventListener('DOMContentLoaded', function() {
    // Handle inventory panel
    const inventoryToggle = document.querySelector('.inventory-toggle');
    const inventoryContent = document.querySelector('.inventory-content');
    const inventoryIcon = inventoryToggle.querySelector('i');

    inventoryToggle.addEventListener('click', function() {
        inventoryContent.style.display = 
            inventoryContent.style.display === 'none' ? 'block' : 'none';
        inventoryIcon.style.transform = 
            inventoryContent.style.display === 'none' ? 'rotate(0deg)' : 'rotate(180deg)';
    });

    // Handle multiple choice questions
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Mark the selected option
            this.style.backgroundColor = '#f0f0f0';
            
            // Show next question
            const currentQuestion = this.closest('.question');
            const nextQuestionId = 'question' + (parseInt(currentQuestion.id.replace('question', '')) + 1);
            const nextQuestion = document.getElementById(nextQuestionId);
            
            if (nextQuestion) {
                nextQuestion.style.display = 'block';
            }
        });
    });

    // Handle text input questions
    const submitTextButtons = document.querySelectorAll('.submit-text');
    submitTextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textInput = this.previousElementSibling;
            if (textInput.value.trim() !== '') {
                // Mark the text input as answered
                textInput.style.backgroundColor = '#f0f0f0';
                
                // Show next question
                const currentQuestion = this.closest('.question');
                const nextQuestionId = 'question' + (parseInt(currentQuestion.id.replace('question', '')) + 1);
                const nextQuestion = document.getElementById(nextQuestionId);
                
                if (nextQuestion) {
                    nextQuestion.style.display = 'block';
                }
            }
        });
    });

    // Handle rating questions
    const ratingOptions = document.querySelectorAll('.rating-option');
    ratingOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Mark the selected rating
            this.style.backgroundColor = '#f0f0f0';
            
            // Show next question
            const currentQuestion = this.closest('.question');
            const nextQuestionId = 'question' + (parseInt(currentQuestion.id.replace('question', '')) + 1);
            const nextQuestion = document.getElementById(nextQuestionId);
            
            if (nextQuestion) {
                nextQuestion.style.display = 'block';
            }
        });
    });
}); 