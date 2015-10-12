/*Отфильтровать элементы массива с нечетным индексом
Реализовать функцию extractOddItems(arr), которая возвращает новый массив, 
в котором содержатся только те элементы, которые обладали нечетным индексом в массиве,
переданном в качестве аргумента. Пример работы:

extractOddItems([0,1,0,1,0,1]); // [1,1,1]
extractOddItems([1,2,3,4,5]); [2, 4]*/

function extractOddItems(arr) {
	var resultArray = arr.slice();
	return resultArray.filter(function(el, index) {
		if (index % 2 !== 0) {
			return el;
		}
	});
}