/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

startApp();

function startApp() {
	var startTime = new Date().getTime();
	var stats = [0, 0, startTime];
	var url = 'https://gist.githubusercontent.com/vergilius/6d869a7448e405cb52d782120b77b82c/raw/e75dc7c19b918a9f0f5684595899dba2e5ad4f43/history-flashcards.json';

	exitApp();
	again();
	fetchData(url, stats);
}

function fetchData(url, stats) {
	fetch(url).then(function (resp) {
		return resp.json();
	}).then(function (resp) {
		createElements(resp, stats);
	});
}

function createElements(card, stats) {
	var cardQuestion = document.getElementsByClassName("card__question")[0];
	var cardAnswers = document.getElementsByClassName("card__box-answers")[0];

	var question = document.createElement("h1");
	question.classList = "card__headline sg-text-bit sg-text-bit sg-text-bit--light sg-header-primary--small";
	var answerFirst = document.createElement("h2");
	answerFirst.classList = "card__answer card__answer--first sg-header-primary sg-header-primary--xsmall sg-header-primary--light";
	var answerSecond = document.createElement("h2");
	answerSecond.classList = "card__answer card__answer--second sg-header-primary sg-header-primary--xsmall sg-header-primary--light";

	appendElements(card, cardQuestion, cardAnswers, question, answerFirst, answerSecond, stats);
}

function appendElements(card, cardQuestion, cardAnswer, question, answerFirst, answerSecond, stats) {
	cardQuestion.textContent = "";
	cardAnswer.textContent = "";

	cardQuestion.appendChild(question);
	cardAnswer.appendChild(answerFirst);
	cardAnswer.appendChild(answerSecond);

	inputData(card, question, answerFirst, answerSecond, stats);
}

function inputData(card, question, answerFirst, answerSecond, stats) {
	var cardFirst = card[0];
	question.textContent = cardFirst.question;
	answerFirst.textContent = cardFirst.answers[0].answer;
	answerSecond.textContent = cardFirst.answers[1].answer;

	eventListener(card, cardFirst, stats);
}

function eventListener(card, cardFirst, stats) {
	var allAnswers = document.getElementsByClassName("card__answer");

	var _loop = function _loop(i) {
		allAnswers[i].addEventListener('click', function () {
			checkAnswer(i, cardFirst, card, allAnswers, stats);
		}, false);
	};

	for (var i = 0; i < allAnswers.length; i++) {
		_loop(i);
	}
}

function checkAnswer(i, cardFirst, card, allAnswers, stats) {
	if (cardFirst.answers[i].correct == true) {
		stats[0] += 1;
		card.splice(0, 1);
	} else {
		stats[1] += 1;
		card.push(card.shift());
	}

	showAnswer(i, allAnswers, cardFirst);

	var time = setTimeout(function () {
		removeClass(allAnswers);
		checkAmountOfCards(card, stats);
	}, 3200);
}

function showAnswer(i, allAnswers, cardFirst) {
	if (cardFirst.answers[0].correct == true) {
		allAnswers[0].classList += " good-answer";
		allAnswers[1].classList += " wrong-answer";
	} else {
		allAnswers[1].classList += " good-answer";
		allAnswers[0].classList += " wrong-answer";
	}
}

function removeClass(allAnswers) {
	for (var i = 0; i < allAnswers.length; i++) {
		if (allAnswers[i].classList.contains("good-answer")) {
			allAnswers[i].classList.remove("good-answer");
		}
		if (allAnswers[i].classList.contains("wrong-answer")) {
			allAnswers[i].classList.remove("wrong-answer");
		}
	}
}

function checkAmountOfCards(card, stats) {
	if (card.length != 0) {
		createElements(card, stats);
	} else {
		feedback(card, stats);
	}
}

function feedback(card, stats) {
	var feedbackContainer = document.getElementsByClassName("feedback")[0];
	feedbackContainer.classList += " feedback-flex";

	var feedbackStats = document.getElementsByClassName("feedback__text");
	var howLong = (new Date().getTime() - stats[2]) / 1000;

	feedbackStats[0].textContent = "GOOD ANSWERS: " + stats[0];
	feedbackStats[1].textContent = "WRONG ANSWERS: " + stats[1];
	feedbackStats[2].textContent = "TIME: " + howLong;
}

function again() {
	var againButton = document.getElementsByClassName("again")[0];
	var feedbackContainer = document.getElementsByClassName("feedback")[0];

	againButton.addEventListener("click", function () {
		feedbackContainer.classList.remove("feedback-flex");
		startApp();
	});
}

function exitApp() {
	var exitButton = document.getElementsByClassName("header__exit")[0];

	exitButton.addEventListener("click", function () {
		startApp();
	});
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDY5N2I3NGJhNGVjM2IxMmIzMjUiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zY3NzL2FwcC5zY3NzIl0sIm5hbWVzIjpbInN0YXJ0QXBwIiwic3RhcnRUaW1lIiwiRGF0ZSIsImdldFRpbWUiLCJzdGF0cyIsInVybCIsImV4aXRBcHAiLCJhZ2FpbiIsImZldGNoRGF0YSIsImZldGNoIiwidGhlbiIsInJlc3AiLCJqc29uIiwiY3JlYXRlRWxlbWVudHMiLCJjYXJkIiwiY2FyZFF1ZXN0aW9uIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2FyZEFuc3dlcnMiLCJxdWVzdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhbnN3ZXJGaXJzdCIsImFuc3dlclNlY29uZCIsImFwcGVuZEVsZW1lbnRzIiwiY2FyZEFuc3dlciIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJpbnB1dERhdGEiLCJjYXJkRmlyc3QiLCJhbnN3ZXJzIiwiYW5zd2VyIiwiZXZlbnRMaXN0ZW5lciIsImFsbEFuc3dlcnMiLCJpIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNoZWNrQW5zd2VyIiwibGVuZ3RoIiwiY29ycmVjdCIsInNwbGljZSIsInB1c2giLCJzaGlmdCIsInNob3dBbnN3ZXIiLCJ0aW1lIiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwiY2hlY2tBbW91bnRPZkNhcmRzIiwiY29udGFpbnMiLCJyZW1vdmUiLCJmZWVkYmFjayIsImZlZWRiYWNrQ29udGFpbmVyIiwiZmVlZGJhY2tTdGF0cyIsImhvd0xvbmciLCJhZ2FpbkJ1dHRvbiIsImV4aXRCdXR0b24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtB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LENBQWdDLFVBQWhDLEVBQTRDLENBQTVDLENBQTFCO0FBQ0FpQyxtQkFBa0I3QixTQUFsQixJQUErQixnQkFBL0I7O0FBRUEsS0FBTThCLGdCQUFnQm5DLFNBQVNDLHNCQUFULENBQWdDLGdCQUFoQyxDQUF0QjtBQUNBLEtBQU1tQyxVQUFVLENBQUMsSUFBSWxELElBQUosR0FBV0MsT0FBWCxLQUF1QkMsTUFBTSxDQUFOLENBQXhCLElBQW9DLElBQXBEOztBQUVBK0MsZUFBYyxDQUFkLEVBQWlCekIsV0FBakIsR0FBK0IsbUJBQW1CdEIsTUFBTSxDQUFOLENBQWxEO0FBQ0ErQyxlQUFjLENBQWQsRUFBaUJ6QixXQUFqQixHQUErQixvQkFBb0J0QixNQUFNLENBQU4sQ0FBbkQ7QUFDQStDLGVBQWMsQ0FBZCxFQUFpQnpCLFdBQWpCLEdBQStCLFdBQVkwQixPQUEzQztBQUNBOztBQUVELFNBQVM3QyxLQUFULEdBQWdCO0FBQ2YsS0FBTThDLGNBQWNyQyxTQUFTQyxzQkFBVCxDQUFnQyxPQUFoQyxFQUF5QyxDQUF6QyxDQUFwQjtBQUNBLEtBQU1pQyxvQkFBb0JsQyxTQUFTQyxzQkFBVCxDQUFnQyxVQUFoQyxFQUE0QyxDQUE1QyxDQUExQjs7QUFFQW9DLGFBQVlsQixnQkFBWixDQUE2QixPQUE3QixFQUFzQyxZQUFVO0FBQy9DZSxvQkFBa0I3QixTQUFsQixDQUE0QjJCLE1BQTVCLENBQW1DLGVBQW5DO0FBQ0FoRDtBQUNBLEVBSEQ7QUFJQTs7QUFFRCxTQUFTTSxPQUFULEdBQWtCO0FBQ2pCLEtBQU1nRCxhQUFhdEMsU0FBU0Msc0JBQVQsQ0FBZ0MsY0FBaEMsRUFBZ0QsQ0FBaEQsQ0FBbkI7O0FBRUFxQyxZQUFXbkIsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsWUFBTTtBQUMxQ25DO0FBQ0EsRUFGRDtBQUdBLEM7Ozs7OztBQy9JRCx5QyIsImZpbGUiOiIuL2Fzc2V0cy9qcy9hcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDY5N2I3NGJhNGVjM2IxMmIzMjUiLCJpbXBvcnQgJy4vYXNzZXRzL3Njc3MvYXBwLnNjc3MnO1xuXG5zdGFydEFwcCgpO1xuXG5mdW5jdGlvbiBzdGFydEFwcCgpe1xuXHRjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0Y29uc3Qgc3RhdHMgPSBbMCwgMCwgc3RhcnRUaW1lXTtcblx0Y29uc3QgdXJsID0gJ2h0dHBzOi8vZ2lzdC5naXRodWJ1c2VyY29udGVudC5jb20vdmVyZ2lsaXVzLzZkODY5YTc0NDhlNDA1Y2I1MmQ3ODIxMjBiNzdiODJjL3Jhdy9lNzVkYzdjMTliOTE4YTlmMGY1Njg0NTk1ODk5ZGJhMmU1YWQ0ZjQzL2hpc3RvcnktZmxhc2hjYXJkcy5qc29uJztcblx0XG5cdGV4aXRBcHAoKTtcblx0YWdhaW4oKTtcblx0ZmV0Y2hEYXRhKHVybCwgc3RhdHMpO1xufVxuXG5mdW5jdGlvbiBmZXRjaERhdGEodXJsLCBzdGF0cykge1x0XHRcdFx0XHRcblx0ZmV0Y2godXJsKVxuXHRcdC50aGVuKHJlc3AgPT4gcmVzcC5qc29uKCkpXG5cdFx0LnRoZW4ocmVzcCA9PiB7XG5cdFx0XHRjcmVhdGVFbGVtZW50cyhyZXNwLCBzdGF0cylcblx0XHR9KTtcbn1cblx0XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50cyhjYXJkLCBzdGF0cyl7XG5cdGNvbnN0IGNhcmRRdWVzdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjYXJkX19xdWVzdGlvblwiKVswXTtcblx0Y29uc3QgY2FyZEFuc3dlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2FyZF9fYm94LWFuc3dlcnNcIilbMF07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRjb25zdCBxdWVzdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblx0cXVlc3Rpb24uY2xhc3NMaXN0ID0gXCJjYXJkX19oZWFkbGluZSBzZy10ZXh0LWJpdCBzZy10ZXh0LWJpdCBzZy10ZXh0LWJpdC0tbGlnaHQgc2ctaGVhZGVyLXByaW1hcnktLXNtYWxsXCI7XG5cdGNvbnN0IGFuc3dlckZpcnN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuXHRhbnN3ZXJGaXJzdC5jbGFzc0xpc3QgPSBcImNhcmRfX2Fuc3dlciBjYXJkX19hbnN3ZXItLWZpcnN0IHNnLWhlYWRlci1wcmltYXJ5IHNnLWhlYWRlci1wcmltYXJ5LS14c21hbGwgc2ctaGVhZGVyLXByaW1hcnktLWxpZ2h0XCI7XG5cdGNvbnN0IGFuc3dlclNlY29uZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcblx0YW5zd2VyU2Vjb25kLmNsYXNzTGlzdCA9IFwiY2FyZF9fYW5zd2VyIGNhcmRfX2Fuc3dlci0tc2Vjb25kIHNnLWhlYWRlci1wcmltYXJ5IHNnLWhlYWRlci1wcmltYXJ5LS14c21hbGwgc2ctaGVhZGVyLXByaW1hcnktLWxpZ2h0XCI7XG5cdFx0XG5cdGFwcGVuZEVsZW1lbnRzKGNhcmQsIGNhcmRRdWVzdGlvbiwgY2FyZEFuc3dlcnMsIHF1ZXN0aW9uLCBhbnN3ZXJGaXJzdCwgYW5zd2VyU2Vjb25kLCBzdGF0cyk7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEVsZW1lbnRzKGNhcmQsIGNhcmRRdWVzdGlvbiwgY2FyZEFuc3dlciwgcXVlc3Rpb24sIGFuc3dlckZpcnN0LCBhbnN3ZXJTZWNvbmQsIHN0YXRzKXtcblx0Y2FyZFF1ZXN0aW9uLnRleHRDb250ZW50ID0gXCJcIjtcblx0Y2FyZEFuc3dlci50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRjYXJkUXVlc3Rpb24uYXBwZW5kQ2hpbGQocXVlc3Rpb24pO1xuXHRjYXJkQW5zd2VyLmFwcGVuZENoaWxkKGFuc3dlckZpcnN0KTtcblx0Y2FyZEFuc3dlci5hcHBlbmRDaGlsZChhbnN3ZXJTZWNvbmQpO1xuXG5cdGlucHV0RGF0YShjYXJkLCBxdWVzdGlvbiwgYW5zd2VyRmlyc3QsIGFuc3dlclNlY29uZCwgc3RhdHMpO1xufVxuXG5mdW5jdGlvbiBpbnB1dERhdGEoY2FyZCwgcXVlc3Rpb24sIGFuc3dlckZpcnN0LCBhbnN3ZXJTZWNvbmQsIHN0YXRzKXtcblx0Y29uc3QgY2FyZEZpcnN0ID0gY2FyZFswXTtcblx0cXVlc3Rpb24udGV4dENvbnRlbnQgPSBjYXJkRmlyc3QucXVlc3Rpb247XG5cdGFuc3dlckZpcnN0LnRleHRDb250ZW50ID0gY2FyZEZpcnN0LmFuc3dlcnNbMF0uYW5zd2VyO1xuXHRhbnN3ZXJTZWNvbmQudGV4dENvbnRlbnQgPSBjYXJkRmlyc3QuYW5zd2Vyc1sxXS5hbnN3ZXI7XG5cdFxuXHRldmVudExpc3RlbmVyKGNhcmQsIGNhcmRGaXJzdCwgc3RhdHMpO1xufVxuXG5mdW5jdGlvbiBldmVudExpc3RlbmVyKGNhcmQsIGNhcmRGaXJzdCwgc3RhdHMpe1xuXHRjb25zdCBhbGxBbnN3ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNhcmRfX2Fuc3dlclwiKTtcblx0Zm9yKGxldCBpID0gMDsgaSA8IGFsbEFuc3dlcnMubGVuZ3RoOyBpKyspe1xuICAgIFx0YWxsQW5zd2Vyc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0XHRjaGVja0Fuc3dlcihpLCBjYXJkRmlyc3QsIGNhcmQsIGFsbEFuc3dlcnMsIHN0YXRzKTtcblx0XHRcdFxuXHRcdH0sIGZhbHNlKVxuXHR9XG59XG5cbmZ1bmN0aW9uIGNoZWNrQW5zd2VyKGksIGNhcmRGaXJzdCwgY2FyZCwgYWxsQW5zd2Vycywgc3RhdHMpe1x0XG5cdGlmKGNhcmRGaXJzdC5hbnN3ZXJzW2ldLmNvcnJlY3QgPT0gdHJ1ZSl7XG5cdFx0c3RhdHNbMF0gKz0gMTtcblx0XHRjYXJkLnNwbGljZSgwLDEpO1xuXHR9XG5cdGVsc2V7XG5cdFx0c3RhdHNbMV0gKz0gMTtcblx0XHRjYXJkLnB1c2goY2FyZC5zaGlmdCgpKTtcblx0fVxuXHRcblx0c2hvd0Fuc3dlcihpLCBhbGxBbnN3ZXJzLCBjYXJkRmlyc3QpO1xuXHRcblx0Y29uc3QgdGltZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRyZW1vdmVDbGFzcyhhbGxBbnN3ZXJzKTtcblx0XHRjaGVja0Ftb3VudE9mQ2FyZHMoY2FyZCwgc3RhdHMpO1xuXHR9LCAzMjAwKTtcbn1cblxuZnVuY3Rpb24gc2hvd0Fuc3dlcihpLCBhbGxBbnN3ZXJzLCBjYXJkRmlyc3Qpe1xuXHRpZihjYXJkRmlyc3QuYW5zd2Vyc1swXS5jb3JyZWN0ID09IHRydWUpe1xuXHRcdGFsbEFuc3dlcnNbMF0uY2xhc3NMaXN0ICs9IFwiIGdvb2QtYW5zd2VyXCI7XG5cdFx0YWxsQW5zd2Vyc1sxXS5jbGFzc0xpc3QgKz0gXCIgd3JvbmctYW5zd2VyXCI7XG5cdH1cblx0ZWxzZXtcblx0XHRhbGxBbnN3ZXJzWzFdLmNsYXNzTGlzdCArPSBcIiBnb29kLWFuc3dlclwiO1xuXHRcdGFsbEFuc3dlcnNbMF0uY2xhc3NMaXN0ICs9IFwiIHdyb25nLWFuc3dlclwiO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzKGFsbEFuc3dlcnMpe1xuXHRmb3IobGV0IGkgPSAwOyBpIDwgYWxsQW5zd2Vycy5sZW5ndGg7IGkrKyl7XG5cdFx0aWYoYWxsQW5zd2Vyc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJnb29kLWFuc3dlclwiKSl7XG5cdFx0XHRhbGxBbnN3ZXJzW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJnb29kLWFuc3dlclwiKTtcblx0XHR9XG5cdFx0aWYoYWxsQW5zd2Vyc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJ3cm9uZy1hbnN3ZXJcIikpe1xuXHRcdFx0YWxsQW5zd2Vyc1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwid3JvbmctYW5zd2VyXCIpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBjaGVja0Ftb3VudE9mQ2FyZHMoY2FyZCwgc3RhdHMpe1xuXHRpZihjYXJkLmxlbmd0aCAhPSAwKXtcblx0XHRjcmVhdGVFbGVtZW50cyhjYXJkLCBzdGF0cyk7XG5cdH1cdFxuXHRlbHNle1xuXHRcdGZlZWRiYWNrKGNhcmQsIHN0YXRzKTtcblx0fVxufVxuXG5mdW5jdGlvbiBmZWVkYmFjayhjYXJkLCBzdGF0cyl7XG5cdGNvbnN0IGZlZWRiYWNrQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZlZWRiYWNrXCIpWzBdO1xuXHRmZWVkYmFja0NvbnRhaW5lci5jbGFzc0xpc3QgKz0gXCIgZmVlZGJhY2stZmxleFwiO1xuXHRcblx0Y29uc3QgZmVlZGJhY2tTdGF0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJmZWVkYmFja19fdGV4dFwiKTtcblx0Y29uc3QgaG93TG9uZyA9IChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXRzWzJdKSAvIDEwMDA7XG5cdFxuXHRmZWVkYmFja1N0YXRzWzBdLnRleHRDb250ZW50ID0gXCJHT09EIEFOU1dFUlM6IFwiICsgc3RhdHNbMF07XG5cdGZlZWRiYWNrU3RhdHNbMV0udGV4dENvbnRlbnQgPSBcIldST05HIEFOU1dFUlM6IFwiICsgc3RhdHNbMV07XG5cdGZlZWRiYWNrU3RhdHNbMl0udGV4dENvbnRlbnQgPSBcIlRJTUU6IFwiICsgIGhvd0xvbmc7XG59XG5cbmZ1bmN0aW9uIGFnYWluKCl7XG5cdGNvbnN0IGFnYWluQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImFnYWluXCIpWzBdO1xuXHRjb25zdCBmZWVkYmFja0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJmZWVkYmFja1wiKVswXTtcblx0XG5cdGFnYWluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuXHRcdGZlZWRiYWNrQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJmZWVkYmFjay1mbGV4XCIpO1xuXHRcdHN0YXJ0QXBwKCk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBleGl0QXBwKCl7XG5cdGNvbnN0IGV4aXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaGVhZGVyX19leGl0XCIpWzBdO1xuXHRcblx0ZXhpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdHN0YXJ0QXBwKCk7XG5cdH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Fzc2V0cy9zY3NzL2FwcC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=