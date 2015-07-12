/*jslint vars:true, regexp: true*/
var KeySelector = (function () {'use strict';
    var winOn = false;
    // Todo: Change to instantiable class, and conditionally add to a value property rather than the element target
    // Todo: Add cb logic for keyup too
    // Todo: Allow different callbacks to addListeners?
    // Todo: Cause tags for regular keys to avoid "close" button, but allow for ctrl, alt, etc., as long as the close event is reported back to record the change
    function keydown (e, cb) {
        var target = e.target,
            str = '',
            currVal = '';
        if (cb) {
            cb(currVal);
        }
        target.value = currVal;

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
        else if (cb) {
            cb(str);
        }
        else {
            target.value = str;
        }
    }
    function keypress (e, cb) {
        var target = e.target;
        if (cb) {
            cb((target.value ? '+' : '') + String.fromCharCode(e.charCode), target.value);
        }
        else {
            target.value += (target.value ? '+' : '') + String.fromCharCode(e.charCode);
        }
        e.preventDefault();
    }
    function keyup (e, cb) {
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
    
    function addListeners (input, cb) {
        input.addEventListener('keydown', keydown.bind(null, cb));
        input.addEventListener('keypress', keypress.bind(null, cb));
        input.addEventListener('keyup', keyup.bind(null, cb));
    }
    
    var exp;
    if (typeof exports === 'undefined') {
        window.KeySelector = {};
        exp = window.KeySelector;
    }
    else {
        exp = exports;
    }
    exp.addListeners = addListeners;
    // The following are probably not needed
    exp.keydown = keydown;
    exp.keypress = keypress;
    exp.keyup = keyup;
    return exp;
}());
