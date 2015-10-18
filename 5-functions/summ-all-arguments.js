/*Сложить все аргументы
Реализуй функцию sum(), которая суммирует все передаваемые ей аргументы. 
В аргументах могут быть любые данные. Пример работы:

sum(10, 20); // 30*/

function sum() {
	return Array.prototype.reduce.call(arguments, function(prev, current) {
		return prev+current;
	});
}