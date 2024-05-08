/*========================
	Исходники: https://www.cssscript.com/minimalist-falling-snow-effect-with-pure-javascript-snow-js/
	Анимация переделана для симуляции полета звезд
==========================*/

// Количество
var snowMax = 35;

// Цвета
var snowColor = ["#DDD", "#EEE"];

// Звезды
var snowEntity = "&#x2022;";

// Скорость движения
var snowSpeed = 0.75;

// Минимальный размер
var snowMinSize = 8;

// Максимальный размер
var snowMaxSize = 24;

// Частота обновления
var snowRefresh = 20;

// Стили
var snowStyles = "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;";

var snow = [],
	pos = [],
	coords = [],
	lefr = [],
	marginBottom,
	marginRight;

function randomise(range) {
	rand = Math.floor(range * Math.random());
	return rand;
}

function initSnow() {
	var snowSize = snowMaxSize - snowMinSize;
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth - 15;

	for (i = 0; i <= snowMax; i++) {
		coords[i] = 0;
		lefr[i] = Math.random() * 15;
		pos[i] = 0.03 + Math.random() / 10;
		snow[i] = document.getElementById("flake" + i);
		snow[i].style.fontFamily = "inherit";
		snow[i].size = randomise(snowSize) + snowMinSize;
		snow[i].style.fontSize = snow[i].size + "px";
		snow[i].style.color = snowColor[randomise(snowColor.length)];
		snow[i].style.zIndex = 1000;
		snow[i].sink = snowSpeed * snow[i].size / 5;
		snow[i].posX = randomise(marginRight - snow[i].size);
		snow[i].posY = randomise(2 * marginBottom - marginBottom - 2 * snow[i].size);
		snow[i].style.left = snow[i].posX + "px";
		snow[i].style.top = snow[i].posY + "px";
	}

	moveSnow();
}

function resize() {
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth - 15;
}

function moveSnow() {
	for (i = 0; i <= snowMax; i++) {
		coords[i] += pos[i];
		snow[i].posY += snow[i].sink;
		snow[i].style.top = snow[i].posY + "px";

		if (snow[i].posY >= marginBottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginRight - 3 * lefr[i])) {
			snow[i].posX = randomise(marginRight - snow[i].size);
			snow[i].posY = 0;
		}
	}

	setTimeout("moveSnow()", snowRefresh);
}

for (i = 0; i <= snowMax; i++) {
	document.write("<span id='flake" + i + "' style='" + snowStyles + "position:absolute;top:-" + snowMaxSize + "'>" + snowEntity + "</span>");
}

window.addEventListener('resize', resize);
window.addEventListener('load', initSnow);
