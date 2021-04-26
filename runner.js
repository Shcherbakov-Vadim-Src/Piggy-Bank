const form = document.querySelector('form');
const plitka = document.querySelector('.plitka'); // класс 
const calculateTarget = document.querySelector('.calculate_target');
const targetValue = document.querySelector('.target_value');
const goalName = document.querySelector('.goal_name');
const goalSumm = document.querySelector('.goal_summ'); // сумма накопения
const goalTerm = document.querySelector('.goal_term'); // срок
const startSumm = document.querySelector('.start_summ'); // стартовая сумма
const percent = document.querySelector('.percent'); // процент
const buttonShowSchem = document.querySelector('.show_schem'); // кнока рассчета
const showSumm = document.querySelector('.replenishment_summ'); // сюда запишу результат
let paymentSchedule = 0;

function createListDeposit() {
    let arr1 = [1, 2, 3, 4, 5];
    if (paymentSchedule) {
        paymentSchedule.remove();
        console.log(paymentSchedule);
        paymentSchedule = 0;
    }
    else {
        paymentSchedule = document.createElement('ul');
        paymentSchedule.classList.add('pay');
        plitka.append(paymentSchedule);
        for(let i = 0; i <arr1.length; i++) {
        let paymentSchedule1 = document.createElement('li');
        paymentSchedule1.innerText = `${arr1[i]}`;

        console.log(paymentSchedule1);
        paymentSchedule.append(paymentSchedule1);
    }
}
}



buttonShowSchem.addEventListener('click', () => {
    createListDeposit();
})