"use strict";
var RandomUtils;
(function (RandomUtils) {
    function getFloat(min, max) {
        return (Math.random() * (max - min)) + min;
    }
    RandomUtils.getFloat = getFloat;
    function getInt(min, max) {
        return Math.round(RandomUtils.getFloat(min, max));
    }
    RandomUtils.getInt = getInt;
    function getArray(ary) {
        if (ary && ary.length > 0) {
            var i = RandomUtils.getInt(0, ary.length - 1);
            return ary[i];
        }
        return null;
    }
    RandomUtils.getArray = getArray;
    function getArrayByProbability(ary, prob) {
        if (ary && ary.length > 0 && prob && prob.length === ary.length) {
            var max = 0;
            for (var i = 0; i < prob.length; i++) {
                max += prob[i];
            }
            var r = RandomUtils.getInt(0, max);
            var tmpMin = 0;
            var tmpMax = 0;
            for (var i = 0; i < prob.length; i++) {
                tmpMax += prob[i];
                if (r >= tmpMin && r <= tmpMax) {
                    return ary[i];
                }
                tmpMin += prob[i];
            }
        }
        return null;
    }
    RandomUtils.getArrayByProbability = getArrayByProbability;
    function toArray(ary) {
        var arr = ary.slice(0);
        var len = arr.length;
        for (var i = 0; i < len - 1; i++) {
            var idx = Math.floor(Math.random() * (len - i));
            var temp = arr[idx];
            arr[idx] = arr[len - i - 1];
            arr[len - i - 1] = temp;
        }
        return arr;
    }
    RandomUtils.toArray = toArray;
})(RandomUtils || (RandomUtils = {}));
module.exports = RandomUtils;
//# sourceMappingURL=RandomUtils.js.map