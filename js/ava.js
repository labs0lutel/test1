function loadUserData() {
    const userName = localStorage.getItem('userName') || 'Гость';
    const userPhoto = localStorage.getItem('userPhoto') || 'default-avatar.jpg'; // Пусть это будет изображение по умолчанию

    // Установка имени пользователя
    document.getElementById('userName').textContent = userName;

    // Установка аватара пользователя
    const userPhotoElement = document.getElementById('userPhoto');
    userPhotoElement.src = userPhoto;
    userPhotoElement.style.display = 'block';
}

// Вызов функции при загрузке страницы
window.onload = function() {
    loadUserData();
};