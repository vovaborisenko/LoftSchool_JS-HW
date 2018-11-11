/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const div = document.createElement('div'),
        red = (255*Math.random()).toFixed(0),
        green = (255*Math.random()).toFixed(0),
        blue = (255*Math.random()).toFixed(0);

    div.style.position = 'absolute';
    div.style.top = 100*Math.random() + '%';
    div.style.left = 100*Math.random() + '%';
    div.style.width = 60*Math.random() + '%';
    div.style.height = 60*Math.random() + '%';
    div.style.backgroundColor = `rgb( ${red}, ${green}, ${blue} )`;
    div.className = 'draggable-div';

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target_this) {    

    target_this.addEventListener('mousedown', event => {
        let target = target_this,
            targetTop = target.offsetTop,
            targetLeft = target.offsetLeft,
            eventTop = event.offsetY,
            eventLeft = event.offsetX;

        target.style.zIndex = '2';

        document.addEventListener('mousemove', event => {
            if (target){
                target.style.top = event.y - eventTop + 'px';
                target.style.left = event.x - eventLeft + 'px';                
            }
        });

        target.addEventListener('mouseup', event => {
            if (target) {
                target.style.zIndex = '';
                target = null;
            }
        }); 
    });    
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
