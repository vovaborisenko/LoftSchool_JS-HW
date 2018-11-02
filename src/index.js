/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }

    return;
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var newArray = [];

    for (var i = 0; i < array.length; i++) {
        newArray.push(fn(array[i], i, array));
    }

    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    var result;
    
    for (var i = 0; i < array.length; i++) {
        if (initial && i === 0) {
            result = fn(initial, array[i], i, array);
        } else if (i === 0) {
            result = fn(array[i], array[++i], i, array);
        } else {
            result = fn(result, array[i], i, array);
        }
    }
 
    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    var array = [];

    for (var key in obj) {
        array.push(key.toUpperCase());
    }

    return array;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to) {
    var slicedArray = [],
        length = array.length;

    if (from < 0) {
        from = length + from;
    }
    to = to||length;
    if (to < 0) {
        to = length + to;
    }  
    for (var i = from; i < to; i++) {
        if (array[i]) {
            slicedArray.push(array[i]);
        }
    }

    return slicedArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
