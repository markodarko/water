controller = (function(){

var keyheld = [];
var keypressed = [];

var public={
	press: 		function(e){
			e.preventDefault();
			keyheld[e.keyCode] = 1;
			if (e.repeat) return;
			keypressed[e.keyCode] = 1;			
			},
	release: 	function(e){keyheld[e.keyCode] = keypressed[e.keyCode] = 0},
	getkey: 	function(code){return 1==keyheld[code]},
	getkeypress: 	function(code){return 1==keypressed[code]},
	
}
return public

})()

window.addEventListener('keydown',controller.press)
window.addEventListener('keyup',controller.release)


