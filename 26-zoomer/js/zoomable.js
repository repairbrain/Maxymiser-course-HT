'use strict';

(function() {
	var pathToImg = "img/large/";
	var ESC_CODE = 27;

	function makeZoomable(node) {
		_initEvents(node);
	}

	function _initEvents(node) {
		$(node).find('img').click(function() {
			_convertPath($(this).attr('src'));
		});
		$(document).keyup(function(e) {
			if (e.keyCode === ESC_CODE) {
				_closePopup();
			}
		});
		$(window).resize(_setSize);
	}

	function _convertPath(path) {
		var re = /\w+\..+/g;
		_createPopup(path.match(re));
	}

	function _setSize() {
		var maxWidth = document.documentElement.clientWidth - (document.documentElement.clientWidth * 0.1);
		var maxHeight = document.documentElement.clientHeight - (document.documentElement.clientHeight * 0.1);
		var $popupImg = $('.popup-zoom-img');
		$popupImg.css('max-width', maxWidth);
		$popupImg.css('max-height', maxHeight);
		$('.popup-zoom-img-wrap').show();
	}

	function _createPopup(img) {
		var $popupContainer = $('<div class="popup-zoom">');
		var $imgContainer = $('<div class="popup-zoom-img-wrap">');
		var $popupImage = $('<img class="popup-zoom-img" />');
		var $closeLink = $('<a class="close-popup" href="#"></a>');
		$popupImage.attr('src', pathToImg+img);
		$imgContainer.hide();
		$closeLink.click(_closePopup);
		$imgContainer.append($popupImage).append($closeLink);
		$popupContainer.append($imgContainer);
		$('body').prepend($popupContainer);
		$popupImage.load(_setSize);
	}

	function _closePopup() {
		$('.popup-zoom').detach();
	}

	window.makeZoomable = makeZoomable;
}());