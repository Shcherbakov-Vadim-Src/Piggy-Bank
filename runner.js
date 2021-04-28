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
const addGoal = document.querySelector('.goal_button');
const plitka = document.querySelector('.plitka');
const goalSetting = document.querySelector('.goal_this');
const deleteTar = document.querySelector('.deleteTar');
const form = document.querySelector('.filling_form');
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
let flag = 'true'

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    aname = data.get('goal_name');
    summ = +data.get('goal_summ');
    term = data.get('goal_term');
    variableStartSumm = +data.get('start_summ');
    percents = +data.get('percent'); 
    calculateDepositValues(+data.get('goal_summ'), data.get('goal_term'), +data.get('start_summ'), +data.get('percent'), flag)
})

function calculateDepositValues(summ, term, startSumm, percents, flag, e){
    let arrDateTerm = term.split('-');
    let date = new Date();
    // расчет № дней между двумя датами
    let dateFrom = new Date(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
    let dateTo = new Date(`${arrDateTerm[1]}/${arrDateTerm[2]}/${arrDateTerm[0]}`);
    let differenceInTime = dateTo.getTime() - dateFrom.getTime();  // получил количество милисекунд
    let differenceInDays = differenceInTime / (1000 * 3600 * 24); // пересчитал в дни 
    
    let termYear = (differenceInDays / 30).toFixed(0);           // количество месяцев выплат % по вкладу    
    let remainderSumm = summ - startSumm;  // разница между суммами накопления и стартовой
    
    let monthlyPay = remainderSumm / (+termYear === -0?termYear = 1:termYear); // вычисляю сколько понадобится в месяц без учета % по вкладу

    let newSummEveryMonth = monthlyPay;    
    let resultValueofFirstMonth = monthlyPay;
    let resultArrPercent = [];
    for (let i = 0; i < termYear; i++){
        let newPercentSumm = newSummEveryMonth * percents * 30 / 365 / 100;  // к каждой сумме пополнения расчитываю %
        resultArrPercent.push(newPercentSumm.toFixed(2));
        newSummEveryMonth += newPercentSumm;
    }
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
    firstDepositAmount = resultValueofFirstMonth.toFixed(2);

    addNewGoal(flag, startSumm);
    changingTheGoal(e, flag, startSumm)
    resultCorrect = [];
    accumSummPercent = 0;
    const showSumm = document.querySelector('.replenishment_summ');   
};

function changingTheGoal(e, flag, startSumm) {
    if (flag === 'folse') {
        createListDeposit(e.target.parentElement, flag)
        e.target.parentElement[3].value = accumSummPercent;
        e.target.parentElement[2].value = startSumm;
    }
}

function addNewGoal(flag, startSumm) {
    if (flag === 'true') {
        let newPlitka = document.createElement('form')
        newPlitka.classList.add('plitka')
        newPlitka.classList.add('goal_setting')
        newPlitka.innerHTML = '<input type="text" class="target_input" name = "target"><input type="number" class="target_summ"><input class="replenishment_summ" name = "replenishment_summ"><input class="percentValue" name = "percentValue"><input class="goal_term" type="date" id="start" name="goal_term" value="2021-04-26" min="2021-01-01" max="2025-12-31"><input class="percent_sub" name="percent" type="number"><button class="show_schem" type = "button">Показать график</button><button type = "button" class="deleteTar">Удалить цель</button>'
        goalSetting.append(newPlitka);     
        newPlitka[0].value = aname;
        newPlitka[1].value = summ;
        newPlitka[2].value = startSumm;
        newPlitka[3].value = accumSummPercent;
        newPlitka[4].value = term;
        newPlitka[5].value = percents;
        createListDeposit(newPlitka)
        newPlitka[6].addEventListener('click', (e) => {        
            openListDeposit(e);       
        });   
        newPlitka[1].addEventListener('input', (e) => {
            summ = +e.target.value;            
            flag = 'folse';
            calculateDepositValues(summ, term, variableStartSumm, percents, flag, e)             
        });
        newPlitka[2].addEventListener('input', (e) => {                     
            startSumm = +e.target.value;
            flag = 'folse';
            calculateDepositValues(summ, term, startSumm, percents, flag, e)             
        });
        newPlitka[5].addEventListener('input', (e) => {
            percents = newPlitka[5].value;                      
            flag = 'folse';
            calculateDepositValues(summ, term, variableStartSumm, percents, flag, e)             
        });
        newPlitka[4].addEventListener('input', (e) => {
            term = newPlitka[4].value;                      
            flag = 'folse';
            calculateDepositValues(summ, term, variableStartSumm, percents, flag, e)             
        });

        newPlitka[7].addEventListener('click', (e) => {
            newPlitka.remove();       
        });
    }
}

function openListDeposit(e) { 
    console.log(resultCorrect)      
    if (e.target.nextElementSibling.style.display === 'none') {
        e.target.nextElementSibling.style.display = 'block';                       
    } else if (e.target.nextElementSibling.style.display === 'block') {
        e.target.nextElementSibling.style.display = 'none';       
    }
}

function createListDeposit(newPlitka, flag) {    
    newListDeposit = document.createElement('ul');
    newListDeposit.style.display = 'none';      
    newListDeposit.classList.add('pay');
    console.log(flag)
    if (flag === 'folse'){ 
        console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqq')       
        newPlitka.lastElementChild.previousElementSibling.remove()
    }    
    newPlitka.insertBefore(newListDeposit, newPlitka.lastElementChild);       
    for (let i = 0; i < resultCorrect.length; i++) {
        let newListDeposit1 = document.createElement('li');
        newListDeposit1.innerText = `${resultCorrect[i]}`;            
        newListDeposit.append(newListDeposit1);
    }   
}