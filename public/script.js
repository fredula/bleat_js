var BleatJS = (function(){

	var textEl = document.querySelector('.bleat-text-box');
	var bleatsSection = document.querySelector('.bleats');
	var bleatButton = document.querySelector('.bleatButton');

	var focusText = function(){
		textEl.addEventListener('focus', function(e){
			this.style.minHeight = '40px';
		});

		textEl.addEventListener('blur', function(e){
			this.style.minHeight = '30px';
		});
	};

	var ajaxGetReq = function(){
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4 && ajax.status == 200) {
				var response = JSON.parse(ajax.responseText);
				var i;
				var bleats = response.bleats;
				for(i = 0; i<bleats.length; i++){
					addBleats(bleats[i].text, bleats[i].time);
				}
			}
		};
		ajax.open('GET', '/ajax', true);
		ajax.setRequestHeader("Content-type", "application/json");
		ajax.send();
	};

	var ajaxPostReq = function(){
		var inputText = textEl.value;
		console.log(inputText, JSON.stringify({inputText}));
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4 && ajax.status == 200) {
				var response = JSON.parse(ajax.responseText);
				addBleats(response.bleat, response.time);
			}
		};
		ajax.open('POST', '/sendata', true);
		ajax.setRequestHeader("Content-type", "application/json");
		ajax.send(JSON.stringify({textValue: inputText}));
	}

	var setUpEvents = function(){
		bleatButton.addEventListener('click', function(){
			ajaxPostReq();
		})
	};

	var addBleats = function(bleatsText, bleatsTime){
		var tmpStr = '<div class="bleatBox"><p>' + bleatsText + '</p><div class="time"><p>'+ new Date(bleatsTime) +'</p></div></div>';
		bleatsSection.insertAdjacentHTML('afterbegin', tmpStr);
	}

	var init = function(){
		ajaxGetReq();
		focusText();
		setUpEvents();
	};

	return {
		init: init
	}

})();

window.addEventListener('DOMContentLoaded', function(lib){

	//just in case
	$ = lib;
	BleatJS.init();

}(jQuery))