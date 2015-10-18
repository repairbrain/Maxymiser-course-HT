/*Выполнить функции из массива
Релизовать функцию execFunctions(arrOfFunctions), которая получает аргументом массив
функций arrOfFunctions, и возвращает массив, где каждый элемент это результат вызова
функции стоящей на индексе, что и элемент.

Пример работы:

function return10() {
  return 10;
}

function returnUser() {
  return {name: "Evgen"};
}

function empty() {}

execFunctions([return10, returnUser, empty]); // [10, {name: "Evgen"}, undefined]*/


function execFunctions(arrOfFunctions) {
	var resultArray = [];
	arrOfFunctions.forEach(function(element) {
		resultArray.push(element());
	});	
	return resultArray;
}