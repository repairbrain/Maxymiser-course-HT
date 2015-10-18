/*Проверить вхождение элементов в массив
Реализовать функцию isInArray , проверяющую вхождение элементов в массив. 
Первый аргумент функции - массив, последующие - элементы, вхождение в массив которых проверяется. 
Функция возвращает true, если все аргументы, кроме первого являются элементами массива.

Пример работы:

isInArray([1], 1); // true
isInArray([1], 1, 2); // false
isInArray([1, 2], 1, 2); // true*/


function isInArray(arr) {
	var arrFromArguments = [];
	for (var i=1; i<arguments.length; i+=1) {
		arrFromArguments.push(arguments[i]);
	}  
	return arrFromArguments.every(function(el) {
		return arr.indexOf(el) >= 0;
	});
}