const form = document.querySelector('form');
const calculateTarget = document.querySelector('.calculate_target');
const targetValue = document.querySelector('.target_value');
const targetInput = document.querySelector('.target_input');
const summInput = document.querySelector('.target_summ');
const goalName = document.querySelector('.goal_name');
const goalSumm = document.querySelector('.goal_summ'); // сумма накопения
const goalTerm = document.querySelector('.goal_term'); // срок
const startSumm = document.querySelector('.start_summ'); // стартовая сумма
const percent = document.querySelector('.percent'); // процент
const buttonShowSchem = document.querySelector('.show_schem'); // кнока рассчета
const showSumm = document.querySelector('.replenishment_summ'); // сюда запишу результат
const addGoal = document.querySelector('.goal_button');
const plitka = document.querySelector('.plitka');
const goalSetting = document.querySelector('.goal_setting');
const deleteTar = document.querySelector('.deleteTar');
let paymentSchedule = 0;

function addNewGoal() {
    let newPlitka = plitka.cloneNode(true);
    goalSetting.append(newPlitka);
}

addGoal.addEventListener('click', () => {
    addNewGoal()
})

deleteTar.addEventListener('click', () => {
    plitka.remove();
})

function createListDeposit() {
    let arr1 = [1, 2, 3, 4, 5];
    if (paymentSchedule) {
        paymentSchedule.remove();
        console.log(paymentSchedule);
        paymentSchedule = 0;
    } else {
        paymentSchedule = document.createElement('ul');
        paymentSchedule.classList.add('pay');
        plitka.append(paymentSchedule);
        for (let i = 0; i < arr1.length; i++) {
            let paymentSchedule1 = document.createElement('li');
            paymentSchedule1.innerText = `${arr1[i]}`;
            console.log(paymentSchedule1);
            paymentSchedule.append(paymentSchedule1);
        }
    }
}


buttonShowSchem.addEventListener('click', () => {
    createListDeposit();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    let name = data.get('goal_name');
    let summ = data.get('goal_summ');
    let term = data.get('goal_term');
    let percents = data.get('percent');
    console.dir(term)
    targetInput.value = name;
    summInput.value = summ;
    goalTerm.value = term;
    percent.value = percents;
});