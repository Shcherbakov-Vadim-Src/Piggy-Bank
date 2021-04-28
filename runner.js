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
// const showSumm = document.querySelector('.replenishment_summ'); // сюда запишу результат
const addGoal = document.querySelector('.goal_button');
const plitka = document.querySelector('.plitka');
const goalSetting = document.querySelector('.goal_this');
const deleteTar = document.querySelector('.deleteTar');
const form = document.querySelector('form');
let paymentSchedule = 0;
let resultCorrect = [];
let aname = 0;
let summ = 0;
let term = 0;
let percents = 0; 
let variableStartSumm = 0;
let accumSummPercent = 0;
let averageAmount;
let firstDepositAmount;
let flag = 'true';
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    aname = data.get('goal_name');
    summ = data.get('goal_summ');
    term = data.get('goal_term');
    variableStartSumm = data.get('start_summ');
    percents = data.get('percent');    
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
    let monthlyPay = remainderSumm / (+termYear === -0?termYear = 1:termYear); // вычисляю сколько понадобится в месяц без учета % по вкладу
    // let percentSumm = monthlyPay * data.get('percent') * 30 / 365 / 100;  // сумма % по вкладу за первый месяц 
    // console.log(+termYear)
    let newSummEveryMonth = monthlyPay;    
    let resultValueofFirstMonth = monthlyPay;
    let resultArrPercent = [];
    for (let i = 0; i < termYear; i++){
        let newPercentSumm = newSummEveryMonth * data.get('percent') * 30 / 365 / 100;  // к каждой сумме пополнения расчитываю %
        resultArrPercent.push(newPercentSumm.toFixed(2));
        newSummEveryMonth += newPercentSumm;
    }
    let correctSumm = monthlyPay;
    // console.log(correctSumm)
    for (let e = 0; e < termYear; e++) {    //  массив график пополнения
        resultCorrect.push(correctSumm);
    }
    // console.log(resultCorrect)
    for (let y = 0; y < resultArrPercent.length; y++) {    //  проценты по вкладам
        accumSummPercent += +resultArrPercent[y];
    }
    let accum = 0;
    for (let h = 0; h < resultCorrect.length; h++) {   // сладываю все суммы накопления
        accum += resultCorrect[h];
    }
    resultCorrect[resultCorrect.length - 1] = resultCorrect[resultCorrect.length - 1] - accumSummPercent; // последний платеж избавляется от суммы процентов
    // console.log('массив - график платежей', resultCorrect);
    // console.log('проверочная сумма накопления', accum);   
    // console.log('сумма процентов по вкладу за срок накопления', accumSummPercent);
    firstDepositAmount = resultValueofFirstMonth.toFixed(2);
    // console.log(resultCorrect.length)
    addNewGoal();
    const showSumm = document.querySelector('.replenishment_summ');
    // showSumm.innerText = resultValueofFirstMonth.toFixed(2); // вывожу первую сумму пополнения    
    // console.log(showSumm)
    // accumSummPercent = 0;
    // averageAmount = showSumm.innerText;
});
function addNewGoal(e) {
    // let newPlitka = plitka.cloneNode(true);
    let newPlitka = document.createElement('form')
    newPlitka.classList.add('plitka')
    newPlitka.classList.add('goal_setting')
    newPlitka.innerHTML = '<input type="text" class="target_input" name = "target"><input type="number" class="target_summ"><input class="replenishment_summ" name = "replenishment_summ"><input class="percentValue" name = "percentValue"><input class="goal_term" type="date" id="start" name="goal_term" value="2021-04-26" min="2021-01-01" max="2025-12-31"><input class="percent" name="percent" type="number"><button class="show_schem" type = "button">Показать график</button><button type = "button" class="deleteTar">Удалить цель</button></class=>'
    goalSetting.append(newPlitka); 
    // console.log(newPlitka[0])    
    newPlitka[0].value = aname;
    newPlitka[2].value = summ;
    newPlitka[3].value = firstDepositAmount;
    newPlitka[4].value = accumSummPercent;
    newPlitka[5].value = term;
    newPlitka[6].value = percents;
    // newPlitka.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.value = variableStartSumm;
    // newPlitka.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value = term;    
    // newPlitka.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value = percents;  
    // newPlitka.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText = averageAmount;
    // newPlitka.firstElementChild.nextElementSibling.innerText = firstDepositAmount;
    // newPlitka.firstElementChild.nextElementSibling.nextElementSibling.innerText = accumSummPercent; 
    newPlitka[7].addEventListener('click', (e) => {        
        openListDeposit(e);       
    });    
    goalSetting.append(newPlitka);
}
function openListDeposit(e) { 
    console.log(resultCorrect)      
    // if (!resultCorrect.length) {
        // alert('Введите значения в форму') 
    if (resultCorrect.length) {   
        createListDeposit(e);      
        resultCorrect = [];        
    } else if (e.target.nextElementSibling.style.display === 'block') {
        e.target.nextElementSibling.style.display = 'none';  
        console.log(e.target.nextElementSibling)               
    } else if (e.target.nextElementSibling.style.display === 'none') {
        e.target.nextElementSibling.style.display = 'block';       
    }
}
function createListDeposit(e) {
    paymentSchedule = document.createElement('ul');
    paymentSchedule.style.display = 'block';      
    paymentSchedule.classList.add('pay');        
    e.target.parentElement.append(paymentSchedule);       
    for (let i = 0; i < resultCorrect.length; i++) {
        let paymentSchedule1 = document.createElement('li');
        paymentSchedule1.innerText = `${resultCorrect[i]}`;            
        e.target.nextElementSibling.append(paymentSchedule1);
    }   
}
function inputUpdatedValue(e) {
    e.target.parentElement.parentElement.nextElementSibling.nextElementSibling = accumSummPercent;
    e.target.parentElement.parentElement.nextElementSibling = averageAmount;
    // let inputSumm = newPlitka.firstElementChild.firstElementChild.nextElementSibling.firstElementChild
    // inputSumm.value = summ;
    // newPlitka.firstElementChild.firstElementChild.firstElementChild.value = aname;
    // newPlitka.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.value = variableStartSumm;
    // newPlitka.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value = term;    
    // newPlitka.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value = percents;  
    // newPlitka.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText = averageAmount;
    // newPlitka.firstElementChild.nextElementSibling.innerText = firstDepositAmount;
    // newPlitka.firstElementChild.nextElementSibling.nextElementSibling.innerText = accumSummPercent;   
}