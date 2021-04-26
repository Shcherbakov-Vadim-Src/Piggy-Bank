const form = document.querySelector('form');
const calculateTarget = document.querySelector('.calculate_target');
const targetInput = document.querySelector('.target_input');
const summInput = document.querySelector('.target_summ');
const goalName = document.querySelector('.goal_name');
const goalSumm = document.querySelector('.goal_summ'); // сумма накопения
const goalTerm = document.querySelector('.goal_term'); // срок
const startSumm = document.querySelector('.start_summ'); // стартовая сумма
const percent = document.querySelector('.percent'); // процент
const buttonShowSchem = document.querySelector('.show_schem'); // кнока рассчета
const showSumm = document.querySelector('.replenishment_summ'); // сюда запишу результат


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
})


// function slam() {
//     const data = new FormData(event.target);
//     // targetValue.innerText = goalName.value;
//     console.log(goalName.value)
// })