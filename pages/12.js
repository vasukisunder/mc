document.addEventListener('DOMContentLoaded', () => {
  const pre = document.querySelector('.ascii-art');
  if (pre) {
    // Remove the minimum common leading whitespace from all lines
    const lines = pre.textContent.split('\n');
    const minIndent = Math.min(
      ...lines.filter(line => line.trim()).map(line => line.match(/^ */)[0].length)
    );
    // Wrap each line in a span for performance
    pre.innerHTML = lines
      .map(line => `<span>${line.slice(minIndent).replace(/ /g, '&nbsp;')}</span>`) 
      .join('<br>');
  }

  // Gravity effect on correct answer
  const form = document.getElementById('ascii-form');
  const input = document.getElementById('ascii-answer');
  // Set your correct word here
  const correctWord = 'wave';

  if (form && input) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (input.value.trim().toLowerCase() === correctWord) {
        // Inject gravity script
        var script = document.createElement('script');
        script.src = 'https://gravityscript.github.io/grav.js';
        document.body.appendChild(script);
        // Optionally hide the overlay
        form.parentElement.style.display = 'none';
      } else {
        input.value = '';
        input.placeholder = 'Try again!';
      }
    });
  }
}); 