const tg = window.Telegram.WebApp;

if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;

    document.getElementById('userName').textContent = user.first_name;

    if (user.photo_url) {
        const userPhoto = document.getElementById('userPhoto');
        userPhoto.src = user.photo_url;
        userPhoto.style.display = 'block';
    }
} else {
    document.getElementById('userName').textContent = "Гость";
    console.log("Данные пользователя не найдены.");
}
