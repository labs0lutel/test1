const circle = document.querySelector('.circle');

circle.addEventListener('touchstart', function(event) {
    event.preventDefault(); 
    circle.classList.add('active'); 
});

circle.addEventListener('touchend', function() {
    circle.classList.remove('active'); 
});