const circle = document.getElementById('circle');
const balanceElement = document.getElementById('balance');
const profitClickElement = document.getElementById('profitClick');
const nextStatusElement = document.getElementById('nextStatus');
const energyElement = document.querySelector('.energia'); // Получаем элемент энергии

let balance = parseInt(localStorage.getItem('balance')) || 0;
let pointsPerClick = 1;
let upgradeCount = 0; 
const initialNextStatusValue = 100000; 
let energy = 1000; // Начальное значение энергии
const maxEnergy = 1000; // Максимальное значение энергии

function updateBalance() {
    balanceElement.textContent = `Баланс: ${balance} Coins`;
}

function updateProfitClick() {
    profitClickElement.innerHTML = `Прибыль за клик <br>+${pointsPerClick}`;
}

function updateEnergy() {
    energyElement.textContent = `${energy}/1000`; // Обновляем текст с энергией
}

function handleClick() {
    if (energy > 0) { // Проверяем, есть ли энергия
        balance += pointsPerClick;
        energy--; // Уменьшаем энергию на 1
        updateBalance();
        updateEnergy(); // Обновляем элемент энергии
        console.log("Баланс обновлен:", balance);
    } else {
        console.log("Недостаточно энергии!");
    }
}

circle.addEventListener('touchend', function(event) {
    event.preventDefault(); 
    handleClick();
});

circle.addEventListener('click', handleClick);

nextStatusElement.addEventListener('click', function() {
    const nextStatusValue = initialNextStatusValue * Math.pow(2, upgradeCount);
    
    if (upgradeCount < 5) { 
        if (balance >= nextStatusValue) {
            balance -= nextStatusValue; 
            updateBalance();
            upgradeCount++;
            pointsPerClick *= 2; 
            updateProfitClick(); 
            
            const newNextStatusValue = initialNextStatusValue * Math.pow(2, upgradeCount); 
            nextStatusElement.textContent = `Следующий статус ${newNextStatusValue.toLocaleString()}`; 
            console.log("Следующий статус обновлен:", newNextStatusValue);
        }
    } else {
        nextStatusElement.textContent = "Максимум"; 
    }
});

// Восстановление энергии
setInterval(() => {
    if (energy < maxEnergy) {
        energy++; // Увеличиваем энергию на 1
        updateEnergy(); // Обновляем элемент энергии
    }
}, 39874); // 0.365 секунд
