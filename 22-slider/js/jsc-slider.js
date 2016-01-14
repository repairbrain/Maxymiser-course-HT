"use strict";

(function() {
	function JscSlider(node) {
		this.node = node;
		this.imagesSrc = ['img/image1.jpg', 'img/image2.jpg', 'img/image3.jpg', 'img/image4.jpg'];
		this.animationSpeed = 600;
		this.autoSlidingDelay = 2000;
		this.afterClickDelay = 5000;
		this.offsetImages = [0, 910, 1820, 2730];
		this.autoSlidingTimeout = null;
		this.autoSlidingInterval = null;
		this.currentSlide = 0;
		this.initialLayout();
		this.buttonsContainer = node.find('.jsc-controls-wrap');
		this.controlElements = this.buttonsContainer.find('a');
		this.slidesContainer = node.find('.jsc-slides-container');
		this.bindEvents();
		this.autoSliding(true);
	}

	JscSlider.prototype.bindEvents = function() {
		var _this = this;
		this.buttonsContainer.delegate('a', 'click', function() {
			_this.showCurrentImg($(this).index());
			_this.currentSlide = $(this).index();
			_this.autoSliding();
		});
	};

	JscSlider.prototype.initialLayout = function() {
		$('<section class="jsc-slider-container">' +
			'<nav class="jsc-controls-wrap">' +
			'<a class="jsc-control-element active" href="#">&nbsp;</a>' +
			'<a class="jsc-control-element" href="#">&nbsp;</a>' +
			'<a class="jsc-control-element" href="#">&nbsp;</a>' +
			'<a class="jsc-control-element" href="#">&nbsp;</a>' +
			'</nav>' +
			'<figure class="jsc-slides-wrap">' +
			'<div class="jsc-slides-container">' +
			'<img src="' + this.imagesSrc[0] + '"alt="slide1" class="jsc-slide-img">' +
			'<img src="' + this.imagesSrc[1] + '"alt="slide2" class="jsc-slide-img">' +
			'<img src="' + this.imagesSrc[2] + '"alt="slide3" class="jsc-slide-img">' +
			'<img src="' + this.imagesSrc[3] + '"alt="slide4" class="jsc-slide-img">' +
			'</div>' +
			'</figure>' +
			'</section>').appendTo(this.node);
	};

	JscSlider.prototype.showCurrentImg = function(current) {
		this.slidesContainer.stop().animate({
			left: '-' + this.offsetImages[current] + 'px'
		}, this.animationSpeed);
		this.controlElements.removeClass('active');
		this.controlElements.eq(current).addClass('active');
	};

	JscSlider.prototype.autoSliding = function(immediately) {
		var _this = this;
		if (this.autoSlidingTimeout) {
			clearTimeout(this.autoSlidingTimeout);
		}
		if (this.autoSlidingInterval) {
			clearInterval(this.autoSlidingInterval);
		}

		function currentImageCounter() {
			if (_this.currentSlide === 3) {
				_this.currentSlide = -1;
			}
			_this.showCurrentImg(_this.currentSlide + 1);
			_this.currentSlide += 1;
		}

		if (immediately) {
			_this.autoSlidingInterval = setInterval(currentImageCounter, _this.autoSlidingDelay);
		} else {
			this.autoSlidingTimeout = setTimeout(function() {
				currentImageCounter();
				_this.autoSlidingInterval = setInterval(currentImageCounter, _this.autoSlidingDelay);
			}, _this.afterClickDelay);
		}
	};

	window.JscSlider = JscSlider;
}());