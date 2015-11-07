/*Реализовать класс на прототипах
Реализовать класс Sequence(arr). Конструктор принимает аргументом массив элементов. 
Имеет методы (описанные в прототипе) go, next, prev. Запоминает на каком элементе из 
массива сейчас находится "указатель".

Метод go(i) возвращает элемент из массива с индексом i, или последний элемент 
массива, если i больше длины массива. Запоминает индекс возвращенного элемента. 
Метод next() возвращает следующий элемент из массива идущий за запомненным индексом, или 
первый элемент массива, если последний запомненный индекс - индекс последнего элемента. 
Метод prev() возвращает предыдущий элемент из массива идущий перед запомненным индексом, 
или последний элемент массива, если последний запомненный индекс - индекс первого элемента.


var s1 = new Sequence(['one', 'two', 'three'])
s1.go(2);  // 'three'
s1.next(); // 'one'
s1.next(); // 'two'

var s2 = new Sequence([{name: 'Manya'}, {name:'Valya'}]);
s2.go(100500); // {name: 'Valya'} последний элемент, так как индекс выходит за границы 
максимального
s2.prev(); // {name: 'Manya'}
s2.prev(); // {name: 'Valya'}*/


function Sequence(arr) {
	this._arr = arr;
	this.i = 0;	
}

Sequence.prototype.go = function(i) {
	if (i > this._arr.length) {
		this.i = this._arr.length - 1;
		return this._arr[this._arr.length - 1];
	} else {
		this.i = i;
		return this._arr[i];
	}
};

Sequence.prototype.next = function() {
	if (this.i === this._arr.length - 1) {
		this.i = 0;
		return this._arr[0];
	} else {
		this.i += 1;
		return this._arr[this.i];
	}
};

Sequence.prototype.prev = function() {
	if (this.i === 0) {
		this.i = this._arr.length - 1;
		return this._arr[this._arr.length - 1];
	} else {
		this.i -= 1;
		return this._arr[this.i];
	}
};



