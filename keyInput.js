var f = false;
class keyHandler {
	keyState = {
		32:f, /*SPACE*/	38:f, /*ABOVE*/
		37:f, /*LEFTS*/ 40:f, /*BELOW*/ 39:f, /*RIGHT*/
        13:f  /*ENTER*/
    };
    pass(e,isPressed) { if(e.which in this.keyState) { this.keyState[e.which] = isPressed; e.preventDefault(); }}
    key(keyCode) { return this.keyState[keyCode]; } // Check which key is pressed using this method in your update
}

const keyH = new keyHandler(), key = keyH.keyState;
	
document.addEventListener('keydown', (e) => keyH.pass(e,true));
document.addEventListener('keyup',  (e) => keyH.pass(e,false));