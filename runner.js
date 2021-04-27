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
const form = document.querySelector('form');
let paymentSchedule = 0;
let resultCorrect = [];

 
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    console.log(data.get('goal_summ'));
    console.log(data.get('goal_term'));
    console.log(data.get('start_summ'));
    console.log(data.get('percent'));
    console.log(data.get('show_schem'));

    let arrDateTerm = data.get('goal_term').split('-');
    let date = new Date();
    // расчет № дней между двумя датами
    let dateFrom = new Date(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
    let dateTo = new Date(`${arrDateTerm[1]}/${arrDateTerm[2]}/${arrDateTerm[0]}`);
    let differenceInTime = dateTo.getTime() - dateFrom.getTime();  // получил количество милисекунд
    let differenceInDays = differenceInTime / (1000 * 3600 * 24); // пересчитал в дни 
    //console.log(differenceInDays);                             // получил срок между двумя датами
    let termYear = (differenceInDays / 30).toFixed(0);           // количество месяцев выплат % по вкладу    
    let remainderSumm = data.get('goal_summ') - data.get('start_summ');  // разница между суммами накопления и стартовой
    let monthlyPay = remainderSumm / termYear;  // вычисляю сколько понадобится в месяц без учета % по вкладу
    let percentSumm = monthlyPay * data.get('percent') * 30 / 365 / 100;  // сумма % по вкладу за первый месяц 
    

    let newSummEveryMonth = monthlyPay;    
    let resultValueofFirstMonth = monthlyPay;
    let resultArrPercent = [];

    for (let i = 0; i < termYear; i++){
        let newPercentSumm = newSummEveryMonth * data.get('percent') * 30 / 365 / 100;  // к каждой сумме пополнения расчитываю %
        resultArrPercent.push(newPercentSumm.toFixed(2));
        newSummEveryMonth += newPercentSumm;
    }
    let accumSummPercent = 0;
    let correctSumm = monthlyPay;
    for (let e = 0; e < termYear; e++) {    //  массив график пополнения
        resultCorrect.push(correctSumm);
    }
    for (let y = 0; y < resultArrPercent.length; y++) {    //  проценты по вкладам
        accumSummPercent += +resultArrPercent[y];
    }
    let accum = 0;
    for (let h = 0; h < resultCorrect.length; h++) {   // сладываю все суммы накопления
        accum += resultCorrect[h];
    }
    resultCorrect[resultCorrect.length - 1] = resultCorrect[resultCorrect.length - 1] - accumSummPercent; // последний платеж избавляется от суммы процентов
    console.log('массив - график платежей', resultCorrect);
    console.log('проверочная сумма накопления', accum);   
    console.log('сумма процентов по вкладу за срок накопления', accumSummPercent);

    showSumm.innerText = resultValueofFirstMonth.toFixed(2); // вывожу первую сумму пополнения

});

function addNewGoal() {
    let newPlitka = plitka.cloneNode(true);
    newPlitka.lastElementChild.addEventListener('click', () => {
        createListDeposit();
    });
    goalSetting.append(newPlitka);
}

addGoal.addEventListener('click', () => {
    addNewGoal()
})

deleteTar.addEventListener('click', () => {
    plitka.remove();
})

function createListDeposit() {      
    if (!resultCorrect.length) {
        alert('Введите значения в форму') 
    } else if (paymentSchedule) {
        paymentSchedule.remove();
        console.log(paymentSchedule);
        paymentSchedule = 0;
        resultCorrect = [];
    } else {
        paymentSchedule = document.createElement('ul');
        paymentSchedule.classList.add('pay');
        plitka.append(paymentSchedule);
        for (let i = 0; i < resultCorrect.length; i++) {
            let paymentSchedule1 = document.createElement('li');
            paymentSchedule1.innerText = `${resultCorrect[i]}`;
            console.log(resultCorrect[i]);
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
    targetInput.value = name;
    summInput.value = summ;
    goalTerm.value = term;
    percent.value = percents;
});
