/*Создать класс car на прототипах. Добавить и использовать вспомогательный метод getRealDistance(speed) 
внутри метода drive. Взять за основу файл с вебинара93. Характеристики (скорости, расход топлива) машины устанавливаются 
при создании экземпляра класса.*/



var Car = function(durability, gas, speeds) {
	this.durability = durability;
	this.gas = gas;
	this.speeds = speeds;
};


Car.prototype.drive = function(distance, speed) {
	var speedCharacteristics = this.speeds[speed];
	var drivingDistance = Math.min(distance, this.gas / speedCharacteristics.gas * 100);

	var durabilitySpent = drivingDistance * speedCharacteristics.durability;
	var durabilityLeft = this.durability - durabilitySpent;

	var realDistance = getRealDistance();

	function getRealDistance() {
		if (durabilityLeft < 0) {
			return this.durability / speedCharacteristics.durability;
		} else {
			return drivingDistance;
		}
	}


	var realDurabilitySpent = realDistance * speedCharacteristics.durability;
	var realGasSpent = realDistance * speedCharacteristics.gas / 100;
	this.durability -= realDurabilitySpent;
	this.gas -= realGasSpent;
	return this;
};


var car = new Car(0.38, 50, {
	slow: {
		durability: 0.002,
		gas: 10
	},
	average: {
		durability: 0.002,
		gas: 12
	},
	fast: {
		durability: 0.006,
		gas: 11
	}
});

car.drive(100, 'slow'); // Car {durability: 0.18, gas: 40, speeds: Object}