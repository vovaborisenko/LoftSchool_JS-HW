/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');
// дата удаления куки
const date = new Date(2000000000000).toGMTString();

// функция выводит информацию о куках в таблицу
function updateTable() {
    let cookiesObj = getCookies();

    listTable.innerHTML = '';
    if (cookiesObj) {
        for (let cookie in cookiesObj) {
            if ({}.hasOwnProperty.call(cookiesObj, cookie)) {
                let tr = document.createElement('TR');

                tr.innerHTML = `<td>${cookie}</td><td>${cookiesObj[cookie]}</td><td><button   
                    data-name=${cookie} data-value=${cookiesObj[cookie]}>Удалить </button></td>`;
                listTable.appendChild(tr);
            }
        }
    }
}
// функция отдает объект с данными о куках в паре {name : value}, если куков нет => вернет пустой объект
function getCookies() {

    if (document.cookie) {
        let cookies = document.cookie.split('; '),
            filterName = filterNameInput.value,
            cookiesObj = cookies.reduce((prev, current) => {
                let [name, value] = current.split('='),
                    nameHas = isThere(filterName, name),
                    valueHas = isThere(filterName, value);

                if (nameHas || valueHas) {
                    prev[name] = value;
                }                

                return prev;
            }, {});

        return cookiesObj;
    } 

    return {};         
}
// функция добавляет куки взяв данные из формы
function setCookies() {
    let name = addNameInput.value||'empty',
        value = addValueInput.value||'empty';

    document.cookie = `${name}=${value}; expires=${date}`;
}
// функция удаляет куки по name и value 
function deleteCokie(name, value) {
    let expires = new Date(new Date().getTime()-1000).toGMTString();
    
    document.cookie = `${name}=${value}; expires=${expires}`;
}
// функция выводит наличие подстроки(substr) в строке(str)
function isThere(substrUpCase = '', strUpCase = '') {
    let substr = substrUpCase.toLowerCase(),
        str = strUpCase.toLowerCase();

    return str.indexOf(substr) < 0 ? false : true;
}

// при загрузке страницы выведутся все куки
updateTable();

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    updateTable();
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    setCookies();
    // addValueInput.value = '';
    // addNameInput.value = '';
    updateTable();

});
// обрабатывается нажатие на кнопку удалить
listTable.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        deleteCokie(e.target.dataset.name, e.target.dataset.value);
        updateTable();
    }
});