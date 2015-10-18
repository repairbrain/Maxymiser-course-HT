/*Получить название файла или папки из пути
Реализовать функцию getName(path), которая возвращает название папки или файла из строки пути.
Разделители сегментов путей - юниксовые ("/"). Примеры путей:

'/users/dmitry/Dropbox/'
'/users/dmitry/Dropbox'
'/users/dmitry/Dropbox/main.js'*/


function getName(path) {
	var arrayFromPath = path.split('/');
	var filteredArray = arrayFromPath.filter(function(el) {
		return el !== "";
	});
	return filteredArray[filteredArray.length-1];
}