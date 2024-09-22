async function loadUserData() {
    try {
        const response = await fetch('https://labs0lutel.github.io/test1/'); // Ваш URL
        const userData = await response.json();

        if (userData) {
            document.getElementById('userPhoto').src = userData.photo; // Путь к аватару
            document.getElementById('userPhoto').style.display = 'block';
            document.getElementById('userName').textContent = userData.name; // Имя пользователя
        }
    } catch (error) {
        console.error('Ошибка загрузки данных пользователя:', error);
    }
}

// Вызов функции при загрузке страницы
window.onload = loadUserData;