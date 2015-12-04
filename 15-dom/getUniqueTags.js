/*Реализовать функцию getUniqueTags, которая возвращает массив названий тегов, присутствуещих на странице. 
В массиве каждого типа тег должен присутствовать в единственном экземпляре.*/

function getUnique(list) {
	var listArray = Array.prototype.slice.call(list);
	return listArray.filter(function(el, i) {
		return listArray.indexOf(el) === i;
	});
}


function getUniqueTags () {
	var allElements = document.getElementsByTagName('*');
	var allElementsTags = [].map.call(allElements, function(el) {
		return el.nodeName;
	});
	return getUnique(allElementsTags);
}