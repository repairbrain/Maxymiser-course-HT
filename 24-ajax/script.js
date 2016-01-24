(function() {
	'use strict';
	var previousLink = $('.previous-comic')[0].href;
	var allowRequesting = true;

	$(window).scroll(function() {
		var lastComics = $('img[id]:last');
		var lastComicsPosition = lastComics.offset().top + lastComics[0].offsetHeight;
		var documentScrolled = $(window).scrollTop() + document.documentElement.offsetHeight;
		if (documentScrolled > lastComicsPosition && allowRequesting) {
			getPrevComics();
		}
	});

	function getPrevComics() {
		allowRequesting = false;
		var allowSecondLoad = true;
		loadComics();

		function loadComics(setAllowRequesting) {
			$.get(previousLink, function(data) {
				var loadedDom = $(data);
				var loadedComic = loadedDom.find('#comic-container').find('.row').hide();
				previousLink = loadedDom.find('.previous-comic')[0].href;
				if (loadedComic.find('a')[0]) {
					loadComics();
				} else {
					$('#comic-container').append(loadedComic);
					loadedComic.fadeIn(1000);

					if (allowSecondLoad) {
						allowSecondLoad = false;
						loadComics(true);
					}
					if (setAllowRequesting) {
						allowRequesting = true;
					}
				}
			});
		}
	}
}());