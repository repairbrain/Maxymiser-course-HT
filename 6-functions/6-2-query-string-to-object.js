/*Преобразовать строку запроса (query string) в объект
Реализуй функцию queryStringToObject(queryString), которая возвращает объект. 
Распознавать следующие типы данных: числа, строки, булевы. 
Помни, что некоторые символы query string могут быть закодированы.

Пример работы:

queryStringToObject("user=true"); // {user: true}
queryStringToObject("user=true&age=29"); // {user: true, age: 29}
queryStringToObject("user=true&age=29&name=Evgen"); // {user: true, age: 29, name: "Evgen"}*/



function queryStringToObject(queryString) {
	var resultObj = {};
	if (queryString) {
		var arrOfKeys = queryString.split('&');
		arrOfKeys.forEach(function(el, index) {
			var subArray = el.split('=');
			subArray[1] = decodeURIComponent(subArray[1]);
			if (subArray[1] === "true") {
				subArray[1] = true;
			} else if (subArray[1] === "false") {
				subArray[1] = false;
			} else if (!isNaN(subArray[1])) {
				subArray[1] = Number(subArray[1]);
			}
			resultObj[subArray[0]] = subArray[1];
		});
	}
	return resultObj;
}