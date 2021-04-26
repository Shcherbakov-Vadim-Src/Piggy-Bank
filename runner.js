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
    console.log(termYear);
    let remainderSumm = data.get('goal_summ') - data.get('start_summ');  // разница между суммами накопления и стартовой
    let monthlyPay = remainderSumm / termYear;  // вычисляю сколько понадобится в месяц без учета % по вкладу
    let percentSumm = monthlyPay * data.get('percent') * 30 / 365 / 100;  // сумма % по вкладу за первый месяц 
    console.log(percentSumm);

    let resultArrPay = [];
    let newSummEveryMonth = monthlyPay;
    
    for (let i = 0; i < termYear; i++){
        resultArrPay.push(newSummEveryMonth); // запушиваю первый месяц сумму без %
        let newPercentSumm = newSummEveryMonth * data.get('percent') * 30 / 365 / 100;  // к каждой сумме пополнения расчитываю %
        newSummEveryMonth += newPercentSumm; // прибавляю их для следующего месяца 
    }
    console.log(resultArrPay);

    let resultAcc = 0;  // вот эта сумма получается в итоге вместе с суммой всех начисленных процентов
    for (let k = 0; k < resultArrPay.length; k++) {
        resultAcc += resultArrPay[k];
    }
    console.log(resultAcc);
    
    let highRes = resultAcc / termYear; // завожу расчет с скорректированной суммой 
    
    let highResultArrPay = [];
    for (let i = 0; i < highRes.length; i++){
        highResultArrPay.push(highRes); // запушиваю первый месяц сумму без %
        let highNewPercentSumm = highRes * data.get('percent') * 30 / 365 / 100;  // к каждой сумме пополнения расчитываю %
        highRes += highNewPercentSumm; // прибавляю их для следующего месяца 
    }
    console.log(highResultArrPay);

    let newResultFinal = 0;
    for (let f = 0; f < resultArrPay.length; f++) {
        newResultFinal += resultArrPay[f];
    }
    console.log(newResultFinal);

    showSumm.innerText = (resultAcc / termYear).toFixed(2); // вывожу среднюю сумму пополнения
});

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
