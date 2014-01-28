var KeySelector = (function () {'use strict';
    var winOn = false;
    function keyDown (e) {
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
    function keyPress (e) {
        var target = e.target;
        target.value += (target.value ? '+' : '') + String.fromCharCode(e.charCode);
        e.preventDefault();
    }
    function keyUp (e) {
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
    return {
        keyDown: function (e) {
            keyDown(e);
        },
        keyPress: function (e) {
            keyPress(e);
        },
        keyUp: function (e) {
            keyUp(e);
        }
    };
}());
