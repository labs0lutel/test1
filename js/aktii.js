let portfolioValue = 0;
let previousPortfolioValue = 0;
let stocks = [];

// Функция покупки акции, вызов будет из другой части приложения
function buyStock(stockName, stockValue) {
    portfolioValue += stockValue;
    updatePortfolioValue();

    // Проверяем, если акция уже куплена, просто обновляем процент
    let existingStock = stocks.find(stock => stock.name === stockName);
    if (existingStock) {
        existingStock.value += stockValue;
    } else {
        stocks.push({ name: stockName, value: stockValue });
    }

    updateStockList();
}

// Функция обновления стоимости портфеля
function updatePortfolioValue() {
    document.getElementById('portfolio-value').textContent = `$ ${portfolioValue.toLocaleString()}`;
}

// Функция обновления списка акций
function updateStockList() {
    const assetList = document.getElementById('assets-list');
    assetList.innerHTML = '';

    stocks.forEach(stock => {
        const percentage = ((stock.value / portfolioValue) * 100).toFixed(2);
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${stock.name} - ${percentage}%</span>
        `;
        assetList.appendChild(li);
    });
}

// Функция для случайных изменений стоимости портфеля
function randomPortfolioChange() {
    // Если в портфеле нет акций, то не изменяем стоимость
    if (stocks.length === 0) {
        return;
    }

    previousPortfolioValue = portfolioValue;

    // Генерация случайного изменения от -1% до +1%
    const changePercentage = (Math.random() * 2 - 1).toFixed(2);
    const changeValue = (portfolioValue * changePercentage / 100).toFixed(2);

    // Обновляем стоимость портфеля
    portfolioValue = (portfolioValue + parseFloat(changeValue)).toFixed(2);
    updatePortfolioValue();
    
    // Обновляем изменение стоимости
    const changeElement = document.getElementById('portfolio-change');
    const changeDirection = changeValue >= 0 ? '↑' : '↓';
    const changeClass = changeValue >= 0 ? 'green' : 'red';
    changeElement.textContent = `${changeDirection} $${Math.abs(changeValue)} (${changePercentage}%)`;
    changeElement.className = `portfolio-change ${changeClass}`;
}

// Запуск случайных изменений каждые 5 секунд
setInterval(randomPortfolioChange, 5000);
