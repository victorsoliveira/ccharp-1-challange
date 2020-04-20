const cesarSolver = (function(toDecript, salt) {
    'use strict';

    const total = 26;
    const map = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const encoded = toDecript.toLowerCase();

    let result = '';

    for (let i in encoded) {

        let char = encoded[i];
        let index = map.indexOf(char);

        if (index > -1) {

            let position = (index - salt);
            let fixedPosition = (position < 0) ? (total + position) : position;
            result = result + map[fixedPosition];

        } else {
            result = result + char;
        }
    }

    return result;
});

module.exports = cesarSolver;