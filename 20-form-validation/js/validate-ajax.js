// "use strict";

(function() {
	function ValidateForm(node) {
		this.container = node;
		this.form = this.container.querySelector('form[role="form"]');
		this.emailInput = this.form.querySelector('#email');
		this.passwordInput = this.form.querySelector('#password');
		this.cityInput = this.form.querySelector('#city');
		this.phoneInput = this.form.querySelector('#phone');
		this.checkbox = this.form.querySelector('input[type="checkbox"]');
		this.submit = this.form.querySelector('button[type="submit"]');
		this.hasErrors = false;
		this.keyUpTimeout = null;
		this.bindEvents();
	}

	ValidateForm.prototype.bindEvents = function() {
		this.form.addEventListener('keyup', function(event) {
			if (this.keyUpTimeout) {
				clearTimeout(this.keyUpTimeout);
			}
			this.keyUpTimeout = setTimeout(function() {
				if (event.target === this.emailInput) {
					this.validateEmail();
				} else if (event.target === this.passwordInput) {
					this.validatePassword();
				} else if (event.target === this.phoneInput) {
					this.validatePhone();
				}
			}.bind(this), 500);
		}.bind(this), false);

		this.checkbox.addEventListener('click', this.checkSubmit.bind(this), false);
	};

	ValidateForm.prototype.errorMessageHandler = function(label, message, showBefore) {
		var labelParent = label.parentNode;
		var oldMessage = labelParent.querySelector('.alert-danger');
		if (oldMessage) {
			labelParent.classList.remove('has-error');
			labelParent.removeChild(oldMessage);
		}

		if (!labelParent.classList.contains('has-error') && message) {
			var messageElement = document.createElement('div');
			messageElement.className = "alert alert-danger";
			messageElement.innerText = message;
			labelParent.classList.add('has-error');
			if (showBefore) {
				labelParent.insertBefore(messageElement, labelParent.firstChild);
			} else {
				labelParent.appendChild(messageElement);
			}
		}
	};

	ValidateForm.prototype.validateEmail = function() {
		var _this = this;
		var RE_EMAIL = /^.+@.+\..+$/;
		var isInvalidEmail = !RE_EMAIL.test(this.emailInput.value);
		var isUsedEmail = null;

		var usedEmailRequest = new XMLHttpRequest();
		usedEmailRequest.open('GET', 'https://aqueous-reaches-8130.herokuapp.com/check-email/?email=' + _this.emailInput.value, true);
		usedEmailRequest.send();
		usedEmailRequest.onreadystatechange = function() {
			if (this.readyState != 4 || this.status != 200) {
				return;
			}
			isUsedEmail = JSON.parse(this.responseText).used;
			checkEmail.call(_this);
		};

		function checkEmail() {
			if (isInvalidEmail) {
				this.errorMessageHandler(this.emailInput, 'Некорректный e-mail');
				this.hasErrors = true;
			} else if (isUsedEmail) {
				this.errorMessageHandler(this.emailInput, 'E-mail уже занят');
				this.hasErrors = true;
			} else {
				this.errorMessageHandler(this.emailInput);
				this.hasErrors = false;
			}
			this.checkSubmit();
		}
	};

	ValidateForm.prototype.validatePassword = function() {
		var RE_SHORT_PASSWORD = /^.{5,}$/;
		var RE_ONLY_ONE_TYPE_PASSWORD = /(\d+\D+)|(\D+\d+)/;
		var RE_NOT_ALLOWED_PASSWORD = /^[\w\-]+$/;

		var isShortPassword = !RE_SHORT_PASSWORD.test(this.passwordInput.value);
		var isOneTypePassword = !RE_ONLY_ONE_TYPE_PASSWORD.test(this.passwordInput.value);
		var isNotAllowedPassword = !RE_NOT_ALLOWED_PASSWORD.test(this.passwordInput.value);

		if (isShortPassword) {
			this.errorMessageHandler(this.passwordInput, 'Пароль слишком короток (до 5 символов)');
			this.hasErrors = true;
		} else if (isOneTypePassword) {
			this.errorMessageHandler(this.passwordInput, 'Простой пароль (только буквы или цифры)');
			this.hasErrors = true;
		} else if (isNotAllowedPassword) {
			this.errorMessageHandler(this.passwordInput, 'Пароль содержит запрещенные символы (разрешенные - латинские буквы, цифры, подчеркивание, минус)');
			this.hasErrors = true;
		} else {
			this.errorMessageHandler(this.passwordInput);
			this.hasErrors = false;
		}
		this.checkSubmit();
	};

	ValidateForm.prototype.validatePhone = function() {
		var RE_PHONE = /^\+.{12}$/;
		var isInvalidPhone = !RE_PHONE.test(this.phoneInput.value);

		if (!isInvalidPhone || this.phoneInput.value === '') {
			this.errorMessageHandler(this.phoneInput);
			this.hasErrors = false;
		} else if (isInvalidPhone) {
			this.errorMessageHandler(this.phoneInput, 'Международный формат записи телефона не выдержан');
			this.hasErrors = true;
		}
		this.checkSubmit();
	};

	ValidateForm.prototype.checkSubmit = function() {
		if (!this.checkbox.checked) {
			this.errorMessageHandler(this.submit, 'Галочка "Согласен со всем" не поставлена', true);
		} else if (!(this.emailInput.value && this.passwordInput.value)) {
			this.errorMessageHandler(this.submit, 'Поле, обязательное к заполнению не заполнено', true);
		} else {
			this.errorMessageHandler(this.submit);
		}

		if (!this.hasErrors && this.emailInput.value && this.passwordInput.value && this.checkbox.checked) {
			this.submit.classList.remove('disabled');
		} else {
			this.submit.classList.add('disabled');
		}
	};

	var validateForm = new ValidateForm(document.querySelector('.container'));
}());