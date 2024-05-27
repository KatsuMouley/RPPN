document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const redBox = document.getElementById('redBox');

    toggleButton.addEventListener('click', function() {
        redBox.classList.toggle('visible');
    });
});
