/*jslint vars:true, regexp: true*/
var exports;
(function () {'use strict';
    var winOn = false;
    // Todo: Cause tags for regular keys to avoid "close" button, but allow for ctrl, alt, etc., as long as the close event is reported back to record the change
    function KeySelector () {
        if (!(this instanceof KeySelector)) {
            return new KeySelector();
        }
    }
    KeySelector.prototype.keydown = function keydown (e, cb) {
        if (cb) {
            cb = cb.bind(this, e, 'keydown');
        }
        var target = cb ? this : e.target,
            str = '',
            currVal = '';

        target.value = currVal;
        if (cb) {
            cb(currVal);
        }

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
            return;
        }
        if (cb) {
            target.value = str;
            cb(str);
        }
        else {
            target.value = str;
        }
    };
    KeySelector.prototype.keypress = function keypress (e, cb) {
        if (cb) {
            cb = cb.bind(this, e, 'keypress');
        }
        var target = cb ? this : e.target;
        var oldVal = target.value;
        var currVal = (target.value ? '+' : '') + String.fromCharCode(e.charCode);
        target.value += currVal;
        if (cb) {
            cb(currVal, oldVal);
        }
        e.preventDefault();
    };
    KeySelector.prototype.keyup = function keyup (e, cb) {
        if (cb) {
            cb = cb.bind(this, e, 'keyup');
        }
        if (e.keyCode === 91) { // Win key
            return;
        }
        var target = cb ? this : e.target;
        var currVal;
        if (winOn) {
            currVal = winOn +
                ([16, 17, 18].indexOf(e.keyCode) === -1 ? '+' : '') + // If this is just another special key, don't add a "+"
                    String.fromCharCode(e.keyCode);
            target.value = currVal;
            if (cb) {
                cb(currVal);
            }
            winOn = false;
        }
        if (!target.value.match(/\+.$/)) { // Use this block to disallow just special keys or normal keys alone
            currVal = '';
            target.value = currVal;
            if (cb) {
                cb(currVal);
            }
        }
        e.preventDefault();
    };
    
    KeySelector.prototype.addListeners = function addListeners (input, cb) {
        var that = this;
        if (typeof cb === 'function') {
            cb = {
                keydown: cb,
                keypress: cb,
                keyup: cb
            };
        }
        input.addEventListener('keydown', function (e) {
            that.keydown(e, cb ? cb.keydown.bind(that) : undefined);
        });
        input.addEventListener('keypress', function (e) {
            that.keypress(e, cb ? cb.keypress.bind(that) : undefined);
        });
        input.addEventListener('keyup', function (e) {
            that.keyup(e, cb ? cb.keyup.bind(that) : undefined);
        });
    };
    KeySelector.addListeners = function addListeners (input, cb) {
        var ks = new KeySelector();
        return ks.addListeners(input, cb);
    };

    var exp = exports === undefined ? window : exports;
    exp.KeySelector = KeySelector;
}());
