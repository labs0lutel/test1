const circle = document.getElementById('circle');
const balanceElement = document.getElementById('balance');
const profitClickElement = document.getElementById('profitClick');
const nextStatusElement = document.getElementById('nextStatus');
const profitHourElement = document.getElementById('profitHour');

let balance = parseInt(localStorage.getItem('balance')) || 0;
let pointsPerClick = 1;
let multiplierThreshold = 100000;
let upgradeCount = parseInt(localStorage.getItem('upgradeCount')) || 0;
const maxUpgrades = 10;

function updateBalance() {
    balanceElement.textContent = `Баланс: ${balance} Coins`;
    profitClickElement.innerHTML = `Прибыль за клик <br>+${pointsPerClick}`;
    nextStatusElement.textContent = `Следующий статус ${multiplierThreshold}`;
}

function saveData() {
    localStorage.setItem('balance', balance);
    localStorage.setItem('upgradeCount', upgradeCount);
}

function handleClick() {
    balance += pointsPerClick;
    updateBalance();

    if (balance >= multiplierThreshold && upgradeCount < maxUpgrades) {
        pointsPerClick *= 2; 
        multiplierThreshold *= 2; 
        upgradeCount++; 
        updateBalance(); 
    }
    saveData(); 
}

circle.addEventListener('touchstart', function(event) {
    event.preventDefault(); 
    circle.classList.add('active'); 
    handleClick(); 
});

circle.addEventListener('touchend', function() {
    circle.classList.remove('active'); 
});

updateBalance();
