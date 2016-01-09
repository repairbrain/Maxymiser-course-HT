/*Реализовать простейший templater
Описать функцию templater(templateString, dataObj). Функция, принимает аргументом строку 
и объект. Заменяет все вхождения подстрок вида ${STRING} значениями из объекта 
с ключом STRING. Пример использования:

templater('${who} ${action} ${what}', {
 who: 'mama',
 action: 'mila',
 what: 'ramu'
}); // 'mama mila ramu'*/



function templater(templateString, dataObj) {
	var splittedArray = templateString.split('$');
	return splittedArray.reduce(function(string, elem) {
		if (elem.indexOf('{') >= 0) {
			var nameOfKey = elem.slice(elem.indexOf("{") + 1, elem.indexOf('}'));
			elem = dataObj[nameOfKey] + elem.slice(elem.indexOf('}') + 1);
		}
		return string + elem;
	}, '');
}


/*Вариант с регулярками*/
function templater(templateString, dataObj) {
	return templateString.replace(/\$\{(.+?)\}/g, function(str, p1) {
		return dataObj[p1];
	});
}