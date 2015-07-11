/*jslint regexp: true*/
var KeySelector = (function () {'use strict';
    var winOn = false;
    function keydown (e) {
        var target = e.target,
            str = '';
        target.value = '';
        if (e.shiftKey)  {
            str += 'shift';
        }
        if (e.ctrlKey) {
            str += (str ? '+' : '') + 'ctrl';
        }
        if (e.altKey)  {
            str += (str ? '+' : '') + 'alt';
        }
        if (e.keyCode === 91) { // Win key
            winOn = (str ? (str + '+') : '') + 'win';
        }
        else {
            target.value = str;
        }
    }
    function keypress (e) {
        var target = e.target;
        target.value += (target.value ? '+' : '') + String.fromCharCode(e.charCode);
        e.preventDefault();
    }
    function keyup (e) {
        if (e.keyCode === 91) { // Win key
            return;
        }
        var target = e.target;
        if (winOn) {
            target.value = winOn +
                ([16, 17, 18].indexOf(e.keyCode) === -1 ? '+' : '') + // If this is just another special key, don't add a "+"
                    String.fromCharCode(e.keyCode);
            winOn = false;
        }
        if (!target.value.match(/\+.$/)) { // Use this block to disallow just special keys or normal keys alone
            target.value = '';
        }
        e.preventDefault();
    }
    
    function addListeners (input) {
        input.addEventListener('keydown', keydown);
        input.addEventListener('keypress', keypress);
        input.addEventListener('keyup', keyup);
    }
    
    return {
        addListeners: addListeners,
        // The following are probably not needed
        keydown: keydown,
        keypress: keypress,
        keyup: keyup
    };
}());

var module;
if (module === undefined) {
    module.exports = KeySelector;
}
