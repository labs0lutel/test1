const circle = document.getElementById('circle');
const balanceElement = document.getElementById('balance');
const profitClickElement = document.getElementById('profitClick');
const nextStatusElement = document.getElementById('nextStatus');
const energyElement = document.querySelector('.energia');

let balance = parseInt(localStorage.getItem('balance')) || 0;
let pointsPerClick = 1;
let upgradeCount = 0; 
const initialNextStatusValue = 100000; 
let energy = parseInt(localStorage.getItem('energy')) || 1000; 
const maxEnergy = 1000; 
const energyRecoveryRate = 39874; 
let lastEnergyUpdate = parseInt(localStorage.getItem('lastEnergyUpdate')) || Date.now();

function updateBalance() {
    balanceElement.textContent = `Баланс: ${balance} Coins`;
    localStorage.setItem('balance', balance); 
}

function updateProfitClick() {
    profitClickElement.innerHTML = `Прибыль за клик <br>+${pointsPerClick}`;
}

function updateEnergy() {
    energyElement.textContent = `${energy}/1000`;
    localStorage.setItem('energy', energy); 
}

function restoreEnergy() {
    const now = Date.now();
    const timePassed = now - lastEnergyUpdate; 
    const energyRecovered = Math.floor(timePassed / energyRecoveryRate); 

    if (energy < maxEnergy) {
        energy = Math.min(maxEnergy, energy + energyRecovered); 
        lastEnergyUpdate = now - (timePassed % energyRecoveryRate); 
        localStorage.setItem('lastEnergyUpdate', lastEnergyUpdate); 
        updateEnergy();
    }
}

function handleClick() {
    if (energy > 0) { 
        balance += pointsPerClick;
        energy--; 
        updateBalance();
        updateEnergy(); 
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


window.addEventListener('load', () => {
    balance = parseInt(localStorage.getItem('balance')) || 0;
    energy = parseInt(localStorage.getItem('energy')) || 1000;
    lastEnergyUpdate = parseInt(localStorage.getItem('lastEnergyUpdate')) || Date.now();

    updateBalance();
    restoreEnergy(); 
});


setInterval(() => {
    const now = Date.now();
    const timePassed = now - lastEnergyUpdate;
    
    
    if (timePassed >= energyRecoveryRate) {
        restoreEnergy();
    }
    
    
    if (energy < maxEnergy) {
        restoreEnergy();
    }
}, 1000); 
