/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    let promise = fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
        .then((response)=>response.json())
        .then(array=>array.sort((a, b) => a.name > b.name ? 1 : -1));

    return promise;
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    let fullLowerCase = full.toLowerCase(),
        chunkLowerCase = chunk.toLowerCase();

    return fullLowerCase.indexOf(chunkLowerCase) < 0 ? false : true; 
}

/* 
    Функция обновления/перезагрузки приходящего списка городов
 */
function reset() {
    loadingBlock.style.display = 'block';
    filterBlock.style.display = 'none';
    errorBlock.style.display = 'none';
    towns = loadTowns().then(towns => {
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';

        return towns;
    }).catch(() => {
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'none';
        errorBlock.style.display = 'block';
    })
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
/* Блок с сообщением об ошибкой */
const errorBlock = homeworkContainer.querySelector('#error-block');
/* Кнопка перезагрузки списка городов */
const resetButton = homeworkContainer.querySelector('#reset-button');
/* Отсортированный список городов */
let towns = loadTowns();

reset(); // для начала загрузим список городов 

filterInput.addEventListener('keyup', function() {
    // это обработчик нажатия кливиш в текстовом поле
    let chunk = filterInput.value,
        fragment = document.createDocumentFragment();

    filterResult.innerHTML = '';        

    towns.then(arrTowns => {
        for (let town of arrTowns) {
            if (isMatching(town.name, chunk) && chunk) {
                let str = document.createElement('li');
                
                str.innerHTML = town.name;
                fragment.appendChild(str);
            }
        }
        filterResult.appendChild(fragment);
    })

});

resetButton.addEventListener('click', reset); // это обработчик нажатия кнопки "Повторить"

export {
    loadTowns,
    isMatching
};
