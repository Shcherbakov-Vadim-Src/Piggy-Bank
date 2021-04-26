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
const addGoal = document.querySelector('.goal_button');
const plitka = document.querySelector('.plitka');
const goalSetting = document.querySelector('.goal_setting');
const deleteTar = document.querySelector('.deleteTar');

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
