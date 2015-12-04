/*Реализовать функцию getExternalLinks, которая возвращает массив ссылок, ведущих на внешние ресурсы (то есть не на тот домен, где запускается скрипт)*/

function getExternalLinks () {
	var links = document.getElementsByTagName('A');
	return Array.prototype.filter.call(links, function(el) {
		return el.hostname !== window.location.hostname;
	});
}