async function loadUserData() {
    const userId = 'USER_ID_FROM_TELEGRAM';

    try {
        const response = await fetch(`/user-data/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        console.log('Полученные данные пользователя:', userData); 

        if (userData && userData.photo && userData.name) {
            document.getElementById('userPhoto').src = userData.photo;
            document.getElementById('userPhoto').style.display = 'block';
            document.getElementById('userName').textContent = userData.name;
        } else {
            console.warn('Данные пользователя неполные:', userData);
        }
    } catch (error) {
        console.error('Ошибка загрузки данных пользователя:', error);
    }
}

window.onload = loadUserData;