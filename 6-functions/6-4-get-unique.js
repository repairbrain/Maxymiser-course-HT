/*Сформировать список без повторений
Реализовать функцию getUnique(arr), которая принимает аргументом массив или 
массивоподоный объект, и возвращает массив таких элементов, которые входят в массив аргумента, 
и встречаются только раз в массиве результата. Аргумент не должен изменяться. 
Порядок элементов результирующего массива должен совпадать с порядком, в котором они 
встречаются в оригинальной структуре.

var a = {};
var b = {};
var u = getUnique([a,b,b,a]);
console.log(u[0] === a); // true
console.log(u[1] === b); // true
console.log(u.length === 2); // true*/


function getUnique(list) {
	var listArray = Array.prototype.slice.call(list);
	var resArr = [];
	listArray.forEach(function(el) {
		if (resArr.indexOf(el) === -1) {
			resArr.push(el);
		}
	});
	return resArr;
}


function getUnique(list) {
	var listArray = Array.prototype.slice.call(list);
	return listArray.filter(function(el, i) {
		return listArray.indexOf(el) === i;
	});
}