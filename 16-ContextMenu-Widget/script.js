(function() {

	var ContextMenu = function(node, structure) {
		this.node = document.querySelector(node);
		this.structure = structure;
	};

	window.ContextMenu = ContextMenu;  

	ContextMenu.prototype.init = function() {
		this.createMenu();
		this.events();
	};

	ContextMenu.prototype.createMenu = function() {
		this.menuWrap = document.createElement('section');
		this.menuWrap.classList.add('menu-wrap');
		this.menuWrap.style.display = "none";

		function createListElem(items) {
			var listElem = document.createElement('ul');
			items.forEach(function(el) {
				var item = document.createElement('li');
				item.classList.add('menu-i');
				item.innerText = el.title;
				if (!el.submenu) {
					item.addEventListener('click', el.action, false);
					listElem.appendChild(item);
				} else {
					item.addEventListener('mouseenter', function() {
						item.classList.add('hovered');
					}, false);
					item.addEventListener('mouseleave', function() {
						item.classList.remove('hovered');
					}, false);
					item.classList.add('submenu');
					listElem.appendChild(item);
					item.appendChild(createListElem(el.submenu));
				}

			});
			return listElem;
		}

		this.menuWrap.appendChild(createListElem(this.structure));
		this.node.appendChild(this.menuWrap);
	};

	ContextMenu.prototype.events = function() {
		this.showMenu = function(e) {
			e.preventDefault();
			this.menuWrap.style.display = "inline-block";
			this.menuWrap.style.left = e.clientX + 'px';
			this.menuWrap.style.top = e.clientY + 'px';
		};

		this.hideMenu = function(e) {
			this.menuWrap.style.display = "none";
		};

		this.node.addEventListener('contextmenu', this.showMenu.bind(this), false);
		this.node.addEventListener('click', this.hideMenu.bind(this), false);

	};

}());