/*Просуммировать числа из массива, которые больше 100
Реализовать функцию sumOnly100Plus, которая принимает аргументом массив, 
и возвращает сумму всех чисел массива, которые больше 100. В массиве могут быть не только числовые данные,
их никак не учитывать. Пример работы:

sumOnly100Plus([150, "200", " ", 30, 300]); // 450*/


function sumOnly100Plus(arr) {
	var result = 0;
	arr.forEach(function(el) {
		if(typeof(el) === "number" && el > 100) {
			result += el;
		}
	});
	return result;
}



function sumOnly100Plus(arr) {
	return arr.reduce(function(prevValue, currentValue, index) {
		if (typeof(currentValue) === "number" && currentValue > 100) {
			return prevValue + currentValue;
		} else {
			return prevValue + 0;
		}
	}, 0);
}