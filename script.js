function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;
}

setInterval(updateTime, 60000);
updateTime();

document.querySelectorAll('.link').forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.transform = 'translateX(5px)';
    });
    
    link.addEventListener('mouseout', () => {
        link.style.transform = 'translateX(0)';
    });
}); 