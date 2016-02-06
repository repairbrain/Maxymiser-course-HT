'use strict';
(function() {
	function TagList(node, tags) {
		this.$node = $(node);
		this.tags = tags || [];
		this.mode = 'show';
		this.initLayout();
		this.$changeModeLink = this.$node.find('.change-mode-link');
		this.$deleteAllLink = this.$node.find('.delete-all-link');
		this.$tagsWrap = this.$node.find('.tags-wrap');
		this.$inputWrap = this.$node.find('.input-wrap');
		this.$tagInput = this.$inputWrap.find('.tag-input');
		this.$addTagButton = this.$inputWrap.find('.add-tag');
		this.initEvents();
		this.renderTags();
	}

	TagList.prototype.initEvents = function() {
		var _this = this;
		this.$changeModeLink.click(this.changeMode.bind(this));
		this.$deleteAllLink.click(this.deleteAllTags.bind(this));
		this.$addTagButton.click(this.addTag.bind(this));
		this.$tagInput.focus(function() {
			$(document).on('keyup.addTag', function(e) {
				if (e.keyCode === 13) {
					_this.addTag();
				}
			});
		});
		this.$tagInput.blur(function() {
			$(document).off('keyup.addTag');
		});
		this.$tagsWrap.delegate('.close', 'click', function() {
			_this.deleteTag($(this).prev().text());
		});
	};

	TagList.prototype.initLayout = function() {
		$('<section class="container taglist">' +
			'<div class="link-wrap">' +
			'<a href="#" class="xhr change-mode-link">Редактировать тэги</a>' +
			'<a href="#" class="xhr delete-all-link">Удалить все тэги</a>' +
			'</div>' +
			'<div class="tags-wrap clearfix"></div>' +
			'<div class="input-wrap clearfix hidden">' +
			'<input type="text" class="form-control tag-input" placeholder="tag">' +
			'<button class="btn btn-success add-tag">Добавить</button>' +
			'</div>' +
			'</section>').appendTo(this.$node);
	};

	TagList.prototype.changeMode = function() {
		if (this.mode === 'show') {
			this.$inputWrap.removeClass('hidden');
			this.$changeModeLink.text('Завершить редактирование');
			this.mode = 'edit';
		} else if (this.mode === 'edit') {
			this.$inputWrap.addClass('hidden');
			this.$changeModeLink.text('Редактировать тэги');
			this.mode = 'show';
		}
	};

	TagList.prototype.renderTags = function() {
		var _this = this;
		this.$tagsWrap.empty();
		this.tags.forEach(function(elem, index) {
			$('<div class="tag bg-info">' +
				'<span class="tag-caption">' + elem + '</span>' +
				'<button type="button" class="close close-tag" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
				'</div>').appendTo(_this.$tagsWrap);
		});
	};

	TagList.prototype.addTag = function() {
		var inputValue = this.$tagInput[0].value.trim();
		if (this.tags.indexOf(inputValue) === -1 && inputValue !== '') {
			this.tags.push(inputValue);
			this.$tagInput[0].value = '';
			this.renderTags();
		}
	};

	TagList.prototype.deleteTag = function(tagText) {
		var indexTag = this.tags.indexOf(tagText);
		this.tags.splice(indexTag, 1);
		this.renderTags();
	};

	TagList.prototype.deleteAllTags = function() {
		this.tags = [];
		this.renderTags();
	};

	window.TagList = TagList;
}());