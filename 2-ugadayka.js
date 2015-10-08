/*Игра Угадайка

Напиши программу, которая загадывает целое число до 50, и просит пользователя число отгадать. Каждый раз, когда пользовател вводит число,
которое ближе к ответу, чем предыдущее предположение пользователя, программа выдает prompt для следующего числа с сообщением "теплее",
 если новое предположение отдаляется от задуманного числа, программа выводит prompt с сообщением "холоднее". 
 После отгадывания числа программа с помощью alert показывает количество попыток, за сколько было угадано число. 
 Максимальное число попыток: 10 (должно быть настраиваемым). После этого игра считается проиграной, о чем сообщается в alert окошке.

Пример работы (мои комментарии идут за //):
загаданное число: 34
программа: Я загадала число. Угадывай, пользователь
пользователь: 20
программа: теплее
пользователь: 10
программа: холоднее
пользователь: 15
программа: теплее
пользователь: 35
программа: теплее // (потому что 35 ближе к 34, чем 15)
пользователь: 45
программа: холоднее
пользователь: 34
программа: угадал, хитрец, за 6 попыток.*/

var computerChoice = parseInt((Math.random() * 50), 10);
var currentChoice = parseInt(prompt('Я загадала число от 0 до 50. Угадывай, пользователь') ,10);
var previousChoice = 0;
var maxIteration = 10;

for (var currentIteration = 1; currentIteration <= maxIteration + 1; currentIteration += 1) {
	if (currentIteration === maxIteration + 1) {
		alert("Вы проиграли! Какая досада!");
	} else if (currentChoice === computerChoice) {
		alert('Угадал, хитрец, за ' + currentIteration + ' попыток.');
		break;
	} else if (Math.abs(computerChoice - currentChoice) < Math.abs(computerChoice - previousChoice)) {
		previousChoice = currentChoice;
		currentChoice = parseInt(prompt('Теплее, твой ход!') ,10);
	} else if (Math.abs(computerChoice - currentChoice) > Math.abs(computerChoice - previousChoice)) {
		previousChoice = currentChoice;
		currentChoice = parseInt(prompt('Холоднее, твой ход!') ,10);
	}
}
