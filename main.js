// Базовые ставки для расчета
const baseRates = {
    vehicle: {
        '1.5': 25,   // ГАЗель
        '2': 35,     // Бычок
        '3': 45,     // Фургон
        '5': 60,     // Рефрижератор
        '10': 80     // Фура
    },
    experience: {
        0: 1.0,
        1: 1.1,
        2: 1.2,
        3: 1.3,
        4: 1.4,
        5: 1.5,
        6: 1.6,
        7: 1.7,
        8: 1.8,
        9: 1.9,
        10: 2.0
    }
};

// Элементы DOM
const vehicleType = document.getElementById('vehicleType');
const city = document.getElementById('city');
const workHours = document.getElementById('workHours');
const experience = document.getElementById('experience');
const hoursValue = document.getElementById('hoursValue');
const experienceValue = document.getElementById('experienceValue');
const salaryAmount = document.getElementById('salaryAmount');
const perDay = document.getElementById('perDay');
const perWeek = document.getElementById('perWeek');
const perMonth = document.getElementById('perMonth');
const perYear = document.getElementById('perYear');
const resetBtn = document.getElementById('resetBtn');
const calculateBtn = document.getElementById('calculateBtn');

// Чекбоксы
const nightWork = document.getElementById('nightWork');
const weekendWork = document.getElementById('weekendWork');
const expedition = document.getElementById('expedition');

// Обновление значений ползунков
workHours.addEventListener('input', function () {
    hoursValue.textContent = `${this.value} часов/неделя`;
    calculateSalary();
});

experience.addEventListener('input', function () {
    const years = this.value;
    experienceValue.textContent = `${years} ${getYearsText(years)} опыта`;
    calculateSalary();
});

// Переключение чекбоксов
[nightWork, weekendWork, expedition].forEach(checkbox => {
    checkbox.addEventListener('click', function () {
        this.classList.toggle('checked');
        calculateSalary();
    });
});

// Перерасчет при изменении селектов
[vehicleType, city].forEach(select => {
    select.addEventListener('change', calculateSalary);
});

// Функция расчета зарплаты
function calculateSalary() {
    const vehicleRate = baseRates.vehicle[vehicleType.value];
    const cityMultiplier = parseFloat(city.value);
    const hours = parseInt(workHours.value);
    const expMultiplier = baseRates.experience[parseInt(experience.value)];

    let bonusMultiplier = 1;

    // Бонусы за дополнительные опции
    if (nightWork.classList.contains('checked')) bonusMultiplier += 0.15;
    if (weekendWork.classList.contains('checked')) bonusMultiplier += 0.20;
    if (expedition.classList.contains('checked')) bonusMultiplier += 0.25;

    // Расчет основной зарплаты
    const baseSalary = vehicleRate * hours * cityMultiplier * expMultiplier * bonusMultiplier;

    // Обновление интерфейса
    salaryAmount.textContent = `${Math.round(baseSalary)} сомони`;
    perDay.textContent = `${Math.round(baseSalary / 4.33)} сомони`;
    perWeek.textContent = `${Math.round(baseSalary)} сомони`;
    perMonth.textContent = `${Math.round(baseSalary * 4.33)} сомони`;
    perYear.textContent = `${Math.round(baseSalary * 52)} сомони`;
}

// Функция для правильного склонения лет
function getYearsText(years) {
    years = parseInt(years);
    if (years === 1) return 'год';
    if (years >= 2 && years <= 4) return 'года';
    return 'лет';
}

// Кнопка сброса
resetBtn.addEventListener('click', function () {
    vehicleType.value = '1.5';
    city.value = '1.2';
    workHours.value = '20';
    experience.value = '1';

    hoursValue.textContent = '20 часов/неделя';
    experienceValue.textContent = '1 год опыта';

    [nightWork, weekendWork, expedition].forEach(checkbox => {
        checkbox.classList.remove('checked');
    });

    calculateSalary();
});

// Кнопка расчета с анимацией
calculateBtn.addEventListener('click', function () {
    calculateSalary();

    // Анимация кнопки
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);

    // Показать уведомление
    showNotification('Расчет обновлен!');
});

// Функция показа уведомления
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function () {
    calculateSalary();
});