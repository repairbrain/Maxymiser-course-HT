"use strict";

(function() {
	function Timer(node) {
		this.initialLayout(node);
		this.container = node.querySelector('.container');
		this.currentTimeEl = this.container.querySelector('.stopwatch-current');
		this.startButtonEl = this.container.querySelector('.btn-primary');
		this.lapButtonEl = this.container.querySelector('.btn-info');
		this.resetButtonEl = this.container.querySelector('.btn-sm');
		this.lapsContainer = this.container.querySelector('.stopwatch-laps');
		this.showTime = 0;
		this.savedTime = 0;
		this.lapsTime = [];
		this.updateTimeInterval = null;
		Timer.prototype.activeTimer = this;
		Timer.prototype.keyboardRepeat = 0;

		this.startButtonEl.addEventListener('click', this.toggleTimer.bind(this), false);
		this.lapButtonEl.addEventListener('click', this.addLap.bind(this), false);
		this.resetButtonEl.addEventListener('click', this.reset.bind(this), false);
		this.container.addEventListener('mouseenter', this.setActiveTimer.bind(this), false);
		document.documentElement.addEventListener('keydown', this.keyboardListener.bind(this), false);

		if (!Timer.prototype.instance) {
			Timer.prototype.instance = [];
		}
		Timer.prototype.instance.push(this);
	}

	Timer.prototype.initialLayout = function(node) {
		var container = document.createElement('div');
		container.className = "container";
		var row = document.createElement('div');
		row.className = "row";
		var col_xs_4 = document.createElement('div');
		col_xs_4.className = "col-xs-4";
		var stopwatch_current = document.createElement('h2');
		stopwatch_current.className = "stopwatch-current";
		stopwatch_current.innerText = "00:00:00:000";
		col_xs_4.appendChild(stopwatch_current);
		var stopwatch_laps = document.createElement("div");
		stopwatch_laps.className = "stopwatch-laps";
		col_xs_4.appendChild(stopwatch_laps);
		row.appendChild(col_xs_4);
		var stopwatch_controls = document.createElement("div");
		stopwatch_controls.className = "col-xs-4 stopwatch-controls";
		var btn_group_lg = document.createElement("div");
		btn_group_lg.className = "btn-group btn-group-lg";
		var btn_primary = document.createElement("button");
		btn_primary.className = "btn btn-primary";
		btn_primary.innerText = "Start";
		btn_group_lg.appendChild(btn_primary);
		var btn_info = document.createElement("button");
		btn_info.className = "btn btn-info";
		btn_info.innerText = "Lap";
		btn_group_lg.appendChild(btn_info);
		stopwatch_controls.appendChild(btn_group_lg);
		var btn_sm = document.createElement("button");
		btn_sm.className = "btn btn-danger btn-sm";
		btn_sm.innerText = "Reset";
		stopwatch_controls.appendChild(btn_sm);
		row.appendChild(stopwatch_controls);
		container.appendChild(row);
		node.appendChild(container);
	};

	Timer.prototype.setActiveTimer = function(event) {
		Timer.prototype.instance.forEach(function(instance) {
			if (instance.container.parentNode === event.target.parentNode) {
				Timer.prototype.activeTimer = instance;
			}
		});
	};

	Timer.prototype.keyboardListener = function(event) {
		setTimeout(function() {
			Timer.prototype.keyboardRepeat = 0;
		}, 50);

		if (Timer.prototype.keyboardRepeat > 0) {
			return;
		}

		var _this = Timer.prototype.activeTimer;

		if (event.keyCode === 83) {
			_this.toggleTimer();
		} else if (event.keyCode === 76) {
			_this.addLap();
		} else if (event.keyCode === 82) {
			_this.reset();
		}
		Timer.prototype.keyboardRepeat++;
	};

	Timer.prototype.toggleTimer = function() {
		if (this.updateTimeInterval) {
			this.stopTime();
			this.startButtonEl.textContent = 'Start';
		} else {
			this.startTime(this.savedTime);
			this.startButtonEl.textContent = 'Stop';
		}
	};

	Timer.prototype.convertTime = function(mSec) {
		var ms = mSec % 1000;
		mSec = Math.floor(mSec / 1000);
		var s = mSec % 60;
		mSec = Math.floor(mSec / 60);
		var m = mSec % 60;
		mSec = Math.floor(mSec / 60);
		var h = mSec % 60;

		if (ms < 100) {
			ms = '0' + ms;
		}
		if (s < 10) {
			s = '0' + s;
		}
		if (m < 10) {
			m = '0' + m;
		}
		if (h < 10) {
			h = '0' + h;
		}

		return h + ":" + m + ":" + s + ":" + ms;
	};

	Timer.prototype.startTime = function(savedTime) {
		var clickTime = new Date().getTime();
		this.updateTimeInterval = setInterval(updateTime.bind(this), 16);

		function getNow() {
			return new Date().getTime();
		}

		function updateTime() {
			this.showTime = getNow() - clickTime + savedTime;
			this.currentTimeEl.textContent = this.convertTime(this.showTime);
		}

	};

	Timer.prototype.stopTime = function() {
		clearInterval(this.updateTimeInterval);
		this.savedTime = this.showTime;
		this.updateTimeInterval = null;
	};

	Timer.prototype.addLap = function() {
		if (this.showTime === 0 || this.showTime === this.lapsTime[0]) {
			return;
		}

		this.lapsTime.unshift(this.showTime);
		this.renderLaps();
	};

	Timer.prototype.deleteLap = function(currentLap) {
		this.lapsTime.splice(currentLap, 1);
		this.renderLaps();
	};


	Timer.prototype.reset = function() {
		this.stopTime();
		this.startButtonEl.textContent = 'Start';
		this.showTime = 0;
		this.savedTime = 0;
		this.lapsTime = [];
		this.currentTimeEl.innerText = "00:00:00:000";
		this.renderLaps();
	};

	Timer.prototype.renderLaps = function() {
		var _this = this;

		if (this.lapsContainer.hasChildNodes()) {
			var oldTimers = this.lapsContainer.querySelectorAll('.alert-info');
			Array.prototype.forEach.call(oldTimers, function(el) {
				_this.lapsContainer.removeChild(el);
			});
		}

		this.lapsTime.forEach(function(lap, index) {
			var alert_info = document.createElement('div');
			alert_info.className = "alert alert-info";
			alert_info.innerText = _this.convertTime(lap);
			var label_danger = document.createElement("span");
			label_danger.className = "label label-danger";
			label_danger.innerText = "×";

			label_danger.addEventListener('click', function() {
				_this.deleteLap(index);
			}, false);

			alert_info.appendChild(label_danger);
			_this.lapsContainer.appendChild(alert_info);
		});
	};

	window.Timer = Timer;
})();