const circle = document.getElementById('circle');
        const balanceElement = document.getElementById('balance');

        let balance = parseInt(localStorage.getItem('balance')) || 0;
        let pointsPerClick = 1;

        function updateBalance() {
            balanceElement.textContent = `Баланс: ${balance} Coins`;
        }

        // Общий обработчик для касаний и кликов
        function handleClick() {
            balance += pointsPerClick;
            updateBalance();
            console.log("Баланс обновлен:", balance); // Отладочное сообщение
        }

        // Обработчик события touchend (для мобильных)
        circle.addEventListener('touchend', function(event) {
            event.preventDefault(); // Предотвращает стандартное поведение
            handleClick();
        });

        // Обработчик события click (для десктопа)
        circle.addEventListener('click', handleClick);

        // Инициализация
        updateBalance();