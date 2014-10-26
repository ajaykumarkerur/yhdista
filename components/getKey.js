"use strict";
// src: https://gist.github.com/spektraldevelopment/c878922803e6101f66f4
function getKey(evt) {
    var 
        keyName,
        keyMap, code = evt.keyCode, 
        isShift = evt.shiftKey ? true : false;
    
    keyMap = {
        8: 'BACK_SPACE',
        9: 'TAB',
        13: 'ENTER',
        16: 'SHIFT',
        17: 'CTRL',
        18: 'ALT',
        19: 'PAUSE_BREAK',
        20: 'CAPS_LOCK',
        27: 'ESCAPE',
        32: 'SPACE',
        33: 'PAGE_UP',
        34: 'PAGE_DOWN',
        35: 'END',
        36: 'HOME',
        37: 'LEFT',
        38: 'UP',
        39: 'RIGHT',
        40: 'DOWN',
        45: 'INSERT',
        46: 'DELETE',
        48: '0',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',
            61: 'EQUALS_SIGN',
        65: 'A',
        66: 'B',
        67: 'C',
            68: 'D',
        69: 'E',
        70: 'F',
        71: 'G',
        72: 'H',
        73: 'I',
        74: 'J', 
        75: 'K',
        76: 'L',
        77: 'M',
        78: 'N',
        79: 'O',
        80: 'P',
        81: 'Q',
        82: 'R',
        83: 'S',
        84: 'T',
        85: 'U',
        86: 'V',
        87: 'W',
        88: 'X',
        89: 'Y',
        90: 'Z',
        91: 'LEFT_WINDOW_KEY',
        92: 'RIGHT_WINDOW_KEY',
        93: 'SELECT_KEY',
        96: 'NUMPAD_0',
        97: 'NUMPAD_1',
        98: 'NUMPAD_2',
        99: 'NUMPAD_3',
        100: 'NUMPAD_4',
        101: 'NUMPAD_5',
        102: 'NUMPAD_6',
        103: 'NUMPAD_7',
        104: 'NUMPAD_8',
        105: 'NUMPAD_9',
        106: 'MULTIPLY',
        107: 'ADD',
        109: 'SUBTRACT',
        110: 'DECIMAL_POINT',
        111: 'DIVIDE',
        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',
        144: 'NUM_LOCK',
        145: 'SCROLL_LOCK',
            173: 'HYPHEN',
        186: 'SEMI_COLON',
        187: 'EQUAL_SIGN',
        188: 'COMMA',
        189: 'DASH',
        190: 'PERIOD',
        191: 'FORWARD_SLASH',
        192: 'BACK_TICK', 
        219: 'OPEN_SQUARE_BRACKET',
        221: 'CLOSE_SQUARE_BRACKET',
        222: 'SINGLE_QUOTE',
            224: 'COMMAND'
    };
    
    if(code === 192 && isShift === true) {
        keyName = 'TILDA';
    } else if (code === 49 && isShift === true) {
        keyName = 'EXCLAMATION_POINT';
    } else if (code === 50 && isShift === true) {
        keyName = 'AT_SIGN';
    } else if (code === 51 && isShift === true) {
        keyName = 'HASHTAG';
    } else if (code === 52 && isShift === true) {
        keyName = 'DOLLAR_SIGN';
    } else if (code === 53 && isShift === true) {
        keyName = 'PERCENT';
    } else if (code === 54 && isShift === true) {
        keyName = 'CARET';
    } else if (code === 55 && isShift === true) {
        keyName = 'AMPERSAND';
    } else if (code === 56 && isShift === true) {
        keyName = 'ASTERISK';
    } else if (code === 57 && isShift === true) {
        keyName = 'OPEN_BRACKET';
    } else if (code === 58 && isShift === true) {
        keyName = 'CLOSE_BRACKET';
    } else if (code === 173 && isShift === true) {
        keyName = 'UNDERSCORE';
    } else if (code === 61 && isShift === true) {
        keyName = 'PLUS_SIGN';
    } else {
        keyName = keyMap[code];
    }

    if (typeof keyName === "undefined") {
        keyName = "Unknown " + evt.keyCode;
    }
    return keyName;
}

module.exports = getKey;
