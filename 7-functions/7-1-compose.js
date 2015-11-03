/*Объединить несколько функций в одну
Реализовать функцию compose, которая принимает аргументами любое количество функций, 
и возвращает функцию, которая при вызове вызовет все функции, которые compose 
получила аргументом.

function log1() {console.log(111)};
function log2() {console.log(222)};
function log3() {console.log(333)};
var logAll = compose(log1, log2, log3);
logAll(); // 111
          // 222
          // 333*/



function compose() {
	var arrOfFunctions = Array.prototype.slice.call(arguments);
	return function() {
		arrOfFunctions.map(function(el) {
			return el();
		});
	};
}