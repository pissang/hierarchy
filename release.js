
define(
    'zrender/tool/vector',[],function () {
        var ArrayCtor = typeof Float32Array === 'undefined'
            ? Array
            : Float32Array;
        /**
         * 二维向量类
         * @exports zrender/tool/vector
         */
        var vector = {
            /**
             * 创建一个向量
             * @param {number} [x=0]
             * @param {number} [y=0]
             * @return {Float32Array|Array.<number>}
             */
            create: function (x, y) {
                var out = new ArrayCtor(2);
                out[0] = x || 0;
                out[1] = y || 0;
                return out;
            },

            /**
             * 复制一个向量
             * @return {Float32Array|Array.<number>} out
             * @return {Float32Array|Array.<number>} v
             */
            copy: function (out, v) {
                out[0] = v[0];
                out[1] = v[1];
                return out;
            },

            /**
             * 设置向量的两个项
             * @param {Float32Array|Array.<number>} out
             * @param {number} a
             * @param {number} b
             * @return {Float32Array|Array.<number>} 结果
             */
            set: function (out, a, b) {
                out[0] = a;
                out[1] = b;
                return out;
            },

            /**
             * 向量相加
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} v1
             * @param {Float32Array|Array.<number>} v2
             */
            add: function (out, v1, v2) {
                out[0] = v1[0] + v2[0];
                out[1] = v1[1] + v2[1];
                return out;
            },

            /**
             * 向量缩放后相加
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} v1
             * @param {Float32Array|Array.<number>} v2
             * @param {number} a
             */
            scaleAndAdd: function (out, v1, v2, a) {
                out[0] = v1[0] + v2[0] * a;
                out[1] = v1[1] + v2[1] * a;
                return out;
            },

            /**
             * 向量相减
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} v1
             * @param {Float32Array|Array.<number>} v2
             */
            sub: function (out, v1, v2) {
                out[0] = v1[0] - v2[0];
                out[1] = v1[1] - v2[1];
                return out;
            },

            /**
             * 向量长度
             * @param {Float32Array|Array.<number>} v
             * @return {number}
             */
            len: function (v) {
                return Math.sqrt(this.lenSquare(v));
            },

            /**
             * 向量长度平方
             * @param {Float32Array|Array.<number>} v
             * @return {number}
             */
            lenSquare: function (v) {
                return v[0] * v[0] + v[1] * v[1];
            },

            /**
             * 向量乘法
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} v1
             * @param {Float32Array|Array.<number>} v2
             */
            mul: function (out, v1, v2) {
                out[0] = v1[0] * v2[0];
                out[1] = v1[1] * v2[1];
                return out;
            },

            /**
             * 向量除法
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} v1
             * @param {Float32Array|Array.<number>} v2
             */
            div: function (out, v1, v2) {
                out[0] = v1[0] / v2[0];
                out[1] = v1[1] / v2[1];
                return out;
            },

            /**
             * 向量点乘
             * @param {Float32Array|Array.<number>} v1
             * @param {Float32Array|Array.<number>} v2
             * @return {number}
             */
            dot: function (v1, v2) {
                return v1[0] * v2[0] + v1[1] * v2[1];
            },

            /**
             * 向量缩放
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} v
             * @param {number} s
             */
            scale: function (out, v, s) {
                out[0] = v[0] * s;
                out[1] = v[1] * s;
                return out;
            },

            /**
             * 向量归一化
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} v
             */
            normalize: function (out, v) {
                var d = vector.len(v);
                if (d === 0) {
                    out[0] = 0;
                    out[1] = 0;
                }
                else {
                    out[0] = v[0] / d;
                    out[1] = v[1] / d;
                }
                return out;
            },

            /**
             * 计算向量间距离
             * @param {Float32Array|Array.<number>} v1
             * @param {Float32Array|Array.<number>} v2
             * @return {number}
             */
            distance: function (v1, v2) {
                return Math.sqrt(
                    (v1[0] - v2[0]) * (v1[0] - v2[0])
                    + (v1[1] - v2[1]) * (v1[1] - v2[1])
                );
            },

            /**
             * 向量距离平方
             * @param {Float32Array|Array.<number>} v1
             * @param {Float32Array|Array.<number>} v2
             * @return {number}
             */
            distanceSquare: function (v1, v2) {
                return (v1[0] - v2[0]) * (v1[0] - v2[0])
                    + (v1[1] - v2[1]) * (v1[1] - v2[1]);
            },

            /**
             * 求负向量
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} v
             */
            negate: function (out, v) {
                out[0] = -v[0];
                out[1] = -v[1];
                return out;
            },

            /**
             * 插值两个点
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} v1
             * @param {Float32Array|Array.<number>} v2
             * @param {number} t
             */
            lerp: function (out, v1, v2, t) {
                var ax = v1[0];
                var ay = v1[1];
                out[0] = v1[0] + t * (v2[0] - v1[0]);
                out[1] = v1[1] + t * (v2[1] - v1[1]);
                return out;
            },
            
            /**
             * 矩阵左乘向量
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} v
             * @param {Float32Array|Array.<number>} m
             */
            applyTransform: function (out, v, m) {
                var x = v[0];
                var y = v[1];
                out[0] = m[0] * x + m[2] * y + m[4];
                out[1] = m[1] * x + m[3] * y + m[5];
                return out;
            },
            /**
             * 求两个向量最小值
             * @param  {Float32Array|Array.<number>} out
             * @param  {Float32Array|Array.<number>} v1
             * @param  {Float32Array|Array.<number>} v2
             */
            min: function (out, v1, v2) {
                out[0] = Math.min(v1[0], v2[0]);
                out[1] = Math.min(v1[1], v2[1]);
                return out;
            },
            /**
             * 求两个向量最大值
             * @param  {Float32Array|Array.<number>} out
             * @param  {Float32Array|Array.<number>} v1
             * @param  {Float32Array|Array.<number>} v2
             */
            max: function (out, v1, v2) {
                out[0] = Math.max(v1[0], v2[0]);
                out[1] = Math.max(v1[1], v2[1]);
                return out;
            }
        };

        vector.length = vector.len;
        vector.lengthSquare = vector.lenSquare;
        vector.dist = vector.distance;
        vector.distSquare = vector.distanceSquare;

        return vector;
    }
);

/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2014 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/master/LICENSE
 */

// vim: ts=4 sts=4 sw=4 expandtab

//Add semicolon to prevent IIFE from being passed as argument to concated code.
;

// UMD (Universal Module Definition)
// see https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('lib/es5shim',factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function () {

/**
 * Brings an environment as close to ECMAScript 5 compliance
 * as is possible with the facilities of erstwhile engines.
 *
 * Annotated ES5: http://es5.github.com/ (specific links below)
 * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
 * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/
 */

// Shortcut to an often accessed properties, in order to avoid multiple
// dereference that costs universally.
var ArrayPrototype = Array.prototype;
var ObjectPrototype = Object.prototype;
var FunctionPrototype = Function.prototype;
var StringPrototype = String.prototype;
var NumberPrototype = Number.prototype;
var array_slice = ArrayPrototype.slice;
var array_splice = ArrayPrototype.splice;
var array_push = ArrayPrototype.push;
var array_unshift = ArrayPrototype.unshift;
var call = FunctionPrototype.call;

// Having a toString local variable name breaks in Opera so use _toString.
var _toString = ObjectPrototype.toString;

var isFunction = function (val) {
    return ObjectPrototype.toString.call(val) === '[object Function]';
};
var isRegex = function (val) {
    return ObjectPrototype.toString.call(val) === '[object RegExp]';
};
var isArray = function isArray(obj) {
    return _toString.call(obj) === "[object Array]";
};
var isString = function isString(obj) {
    return _toString.call(obj) === "[object String]";
};
var isArguments = function isArguments(value) {
    var str = _toString.call(value);
    var isArgs = str === '[object Arguments]';
    if (!isArgs) {
        isArgs = !isArray(value)
            && value !== null
            && typeof value === 'object'
            && typeof value.length === 'number'
            && value.length >= 0
            && isFunction(value.callee);
    }
    return isArgs;
};

var supportsDescriptors = Object.defineProperty && (function () {
    try {
        Object.defineProperty({}, 'x', {});
        return true;
    } catch (e) { /* this is ES3 */
        return false;
    }
}());

// Define configurable, writable and non-enumerable props
// if they don't exist.
var defineProperty;
if (supportsDescriptors) {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) { return; }
        Object.defineProperty(object, name, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: method
        });
    };
} else {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) { return; }
        object[name] = method;
    };
}
var defineProperties = function (object, map, forceAssign) {
    for (var name in map) {
        if (ObjectPrototype.hasOwnProperty.call(map, name)) {
          defineProperty(object, name, map[name], forceAssign);
        }
    }
};

//
// Util
// ======
//

// ES5 9.4
// http://es5.github.com/#x9.4
// http://jsperf.com/to-integer

function toInteger(n) {
    n = +n;
    if (n !== n) { // isNaN
        n = 0;
    } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
    return n;
}

function isPrimitive(input) {
    var type = typeof input;
    return (
        input === null ||
        type === "undefined" ||
        type === "boolean" ||
        type === "number" ||
        type === "string"
    );
}

function toPrimitive(input) {
    var val, valueOf, toStr;
    if (isPrimitive(input)) {
        return input;
    }
    valueOf = input.valueOf;
    if (isFunction(valueOf)) {
        val = valueOf.call(input);
        if (isPrimitive(val)) {
            return val;
        }
    }
    toStr = input.toString;
    if (isFunction(toStr)) {
        val = toStr.call(input);
        if (isPrimitive(val)) {
            return val;
        }
    }
    throw new TypeError();
}

// ES5 9.9
// http://es5.github.com/#x9.9
var toObject = function (o) {
    if (o == null) { // this matches both null and undefined
        throw new TypeError("can't convert " + o + " to object");
    }
    return Object(o);
};

var ToUint32 = function ToUint32(x) {
    return x >>> 0;
};

//
// Function
// ========
//

// ES-5 15.3.4.5
// http://es5.github.com/#x15.3.4.5

function Empty() {}

defineProperties(FunctionPrototype, {
    bind: function bind(that) { // .length is 1
        // 1. Let Target be the this value.
        var target = this;
        // 2. If IsCallable(Target) is false, throw a TypeError exception.
        if (!isFunction(target)) {
            throw new TypeError("Function.prototype.bind called on incompatible " + target);
        }
        // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used
        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.
        var binder = function () {

            if (this instanceof bound) {
                // 15.3.4.5.2 [[Construct]]
                // When the [[Construct]] internal method of a function object,
                // F that was created using the bind function is called with a
                // list of arguments ExtraArgs, the following steps are taken:
                // 1. Let target be the value of F's [[TargetFunction]]
                //   internal property.
                // 2. If target has no [[Construct]] internal method, a
                //   TypeError exception is thrown.
                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Construct]] internal
                //   method of target providing args as the arguments.

                var result = target.apply(
                    this,
                    args.concat(array_slice.call(arguments))
                );
                if (Object(result) === result) {
                    return result;
                }
                return this;

            } else {
                // 15.3.4.5.1 [[Call]]
                // When the [[Call]] internal method of a function object, F,
                // which was created using the bind function is called with a
                // this value and a list of arguments ExtraArgs, the following
                // steps are taken:
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 2. Let boundThis be the value of F's [[BoundThis]] internal
                //   property.
                // 3. Let target be the value of F's [[TargetFunction]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Call]] internal method
                //   of target providing boundThis as the this value and
                //   providing args as the arguments.

                // equiv: target.call(this, ...boundArgs, ...args)
                return target.apply(
                    that,
                    args.concat(array_slice.call(arguments))
                );

            }

        };

        // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.

        var boundLength = Math.max(0, target.length - args.length);

        // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
            boundArgs.push("$" + i);
        }

        // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.
        var bound = Function("binder", "return function (" + boundArgs.join(",") + "){return binder.apply(this,arguments)}")(binder);

        if (target.prototype) {
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            // Clean up dangling references.
            Empty.prototype = null;
        }

        // TODO
        // 18. Set the [[Extensible]] internal property of F to true.

        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.

        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.

        // 22. Return F.
        return bound;
    }
});

// _Please note: Shortcuts are defined after `Function.prototype.bind` as we
// us it in defining shortcuts.
var owns = call.bind(ObjectPrototype.hasOwnProperty);

// If JS engine supports accessors creating shortcuts.
var defineGetter;
var defineSetter;
var lookupGetter;
var lookupSetter;
var supportsAccessors;
if ((supportsAccessors = owns(ObjectPrototype, "__defineGetter__"))) {
    defineGetter = call.bind(ObjectPrototype.__defineGetter__);
    defineSetter = call.bind(ObjectPrototype.__defineSetter__);
    lookupGetter = call.bind(ObjectPrototype.__lookupGetter__);
    lookupSetter = call.bind(ObjectPrototype.__lookupSetter__);
}

//
// Array
// =====
//

// ES5 15.4.4.12
// http://es5.github.com/#x15.4.4.12
var spliceNoopReturnsEmptyArray = (function () {
    var a = [1, 2];
    var result = a.splice();
    return a.length === 2 && isArray(result) && result.length === 0;
}());
defineProperties(ArrayPrototype, {
    // Safari 5.0 bug where .splice() returns undefined
    splice: function splice(start, deleteCount) {
        if (arguments.length === 0) {
            return [];
        } else {
            return array_splice.apply(this, arguments);
        }
    }
}, spliceNoopReturnsEmptyArray);

var spliceWorksWithEmptyObject = (function () {
    var obj = {};
    ArrayPrototype.splice.call(obj, 0, 0, 1);
    return obj.length === 1;
}());
defineProperties(ArrayPrototype, {
    splice: function splice(start, deleteCount) {
        if (arguments.length === 0) { return []; }
        var args = arguments;
        this.length = Math.max(toInteger(this.length), 0);
        if (arguments.length > 0 && typeof deleteCount !== 'number') {
            args = array_slice.call(arguments);
            if (args.length < 2) {
                args.push(this.length - start);
            } else {
                args[1] = toInteger(deleteCount);
            }
        }
        return array_splice.apply(this, args);
    }
}, !spliceWorksWithEmptyObject);

// ES5 15.4.4.12
// http://es5.github.com/#x15.4.4.13
// Return len+argCount.
// [bugfix, ielt8]
// IE < 8 bug: [].unshift(0) === undefined but should be "1"
var hasUnshiftReturnValueBug = [].unshift(0) !== 1;
defineProperties(ArrayPrototype, {
    unshift: function () {
        array_unshift.apply(this, arguments);
        return this.length;
    }
}, hasUnshiftReturnValueBug);

// ES5 15.4.3.2
// http://es5.github.com/#x15.4.3.2
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
defineProperties(Array, { isArray: isArray });

// The IsCallable() check in the Array functions
// has been replaced with a strict check on the
// internal class of the object to trap cases where
// the provided function was actually a regular
// expression literal, which in V8 and
// JavaScriptCore is a typeof "function".  Only in
// V8 are regular expression literals permitted as
// reduce parameters, so it is desirable in the
// general case for the shim to match the more
// strict and common behavior of rejecting regular
// expressions.

// ES5 15.4.4.18
// http://es5.github.com/#x15.4.4.18
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach

// Check failure of by-index access of string characters (IE < 9)
// and failure of `0 in boxedString` (Rhino)
var boxedString = Object("a");
var splitString = boxedString[0] !== "a" || !(0 in boxedString);

var properlyBoxesContext = function properlyBoxed(method) {
    // Check node 0.6.21 bug where third parameter is not boxed
    var properlyBoxesNonStrict = true;
    var properlyBoxesStrict = true;
    if (method) {
        method.call('foo', function (_, __, context) {
            if (typeof context !== 'object') { properlyBoxesNonStrict = false; }
        });

        method.call([1], function () {
            'use strict';
            properlyBoxesStrict = typeof this === 'string';
        }, 'x');
    }
    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
};

defineProperties(ArrayPrototype, {
    forEach: function forEach(fun /*, thisp*/) {
        var object = toObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            thisp = arguments[1],
            i = -1,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (!isFunction(fun)) {
            throw new TypeError(); // TODO message
        }

        while (++i < length) {
            if (i in self) {
                // Invoke the callback function with call, passing arguments:
                // context, property value, property key, thisArg object
                // context
                fun.call(thisp, self[i], i, object);
            }
        }
    }
}, !properlyBoxesContext(ArrayPrototype.forEach));

// ES5 15.4.4.19
// http://es5.github.com/#x15.4.4.19
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
defineProperties(ArrayPrototype, {
    map: function map(fun /*, thisp*/) {
        var object = toObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            length = self.length >>> 0,
            result = Array(length),
            thisp = arguments[1];

        // If no callback function or if callback is not a callable function
        if (!isFunction(fun)) {
            throw new TypeError(fun + " is not a function");
        }

        for (var i = 0; i < length; i++) {
            if (i in self) {
                result[i] = fun.call(thisp, self[i], i, object);
            }
        }
        return result;
    }
}, !properlyBoxesContext(ArrayPrototype.map));

// ES5 15.4.4.20
// http://es5.github.com/#x15.4.4.20
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
defineProperties(ArrayPrototype, {
    filter: function filter(fun /*, thisp */) {
        var object = toObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            length = self.length >>> 0,
            result = [],
            value,
            thisp = arguments[1];

        // If no callback function or if callback is not a callable function
        if (!isFunction(fun)) {
            throw new TypeError(fun + " is not a function");
        }

        for (var i = 0; i < length; i++) {
            if (i in self) {
                value = self[i];
                if (fun.call(thisp, value, i, object)) {
                    result.push(value);
                }
            }
        }
        return result;
    }
}, !properlyBoxesContext(ArrayPrototype.filter));

// ES5 15.4.4.16
// http://es5.github.com/#x15.4.4.16
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
defineProperties(ArrayPrototype, {
    every: function every(fun /*, thisp */) {
        var object = toObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            length = self.length >>> 0,
            thisp = arguments[1];

        // If no callback function or if callback is not a callable function
        if (!isFunction(fun)) {
            throw new TypeError(fun + " is not a function");
        }

        for (var i = 0; i < length; i++) {
            if (i in self && !fun.call(thisp, self[i], i, object)) {
                return false;
            }
        }
        return true;
    }
}, !properlyBoxesContext(ArrayPrototype.every));

// ES5 15.4.4.17
// http://es5.github.com/#x15.4.4.17
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
defineProperties(ArrayPrototype, {
    some: function some(fun /*, thisp */) {
        var object = toObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            length = self.length >>> 0,
            thisp = arguments[1];

        // If no callback function or if callback is not a callable function
        if (!isFunction(fun)) {
            throw new TypeError(fun + " is not a function");
        }

        for (var i = 0; i < length; i++) {
            if (i in self && fun.call(thisp, self[i], i, object)) {
                return true;
            }
        }
        return false;
    }
}, !properlyBoxesContext(ArrayPrototype.some));

// ES5 15.4.4.21
// http://es5.github.com/#x15.4.4.21
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
var reduceCoercesToObject = false;
if (ArrayPrototype.reduce) {
    reduceCoercesToObject = typeof ArrayPrototype.reduce.call('es5', function (_, __, ___, list) { return list; }) === 'object';
}
defineProperties(ArrayPrototype, {
    reduce: function reduce(fun /*, initial*/) {
        var object = toObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (!isFunction(fun)) {
            throw new TypeError(fun + " is not a function");
        }

        // no value to return if no initial value and an empty array
        if (!length && arguments.length === 1) {
            throw new TypeError("reduce of empty array with no initial value");
        }

        var i = 0;
        var result;
        if (arguments.length >= 2) {
            result = arguments[1];
        } else {
            do {
                if (i in self) {
                    result = self[i++];
                    break;
                }

                // if array contains no values, no initial value to return
                if (++i >= length) {
                    throw new TypeError("reduce of empty array with no initial value");
                }
            } while (true);
        }

        for (; i < length; i++) {
            if (i in self) {
                result = fun.call(void 0, result, self[i], i, object);
            }
        }

        return result;
    }
}, !reduceCoercesToObject);

// ES5 15.4.4.22
// http://es5.github.com/#x15.4.4.22
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
var reduceRightCoercesToObject = false;
if (ArrayPrototype.reduceRight) {
    reduceRightCoercesToObject = typeof ArrayPrototype.reduceRight.call('es5', function (_, __, ___, list) { return list; }) === 'object';
}
defineProperties(ArrayPrototype, {
    reduceRight: function reduceRight(fun /*, initial*/) {
        var object = toObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (!isFunction(fun)) {
            throw new TypeError(fun + " is not a function");
        }

        // no value to return if no initial value, empty array
        if (!length && arguments.length === 1) {
            throw new TypeError("reduceRight of empty array with no initial value");
        }

        var result, i = length - 1;
        if (arguments.length >= 2) {
            result = arguments[1];
        } else {
            do {
                if (i in self) {
                    result = self[i--];
                    break;
                }

                // if array contains no values, no initial value to return
                if (--i < 0) {
                    throw new TypeError("reduceRight of empty array with no initial value");
                }
            } while (true);
        }

        if (i < 0) {
            return result;
        }

        do {
            if (i in self) {
                result = fun.call(void 0, result, self[i], i, object);
            }
        } while (i--);

        return result;
    }
}, !reduceRightCoercesToObject);

// ES5 15.4.4.14
// http://es5.github.com/#x15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
defineProperties(ArrayPrototype, {
    indexOf: function indexOf(sought /*, fromIndex */ ) {
        var self = splitString && isString(this) ? this.split('') : toObject(this),
            length = self.length >>> 0;

        if (!length) {
            return -1;
        }

        var i = 0;
        if (arguments.length > 1) {
            i = toInteger(arguments[1]);
        }

        // handle negative indices
        i = i >= 0 ? i : Math.max(0, length + i);
        for (; i < length; i++) {
            if (i in self && self[i] === sought) {
                return i;
            }
        }
        return -1;
    }
}, hasFirefox2IndexOfBug);

// ES5 15.4.4.15
// http://es5.github.com/#x15.4.4.15
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
var hasFirefox2LastIndexOfBug = Array.prototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
defineProperties(ArrayPrototype, {
    lastIndexOf: function lastIndexOf(sought /*, fromIndex */) {
        var self = splitString && isString(this) ? this.split('') : toObject(this),
            length = self.length >>> 0;

        if (!length) {
            return -1;
        }
        var i = length - 1;
        if (arguments.length > 1) {
            i = Math.min(i, toInteger(arguments[1]));
        }
        // handle negative indices
        i = i >= 0 ? i : length - Math.abs(i);
        for (; i >= 0; i--) {
            if (i in self && sought === self[i]) {
                return i;
            }
        }
        return -1;
    }
}, hasFirefox2LastIndexOfBug);

//
// Object
// ======
//

// ES5 15.2.3.14
// http://es5.github.com/#x15.2.3.14

// http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
var hasDontEnumBug = !({'toString': null}).propertyIsEnumerable('toString'),
    hasProtoEnumBug = (function () {}).propertyIsEnumerable('prototype'),
    dontEnums = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor"
    ],
    dontEnumsLength = dontEnums.length;

defineProperties(Object, {
    keys: function keys(object) {
        var isFn = isFunction(object),
            isArgs = isArguments(object),
            isObject = object !== null && typeof object === 'object',
            isStr = isObject && isString(object);

        if (!isObject && !isFn && !isArgs) {
            throw new TypeError("Object.keys called on a non-object");
        }

        var theKeys = [];
        var skipProto = hasProtoEnumBug && isFn;
        if (isStr || isArgs) {
            for (var i = 0; i < object.length; ++i) {
                theKeys.push(String(i));
            }
        } else {
            for (var name in object) {
                if (!(skipProto && name === 'prototype') && owns(object, name)) {
                    theKeys.push(String(name));
                }
            }
        }

        if (hasDontEnumBug) {
            var ctor = object.constructor,
                skipConstructor = ctor && ctor.prototype === object;
            for (var j = 0; j < dontEnumsLength; j++) {
                var dontEnum = dontEnums[j];
                if (!(skipConstructor && dontEnum === 'constructor') && owns(object, dontEnum)) {
                    theKeys.push(dontEnum);
                }
            }
        }
        return theKeys;
    }
});

var keysWorksWithArguments = Object.keys && (function () {
    // Safari 5.0 bug
    return Object.keys(arguments).length === 2;
}(1, 2));
var originalKeys = Object.keys;
defineProperties(Object, {
    keys: function keys(object) {
        if (isArguments(object)) {
            return originalKeys(ArrayPrototype.slice.call(object));
        } else {
            return originalKeys(object);
        }
    }
}, !keysWorksWithArguments);

//
// Date
// ====
//

// ES5 15.9.5.43
// http://es5.github.com/#x15.9.5.43
// This function returns a String value represent the instance in time
// represented by this Date object. The format of the String is the Date Time
// string format defined in 15.9.1.15. All fields are present in the String.
// The time zone is always UTC, denoted by the suffix Z. If the time value of
// this object is not a finite Number a RangeError exception is thrown.
var negativeDate = -62198755200000;
var negativeYearString = "-000001";
var hasNegativeDateBug = Date.prototype.toISOString && new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1;

defineProperties(Date.prototype, {
    toISOString: function toISOString() {
        var result, length, value, year, month;
        if (!isFinite(this)) {
            throw new RangeError("Date.prototype.toISOString called on non-finite value.");
        }

        year = this.getUTCFullYear();

        month = this.getUTCMonth();
        // see https://github.com/es-shims/es5-shim/issues/111
        year += Math.floor(month / 12);
        month = (month % 12 + 12) % 12;

        // the date time string format is specified in 15.9.1.15.
        result = [month + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()];
        year = (
            (year < 0 ? "-" : (year > 9999 ? "+" : "")) +
            ("00000" + Math.abs(year)).slice(0 <= year && year <= 9999 ? -4 : -6)
        );

        length = result.length;
        while (length--) {
            value = result[length];
            // pad months, days, hours, minutes, and seconds to have two
            // digits.
            if (value < 10) {
                result[length] = "0" + value;
            }
        }
        // pad milliseconds to have three digits.
        return (
            year + "-" + result.slice(0, 2).join("-") +
            "T" + result.slice(2).join(":") + "." +
            ("000" + this.getUTCMilliseconds()).slice(-3) + "Z"
        );
    }
}, hasNegativeDateBug);


// ES5 15.9.5.44
// http://es5.github.com/#x15.9.5.44
// This function provides a String representation of a Date object for use by
// JSON.stringify (15.12.3).
var dateToJSONIsSupported = false;
try {
    dateToJSONIsSupported = (
        Date.prototype.toJSON &&
        new Date(NaN).toJSON() === null &&
        new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 &&
        Date.prototype.toJSON.call({ // generic
            toISOString: function () {
                return true;
            }
        })
    );
} catch (e) {
}
if (!dateToJSONIsSupported) {
    Date.prototype.toJSON = function toJSON(key) {
        // When the toJSON method is called with argument key, the following
        // steps are taken:

        // 1.  Let O be the result of calling ToObject, giving it the this
        // value as its argument.
        // 2. Let tv be toPrimitive(O, hint Number).
        var o = Object(this),
            tv = toPrimitive(o),
            toISO;
        // 3. If tv is a Number and is not finite, return null.
        if (typeof tv === "number" && !isFinite(tv)) {
            return null;
        }
        // 4. Let toISO be the result of calling the [[Get]] internal method of
        // O with argument "toISOString".
        toISO = o.toISOString;
        // 5. If IsCallable(toISO) is false, throw a TypeError exception.
        if (typeof toISO !== "function") {
            throw new TypeError("toISOString property is not callable");
        }
        // 6. Return the result of calling the [[Call]] internal method of
        //  toISO with O as the this value and an empty argument list.
        return toISO.call(o);

        // NOTE 1 The argument is ignored.

        // NOTE 2 The toJSON function is intentionally generic; it does not
        // require that its this value be a Date object. Therefore, it can be
        // transferred to other kinds of objects for use as a method. However,
        // it does require that any such object have a toISOString method. An
        // object is free to use the argument key to filter its
        // stringification.
    };
}

// ES5 15.9.4.2
// http://es5.github.com/#x15.9.4.2
// based on work shared by Daniel Friesen (dantman)
// http://gist.github.com/303249
var supportsExtendedYears = Date.parse('+033658-09-27T01:46:40.000Z') === 1e15;
var acceptsInvalidDates = !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) || !isNaN(Date.parse('2012-11-31T23:59:59.000Z'));
var doesNotParseY2KNewYear = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));
if (!Date.parse || doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {
    // XXX global assignment won't work in embeddings that use
    // an alternate object for the context.
    Date = (function (NativeDate) {

        // Date.length === 7
        function Date(Y, M, D, h, m, s, ms) {
            var length = arguments.length;
            if (this instanceof NativeDate) {
                var date = length === 1 && String(Y) === Y ? // isString(Y)
                    // We explicitly pass it through parse:
                    new NativeDate(Date.parse(Y)) :
                    // We have to manually make calls depending on argument
                    // length here
                    length >= 7 ? new NativeDate(Y, M, D, h, m, s, ms) :
                    length >= 6 ? new NativeDate(Y, M, D, h, m, s) :
                    length >= 5 ? new NativeDate(Y, M, D, h, m) :
                    length >= 4 ? new NativeDate(Y, M, D, h) :
                    length >= 3 ? new NativeDate(Y, M, D) :
                    length >= 2 ? new NativeDate(Y, M) :
                    length >= 1 ? new NativeDate(Y) :
                                  new NativeDate();
                // Prevent mixups with unfixed Date object
                date.constructor = Date;
                return date;
            }
            return NativeDate.apply(this, arguments);
        }

        // 15.9.1.15 Date Time String Format.
        var isoDateExpression = new RegExp("^" +
            "(\\d{4}|[\+\-]\\d{6})" + // four-digit year capture or sign +
                                      // 6-digit extended year
            "(?:-(\\d{2})" + // optional month capture
            "(?:-(\\d{2})" + // optional day capture
            "(?:" + // capture hours:minutes:seconds.milliseconds
                "T(\\d{2})" + // hours capture
                ":(\\d{2})" + // minutes capture
                "(?:" + // optional :seconds.milliseconds
                    ":(\\d{2})" + // seconds capture
                    "(?:(\\.\\d{1,}))?" + // milliseconds capture
                ")?" +
            "(" + // capture UTC offset component
                "Z|" + // UTC capture
                "(?:" + // offset specifier +/-hours:minutes
                    "([-+])" + // sign capture
                    "(\\d{2})" + // hours offset capture
                    ":(\\d{2})" + // minutes offset capture
                ")" +
            ")?)?)?)?" +
        "$");

        var months = [
            0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365
        ];

        function dayFromMonth(year, month) {
            var t = month > 1 ? 1 : 0;
            return (
                months[month] +
                Math.floor((year - 1969 + t) / 4) -
                Math.floor((year - 1901 + t) / 100) +
                Math.floor((year - 1601 + t) / 400) +
                365 * (year - 1970)
            );
        }

        function toUTC(t) {
            return Number(new NativeDate(1970, 0, 1, 0, 0, 0, t));
        }

        // Copy any custom methods a 3rd party library may have added
        for (var key in NativeDate) {
            Date[key] = NativeDate[key];
        }

        // Copy "native" methods explicitly; they may be non-enumerable
        Date.now = NativeDate.now;
        Date.UTC = NativeDate.UTC;
        Date.prototype = NativeDate.prototype;
        Date.prototype.constructor = Date;

        // Upgrade Date.parse to handle simplified ISO 8601 strings
        Date.parse = function parse(string) {
            var match = isoDateExpression.exec(string);
            if (match) {
                // parse months, days, hours, minutes, seconds, and milliseconds
                // provide default values if necessary
                // parse the UTC offset component
                var year = Number(match[1]),
                    month = Number(match[2] || 1) - 1,
                    day = Number(match[3] || 1) - 1,
                    hour = Number(match[4] || 0),
                    minute = Number(match[5] || 0),
                    second = Number(match[6] || 0),
                    millisecond = Math.floor(Number(match[7] || 0) * 1000),
                    // When time zone is missed, local offset should be used
                    // (ES 5.1 bug)
                    // see https://bugs.ecmascript.org/show_bug.cgi?id=112
                    isLocalTime = Boolean(match[4] && !match[8]),
                    signOffset = match[9] === "-" ? 1 : -1,
                    hourOffset = Number(match[10] || 0),
                    minuteOffset = Number(match[11] || 0),
                    result;
                if (
                    hour < (
                        minute > 0 || second > 0 || millisecond > 0 ?
                        24 : 25
                    ) &&
                    minute < 60 && second < 60 && millisecond < 1000 &&
                    month > -1 && month < 12 && hourOffset < 24 &&
                    minuteOffset < 60 && // detect invalid offsets
                    day > -1 &&
                    day < (
                        dayFromMonth(year, month + 1) -
                        dayFromMonth(year, month)
                    )
                ) {
                    result = (
                        (dayFromMonth(year, month) + day) * 24 +
                        hour +
                        hourOffset * signOffset
                    ) * 60;
                    result = (
                        (result + minute + minuteOffset * signOffset) * 60 +
                        second
                    ) * 1000 + millisecond;
                    if (isLocalTime) {
                        result = toUTC(result);
                    }
                    if (-8.64e15 <= result && result <= 8.64e15) {
                        return result;
                    }
                }
                return NaN;
            }
            return NativeDate.parse.apply(this, arguments);
        };

        return Date;
    })(Date);
}

// ES5 15.9.4.4
// http://es5.github.com/#x15.9.4.4
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}


//
// Number
// ======
//

// ES5.1 15.7.4.5
// http://es5.github.com/#x15.7.4.5
var hasToFixedBugs = NumberPrototype.toFixed && (
  (0.00008).toFixed(3) !== '0.000'
  || (0.9).toFixed(0) !== '1'
  || (1.255).toFixed(2) !== '1.25'
  || (1000000000000000128).toFixed(0) !== "1000000000000000128"
);

var toFixedHelpers = {
  base: 1e7,
  size: 6,
  data: [0, 0, 0, 0, 0, 0],
  multiply: function multiply(n, c) {
      var i = -1;
      while (++i < toFixedHelpers.size) {
          c += n * toFixedHelpers.data[i];
          toFixedHelpers.data[i] = c % toFixedHelpers.base;
          c = Math.floor(c / toFixedHelpers.base);
      }
  },
  divide: function divide(n) {
      var i = toFixedHelpers.size, c = 0;
      while (--i >= 0) {
          c += toFixedHelpers.data[i];
          toFixedHelpers.data[i] = Math.floor(c / n);
          c = (c % n) * toFixedHelpers.base;
      }
  },
  numToString: function numToString() {
      var i = toFixedHelpers.size;
      var s = '';
      while (--i >= 0) {
          if (s !== '' || i === 0 || toFixedHelpers.data[i] !== 0) {
              var t = String(toFixedHelpers.data[i]);
              if (s === '') {
                  s = t;
              } else {
                  s += '0000000'.slice(0, 7 - t.length) + t;
              }
          }
      }
      return s;
  },
  pow: function pow(x, n, acc) {
      return (n === 0 ? acc : (n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)));
  },
  log: function log(x) {
      var n = 0;
      while (x >= 4096) {
          n += 12;
          x /= 4096;
      }
      while (x >= 2) {
          n += 1;
          x /= 2;
      }
      return n;
  }
};

defineProperties(NumberPrototype, {
    toFixed: function toFixed(fractionDigits) {
        var f, x, s, m, e, z, j, k;

        // Test for NaN and round fractionDigits down
        f = Number(fractionDigits);
        f = f !== f ? 0 : Math.floor(f);

        if (f < 0 || f > 20) {
            throw new RangeError("Number.toFixed called with invalid number of decimals");
        }

        x = Number(this);

        // Test for NaN
        if (x !== x) {
            return "NaN";
        }

        // If it is too big or small, return the string value of the number
        if (x <= -1e21 || x >= 1e21) {
            return String(x);
        }

        s = "";

        if (x < 0) {
            s = "-";
            x = -x;
        }

        m = "0";

        if (x > 1e-21) {
            // 1e-21 < x < 1e21
            // -70 < log2(x) < 70
            e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69;
            z = (e < 0 ? x * toFixedHelpers.pow(2, -e, 1) : x / toFixedHelpers.pow(2, e, 1));
            z *= 0x10000000000000; // Math.pow(2, 52);
            e = 52 - e;

            // -18 < e < 122
            // x = z / 2 ^ e
            if (e > 0) {
                toFixedHelpers.multiply(0, z);
                j = f;

                while (j >= 7) {
                    toFixedHelpers.multiply(1e7, 0);
                    j -= 7;
                }

                toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0);
                j = e - 1;

                while (j >= 23) {
                    toFixedHelpers.divide(1 << 23);
                    j -= 23;
                }

                toFixedHelpers.divide(1 << j);
                toFixedHelpers.multiply(1, 1);
                toFixedHelpers.divide(2);
                m = toFixedHelpers.numToString();
            } else {
                toFixedHelpers.multiply(0, z);
                toFixedHelpers.multiply(1 << (-e), 0);
                m = toFixedHelpers.numToString() + '0.00000000000000000000'.slice(2, 2 + f);
            }
        }

        if (f > 0) {
            k = m.length;

            if (k <= f) {
                m = s + '0.0000000000000000000'.slice(0, f - k + 2) + m;
            } else {
                m = s + m.slice(0, k - f) + '.' + m.slice(k - f);
            }
        } else {
            m = s + m;
        }

        return m;
    }
}, hasToFixedBugs);


//
// String
// ======
//

// ES5 15.5.4.14
// http://es5.github.com/#x15.5.4.14

// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
// Many browsers do not split properly with regular expressions or they
// do not perform the split correctly under obscure conditions.
// See http://blog.stevenlevithan.com/archives/cross-browser-split
// I've tested in many browsers and this seems to cover the deviant ones:
//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
//       [undefined, "t", undefined, "e", ...]
//    ''.split(/.?/) should be [], not [""]
//    '.'.split(/()()/) should be ["."], not ["", "", "."]

var string_split = StringPrototype.split;
if (
    'ab'.split(/(?:ab)*/).length !== 2 ||
    '.'.split(/(.?)(.?)/).length !== 4 ||
    'tesst'.split(/(s)*/)[1] === "t" ||
    'test'.split(/(?:)/, -1).length !== 4 ||
    ''.split(/.?/).length ||
    '.'.split(/()()/).length > 1
) {
    (function () {
        var compliantExecNpcg = /()??/.exec("")[1] === void 0; // NPCG: nonparticipating capturing group

        StringPrototype.split = function (separator, limit) {
            var string = this;
            if (separator === void 0 && limit === 0) {
                return [];
            }

            // If `separator` is not a regex, use native split
            if (_toString.call(separator) !== "[object RegExp]") {
                return string_split.call(this, separator, limit);
            }

            var output = [],
                flags = (separator.ignoreCase ? "i" : "") +
                        (separator.multiline  ? "m" : "") +
                        (separator.extended   ? "x" : "") + // Proposed for ES6
                        (separator.sticky     ? "y" : ""), // Firefox 3+
                lastLastIndex = 0,
                // Make `global` and avoid `lastIndex` issues by working with a copy
                separator2, match, lastIndex, lastLength;
            separator = new RegExp(separator.source, flags + "g");
            string += ""; // Type-convert
            if (!compliantExecNpcg) {
                // Doesn't need flags gy, but they don't hurt
                separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
            }
            /* Values for `limit`, per the spec:
             * If undefined: 4294967295 // Math.pow(2, 32) - 1
             * If 0, Infinity, or NaN: 0
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
             * If other: Type-convert, then use the above rules
             */
            limit = limit === void 0 ?
                -1 >>> 0 : // Math.pow(2, 32) - 1
                ToUint32(limit);
            while (match = separator.exec(string)) {
                // `separator.lastIndex` is not reliable cross-browser
                lastIndex = match.index + match[0].length;
                if (lastIndex > lastLastIndex) {
                    output.push(string.slice(lastLastIndex, match.index));
                    // Fix browsers whose `exec` methods don't consistently return `undefined` for
                    // nonparticipating capturing groups
                    if (!compliantExecNpcg && match.length > 1) {
                        match[0].replace(separator2, function () {
                            for (var i = 1; i < arguments.length - 2; i++) {
                                if (arguments[i] === void 0) {
                                    match[i] = void 0;
                                }
                            }
                        });
                    }
                    if (match.length > 1 && match.index < string.length) {
                        ArrayPrototype.push.apply(output, match.slice(1));
                    }
                    lastLength = match[0].length;
                    lastLastIndex = lastIndex;
                    if (output.length >= limit) {
                        break;
                    }
                }
                if (separator.lastIndex === match.index) {
                    separator.lastIndex++; // Avoid an infinite loop
                }
            }
            if (lastLastIndex === string.length) {
                if (lastLength || !separator.test("")) {
                    output.push("");
                }
            } else {
                output.push(string.slice(lastLastIndex));
            }
            return output.length > limit ? output.slice(0, limit) : output;
        };
    }());

// [bugfix, chrome]
// If separator is undefined, then the result array contains just one String,
// which is the this value (converted to a String). If limit is not undefined,
// then the output array is truncated so that it contains no more than limit
// elements.
// "0".split(undefined, 0) -> []
} else if ("0".split(void 0, 0).length) {
    StringPrototype.split = function split(separator, limit) {
        if (separator === void 0 && limit === 0) { return []; }
        return string_split.call(this, separator, limit);
    };
}

var str_replace = StringPrototype.replace;
var replaceReportsGroupsCorrectly = (function () {
    var groups = [];
    'x'.replace(/x(.)?/g, function (match, group) {
        groups.push(group);
    });
    return groups.length === 1 && typeof groups[0] === 'undefined';
}());

if (!replaceReportsGroupsCorrectly) {
    StringPrototype.replace = function replace(searchValue, replaceValue) {
        var isFn = isFunction(replaceValue);
        var hasCapturingGroups = isRegex(searchValue) && (/\)[*?]/).test(searchValue.source);
        if (!isFn || !hasCapturingGroups) {
            return str_replace.call(this, searchValue, replaceValue);
        } else {
            var wrappedReplaceValue = function (match) {
                var length = arguments.length;
                var originalLastIndex = searchValue.lastIndex;
                searchValue.lastIndex = 0;
                var args = searchValue.exec(match);
                searchValue.lastIndex = originalLastIndex;
                args.push(arguments[length - 2], arguments[length - 1]);
                return replaceValue.apply(this, args);
            };
            return str_replace.call(this, searchValue, wrappedReplaceValue);
        }
    };
}

// ECMA-262, 3rd B.2.3
// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
// non-normative section suggesting uniform semantics and it should be
// normalized across all browsers
// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
var string_substr = StringPrototype.substr;
var hasNegativeSubstrBug = "".substr && "0b".substr(-1) !== "b";
defineProperties(StringPrototype, {
    substr: function substr(start, length) {
        return string_substr.call(
            this,
            start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
            length
        );
    }
}, hasNegativeSubstrBug);

// ES5 15.5.4.20
// whitespace from: http://es5.github.io/#x15.5.4.20
var ws = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
    "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" +
    "\u2029\uFEFF";
var zeroWidth = '\u200b';
var wsRegexChars = "[" + ws + "]";
var trimBeginRegexp = new RegExp("^" + wsRegexChars + wsRegexChars + "*");
var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + "*$");
var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
defineProperties(StringPrototype, {
    // http://blog.stevenlevithan.com/archives/faster-trim-javascript
    // http://perfectionkills.com/whitespace-deviations/
    trim: function trim() {
        if (this === void 0 || this === null) {
            throw new TypeError("can't convert " + this + " to object");
        }
        return String(this).replace(trimBeginRegexp, "").replace(trimEndRegexp, "");
    }
}, hasTrimWhitespaceBug);

// ES-5 15.1.2.2
if (parseInt(ws + '08') !== 8 || parseInt(ws + '0x16') !== 22) {
    parseInt = (function (origParseInt) {
        var hexRegex = /^0[xX]/;
        return function parseIntES5(str, radix) {
            str = String(str).trim();
            if (!Number(radix)) {
                radix = hexRegex.test(str) ? 16 : 10;
            }
            return origParseInt(str, radix);
        };
    }(parseInt));
}

}));
/**
 * 事件扩展
 * @module zrender/mixin/Eventful
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *         pissang (https://www.github.com/pissang)
 */
define('zrender/mixin/Eventful',['require'],function (require) {

    /**
     * 事件分发器
     * @alias module:zrender/mixin/Eventful
     * @constructor
     */
    var Eventful = function () {
        this._handlers = {};
    };
    /**
     * 单次触发绑定，dispatch后销毁
     * 
     * @param {string} event 事件名
     * @param {Function} handler 响应函数
     * @param {Object} context
     */
    Eventful.prototype.one = function (event, handler, context) {
        var _h = this._handlers;

        if (!handler || !event) {
            return this;
        }

        if (!_h[event]) {
            _h[event] = [];
        }

        _h[event].push({
            h : handler,
            one : true,
            ctx: context || this
        });

        return this;
    };

    /**
     * 绑定事件
     * @param {string} event 事件名
     * @param {Function} handler 事件处理函数
     * @param {Object} context
     */
    Eventful.prototype.bind = function (event, handler, context) {
        var _h = this._handlers;

        if (!handler || !event) {
            return this;
        }

        if (!_h[event]) {
            _h[event] = [];
        }

        _h[event].push({
            h : handler,
            one : false,
            ctx: context || this
        });

        return this;
    };

    /**
     * 解绑事件
     * @param {string} event 事件名
     * @param {Function} [handler] 事件处理函数
     */
    Eventful.prototype.unbind = function (event, handler) {
        var _h = this._handlers;

        if (!event) {
            this._handlers = {};
            return this;
        }

        if (handler) {
            if (_h[event]) {
                var newList = [];
                for (var i = 0, l = _h[event].length; i < l; i++) {
                    if (_h[event][i]['h'] != handler) {
                        newList.push(_h[event][i]);
                    }
                }
                _h[event] = newList;
            }

            if (_h[event] && _h[event].length === 0) {
                delete _h[event];
            }
        }
        else {
            delete _h[event];
        }

        return this;
    };

    /**
     * 事件分发
     * 
     * @param {string} type 事件类型
     */
    Eventful.prototype.dispatch = function (type) {
        if (this._handlers[type]) {
            var args = arguments;
            var argLen = args.length;

            if (argLen > 3) {
                args = Array.prototype.slice.call(args, 1);
            }
            
            var _h = this._handlers[type];
            var len = _h.length;
            for (var i = 0; i < len;) {
                // Optimize advise from backbone
                switch (argLen) {
                    case 1:
                        _h[i]['h'].call(_h[i]['ctx']);
                        break;
                    case 2:
                        _h[i]['h'].call(_h[i]['ctx'], args[1]);
                        break;
                    case 3:
                        _h[i]['h'].call(_h[i]['ctx'], args[1], args[2]);
                        break;
                    default:
                        // have more than 2 given arguments
                        _h[i]['h'].apply(_h[i]['ctx'], args);
                        break;
                }
                
                if (_h[i]['one']) {
                    _h.splice(i, 1);
                    len--;
                }
                else {
                    i++;
                }
            }
        }

        return this;
    };

    /**
     * 带有context的事件分发, 最后一个参数是事件回调的context
     * @param {string} type 事件类型
     */
    Eventful.prototype.dispatchWithContext = function (type) {
        if (this._handlers[type]) {
            var args = arguments;
            var argLen = args.length;

            if (argLen > 4) {
                args = Array.prototype.slice.call(args, 1, args.length - 1);
            }
            var ctx = args[args.length - 1];

            var _h = this._handlers[type];
            var len = _h.length;
            for (var i = 0; i < len;) {
                // Optimize advise from backbone
                switch (argLen) {
                    case 1:
                        _h[i]['h'].call(ctx);
                        break;
                    case 2:
                        _h[i]['h'].call(ctx, args[1]);
                        break;
                    case 3:
                        _h[i]['h'].call(ctx, args[1], args[2]);
                        break;
                    default:
                        // have more than 2 given arguments
                        _h[i]['h'].apply(ctx, args);
                        break;
                }
                
                if (_h[i]['one']) {
                    _h.splice(i, 1);
                    len--;
                }
                else {
                    i++;
                }
            }
        }

        return this;
    };

    // 对象可以通过 onxxxx 绑定事件
    /**
     * @event module:zrender/mixin/Eventful#onclick
     * @type {Function}
     * @default null
     */
    /**
     * @event module:zrender/mixin/Eventful#onmouseover
     * @type {Function}
     * @default null
     */
    /**
     * @event module:zrender/mixin/Eventful#onmouseout
     * @type {Function}
     * @default null
     */
    /**
     * @event module:zrender/mixin/Eventful#onmousemove
     * @type {Function}
     * @default null
     */
    /**
     * @event module:zrender/mixin/Eventful#onmousewheel
     * @type {Function}
     * @default null
     */
    /**
     * @event module:zrender/mixin/Eventful#onmousedown
     * @type {Function}
     * @default null
     */
    /**
     * @event module:zrender/mixin/Eventful#onmouseup
     * @type {Function}
     * @default null
     */
    /**
     * @event module:zrender/mixin/Eventful#ondragstart
     * @type {Function}
     * @default null
     */
    /**
     * @event module:zrender/mixin/Eventful#ondragend
     * @type {Function}
     * @default null
     */
    /**
     * @event module:zrender/mixin/Eventful#ondragenter
     * @type {Function}
     * @default null
     */
    /**
     * @event module:zrender/mixin/Eventful#ondragleave
     * @type {Function}
     * @default null
     */
    /**
     * @event module:zrender/mixin/Eventful#ondragover
     * @type {Function}
     * @default null
     */
    /**
     * @event module:zrender/mixin/Eventful#ondrop
     * @type {Function}
     * @default null
     */
    
    return Eventful;
});

/**
 * 事件辅助类
 * @module zrender/tool/event
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 */
define(
    'zrender/tool/event',['require','../mixin/Eventful'],function(require) {

        'use strict';

        var Eventful = require('../mixin/Eventful');

        /**
        * 提取鼠标（手指）x坐标
        * @memberOf module:zrender/tool/event
        * @param  {Event} e 事件.
        * @return {number} 鼠标（手指）x坐标.
        */
        function getX(e) {
            return typeof e.zrenderX != 'undefined' && e.zrenderX
                   || typeof e.offsetX != 'undefined' && e.offsetX
                   || typeof e.layerX != 'undefined' && e.layerX
                   || typeof e.clientX != 'undefined' && e.clientX;
        }

        /**
        * 提取鼠标y坐标
        * @memberOf module:zrender/tool/event
        * @param  {Event} e 事件.
        * @return {number} 鼠标（手指）y坐标.
        */
        function getY(e) {
            return typeof e.zrenderY != 'undefined' && e.zrenderY
                   || typeof e.offsetY != 'undefined' && e.offsetY
                   || typeof e.layerY != 'undefined' && e.layerY
                   || typeof e.clientY != 'undefined' && e.clientY;
        }

        /**
        * 提取鼠标滚轮变化
        * @memberOf module:zrender/tool/event
        * @param  {Event} e 事件.
        * @return {number} 滚轮变化，正值说明滚轮是向上滚动，如果是负值说明滚轮是向下滚动
        */
        function getDelta(e) {
            return typeof e.zrenderDelta != 'undefined' && e.zrenderDelta
                   || typeof e.wheelDelta != 'undefined' && e.wheelDelta
                   || typeof e.detail != 'undefined' && -e.detail;
        }

        /**
         * 停止冒泡和阻止默认行为
         * @memberOf module:zrender/tool/event
         * @method
         * @param {Event} e : event对象
         */
        var stop = typeof window.addEventListener === 'function'
            ? function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.cancelBubble = true;
            }
            : function (e) {
                e.returnValue = false;
                e.cancelBubble = true;
            };
        
        return {
            getX : getX,
            getY : getY,
            getDelta : getDelta,
            stop : stop,
            // 做向上兼容
            Dispatcher : Eventful
        };
    }
);

/**
 * @license RequireJS text 2.0.5 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */
/*jslint regexp: true */
/*global require: false, XMLHttpRequest: false, ActiveXObject: false,
  define: false, window: false, process: false, Packages: false,
  java: false, location: false */

define('text',['module'], function (module) {
    'use strict';
    
    var text, fs,
        progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
        xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        hasLocation = typeof location !== 'undefined' && location.href,
        defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''),
        defaultHostName = hasLocation && location.hostname,
        defaultPort = hasLocation && (location.port || undefined),
        buildMap = [],
        masterConfig = (module.config && module.config()) || {};

    text = {
        version: '2.0.5',

        strip: function (content) {
            //Strips <?xml ...?> declarations so that external SVG and XML
            //documents can be added to a document without worry. Also, if the string
            //is an HTML document, only the part inside the body tag is returned.
            if (content) {
                content = content.replace(xmlRegExp, "");
                var matches = content.match(bodyRegExp);
                if (matches) {
                    content = matches[1];
                }
            } else {
                content = "";
            }
            return content;
        },

        jsEscape: function (content) {
            return content.replace(/(['\\])/g, '\\$1')
                .replace(/[\f]/g, "\\f")
                .replace(/[\b]/g, "\\b")
                .replace(/[\n]/g, "\\n")
                .replace(/[\t]/g, "\\t")
                .replace(/[\r]/g, "\\r")
                .replace(/[\u2028]/g, "\\u2028")
                .replace(/[\u2029]/g, "\\u2029");
        },

        createXhr: masterConfig.createXhr || function () {
            //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
            var xhr, i, progId;
            if (typeof XMLHttpRequest !== "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject !== "undefined") {
                for (i = 0; i < 3; i += 1) {
                    progId = progIds[i];
                    try {
                        xhr = new ActiveXObject(progId);
                    } catch (e) {}

                    if (xhr) {
                        progIds = [progId];  // so faster next time
                        break;
                    }
                }
            }

            return xhr;
        },

        /**
         * Parses a resource name into its component parts. Resource names
         * look like: module/name.ext!strip, where the !strip part is
         * optional.
         * @param {String} name the resource name
         * @returns {Object} with properties "moduleName", "ext" and "strip"
         * where strip is a boolean.
         */
        parseName: function (name) {
            var modName, ext, temp,
                strip = false,
                index = name.indexOf("."),
                isRelative = name.indexOf('./') === 0 ||
                             name.indexOf('../') === 0;

            if (index !== -1 && (!isRelative || index > 1)) {
                modName = name.substring(0, index);
                ext = name.substring(index + 1, name.length);
            } else {
                modName = name;
            }

            temp = ext || modName;
            index = temp.indexOf("!");
            if (index !== -1) {
                //Pull off the strip arg.
                strip = temp.substring(index + 1) === "strip";
                temp = temp.substring(0, index);
                if (ext) {
                    ext = temp;
                } else {
                    modName = temp;
                }
            }

            return {
                moduleName: modName,
                ext: ext,
                strip: strip
            };
        },

        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,

        /**
         * Is an URL on another domain. Only works for browser use, returns
         * false in non-browser environments. Only used to know if an
         * optimized .js version of a text resource should be loaded
         * instead.
         * @param {String} url
         * @returns Boolean
         */
        useXhr: function (url, protocol, hostname, port) {
            var uProtocol, uHostName, uPort,
                match = text.xdRegExp.exec(url);
            if (!match) {
                return true;
            }
            uProtocol = match[2];
            uHostName = match[3];

            uHostName = uHostName.split(':');
            uPort = uHostName[1];
            uHostName = uHostName[0];

            return (!uProtocol || uProtocol === protocol) &&
                   (!uHostName || uHostName.toLowerCase() === hostname.toLowerCase()) &&
                   ((!uPort && !uHostName) || uPort === port);
        },

        finishLoad: function (name, strip, content, onLoad) {
            content = strip ? text.strip(content) : content;
            if (masterConfig.isBuild) {
                buildMap[name] = content;
            }
            onLoad(content);
        },

        load: function (name, req, onLoad, config) {
            //Name has format: some.module.filext!strip
            //The strip part is optional.
            //if strip is present, then that means only get the string contents
            //inside a body tag in an HTML string. For XML/SVG content it means
            //removing the <?xml ...?> declarations so the content can be inserted
            //into the current doc without problems.

            // Do not bother with the work if a build and text will
            // not be inlined.
            if (config.isBuild && !config.inlineText) {
                onLoad();
                return;
            }

            masterConfig.isBuild = config.isBuild;

            var parsed = text.parseName(name),
                nonStripName = parsed.moduleName +
                    (parsed.ext ? '.' + parsed.ext : ''),
                url = req.toUrl(nonStripName),
                useXhr = (masterConfig.useXhr) ||
                         text.useXhr;

            //Load the text. Use XHR if possible and in a browser.
            if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
                text.get(url, function (content) {
                    text.finishLoad(name, parsed.strip, content, onLoad);
                }, function (err) {
                    if (onLoad.error) {
                        onLoad.error(err);
                    }
                });
            } else {
                //Need to fetch the resource across domains. Assume
                //the resource has been optimized into a JS module. Fetch
                //by the module name + extension, but do not include the
                //!strip part to avoid file system issues.
                req([nonStripName], function (content) {
                    text.finishLoad(parsed.moduleName + '.' + parsed.ext,
                                    parsed.strip, content, onLoad);
                });
            }
        },

        write: function (pluginName, moduleName, write, config) {
            if (buildMap.hasOwnProperty(moduleName)) {
                var content = text.jsEscape(buildMap[moduleName]);
                write.asModule(pluginName + "!" + moduleName,
                               "define(function () { return '" +
                                   content +
                               "';});\n");
            }
        },

        writeFile: function (pluginName, moduleName, req, write, config) {
            var parsed = text.parseName(moduleName),
                extPart = parsed.ext ? '.' + parsed.ext : '',
                nonStripName = parsed.moduleName + extPart,
                //Use a '.js' file name so that it indicates it is a
                //script that can be loaded across domains.
                fileName = req.toUrl(parsed.moduleName + extPart) + '.js';

            //Leverage own load() method to load plugin value, but only
            //write out values that do not have the strip argument,
            //to avoid any potential issues with ! in file names.
            text.load(nonStripName, req, function (value) {
                //Use own write() method to construct full module value.
                //But need to create shell that translates writeFile's
                //write() to the right interface.
                var textWrite = function (contents) {
                    return write(fileName, contents);
                };
                textWrite.asModule = function (moduleName, contents) {
                    return write.asModule(moduleName, fileName, contents);
                };

                text.write(pluginName, nonStripName, textWrite, config);
            }, config);
        }
    };

    if (masterConfig.env === 'node' || (!masterConfig.env &&
            typeof process !== "undefined" &&
            process.versions &&
            !!process.versions.node)) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');

        text.get = function (url, callback) {
            var file = fs.readFileSync(url, 'utf8');
            //Remove BOM (Byte Mark Order) from utf8 files if it is there.
            if (file.indexOf('\uFEFF') === 0) {
                file = file.substring(1);
            }
            callback(file);
        };
    } else if (masterConfig.env === 'xhr' || (!masterConfig.env &&
            text.createXhr())) {
        text.get = function (url, callback, errback, headers) {
            var xhr = text.createXhr(), header;
            xhr.open('GET', url, true);

            //Allow plugins direct access to xhr headers
            if (headers) {
                for (header in headers) {
                    if (headers.hasOwnProperty(header)) {
                        xhr.setRequestHeader(header.toLowerCase(), headers[header]);
                    }
                }
            }

            //Allow overrides specified in config
            if (masterConfig.onXhr) {
                masterConfig.onXhr(xhr, url);
            }

            xhr.onreadystatechange = function (evt) {
                var status, err;
                //Do not explicitly handle errors, those should be
                //visible via console output in the browser.
                if (xhr.readyState === 4) {
                    status = xhr.status;
                    if (status > 399 && status < 600) {
                        //An http 4xx or 5xx error. Signal an error.
                        err = new Error(url + ' HTTP status: ' + status);
                        err.xhr = xhr;
                        errback(err);
                    } else {
                        callback(xhr.responseText);
                    }
                }
            };
            xhr.send(null);
        };
    } else if (masterConfig.env === 'rhino' || (!masterConfig.env &&
            typeof Packages !== 'undefined' && typeof java !== 'undefined')) {
        //Why Java, why is this so awkward?
        text.get = function (url, callback) {
            var stringBuffer, line,
                encoding = "utf-8",
                file = new java.io.File(url),
                lineSeparator = java.lang.System.getProperty("line.separator"),
                input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
                content = '';
            try {
                stringBuffer = new java.lang.StringBuffer();
                line = input.readLine();

                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                // http://www.unicode.org/faq/utf_bom.html

                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                if (line && line.length() && line.charAt(0) === 0xfeff) {
                    // Eat the BOM, since we've already found the encoding on this file,
                    // and we plan to concatenating this buffer with others; the BOM should
                    // only appear at the top of a file.
                    line = line.substring(1);
                }

                stringBuffer.append(line);

                while ((line = input.readLine()) !== null) {
                    stringBuffer.append(lineSeparator);
                    stringBuffer.append(line);
                }
                //Make sure we return a JavaScript string and not a Java string.
                content = String(stringBuffer.toString()); //String
            } finally {
                input.close();
            }
            callback(content);
        };
    }

    return text;
});

define('js/asciiLogo.txt',[],function () { return '███████╗ ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗███████╗\n██╔════╝██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝██╔════╝\n█████╗  ██║     ███████║███████║██████╔╝   ██║   ███████╗\n██╔══╝  ██║     ██╔══██║██╔══██║██╔══██╗   ██║   ╚════██║\n███████╗╚██████╗██║  ██║██║  ██║██║  ██║   ██║   ███████║\n╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝';});

// Copyright 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// Known Issues:
//
// * Patterns only support repeat.
// * Radial gradient are not implemented. The VML version of these look very
//   different from the canvas one.
// * Clipping paths are not implemented.
// * Coordsize. The width and height attribute have higher priority than the
//   width and height style values which isn't correct.
// * Painting mode isn't implemented.
// * Canvas width/height should is using content-box by default. IE in
//   Quirks mode will draw the canvas using border-box. Either change your
//   doctype to HTML5
//   (http://www.whatwg.org/specs/web-apps/current-work/#the-doctype)
//   or use Box Sizing Behavior from WebFX
//   (http://webfx.eae.net/dhtml/boxsizing/boxsizing.html)
// * Non uniform scaling does not correctly scale strokes.
// * Optimize. There is always room for speed improvements.

// AMD by kener.linfeng@gmail.com
define('zrender/dep/excanvas',['require'],function(require) {
    
// Only add this code if we do not already have a canvas implementation
if (!document.createElement('canvas').getContext) {

(function() {

  // alias some functions to make (compiled) code shorter
  var m = Math;
  var mr = m.round;
  var ms = m.sin;
  var mc = m.cos;
  var abs = m.abs;
  var sqrt = m.sqrt;

  // this is used for sub pixel precision
  var Z = 10;
  var Z2 = Z / 2;

  var IE_VERSION = +navigator.userAgent.match(/MSIE ([\d.]+)?/)[1];

  /**
   * This funtion is assigned to the <canvas> elements as element.getContext().
   * @this {HTMLElement}
   * @return {CanvasRenderingContext2D_}
   */
  function getContext() {
    return this.context_ ||
        (this.context_ = new CanvasRenderingContext2D_(this));
  }

  var slice = Array.prototype.slice;

  /**
   * Binds a function to an object. The returned function will always use the
   * passed in {@code obj} as {@code this}.
   *
   * Example:
   *
   *   g = bind(f, obj, a, b)
   *   g(c, d) // will do f.call(obj, a, b, c, d)
   *
   * @param {Function} f The function to bind the object to
   * @param {Object} obj The object that should act as this when the function
   *     is called
   * @param {*} var_args Rest arguments that will be used as the initial
   *     arguments when the function is called
   * @return {Function} A new function that has bound this
   */
  function bind(f, obj, var_args) {
    var a = slice.call(arguments, 2);
    return function() {
      return f.apply(obj, a.concat(slice.call(arguments)));
    };
  }

  function encodeHtmlAttribute(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  }

  function addNamespace(doc, prefix, urn) {
    if (!doc.namespaces[prefix]) {
      doc.namespaces.add(prefix, urn, '#default#VML');
    }
  }

  function addNamespacesAndStylesheet(doc) {
    addNamespace(doc, 'g_vml_', 'urn:schemas-microsoft-com:vml');
    addNamespace(doc, 'g_o_', 'urn:schemas-microsoft-com:office:office');

    // Setup default CSS.  Only add one style sheet per document
    if (!doc.styleSheets['ex_canvas_']) {
      var ss = doc.createStyleSheet();
      ss.owningElement.id = 'ex_canvas_';
      ss.cssText = 'canvas{display:inline-block;overflow:hidden;' +
          // default size is 300x150 in Gecko and Opera
          'text-align:left;width:300px;height:150px}';
    }
  }

  // Add namespaces and stylesheet at startup.
  addNamespacesAndStylesheet(document);

  var G_vmlCanvasManager_ = {
    init: function(opt_doc) {
      var doc = opt_doc || document;
      // Create a dummy element so that IE will allow canvas elements to be
      // recognized.
      doc.createElement('canvas');
      doc.attachEvent('onreadystatechange', bind(this.init_, this, doc));
    },

    init_: function(doc) {
      // find all canvas elements
      var els = doc.getElementsByTagName('canvas');
      for (var i = 0; i < els.length; i++) {
        this.initElement(els[i]);
      }
    },

    /**
     * Public initializes a canvas element so that it can be used as canvas
     * element from now on. This is called automatically before the page is
     * loaded but if you are creating elements using createElement you need to
     * make sure this is called on the element.
     * @param {HTMLElement} el The canvas element to initialize.
     * @return {HTMLElement} the element that was created.
     */
    initElement: function(el) {
      if (!el.getContext) {
        el.getContext = getContext;

        // Add namespaces and stylesheet to document of the element.
        addNamespacesAndStylesheet(el.ownerDocument);

        // Remove fallback content. There is no way to hide text nodes so we
        // just remove all childNodes. We could hide all elements and remove
        // text nodes but who really cares about the fallback content.
        el.innerHTML = '';

        // do not use inline function because that will leak memory
        el.attachEvent('onpropertychange', onPropertyChange);
        el.attachEvent('onresize', onResize);

        var attrs = el.attributes;
        if (attrs.width && attrs.width.specified) {
          // TODO: use runtimeStyle and coordsize
          // el.getContext().setWidth_(attrs.width.nodeValue);
          el.style.width = attrs.width.nodeValue + 'px';
        } else {
          el.width = el.clientWidth;
        }
        if (attrs.height && attrs.height.specified) {
          // TODO: use runtimeStyle and coordsize
          // el.getContext().setHeight_(attrs.height.nodeValue);
          el.style.height = attrs.height.nodeValue + 'px';
        } else {
          el.height = el.clientHeight;
        }
        //el.getContext().setCoordsize_()
      }
      return el;
    }
  };

  function onPropertyChange(e) {
    var el = e.srcElement;

    switch (e.propertyName) {
      case 'width':
        el.getContext().clearRect();
        el.style.width = el.attributes.width.nodeValue + 'px';
        // In IE8 this does not trigger onresize.
        el.firstChild.style.width =  el.clientWidth + 'px';
        break;
      case 'height':
        el.getContext().clearRect();
        el.style.height = el.attributes.height.nodeValue + 'px';
        el.firstChild.style.height = el.clientHeight + 'px';
        break;
    }
  }

  function onResize(e) {
    var el = e.srcElement;
    if (el.firstChild) {
      el.firstChild.style.width =  el.clientWidth + 'px';
      el.firstChild.style.height = el.clientHeight + 'px';
    }
  }

  G_vmlCanvasManager_.init();

  // precompute "00" to "FF"
  var decToHex = [];
  for (var i = 0; i < 16; i++) {
    for (var j = 0; j < 16; j++) {
      decToHex[i * 16 + j] = i.toString(16) + j.toString(16);
    }
  }

  function createMatrixIdentity() {
    return [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ];
  }

  function matrixMultiply(m1, m2) {
    var result = createMatrixIdentity();

    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        var sum = 0;

        for (var z = 0; z < 3; z++) {
          sum += m1[x][z] * m2[z][y];
        }

        result[x][y] = sum;
      }
    }
    return result;
  }

  function copyState(o1, o2) {
    o2.fillStyle     = o1.fillStyle;
    o2.lineCap       = o1.lineCap;
    o2.lineJoin      = o1.lineJoin;
    o2.lineWidth     = o1.lineWidth;
    o2.miterLimit    = o1.miterLimit;
    o2.shadowBlur    = o1.shadowBlur;
    o2.shadowColor   = o1.shadowColor;
    o2.shadowOffsetX = o1.shadowOffsetX;
    o2.shadowOffsetY = o1.shadowOffsetY;
    o2.strokeStyle   = o1.strokeStyle;
    o2.globalAlpha   = o1.globalAlpha;
    o2.font          = o1.font;
    o2.textAlign     = o1.textAlign;
    o2.textBaseline  = o1.textBaseline;
    o2.arcScaleX_    = o1.arcScaleX_;
    o2.arcScaleY_    = o1.arcScaleY_;
    o2.lineScale_    = o1.lineScale_;
  }

  var colorData = {
    aliceblue: '#F0F8FF',
    antiquewhite: '#FAEBD7',
    aquamarine: '#7FFFD4',
    azure: '#F0FFFF',
    beige: '#F5F5DC',
    bisque: '#FFE4C4',
    black: '#000000',
    blanchedalmond: '#FFEBCD',
    blueviolet: '#8A2BE2',
    brown: '#A52A2A',
    burlywood: '#DEB887',
    cadetblue: '#5F9EA0',
    chartreuse: '#7FFF00',
    chocolate: '#D2691E',
    coral: '#FF7F50',
    cornflowerblue: '#6495ED',
    cornsilk: '#FFF8DC',
    crimson: '#DC143C',
    cyan: '#00FFFF',
    darkblue: '#00008B',
    darkcyan: '#008B8B',
    darkgoldenrod: '#B8860B',
    darkgray: '#A9A9A9',
    darkgreen: '#006400',
    darkgrey: '#A9A9A9',
    darkkhaki: '#BDB76B',
    darkmagenta: '#8B008B',
    darkolivegreen: '#556B2F',
    darkorange: '#FF8C00',
    darkorchid: '#9932CC',
    darkred: '#8B0000',
    darksalmon: '#E9967A',
    darkseagreen: '#8FBC8F',
    darkslateblue: '#483D8B',
    darkslategray: '#2F4F4F',
    darkslategrey: '#2F4F4F',
    darkturquoise: '#00CED1',
    darkviolet: '#9400D3',
    deeppink: '#FF1493',
    deepskyblue: '#00BFFF',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1E90FF',
    firebrick: '#B22222',
    floralwhite: '#FFFAF0',
    forestgreen: '#228B22',
    gainsboro: '#DCDCDC',
    ghostwhite: '#F8F8FF',
    gold: '#FFD700',
    goldenrod: '#DAA520',
    grey: '#808080',
    greenyellow: '#ADFF2F',
    honeydew: '#F0FFF0',
    hotpink: '#FF69B4',
    indianred: '#CD5C5C',
    indigo: '#4B0082',
    ivory: '#FFFFF0',
    khaki: '#F0E68C',
    lavender: '#E6E6FA',
    lavenderblush: '#FFF0F5',
    lawngreen: '#7CFC00',
    lemonchiffon: '#FFFACD',
    lightblue: '#ADD8E6',
    lightcoral: '#F08080',
    lightcyan: '#E0FFFF',
    lightgoldenrodyellow: '#FAFAD2',
    lightgreen: '#90EE90',
    lightgrey: '#D3D3D3',
    lightpink: '#FFB6C1',
    lightsalmon: '#FFA07A',
    lightseagreen: '#20B2AA',
    lightskyblue: '#87CEFA',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#B0C4DE',
    lightyellow: '#FFFFE0',
    limegreen: '#32CD32',
    linen: '#FAF0E6',
    magenta: '#FF00FF',
    mediumaquamarine: '#66CDAA',
    mediumblue: '#0000CD',
    mediumorchid: '#BA55D3',
    mediumpurple: '#9370DB',
    mediumseagreen: '#3CB371',
    mediumslateblue: '#7B68EE',
    mediumspringgreen: '#00FA9A',
    mediumturquoise: '#48D1CC',
    mediumvioletred: '#C71585',
    midnightblue: '#191970',
    mintcream: '#F5FFFA',
    mistyrose: '#FFE4E1',
    moccasin: '#FFE4B5',
    navajowhite: '#FFDEAD',
    oldlace: '#FDF5E6',
    olivedrab: '#6B8E23',
    orange: '#FFA500',
    orangered: '#FF4500',
    orchid: '#DA70D6',
    palegoldenrod: '#EEE8AA',
    palegreen: '#98FB98',
    paleturquoise: '#AFEEEE',
    palevioletred: '#DB7093',
    papayawhip: '#FFEFD5',
    peachpuff: '#FFDAB9',
    peru: '#CD853F',
    pink: '#FFC0CB',
    plum: '#DDA0DD',
    powderblue: '#B0E0E6',
    rosybrown: '#BC8F8F',
    royalblue: '#4169E1',
    saddlebrown: '#8B4513',
    salmon: '#FA8072',
    sandybrown: '#F4A460',
    seagreen: '#2E8B57',
    seashell: '#FFF5EE',
    sienna: '#A0522D',
    skyblue: '#87CEEB',
    slateblue: '#6A5ACD',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#FFFAFA',
    springgreen: '#00FF7F',
    steelblue: '#4682B4',
    tan: '#D2B48C',
    thistle: '#D8BFD8',
    tomato: '#FF6347',
    turquoise: '#40E0D0',
    violet: '#EE82EE',
    wheat: '#F5DEB3',
    whitesmoke: '#F5F5F5',
    yellowgreen: '#9ACD32'
  };


  function getRgbHslContent(styleString) {
    var start = styleString.indexOf('(', 3);
    var end = styleString.indexOf(')', start + 1);
    var parts = styleString.substring(start + 1, end).split(',');
    // add alpha if needed
    if (parts.length != 4 || styleString.charAt(3) != 'a') {
      parts[3] = 1;
    }
    return parts;
  }

  function percent(s) {
    return parseFloat(s) / 100;
  }

  function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  function hslToRgb(parts){
    var r, g, b, h, s, l;
    h = parseFloat(parts[0]) / 360 % 360;
    if (h < 0)
      h++;
    s = clamp(percent(parts[1]), 0, 1);
    l = clamp(percent(parts[2]), 0, 1);
    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
    }

    return '#' + decToHex[Math.floor(r * 255)] +
        decToHex[Math.floor(g * 255)] +
        decToHex[Math.floor(b * 255)];
  }

  function hueToRgb(m1, m2, h) {
    if (h < 0)
      h++;
    if (h > 1)
      h--;

    if (6 * h < 1)
      return m1 + (m2 - m1) * 6 * h;
    else if (2 * h < 1)
      return m2;
    else if (3 * h < 2)
      return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    else
      return m1;
  }

  var processStyleCache = {};

  function processStyle(styleString) {
    if (styleString in processStyleCache) {
      return processStyleCache[styleString];
    }

    var str, alpha = 1;

    styleString = String(styleString);
    if (styleString.charAt(0) == '#') {
      str = styleString;
    } else if (/^rgb/.test(styleString)) {
      var parts = getRgbHslContent(styleString);
      var str = '#', n;
      for (var i = 0; i < 3; i++) {
        if (parts[i].indexOf('%') != -1) {
          n = Math.floor(percent(parts[i]) * 255);
        } else {
          n = +parts[i];
        }
        str += decToHex[clamp(n, 0, 255)];
      }
      alpha = +parts[3];
    } else if (/^hsl/.test(styleString)) {
      var parts = getRgbHslContent(styleString);
      str = hslToRgb(parts);
      alpha = parts[3];
    } else {
      str = colorData[styleString] || styleString;
    }
    return processStyleCache[styleString] = {color: str, alpha: alpha};
  }

  var DEFAULT_STYLE = {
    style: 'normal',
    variant: 'normal',
    weight: 'normal',
    size: 12,           //10
    family: '微软雅黑'     //'sans-serif'
  };

  // Internal text style cache
  var fontStyleCache = {};

  function processFontStyle(styleString) {
    if (fontStyleCache[styleString]) {
      return fontStyleCache[styleString];
    }

    var el = document.createElement('div');
    var style = el.style;
    var fontFamily;
    try {
      style.font = styleString;
      fontFamily = style.fontFamily.split(',')[0];
    } catch (ex) {
      // Ignore failures to set to invalid font.
    }

    return fontStyleCache[styleString] = {
      style: style.fontStyle || DEFAULT_STYLE.style,
      variant: style.fontVariant || DEFAULT_STYLE.variant,
      weight: style.fontWeight || DEFAULT_STYLE.weight,
      size: style.fontSize || DEFAULT_STYLE.size,
      family: fontFamily || DEFAULT_STYLE.family
    };
  }

  function getComputedStyle(style, element) {
    var computedStyle = {};

    for (var p in style) {
      computedStyle[p] = style[p];
    }

    // Compute the size
    var canvasFontSize = parseFloat(element.currentStyle.fontSize),
        fontSize = parseFloat(style.size);

    if (typeof style.size == 'number') {
      computedStyle.size = style.size;
    } else if (style.size.indexOf('px') != -1) {
      computedStyle.size = fontSize;
    } else if (style.size.indexOf('em') != -1) {
      computedStyle.size = canvasFontSize * fontSize;
    } else if(style.size.indexOf('%') != -1) {
      computedStyle.size = (canvasFontSize / 100) * fontSize;
    } else if (style.size.indexOf('pt') != -1) {
      computedStyle.size = fontSize / .75;
    } else {
      computedStyle.size = canvasFontSize;
    }

    // Different scaling between normal text and VML text. This was found using
    // trial and error to get the same size as non VML text.
    //computedStyle.size *= 0.981;

    return computedStyle;
  }

  function buildStyle(style) {
    return style.style + ' ' + style.variant + ' ' + style.weight + ' ' +
        style.size + "px '" + style.family + "'";
  }

  var lineCapMap = {
    'butt': 'flat',
    'round': 'round'
  };

  function processLineCap(lineCap) {
    return lineCapMap[lineCap] || 'square';
  }

  /**
   * This class implements CanvasRenderingContext2D interface as described by
   * the WHATWG.
   * @param {HTMLElement} canvasElement The element that the 2D context should
   * be associated with
   */
  function CanvasRenderingContext2D_(canvasElement) {
    this.m_ = createMatrixIdentity();

    this.mStack_ = [];
    this.aStack_ = [];
    this.currentPath_ = [];

    // Canvas context properties
    this.strokeStyle = '#000';
    this.fillStyle = '#000';

    this.lineWidth = 1;
    this.lineJoin = 'miter';
    this.lineCap = 'butt';
    this.miterLimit = Z * 1;
    this.globalAlpha = 1;
    // this.font = '10px sans-serif';
    this.font = '12px 微软雅黑';        // 决定还是改这吧，影响代价最小
    this.textAlign = 'left';
    this.textBaseline = 'alphabetic';
    this.canvas = canvasElement;

    var cssText = 'width:' + canvasElement.clientWidth + 'px;height:' +
        canvasElement.clientHeight + 'px;overflow:hidden;position:absolute';
    var el = canvasElement.ownerDocument.createElement('div');
    el.style.cssText = cssText;
    canvasElement.appendChild(el);

    var overlayEl = el.cloneNode(false);
    // Use a non transparent background.
    overlayEl.style.backgroundColor = '#fff'; //red, I don't know why, it work! 
    overlayEl.style.filter = 'alpha(opacity=0)';
    canvasElement.appendChild(overlayEl);

    this.element_ = el;
    this.arcScaleX_ = 1;
    this.arcScaleY_ = 1;
    this.lineScale_ = 1;
  }

  var contextPrototype = CanvasRenderingContext2D_.prototype;
  contextPrototype.clearRect = function() {
    if (this.textMeasureEl_) {
      this.textMeasureEl_.removeNode(true);
      this.textMeasureEl_ = null;
    }
    this.element_.innerHTML = '';
  };

  contextPrototype.beginPath = function() {
    // TODO: Branch current matrix so that save/restore has no effect
    //       as per safari docs.
    this.currentPath_ = [];
  };

  contextPrototype.moveTo = function(aX, aY) {
    var p = getCoords(this, aX, aY);
    this.currentPath_.push({type: 'moveTo', x: p.x, y: p.y});
    this.currentX_ = p.x;
    this.currentY_ = p.y;
  };

  contextPrototype.lineTo = function(aX, aY) {
    var p = getCoords(this, aX, aY);
    this.currentPath_.push({type: 'lineTo', x: p.x, y: p.y});

    this.currentX_ = p.x;
    this.currentY_ = p.y;
  };

  contextPrototype.bezierCurveTo = function(aCP1x, aCP1y,
                                            aCP2x, aCP2y,
                                            aX, aY) {
    var p = getCoords(this, aX, aY);
    var cp1 = getCoords(this, aCP1x, aCP1y);
    var cp2 = getCoords(this, aCP2x, aCP2y);
    bezierCurveTo(this, cp1, cp2, p);
  };

  // Helper function that takes the already fixed cordinates.
  function bezierCurveTo(self, cp1, cp2, p) {
    self.currentPath_.push({
      type: 'bezierCurveTo',
      cp1x: cp1.x,
      cp1y: cp1.y,
      cp2x: cp2.x,
      cp2y: cp2.y,
      x: p.x,
      y: p.y
    });
    self.currentX_ = p.x;
    self.currentY_ = p.y;
  }

  contextPrototype.quadraticCurveTo = function(aCPx, aCPy, aX, aY) {
    // the following is lifted almost directly from
    // http://developer.mozilla.org/en/docs/Canvas_tutorial:Drawing_shapes

    var cp = getCoords(this, aCPx, aCPy);
    var p = getCoords(this, aX, aY);

    var cp1 = {
      x: this.currentX_ + 2.0 / 3.0 * (cp.x - this.currentX_),
      y: this.currentY_ + 2.0 / 3.0 * (cp.y - this.currentY_)
    };
    var cp2 = {
      x: cp1.x + (p.x - this.currentX_) / 3.0,
      y: cp1.y + (p.y - this.currentY_) / 3.0
    };

    bezierCurveTo(this, cp1, cp2, p);
  };

  contextPrototype.arc = function(aX, aY, aRadius,
                                  aStartAngle, aEndAngle, aClockwise) {
    aRadius *= Z;
    var arcType = aClockwise ? 'at' : 'wa';

    var xStart = aX + mc(aStartAngle) * aRadius - Z2;
    var yStart = aY + ms(aStartAngle) * aRadius - Z2;

    var xEnd = aX + mc(aEndAngle) * aRadius - Z2;
    var yEnd = aY + ms(aEndAngle) * aRadius - Z2;

    // IE won't render arches drawn counter clockwise if xStart == xEnd.
    if (xStart == xEnd && !aClockwise) {
      xStart += 0.125; // Offset xStart by 1/80 of a pixel. Use something
                       // that can be represented in binary
    }

    var p = getCoords(this, aX, aY);
    var pStart = getCoords(this, xStart, yStart);
    var pEnd = getCoords(this, xEnd, yEnd);

    this.currentPath_.push({type: arcType,
                           x: p.x,
                           y: p.y,
                           radius: aRadius,
                           xStart: pStart.x,
                           yStart: pStart.y,
                           xEnd: pEnd.x,
                           yEnd: pEnd.y});

  };

  contextPrototype.rect = function(aX, aY, aWidth, aHeight) {
    this.moveTo(aX, aY);
    this.lineTo(aX + aWidth, aY);
    this.lineTo(aX + aWidth, aY + aHeight);
    this.lineTo(aX, aY + aHeight);
    this.closePath();
  };

  contextPrototype.strokeRect = function(aX, aY, aWidth, aHeight) {
    var oldPath = this.currentPath_;
    this.beginPath();

    this.moveTo(aX, aY);
    this.lineTo(aX + aWidth, aY);
    this.lineTo(aX + aWidth, aY + aHeight);
    this.lineTo(aX, aY + aHeight);
    this.closePath();
    this.stroke();

    this.currentPath_ = oldPath;
  };

  contextPrototype.fillRect = function(aX, aY, aWidth, aHeight) {
    var oldPath = this.currentPath_;
    this.beginPath();

    this.moveTo(aX, aY);
    this.lineTo(aX + aWidth, aY);
    this.lineTo(aX + aWidth, aY + aHeight);
    this.lineTo(aX, aY + aHeight);
    this.closePath();
    this.fill();

    this.currentPath_ = oldPath;
  };

  contextPrototype.createLinearGradient = function(aX0, aY0, aX1, aY1) {
    var gradient = new CanvasGradient_('gradient');
    gradient.x0_ = aX0;
    gradient.y0_ = aY0;
    gradient.x1_ = aX1;
    gradient.y1_ = aY1;
    return gradient;
  };

  contextPrototype.createRadialGradient = function(aX0, aY0, aR0,
                                                   aX1, aY1, aR1) {
    var gradient = new CanvasGradient_('gradientradial');
    gradient.x0_ = aX0;
    gradient.y0_ = aY0;
    gradient.r0_ = aR0;
    gradient.x1_ = aX1;
    gradient.y1_ = aY1;
    gradient.r1_ = aR1;
    return gradient;
  };

  contextPrototype.drawImage = function(image, var_args) {
    var dx, dy, dw, dh, sx, sy, sw, sh;

    // to find the original width we overide the width and height
    var oldRuntimeWidth = image.runtimeStyle.width;
    var oldRuntimeHeight = image.runtimeStyle.height;
    image.runtimeStyle.width = 'auto';
    image.runtimeStyle.height = 'auto';

    // get the original size
    var w = image.width;
    var h = image.height;

    // and remove overides
    image.runtimeStyle.width = oldRuntimeWidth;
    image.runtimeStyle.height = oldRuntimeHeight;

    if (arguments.length == 3) {
      dx = arguments[1];
      dy = arguments[2];
      sx = sy = 0;
      sw = dw = w;
      sh = dh = h;
    } else if (arguments.length == 5) {
      dx = arguments[1];
      dy = arguments[2];
      dw = arguments[3];
      dh = arguments[4];
      sx = sy = 0;
      sw = w;
      sh = h;
    } else if (arguments.length == 9) {
      sx = arguments[1];
      sy = arguments[2];
      sw = arguments[3];
      sh = arguments[4];
      dx = arguments[5];
      dy = arguments[6];
      dw = arguments[7];
      dh = arguments[8];
    } else {
      throw Error('Invalid number of arguments');
    }

    var d = getCoords(this, dx, dy);

    var w2 = sw / 2;
    var h2 = sh / 2;

    var vmlStr = [];

    var W = 10;
    var H = 10;

    var scaleX = scaleY = 1;
    
    // For some reason that I've now forgotten, using divs didn't work
    vmlStr.push(' <g_vml_:group',
                ' coordsize="', Z * W, ',', Z * H, '"',
                ' coordorigin="0,0"' ,
                ' style="width:', W, 'px;height:', H, 'px;position:absolute;');

    // If filters are necessary (rotation exists), create them
    // filters are bog-slow, so only create them if abbsolutely necessary
    // The following check doesn't account for skews (which don't exist
    // in the canvas spec (yet) anyway.

    if (this.m_[0][0] != 1 || this.m_[0][1] ||
        this.m_[1][1] != 1 || this.m_[1][0]) {
      var filter = [];

      scaleX = Math.sqrt(this.m_[0][0] * this.m_[0][0] + this.m_[0][1] * this.m_[0][1]);
      scaleY = Math.sqrt(this.m_[1][0] * this.m_[1][0] + this.m_[1][1] * this.m_[1][1]);

      // Note the 12/21 reversal
      filter.push('M11=', this.m_[0][0] / scaleX, ',',
                  'M12=', this.m_[1][0] / scaleY, ',',
                  'M21=', this.m_[0][1] / scaleX, ',',
                  'M22=', this.m_[1][1] / scaleY, ',',
                  'Dx=', mr(d.x / Z), ',',
                  'Dy=', mr(d.y / Z), '');

      // Bounding box calculation (need to minimize displayed area so that
      // filters don't waste time on unused pixels.
      var max = d;
      var c2 = getCoords(this, dx + dw, dy);
      var c3 = getCoords(this, dx, dy + dh);
      var c4 = getCoords(this, dx + dw, dy + dh);

      max.x = m.max(max.x, c2.x, c3.x, c4.x);
      max.y = m.max(max.y, c2.y, c3.y, c4.y);

      vmlStr.push('padding:0 ', mr(max.x / Z), 'px ', mr(max.y / Z),
                  'px 0;filter:progid:DXImageTransform.Microsoft.Matrix(',
                  filter.join(''), ", sizingmethod='clip');");

    } else {
      vmlStr.push('top:', mr(d.y / Z), 'px;left:', mr(d.x / Z), 'px;');
    }

    vmlStr.push(' ">');

    // Draw a special cropping div if needed
    if (sx || sy) {
      // Apply scales to width and height
      vmlStr.push('<div style="overflow: hidden; width:', Math.ceil((dw + sx * dw / sw) * scaleX), 'px;',
                  ' height:', Math.ceil((dh + sy * dh / sh) * scaleY), 'px;',
                  ' filter:progid:DxImageTransform.Microsoft.Matrix(Dx=',
                  -sx * dw / sw * scaleX, ',Dy=', -sy * dh / sh * scaleY, ');">');
    }
    
      
    // Apply scales to width and height
    vmlStr.push('<div style="width:', Math.round(scaleX * w * dw / sw), 'px;',
                ' height:', Math.round(scaleY * h * dh / sh), 'px;',
                ' filter:');
   
    // If there is a globalAlpha, apply it to image
    if(this.globalAlpha < 1) {
      vmlStr.push(' progid:DXImageTransform.Microsoft.Alpha(opacity=' + (this.globalAlpha * 100) + ')');
    }
    
    vmlStr.push(' progid:DXImageTransform.Microsoft.AlphaImageLoader(src=', image.src, ',sizingMethod=scale)">');
    
    // Close the crop div if necessary            
    if (sx || sy) vmlStr.push('</div>');
    
    vmlStr.push('</div></div>');
    
    this.element_.insertAdjacentHTML('BeforeEnd', vmlStr.join(''));
  };

  contextPrototype.stroke = function(aFill) {
    var lineStr = [];
    var lineOpen = false;

    var W = 10;
    var H = 10;

    lineStr.push('<g_vml_:shape',
                 ' filled="', !!aFill, '"',
                 ' style="position:absolute;width:', W, 'px;height:', H, 'px;"',
                 ' coordorigin="0,0"',
                 ' coordsize="', Z * W, ',', Z * H, '"',
                 ' stroked="', !aFill, '"',
                 ' path="');

    var newSeq = false;
    var min = {x: null, y: null};
    var max = {x: null, y: null};

    for (var i = 0; i < this.currentPath_.length; i++) {
      var p = this.currentPath_[i];
      var c;

      switch (p.type) {
        case 'moveTo':
          c = p;
          lineStr.push(' m ', mr(p.x), ',', mr(p.y));
          break;
        case 'lineTo':
          lineStr.push(' l ', mr(p.x), ',', mr(p.y));
          break;
        case 'close':
          lineStr.push(' x ');
          p = null;
          break;
        case 'bezierCurveTo':
          lineStr.push(' c ',
                       mr(p.cp1x), ',', mr(p.cp1y), ',',
                       mr(p.cp2x), ',', mr(p.cp2y), ',',
                       mr(p.x), ',', mr(p.y));
          break;
        case 'at':
        case 'wa':
          lineStr.push(' ', p.type, ' ',
                       mr(p.x - this.arcScaleX_ * p.radius), ',',
                       mr(p.y - this.arcScaleY_ * p.radius), ' ',
                       mr(p.x + this.arcScaleX_ * p.radius), ',',
                       mr(p.y + this.arcScaleY_ * p.radius), ' ',
                       mr(p.xStart), ',', mr(p.yStart), ' ',
                       mr(p.xEnd), ',', mr(p.yEnd));
          break;
      }


      // TODO: Following is broken for curves due to
      //       move to proper paths.

      // Figure out dimensions so we can do gradient fills
      // properly
      if (p) {
        if (min.x == null || p.x < min.x) {
          min.x = p.x;
        }
        if (max.x == null || p.x > max.x) {
          max.x = p.x;
        }
        if (min.y == null || p.y < min.y) {
          min.y = p.y;
        }
        if (max.y == null || p.y > max.y) {
          max.y = p.y;
        }
      }
    }
    lineStr.push(' ">');

    if (!aFill) {
      appendStroke(this, lineStr);
    } else {
      appendFill(this, lineStr, min, max);
    }

    lineStr.push('</g_vml_:shape>');

    this.element_.insertAdjacentHTML('beforeEnd', lineStr.join(''));
  };

  function appendStroke(ctx, lineStr) {
    var a = processStyle(ctx.strokeStyle);
    var color = a.color;
    var opacity = a.alpha * ctx.globalAlpha;
    var lineWidth = ctx.lineScale_ * ctx.lineWidth;

    // VML cannot correctly render a line if the width is less than 1px.
    // In that case, we dilute the color to make the line look thinner.
    if (lineWidth < 1) {
      opacity *= lineWidth;
    }

    lineStr.push(
      '<g_vml_:stroke',
      ' opacity="', opacity, '"',
      ' joinstyle="', ctx.lineJoin, '"',
      ' miterlimit="', ctx.miterLimit, '"',
      ' endcap="', processLineCap(ctx.lineCap), '"',
      ' weight="', lineWidth, 'px"',
      ' color="', color, '" />'
    );
  }

  function appendFill(ctx, lineStr, min, max) {
    var fillStyle = ctx.fillStyle;
    var arcScaleX = ctx.arcScaleX_;
    var arcScaleY = ctx.arcScaleY_;
    var width = max.x - min.x;
    var height = max.y - min.y;
    if (fillStyle instanceof CanvasGradient_) {
      // TODO: Gradients transformed with the transformation matrix.
      var angle = 0;
      var focus = {x: 0, y: 0};

      // additional offset
      var shift = 0;
      // scale factor for offset
      var expansion = 1;

      if (fillStyle.type_ == 'gradient') {
        var x0 = fillStyle.x0_ / arcScaleX;
        var y0 = fillStyle.y0_ / arcScaleY;
        var x1 = fillStyle.x1_ / arcScaleX;
        var y1 = fillStyle.y1_ / arcScaleY;
        var p0 = getCoords(ctx, x0, y0);
        var p1 = getCoords(ctx, x1, y1);
        var dx = p1.x - p0.x;
        var dy = p1.y - p0.y;
        angle = Math.atan2(dx, dy) * 180 / Math.PI;

        // The angle should be a non-negative number.
        if (angle < 0) {
          angle += 360;
        }

        // Very small angles produce an unexpected result because they are
        // converted to a scientific notation string.
        if (angle < 1e-6) {
          angle = 0;
        }
      } else {
        var p0 = getCoords(ctx, fillStyle.x0_, fillStyle.y0_);
        focus = {
          x: (p0.x - min.x) / width,
          y: (p0.y - min.y) / height
        };

        width  /= arcScaleX * Z;
        height /= arcScaleY * Z;
        var dimension = m.max(width, height);
        shift = 2 * fillStyle.r0_ / dimension;
        expansion = 2 * fillStyle.r1_ / dimension - shift;
      }

      // We need to sort the color stops in ascending order by offset,
      // otherwise IE won't interpret it correctly.
      var stops = fillStyle.colors_;
      stops.sort(function(cs1, cs2) {
        return cs1.offset - cs2.offset;
      });

      var length = stops.length;
      var color1 = stops[0].color;
      var color2 = stops[length - 1].color;
      var opacity1 = stops[0].alpha * ctx.globalAlpha;
      var opacity2 = stops[length - 1].alpha * ctx.globalAlpha;

      var colors = [];
      for (var i = 0; i < length; i++) {
        var stop = stops[i];
        colors.push(stop.offset * expansion + shift + ' ' + stop.color);
      }

      // When colors attribute is used, the meanings of opacity and o:opacity2
      // are reversed.
      lineStr.push('<g_vml_:fill type="', fillStyle.type_, '"',
                   ' method="none" focus="100%"',
                   ' color="', color1, '"',
                   ' color2="', color2, '"',
                   ' colors="', colors.join(','), '"',
                   ' opacity="', opacity2, '"',
                   ' g_o_:opacity2="', opacity1, '"',
                   ' angle="', angle, '"',
                   ' focusposition="', focus.x, ',', focus.y, '" />');
    } else if (fillStyle instanceof CanvasPattern_) {
      if (width && height) {
        var deltaLeft = -min.x;
        var deltaTop = -min.y;
        lineStr.push('<g_vml_:fill',
                     ' position="',
                     deltaLeft / width * arcScaleX * arcScaleX, ',',
                     deltaTop / height * arcScaleY * arcScaleY, '"',
                     ' type="tile"',
                     // TODO: Figure out the correct size to fit the scale.
                     //' size="', w, 'px ', h, 'px"',
                     ' src="', fillStyle.src_, '" />');
       }
    } else {
      var a = processStyle(ctx.fillStyle);
      var color = a.color;
      var opacity = a.alpha * ctx.globalAlpha;
      lineStr.push('<g_vml_:fill color="', color, '" opacity="', opacity,
                   '" />');
    }
  }

  contextPrototype.fill = function() {
    this.stroke(true);
  };

  contextPrototype.closePath = function() {
    this.currentPath_.push({type: 'close'});
  };

  function getCoords(ctx, aX, aY) {
    var m = ctx.m_;
    return {
      x: Z * (aX * m[0][0] + aY * m[1][0] + m[2][0]) - Z2,
      y: Z * (aX * m[0][1] + aY * m[1][1] + m[2][1]) - Z2
    };
  };

  contextPrototype.save = function() {
    var o = {};
    copyState(this, o);
    this.aStack_.push(o);
    this.mStack_.push(this.m_);
    this.m_ = matrixMultiply(createMatrixIdentity(), this.m_);
  };

  contextPrototype.restore = function() {
    if (this.aStack_.length) {
      copyState(this.aStack_.pop(), this);
      this.m_ = this.mStack_.pop();
    }
  };

  function matrixIsFinite(m) {
    return isFinite(m[0][0]) && isFinite(m[0][1]) &&
        isFinite(m[1][0]) && isFinite(m[1][1]) &&
        isFinite(m[2][0]) && isFinite(m[2][1]);
  }

  function setM(ctx, m, updateLineScale) {
    if (!matrixIsFinite(m)) {
      return;
    }
    ctx.m_ = m;

    if (updateLineScale) {
      // Get the line scale.
      // Determinant of this.m_ means how much the area is enlarged by the
      // transformation. So its square root can be used as a scale factor
      // for width.
      var det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
      ctx.lineScale_ = sqrt(abs(det));
    }
  }

  contextPrototype.translate = function(aX, aY) {
    var m1 = [
      [1,  0,  0],
      [0,  1,  0],
      [aX, aY, 1]
    ];

    setM(this, matrixMultiply(m1, this.m_), false);
  };

  contextPrototype.rotate = function(aRot) {
    var c = mc(aRot);
    var s = ms(aRot);

    var m1 = [
      [c,  s, 0],
      [-s, c, 0],
      [0,  0, 1]
    ];

    setM(this, matrixMultiply(m1, this.m_), false);
  };

  contextPrototype.scale = function(aX, aY) {
    this.arcScaleX_ *= aX;
    this.arcScaleY_ *= aY;
    var m1 = [
      [aX, 0,  0],
      [0,  aY, 0],
      [0,  0,  1]
    ];

    setM(this, matrixMultiply(m1, this.m_), true);
  };

  contextPrototype.transform = function(m11, m12, m21, m22, dx, dy) {
    var m1 = [
      [m11, m12, 0],
      [m21, m22, 0],
      [dx,  dy,  1]
    ];

    setM(this, matrixMultiply(m1, this.m_), true);
  };

  contextPrototype.setTransform = function(m11, m12, m21, m22, dx, dy) {
    var m = [
      [m11, m12, 0],
      [m21, m22, 0],
      [dx,  dy,  1]
    ];

    setM(this, m, true);
  };

  /**
   * The text drawing function.
   * The maxWidth argument isn't taken in account, since no browser supports
   * it yet.
   */
  contextPrototype.drawText_ = function(text, x, y, maxWidth, stroke) {
    var m = this.m_,
        delta = 1000,
        left = 0,
        right = delta,
        offset = {x: 0, y: 0},
        lineStr = [];

    var fontStyle = getComputedStyle(processFontStyle(this.font),
                                     this.element_);

    var fontStyleString = buildStyle(fontStyle);

    var elementStyle = this.element_.currentStyle;
    var textAlign = this.textAlign.toLowerCase();
    switch (textAlign) {
      case 'left':
      case 'center':
      case 'right':
        break;
      case 'end':
        textAlign = elementStyle.direction == 'ltr' ? 'right' : 'left';
        break;
      case 'start':
        textAlign = elementStyle.direction == 'rtl' ? 'right' : 'left';
        break;
      default:
        textAlign = 'left';
    }

    // 1.75 is an arbitrary number, as there is no info about the text baseline
    switch (this.textBaseline) {
      case 'hanging':
      case 'top':
        offset.y = fontStyle.size / 1.75;
        break;
      case 'middle':
        break;
      default:
      case null:
      case 'alphabetic':
      case 'ideographic':
      case 'bottom':
        offset.y = -fontStyle.size / 2.25;
        break;
    }

    switch(textAlign) {
      case 'right':
        left = delta;
        right = 0.05;
        break;
      case 'center':
        left = right = delta / 2;
        break;
    }

    var d = getCoords(this, x + offset.x, y + offset.y);

    lineStr.push('<g_vml_:line from="', -left ,' 0" to="', right ,' 0.05" ',
                 ' coordsize="100 100" coordorigin="0 0"',
                 ' filled="', !stroke, '" stroked="', !!stroke,
                 '" style="position:absolute;width:1px;height:1px;">');

    if (stroke) {
      appendStroke(this, lineStr);
    } else {
      // TODO: Fix the min and max params.
      appendFill(this, lineStr, {x: -left, y: 0},
                 {x: right, y: fontStyle.size});
    }

    var skewM = m[0][0].toFixed(3) + ',' + m[1][0].toFixed(3) + ',' +
                m[0][1].toFixed(3) + ',' + m[1][1].toFixed(3) + ',0,0';

    var skewOffset = mr(d.x / Z) + ',' + mr(d.y / Z);

    lineStr.push('<g_vml_:skew on="t" matrix="', skewM ,'" ',
                 ' offset="', skewOffset, '" origin="', left ,' 0" />',
                 '<g_vml_:path textpathok="true" />',
                 '<g_vml_:textpath on="true" string="',
                 encodeHtmlAttribute(text),
                 '" style="v-text-align:', textAlign,
                 ';font:', encodeHtmlAttribute(fontStyleString),
                 '" /></g_vml_:line>');

    this.element_.insertAdjacentHTML('beforeEnd', lineStr.join(''));
  };

  contextPrototype.fillText = function(text, x, y, maxWidth) {
    this.drawText_(text, x, y, maxWidth, false);
  };

  contextPrototype.strokeText = function(text, x, y, maxWidth) {
    this.drawText_(text, x, y, maxWidth, true);
  };

  contextPrototype.measureText = function(text) {
    if (!this.textMeasureEl_) {
      var s = '<span style="position:absolute;' +
          'top:-20000px;left:0;padding:0;margin:0;border:none;' +
          'white-space:pre;"></span>';
      this.element_.insertAdjacentHTML('beforeEnd', s);
      this.textMeasureEl_ = this.element_.lastChild;
    }
    var doc = this.element_.ownerDocument;
    this.textMeasureEl_.innerHTML = '';
    this.textMeasureEl_.style.font = this.font;
    // Don't use innerHTML or innerText because they allow markup/whitespace.
    this.textMeasureEl_.appendChild(doc.createTextNode(text));
    return {width: this.textMeasureEl_.offsetWidth};
  };

  /******** STUBS ********/
  contextPrototype.clip = function() {
    // TODO: Implement
  };

  contextPrototype.arcTo = function() {
    // TODO: Implement
  };

  contextPrototype.createPattern = function(image, repetition) {
    return new CanvasPattern_(image, repetition);
  };

  // Gradient / Pattern Stubs
  function CanvasGradient_(aType) {
    this.type_ = aType;
    this.x0_ = 0;
    this.y0_ = 0;
    this.r0_ = 0;
    this.x1_ = 0;
    this.y1_ = 0;
    this.r1_ = 0;
    this.colors_ = [];
  }

  CanvasGradient_.prototype.addColorStop = function(aOffset, aColor) {
    aColor = processStyle(aColor);
    this.colors_.push({offset: aOffset,
                       color: aColor.color,
                       alpha: aColor.alpha});
  };

  function CanvasPattern_(image, repetition) {
    assertImageIsValid(image);
    switch (repetition) {
      case 'repeat':
      case null:
      case '':
        this.repetition_ = 'repeat';
        break
      case 'repeat-x':
      case 'repeat-y':
      case 'no-repeat':
        this.repetition_ = repetition;
        break;
      default:
        throwException('SYNTAX_ERR');
    }

    this.src_ = image.src;
    this.width_ = image.width;
    this.height_ = image.height;
  }

  function throwException(s) {
    throw new DOMException_(s);
  }

  function assertImageIsValid(img) {
    if (!img || img.nodeType != 1 || img.tagName != 'IMG') {
      throwException('TYPE_MISMATCH_ERR');
    }
    if (img.readyState != 'complete') {
      throwException('INVALID_STATE_ERR');
    }
  }

  function DOMException_(s) {
    this.code = this[s];
    this.message = s +': DOM Exception ' + this.code;
  }
  var p = DOMException_.prototype = new Error;
  p.INDEX_SIZE_ERR = 1;
  p.DOMSTRING_SIZE_ERR = 2;
  p.HIERARCHY_REQUEST_ERR = 3;
  p.WRONG_DOCUMENT_ERR = 4;
  p.INVALID_CHARACTER_ERR = 5;
  p.NO_DATA_ALLOWED_ERR = 6;
  p.NO_MODIFICATION_ALLOWED_ERR = 7;
  p.NOT_FOUND_ERR = 8;
  p.NOT_SUPPORTED_ERR = 9;
  p.INUSE_ATTRIBUTE_ERR = 10;
  p.INVALID_STATE_ERR = 11;
  p.SYNTAX_ERR = 12;
  p.INVALID_MODIFICATION_ERR = 13;
  p.NAMESPACE_ERR = 14;
  p.INVALID_ACCESS_ERR = 15;
  p.VALIDATION_ERR = 16;
  p.TYPE_MISMATCH_ERR = 17;

  // set up externs
  G_vmlCanvasManager = G_vmlCanvasManager_;
  CanvasRenderingContext2D = CanvasRenderingContext2D_;
  CanvasGradient = CanvasGradient_;
  CanvasPattern = CanvasPattern_;
  DOMException = DOMException_;
})();

} // if
else { // make the canvas test simple by kener.linfeng@gmail.com
    G_vmlCanvasManager = false;
}
return G_vmlCanvasManager;
}); // define;
/**
 * zrender: 公共辅助函数
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *
 * clone：深度克隆
 * merge：合并源对象的属性到目标对象
 * getContext：获取一个自由使用的canvas 2D context，使用原生方法，如isPointInPath，measureText等
 */
define(
    'zrender/tool/util',['require','../dep/excanvas'],function(require) {
        // 用于处理merge时无法遍历Date等对象的问题
        var BUILTIN_OBJECT = {
            '[object Function]': 1,
            '[object RegExp]': 1,
            '[object Date]': 1,
            '[object Error]': 1,
            '[object CanvasGradient]': 1
        };

        /**
         * 对一个object进行深度拷贝
         *
         * @param {Any} source 需要进行拷贝的对象
         * @return {Any} 拷贝后的新对象
         */
        function clone(source) {
            if (typeof source == 'object' && source !== null) {
                var result = source;
                if (source instanceof Array) {
                    result = [];
                    for (var i = 0, len = source.length; i < len; i++) {
                        result[i] = clone(source[i]);
                    }
                }
                else if (!BUILTIN_OBJECT[Object.prototype.toString.call(source)]) {
                    result = {};
                    for (var key in source) {
                        if (source.hasOwnProperty(key)) {
                            result[key] = clone(source[key]);
                        }
                    }
                }

                return result;
            }

            return source;
        }

        function mergeItem(target, source, key, overwrite) {
            if (source.hasOwnProperty(key)) {
                if (typeof target[key] == 'object'
                    && !BUILTIN_OBJECT[ Object.prototype.toString.call(target[key]) ]
                ) {
                    // 如果需要递归覆盖，就递归调用merge
                    merge(
                        target[key],
                        source[key],
                        overwrite
                    );
                }
                else if (overwrite || !(key in target)) {
                    // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
                    target[key] = source[key];
                }
            }
        }

        /**
         * 合并源对象的属性到目标对象
         * modify from Tangram
         * @param {*} target 目标对象
         * @param {*} source 源对象
         * @param {boolean} overwrite 是否覆盖
         */
        function merge(target, source, overwrite) {
            for (var i in source) {
                mergeItem(target, source, i, overwrite);
            }
            
            return target;
        }

        var _ctx;

        function getContext() {
            if (!_ctx) {
                require('../dep/excanvas');
                /* jshint ignore:start */
                if (G_vmlCanvasManager) {
                    var _div = document.createElement('div');
                    _div.style.position = 'absolute';
                    _div.style.top = '-1000px';
                    document.body.appendChild(_div);

                    _ctx = G_vmlCanvasManager.initElement(_div)
                               .getContext('2d');
                }
                else {
                    _ctx = document.createElement('canvas').getContext('2d');
                }
                /* jshint ignore:end */
            }
            return _ctx;
        }

        var _canvas;
        var _pixelCtx;
        var _width;
        var _height;
        var _offsetX = 0;
        var _offsetY = 0;

        /**
         * 获取像素拾取专用的上下文
         * @return {Object} 上下文
         */
        function getPixelContext() {
            if (!_pixelCtx) {
                _canvas = document.createElement('canvas');
                _width = _canvas.width;
                _height = _canvas.height;
                _pixelCtx = _canvas.getContext('2d');
            }
            return _pixelCtx;
        }

        /**
         * 如果坐标处在_canvas外部，改变_canvas的大小
         * @param {number} x : 横坐标
         * @param {number} y : 纵坐标
         * 注意 修改canvas的大小 需要重新设置translate
         */
        function adjustCanvasSize(x, y) {
            // 每次加的长度
            var _v = 100;
            var _flag;

            if (x + _offsetX > _width) {
                _width = x + _offsetX + _v;
                _canvas.width = _width;
                _flag = true;
            }

            if (y + _offsetY > _height) {
                _height = y + _offsetY + _v;
                _canvas.height = _height;
                _flag = true;
            }

            if (x < -_offsetX) {
                _offsetX = Math.ceil(-x / _v) * _v;
                _width += _offsetX;
                _canvas.width = _width;
                _flag = true;
            }

            if (y < -_offsetY) {
                _offsetY = Math.ceil(-y / _v) * _v;
                _height += _offsetY;
                _canvas.height = _height;
                _flag = true;
            }

            if (_flag) {
                _pixelCtx.translate(_offsetX, _offsetY);
            }
        }

        /**
         * 获取像素canvas的偏移量
         * @return {Object} 偏移量
         */
        function getPixelOffset() {
            return {
                x : _offsetX,
                y : _offsetY
            };
        }

        /**
         * 查询数组中元素的index
         */
        function indexOf(array, value) {
            if (array.indexOf) {
                return array.indexOf(value);
            }
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * 构造类继承关系
         * 
         * @param {Function} clazz 源类
         * @param {Function} baseClazz 基类
         */
        function inherits(clazz, baseClazz) {
            var clazzPrototype = clazz.prototype;
            function F() {}
            F.prototype = baseClazz.prototype;
            clazz.prototype = new F();

            for (var prop in clazzPrototype) {
                clazz.prototype[prop] = clazzPrototype[prop];
            }
            clazz.constructor = clazz;
        }

        return {
            inherits: inherits,
            clone : clone,
            merge : merge,
            getContext : getContext,
            getPixelContext : getPixelContext,
            getPixelOffset : getPixelOffset,
            adjustCanvasSize : adjustCanvasSize,
            indexOf : indexOf
        };
    }
);

define('zrender/config',[],function () {
    /**
     * config默认配置项
     * @exports zrender/config
     * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
     */
    var config = {
        /**
         * @namespace module:zrender/config.EVENT
         */
        EVENT : {
            /**
             * 窗口大小变化
             * @type {string}
             */
            RESIZE : 'resize',
            /**
             * 鼠标按钮被（手指）按下，事件对象是：目标图形元素或空
             * @type {string}
             */
            CLICK : 'click',
            /**
             * 双击事件
             * @type {string}
             */
            DBLCLICK : 'dblclick',
            /**
             * 鼠标滚轮变化，事件对象是：目标图形元素或空
             * @type {string}
             */
            MOUSEWHEEL : 'mousewheel',
            /**
             * 鼠标（手指）被移动，事件对象是：目标图形元素或空
             * @type {string}
             */
            MOUSEMOVE : 'mousemove',
            /**
             * 鼠标移到某图形元素之上，事件对象是：目标图形元素
             * @type {string}
             */
            MOUSEOVER : 'mouseover',
            /**
             * 鼠标从某图形元素移开，事件对象是：目标图形元素
             * @type {string}
             */
            MOUSEOUT : 'mouseout',
            /**
             * 鼠标按钮（手指）被按下，事件对象是：目标图形元素或空
             * @type {string}
             */
            MOUSEDOWN : 'mousedown',
            /**
             * 鼠标按键（手指）被松开，事件对象是：目标图形元素或空
             * @type {string}
             */
            MOUSEUP : 'mouseup',
            /**
             * 全局离开，MOUSEOUT触发比较频繁，一次离开优化绑定
             * @type {string}
             */
            GLOBALOUT : 'globalout',    // 

            // 一次成功元素拖拽的行为事件过程是：
            // dragstart > dragenter > dragover [> dragleave] > drop > dragend
            /**
             * 开始拖拽时触发，事件对象是：被拖拽图形元素
             * @type {string}
             */
            DRAGSTART : 'dragstart',
            /**
             * 拖拽完毕时触发（在drop之后触发），事件对象是：被拖拽图形元素
             * @type {string}
             */
            DRAGEND : 'dragend',
            /**
             * 拖拽图形元素进入目标图形元素时触发，事件对象是：目标图形元素
             * @type {string}
             */
            DRAGENTER : 'dragenter',
            /**
             * 拖拽图形元素在目标图形元素上移动时触发，事件对象是：目标图形元素
             * @type {string}
             */
            DRAGOVER : 'dragover',
            /**
             * 拖拽图形元素离开目标图形元素时触发，事件对象是：目标图形元素
             * @type {string}
             */
            DRAGLEAVE : 'dragleave',
            /**
             * 拖拽图形元素放在目标图形元素内时触发，事件对象是：目标图形元素
             * @type {string}
             */
            DROP : 'drop',
            /**
             * touch end - start < delay is click
             * @type {number}
             */
            touchClickDelay : 300
        },

        // 是否异常捕获
        catchBrushException: false,

        /**
         * debug日志选项：catchBrushException为true下有效
         * 0 : 不生成debug数据，发布用
         * 1 : 异常抛出，调试用
         * 2 : 控制台输出，调试用
         */
        debugMode: 0
    };
    return config;
});


define(
    'zrender/tool/log',['require','../config'],function (require) {
        var config = require('../config');

        /**
         * @exports zrender/tool/log
         * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
         */
        return function() {
            if (config.debugMode === 0) {
                return;
            }
            else if (config.debugMode == 1) {
                for (var k in arguments) {
                    throw new Error(arguments[k]);
                }
            }
            else if (config.debugMode > 1) {
                for (var k in arguments) {
                    console.log(arguments[k]);
                }
            }
        };

        /* for debug
        return function(mes) {
            document.getElementById('wrong-message').innerHTML =
                mes + ' ' + (new Date() - 0)
                + '<br/>' 
                + document.getElementById('wrong-message').innerHTML;
        };
        */
    }
);

/**
 * zrender: 生成唯一id
 *
 * @author errorrik (errorrik@gmail.com)
 */

define(
    'zrender/tool/guid',[],function() {
        var idStart = 0x0907;

        return function () {
            return 'zrender__' + (idStart++);
        };
    }
);

/**
 * echarts设备环境识别
 *
 * @desc echarts基于Canvas，纯Javascript图表库，提供直观，生动，可交互，可个性化定制的数据统计图表。
 * @author firede[firede@firede.us]
 * @desc thanks zepto.
 */
define('zrender/tool/env',[],function() {
    // Zepto.js
    // (c) 2010-2013 Thomas Fuchs
    // Zepto.js may be freely distributed under the MIT license.

    function detect(ua) {
        var os = this.os = {};
        var browser = this.browser = {};
        var webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/);
        var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
        var webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/);
        var touchpad = webos && ua.match(/TouchPad/);
        var kindle = ua.match(/Kindle\/([\d.]+)/);
        var silk = ua.match(/Silk\/([\d._]+)/);
        var blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/);
        var bb10 = ua.match(/(BB10).*Version\/([\d.]+)/);
        var rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/);
        var playbook = ua.match(/PlayBook/);
        var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
        var firefox = ua.match(/Firefox\/([\d.]+)/);
        var ie = ua.match(/MSIE ([\d.]+)/);
        var safari = webkit && ua.match(/Mobile\//) && !chrome;
        var webview = ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !chrome;
        var ie = ua.match(/MSIE\s([\d.]+)/);

        // Todo: clean this up with a better OS/browser seperation:
        // - discern (more) between multiple browsers on android
        // - decide if kindle fire in silk mode is android or not
        // - Firefox on Android doesn't specify the Android version
        // - possibly devide in os, device and browser hashes

        if (browser.webkit = !!webkit) browser.version = webkit[1];

        if (android) os.android = true, os.version = android[2];
        if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.');
        if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.');
        if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        if (webos) os.webos = true, os.version = webos[2];
        if (touchpad) os.touchpad = true;
        if (blackberry) os.blackberry = true, os.version = blackberry[2];
        if (bb10) os.bb10 = true, os.version = bb10[2];
        if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2];
        if (playbook) browser.playbook = true;
        if (kindle) os.kindle = true, os.version = kindle[1];
        if (silk) browser.silk = true, browser.version = silk[1];
        if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
        if (chrome) browser.chrome = true, browser.version = chrome[1];
        if (firefox) browser.firefox = true, browser.version = firefox[1];
        if (ie) browser.ie = true, browser.version = ie[1];
        if (safari && (ua.match(/Safari/) || !!os.ios)) browser.safari = true;
        if (webview) browser.webview = true;
        if (ie) browser.ie = true, browser.version = ie[1];

        os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
            (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)));
        os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
            (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
            (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))));

        return {
            browser: browser,
            os: os,
            // 原生canvas支持
            canvasSupported : document.createElement('canvas').getContext 
                              ? true : false 
        };
    }

    return detect(navigator.userAgent);
});
define(
    'zrender/tool/matrix',[],function () {

        var ArrayCtor = typeof Float32Array === 'undefined'
            ? Array
            : Float32Array;
        /**
         * 3x2矩阵操作类
         * @exports zrender/tool/matrix
         */
        var matrix = {
            /**
             * 创建一个单位矩阵
             * @return {Float32Array|Array.<number>}
             */
            create : function() {
                var out = new ArrayCtor(6);
                matrix.identity(out);
                
                return out;
            },
            /**
             * 设置矩阵为单位矩阵
             * @param {Float32Array|Array.<number>} out
             */
            identity : function(out) {
                out[0] = 1;
                out[1] = 0;
                out[2] = 0;
                out[3] = 1;
                out[4] = 0;
                out[5] = 0;
                return out;
            },
            /**
             * 复制矩阵
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} m
             */
            copy: function(out, m) {
                out[0] = m[0];
                out[1] = m[1];
                out[2] = m[2];
                out[3] = m[3];
                out[4] = m[4];
                out[5] = m[5];
                return out;
            },
            /**
             * 矩阵相乘
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} m1
             * @param {Float32Array|Array.<number>} m2
             */
            mul : function (out, m1, m2) {
                out[0] = m1[0] * m2[0] + m1[2] * m2[1];
                out[1] = m1[1] * m2[0] + m1[3] * m2[1];
                out[2] = m1[0] * m2[2] + m1[2] * m2[3];
                out[3] = m1[1] * m2[2] + m1[3] * m2[3];
                out[4] = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
                out[5] = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
                return out;
            },
            /**
             * 平移变换
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} a
             * @param {Float32Array|Array.<number>} v
             */
            translate : function(out, a, v) {
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[4] = a[4] + v[0];
                out[5] = a[5] + v[1];
                return out;
            },
            /**
             * 旋转变换
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} a
             * @param {number} rad
             */
            rotate : function(out, a, rad) {
                var aa = a[0];
                var ac = a[2];
                var atx = a[4];
                var ab = a[1];
                var ad = a[3];
                var aty = a[5];
                var st = Math.sin(rad);
                var ct = Math.cos(rad);

                out[0] = aa * ct + ab * st;
                out[1] = -aa * st + ab * ct;
                out[2] = ac * ct + ad * st;
                out[3] = -ac * st + ct * ad;
                out[4] = ct * atx + st * aty;
                out[5] = ct * aty - st * atx;
                return out;
            },
            /**
             * 缩放变换
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} a
             * @param {Float32Array|Array.<number>} v
             */
            scale : function(out, a, v) {
                var vx = v[0];
                var vy = v[1];
                out[0] = a[0] * vx;
                out[1] = a[1] * vy;
                out[2] = a[2] * vx;
                out[3] = a[3] * vy;
                out[4] = a[4] * vx;
                out[5] = a[5] * vy;
                return out;
            },
            /**
             * 求逆矩阵
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} a
             */
            invert : function(out, a) {
            
                var aa = a[0];
                var ac = a[2];
                var atx = a[4];
                var ab = a[1];
                var ad = a[3];
                var aty = a[5];

                var det = aa * ad - ab * ac;
                if (!det) {
                    return null;
                }
                det = 1.0 / det;

                out[0] = ad * det;
                out[1] = -ab * det;
                out[2] = -ac * det;
                out[3] = aa * det;
                out[4] = (ac * aty - ad * atx) * det;
                out[5] = (ab * atx - aa * aty) * det;
                return out;
            },

            /**
             * 矩阵左乘向量
             * @param {Float32Array|Array.<number>} out
             * @param {Float32Array|Array.<number>} a
             * @param {Float32Array|Array.<number>} v
             */
            mulVector : function(out, a, v) {
                var aa = a[0];
                var ac = a[2];
                var atx = a[4];
                var ab = a[1];
                var ad = a[3];
                var aty = a[5];

                out[0] = v[0] * aa + v[1] * ac + atx;
                out[1] = v[0] * ab + v[1] * ad + aty;

                return out;
            }
        };

        return matrix;
    }
);

/**
 * Handler控制模块
 * @module zrender/Handler
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *         errorrik (errorrik@gmail.com)
 */

define(
    'zrender/Handler',['require','./config','./tool/env','./tool/event','./tool/util','./tool/vector','./tool/matrix','./mixin/Eventful'],function (require) {

        'use strict';

        var config = require('./config');
        var env = require('./tool/env');
        var eventTool = require('./tool/event');
        var util = require('./tool/util');
        var vec2 = require('./tool/vector');
        var mat2d = require('./tool/matrix');
        var EVENT = config.EVENT;

        var Eventful = require('./mixin/Eventful');

        var domHandlerNames = [
            'resize', 'click', 'dblclick',
            'mousewheel', 'mousemove', 'mouseout', 'mouseup', 'mousedown',
            'touchstart', 'touchend', 'touchmove'
        ];

        var domHandlers = {
            /**
             * 窗口大小改变响应函数
             * @inner
             * @param {Event} event
             */
            resize: function (event) {
                event = event || window.event;
                this._lastHover = null;
                this._isMouseDown = 0;
                
                // 分发config.EVENT.RESIZE事件，global
                this.dispatch(EVENT.RESIZE, event);
            },

            /**
             * 点击响应函数
             * @inner
             * @param {Event} event
             */
            click: function (event) {
                event = this._zrenderEventFixed(event);

                // 分发config.EVENT.CLICK事件
                var _lastHover = this._lastHover;
                if ((_lastHover && _lastHover.clickable)
                    || !_lastHover
                ) {
                    this._dispatchAgency(_lastHover, EVENT.CLICK, event);
                }

                this._mousemoveHandler(event);
            },
            
            /**
             * 双击响应函数
             * @inner
             * @param {Event} event
             */
            dblclick: function (event) {
                event = this._zrenderEventFixed(event);

                // 分发config.EVENT.DBLCLICK事件
                var _lastHover = this._lastHover;
                if ((_lastHover && _lastHover.clickable)
                    || !_lastHover
                ) {
                    this._dispatchAgency(_lastHover, EVENT.DBLCLICK, event);
                }

                this._mousemoveHandler(event);
            },
            

            /**
             * 鼠标滚轮响应函数
             * @inner
             * @param {Event} event
             */
            mousewheel: function (event) {
                event = this._zrenderEventFixed(event);

                // http://www.sitepoint.com/html5-javascript-mouse-wheel/
                // https://developer.mozilla.org/en-US/docs/DOM/DOM_event_reference/mousewheel
                var delta = event.wheelDelta // Webkit
                            || -event.detail; // Firefox
                var scale = delta > 0 ? 1.1 : 1 / 1.1;

                var layers = this.painter.getLayers();

                var needsRefresh = false;
                for (var z in layers) {
                    if (z !== 'hover') {
                        var layer = layers[z];
                        var pos = layer.position;
                        if (layer.zoomable) {
                            layer.__zoom = layer.__zoom || 1;
                            var newZoom = layer.__zoom;
                            newZoom *= scale;
                            newZoom = Math.max(
                                Math.min(layer.maxZoom, newZoom),
                                layer.minZoom
                            );
                            scale = newZoom / layer.__zoom;
                            layer.__zoom = newZoom;
                            // Keep the mouse center when scaling
                            pos[0] -= (this._mouseX - pos[0]) * (scale - 1);
                            pos[1] -= (this._mouseY - pos[1]) * (scale - 1);
                            layer.scale[0] *= scale;
                            layer.scale[1] *= scale;
                            layer.dirty = true;
                            needsRefresh = true;
                        }
                    }
                }
                if (needsRefresh) {
                    this.painter.refresh();
                }

                // 分发config.EVENT.MOUSEWHEEL事件
                this._dispatchAgency(this._lastHover, EVENT.MOUSEWHEEL, event);
                this._mousemoveHandler(event);
            },

            /**
             * 鼠标（手指）移动响应函数
             * @inner
             * @param {Event} event
             */
            mousemove: function (event) {
                if (this.painter.isLoading()) {
                    return;
                }

                event = this._zrenderEventFixed(event);
                this._lastX = this._mouseX;
                this._lastY = this._mouseY;
                this._mouseX = eventTool.getX(event);
                this._mouseY = eventTool.getY(event);
                var dx = this._mouseX - this._lastX;
                var dy = this._mouseY - this._lastY;

                // 可能出现config.EVENT.DRAGSTART事件
                // 避免手抖点击误认为拖拽
                // if (this._mouseX - this._lastX > 1 || this._mouseY - this._lastY > 1) {
                this._processDragStart(event);
                // }
                this._hasfound = 0;
                this._event = event;

                this._iterateAndFindHover();

                // 找到的在迭代函数里做了处理，没找到得在迭代完后处理
                if (!this._hasfound) {
                    // 过滤首次拖拽产生的mouseout和dragLeave
                    if (!this._draggingTarget
                        || (this._lastHover && this._lastHover != this._draggingTarget)
                    ) {
                        // 可能出现config.EVENT.MOUSEOUT事件
                        this._processOutShape(event);

                        // 可能出现config.EVENT.DRAGLEAVE事件
                        this._processDragLeave(event);
                    }

                    this._lastHover = null;
                    this.storage.delHover();
                    this.painter.clearHover();
                }

                // set cursor for root element
                var cursor = 'default';

                // 如果存在拖拽中元素，被拖拽的图形元素最后addHover
                if (this._draggingTarget) {
                    this.storage.drift(this._draggingTarget.id, dx, dy);
                    this.storage.addHover(this._draggingTarget);
                }
                else if (this._isMouseDown) {
                    // Layer dragging
                    var layers = this.painter.getLayers();

                    var needsRefresh = false;
                    for (var z in layers) {
                        if (z !== 'hover') {
                            var layer = layers[z];
                            if (layer.panable) {
                                // PENDING
                                cursor = 'move';
                                // Keep the mouse center when scaling
                                layer.position[0] += dx;
                                layer.position[1] += dy;
                                needsRefresh = true;
                                layer.dirty = true;
                            }
                        }
                    }
                    if (needsRefresh) {
                        this.painter.refresh();
                    }
                }

                if (this._draggingTarget || (this._hasfound && this._lastHover.draggable)) {
                    cursor = 'move';
                }
                else if (this._hasfound && this._lastHover.clickable) {
                    cursor = 'pointer';
                }
                this.root.style.cursor = cursor;

                // 分发config.EVENT.MOUSEMOVE事件
                this._dispatchAgency(this._lastHover, EVENT.MOUSEMOVE, event);

                if (this._draggingTarget || this._hasfound || this.storage.hasHoverShape()) {
                    this.painter.refreshHover();
                }
            },

            /**
             * 鼠标（手指）离开响应函数
             * @inner
             * @param {Event} event
             */
            mouseout: function (event) {
                event = this._zrenderEventFixed(event);

                var element = event.toElement || event.relatedTarget;
                if (element != this.root) {
                    while (element && element.nodeType != 9) {
                        // 忽略包含在root中的dom引起的mouseOut
                        if (element == this.root) {
                            this._mousemoveHandler(event);
                            return;
                        }

                        element = element.parentNode;
                    }
                }

                event.zrenderX = this._lastX;
                event.zrenderY = this._lastY;
                this.root.style.cursor = 'default';
                this._isMouseDown = 0;

                this._processOutShape(event);
                this._processDrop(event);
                this._processDragEnd(event);
                if (!this.painter.isLoading()) {
                    this.painter.refreshHover();
                }
                
                this.dispatch(EVENT.GLOBALOUT, event);
            },

            /**
             * 鼠标（手指）按下响应函数
             * @inner
             * @param {Event} event
             */
            mousedown: function (event) {
                if (this._lastDownButton == 2) {
                    this._lastDownButton = event.button;
                    this._mouseDownTarget = null;
                    // 仅作为关闭右键菜单使用
                    return;
                }

                this._lastMouseDownMoment = new Date();
                event = this._zrenderEventFixed(event);
                this._isMouseDown = 1;

                // 分发config.EVENT.MOUSEDOWN事件
                this._mouseDownTarget = this._lastHover;
                this._dispatchAgency(this._lastHover, EVENT.MOUSEDOWN, event);
                this._lastDownButton = event.button;
            },

            /**
             * 鼠标（手指）抬起响应函数
             * @inner
             * @param {Event} event
             */
            mouseup: function (event) {
                event = this._zrenderEventFixed(event);
                this.root.style.cursor = 'default';
                this._isMouseDown = 0;
                this._mouseDownTarget = null;

                // 分发config.EVENT.MOUSEUP事件
                this._dispatchAgency(this._lastHover, EVENT.MOUSEUP, event);
                this._processDrop(event);
                this._processDragEnd(event);
            },

            /**
             * Touch开始响应函数
             * @inner
             * @param {Event} event
             */
            touchstart: function (event) {
                // eventTool.stop(event);// 阻止浏览器默认事件，重要
                event = this._zrenderEventFixed(event, true);
                this._lastTouchMoment = new Date();

                // 平板补充一次findHover
                this._mobildFindFixed(event);
                this._mousedownHandler(event);
            },

            /**
             * Touch移动响应函数
             * @inner
             * @param {Event} event
             */
            touchmove: function (event) {
                event = this._zrenderEventFixed(event, true);
                this._mousemoveHandler(event);
                if (this._isDragging) {
                    eventTool.stop(event);// 阻止浏览器默认事件，重要
                }
            },

            /**
             * Touch结束响应函数
             * @inner
             * @param {Event} event
             */
            touchend: function (event) {
                // eventTool.stop(event);// 阻止浏览器默认事件，重要
                event = this._zrenderEventFixed(event, true);
                this._mouseupHandler(event);
                
                var now = new Date();
                if (now - this._lastTouchMoment < EVENT.touchClickDelay) {
                    this._mobildFindFixed(event);
                    this._clickHandler(event);
                    if (now - this._lastClickMoment < EVENT.touchClickDelay / 2) {
                        this._dblclickHandler(event);
                        if (this._lastHover && this._lastHover.clickable) {
                            eventTool.stop(event);// 阻止浏览器默认事件，重要
                        }
                    }
                    this._lastClickMoment = now;
                }
                this.painter.clearHover();
            }
        };

        /**
         * bind一个参数的function
         * 
         * @inner
         * @param {Function} handler 要bind的function
         * @param {Object} context 运行时this环境
         * @return {Function}
         */
        function bind1Arg(handler, context) {
            return function (e) {
                return handler.call(context, e);
            };
        }
        /**function bind2Arg(handler, context) {
            return function (arg1, arg2) {
                return handler.call(context, arg1, arg2);
            };
        }*/

        function bind3Arg(handler, context) {
            return function (arg1, arg2, arg3) {
                return handler.call(context, arg1, arg2, arg3);
            };
        }
        /**
         * 为控制类实例初始化dom 事件处理函数
         * 
         * @inner
         * @param {module:zrender/Handler} instance 控制类实例
         */
        function initDomHandler(instance) {
            var len = domHandlerNames.length;
            while (len--) {
                var name = domHandlerNames[len];
                instance['_' + name + 'Handler'] = bind1Arg(domHandlers[name], instance);
            }
        }

        /**
         * @alias module:zrender/Handler
         * @constructor
         * @extends module:zrender/mixin/Eventful
         * @param {HTMLElement} root 绘图区域
         * @param {module:zrender/Storage} storage Storage实例
         * @param {module:zrender/Painter} painter Painter实例
         */
        var Handler = function(root, storage, painter) {
            // 添加事件分发器特性
            Eventful.call(this);

            this.root = root;
            this.storage = storage;
            this.painter = painter;

            // 各种事件标识的私有变量
            // this._hasfound = false;              //是否找到hover图形元素
            // this._lastHover = null;              //最后一个hover图形元素
            // this._mouseDownTarget = null;
            // this._draggingTarget = null;         //当前被拖拽的图形元素
            // this._isMouseDown = false;
            // this._isDragging = false;
            // this._lastMouseDownMoment;
            // this._lastTouchMoment;
            // this._lastDownButton;

            this._lastX = 
            this._lastY = 
            this._mouseX = 
            this._mouseY = 0;

            this._findHover = bind3Arg(findHover, this);
            this._domHover = painter.getDomHover();
            initDomHandler(this);

            // 初始化，事件绑定，支持的所有事件都由如下原生事件计算得来
            if (window.addEventListener) {
                window.addEventListener('resize', this._resizeHandler);
                
                if (env.os.tablet || env.os.phone) {
                    // mobile支持
                    root.addEventListener('touchstart', this._touchstartHandler);
                    root.addEventListener('touchmove', this._touchmoveHandler);
                    root.addEventListener('touchend', this._touchendHandler);
                }
                else {
                    // mobile的click/move/up/down自己模拟
                    root.addEventListener('click', this._clickHandler);
                    root.addEventListener('dblclick', this._dblclickHandler);
                    root.addEventListener('mousewheel', this._mousewheelHandler);
                    root.addEventListener('mousemove', this._mousemoveHandler);
                    root.addEventListener('mousedown', this._mousedownHandler);
                    root.addEventListener('mouseup', this._mouseupHandler);
                } 
                root.addEventListener('DOMMouseScroll', this._mousewheelHandler);
                root.addEventListener('mouseout', this._mouseoutHandler);
            }
            else {
                window.attachEvent('onresize', this._resizeHandler);

                root.attachEvent('onclick', this._clickHandler);
                root.attachEvent('ondblclick ', this._dblclickHandler);
                root.attachEvent('onmousewheel', this._mousewheelHandler);
                root.attachEvent('onmousemove', this._mousemoveHandler);
                root.attachEvent('onmouseout', this._mouseoutHandler);
                root.attachEvent('onmousedown', this._mousedownHandler);
                root.attachEvent('onmouseup', this._mouseupHandler);
            }
        };

        /**
         * 自定义事件绑定
         * @param {string} eventName 事件名称，resize，hover，drag，etc~
         * @param {Function} handler 响应函数
         */
        Handler.prototype.on = function (eventName, handler) {
            this.bind(eventName, handler);
            return this;
        };

        /**
         * 自定义事件解绑
         * @param {string} eventName 事件名称，resize，hover，drag，etc~
         * @param {Function} handler 响应函数
         */
        Handler.prototype.un = function (eventName, handler) {
            this.unbind(eventName, handler);
            return this;
        };

        /**
         * 事件触发
         * @param {string} eventName 事件名称，resize，hover，drag，etc~
         * @param {event=} eventArgs event dom事件对象
         */
        Handler.prototype.trigger = function (eventName, eventArgs) {
            switch (eventName) {
                case EVENT.RESIZE:
                case EVENT.CLICK:
                case EVENT.DBLCLICK:
                case EVENT.MOUSEWHEEL:
                case EVENT.MOUSEMOVE:
                case EVENT.MOUSEDOWN:
                case EVENT.MOUSEUP:
                case EVENT.MOUSEOUT:
                    this['_' + eventName + 'Handler'](eventArgs);
                    break;
            }
        };

        /**
         * 释放，解绑所有事件
         */
        Handler.prototype.dispose = function () {
            var root = this.root;

            if (window.removeEventListener) {
                window.removeEventListener('resize', this._resizeHandler);

                if (env.os.tablet || env.os.phone) {
                    // mobile支持
                    root.removeEventListener('touchstart', this._touchstartHandler);
                    root.removeEventListener('touchmove', this._touchmoveHandler);
                    root.removeEventListener('touchend', this._touchendHandler);
                }
                else {
                    // mobile的click自己模拟
                    root.removeEventListener('click', this._clickHandler);
                    root.removeEventListener('dblclick', this._dblclickHandler);
                    root.removeEventListener('mousewheel', this._mousewheelHandler);
                    root.removeEventListener('mousemove', this._mousemoveHandler);
                    root.removeEventListener('mousedown', this._mousedownHandler);
                    root.removeEventListener('mouseup', this._mouseupHandler);
                }
                root.removeEventListener('DOMMouseScroll', this._mousewheelHandler);
                root.removeEventListener('mouseout', this._mouseoutHandler);
            }
            else {
                window.detachEvent('onresize', this._resizeHandler);

                root.detachEvent('onclick', this._clickHandler);
                root.detachEvent('dblclick', this._dblclickHandler);
                root.detachEvent('onmousewheel', this._mousewheelHandler);
                root.detachEvent('onmousemove', this._mousemoveHandler);
                root.detachEvent('onmouseout', this._mouseoutHandler);
                root.detachEvent('onmousedown', this._mousedownHandler);
                root.detachEvent('onmouseup', this._mouseupHandler);
            }

            this.root =
            this._domHover =
            this.storage =
            this.painter = null;
            
            this.un();
        };

        /**
         * 拖拽开始
         * 
         * @private
         * @param {Object} event 事件对象
         */
        Handler.prototype._processDragStart = function (event) {
            var _lastHover = this._lastHover;

            if (this._isMouseDown
                && _lastHover
                && _lastHover.draggable
                && !this._draggingTarget
                && this._mouseDownTarget == _lastHover
            ) {
                // 拖拽点击生效时长阀门，某些场景需要降低拖拽敏感度
                if (_lastHover.dragEnableTime && 
                    new Date() - this._lastMouseDownMoment < _lastHover.dragEnableTime
                ) {
                    return;
                }

                var _draggingTarget = _lastHover;
                this._draggingTarget = _draggingTarget;
                this._isDragging = 1;

                _draggingTarget.invisible = true;
                this.storage.mod(_draggingTarget.id);

                // 分发config.EVENT.DRAGSTART事件
                this._dispatchAgency(
                    _draggingTarget,
                    EVENT.DRAGSTART,
                    event
                );
                this.painter.refresh();
            }
        };

        /**
         * 拖拽进入目标元素
         * 
         * @private
         * @param {Object} event 事件对象
         */
        Handler.prototype._processDragEnter = function (event) {
            if (this._draggingTarget) {
                // 分发config.EVENT.DRAGENTER事件
                this._dispatchAgency(
                    this._lastHover,
                    EVENT.DRAGENTER,
                    event,
                    this._draggingTarget
                );
            }
        };

        /**
         * 拖拽在目标元素上移动
         * 
         * @private
         * @param {Object} event 事件对象
         */
        Handler.prototype._processDragOver = function (event) {
            if (this._draggingTarget) {
                // 分发config.EVENT.DRAGOVER事件
                this._dispatchAgency(
                    this._lastHover,
                    EVENT.DRAGOVER,
                    event,
                    this._draggingTarget
                );
            }
        };

        /**
         * 拖拽离开目标元素
         * 
         * @private
         * @param {Object} event 事件对象
         */
        Handler.prototype._processDragLeave = function (event) {
            if (this._draggingTarget) {
                // 分发config.EVENT.DRAGLEAVE事件
                this._dispatchAgency(
                    this._lastHover,
                    EVENT.DRAGLEAVE,
                    event,
                    this._draggingTarget
                );
            }
        };

        /**
         * 拖拽在目标元素上完成
         * 
         * @private
         * @param {Object} event 事件对象
         */
        Handler.prototype._processDrop = function (event) {
            if (this._draggingTarget) {
                this._draggingTarget.invisible = false;
                this.storage.mod(this._draggingTarget.id);
                this.painter.refresh();

                // 分发config.EVENT.DROP事件
                this._dispatchAgency(
                    this._lastHover,
                    EVENT.DROP,
                    event,
                    this._draggingTarget
                );
            }
        };

        /**
         * 拖拽结束
         * 
         * @private
         * @param {Object} event 事件对象
         */
        Handler.prototype._processDragEnd = function (event) {
            if (this._draggingTarget) {
                // 分发config.EVENT.DRAGEND事件
                this._dispatchAgency(
                    this._draggingTarget,
                    EVENT.DRAGEND,
                    event
                );

                this._lastHover = null;
            }

            this._isDragging = 0;
            this._draggingTarget = null;
        };

        /**
         * 鼠标在某个图形元素上移动
         * 
         * @private
         * @param {Object} event 事件对象
         */
        Handler.prototype._processOverShape = function (event) {
            // 分发config.EVENT.MOUSEOVER事件
            this._dispatchAgency(this._lastHover, EVENT.MOUSEOVER, event);
        };

        /**
         * 鼠标离开某个图形元素
         * 
         * @private
         * @param {Object} event 事件对象
         */
        Handler.prototype._processOutShape = function (event) {
            // 分发config.EVENT.MOUSEOUT事件
            this._dispatchAgency(this._lastHover, EVENT.MOUSEOUT, event);
        };

        /**
         * 事件分发代理
         * 
         * @private
         * @param {Object} targetShape 目标图形元素
         * @param {string} eventName 事件名称
         * @param {Object} event 事件对象
         * @param {Object=} draggedShape 拖拽事件特有，当前被拖拽图形元素
         */
        Handler.prototype._dispatchAgency = function (targetShape, eventName, event, draggedShape) {
            var eventHandler = 'on' + eventName;
            var eventPacket = {
                type : eventName,
                event : event,
                target : targetShape,
                cancelBubble: false
            };

            var el = targetShape;

            if (draggedShape) {
                eventPacket.dragged = draggedShape;
            }

            while (el) {
                el[eventHandler] 
                && (eventPacket.cancelBubble = el[eventHandler](eventPacket));
                el.dispatch(eventName, eventPacket);

                el = el.parent;
                
                if (eventPacket.cancelBubble) {
                    break;
                }
            }

            if (targetShape) {
                // 冒泡到顶级 zrender 对象
                if (!eventPacket.cancelBubble) {
                    this.dispatch(eventName, eventPacket);
                }
            }
            else if (!draggedShape) {
                // 无hover目标，无拖拽对象，原生事件分发
                this.dispatch(eventName, {
                    type: eventName,
                    event: event
                });
            }
        };

        /**
         * 迭代寻找hover shape
         * @private
         * @method
         */
        Handler.prototype._iterateAndFindHover = (function() {
            var invTransform = mat2d.create();
            return function() {
                var list = this.storage.getShapeList();
                var currentZLevel;
                var currentLayer;
                var tmp = [ 0, 0 ];
                for (var i = list.length - 1; i >= 0 ; i--) {
                    var shape = list[i];

                    if (currentZLevel !== shape.zlevel) {
                        currentLayer = this.painter.getLayer(shape.zlevel, currentLayer);
                        tmp[0] = this._mouseX;
                        tmp[1] = this._mouseY;

                        if (currentLayer.needTransform) {
                            mat2d.invert(invTransform, currentLayer.transform);
                            vec2.applyTransform(tmp, tmp, invTransform);
                        }
                    }

                    if (this._findHover(shape, tmp[0], tmp[1])) {
                        break;
                    }
                }
            };
        })();
        
        // touch指尖错觉的尝试偏移量配置
        var MOBILE_TOUCH_OFFSETS = [
            { x: 10 },
            { x: -20 },
            { x: 10, y: 10 },
            { y: -20 }
        ];

        // touch有指尖错觉，四向尝试，让touch上的点击更好触发事件
        Handler.prototype._mobildFindFixed = function (event) {
            this._lastHover = null;
            this._mouseX = event.zrenderX;
            this._mouseY = event.zrenderY;

            this._event = event;

            this._iterateAndFindHover();

            for (var i = 0; !this._lastHover && i < MOBILE_TOUCH_OFFSETS.length ; i++) {
                var offset = MOBILE_TOUCH_OFFSETS[ i ];
                offset.x && (this._mouseX += offset.x);
                offset.y && (this._mouseX += offset.y);

                this._iterateAndFindHover();
            }

            if (this._lastHover) {
                event.zrenderX = this._mouseX;
                event.zrenderY = this._mouseY;
            }
        };

        /**
         * 迭代函数，查找hover到的图形元素并即时做些事件分发
         * 
         * @inner
         * @param {Object} shape 图形元素
         * @param {number} x
         * @param {number} y
         */
        function findHover(shape, x, y) {
            if (
                (this._draggingTarget && this._draggingTarget.id == shape.id) // 迭代到当前拖拽的图形上
                || shape.isSilent() // 打酱油的路过，啥都不响应的shape~
            ) {
                return false;
            }

            var event = this._event;
            if (shape.isCover(x, y)) {
                if (shape.hoverable) {
                    this.storage.addHover(shape);
                }
                // 查找是否在 clipShape 中
                var p = shape.parent;
                while (p) {
                    if (p.clipShape && !p.clipShape.isCover(this._mouseX, this._mouseY))  {
                        // 已经被祖先 clip 掉了
                        return false;
                    }
                    p = p.parent;
                }

                if (this._lastHover != shape) {
                    this._processOutShape(event);

                    // 可能出现config.EVENT.DRAGLEAVE事件
                    this._processDragLeave(event);

                    this._lastHover = shape;

                    // 可能出现config.EVENT.DRAGENTER事件
                    this._processDragEnter(event);
                }

                this._processOverShape(event);

                // 可能出现config.EVENT.DRAGOVER
                this._processDragOver(event);

                this._hasfound = 1;

                return true;    // 找到则中断迭代查找
            }

            return false;
        }

        /**
         * 如果存在第三方嵌入的一些dom触发的事件，或touch事件，需要转换一下事件坐标
         * 
         * @private
         */
        Handler.prototype._zrenderEventFixed = function (event, isTouch) {
            if (event.zrenderFixed) {
                return event;
            }

            if (!isTouch) {
                event = event || window.event;
                // 进入对象优先~
                var target = event.toElement
                              || event.relatedTarget
                              || event.srcElement
                              || event.target;

                if (target && target != this._domHover) {
                    event.zrenderX = (typeof event.offsetX != 'undefined'
                                        ? event.offsetX
                                        : event.layerX)
                                      + target.offsetLeft;
                    event.zrenderY = (typeof event.offsetY != 'undefined'
                                        ? event.offsetY
                                        : event.layerY)
                                      + target.offsetTop;
                }
            }
            else {
                var touch = event.type != 'touchend'
                                ? event.targetTouches[0]
                                : event.changedTouches[0];
                if (touch) {
                    var rBounding = this.root.getBoundingClientRect();
                    // touch事件坐标是全屏的~
                    event.zrenderX = touch.clientX - rBounding.left;
                    event.zrenderY = touch.clientY - rBounding.top;
                }
            }

            event.zrenderFixed = 1;
            return event;
        };

        util.merge(Handler.prototype, Eventful.prototype, true);

        return Handler;
    }
);

/**
 * @module zrender/tool/curve
 * @author pissang(https://www.github.com/pissang)
 */
define('zrender/tool/curve',['require','./vector'],function(require) {

    var vector = require('./vector');

    'use strict';

    var EPSILON = 1e-4;

    var THREE_SQRT = Math.sqrt(3);
    var ONE_THIRD = 1 / 3;

    // 临时变量
    var _v0 = vector.create();
    var _v1 = vector.create();
    var _v2 = vector.create();
    var _v3 = vector.create();

    function isAroundZero(val) {
        return val > -EPSILON && val < EPSILON;
    }
    function isNotAroundZero(val) {
        return val > EPSILON || val < -EPSILON;
    }

    function evalCubicCoeff(a, b, c, d, t) {
        return ((a * t + b) * t + c) * t + d;
    }

    /** 
     * 计算三次贝塞尔值
     * @memberOf module:zrender/tool/curve
     * @param  {number} p0
     * @param  {number} p1
     * @param  {number} p2
     * @param  {number} p3
     * @param  {number} t
     * @return {number}
     */
    function cubicAt(p0, p1, p2, p3, t) {
        var onet = 1 - t;
        return onet * onet * (onet * p0 + 3 * t * p1)
             + t * t * (t * p3 + 3 * onet * p2);
    }

    /** 
     * 计算三次贝塞尔导数值
     * @memberOf module:zrender/tool/curve
     * @param  {number} p0
     * @param  {number} p1
     * @param  {number} p2
     * @param  {number} p3
     * @param  {number} t
     * @return {number}
     */
    function cubicDerivativeAt(p0, p1, p2, p3, t) {
        var onet = 1 - t;
        return 3 * (
            ((p1 - p0) * onet + 2 * (p2 - p1) * t) * onet
            + (p3 - p2) * t * t
        );
    }

    /**
     * 计算三次贝塞尔方程根，使用盛金公式
     * @memberOf module:zrender/tool/curve
     * @param  {number} p0
     * @param  {number} p1
     * @param  {number} p2
     * @param  {number} p3
     * @param  {number} val
     * @param  {Array.<number>} roots
     * @return {number} 有效根数目
     */
    function cubicRootAt(p0, p1, p2, p3, val, roots) {
        // Evaluate roots of cubic functions
        var a = p3 + 3 * (p1 - p2) - p0;
        var b = 3 * (p2 - p1 * 2 + p0);
        var c = 3 * (p1  - p0);
        var d = p0 - val;

        var A = b * b - 3 * a * c;
        var B = b * c - 9 * a * d;
        var C = c * c - 3 * b * d;

        var n = 0;

        if (isAroundZero(A) && isAroundZero(B)) {
            if (isAroundZero(b)) {
                roots[0] = 0;
            }
            else {
                var t1 = -c / b;  //t1, t2, t3, b is not zero
                if (t1 >=0 && t1 <= 1) {
                    roots[n++] = t1;
                }
            }
        }
        else {
            var disc = B * B - 4 * A * C;

            if (isAroundZero(disc)) {
                var K = B / A;
                var t1 = -b / a + K;  // t1, a is not zero
                var t2 = -K / 2;  // t2, t3
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
                if (t2 >= 0 && t2 <= 1) {
                    roots[n++] = t2;
                }
            }
            else if (disc > 0) {
                var discSqrt = Math.sqrt(disc);
                var Y1 = A * b + 1.5 * a * (-B + discSqrt);
                var Y2 = A * b + 1.5 * a * (-B - discSqrt);
                if (Y1 < 0) {
                    Y1 = -Math.pow(-Y1, ONE_THIRD);
                }
                else {
                    Y1 = Math.pow(Y1, ONE_THIRD);
                }
                if (Y2 < 0) {
                    Y2 = -Math.pow(-Y2, ONE_THIRD);
                }
                else {
                    Y2 = Math.pow(Y2, ONE_THIRD);
                }
                var t1 = (-b - (Y1 + Y2)) / (3 * a);
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
            }
            else {
                var T = (2 * A * b - 3 * a * B) / (2 * Math.sqrt(A * A * A));
                var theta = Math.acos(T) / 3;
                var ASqrt = Math.sqrt(A);
                var tmp = Math.cos(theta);
                
                var t1 = (-b - 2 * ASqrt * tmp) / (3 * a);
                var t2 = (-b + ASqrt * (tmp + THREE_SQRT * Math.sin(theta))) / (3 * a);
                var t3 = (-b + ASqrt * (tmp - THREE_SQRT * Math.sin(theta))) / (3 * a);
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
                if (t2 >= 0 && t2 <= 1) {
                    roots[n++] = t2;
                }
                if (t3 >= 0 && t3 <= 1) {
                    roots[n++] = t3;
                }
            }
        }
        return n;
    }

    /**
     * 计算三次贝塞尔方程极限值的位置
     * @memberOf module:zrender/tool/curve
     * @param  {number} p0
     * @param  {number} p1
     * @param  {number} p2
     * @param  {number} p3
     * @param  {Array.<number>} extrema
     * @return {number} 有效数目
     */
    function cubicExtrema(p0, p1, p2, p3, extrema) {
        var b = 6 * p2 - 12 * p1 + 6 * p0;
        var a = 9 * p1 + 3 * p3 - 3 * p0 - 9 * p2;
        var c = 3 * p1 - 3 * p0;

        var n = 0;
        if (isAroundZero(a)) {
            if (isNotAroundZero(b)) {
                var t1 = -c / b;
                if (t1 >= 0 && t1 <=1) {
                    extrema[n++] = t1;
                }
            }
        }
        else {
            var disc = b * b - 4 * a * c;
            if (isAroundZero(disc)) {
                extrema[0] = -b / (2 * a);
            }
            else if (disc > 0) {
                var discSqrt = Math.sqrt(disc);
                var t1 = (-b + discSqrt) / (2 * a);
                var t2 = (-b - discSqrt) / (2 * a);
                if (t1 >= 0 && t1 <= 1) {
                    extrema[n++] = t1;
                }
                if (t2 >= 0 && t2 <= 1) {
                    extrema[n++] = t2;
                }
            }
        }
        return n;
    }

    /**
     * 细分三次贝塞尔曲线
     * @memberOf module:zrender/tool/curve
     * @param  {number} p0
     * @param  {number} p1
     * @param  {number} p2
     * @param  {number} p3
     * @param  {number} t
     * @param  {Array.<number>} out
     */
    function cubicSubdivide(p0, p1, p2, p3, t, out) {
        var p01 = (p1 - p0) * t + p0;
        var p12 = (p2 - p1) * t + p1;
        var p23 = (p3 - p2) * t + p2;

        var p012 = (p12 - p01) * t + p01;
        var p123 = (p23 - p12) * t + p12;

        var p0123 = (p123 - p012) * t + p012;
        // Seg0
        out[0] = p0;
        out[1] = p01;
        out[2] = p012;
        out[3] = p0123;
        // Seg1
        out[4] = p0123;
        out[5] = p123;
        out[6] = p23;
        out[7] = p3;
    }

    /**
     * 投射点到三次贝塞尔曲线上，返回投射距离。
     * 投射点有可能会有一个或者多个，这里只返回其中距离最短的一个。
     * @param {number} x0
     * @param {number} y0
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} x3
     * @param {number} y3
     * @param {number} x
     * @param {number} y
     * @param {Array.<number>} [out] 投射点
     * @return {number}
     */
    function cubicProjectPoint(
        x0, y0, x1, y1, x2, y2, x3, y3,
        x, y, out
    ) {
        // http://pomax.github.io/bezierinfo/#projections
        var t;
        var interval = 0.005;
        var d = Infinity;

        _v0[0] = x;
        _v0[1] = y;

        // 先粗略估计一下可能的最小距离的 t 值
        // PENDING
        for (var _t = 0; _t < 1; _t += 0.05) {
            _v1[0] = cubicAt(x0, x1, x2, x3, _t);
            _v1[1] = cubicAt(y0, y1, y2, y3, _t);
            var d1 = vector.distSquare(_v0, _v1);
            if (d1 < d) {
                t = _t;
                d = d1;
            }
        }
        d = Infinity;

        // At most 32 iteration
        for (var i = 0; i < 32; i++) {
            if (interval < EPSILON) {
                break;
            }
            var prev = t - interval;
            var next = t + interval;
            // t - interval
            _v1[0] = cubicAt(x0, x1, x2, x3, prev);
            _v1[1] = cubicAt(y0, y1, y2, y3, prev);

            var d1 = vector.distSquare(_v1, _v0);

            if (prev >= 0 && d1 < d) {
                t = prev;
                d = d1;
            }
            else {
                // t + interval
                _v2[0] = cubicAt(x0, x1, x2, x3, next);
                _v2[1] = cubicAt(y0, y1, y2, y3, next);
                var d2 = vector.distSquare(_v2, _v0);

                if (next <= 1 && d2 < d) {
                    t = next;
                    d = d2;
                }
                else {
                    interval *= 0.5;
                }
            }
        }
        // t
        if (out) {
            out[0] = cubicAt(x0, x1, x2, x3, t);
            out[1] = cubicAt(y0, y1, y2, y3, t);   
        }
        // console.log(interval, i);
        return Math.sqrt(d);
    }

    /**
     * 计算二次方贝塞尔值
     * @param  {number} p0
     * @param  {number} p1
     * @param  {number} p2
     * @param  {number} t
     * @return {number}
     */
    function quadraticAt(p0, p1, p2, t) {
        var onet = 1 - t;
        return onet * (onet * p0 + 2 * t * p1) + t * t * p2;
    }

    /**
     * 计算二次方贝塞尔导数值
     * @param  {number} p0
     * @param  {number} p1
     * @param  {number} p2
     * @param  {number} t
     * @return {number}
     */
    function quadraticDerivativeAt(p0, p1, p2, t) {
        return 2 * ((1 - t) * (p1 - p0) + t * (p2 - p1));
    }

    /**
     * 计算二次方贝塞尔方程根
     * @param  {number} p0
     * @param  {number} p1
     * @param  {number} p2
     * @param  {number} t
     * @param  {Array.<number>} roots
     * @return {number} 有效根数目
     */
    function quadraticRootAt(p0, p1, p2, val, roots) {
        var a = p0 - 2 * p1 + p2;
        var b = 2 * (p1 - p0);
        var c = p0 - val;

        var n = 0;
        if (isAroundZero(a)) {
            if (isNotAroundZero(b)) {
                var t1 = -c / b;
                if (t1 >= 0 && t1 <= 1) {
                    extrema[n++] = t1;
                }
            }
        }
        else {
            var disc = b * b - 4 * a * c;
            if (isAroundZero(disc)) {
                var t1 = -b / (2 * a);
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
            }
            else if (disc > 0) {
                var discSqrt = Math.sqrt(disc);
                var t1 = (-b + discSqrt) / (2 * a);
                var t2 = (-b - discSqrt) / (2 * a);
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
                if (t2 >= 0 && t2 <= 1) {
                    roots[n++] = t2;
                }
            }
        }
        return n;
    }

    /**
     * 计算二次贝塞尔方程极限值
     * @memberOf module:zrender/tool/curve
     * @param  {number} p0
     * @param  {number} p1
     * @param  {number} p2
     * @return {number}
     */
    function quadraticExtremum(p0, p1, p2) {
        var divider = p0 + p2 - 2 * p1;
        if (divider == 0) {
            // p1 is center of p0 and p2 
            return 0.5;
        }
        else {
            return (p0 - p1) / divider;
        }
    }

    /**
     * 投射点到二次贝塞尔曲线上，返回投射距离。
     * 投射点有可能会有一个或者多个，这里只返回其中距离最短的一个。
     * @param {number} x0
     * @param {number} y0
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} x
     * @param {number} y
     * @param {Array.<number>} out 投射点
     * @return {number}
     */
    function quadraticProjectPoint(
        x0, y0, x1, y1, x2, y2,
        x, y, out
    ) {
        // http://pomax.github.io/bezierinfo/#projections
        var t;
        var interval = 0.005;
        var d = Infinity;

        _v0[0] = x;
        _v0[1] = y;

        // 先粗略估计一下可能的最小距离的 t 值
        // PENDING
        for (var _t = 0; _t < 1; _t += 0.05) {
            _v1[0] = quadraticAt(x0, x1, x2, _t);
            _v1[1] = quadraticAt(y0, y1, y2, _t);
            var d1 = vector.distSquare(_v0, _v1);
            if (d1 < d) {
                t = _t;
                d = d1;
            }
        }
        d = Infinity;

        // At most 32 iteration
        for (var i = 0; i < 32; i++) {
            if (interval < EPSILON) {
                break;
            }
            var prev = t - interval;
            var next = t + interval;
            // t - interval
            _v1[0] = quadraticAt(x0, x1, x2, prev);
            _v1[1] = quadraticAt(y0, y1, y2, prev);

            var d1 = vector.distSquare(_v1, _v0);

            if (prev >= 0 && d1 < d) {
                t = prev;
                d = d1;
            }
            else {
                // t + interval
                _v2[0] = quadraticAt(x0, x1, x2, next);
                _v2[1] = quadraticAt(y0, y1, y2, next);
                var d2 = vector.distSquare(_v2, _v0);
                if (next <= 1 && d2 < d) {
                    t = next;
                    d = d2;
                }
                else {
                    interval *= 0.5;
                }
            }
        }
        // t
        if (out) {
            out[0] = quadraticAt(x0, x1, x2, t);
            out[1] = quadraticAt(y0, y1, y2, t);   
        }
        // console.log(interval, i);
        return Math.sqrt(d);
    }

    return {

        cubicAt: cubicAt,

        cubicDerivativeAt: cubicDerivativeAt,

        cubicRootAt: cubicRootAt,

        cubicExtrema: cubicExtrema,

        cubicSubdivide: cubicSubdivide,

        cubicProjectPoint: cubicProjectPoint,

        quadraticAt: quadraticAt,

        quadraticDerivativeAt: quadraticDerivativeAt,

        quadraticRootAt: quadraticRootAt,

        quadraticExtremum: quadraticExtremum,

        quadraticProjectPoint: quadraticProjectPoint
    }
});
/**
 * zrender: 图形空间辅助类
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *         pissang (https://www.github.com/pissang)
 *
 * isInside：是否在区域内部
 * isOutside：是否在区域外部
 * getTextWidth：测算单行文本宽度
 */
define(
    'zrender/tool/area',['require','./util','./curve'],function (require) {

        'use strict';

        var util = require('./util');
        var curve = require('./curve');

        var _ctx;
        
        var _textWidthCache = {};
        var _textHeightCache = {};
        var _textWidthCacheCounter = 0;
        var _textHeightCacheCounter = 0;
        var TEXT_CACHE_MAX = 5000;
            
        var PI2 = Math.PI * 2;

        function normalizeRadian(angle) {
            angle %= PI2;
            if (angle < 0) {
                angle += PI2;
            }
            return angle;
        }
        /**
         * 包含判断
         *
         * @param {Object} shape : 图形
         * @param {Object} area ： 目标区域
         * @param {number} x ： 横坐标
         * @param {number} y ： 纵坐标
         */
        function isInside(shape, area, x, y) {
            if (!area || !shape) {
                // 无参数或不支持类型
                return false;
            }
            var zoneType = shape.type;

            _ctx = _ctx || util.getContext();

            // 未实现或不可用时(excanvas不支持)则数学运算，主要是line，brokenLine，ring
            var _mathReturn = _mathMethod(zoneType, area, x, y);
            if (typeof _mathReturn != 'undefined') {
                return _mathReturn;
            }

            if (shape.buildPath && _ctx.isPointInPath) {
                return _buildPathMethod(shape, _ctx, area, x, y);
            }

            // 上面的方法都行不通时
            switch (zoneType) {
                case 'heart': // 心形---------10 // Todo，不精确
                case 'droplet':// 水滴----------11 // Todo，不精确
                case 'ellipse': // Todo，不精确
                    return true;
                // 旋轮曲线  不准确
                case 'trochoid':
                    var _r = area.location == 'out'
                            ? area.r1 + area.r2 + area.d
                            : area.r1 - area.r2 + area.d;
                    return isInsideCircle(area, x, y, _r);
                // 玫瑰线 不准确
                case 'rose' :
                    return isInsideCircle(area, x, y, area.maxr);
                // 路径，椭圆，曲线等-----------------13
                default:
                    return false;   // Todo，暂不支持
            }
        }

        /**
         * 用数学方法判断，三个方法中最快，但是支持的shape少
         *
         * @param {string} zoneType ： 图形类型
         * @param {Object} area ：目标区域
         * @param {number} x ： 横坐标
         * @param {number} y ： 纵坐标
         * @return {boolean=} true表示坐标处在图形中
         */
        function _mathMethod(zoneType, area, x, y) {
            // 在矩形内则部分图形需要进一步判断
            switch (zoneType) {
                // 贝塞尔曲线
                case 'bezier-curve':
                    if (typeof(area.cpX2) === 'undefined') {
                        return isInsideQuadraticStroke(
                            area.xStart, area.yStart,
                            area.cpX1, area.cpY1, 
                            area.xEnd, area.yEnd,
                            area.lineWidth, x, y
                        );
                    }
                    else {
                        return isInsideCubicStroke(
                            area.xStart, area.yStart,
                            area.cpX1, area.cpY1, 
                            area.cpX2, area.cpY2, 
                            area.xEnd, area.yEnd,
                            area.lineWidth, x, y
                        );
                    }
                // 线-----------------------1
                case 'line':
                    return isInsideLine(
                        area.xStart, area.yStart,
                        area.xEnd, area.yEnd,
                        area.lineWidth, x, y
                    );
                // 折线----------------------2
                case 'broken-line':
                    return isInsideBrokenLine(
                        area.pointList, area.lineWidth, x, y
                    );
                // 文本----------------------3
                case 'text':
                    return true;
                // 圆环----------------------4
                case 'ring':
                    return isInsideRing(
                        area.x, area.y, area.r0, area.r, x, y
                    );
                // 矩形----------------------5
                case 'rectangle':
                    return true;
                // 圆形----------------------6
                case 'circle':
                    return isInsideCircle(
                        area.x, area.y, area.r, x, y
                    );
                // 扇形----------------------7
                case 'sector':
                    return isInsideSector(area, x, y);
                // 多边形---------------------8
                case 'path':
                    return isInsidePath(
                        area.pathArray, Math.max(area.lineWidth, 5),
                        area.brushType, x, y
                    );
                case 'polygon':
                case 'star':
                case 'isogon':
                    return isInsidePolygon(area.pointList, x, y);
                // 图片----------------------9
                case 'image':
                    return true;
            }
        }

        /**
         * 通过buildPath方法来判断，三个方法中较快，但是不支持线条类型的shape，
         * 而且excanvas不支持isPointInPath方法
         *
         * @param {Object} shape ： shape
         * @param {Object} context : 上下文
         * @param {Object} area ：目标区域
         * @param {number} x ： 横坐标
         * @param {number} y ： 纵坐标
         * @return {boolean} true表示坐标处在图形中
         */
        function _buildPathMethod(shape, context, area, x, y) {
            // 图形类实现路径创建了则用类的path
            context.beginPath();
            shape.buildPath(context, area);
            context.closePath();
            return context.isPointInPath(x, y);
        }

        /**
         * !isInside
         */
        function isOutside(shape, area, x, y) {
            return !isInside(shape, area, x, y);
        }

        /**
         * 线段包含判断
         * @param  {number}  x0
         * @param  {number}  y0
         * @param  {number}  x1
         * @param  {number}  y1
         * @param  {number}  lineWidth
         * @param  {number}  x
         * @param  {number}  y
         * @return {boolean}
         */
        function isInsideLine(x0, y0, x1, y1, lineWidth, x, y) {
            if (lineWidth === 0) {
                return false;
            }
            var _l = Math.max(lineWidth, 5);
            var _a = 0;
            var _b = x0;
            // Quick reject
            if (
                (y > y0 + _l && y > y1 + _l)
                || (y < y0 - _l && y < y1 - _l)
                || (x > x0 + _l && x > x1 + _l)
                || (x < x0 - _l && x < x1 - _l)
            ) {
                return false;
            }

            if (x0 !== x1) {
                _a = (y0 - y1) / (x0 - x1);
                _b = (x0 * y1 - x1 * y0) / (x0 - x1) ;
            }
            else {
                return Math.abs(x - x0) <= _l / 2;
            }
            var tmp = _a * x - y + _b;
            var _s = tmp * tmp / (_a * _a + 1);
            return _s <= _l / 2 * _l / 2;
        }

        /**
         * 三次贝塞尔曲线描边包含判断
         * @param  {number}  x0
         * @param  {number}  y0
         * @param  {number}  x1
         * @param  {number}  y1
         * @param  {number}  x2
         * @param  {number}  y2
         * @param  {number}  x3
         * @param  {number}  y3
         * @param  {number}  lineWidth
         * @param  {number}  x
         * @param  {number}  y
         * @return {boolean}
         */
        function isInsideCubicStroke(
            x0, y0, x1, y1, x2, y2, x3, y3,
            lineWidth, x, y
        ) {
            if (lineWidth === 0) {
                return false;
            }
            var _l = Math.max(lineWidth, 5);
            // Quick reject
            if (
                (y > y0 + _l && y > y1 + _l && y > y2 + _l && y > y3 + _l)
                || (y < y0 - _l && y < y1 - _l && y < y2 - _l && y < y3 - _l)
                || (x > x0 + _l && x > x1 + _l && x > x2 + _l && x > x3 + _l)
                || (x < x0 - _l && x < x1 - _l && x < x2 - _l && x < x3 - _l)
            ) {
                return false;
            }
            var d =  curve.cubicProjectPoint(
                x0, y0, x1, y1, x2, y2, x3, y3,
                x, y, null
            );
            return d <= _l / 2;
        }

        /**
         * 二次贝塞尔曲线描边包含判断
         * @param  {number}  x0
         * @param  {number}  y0
         * @param  {number}  x1
         * @param  {number}  y1
         * @param  {number}  x2
         * @param  {number}  y2
         * @param  {number}  lineWidth
         * @param  {number}  x
         * @param  {number}  y
         * @return {boolean}
         */
        function isInsideQuadraticStroke(
            x0, y0, x1, y1, x2, y2,
            lineWidth, x, y
        ) {
            if (lineWidth === 0) {
                return false;
            }
            var _l = Math.max(lineWidth, 5);
            // Quick reject
            if (
                (y > y0 + _l && y > y1 + _l && y > y2 + _l)
                || (y < y0 - _l && y < y1 - _l && y < y2 - _l)
                || (x > x0 + _l && x > x1 + _l && x > x2 + _l)
                || (x < x0 - _l && x < x1 - _l && x < x2 - _l)
            ) {
                return false;
            }
            var d =  curve.quadraticProjectPoint(
                x0, y0, x1, y1, x2, y2,
                x, y, null
            );
            return d <= _l / 2;
        }

        /**
         * 圆弧描边包含判断
         * @param  {number}  cx
         * @param  {number}  cy
         * @param  {number}  r
         * @param  {number}  startAngle
         * @param  {number}  endAngle
         * @param  {boolean}  anticlockwise
         * @param  {number} lineWidth
         * @param  {number}  x
         * @param  {number}  y
         * @return {Boolean}
         */
        function isInsideArcStroke(
            cx, cy, r, startAngle, endAngle, anticlockwise,
            lineWidth, x, y
        ) {
            if (lineWidth === 0) {
                return false;
            }
            var _l = Math.max(lineWidth, 5);

            x -= cx;
            y -= cy;
            var d = Math.sqrt(x * x + y * y);
            if ((d - _l > r) || (d + _l < r)) {
                return false;
            }
            if (anticlockwise) {
                startAngle = normalizeRadian(endAngle);
                endAngle = normalizeRadian(startAngle);
            } else {
                startAngle = normalizeRadian(startAngle);
                endAngle = normalizeRadian(endAngle);
            }
            if (startAngle > endAngle) {
                endAngle += PI2;
            }
            
            var angle = Math.atan2(y, x);
            if (angle < 0) {
                angle += PI2;
            }
            return (angle >= startAngle && angle <= endAngle)
                || (angle + PI2 >= startAngle && angle + PI2 <= endAngle);
        }

        function isInsideBrokenLine(points, lineWidth, x, y) {
            var lineWidth = Math.max(lineWidth, 10);
            for (var i = 0, l = points.length - 1; i < l; i++) {
                var x0 = points[i][0];
                var y0 = points[i][1];
                var x1 = points[i + 1][0];
                var y1 = points[i + 1][1];

                if (isInsideLine(x0, y0, x1, y1, lineWidth, x, y)) {
                    return true;
                }
            }

            return false;
        }

        function isInsideRing(cx, cy, r0, r, x, y) {
            var d = (x - cx) * (x - cx) + (y - cy) * (y - cy);
            return (d < r * r) && (d > r0 * r0);
        }

        /**
         * 矩形包含判断
         */
        function isInsideRect(x0, y0, width, height, x, y) {
            return x >= x0 && x <= (x0 + width)
                && y >= y0 && y <= (y0 + height);
        }

        /**
         * 圆形包含判断
         */
        function isInsideCircle(x0, y0, r, x, y) {
            return (x - x0) * (x - x0) + (y - y0) * (y - y0)
                   < r * r;
        }

        /**
         * 扇形包含判断
         */
        function isInsideSector(area, x, y) {
            if (!isInsideRing(area.x, area.y, area.r0, area.r, x, y)) {
                // 大圆外或者小圆内直接false
                return false;
            }

            // 判断夹角
            if (Math.abs(area.endAngle - area.startAngle) >= 360) {
                // 大于360度的扇形，在环内就为true
                return true;
            }
            
            var angle = (360
                         - Math.atan2(y - area.y, x - area.x) / Math.PI
                         * 180)
                         % 360;
            var endA = (360 + area.endAngle) % 360;
            var startA = (360 + area.startAngle) % 360;
            if (endA > startA) {
                return (angle >= startA && angle <= endA);
            }

            return !(angle >= endA && angle <= startA);
        }

        /**
         * 多边形包含判断
         * 与 canvas 一样采用 non-zero winding rule
         */
        function isInsidePolygon(points, x, y) {
            var N = points.length;
            var w = 0;

            for (var i = 0, j = N - 1; i < N; i++) {
                var x0 = points[j][0];
                var y0 = points[j][1];
                var x1 = points[i][0];
                var y1 = points[i][1];
                w += windingLine(x0, y0, x1, y1, x, y);
                j = i;
            }
            return w !== 0;
        }

        function windingLine(x0, y0, x1, y1, x, y) {
            if ((y > y0 && y > y1) || (y < y0 && y < y1)) {
                return 0;
            }
            if (y1 == y0) {
                return 0;
            }
            var dir = y1 < y0 ? 1 : -1;
            var t = (y - y0) / (y1 - y0);
            var x_ = t * (x1 - x0) + x0;

            return x_ > x ? dir : 0;
        }

        // 临时数组
        var roots = [-1, -1, -1];
        var extrema = [-1, -1];

        function swapExtrema() {
            var tmp = extrema[0];
            extrema[0] = extrema[1];
            extrema[1] = tmp;
        }
        function windingCubic(x0, y0, x1, y1, x2, y2, x3, y3, x, y) {
            // Quick reject
            if (
                (y > y0 && y > y1 && y > y2 && y > y3)
                || (y < y0 && y < y1 && y < y2 && y < y3)
            ) {
                return 0;
            }
            var nRoots = curve.cubicRootAt(y0, y1, y2, y3, y, roots);
            if (nRoots === 0) {
                return 0;
            }
            else {
                var w = 0;
                var nExtrema = -1;
                var y0_, y1_;
                for (var i = 0; i < nRoots; i++) {
                    var t = roots[i];
                    var x_ = curve.cubicAt(x0, x1, x2, x3, t);
                    if (x_ < x) { // Quick reject
                        continue;
                    }
                    if (nExtrema < 0) {
                        nExtrema = curve.cubicExtrema(y0, y1, y2, y3, extrema);
                        if (extrema[1] < extrema[0] && nExtrema > 1) {
                            swapExtrema();
                        }
                        y0_ = curve.cubicAt(y0, y1, y2, y3, extrema[0]);
                        if (nExtrema > 1) {
                            y1_ = curve.cubicAt(y0, y1, y2, y3, extrema[1]);
                        }
                    }
                    if (nExtrema == 2) {
                        // 分成三段单调函数
                        if (t < extrema[0]) {
                            w += y0_ < y0 ? 1 : -1;
                        } 
                        else if (t < extrema[1]) {
                            w += y1_ < y0_ ? 1 : -1;
                        } 
                        else {
                            w += y3 < y1_ ? 1 : -1;
                        }
                    } 
                    else {
                        // 分成两段单调函数
                        if (t < extrema[0]) {
                            w += y0_ < y0 ? 1 : -1;
                        } 
                        else {
                            w += y3 < y0_ ? 1 : -1;
                        }
                    }
                }
                return w;
            }
        }

        function windingQuadratic(x0, y0, x1, y1, x2, y2, x, y) {
            // Quick reject
            if (
                (y > y0 && y > y1 && y > y2)
                || (y < y0 && y < y1 && y < y2)
            ) {
                return 0;
            }
            var nRoots = curve.quadraticRootAt(y0, y1, y2, y, roots);
            if (nRoots === 0) {
                return 0;
            } 
            else {
                var t = curve.quadraticExtremum(y0, y1, y2);
                if (t >=0 && t <= 1) {
                    var w = 0;
                    var y_ = curve.quadraticAt(y0, y1, y2, t);
                    for (var i = 0; i < nRoots; i++) {
                        var x_ = curve.quadraticAt(x0, x1, x2, roots[i]);
                        if (x_ > x) {
                            continue;
                        }
                        if (roots[i] < t) {
                            w += y_ < y0 ? 1 : -1;
                        } 
                        else {
                            w += y2 < y_ ? 1 : -1;
                        }
                    }
                    return w;
                } 
                else {
                    var x_ = curve.quadraticAt(x0, x1, x2, roots[0]);
                    if (x_ > x) {
                        return 0;
                    }
                    return y2 < y0 ? 1 : -1;
                }
            }
        }
        
        // TODO
        // Arc 旋转
        function windingArc(
            cx, cy, r, startAngle, endAngle, anticlockwise, x, y
        ) {
            y -= cy;
            if (y > r || y < -r) {
                return 0;
            }
            var tmp = Math.sqrt(r * r - y * y);
            roots[0] = -tmp;
            roots[1] = tmp;

            if (anticlockwise) {
                startAngle = normalizeRadian(endAngle);
                endAngle = normalizeRadian(startAngle);
            } else {
                startAngle = normalizeRadian(startAngle);
                endAngle = normalizeRadian(endAngle);
            }
            if (startAngle > endAngle) {
                endAngle += PI2;
            }

            var w = 0;
            for (var i = 0; i < 2; i++) {
                var x_ = roots[i];
                if (x_ + cx > x) {
                    var angle = Math.atan2(y, x_);
                    var dir = anticlockwise ? 1 : -1;
                    if (angle < 0) {
                        angle = PI2 + angle;
                    }
                    if (
                        (angle >= startAngle && angle <= endAngle)
                        || (angle + PI2 >= startAngle && angle + PI2 <= endAngle)
                    ) {
                        if (angle > Math.PI / 2 && angle < Math.PI * 1.5) {
                            dir = -dir;
                        }
                        w += dir;
                    }
                }
            }
            return w;
        }

        /**
         * 路径包含判断
         * 与 canvas 一样采用 non-zero winding rule
         */
        function isInsidePath(pathArray, lineWidth, brushType, x, y) {
            var w = 0;
            var xi = 0;
            var yi = 0;
            var x0 = 0;
            var y0 = 0;
            var beginSubpath = true;

            var hasStroke = brushType === 'stroke' || brushType === 'both';
            var hasFill = brushType === 'fill' || brushType === 'both';

            var roots = [-1, -1, -1];
            for (var i = 0; i < pathArray.length; i++) {
                var seg = pathArray[i];
                var p = seg.points;
                // Begin a new subpath
                if (beginSubpath || seg.command === 'M') {
                    if (i > 0) {
                        // Close previous subpath
                        if (hasFill) {
                            w += windingLine(xi, yi, x0, y0, x, y);
                        }
                        if (w !== 0) {
                            return true;
                        }
                    }
                    x0 = p[p.length - 2];
                    y0 = p[p.length - 1];
                    beginSubpath = false;
                }
                switch (seg.command) {
                    case 'M':
                        xi = p[0];
                        yi = p[1];
                        break;
                    case 'L':
                        if (hasStroke) {
                            if (isInsideLine(
                                xi, yi, p[0], p[1], lineWidth, x, y
                            )) {
                                return true;
                            }
                        }
                        if (hasFill) {
                            w += windingLine(xi, yi, p[0], p[1], x, y);
                        }
                        xi = p[0];
                        yi = p[1];
                        break;
                    case 'C':
                        if (hasStroke) {
                            if (isInsideCubicStroke(
                                xi, yi, p[0], p[1], p[2], p[3], p[4], p[5],
                                lineWidth, x, y
                            )) {
                                return true;
                            }
                        }
                        if (hasFill) {
                            w += windingCubic(
                                xi, yi, p[0], p[1], p[2], p[3], p[4], p[5], x, y
                            );
                        }
                        xi = p[4];
                        yi = p[5];
                        break;
                    case 'Q':
                        if (hasStroke) {
                            if (isInsideQuadraticStroke(
                                xi, yi, p[0], p[1], p[2], p[3],
                                lineWidth, x, y
                            )) {
                                return true;
                            }
                        }
                        if (hasFill) {
                            w += windingQuadratic(
                                xi, yi, p[0], p[1], p[2], p[3], x, y
                            );
                        }
                        xi = p[2];
                        yi = p[3];
                        break;
                    case 'A':
                        // TODO Arc 旋转
                        // TODO Arc 判断的开销比较大
                        var cx = p[0];
                        var cy = p[1];
                        var rx = p[2];
                        var ry = p[3];
                        var theta = p[4];
                        var dTheta = p[5];
                        var x1 = Math.cos(theta) * rx + cx;
                        var y1 = Math.sin(theta) * ry + cy;
                        w += windingLine(xi, yi, x1, y1);
                        // zr 使用scale来模拟椭圆, 这里也对x做一定的缩放
                        var _x = (x - cx) * ry / rx + cx;
                        if (hasStroke) {
                            if (isInsideArcStroke(
                                cx, cy, ry, theta, theta + dTheta, 1 - p[7],
                                lineWidth, _x, y
                            )) {
                                return true;
                            }
                        }
                        if (hasFill) {
                            w += windingArc(
                                cx, cy, ry, theta, theta + dTheta, 1 - p[7],
                                _x, y
                            );
                        }
                        xi = Math.cos(theta + dTheta) * rx + cx;
                        yi = Math.sin(theta + dTheta) * ry + cy;
                        break;
                    case 'z':
                        if (hasStroke) {
                            if (isInsideLine(
                                xi, yi, x0, y0, lineWidth, x, y
                            )) {
                                return true;
                            }
                        }
                        beginSubpath = true;
                        break;
                }
            }
            if (hasFill) {
                w += windingLine(xi, yi, x0, y0, x, y);
            }
            return w != 0;
        }

        /**
         * 测算多行文本宽度
         * @param {Object} text
         * @param {Object} textFont
         */
        function getTextWidth(text, textFont) {
            var key = text + ':' + textFont;
            if (_textWidthCache[key]) {
                return _textWidthCache[key];
            }
            _ctx = _ctx || util.getContext();
            _ctx.save();

            if (textFont) {
                _ctx.font = textFont;
            }
            
            text = (text + '').split('\n');
            var width = 0;
            for (var i = 0, l = text.length; i < l; i++) {
                width =  Math.max(
                    _ctx.measureText(text[i]).width,
                    width
                );
            }
            _ctx.restore();

            _textWidthCache[key] = width;
            if (++_textWidthCacheCounter > TEXT_CACHE_MAX) {
                // 内存释放
                _textWidthCacheCounter = 0;
                _textWidthCache = {};
            }
            
            return width;
        }
        
        /**
         * 测算多行文本高度
         * @param {Object} text
         * @param {Object} textFont
         */
        function getTextHeight(text, textFont) {
            var key = text + ':' + textFont;
            if (_textHeightCache[key]) {
                return _textHeightCache[key];
            }
            
            _ctx = _ctx || util.getContext();

            _ctx.save();
            if (textFont) {
                _ctx.font = textFont;
            }
            
            text = (text + '').split('\n');
            // 比较粗暴
            var height = (_ctx.measureText('国').width + 2) * text.length;

            _ctx.restore();

            _textHeightCache[key] = height;
            if (++_textHeightCacheCounter > TEXT_CACHE_MAX) {
                // 内存释放
                _textHeightCacheCounter = 0;
                _textHeightCache = {};
            }
            return height;
        }

        return {
            isInside : isInside,
            isOutside : isOutside,
            getTextWidth : getTextWidth,
            getTextHeight : getTextHeight,

            isInsidePath: isInsidePath,
            isInsidePolygon: isInsidePolygon,
            isInsideSector: isInsideSector,
            isInsideCircle: isInsideCircle,
            isInsideLine: isInsideLine,
            isInsideRect: isInsideRect,
            isInsideBrokenLine: isInsideBrokenLine
        };
    }
);

/**
 * 提供变换扩展
 * @module zrender/mixin/Transformable
 * @author pissang (https://www.github.com/pissang)
 */
define('zrender/mixin/Transformable',['require','../tool/matrix','../tool/vector'],function (require) {

    'use strict';

    var matrix = require('../tool/matrix');
    var vector = require('../tool/vector');
    var origin = [ 0, 0 ];

    var EPSILON = 5e-5;

    function isAroundZero(val) {
        return val > -EPSILON && val < EPSILON;
    }
    function isNotAroundZero(val) {
        return val > EPSILON || val < -EPSILON;
    }

    /**
     * @alias module:zrender/mixin/Transformable
     * @constructor
     */
    var Transformable = function () {

        if (!this.position) {
            /**
             * 平移
             * @type {Array.<number>}
             * @default [0, 0]
             */
            this.position = [ 0, 0 ];
        }
        if (typeof(this.rotation) == 'undefined') {
            /**
             * 旋转，可以通过数组二三项指定旋转的原点
             * @type {Array.<number>}
             * @default [0, 0, 0]
             */
            this.rotation = [ 0, 0, 0 ];
        }
        if (!this.scale) {
            /**
             * 缩放，可以通过数组三四项指定缩放的原点
             * @type {Array.<number>}
             * @default [1, 1, 0, 0]
             */
            this.scale = [ 1, 1, 0, 0 ];
        }

        this.needLocalTransform = false;

        /**
         * 是否有坐标变换
         * @type {boolean}
         * @readOnly
         */
        this.needTransform = false;
    };

    Transformable.prototype = {
        
        constructor: Transformable,

        updateNeedTransform: function () {
            this.needLocalTransform = isNotAroundZero(this.rotation[0])
                || isNotAroundZero(this.position[0])
                || isNotAroundZero(this.position[1])
                || isNotAroundZero(this.scale[0] - 1)
                || isNotAroundZero(this.scale[1] - 1);
        },

        /**
         * 判断是否需要有坐标变换，更新needTransform属性。
         * 如果有坐标变换, 则从position, rotation, scale以及父节点的transform计算出自身的transform矩阵
         */
        updateTransform: function () {
            
            this.updateNeedTransform();

            if (this.parent) {
                this.needTransform = this.needLocalTransform || this.parent.needTransform;
            }
            else {
                this.needTransform = this.needLocalTransform;
            }
            
            if (!this.needTransform) {
                return;
            }

            var m = this.transform || matrix.create();
            matrix.identity(m);

            if (this.needLocalTransform) {
                if (
                    isNotAroundZero(this.scale[0])
                 || isNotAroundZero(this.scale[1])
                ) {
                    origin[0] = -this.scale[2] || 0;
                    origin[1] = -this.scale[3] || 0;
                    var haveOrigin = isNotAroundZero(origin[0])
                                  || isNotAroundZero(origin[1]);
                    if (haveOrigin) {
                        matrix.translate(
                            m, m, origin
                        );
                    }
                    matrix.scale(m, m, this.scale);
                    if (haveOrigin) {
                        origin[0] = -origin[0];
                        origin[1] = -origin[1];
                        matrix.translate(
                            m, m, origin
                        );
                    }
                }

                if (this.rotation instanceof Array) {
                    if (this.rotation[0] !== 0) {
                        origin[0] = -this.rotation[1] || 0;
                        origin[1] = -this.rotation[2] || 0;
                        var haveOrigin = isNotAroundZero(origin[0])
                                      || isNotAroundZero(origin[1]);
                        if (haveOrigin) {
                            matrix.translate(
                                m, m, origin
                            );
                        }
                        matrix.rotate(m, m, this.rotation[0]);
                        if (haveOrigin) {
                            origin[0] = -origin[0];
                            origin[1] = -origin[1];
                            matrix.translate(
                                m, m, origin
                            );
                        }
                    }
                }
                else {
                    if (this.rotation !== 0) {
                        matrix.rotate(m, m, this.rotation);
                    }
                }

                if (
                    isNotAroundZero(this.position[0]) || isNotAroundZero(this.position[1])
                ) {
                    matrix.translate(m, m, this.position);
                }
            }

            // 保存这个变换矩阵
            this.transform = m;

            // 应用父节点变换
            if (this.parent && this.parent.needTransform) {
                if (this.needLocalTransform) {
                    matrix.mul(this.transform, this.parent.transform, this.transform);
                }
                else {
                    matrix.copy(this.transform, this.parent.transform);
                }
            }
        },
        /**
         * 将自己的transform应用到context上
         * @param {Context2D} ctx
         */
        setTransform: function (ctx) {
            if (this.needTransform) {
                var m = this.transform;
                ctx.transform(
                    m[0], m[1],
                    m[2], m[3],
                    m[4], m[5]
                );
            }
        },
        /**
         * 设置图形的朝向
         * @param  {Array.<number>|Float32Array} target
         * @method
         */
        lookAt: (function () {
            var v = vector.create();
            return function(target) {
                if (!this.transform) {
                    this.transform = matrix.create();
                }
                var m = this.transform;
                vector.sub(v, target, this.position);
                if (isAroundZero(v[0]) && isAroundZero(v[1])) {
                    return;
                }
                vector.normalize(v, v);
                // Y Axis
                // TODO Scale origin ?
                m[2] = v[0] * this.scale[1];
                m[3] = v[1] * this.scale[1];
                // X Axis
                m[0] = v[1] * this.scale[0];
                m[1] = -v[0] * this.scale[0];
                // Position
                m[4] = this.position[0];
                m[5] = this.position[1];

                this.decomposeTransform();
            };
        })(),
        /**
         * 分解`transform`矩阵到`position`, `rotation`, `scale`
         */
        decomposeTransform: function () {
            if (!this.transform) {
                return;
            }
            var m = this.transform;
            var sx = m[0] * m[0] + m[1] * m[1];
            var position = this.position;
            var scale = this.scale;
            var rotation = this.rotation;
            if (isNotAroundZero(sx - 1)) {
                sx = Math.sqrt(sx);
            }
            var sy = m[2] * m[2] + m[3] * m[3];
            if (isNotAroundZero(sy - 1)) {
                sy = Math.sqrt(sy);
            }
            position[0] = m[4];
            position[1] = m[5];
            scale[0] = sx;
            scale[1] = sy;
            scale[2] = scale[3] = 0;
            rotation[0] = Math.atan2(-m[1] / sy, m[0] / sx);
            rotation[1] = rotation[2] = 0;
        }
    };

    return Transformable;
});

/**
 * 颜色辅助类
 * @module zrender/tool/color
 * @author CrossDo (chenhuaimu@baidu.com)
 */
define('zrender/tool/color',['require','../tool/util'],function(require) {
    var util = require('../tool/util');

    var _ctx;

    // Color palette is an array containing the default colors for the chart's
    // series.
    // When all colors are used, new colors are selected from the start again.
    // Defaults to:
    // 默认色板
    var palette = [
        '#ff9277', ' #dddd00', ' #ffc877', ' #bbe3ff', ' #d5ffbb',
        '#bbbbff', ' #ddb000', ' #b0dd00', ' #e2bbff', ' #ffbbe3',
        '#ff7777', ' #ff9900', ' #83dd00', ' #77e3ff', ' #778fff',
        '#c877ff', ' #ff77ab', ' #ff6600', ' #aa8800', ' #77c7ff',
        '#ad77ff', ' #ff77ff', ' #dd0083', ' #777700', ' #00aa00',
        '#0088aa', ' #8400dd', ' #aa0088', ' #dd0000', ' #772e00'
    ];
    var _palette = palette;

    var highlightColor = 'rgba(255,255,0,0.5)';
    var _highlightColor = highlightColor;

    // 颜色格式
    /*jshint maxlen: 330 */
    var colorRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i;

    var _nameColors = {
        aliceblue : '#f0f8ff',
        antiquewhite : '#faebd7',
        aqua : '#0ff',
        aquamarine : '#7fffd4',
        azure : '#f0ffff',
        beige : '#f5f5dc',
        bisque : '#ffe4c4',
        black : '#000',
        blanchedalmond : '#ffebcd',
        blue : '#00f',
        blueviolet : '#8a2be2',
        brown : '#a52a2a',
        burlywood : '#deb887',
        cadetblue : '#5f9ea0',
        chartreuse : '#7fff00',
        chocolate : '#d2691e',
        coral : '#ff7f50',
        cornflowerblue : '#6495ed',
        cornsilk : '#fff8dc',
        crimson : '#dc143c',
        cyan : '#0ff',
        darkblue : '#00008b',
        darkcyan : '#008b8b',
        darkgoldenrod : '#b8860b',
        darkgray : '#a9a9a9',
        darkgrey : '#a9a9a9',
        darkgreen : '#006400',
        darkkhaki : '#bdb76b',
        darkmagenta : '#8b008b',
        darkolivegreen : '#556b2f',
        darkorange : '#ff8c00',
        darkorchid : '#9932cc',
        darkred : '#8b0000',
        darksalmon : '#e9967a',
        darkseagreen : '#8fbc8f',
        darkslateblue : '#483d8b',
        darkslategray : '#2f4f4f',
        darkslategrey : '#2f4f4f',
        darkturquoise : '#00ced1',
        darkviolet : '#9400d3',
        deeppink : '#ff1493',
        deepskyblue : '#00bfff',
        dimgray : '#696969',
        dimgrey : '#696969',
        dodgerblue : '#1e90ff',
        firebrick : '#b22222',
        floralwhite : '#fffaf0',
        forestgreen : '#228b22',
        fuchsia : '#f0f',
        gainsboro : '#dcdcdc',
        ghostwhite : '#f8f8ff',
        gold : '#ffd700',
        goldenrod : '#daa520',
        gray : '#808080',
        grey : '#808080',
        green : '#008000',
        greenyellow : '#adff2f',
        honeydew : '#f0fff0',
        hotpink : '#ff69b4',
        indianred : '#cd5c5c',
        indigo : '#4b0082',
        ivory : '#fffff0',
        khaki : '#f0e68c',
        lavender : '#e6e6fa',
        lavenderblush : '#fff0f5',
        lawngreen : '#7cfc00',
        lemonchiffon : '#fffacd',
        lightblue : '#add8e6',
        lightcoral : '#f08080',
        lightcyan : '#e0ffff',
        lightgoldenrodyellow : '#fafad2',
        lightgray : '#d3d3d3',
        lightgrey : '#d3d3d3',
        lightgreen : '#90ee90',
        lightpink : '#ffb6c1',
        lightsalmon : '#ffa07a',
        lightseagreen : '#20b2aa',
        lightskyblue : '#87cefa',
        lightslategray : '#789',
        lightslategrey : '#789',
        lightsteelblue : '#b0c4de',
        lightyellow : '#ffffe0',
        lime : '#0f0',
        limegreen : '#32cd32',
        linen : '#faf0e6',
        magenta : '#f0f',
        maroon : '#800000',
        mediumaquamarine : '#66cdaa',
        mediumblue : '#0000cd',
        mediumorchid : '#ba55d3',
        mediumpurple : '#9370d8',
        mediumseagreen : '#3cb371',
        mediumslateblue : '#7b68ee',
        mediumspringgreen : '#00fa9a',
        mediumturquoise : '#48d1cc',
        mediumvioletred : '#c71585',
        midnightblue : '#191970',
        mintcream : '#f5fffa',
        mistyrose : '#ffe4e1',
        moccasin : '#ffe4b5',
        navajowhite : '#ffdead',
        navy : '#000080',
        oldlace : '#fdf5e6',
        olive : '#808000',
        olivedrab : '#6b8e23',
        orange : '#ffa500',
        orangered : '#ff4500',
        orchid : '#da70d6',
        palegoldenrod : '#eee8aa',
        palegreen : '#98fb98',
        paleturquoise : '#afeeee',
        palevioletred : '#d87093',
        papayawhip : '#ffefd5',
        peachpuff : '#ffdab9',
        peru : '#cd853f',
        pink : '#ffc0cb',
        plum : '#dda0dd',
        powderblue : '#b0e0e6',
        purple : '#800080',
        red : '#f00',
        rosybrown : '#bc8f8f',
        royalblue : '#4169e1',
        saddlebrown : '#8b4513',
        salmon : '#fa8072',
        sandybrown : '#f4a460',
        seagreen : '#2e8b57',
        seashell : '#fff5ee',
        sienna : '#a0522d',
        silver : '#c0c0c0',
        skyblue : '#87ceeb',
        slateblue : '#6a5acd',
        slategray : '#708090',
        slategrey : '#708090',
        snow : '#fffafa',
        springgreen : '#00ff7f',
        steelblue : '#4682b4',
        tan : '#d2b48c',
        teal : '#008080',
        thistle : '#d8bfd8',
        tomato : '#ff6347',
        turquoise : '#40e0d0',
        violet : '#ee82ee',
        wheat : '#f5deb3',
        white : '#fff',
        whitesmoke : '#f5f5f5',
        yellow : '#ff0',
        yellowgreen : '#9acd32'
    };

    /**
     * 自定义调色板
     */
    function customPalette(userPalete) {
        palette = userPalete;
    }

    /**
     * 复位默认色板
     */
    function resetPalette() {
        palette = _palette;
    }

    /**
     * 获取色板颜色
     * @memberOf module:zrender/tool/color
     * @param {number} idx 色板位置
     * @param {Array.<string>} [userPalete] 自定义色板
     * @return {string} 颜色
     */
    function getColor(idx, userPalete) {
        idx = idx | 0;
        userPalete = userPalete || palette;
        return userPalete[idx % userPalete.length];
    }

    /**
     * 自定义默认高亮颜色
     */
    function customHighlight(userHighlightColor) {
        highlightColor = userHighlightColor;
    }

    /**
     * 重置默认高亮颜色
     */
    function resetHighlight() {
        _highlightColor = highlightColor;
    }

    /**
     * 获取默认高亮颜色
     */
    function getHighlightColor() {
        return highlightColor;
    }

    /**
     * 径向渐变
     * @memberOf module:zrender/tool/color
     * @param {number} x0 渐变起点
     * @param {number} y0
     * @param {number} r0
     * @param {number} x1 渐变终点
     * @param {number} y1
     * @param {number} r1
     * @param {Array} colorList 颜色列表
     * @return {CanvasGradient}
     */
    function getRadialGradient(x0, y0, r0, x1, y1, r1, colorList) {
        if (!_ctx) {
            _ctx = util.getContext();
        }
        var gradient = _ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        for (var i = 0, l = colorList.length; i < l; i++) {
            gradient.addColorStop(colorList[i][0], colorList[i][1]);
        }
        gradient.__nonRecursion = true;
        return gradient;
    }

    /**
     * 线性渐变
     * @param {Object} x0 渐变起点
     * @param {Object} y0
     * @param {Object} x1 渐变终点
     * @param {Object} y1
     * @param {Array} colorList 颜色列表
     */
    function getLinearGradient(x0, y0, x1, y1, colorList) {
        if (!_ctx) {
            _ctx = util.getContext();
        }
        var gradient = _ctx.createLinearGradient(x0, y0, x1, y1);
        for (var i = 0, l = colorList.length; i < l; i++) {
            gradient.addColorStop(colorList[i][0], colorList[i][1]);
        }
        gradient.__nonRecursion = true;
        return gradient;
    }

    /**
     * 获取两种颜色之间渐变颜色数组
     * @param {color} start 起始颜色
     * @param {color} end 结束颜色
     * @param {number} step 渐变级数
     * @return {Array}  颜色数组
     */
    function getStepColors(start, end, step) {
        start = toRGBA(start);
        end = toRGBA(end);
        start = getData(start);
        end = getData(end);

        var colors = [];
        var stepR = (end[0] - start[0]) / step;
        var stepG = (end[1] - start[1]) / step;
        var stepB = (end[2] - start[2]) / step;
        // 生成颜色集合
        // fix by linfeng 颜色堆积
        for (var i = 0, r = start[0], g = start[1], b = start[2]; i < step; i++
        ) {
            colors[i] = toColor([
                adjust(Math.floor(r), [ 0, 255 ]),
                adjust(Math.floor(g), [ 0, 255 ]), 
                adjust(Math.floor(b), [ 0, 255 ])
            ]);
            r += stepR;
            g += stepG;
            b += stepB;
        }
        r = end[0];
        g = end[1];
        b = end[2];
        colors[i] = toColor([ r, g, b ]);
        return colors;
    }

    /**
     * 获取指定级数的渐变颜色数组
     * @memberOf module:zrender/tool/color
     * @param {Array.<string>} colors 颜色组
     * @param {number} [step=20] 渐变级数
     * @return {Array.<string>}  颜色数组
     */
    function getGradientColors(colors, step) {
        var ret = [];
        var len = colors.length;
        if (step === undefined) {
            step = 20;
        }
        if (len === 1) {
            ret = getStepColors(colors[0], colors[0], step);
        }
        else if (len > 1) {
            for (var i = 0, n = len - 1; i < n; i++) {
                var steps = getStepColors(colors[i], colors[i + 1], step);
                if (i < n - 1) {
                    steps.pop();
                }
                ret = ret.concat(steps);
            }
        }
        return ret;
    }

    /**
     * 颜色值数组转为指定格式颜色,例如:<br/>
     * data = [60,20,20,0.1] format = 'rgba'
     * 返回：rgba(60,20,20,0.1)
     * @param {Array} data 颜色值数组
     * @param {string} format 格式,默认rgb
     * @return {string} 颜色
     */
    function toColor(data, format) {
        format = format || 'rgb';
        if (data && (data.length === 3 || data.length === 4)) {
            data = map(data,
                function(c) {
                    return c > 1 ? Math.ceil(c) : c;
                }
            );

            if (format.indexOf('hex') > -1) {
                return '#' + ((1 << 24) + (data[0] << 16) + (data[1] << 8) + (+data[2])).toString(16).slice(1);
            }
            else if (format.indexOf('hs') > -1) {
                var sx = map(data.slice(1, 3),
                    function(c) {
                        return c + '%';
                    }
                );
                data[1] = sx[0];
                data[2] = sx[1];
            }

            if (format.indexOf('a') > -1) {
                if (data.length === 3) {
                    data.push(1);
                }
                data[3] = adjust(data[3], [ 0, 1 ]);
                return format + '(' + data.slice(0, 4).join(',') + ')';
            }

            return format + '(' + data.slice(0, 3).join(',') + ')';
        }
    }

    /**
     * 颜色字符串转换为rgba数组
     * @memberOf module:zrender/tool/color
     * @param {string} color 颜色
     * @return {Array.<number>} 颜色值数组
     */
    function toArray(color) {
        color = trim(color);
        if (color.indexOf('rgba') < 0) {
            color = toRGBA(color);
        }

        var data = [];
        var i = 0;
        color.replace(/[\d.]+/g, function (n) {
            if (i < 3) {
                n = n | 0;
            }
            else {
                // Alpha
                n = +n;
            }
            data[i++] = n;
        });
        return data;
    }

    /**
     * 颜色格式转化
     *
     * @param {string} color 颜色值数组
     * @param {string} format 格式,默认rgb
     * @return {string} 颜色
     */
    function convert(color, format) {
        var data = getData(color);
        var alpha = data[3];
        if (typeof alpha === 'undefined') {
            alpha = 1;
        }

        if (color.indexOf('hsb') > -1) {
            data = _HSV_2_RGB(data);
        }
        else if (color.indexOf('hsl') > -1) {
            data = _HSL_2_RGB(data);
        }

        if (format.indexOf('hsb') > -1 || format.indexOf('hsv') > -1) {
            data = _RGB_2_HSB(data);
        }
        else if (format.indexOf('hsl') > -1) {
            data = _RGB_2_HSL(data);
        }

        data[3] = alpha;

        return toColor(data, format);
    }

    /**
     * 转换为rgba格式的颜色
     * @memberOf module:zrender/tool/color
     * @param {string} color 颜色
     * @return {string} rgba颜色，rgba(r,g,b,a)
     */
    function toRGBA(color) {
        return convert(color, 'rgba');
    }

    /**
     * 转换为rgb数字格式的颜色
     * @memberOf module:zrender/tool/color
     * @param {string} color 颜色
     * @return {string} rgb颜色，rgb(0,0,0)格式
     */
    function toRGB(color) {
        return convert(color, 'rgb');
    }

    /**
     * 转换为16进制颜色
     * @memberOf module:zrender/tool/color
     * @param {string} color 颜色
     * @return {string} 16进制颜色，#rrggbb格式
     */
    function toHex(color) {
        return convert(color, 'hex');
    }

    /**
     * 转换为HSV颜色
     * @memberOf module:zrender/tool/color
     * @param {string} color 颜色
     * @return {string} HSVA颜色，hsva(h,s,v,a)
     */
    function toHSVA(color) {
        return convert(color, 'hsva');
    }

    /**
     * 转换为HSV颜色
     * @memberOf module:zrender/tool/color
     * @param {string} color 颜色
     * @return {string} HSV颜色，hsv(h,s,v)
     */
    function toHSV(color) {
        return convert(color, 'hsv');
    }

    /**
     * 转换为HSBA颜色
     * @memberOf module:zrender/tool/color
     * @param {string} color 颜色
     * @return {string} HSBA颜色，hsba(h,s,b,a)
     */
    function toHSBA(color) {
        return convert(color, 'hsba');
    }

    /**
     * 转换为HSB颜色
     * @memberOf module:zrender/tool/color
     * @param {string} color 颜色
     * @return {string} HSB颜色，hsb(h,s,b)
     */
    function toHSB(color) {
        return convert(color, 'hsb');
    }

    /**
     * 转换为HSLA颜色
     * @memberOf module:zrender/tool/color
     * @param {string} color 颜色
     * @return {string} HSLA颜色，hsla(h,s,l,a)
     */
    function toHSLA(color) {
        return convert(color, 'hsla');
    }

    /**
     * 转换为HSL颜色
     * @memberOf module:zrender/tool/color
     * @param {string} color 颜色
     * @return {string} HSL颜色，hsl(h,s,l)
     */
    function toHSL(color) {
        return convert(color, 'hsl');
    }

    /**
     * 转换颜色名
     * 
     * @param {string} color 颜色
     * @return {string} 颜色名
     */
    function toName(color) {
        for (var key in _nameColors) {
            if (toHex(_nameColors[key]) === toHex(color)) {
                return key;
            }
        }
        return null;
    }

    /**
     * 移除颜色中多余空格
     * 
     * @param {string} color 颜色
     * @return {string} 无空格颜色
     */
    function trim(color) {
        return String(color).replace(/\s+/g, '');
    }

    /**
     * 颜色规范化
     * @memberOf module:zrender/tool/color
     * @param {string} color 颜色
     * @return {string} 规范化后的颜色
     */
    function normalize(color) {
        // 颜色名
        if (_nameColors[color]) {
            color = _nameColors[color];
        }
        // 去掉空格
        color = trim(color);
        // hsv与hsb等价
        color = color.replace(/hsv/i, 'hsb');
        // rgb转为rrggbb
        if (/^#[\da-f]{3}$/i.test(color)) {
            color = parseInt(color.slice(1), 16);
            var r = (color & 0xf00) << 8;
            var g = (color & 0xf0) << 4;
            var b = color & 0xf;

            color = '#' + ((1 << 24) + (r << 4) + r + (g << 4) + g + (b << 4) + b).toString(16).slice(1);
        }
        // 或者使用以下正则替换，不过 chrome 下性能相对差点
        // color = color.replace(/^#([\da-f])([\da-f])([\da-f])$/i, '#$1$1$2$2$3$3');
        return color;
    }

    /**
     * 颜色加深或减淡，当level>0加深，当level<0减淡
     * @memberOf module:zrender/tool/color
     * @param {string} color 颜色
     * @param {number} level 升降程度,取值区间[-1,1]
     * @return {string} 加深或减淡后颜色值
     */
    function lift(color, level) {
        var direct = level > 0 ? 1 : -1;
        if (typeof level === 'undefined') {
            level = 0;
        }
        level = Math.abs(level) > 1 ? 1 : Math.abs(level);
        color = toRGB(color);
        var data = getData(color);
        for (var i = 0; i < 3; i++) {
            if (direct === 1) {
                data[i] = data[i] * (1 - level) | 0;
            }
            else {
                data[i] = ((255 - data[i]) * level + data[i]) | 0;
            }
        }
        return 'rgb(' + data.join(',') + ')';
    }

    /**
     * 颜色翻转,[255-r,255-g,255-b,1-a]
     * @memberOf module:zrender/tool/color
     * @param {string} color 颜色
     * @return {string} 翻转颜色
     */
    function reverse(color) {
        var data = getData(toRGBA(color));
        data = map(data,
            function(c) {
                return 255 - c;
            }
        );
        return toColor(data, 'rgb');
    }

    /**
     * 简单两种颜色混合
     * @memberOf module:zrender/tool/color
     * @param {string} color1 第一种颜色
     * @param {string} color2 第二种颜色
     * @param {number} weight 混合权重[0-1]
     * @return {string} 结果色,rgb(r,g,b)或rgba(r,g,b,a)
     */
    function mix(color1, color2, weight) {
        if (typeof weight === 'undefined') {
            weight = 0.5;
        }
        weight = 1 - adjust(weight, [ 0, 1 ]);

        var w = weight * 2 - 1;
        var data1 = getData(toRGBA(color1));
        var data2 = getData(toRGBA(color2));

        var d = data1[3] - data2[3];

        var weight1 = (((w * d === -1) ? w : (w + d) / (1 + w * d)) + 1) / 2;
        var weight2 = 1 - weight1;

        var data = [];

        for (var i = 0; i < 3; i++) {
            data[i] = data1[i] * weight1 + data2[i] * weight2;
        }

        var alpha = data1[3] * weight + data2[3] * (1 - weight);
        alpha = Math.max(0, Math.min(1, alpha));

        if (data1[3] === 1 && data2[3] === 1) {// 不考虑透明度
            return toColor(data, 'rgb');
        }
        data[3] = alpha;
        return toColor(data, 'rgba');
    }

    /**
     * 随机颜色
     * 
     * @return {string} 颜色值，#rrggbb格式
     */
    function random() {
        return '#' + Math.random().toString(16).slice(2, 8);
    }

    /**
     * 获取颜色值数组,返回值范围： <br/>
     * RGB 范围[0-255] <br/>
     * HSL/HSV/HSB 范围[0-1]<br/>
     * A透明度范围[0-1]
     * 支持格式：
     * #rgb
     * #rrggbb
     * rgb(r,g,b)
     * rgb(r%,g%,b%)
     * rgba(r,g,b,a)
     * hsb(h,s,b) // hsv与hsb等价
     * hsb(h%,s%,b%)
     * hsba(h,s,b,a)
     * hsl(h,s,l)
     * hsl(h%,s%,l%)
     * hsla(h,s,l,a)
     *
     * @param {string} color 颜色
     * @return {Array.<number>} 颜色值数组或null
     */
    function getData(color) {
        color = normalize(color);
        var r = color.match(colorRegExp);
        if (r === null) {
            throw new Error('The color format error'); // 颜色格式错误
        }
        var d;
        var a;
        var data = [];
        var rgb;

        if (r[2]) {
            // #rrggbb
            d = r[2].replace('#', '').split('');
            rgb = [ d[0] + d[1], d[2] + d[3], d[4] + d[5] ];
            data = map(rgb,
                function(c) {
                    return adjust(parseInt(c, 16), [ 0, 255 ]);
                }
            );

        }
        else if (r[4]) {
            // rgb rgba
            var rgba = (r[4]).split(',');
            a = rgba[3];
            rgb = rgba.slice(0, 3);
            data = map(
                rgb,
                function(c) {
                    c = Math.floor(
                        c.indexOf('%') > 0 ? parseInt(c, 0) * 2.55 : c
                    );
                    return adjust(c, [ 0, 255 ]);
                }
            );

            if (typeof a !== 'undefined') {
                data.push(adjust(parseFloat(a), [ 0, 1 ]));
            }
        }
        else if (r[5] || r[6]) {
            // hsb hsba hsl hsla
            var hsxa = (r[5] || r[6]).split(',');
            var h = parseInt(hsxa[0], 0) / 360;
            var s = hsxa[1];
            var x = hsxa[2];
            a = hsxa[3];
            data = map([ s, x ],
                function(c) {
                    return adjust(parseFloat(c) / 100, [ 0, 1 ]);
                }
            );
            data.unshift(h);
            if (typeof a !== 'undefined') {
                data.push(adjust(parseFloat(a), [ 0, 1 ]));
            }
        }
        return data;
    }

    /**
     * 设置颜色透明度
     * @memberOf module:zrender/tool/color
     * @param {string} color 颜色
     * @param {number} a 透明度,区间[0,1]
     * @return {string} rgba颜色值
     */
    function alpha(color, a) {
        if (a === null) {
            a = 1;
        }
        var data = getData(toRGBA(color));
        data[3] = adjust(Number(a).toFixed(4), [ 0, 1 ]);

        return toColor(data, 'rgba');
    }

    // 数组映射
    function map(array, fun) {
        if (typeof fun !== 'function') {
            throw new TypeError();
        }
        var len = array ? array.length : 0;
        for (var i = 0; i < len; i++) {
            array[i] = fun(array[i]);
        }
        return array;
    }

    // 调整值区间
    function adjust(value, region) {
        // < to <= & > to >=
        // modify by linzhifeng 2014-05-25 because -0 == 0
        if (value <= region[0]) {
            value = region[0];
        }
        else if (value >= region[1]) {
            value = region[1];
        }
        return value;
    }

    // 参见 http:// www.easyrgb.com/index.php?X=MATH
    function _HSV_2_RGB(data) {
        var H = data[0];
        var S = data[1];
        var V = data[2];
        // HSV from 0 to 1
        var R; 
        var G;
        var B;
        if (S === 0) {
            R = V * 255;
            G = V * 255;
            B = V * 255;
        }
        else {
            var h = H * 6;
            if (h === 6) {
                h = 0;
            }
            var i = h | 0;
            var v1 = V * (1 - S);
            var v2 = V * (1 - S * (h - i));
            var v3 = V * (1 - S * (1 - (h - i)));
            var r = 0;
            var g = 0;
            var b = 0;

            if (i === 0) {
                r = V;
                g = v3;
                b = v1;
            }
            else if (i === 1) {
                r = v2;
                g = V;
                b = v1;
            }
            else if (i === 2) {
                r = v1;
                g = V;
                b = v3;
            }
            else if (i === 3) {
                r = v1;
                g = v2;
                b = V;
            }
            else if (i === 4) {
                r = v3;
                g = v1;
                b = V;
            }
            else {
                r = V;
                g = v1;
                b = v2;
            }

            // RGB results from 0 to 255
            R = r * 255;
            G = g * 255;
            B = b * 255;
        }
        return [ R, G, B ];
    }

    function _HSL_2_RGB(data) {
        var H = data[0];
        var S = data[1];
        var L = data[2];
        // HSL from 0 to 1
        var R;
        var G;
        var B;
        if (S === 0) {
            R = L * 255;
            G = L * 255;
            B = L * 255;
        }
        else {
            var v2;
            if (L < 0.5) {
                v2 = L * (1 + S);
            }
            else {
                v2 = (L + S) - (S * L);
            }

            var v1 = 2 * L - v2;

            R = 255 * _HUE_2_RGB(v1, v2, H + (1 / 3));
            G = 255 * _HUE_2_RGB(v1, v2, H);
            B = 255 * _HUE_2_RGB(v1, v2, H - (1 / 3));
        }
        return [ R, G, B ];
    }

    function _HUE_2_RGB(v1, v2, vH) {
        if (vH < 0) {
            vH += 1;
        }
        if (vH > 1) {
            vH -= 1;
        }
        if ((6 * vH) < 1) {
            return (v1 + (v2 - v1) * 6 * vH);
        }
        if ((2 * vH) < 1) {
            return (v2);
        }
        if ((3 * vH) < 2) {
            return (v1 + (v2 - v1) * ((2 / 3) - vH) * 6);
        }
        return v1;
    }

    function _RGB_2_HSB(data) {
        // RGB from 0 to 255
        var R = (data[0] / 255);
        var G = (data[1] / 255);
        var B = (data[2] / 255);

        var vMin = Math.min(R, G, B); // Min. value of RGB
        var vMax = Math.max(R, G, B); // Max. value of RGB
        var delta = vMax - vMin; // Delta RGB value
        var V = vMax;
        var H;
        var S;

        // HSV results from 0 to 1
        if (delta === 0) {
            H = 0;
            S = 0;
        }
        else {
            S = delta / vMax;

            var deltaR = (((vMax - R) / 6) + (delta / 2)) / delta;
            var deltaG = (((vMax - G) / 6) + (delta / 2)) / delta;
            var deltaB = (((vMax - B) / 6) + (delta / 2)) / delta;

            if (R === vMax) {
                H = deltaB - deltaG;
            }
            else if (G === vMax) {
                H = (1 / 3) + deltaR - deltaB;
            }
            else if (B === vMax) {
                H = (2 / 3) + deltaG - deltaR;
            }

            if (H < 0) {
                H += 1;
            }
            if (H > 1) {
                H -= 1;
            }
        }
        H = H * 360;
        S = S * 100;
        V = V * 100;
        return [ H, S, V ];
    }

    function _RGB_2_HSL(data) {
        // RGB from 0 to 255
        var R = (data[0] / 255);
        var G = (data[1] / 255);
        var B = (data[2] / 255);

        var vMin = Math.min(R, G, B); // Min. value of RGB
        var vMax = Math.max(R, G, B); // Max. value of RGB
        var delta = vMax - vMin; // Delta RGB value

        var L = (vMax + vMin) / 2;
        var H;
        var S;
        // HSL results from 0 to 1
        if (delta === 0) {
            H = 0;
            S = 0;
        }
        else {
            if (L < 0.5) {
                S = delta / (vMax + vMin);
            }
            else {
                S = delta / (2 - vMax - vMin);
            }

            var deltaR = (((vMax - R) / 6) + (delta / 2)) / delta;
            var deltaG = (((vMax - G) / 6) + (delta / 2)) / delta;
            var deltaB = (((vMax - B) / 6) + (delta / 2)) / delta;

            if (R === vMax) {
                H = deltaB - deltaG;
            }
            else if (G === vMax) {
                H = (1 / 3) + deltaR - deltaB;
            }
            else if (B === vMax) {
                H = (2 / 3) + deltaG - deltaR;
            }

            if (H < 0) {
                H += 1;
            }

            if (H > 1) {
                H -= 1;
            }
        }

        H = H * 360;
        S = S * 100;
        L = L * 100;

        return [ H, S, L ];
    }

    return {
        customPalette : customPalette,
        resetPalette : resetPalette,
        getColor : getColor,
        getHighlightColor : getHighlightColor,
        customHighlight : customHighlight,
        resetHighlight : resetHighlight,
        getRadialGradient : getRadialGradient,
        getLinearGradient : getLinearGradient,
        getGradientColors : getGradientColors,
        getStepColors : getStepColors,
        reverse : reverse,
        mix : mix,
        lift : lift,
        trim : trim,
        random : random,
        toRGB : toRGB,
        toRGBA : toRGBA,
        toHex : toHex,
        toHSL : toHSL,
        toHSLA : toHSLA,
        toHSB : toHSB,
        toHSBA : toHSBA,
        toHSV : toHSV,
        toHSVA : toHSVA,
        toName : toName,
        toColor : toColor,
        toArray : toArray,
        alpha : alpha,
        getData : getData
    };
});


/**
 * shape基类
 * @module zrender/shape/Base
 * @author  Kener (@Kener-林峰, linzhifeng@baidu.com)
 *          errorrik (errorrik@gmail.com)
 */

/**
 * @typedef {Object} IBaseShapeStyle
 * @property {string} [brushType='fill']
 * @property {string} [color='#000000'] 填充颜色
 * @property {string} [strokeColor='#000000'] 描边颜色
 * @property {string} [lineCape='butt'] 线帽样式，可以是 butt, round, square
 * @property {number} [lineWidth=1] 描边宽度
 * @property {number} [opacity=1] 绘制透明度
 * @property {number} [shadowBlur=0] 阴影模糊度，大于0有效
 * @property {string} [shadowColor='#000000'] 阴影颜色
 * @property {number} [shadowOffsetX=0] 阴影横向偏移
 * @property {number} [shadowOffsetY=0] 阴影纵向偏移
 * @property {string} [text] 图形中的附加文本
 * @property {string} [textColor='#000000'] 文本颜色
 * @property {string} [textFont] 附加文本样式，eg:'bold 18px verdana'
 * @property {string} [textPosition='end'] 附加文本位置, 可以是 inside, left, right, top, bottom
 * @property {string} [textAlign] 默认根据textPosition自动设置，附加文本水平对齐。
 *                                可以是start, end, left, right, center
 * @property {string} [textBaseline] 默认根据textPosition自动设置，附加文本垂直对齐。
 *                                可以是top, bottom, middle, alphabetic, hanging, ideographic
 */

/**
 * @typedef {Object} module:zrender/shape/Base~IBoundingRect
 * @property {number} x 左上角顶点x轴坐标 
 * @property {number} y 左上角顶点y轴坐标
 * @property {number} width 包围盒矩形宽度
 * @property {number} height 包围盒矩形高度
 */

define(
    'zrender/shape/Base',['require','../tool/matrix','../tool/guid','../tool/util','../tool/log','../mixin/Transformable','../mixin/Eventful','../tool/area','../tool/area','../tool/color','../tool/area'],function(require) {
        var matrix = require('../tool/matrix');
        var guid = require('../tool/guid');
        var util = require('../tool/util');
        var log = require('../tool/log');

        var Transformable = require('../mixin/Transformable');
        var Eventful = require('../mixin/Eventful');

        function _fillText(ctx, text, x, y, textFont, textAlign, textBaseline) {
            if (textFont) {
                ctx.font = textFont;
            }
            ctx.textAlign = textAlign;
            ctx.textBaseline = textBaseline;
            var rect = _getTextRect(
                text, x, y, textFont, textAlign, textBaseline
            );
            
            text = (text + '').split('\n');
            var lineHeight = require('../tool/area').getTextHeight('国', textFont);
            
            switch (textBaseline) {
                case 'top':
                    y = rect.y;
                    break;
                case 'bottom':
                    y = rect.y + lineHeight;
                    break;
                default:
                    y = rect.y + lineHeight / 2;
            }
            
            for (var i = 0, l = text.length; i < l; i++) {
                ctx.fillText(text[i], x, y);
                y += lineHeight;
            }
        }

        /**
         * 返回矩形区域，用于局部刷新和文字定位
         * @inner
         * @param {string} text
         * @param {number} x
         * @param {number} y
         * @param {string} textFont
         * @param {string} textAlign
         * @param {string} textBaseline
         */
        function _getTextRect(text, x, y, textFont, textAlign, textBaseline) {
            var area = require('../tool/area');
            var width = area.getTextWidth(text, textFont);
            var lineHeight = area.getTextHeight('国', textFont);
            
            text = (text + '').split('\n');
            
            switch (textAlign) {
                case 'end':
                case 'right':
                    x -= width;
                    break;
                case 'center':
                    x -= (width / 2);
                    break;
            }

            switch (textBaseline) {
                case 'top':
                    break;
                case 'bottom':
                    y -= lineHeight * text.length;
                    break;
                default:
                    y -= lineHeight * text.length / 2;
            }

            return {
                x : x,
                y : y,
                width : width,
                height : lineHeight * text.length
            };
        }

        /**
         * @alias module:zrender/shape/Base
         * @constructor
         * @extends module:zrender/mixin/Transformable
         * @extends module:zrender/mixin/Eventful
         * @param {Object} options 关于shape的配置项，可以是shape的自有属性，也可以是自定义的属性。
         */
        var Base = function(options) {
            
            options = options || {};
            
            /**
             * Shape id, 全局唯一
             * @type {string}
             */
            this.id = options.id || guid();

            for (var key in options) {
                this[key] = options[key];
            }

            /**
             * 基础绘制样式
             * @type {module:zrender/shape/Base~IBaseShapeStyle}
             */
            this.style = this.style || {};

            /**
             * 高亮样式
             * @type {module:zrender/shape/Base~IBaseShapeStyle}
             */
            this.highlightStyle = this.highlightStyle || null;

            /**
             * 父节点
             * @readonly
             * @type {module:zrender/Group}
             * @default null
             */
            this.parent = null;

            this.__dirty = true;

            Transformable.call(this);
            Eventful.call(this);
        };
        /**
         * 图形是否可见，为true时不绘制图形，但是仍能触发鼠标事件
         * @name module:zrender/shape/Base#invisible
         * @type {boolean}
         * @default false
         */
        Base.prototype.invisible = false;

        /**
         * 图形是否忽略，为true时忽略图形的绘制以及事件触发
         * @name module:zrender/shape/Base#ignore
         * @type {boolean}
         * @default false
         */
        Base.prototype.ignore = false;

        /**
         * z层level，决定绘画在哪层canvas中
         * @name module:zrender/shape/Base#zlevel
         * @type {number}
         * @default 0
         */
        Base.prototype.zlevel = 0;

        /**
         * 是否可拖拽
         * @name module:zrender/shape/Base#draggable
         * @type {boolean}
         * @default false
         */
        Base.prototype.draggable = false;

        /**
         * 是否可点击
         * @name module:zrender/shape/Base#clickable
         * @type {boolean}
         * @default false
         */
        Base.prototype.clickable = false;

        /**
         * 是否可以hover
         * @name module:zrender/shape/Base#hoverable
         * @type {boolean}
         * @default true
         */
        Base.prototype.hoverable = true;
        
        /**
         * z值，跟zlevel一样影响shape绘制的前后顺序，z值大的shape会覆盖在z值小的上面，
         * 但是并不会创建新的canvas，所以优先级低于zlevel，而且频繁改动的开销比zlevel小很多。
         * 
         * @name module:zrender/shape/Base#z
         * @type {number}
         * @default 0
         */
        Base.prototype.z = 0;

        /**
         * 绘制图形
         * 
         * @param {CanvasRenderingContext2D} ctx
         * @param {boolean} [isHighlight=false] 是否使用高亮属性
         * @param {Function} [updateCallback]
         *        需要异步加载资源的shape可以通过这个callback(e), 
         *        让painter更新视图，base.brush没用，需要的话重载brush
         */
        Base.prototype.brush = function (ctx, isHighlight) {
            var style = this.style;
            
            if (this.brushTypeOnly) {
                style.brushType = this.brushTypeOnly;
            }

            if (isHighlight) {
                // 根据style扩展默认高亮样式
                style = this.getHighlightStyle(
                    style,
                    this.highlightStyle || {},
                    this.brushTypeOnly
                );
            }

            if (this.brushTypeOnly == 'stroke') {
                style.strokeColor = style.strokeColor || style.color;
            }

            ctx.save();

            this.setContext(ctx, style);

            // 设置transform
            this.setTransform(ctx);

            ctx.beginPath();
            this.buildPath(ctx, style);

            switch (style.brushType) {
                /* jshint ignore:start */
                case 'both':
                    ctx.fill();
                case 'stroke':
                    style.lineWidth > 0 && ctx.stroke();
                    break;
                /* jshint ignore:end */
                default:
                    ctx.fill();
            }
            
            this.drawText(ctx, style, this.style);

            ctx.restore();
        };

        var STYLE_CTX_MAP = [
            [ 'color', 'fillStyle' ],
            [ 'strokeColor', 'strokeStyle' ],
            [ 'opacity', 'globalAlpha' ],
            [ 'lineCap', 'lineCap' ],
            [ 'lineJoin', 'lineJoin' ],
            [ 'miterLimit', 'miterLimit' ],
            [ 'lineWidth', 'lineWidth' ],
            [ 'shadowBlur', 'shadowBlur' ],
            [ 'shadowColor', 'shadowColor' ],
            [ 'shadowOffsetX', 'shadowOffsetX' ],
            [ 'shadowOffsetY', 'shadowOffsetY' ]
        ];

        /**
         * 设置 fillStyle, strokeStyle, shadow 等通用绘制样式
         * @param {CanvasRenderingContext2D} ctx
         * @param {module:zrender/shape/Base~IBaseShapeStyle} style
         */
        Base.prototype.setContext = function (ctx, style) {
            for (var i = 0, len = STYLE_CTX_MAP.length; i < len; i++) {
                var styleProp = STYLE_CTX_MAP[i][0];
                var styleValue = style[styleProp];
                var ctxProp = STYLE_CTX_MAP[i][1];

                if (typeof styleValue != 'undefined') {
                    ctx[ctxProp] = styleValue;
                }
            }
        };
    
        /**
         * 根据默认样式扩展高亮样式
         * 
         * @param {module:zrender/shape/Base~IBaseShapeStyle} style 默认样式
         * @param {module:zrender/shape/Base~IBaseShapeStyle} highlightStyle 高亮样式
         * @param {string} brushTypeOnly
         */
        Base.prototype.getHighlightStyle = function (style, highlightStyle, brushTypeOnly) {
            var newStyle = {};
            for (var k in style) {
                newStyle[k] = style[k];
            }

            var color = require('../tool/color');
            var highlightColor = color.getHighlightColor();
            // 根据highlightStyle扩展
            if (style.brushType != 'stroke') {
                // 带填充则用高亮色加粗边线
                newStyle.strokeColor = highlightColor;
                newStyle.lineWidth = (style.lineWidth || 1)
                                      + this.getHighlightZoom();
                newStyle.brushType = 'both';
            }
            else {
                if (brushTypeOnly != 'stroke') {
                    // 描边型的则用原色加工高亮
                    newStyle.strokeColor = highlightColor;
                    newStyle.lineWidth = (style.lineWidth || 1)
                                          + this.getHighlightZoom();
                } 
                else {
                    // 线型的则用原色加工高亮
                    newStyle.strokeColor = highlightStyle.strokeColor
                                           || color.mix(
                                                 style.strokeColor,
                                                 color.toRGB(highlightColor)
                                              );
                }
            }

            // 可自定义覆盖默认值
            for (var k in highlightStyle) {
                if (typeof highlightStyle[k] != 'undefined') {
                    newStyle[k] = highlightStyle[k];
                }
            }

            return newStyle;
        };

        // 高亮放大效果参数
        // 当前统一设置为6，如有需要差异设置，通过this.type判断实例类型
        Base.prototype.getHighlightZoom = function () {
            return this.type != 'text' ? 6 : 2;
        };

        /**
         * 移动位置
         * @param {number} dx 横坐标变化
         * @param {number} dy 纵坐标变化
         */
        Base.prototype.drift = function (dx, dy) {
            this.position[0] += dx;
            this.position[1] += dy;
        };

        /**
         * 变换鼠标位置到 shape 的局部坐标空间
         * @method
         * @param {number} x
         * @param {number} y
         * @return {Array.<number>}
         */
        Base.prototype.getTansform = (function() {
            
            var invTransform = [];

            return function (x, y) {
                var originPos = [ x, y ];
                // 对鼠标的坐标也做相同的变换
                if (this.needTransform && this.transform) {
                    matrix.invert(invTransform, this.transform);

                    matrix.mulVector(originPos, invTransform, [ x, y, 1 ]);

                    if (x == originPos[0] && y == originPos[1]) {
                        // 避免外部修改导致的needTransform不准确
                        this.updateNeedTransform();
                    }
                }
                return originPos;
            };
        })();

        /**
         * 构建绘制的Path
         * @param {CanvasRenderingContext2D} ctx
         * @param {module:zrender/shape/Base~IBaseShapeStyle} style
         */
        Base.prototype.buildPath = function (ctx, style) {
            log('buildPath not implemented in ' + this.type);
        };

        /**
         * 计算返回包围盒矩形
         * @param {module:zrender/shape/Base~IBaseShapeStyle} style
         * @return {module:zrender/shape/Base~IBoundingRect}
         */
        Base.prototype.getRect = function (style) {
            log('getRect not implemented in ' + this.type);   
        };
        
        /**
         * 判断鼠标位置是否在图形内
         * @param {number} x
         * @param {number} y
         * @return {boolean}
         */
        Base.prototype.isCover = function (x, y) {
            var originPos = this.getTansform(x, y);
            x = originPos[0];
            y = originPos[1];

            // 快速预判并保留判断矩形
            var rect = this.style.__rect;
            if (!rect) {
                rect = this.style.__rect = this.getRect(this.style);
            }

            if (x >= rect.x
                && x <= (rect.x + rect.width)
                && y >= rect.y
                && y <= (rect.y + rect.height)
            ) {
                // 矩形内
                return require('../tool/area').isInside(this, this.style, x, y);
            }
            
            return false;
        };

        /**
         * 绘制附加文本
         * @param {CanvasRenderingContext2D} ctx
         * @param {module:zrender/shape/Base~IBaseShapeStyle} style 样式
         * @param {module:zrender/shape/Base~IBaseShapeStyle} normalStyle 默认样式，用于定位文字显示
         */
        Base.prototype.drawText = function (ctx, style, normalStyle) {
            if (typeof(style.text) == 'undefined' || style.text === false) {
                return;
            }
            // 字体颜色策略
            var textColor = style.textColor || style.color || style.strokeColor;
            ctx.fillStyle = textColor;

            // 文本与图形间空白间隙
            var dd = 10;
            var al;         // 文本水平对齐
            var bl;         // 文本垂直对齐
            var tx;         // 文本横坐标
            var ty;         // 文本纵坐标

            var textPosition = style.textPosition       // 用户定义
                               || this.textPosition     // shape默认
                               || 'top';                // 全局默认

            switch (textPosition) {
                case 'inside': 
                case 'top': 
                case 'bottom': 
                case 'left': 
                case 'right': 
                    if (this.getRect) {
                        var rect = (normalStyle || style).__rect
                                   || this.getRect(normalStyle || style);

                        switch (textPosition) {
                            case 'inside':
                                tx = rect.x + rect.width / 2;
                                ty = rect.y + rect.height / 2;
                                al = 'center';
                                bl = 'middle';
                                if (style.brushType != 'stroke'
                                    && textColor == style.color
                                ) {
                                    ctx.fillStyle = '#fff';
                                }
                                break;
                            case 'left':
                                tx = rect.x - dd;
                                ty = rect.y + rect.height / 2;
                                al = 'end';
                                bl = 'middle';
                                break;
                            case 'right':
                                tx = rect.x + rect.width + dd;
                                ty = rect.y + rect.height / 2;
                                al = 'start';
                                bl = 'middle';
                                break;
                            case 'top':
                                tx = rect.x + rect.width / 2;
                                ty = rect.y - dd;
                                al = 'center';
                                bl = 'bottom';
                                break;
                            case 'bottom':
                                tx = rect.x + rect.width / 2;
                                ty = rect.y + rect.height + dd;
                                al = 'center';
                                bl = 'top';
                                break;
                        }
                    }
                    break;
                case 'start':
                case 'end':
                    var xStart;
                    var xEnd;
                    var yStart;
                    var yEnd;
                    if (typeof style.pointList != 'undefined') {
                        var pointList = style.pointList;
                        if (pointList.length < 2) {
                            // 少于2个点就不画了~
                            return;
                        }
                        var length = pointList.length;
                        switch (textPosition) {
                            case 'start':
                                xStart = pointList[0][0];
                                xEnd = pointList[1][0];
                                yStart = pointList[0][1];
                                yEnd = pointList[1][1];
                                break;
                            case 'end':
                                xStart = pointList[length - 2][0];
                                xEnd = pointList[length - 1][0];
                                yStart = pointList[length - 2][1];
                                yEnd = pointList[length - 1][1];
                                break;
                        }
                    }
                    else {
                        xStart = style.xStart || 0;
                        xEnd = style.xEnd || 0;
                        yStart = style.yStart || 0;
                        yEnd = style.yEnd || 0;
                    }

                    switch (textPosition) {
                        case 'start':
                            al = xStart < xEnd ? 'end' : 'start';
                            bl = yStart < yEnd ? 'bottom' : 'top';
                            tx = xStart;
                            ty = yStart;
                            break;
                        case 'end':
                            al = xStart < xEnd ? 'start' : 'end';
                            bl = yStart < yEnd ? 'top' : 'bottom';
                            tx = xEnd;
                            ty = yEnd;
                            break;
                    }
                    dd -= 4;
                    if (xStart != xEnd) {
                        tx -= (al == 'end' ? dd : -dd);
                    } 
                    else {
                        al = 'center';
                    }

                    if (yStart != yEnd) {
                        ty -= (bl == 'bottom' ? dd : -dd);
                    } 
                    else {
                        bl = 'middle';
                    }
                    break;
                case 'specific':
                    tx = style.textX || 0;
                    ty = style.textY || 0;
                    al = 'start';
                    bl = 'middle';
                    break;
            }

            if (tx != null && ty != null) {
                _fillText(
                    ctx,
                    style.text, 
                    tx, ty, 
                    style.textFont,
                    style.textAlign || al,
                    style.textBaseline || bl
                );
            }
        };

        Base.prototype.modSelf = function() {
            this.__dirty = true;
            if (this.style) {
                this.style.__rect = null;
            }
        }

        /**
         * 图形是否会触发事件
         * @return {boolean}
         */
        // TODO, 通过 bind 绑定的事件
        Base.prototype.isSilent = function () {
            return !(
                this.hoverable || this.draggable || this.clickable
                || this.onmousemove || this.onmouseover || this.onmouseout
                || this.onmousedown || this.onmouseup || this.onclick
                || this.ondragenter || this.ondragover || this.ondragleave
                || this.ondrop
            );
        };

        util.merge(Base.prototype, Transformable.prototype, true);
        util.merge(Base.prototype, Eventful.prototype, true);

        return Base;
    }
);

/**
 * @module zrender/shape/Text
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 * @example
 *     var Text = require('zrender/shape/Text');
 *     var shape = new Text({
 *         style: {
 *             text: 'Label',
 *             x: 100,
 *             y: 100,
 *             textFont: '14px Arial'
 *         }
 *     });
 *     zr.addShape(shape);
 */

/**
 * @typedef {Object} ITextStyle
 * @property {number} x 横坐标
 * @property {number} y 纵坐标
 * @property {string} text 文本内容
 * @property {number} [maxWidth=null] 最大宽度限制
 * @property {string} [textFont] 附加文本样式，eg:'bold 18px verdana'
 * @property {string} [textAlign] 默认根据textPosition自动设置，附加文本水平对齐。
 *                                可以是start, end, left, right, center
 * @property {string} [textBaseline] 默认根据textPosition自动设置，附加文本垂直对齐。
 *                                可以是top, bottom, middle, alphabetic, hanging, ideographic
 * @property {string} [brushType='fill']
 * @property {string} [color='#000000'] 填充颜色
 * @property {string} [strokeColor='#000000'] 描边颜色
 * @property {number} [lineWidth=1] 描边宽度
 * @property {number} [opacity=1] 绘制透明度
 * @property {number} [shadowBlur=0] 阴影模糊度，大于0有效
 * @property {string} [shadowColor='#000000'] 阴影颜色
 * @property {number} [shadowOffsetX=0] 阴影横向偏移
 * @property {number} [shadowOffsetY=0] 阴影纵向偏移
 */

define(
    'zrender/shape/Text',['require','../tool/area','./Base','../tool/util'],function (require) {
        var area = require('../tool/area');
        var Base = require('./Base');
        
        /**
         * @alias module:zrender/shape/Text
         * @constructor
         * @extends module:zrender/shape/Base
         * @param {Object} options
         */
        var Text = function (options) {
            Base.call(this, options);
            /**
             * 文字绘制样式
             * @name module:zrender/shape/Text#style
             * @type {module:zrender/shape/Text~ITextStyle}
             */
            /**
             * 文字高亮绘制样式
             * @name module:zrender/shape/Text#highlightStyle
             * @type {module:zrender/shape/Text~ITextStyle}
             */
        };

        Text.prototype =  {
            type: 'text',

            brush : function (ctx, isHighlight) {
                var style = this.style;
                if (isHighlight) {
                    // 根据style扩展默认高亮样式
                    style = this.getHighlightStyle(
                        style, this.highlightStyle || {}
                    );
                }
                
                if (typeof(style.text) == 'undefined' || style.text === false) {
                    return;
                }

                ctx.save();
                this.setContext(ctx, style);

                // 设置transform
                this.setTransform(ctx);

                if (style.textFont) {
                    ctx.font = style.textFont;
                }
                ctx.textAlign = style.textAlign || 'start';
                ctx.textBaseline = style.textBaseline || 'middle';

                var text = (style.text + '').split('\n');
                var lineHeight = area.getTextHeight('国', style.textFont);
                var rect = this.getRect(style);
                var x = style.x;
                var y;
                if (style.textBaseline == 'top') {
                    y = rect.y;
                }
                else if (style.textBaseline == 'bottom') {
                    y = rect.y + lineHeight;
                }
                else {
                    y = rect.y + lineHeight / 2;
                }
                
                for (var i = 0, l = text.length; i < l; i++) {
                    if (style.maxWidth) {
                        switch (style.brushType) {
                            case 'fill':
                                ctx.fillText(
                                    text[i],
                                    x, y, style.maxWidth
                                );
                                break;
                            case 'stroke':
                                ctx.strokeText(
                                    text[i],
                                    x, y, style.maxWidth
                                );
                                break;
                            case 'both':
                                ctx.fillText(
                                    text[i],
                                    x, y, style.maxWidth
                                );
                                ctx.strokeText(
                                    text[i],
                                    x, y, style.maxWidth
                                );
                                break;
                            default:
                                ctx.fillText(
                                    text[i],
                                    x, y, style.maxWidth
                                );
                        }
                    }
                    else {
                        switch (style.brushType) {
                            case 'fill':
                                ctx.fillText(text[i], x, y);
                                break;
                            case 'stroke':
                                ctx.strokeText(text[i], x, y);
                                break;
                            case 'both':
                                ctx.fillText(text[i], x, y);
                                ctx.strokeText(text[i], x, y);
                                break;
                            default:
                                ctx.fillText(text[i], x, y);
                        }
                    }
                    y += lineHeight;
                }

                ctx.restore();
                return;
            },

            /**
             * 返回文字包围盒矩形
             * @param {module:zrender/shape/Text~ITextStyle} style
             * @return {module:zrender/shape/Base~IBoundingRect}
             */
            getRect : function (style) {
                if (style.__rect) {
                    return style.__rect;
                }
                
                var width = area.getTextWidth(style.text, style.textFont);
                var height = area.getTextHeight(style.text, style.textFont);
                
                var textX = style.x;                 // 默认start == left
                if (style.textAlign == 'end' || style.textAlign == 'right') {
                    textX -= width;
                }
                else if (style.textAlign == 'center') {
                    textX -= (width / 2);
                }

                var textY;
                if (style.textBaseline == 'top') {
                    textY = style.y;
                }
                else if (style.textBaseline == 'bottom') {
                    textY = style.y - height;
                }
                else {
                    // middle
                    textY = style.y - height / 2;
                }

                style.__rect = {
                    x : textX,
                    y : textY,
                    width : width,
                    height : height
                };
                
                return style.__rect;
            }
        };

        require('../tool/util').inherits(Text, Base);
        return Text;
    }
);


/**
 * 矩形
 * @module zrender/shape/Rectangle
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com) , 
 *         strwind (@劲风FEI, yaofeifei@baidu.com)
 * @example
 *     var Rectangle = require('zrender/shape/Rectangle');
 *     var shape = new Rectangle({
 *         style: {
 *             x: 0,
 *             y: 0,
 *             width: 100,
 *             height: 100,
 *             radius: 20
 *         }
 *     });
 *     zr.addShape(shape);
 */

/**
 * @typedef {Object} IRectangleStyle
 * @property {number} x 左上角x坐标
 * @property {number} y 左上角y坐标
 * @property {number} width 宽度
 * @property {number} height 高度
 * @property {number|Array.<number>} radius 矩形圆角，可以用数组分别指定四个角的圆角
 * @property {string} [brushType='fill']
 * @property {string} [color='#000000'] 填充颜色
 * @property {string} [strokeColor='#000000'] 描边颜色
 * @property {string} [lineCape='butt'] 线帽样式，可以是 butt, round, square
 * @property {number} [lineWidth=1] 描边宽度
 * @property {number} [opacity=1] 绘制透明度
 * @property {number} [shadowBlur=0] 阴影模糊度，大于0有效
 * @property {string} [shadowColor='#000000'] 阴影颜色
 * @property {number} [shadowOffsetX=0] 阴影横向偏移
 * @property {number} [shadowOffsetY=0] 阴影纵向偏移
 * @property {string} [text] 图形中的附加文本
 * @property {string} [textColor='#000000'] 文本颜色
 * @property {string} [textFont] 附加文本样式，eg:'bold 18px verdana'
 * @property {string} [textPosition='end'] 附加文本位置, 可以是 inside, left, right, top, bottom
 * @property {string} [textAlign] 默认根据textPosition自动设置，附加文本水平对齐。
 *                                可以是start, end, left, right, center
 * @property {string} [textBaseline] 默认根据textPosition自动设置，附加文本垂直对齐。
 *                                可以是top, bottom, middle, alphabetic, hanging, ideographic
 */
define(
    'zrender/shape/Rectangle',['require','./Base','../tool/util'],function (require) {
        var Base = require('./Base');
        
        /**
         * @alias module:zrender/shape/Rectangle
         * @constructor
         * @extends module:zrender/shape/Base
         * @param {Object} options
         */
        var Rectangle = function (options) {
            Base.call(this, options);
            /**
             * 矩形绘制样式
             * @name module:zrender/shape/Rectangle#style
             * @type {module:zrender/shape/Rectangle~IRectangleStyle}
             */
            /**
             * 矩形高亮绘制样式
             * @name module:zrender/shape/Rectangle#highlightStyle
             * @type {module:zrender/shape/Rectangle~IRectangleStyle}
             */
        };

        Rectangle.prototype =  {
            type: 'rectangle',

            _buildRadiusPath: function (ctx, style) {
                // 左上、右上、右下、左下角的半径依次为r1、r2、r3、r4
                // r缩写为1         相当于 [1, 1, 1, 1]
                // r缩写为[1]       相当于 [1, 1, 1, 1]
                // r缩写为[1, 2]    相当于 [1, 2, 1, 2]
                // r缩写为[1, 2, 3] 相当于 [1, 2, 3, 2]
                var x = style.x;
                var y = style.y;
                var width = style.width;
                var height = style.height;
                var r = style.radius;
                var r1; 
                var r2; 
                var r3; 
                var r4;
                  
                if (typeof r === 'number') {
                    r1 = r2 = r3 = r4 = r;
                }
                else if (r instanceof Array) {
                    if (r.length === 1) {
                        r1 = r2 = r3 = r4 = r[0];
                    }
                    else if (r.length === 2) {
                        r1 = r3 = r[0];
                        r2 = r4 = r[1];
                    }
                    else if (r.length === 3) {
                        r1 = r[0];
                        r2 = r4 = r[1];
                        r3 = r[2];
                    }
                    else {
                        r1 = r[0];
                        r2 = r[1];
                        r3 = r[2];
                        r4 = r[3];
                    }
                }
                else {
                    r1 = r2 = r3 = r4 = 0;
                }
                
                var total;
                if (r1 + r2 > width) {
                    total = r1 + r2;
                    r1 *= width / total;
                    r2 *= width / total;
                }
                if (r3 + r4 > width) {
                    total = r3 + r4;
                    r3 *= width / total;
                    r4 *= width / total;
                }
                if (r2 + r3 > height) {
                    total = r2 + r3;
                    r2 *= height / total;
                    r3 *= height / total;
                }
                if (r1 + r4 > height) {
                    total = r1 + r4;
                    r1 *= height / total;
                    r4 *= height / total;
                }
                ctx.moveTo(x + r1, y);
                ctx.lineTo(x + width - r2, y);
                r2 !== 0 && ctx.quadraticCurveTo(
                    x + width, y, x + width, y + r2
                );
                ctx.lineTo(x + width, y + height - r3);
                r3 !== 0 && ctx.quadraticCurveTo(
                    x + width, y + height, x + width - r3, y + height
                );
                ctx.lineTo(x + r4, y + height);
                r4 !== 0 && ctx.quadraticCurveTo(
                    x, y + height, x, y + height - r4
                );
                ctx.lineTo(x, y + r1);
                r1 !== 0 && ctx.quadraticCurveTo(x, y, x + r1, y);
            },
            
            /**
             * 创建矩形路径
             * @param {CanvasRenderingContext2D} ctx
             * @param {Object} style
             */
            buildPath : function (ctx, style) {
                if (!style.radius) {
                    ctx.moveTo(style.x, style.y);
                    ctx.lineTo(style.x + style.width, style.y);
                    ctx.lineTo(style.x + style.width, style.y + style.height);
                    ctx.lineTo(style.x, style.y + style.height);
                    ctx.lineTo(style.x, style.y);
                    // ctx.rect(style.x, style.y, style.width, style.height);
                }
                else {
                    this._buildRadiusPath(ctx, style);
                }
                return;
            },

            /**
             * 计算返回矩形包围盒矩阵
             * @param {module:zrender/shape/Rectangle~IRectangleStyle} style
             * @return {module:zrender/shape/Base~IBoundingRect}
             */
            getRect : function(style) {
                if (style.__rect) {
                    return style.__rect;
                }
                
                var lineWidth;
                if (style.brushType == 'stroke' || style.brushType == 'fill') {
                    lineWidth = style.lineWidth || 1;
                }
                else {
                    lineWidth = 0;
                }
                style.__rect = {
                    x : Math.round(style.x - lineWidth / 2),
                    y : Math.round(style.y - lineWidth / 2),
                    width : style.width + lineWidth,
                    height : style.height + lineWidth
                };
                
                return style.__rect;
            }
        };

        require('../tool/util').inherits(Rectangle, Base);
        return Rectangle;
    }
);

/**
 * zrender: loading特效类
 *
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *         errorrik (errorrik@gmail.com)
 */

define(
    'zrender/loadingEffect/Base',['require','../tool/util','../shape/Text','../shape/Rectangle'],function(require) {
        var util = require('../tool/util');
        var TextShape = require('../shape/Text');
        var RectangleShape = require('../shape/Rectangle');


        var DEFAULT_TEXT = 'Loading...';
        var DEFAULT_TEXT_FONT = 'normal 16px Arial';

        /**
         * @constructor
         * 
         * @param {Object} options 选项
         * @param {color} options.backgroundColor 背景颜色
         * @param {Object} options.textStyle 文字样式，同shape/text.style
         * @param {number=} options.progress 进度参数，部分特效有用
         * @param {Object=} options.effect 特效参数，部分特效有用
         * 
         * {
         *     effect,
         *     //loading话术
         *     text:'',
         *     // 水平安放位置，默认为 'center'，可指定x坐标
         *     x:'center' || 'left' || 'right' || {number},
         *     // 垂直安放位置，默认为'top'，可指定y坐标
         *     y:'top' || 'bottom' || {number},
         *
         *     textStyle:{
         *         textFont: 'normal 20px Arial' || {textFont}, //文本字体
         *         color: {color}
         *     }
         * }
         */
        function Base(options) {
            this.setOptions(options);
        }

        /**
         * 创建loading文字图形
         * 
         * @param {Object} textStyle 文字style，同shape/text.style
         */
        Base.prototype.createTextShape = function (textStyle) {
            return new TextShape({
                highlightStyle : util.merge(
                    {
                        x : this.canvasWidth / 2,
                        y : this.canvasHeight / 2,
                        text : DEFAULT_TEXT,
                        textAlign : 'center',
                        textBaseline : 'middle',
                        textFont : DEFAULT_TEXT_FONT,
                        color: '#333',
                        brushType : 'fill'
                    },
                    textStyle,
                    true
                )
            });
        };
        
        /**
         * 获取loading背景图形
         * 
         * @param {color} color 背景颜色
         */
        Base.prototype.createBackgroundShape = function (color) {
            return new RectangleShape({
                highlightStyle : {
                    x : 0,
                    y : 0,
                    width : this.canvasWidth,
                    height : this.canvasHeight,
                    brushType : 'fill',
                    color : color
                }
            });
        };

        Base.prototype.start = function (painter) {
            this.canvasWidth = painter._width;
            this.canvasHeight = painter._height;

            function addShapeHandle(param) {
                painter.storage.addHover(param);
            }
            function refreshHandle() {
                painter.refreshHover();
            }
            this.loadingTimer = this._start(addShapeHandle, refreshHandle);
        };

        Base.prototype._start = function (/*addShapeHandle, refreshHandle*/) {
            return setInterval(function () {
            }, 10000);
        };

        Base.prototype.stop = function () {
            clearInterval(this.loadingTimer);
        };

        Base.prototype.setOptions = function (options) {
            this.options = options || {};
        };
        
        Base.prototype.adjust = function (value, region) {
            if (value <= region[0]) {
                value = region[0];
            }
            else if (value >= region[1]) {
                value = region[1];
            }
            return value;
        };
        
        Base.prototype.getLocation = function(loc, totalWidth, totalHeight) {
            var x = loc.x != null ? loc.x : 'center';
            switch (x) {
                case 'center' :
                    x = Math.floor((this.canvasWidth - totalWidth) / 2);
                    break;
                case 'left' :
                    x = 0;
                    break;
                case 'right' :
                    x = this.canvasWidth - totalWidth;
                    break;
            }
            var y = loc.y != null ? loc.y : 'center';
            switch (y) {
                case 'center' :
                    y = Math.floor((this.canvasHeight - totalHeight) / 2);
                    break;
                case 'top' :
                    y = 0;
                    break;
                case 'bottom' :
                    y = this.canvasHeight - totalHeight;
                    break;
            }
            return {
                x : x,
                y : y,
                width : totalWidth,
                height : totalHeight
            };
        };

        return Base;
    }
);

/**
 * 图片绘制
 * @module zrender/shape/Image
 * @author pissang(https://www.github.com/pissang)
 * @example
 *     var ImageShape = require('zrender/shape/Image');
 *     var image = new ImageShape({
 *         style: {
 *             image: 'test.jpg',
 *             x: 100,
 *             y: 100
 *         }
 *     });
 *     zr.addShape(image);
 */

/**
 * @typedef {Object} IImageStyle
 * @property {string|HTMLImageElement|HTMLCanvasElement} image 图片url或者图片对象
 * @property {number} x 左上角横坐标
 * @property {number} y 左上角纵坐标
 * @property {number} [width] 绘制到画布上的宽度，默认为图片宽度
 * @property {number} [height] 绘制到画布上的高度，默认为图片高度
 * @property {number} [sx=0] 从图片中裁剪的左上角横坐标
 * @property {number} [sy=0] 从图片中裁剪的左上角纵坐标
 * @property {number} [sWidth] 从图片中裁剪的宽度，默认为图片高度
 * @property {number} [sHeight] 从图片中裁剪的高度，默认为图片高度
 * @property {number} [opacity=1] 绘制透明度
 * @property {number} [shadowBlur=0] 阴影模糊度，大于0有效
 * @property {string} [shadowColor='#000000'] 阴影颜色
 * @property {number} [shadowOffsetX=0] 阴影横向偏移
 * @property {number} [shadowOffsetY=0] 阴影纵向偏移
 * @property {string} [text] 图形中的附加文本
 * @property {string} [textColor='#000000'] 文本颜色
 * @property {string} [textFont] 附加文本样式，eg:'bold 18px verdana'
 * @property {string} [textPosition='end'] 附加文本位置, 可以是 inside, left, right, top, bottom
 * @property {string} [textAlign] 默认根据textPosition自动设置，附加文本水平对齐。
 *                                可以是start, end, left, right, center
 * @property {string} [textBaseline] 默认根据textPosition自动设置，附加文本垂直对齐。
 *                                可以是top, bottom, middle, alphabetic, hanging, ideographic
 */
define(
    'zrender/shape/Image',['require','./Base','../tool/util'],function (require) {

        var _needsRefresh = [];
        var _refreshTimeout;

        var Base = require('./Base');

        /**
         * @alias zrender/shape/Image
         * @constructor
         * @extends module:zrender/shape/Base
         * @param {Object} options
         */
        var ZImage = function(options) {
            Base.call(this, options);

            this._imageCache = {};
            /**
             * 图片绘制样式
             * @name module:zrender/shape/Image#style
             * @type {module:zrender/shape/Image~IImageStyle}
             */
            /**
             * 图片高亮绘制样式
             * @name module:zrender/shape/Image#highlightStyle
             * @type {module:zrender/shape/Image~IImageStyle}
             */
        };

        ZImage.prototype = {
            
            type: 'image',

            brush : function(ctx, isHighlight, refresh) {
                var style = this.style || {};

                if (isHighlight) {
                    // 根据style扩展默认高亮样式
                    style = this.getHighlightStyle(
                        style, this.highlightStyle || {}
                    );
                }

                var image = style.image;
                var me = this;

                if (typeof(image) === 'string') {
                    var src = image;
                    if (this._imageCache[src]) {
                        image = this._imageCache[src];
                    } else {
                        image = new Image();
                        image.onload = function () {
                            image.onload = null;
                            clearTimeout(_refreshTimeout);
                            _needsRefresh.push(me);
                            // 防止因为缓存短时间内触发多次onload事件
                            _refreshTimeout = setTimeout(function () {
                                refresh && refresh(_needsRefresh);
                                // 清空needsRefresh
                                _needsRefresh = [];
                            }, 10);
                        };

                        image.src = src;
                        this._imageCache[src] = image;
                    }
                }
                if (image) {
                    // 图片已经加载完成
                    if (image.nodeName.toUpperCase() == 'IMG') {
                        if (window.ActiveXObject) {
                            if (image.readyState != 'complete') {
                                return;
                            }
                        }
                        else {
                            if (!image.complete) {
                                return;
                            }
                        }
                    }
                    // Else is canvas
                    var width = style.width || image.width;
                    var height = style.height || image.height;
                    var x = style.x;
                    var y = style.y;
                    
                    // 图片加载失败
                    if (!image.width || !image.height) {
                        return;
                    }

                    ctx.save();
                    this.setContext(ctx, style);

                    // 设置transform
                    this.setTransform(ctx);

                    if (style.sWidth && style.sHeight) {
                        var sx = style.sx || 0;
                        var sy = style.sy || 0;
                        ctx.drawImage(
                            image,
                            sx, sy, style.sWidth, style.sHeight,
                            x, y, width, height
                        );
                    }
                    else if (style.sx && style.sy) {
                        var sx = style.sx;
                        var sy = style.sy;
                        var sWidth = width - sx;
                        var sHeight = height - sy;
                        ctx.drawImage(
                            image,
                            sx, sy, sWidth, sHeight,
                            x, y, width, height
                        );
                    }
                    else {
                        ctx.drawImage(image, x, y, width, height);
                    }
                    // 如果没设置宽和高的话自动根据图片宽高设置
                    if (!style.width) {
                        style.width = width;
                    }
                    if (!style.height) {
                        style.height = height;
                    }
                    if (!this.style.width) {
                        this.style.width = width;
                    }
                    if (!this.style.height) {
                        this.style.height = height;
                    }

                    this.drawText(ctx, style, this.style);

                    ctx.restore();
                }
            },

            /**
             * 计算返回图片的包围盒矩形
             * @param {module:zrender/shape/Image~IImageStyle} style
             * @return {module:zrender/shape/Base~IBoundingRect}
             */
            getRect: function(style) {
                return {
                    x : style.x,
                    y : style.y,
                    width : style.width,
                    height : style.height
                };
            },

            clearCache: function() {
                this._imageCache = {};
            }
        };

        require('../tool/util').inherits(ZImage, Base);
        return ZImage;
    }
);

/**
 * Painter绘图模块
 * @module zrender/Painter
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 *         errorrik (errorrik@gmail.com)
 *         pissang (https://www.github.com/pissang)
 */
 define(
    'zrender/Painter',['require','./config','./tool/util','./tool/log','./tool/matrix','./loadingEffect/Base','./mixin/Transformable','./shape/Image'],function (require) {
        'use strict';

        var config = require('./config');
        var util = require('./tool/util');
        // var vec2 = require('./tool/vector');
        var log = require('./tool/log');
        var matrix = require('./tool/matrix');
        var BaseLoadingEffect = require('./loadingEffect/Base');
        var Transformable = require('./mixin/Transformable');

        // retina 屏幕优化
        var devicePixelRatio = window.devicePixelRatio || 1;
        devicePixelRatio = Math.max(devicePixelRatio, 1);
        var vmlCanvasManager = window['G_vmlCanvasManager'];

        
        // 返回false的方法，用于避免页面被选中
        function returnFalse() {
            return false;
        }

        // 什么都不干的空方法
        function doNothing() {}

        /**
         * @alias module:zrender/Painter
         * @constructor
         * @param {HTMLElement} root 绘图容器
         * @param {module:zrender/Storage} storage
         */
        var Painter = function (root, storage) {
            /**
             * 绘图容器
             * @type {HTMLElement}
             */
            this.root = root;
            /**
             * @type {module:zrender/Storage}
             */
            this.storage = storage;

            root.innerHTML = '';
            this._width = this._getWidth(); // 宽，缓存记录
            this._height = this._getHeight(); // 高，缓存记录

            var domRoot = document.createElement('div');
            this._domRoot = domRoot;

            // domRoot.onselectstart = returnFalse; // 避免页面选中的尴尬
            domRoot.style.position = 'relative';
            domRoot.style.overflow = 'hidden';
            domRoot.style.width = this._width + 'px';
            domRoot.style.height = this._height + 'px';
            root.appendChild(domRoot);

            this._layers = {};

            this._layerConfig = {};

            this._loadingEffect = new BaseLoadingEffect({});
            this.shapeToImage = this._createShapeToImageProcessor();

            // 创建各层canvas
            // 背景
            this._bgDom = createDom('bg', 'div', this);
            domRoot.appendChild(this._bgDom);
            this._bgDom.onselectstart = returnFalse;
            this._bgDom.style['-webkit-user-select'] = 'none';
            this._bgDom.style['user-select'] = 'none';
            // this._bgDom.style[' -webkit-touch-callout'] = 'none';

            // 高亮
            var hoverLayer = new Layer('_zrender_hover_', this);
            this._layers['hover'] = hoverLayer;
            domRoot.appendChild(hoverLayer.dom);
            hoverLayer.initContext();

            hoverLayer.dom.onselectstart = returnFalse;
            hoverLayer.dom.style['-webkit-user-select'] = 'none';
            hoverLayer.dom.style['user-select'] = 'none';
            // hoverLayer.dom.style[' -webkit-touch-callout'] = 'none';

            var me = this;
            this.updatePainter = function (shapeList, callback) {
                me.refreshShapes(shapeList, callback);
            };
        };

        /**
         * 首次绘图，创建各种dom和context
         * 
         * @param {Function} callback 绘画结束后的回调函数
         */
        Painter.prototype.render = function (callback) {
            if (this.isLoading()) {
                this.hideLoading();
            }
            // TODO
            this.refresh(callback, true);

            return this;
        };

        /**
         * 刷新
         * @param {Function} callback 刷新结束后的回调函数
         * @param {boolean} paintAll 强制绘制所有shape
         */
        Painter.prototype.refresh = function (callback, paintAll) {
            var list = this.storage.getShapeList(true);
            this._paintList(list, paintAll);

            if (typeof callback == 'function') {
                callback();
            }

            return this;
        };

        Painter.prototype._paintList = function (list, paintAll) {

            if (typeof(paintAll) == 'undefined') {
                paintAll = false;
            }

            this._updateLayerStatus(list);

            var currentLayer;
            var currentZLevel;
            var ctx;

            for (var id in this._layers) {
                if (id !== 'hover') {
                    this._layers[id].unusedCount++;
                    this._layers[id].updateTransform();
                }
            }

            var invTransform = [];

            for (var i = 0, l = list.length; i < l; i++) {
                var shape = list[i];

                if (currentZLevel !== shape.zlevel) {
                    if (currentLayer && currentLayer.needTransform) {
                        ctx.restore();
                    }

                    currentLayer = this.getLayer(shape.zlevel, currentLayer);
                    ctx = currentLayer.ctx;
                    currentZLevel = shape.zlevel;

                    // Reset the count
                    currentLayer.unusedCount = 0;

                    if (currentLayer.dirty || paintAll) {
                        currentLayer.clear();
                    }

                    if (currentLayer.needTransform) {
                        ctx.save();
                        currentLayer.setTransform(ctx);
                    }
                }

                // Start group clipping
                if (shape.__startClip && !vmlCanvasManager) {
                    var clipShape = shape.__startClip;
                    ctx.save();
                    // Set transform
                    if (clipShape.needTransform) {
                        var m = clipShape.transform;
                        matrix.invert(invTransform, m);
                        ctx.transform(
                            m[0], m[1],
                            m[2], m[3],
                            m[4], m[5]
                        );
                    }

                    ctx.beginPath();
                    clipShape.buildPath(ctx, clipShape.style);
                    ctx.clip();

                    // Transform back
                    if (clipShape.needTransform) {
                        var m = invTransform;
                        ctx.transform(
                            m[0], m[1],
                            m[2], m[3],
                            m[4], m[5]
                        );
                    }
                }

                if ((currentLayer.dirty || paintAll) && !shape.invisible) {
                    if (
                        !shape.onbrush
                        || (shape.onbrush && !shape.onbrush(ctx, false))
                    ) {
                        if (config.catchBrushException) {
                            try {
                                shape.brush(ctx, false, this.updatePainter);
                            }
                            catch (error) {
                                log(
                                    error,
                                    'brush error of ' + shape.type,
                                    shape
                                );
                            }
                        }
                        else {
                            shape.brush(ctx, false, this.updatePainter);
                        }
                    }
                }

                // Stop group clipping
                if (shape.__stopClip && !vmlCanvasManager) {
                    ctx.restore();
                }

                shape.__dirty = false;
            }

            if (currentLayer && currentLayer.needTransform) {
                ctx.restore();
            }

            for (var id in this._layers) {
                if (id !== 'hover') {
                    var layer = this._layers[id];
                    layer.dirty = false;
                    // 删除过期的层
                    // PENDING
                    // if (layer.unusedCount >= 500) {
                    //     this.delLayer(id);
                    // }
                    if (layer.unusedCount == 1) {
                        layer.clear();
                    }
                }
            }
        };

        /**
         * 获取 zlevel 所在层，如果不存在则会创建一个新的层
         * @param {number} zlevel
         * @param {module:zrender/Painter~Layer} [prevLayer]
         *        在需要创建新的层时需要使用，新创建层的dom节点会插在该层后面
         */
        Painter.prototype.getLayer = function (zlevel, prevLayer) {
            // Change draw layer
            var currentLayer = this._layers[zlevel];
            if (!currentLayer) {
                // Create a new layer
                currentLayer = new Layer(zlevel, this);
                var prevDom = prevLayer ? prevLayer.dom : this._bgDom;
                if (prevDom.nextSibling) {
                    prevDom.parentNode.insertBefore(
                        currentLayer.dom,
                        prevDom.nextSibling
                    );
                }
                else {
                    prevDom.parentNode.appendChild(
                        currentLayer.dom
                    );
                }
                currentLayer.initContext();
                
                this._layers[zlevel] = currentLayer;

                if (this._layerConfig[zlevel]) {
                    util.merge(currentLayer, this._layerConfig[zlevel], true);
                }

                currentLayer.updateTransform();
            }

            return currentLayer;
        };

        /**
         * 获取所有已创建的层
         * @param {Array.<module:zrender/Painter~Layer>} [prevLayer]
         */
        Painter.prototype.getLayers = function () {
            return this._layers;
        };

        Painter.prototype._updateLayerStatus = function (list) {
            
            var layers = this._layers;

            var elCounts = {};
            for (var z in layers) {
                if (z !== 'hover') {
                    elCounts[z] = layers[z].elCount;
                    layers[z].elCount = 0;
                }
            }

            for (var i = 0, l = list.length; i < l; i++) {
                var shape = list[i];
                var zlevel = shape.zlevel;
                var layer = layers[zlevel];
                if (layer) {
                    layer.elCount++;
                    // 已经被标记为需要刷新
                    if (layer.dirty) {
                        continue;
                    }
                    layer.dirty = shape.__dirty;
                }
            }

            // 层中的元素数量有发生变化
            for (var z in layers) {
                if (z !== 'hover') {
                    if (elCounts[z] !== layers[z].elCount) {
                        layers[z].dirty = true;
                    }
                }
            }
        };

        /**
         * 指定的图形列表
         * @param {Array.<module:zrender/shape/Base>} shapeList 需要更新的图形元素列表
         * @param {Function} [callback] 视图更新后回调函数
         */
        Painter.prototype.refreshShapes = function (shapeList, callback) {
            for (var i = 0, l = shapeList.length; i < l; i++) {
                var shape = shapeList[i];
                this.storage.mod(shape.id);
            }

            this.refresh(callback);
            return this;
        };

        /**
         * 设置loading特效
         * 
         * @param {Object} loadingEffect loading特效
         * @return {Painter}
         */
        Painter.prototype.setLoadingEffect = function (loadingEffect) {
            this._loadingEffect = loadingEffect;
            return this;
        };

        /**
         * 清除hover层外所有内容
         */
        Painter.prototype.clear = function () {
            for (var k in this._layers) {
                if (k == 'hover') {
                    continue;
                }
                this._layers[k].clear();
            }

            return this;
        };

        /**
         * 修改指定zlevel的绘制参数
         * 
         * @param {string} zlevel
         * @param {Object} config 配置对象
         * @param {string} [config.clearColor=0] 每次清空画布的颜色
         * @param {string} [config.motionBlur=false] 是否开启动态模糊
         * @param {number} [config.lastFrameAlpha=0.7]
         *                 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
         * @param {Array.<number>} [position] 层的平移
         * @param {Array.<number>} [rotation] 层的旋转
         * @param {Array.<number>} [scale] 层的缩放
         * @param {boolean} [zoomable=false] 层是否支持鼠标缩放操作
         * @param {boolean} [panable=false] 层是否支持鼠标平移操作
         */
        Painter.prototype.modLayer = function (zlevel, config) {
            if (config) {
                if (!this._layerConfig[zlevel]) {
                    this._layerConfig[zlevel] = config;
                }
                else {
                    util.merge(this._layerConfig[zlevel], config, true);
                }

                var layer = this._layers[zlevel];

                if (layer) {
                    util.merge(layer, this._layerConfig[zlevel], true);
                }
            }
        };

        /**
         * 删除指定层
         * @param {number} zlevel 层所在的zlevel
         */
        Painter.prototype.delLayer = function (zlevel) {
            var layer = this._layers[zlevel];
            if (!layer) {
                return;
            }
            // Save config
            this.modLayer(zlevel, {
                position: layer.position,
                rotation: layer.rotation,
                scale: layer.scale
            });
            layer.dom.parentNode.removeChild(layer.dom);
            delete this._layers[zlevel];
        };

        /**
         * 刷新hover层
         */
        Painter.prototype.refreshHover = function () {
            this.clearHover();
            var list = this.storage.getHoverShapes(true);
            for (var i = 0, l = list.length; i < l; i++) {
                this._brushHover(list[i]);
            }
            this.storage.delHover();

            return this;
        };

        /**
         * 清除hover层所有内容
         */
        Painter.prototype.clearHover = function () {
            var hover = this._layers.hover;
            hover && hover.clear();

            return this;
        };

        /**
         * 显示loading
         * 
         * @param {Object=} loadingEffect loading效果对象
         */
        Painter.prototype.showLoading = function (loadingEffect) {
            this._loadingEffect && this._loadingEffect.stop();
            loadingEffect && this.setLoadingEffect(loadingEffect);
            this._loadingEffect.start(this);
            this.loading = true;

            return this;
        };

        /**
         * loading结束
         */
        Painter.prototype.hideLoading = function () {
            this._loadingEffect.stop();

            this.clearHover();
            this.loading = false;
            return this;
        };

        /**
         * loading结束判断
         */
        Painter.prototype.isLoading = function () {
            return this.loading;
        };

        /**
         * 区域大小变化后重绘
         */
        Painter.prototype.resize = function () {
            var domRoot = this._domRoot;
            domRoot.style.display = 'none';

            var width = this._getWidth();
            var height = this._getHeight();

            domRoot.style.display = '';

            // 优化没有实际改变的resize
            if (this._width != width || height != this._height) {
                this._width = width;
                this._height = height;

                domRoot.style.width = width + 'px';
                domRoot.style.height = height + 'px';

                for (var id in this._layers) {

                    this._layers[id].resize(width, height);
                }

                this.refresh(null, true);
            }

            return this;
        };

        /**
         * 清除单独的一个层
         * @param {number} zLevel
         */
        Painter.prototype.clearLayer = function (zLevel) {
            var layer = this._layers[zLevel];
            if (layer) {
                layer.clear();
            }
        };

        /**
         * 释放
         */
        Painter.prototype.dispose = function () {
            if (this.isLoading()) {
                this.hideLoading();
            }

            this.root.innerHTML = '';

            this.root =
            this.storage =

            this._domRoot = 
            this._layers = null;
        };

        Painter.prototype.getDomHover = function () {
            return this._layers.hover.dom;
        };

        /**
         * 图像导出
         * @param {string} type
         * @param {string} [backgroundColor='#fff'] 背景色
         * @return {string} 图片的Base64 url
         */
        Painter.prototype.toDataURL = function (type, backgroundColor, args) {
            if (vmlCanvasManager) {
                return null;
            }

            var imageDom = createDom('image', 'canvas', this);
            this._bgDom.appendChild(imageDom);
            var ctx = imageDom.getContext('2d');
            devicePixelRatio != 1 
                && ctx.scale(devicePixelRatio, devicePixelRatio);
            
            ctx.fillStyle = backgroundColor || '#fff';
            ctx.rect(
                0, 0, 
                this._width * devicePixelRatio,
                this._height * devicePixelRatio
            );
            ctx.fill();
            
            var self = this;
            // 升序遍历，shape上的zlevel指定绘画图层的z轴层叠
            
            this.storage.iterShape(
                function (shape) {
                    if (!shape.invisible) {
                        if (!shape.onbrush // 没有onbrush
                            // 有onbrush并且调用执行返回false或undefined则继续粉刷
                            || (shape.onbrush && !shape.onbrush(ctx, false))
                        ) {
                            if (config.catchBrushException) {
                                try {
                                    shape.brush(ctx, false, self.updatePainter);
                                }
                                catch (error) {
                                    log(
                                        error,
                                        'brush error of ' + shape.type,
                                        shape
                                    );
                                }
                            }
                            else {
                                shape.brush(ctx, false, self.updatePainter);
                            }
                        }
                    }
                },
                { normal: 'up', update: true }
            );
            var image = imageDom.toDataURL(type, args); 
            ctx = null;
            this._bgDom.removeChild(imageDom);
            return image;
        };

        /**
         * 获取绘图区域宽度
         */
        Painter.prototype.getWidth = function () {
            return this._width;
        };

        /**
         * 获取绘图区域高度
         */
        Painter.prototype.getHeight = function () {
            return this._height;
        };

        Painter.prototype._getWidth = function () {
            var root = this.root;
            var stl = root.currentStyle
                      || document.defaultView.getComputedStyle(root);

            return ((root.clientWidth || parseInt(stl.width, 10))
                    - parseInt(stl.paddingLeft, 10) // 请原谅我这比较粗暴
                    - parseInt(stl.paddingRight, 10)).toFixed(0) - 0;
        };

        Painter.prototype._getHeight = function () {
            var root = this.root;
            var stl = root.currentStyle
                      || document.defaultView.getComputedStyle(root);

            return ((root.clientHeight || parseInt(stl.height, 10))
                    - parseInt(stl.paddingTop, 10) // 请原谅我这比较粗暴
                    - parseInt(stl.paddingBottom, 10)).toFixed(0) - 0;
        };

        Painter.prototype._brushHover = function (shape) {
            var ctx = this._layers.hover.ctx;

            if (!shape.onbrush // 没有onbrush
                // 有onbrush并且调用执行返回false或undefined则继续粉刷
                || (shape.onbrush && !shape.onbrush(ctx, true))
            ) {
                var layer = this.getLayer(shape.zlevel);
                if (layer.needTransform) {
                    ctx.save();
                    layer.setTransform(ctx);
                }
                // Retina 优化
                if (config.catchBrushException) {
                    try {
                        shape.brush(ctx, true, this.updatePainter);
                    }
                    catch (error) {
                        log(
                            error, 'hoverBrush error of ' + shape.type, shape
                        );
                    }
                }
                else {
                    shape.brush(ctx, true, this.updatePainter);
                }
                if (layer.needTransform) {
                    ctx.restore();
                }
            }
        };

        Painter.prototype._shapeToImage = function (
            id, shape, width, height, devicePixelRatio
        ) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var devicePixelRatio = window.devicePixelRatio || 1;
            
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            canvas.setAttribute('width', width * devicePixelRatio);
            canvas.setAttribute('height', height * devicePixelRatio);

            ctx.clearRect(0, 0, width * devicePixelRatio, height * devicePixelRatio);

            var shapeTransform = {
                position : shape.position,
                rotation : shape.rotation,
                scale : shape.scale
            };
            shape.position = [ 0, 0, 0 ];
            shape.rotation = 0;
            shape.scale = [ 1, 1 ];
            if (shape) {
                shape.brush(ctx, false);
            }

            var ImageShape = require('./shape/Image');
            var imgShape = new ImageShape({
                id : id,
                style : {
                    x : 0,
                    y : 0,
                    image : canvas
                }
            });

            if (shapeTransform.position != null) {
                imgShape.position = shape.position = shapeTransform.position;
            }

            if (shapeTransform.rotation != null) {
                imgShape.rotation = shape.rotation = shapeTransform.rotation;
            }

            if (shapeTransform.scale != null) {
                imgShape.scale = shape.scale = shapeTransform.scale;
            }

            return imgShape;
        };

        Painter.prototype._createShapeToImageProcessor = function () {
            if (vmlCanvasManager) {
                return doNothing;
            }

            var me = this;

            return function (id, e, width, height) {
                return me._shapeToImage(
                    id, e, width, height, devicePixelRatio
                );
            };
        };

        /**
         * 创建dom
         * 
         * @inner
         * @param {string} id dom id 待用
         * @param {string} type dom type，such as canvas, div etc.
         * @param {Painter} painter painter instance
         */
        function createDom(id, type, painter) {
            var newDom = document.createElement(type);
            var width = painter._width;
            var height = painter._height;

            // 没append呢，请原谅我这样写，清晰~
            newDom.style.position = 'absolute';
            newDom.style.left = 0;
            newDom.style.top = 0;
            newDom.style.width = width + 'px';
            newDom.style.height = height + 'px';
            newDom.setAttribute('width', width * devicePixelRatio);
            newDom.setAttribute('height', height * devicePixelRatio);

            // id不作为索引用，避免可能造成的重名，定义为私有属性
            newDom.setAttribute('data-zr-dom-id', id);
            return newDom;
        }

        /**
         * @alias module:zrender/Painter~Layer
         * @constructor
         * @extends module:zrender/mixin/Transformable
         * @param {string} id
         * @param {module:zrender/Painter} painter
         */
        var Layer = function(id, painter) {
            this.dom = createDom(id, 'canvas', painter);
            this.dom.onselectstart = returnFalse; // 避免页面选中的尴尬
            this.dom.style['-webkit-user-select'] = 'none';
            this.dom.style['user-select'] = 'none';
            // this.dom.style[' -webkit-touch-callout'] = 'none';
            vmlCanvasManager && vmlCanvasManager.initElement(this.dom);

            this.domBack = null;
            this.ctxBack = null;

            this.painter = painter;

            this.unusedCount = 0;

            this.config = null;

            this.dirty = true;

            this.elCount = 0;

            // Configs
            /**
             * 每次清空画布的颜色
             * @type {string}
             * @default 0
             */
            this.clearColor = 0;
            /**
             * 是否开启动态模糊
             * @type {boolean}
             * @default false
             */
            this.motionBlur = false;
            /**
             * 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
             * @type {number}
             * @default 0.7
             */
            this.lastFrameAlpha = 0.7;
            /**
             * 层是否支持鼠标平移操作
             * @type {boolean}
             * @default false
             */
            this.zoomable = false;
            /**
             * 层是否支持鼠标缩放操作
             * @type {boolean}
             * @default false
             */
            this.panable = false;

            this.maxZoom = Infinity;
            this.minZoom = 0;

            Transformable.call(this);
        };

        Layer.prototype.initContext = function () {
            this.ctx = this.dom.getContext('2d');
            if (devicePixelRatio != 1) { 
                this.ctx.scale(devicePixelRatio, devicePixelRatio);
            }
        };

        Layer.prototype.createBackBuffer = function () {
            if (vmlCanvasManager) { // IE 8- should not support back buffer
                return;
            }
            this.domBack = createDom('back-' + this.id, 'canvas', this.painter);
            this.ctxBack = this.domBack.getContext('2d');

            if (devicePixelRatio != 1) { 
                this.ctxBack.scale(devicePixelRatio, devicePixelRatio);
            }
        };

        /**
         * @param  {number} width
         * @param  {number} height
         */
        Layer.prototype.resize = function (width, height) {
            this.dom.style.width = width + 'px';
            this.dom.style.height = height + 'px';

            this.dom.setAttribute('width', width * devicePixelRatio);
            this.dom.setAttribute('height', height * devicePixelRatio);

            if (devicePixelRatio != 1) { 
                this.ctx.scale(devicePixelRatio, devicePixelRatio);
            }

            if (this.domBack) {
                this.domBack.setAttribute('width', width * devicePixelRatio);
                this.domBack.setAttribute('height', height * devicePixelRatio);

                if (devicePixelRatio != 1) { 
                    this.ctxBack.scale(devicePixelRatio, devicePixelRatio);
                }
            }
        };

        /**
         * 清空该层画布
         */
        Layer.prototype.clear = function () {
            var dom = this.dom;
            var ctx = this.ctx;
            var width = dom.width;
            var height = dom.height;

            var haveClearColor = this.clearColor && !vmlCanvasManager;
            var haveMotionBLur = this.motionBlur && !vmlCanvasManager;
            var lastFrameAlpha = this.lastFrameAlpha;

            if (haveMotionBLur) {
                if (!this.domBack) {
                    this.createBackBuffer();
                } 

                this.ctxBack.globalCompositeOperation = 'copy';
                this.ctxBack.drawImage(
                    dom, 0, 0,
                    width / devicePixelRatio,
                    height / devicePixelRatio
                );
            }

            if (haveClearColor) {
                ctx.save();
                ctx.fillStyle = this.config.clearColor;
                ctx.fillRect(
                    0, 0,
                    width / devicePixelRatio, 
                    height / devicePixelRatio
                );
                ctx.restore();
            }
            else {
                ctx.clearRect(
                    0, 0, 
                    width / devicePixelRatio,
                    height / devicePixelRatio
                );
            }

            if (haveMotionBLur) {
                var domBack = this.domBack;
                ctx.save();
                ctx.globalAlpha = lastFrameAlpha;
                ctx.drawImage(
                    domBack, 0, 0,
                    width / devicePixelRatio,
                    height / devicePixelRatio
                );
                ctx.restore();
            }
        };

        util.merge(Layer.prototype, Transformable.prototype);

        return Painter;
    }
);

/**
 * Group是一个容器，可以插入子节点，Group的变换也会被应用到子节点上
 * @module zrender/Group
 * @example
 *     var Group = require('zrender/Group');
 *     var Circle = require('zrender/shape/Circle');
 *     var g = new Group();
 *     g.position[0] = 100;
 *     g.position[1] = 100;
 *     g.addChild(new Circle({
 *         style: {
 *             x: 100,
 *             y: 100,
 *             r: 20,
 *             brushType: 'fill'
 *         }
 *     }));
 *     zr.addGroup(g);
 */
define('zrender/Group',['require','./tool/guid','./tool/util','./mixin/Transformable','./mixin/Eventful'],function(require) {

    var guid = require('./tool/guid');
    var util = require('./tool/util');

    var Transformable = require('./mixin/Transformable');
    var Eventful = require('./mixin/Eventful');

    /**
     * @alias module:zrender/Group
     * @constructor
     * @extends module:zrender/mixin/Transformable
     * @extends module:zrender/mixin/Eventful
     */
    var Group = function(options) {

        options = options || {};

        /**
         * Group id
         * @type {string}
         */
        this.id = options.id || guid();

        for (var key in options) {
            this[key] = options[key];
        }

        /**
         * @type {string}
         */
        this.type = 'group';

        /**
         * 用于裁剪的图形(shape)，所有 Group 内的图形在绘制时都会被这个图形裁剪
         * 该图形会继承Group的变换
         * @type {module:zrender/shape/Base}
         * @see http://www.w3.org/TR/2dcontext/#clipping-region
         */
        this.clipShape = null;

        this._children = [];

        this._storage = null;

        this.__dirty = true;

        // Mixin
        Transformable.call(this);
        Eventful.call(this);
    };

    /**
     * 是否忽略该 Group 及其所有子节点
     * @type {boolean}
     * @default false
     */
    Group.prototype.ignore = false;

    /**
     * 复制并返回一份新的包含所有儿子节点的数组
     * @return {Array.<module:zrender/Group|module:zrender/shape/Base>}
     */
    Group.prototype.children = function() {
        return this._children.slice();
    };

    /**
     * 获取指定 index 的儿子节点
     * @param  {number} idx
     * @return {module:zrender/Group|module:zrender/shape/Base}
     */
    Group.prototype.childAt = function(idx) {
        return this._children[idx];
    };

    /**
     * 添加子节点，可以是Shape或者Group
     * @param {module:zrender/Group|module:zrender/shape/Base} child
     */
    Group.prototype.addChild = function(child) {
        if (child == this) {
            return;
        }
        
        if (child.parent == this) {
            return;
        }
        if (child.parent) {
            child.parent.removeChild(child);
        }

        this._children.push(child);
        child.parent = this;

        if (this._storage && this._storage !== child._storage) {
            
            this._storage.addToMap(child);

            if (child instanceof Group) {
                child.addChildrenToStorage(this._storage);
            }
        }
    };

    /**
     * 移除子节点
     * @param {module:zrender/Group|module:zrender/shape/Base} child
     */
    Group.prototype.removeChild = function(child) {
        var idx = util.indexOf(this._children, child);

        this._children.splice(idx, 1);
        child.parent = null;

        if (child._storage) {
            
            this._storage.delFromMap(child.id);

            if (child instanceof Group) {
                child.delChildrenFromStorage(child._storage);
            }
        }
    };

    /**
     * 遍历所有子节点
     * @param  {Function} cb
     * @param  {}   context
     */
    Group.prototype.eachChild = function(cb, context) {
        var haveContext = !!context;
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            if (haveContext) {
                cb.call(context, child);
            } else {
                cb(child);
            }
        }
    };

    /**
     * 深度优先遍历所有子孙节点
     * @param  {Function} cb
     * @param  {}   context
     */
    Group.prototype.traverse = function(cb, context) {
        var haveContext = !!context;
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            if (haveContext) {
                cb.call(context, child);
            } else {
                cb(child);
            }

            if (child.type === 'group') {
                child.traverse(cb, context);
            }
        }
    };

    Group.prototype.addChildrenToStorage = function(storage) {
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            storage.addToMap(child);
            if (child.type === 'group') {
                child.addChildrenToStorage(storage);
            }
        }
    };

    Group.prototype.delChildrenFromStorage = function(storage) {
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            storage.delFromMap(child.id);
            if (child.type === 'group') {
                child.delChildrenFromStorage(storage);
            }
        }
    };

    Group.prototype.modSelf = function() {
        this.__dirty = true;
    }

    util.merge(Group.prototype, Transformable.prototype, true);
    util.merge(Group.prototype, Eventful.prototype, true);

    return Group;
});
/**
 * Storage内容仓库模块
 * @module zrender/Storage
 * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
 * @author errorrik (errorrik@gmail.com)
 * @author pissang (https://github.com/pissang/)
 */
define(
    'zrender/Storage',['require','./tool/util','./Group'],function (require) {

        'use strict';

        var util = require('./tool/util');

        var Group = require('./Group');

        var defaultIterateOption = {
            hover: false,
            normal: 'down',
            update: false
        };

        function shapeCompareFunc(a, b) {
            if (a.zlevel == b.zlevel) {
                if (a.z == b.z) {
                    return a.__renderidx - b.__renderidx;
                }
                return a.z - b.z;
            }
            return a.zlevel - b.zlevel;
        }
        /**
         * 内容仓库 (M)
         * @alias module:zrender/Storage
         * @constructor
         */
        var Storage = function () {
            // 所有常规形状，id索引的map
            this._elements = {};

            // 高亮层形状，不稳定，动态增删，数组位置也是z轴方向，靠前显示在下方
            this._hoverElements = [];

            this._roots = [];

            this._shapeList = [];

            this._shapeListOffset = 0;
        };

        /**
         * 遍历迭代器
         * 
         * @param {Function} fun 迭代回调函数，return true终止迭代
         * @param {Object} [option] 迭代参数，缺省为仅降序遍历普通层图形
         * @param {boolean} [option.hover=true] 是否是高亮层图形
         * @param {string} [option.normal='up'] 是否是普通层图形，迭代时是否指定及z轴顺序
         * @param {boolean} [option.update=false] 是否在迭代前更新形状列表
         * 
         */
        Storage.prototype.iterShape = function (fun, option) {
            if (!option) {
                option = defaultIterateOption;
            }

            if (option.hover) {
                // 高亮层数据遍历
                for (var i = 0, l = this._hoverElements.length; i < l; i++) {
                    var el = this._hoverElements[i];
                    el.updateTransform();
                    if (fun(el)) {
                        return this;
                    }
                }
            }

            if (option.update) {
                this.updateShapeList();
            }

            // 遍历: 'down' | 'up'
            switch (option.normal) {
                case 'down':
                    // 降序遍历，高层优先
                    var l = this._shapeList.length;
                    while (l--) {
                        if (fun(this._shapeList[l])) {
                            return this;
                        }
                    }
                    break;
                // case 'up':
                default:
                    // 升序遍历，底层优先
                    for (var i = 0, l = this._shapeList.length; i < l; i++) {
                        if (fun(this._shapeList[i])) {
                            return this;
                        }
                    }
                    break;
            }

            return this;
        };

        /**
         * 返回hover层的形状数组
         * @param  {boolean} [update=false] 是否在返回前更新图形的变换
         * @return {Array.<module:zrender/shape/Base>}
         */
        Storage.prototype.getHoverShapes = function (update) {
            if (update) {
                for (var i = 0, l = this._hoverElements.length; i < l; i++) {
                    this._hoverElements[i].updateTransform();
                }
            }
            return this._hoverElements;
        };

        /**
         * 返回所有图形的绘制队列
         * @param  {boolean} [update=false] 是否在返回前更新该数组
         * 详见{@link module:zrender/shape/Base.prototype.updateShapeList}
         * @return {Array.<module:zrender/shape/Base>}
         */
        Storage.prototype.getShapeList = function (update) {
            if (update) {
                this.updateShapeList();
            }
            return this._shapeList;
        };

        /**
         * 更新图形的绘制队列。
         * 每次绘制前都会调用，该方法会先深度优先遍历整个树，更新所有Group和Shape的变换并且把所有可见的Shape保存到数组中，
         * 最后根据绘制的优先级（zlevel > z > 插入顺序）排序得到绘制队列
         */
        Storage.prototype.updateShapeList = function () {
            this._shapeListOffset = 0;
            for (var i = 0, len = this._roots.length; i < len; i++) {
                var root = this._roots[i];
                this._updateAndAddShape(root);
            }
            this._shapeList.length = this._shapeListOffset;

            for (var i = 0, len = this._shapeList.length; i < len; i++) {
                this._shapeList[i].__renderidx = i;
            }

            this._shapeList.sort(shapeCompareFunc);
        };

        Storage.prototype._updateAndAddShape = function (el) {
            
            if (el.ignore) {
                return;
            }

            el.updateTransform();

            if (el.type == 'group') {
                
                if (el.clipShape) {
                    // clipShape 的变换是基于 group 的变换
                    el.clipShape.parent = el;
                    el.clipShape.updateTransform();

                    var startClipShape = el._children[0];
                    if (startClipShape) {
                        startClipShape.__startClip = el.clipShape;
                    }
                }

                for (var i = 0; i < el._children.length; i++) {
                    var child = el._children[i];

                    // Force to mark as dirty if group is dirty
                    child.__dirty = el.__dirty || child.__dirty;

                    this._updateAndAddShape(child);
                }

                if (el.clipShape) {
                    var stopClipShape = this._shapeList[this._shapeListOffset - 1];
                    if (stopClipShape) {
                        stopClipShape.__stopClip = true;
                    }
                }

                // Mark group clean here
                el.__dirty = false;
                
            }
            else {
                this._shapeList[this._shapeListOffset++] = el;
            }
        };

        /**
         * 修改图形(Shape)或者组(Group)
         * 
         * @param {string} elId 唯一标识
         * @param {Object} [params] 参数
         */
        Storage.prototype.mod = function (elId, params) {
            var el = this._elements[elId];
            if (el) {

                el.modSelf();

                if (params) {
                    // 如果第二个参数直接使用 shape
                    // parent, _storage, __startClip 三个属性会有循环引用
                    // 主要为了向 1.x 版本兼容，2.x 版本不建议使用第二个参数
                    if (params.parent || params._storage || params.__startClip) {
                        var target = {};
                        for (var name in params) {
                            if (
                                name == 'parent'
                                || name == '_storage'
                                || name == '__startClip'
                            ) {
                                continue;
                            }
                            if (params.hasOwnProperty(name)) {
                                target[name] = params[name];
                            }
                        }
                        util.merge(el, target, true);
                    }
                    else {
                        util.merge(el, params, true);
                    }
                }
            }

            return this;
        };

        /**
         * 移动指定的图形(Shape)或者组(Group)的位置
         * @param {string} shapeId 形状唯一标识
         * @param {number} dx
         * @param {number} dy
         */
        Storage.prototype.drift = function (shapeId, dx, dy) {
            var shape = this._elements[shapeId];
            if (shape) {
                shape.needTransform = true;
                if (!shape.ondrift // ondrift
                    // 有onbrush并且调用执行返回false或undefined则继续
                    || (shape.ondrift && !shape.ondrift(dx, dy))
                ) {
                    shape.drift(dx, dy);
                }
            }

            return this;
        };

        /**
         * 添加高亮层数据
         * 
         * @param {module:zrender/shape/Base} shape
         */
        Storage.prototype.addHover = function (shape) {
            shape.updateNeedTransform();
            this._hoverElements.push(shape);
            return this;
        };

        /**
         * 清空高亮层数据
         */
        Storage.prototype.delHover = function () {
            this._hoverElements = [];
            return this;
        };

        /**
         * 是否有图形在高亮层里
         * @return {boolean}
         */
        Storage.prototype.hasHoverShape = function () {
            return this._hoverElements.length > 0;
        };

        /**
         * 添加图形(Shape)或者组(Group)到根节点
         * @param {module:zrender/shape/Shape|module:zrender/Group} el
         */
        Storage.prototype.addRoot = function (el) {
            if (el instanceof Group) {
                el.addChildrenToStorage(this);
            }

            this.addToMap(el);
            this._roots.push(el);
        };

        /**
         * 删除指定的图形(Shape)或者组(Group)
         * @param  {string|Array.<string>} [elId] 如果为空清空整个Storage
         */
        Storage.prototype.delRoot = function (elId) {
            if (typeof(elId) == 'undefined') {
                // 不指定elId清空
                for (var i = 0; i < this._roots.length; i++) {
                    var root = this._roots[i];
                    if (root instanceof Group) {
                        root.delChildrenFromStorage(this);
                    }
                }

                this._elements = {};
                this._hoverElements = [];
                this._roots = [];

                return;
            }

            if (elId instanceof Array) {
                for (var i = 0, l = elId.length; i < l; i++) {
                    this.delRoot(elId[i]);
                }
                return;
            }

            var el;
            if (typeof(elId) == 'string') {
                el = this._elements[elId];
            }
            else {
                el = elId;
            }

            var idx = util.indexOf(this._roots, el);
            if (idx >= 0) {
                this.delFromMap(el.id);
                this._roots.splice(idx, 1);
                if (el instanceof Group) {
                    el.delChildrenFromStorage(this);
                }
            }
        };

        Storage.prototype.addToMap = function (el) {
            if (el instanceof Group) {
                el._storage = this;
            }
            el.modSelf();

            this._elements[el.id] = el;

            return this;
        };

        Storage.prototype.get = function (elId) {
            return this._elements[elId];
        };

        Storage.prototype.delFromMap = function (elId) {
            var el = this._elements[elId];
            if (el) {
                delete this._elements[elId];

                if (el instanceof Group) {
                    el._storage = null;
                }
            }

            return this;
        };


        /**
         * 清空并且释放Storage
         */
        Storage.prototype.dispose = function () {
            this._elements = 
            this._renderList = 
            this._roots =
            this._hoverElements = null;
        };

        return Storage;
    }
);

define(
    'zrender/animation/easing',[],function() {
        /**
         * 缓动代码来自 https://github.com/sole/tween.js/blob/master/src/Tween.js
         * @see http://sole.github.io/tween.js/examples/03_graphs.html
         * @exports zrender/animation/easing
         */
        var easing = {
            // 线性
            /**
             * @param {number} k
             * @return {number}
             */
            Linear: function (k) {
                return k;
            },

            // 二次方的缓动（t^2）
            /**
             * @param {number} k
             * @return {number}
             */
            QuadraticIn: function (k) {
                return k * k;
            },
            /**
             * @param {number} k
             * @return {number}
             */
            QuadraticOut: function (k) {
                return k * (2 - k);
            },
            /**
             * @param {number} k
             * @return {number}
             */
            QuadraticInOut: function (k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k;
                }
                return -0.5 * (--k * (k - 2) - 1);
            },

            // 三次方的缓动（t^3）
            /**
             * @param {number} k
             * @return {number}
             */
            CubicIn: function (k) {
                return k * k * k;
            },
            /**
             * @param {number} k
             * @return {number}
             */
            CubicOut: function (k) {
                return --k * k * k + 1;
            },
            /**
             * @param {number} k
             * @return {number}
             */
            CubicInOut: function (k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k * k;
                }
                return 0.5 * ((k -= 2) * k * k + 2);
            },

            // 四次方的缓动（t^4）
            /**
             * @param {number} k
             * @return {number}
             */
            QuarticIn: function (k) {
                return k * k * k * k;
            },
            /**
             * @param {number} k
             * @return {number}
             */
            QuarticOut: function (k) {
                return 1 - (--k * k * k * k);
            },
            /**
             * @param {number} k
             * @return {number}
             */
            QuarticInOut: function (k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k * k * k;
                }
                return -0.5 * ((k -= 2) * k * k * k - 2);
            },

            // 五次方的缓动（t^5）
            /**
             * @param {number} k
             * @return {number}
             */
            QuinticIn: function (k) {
                return k * k * k * k * k;
            },
            /**
             * @param {number} k
             * @return {number}
             */
            QuinticOut: function (k) {
                return --k * k * k * k * k + 1;
            },
            /**
             * @param {number} k
             * @return {number}
             */
            QuinticInOut: function (k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k * k * k * k;
                }
                return 0.5 * ((k -= 2) * k * k * k * k + 2);
            },

            // 正弦曲线的缓动（sin(t)）
            /**
             * @param {number} k
             * @return {number}
             */
            SinusoidalIn: function (k) {
                return 1 - Math.cos(k * Math.PI / 2);
            },
            /**
             * @param {number} k
             * @return {number}
             */
            SinusoidalOut: function (k) {
                return Math.sin(k * Math.PI / 2);
            },
            /**
             * @param {number} k
             * @return {number}
             */
            SinusoidalInOut: function (k) {
                return 0.5 * (1 - Math.cos(Math.PI * k));
            },

            // 指数曲线的缓动（2^t）
            /**
             * @param {number} k
             * @return {number}
             */
            ExponentialIn: function (k) {
                return k === 0 ? 0 : Math.pow(1024, k - 1);
            },
            /**
             * @param {number} k
             * @return {number}
             */
            ExponentialOut: function (k) {
                return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
            },
            /**
             * @param {number} k
             * @return {number}
             */
            ExponentialInOut: function (k) {
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                if ((k *= 2) < 1) {
                    return 0.5 * Math.pow(1024, k - 1);
                }
                return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
            },

            // 圆形曲线的缓动（sqrt(1-t^2)）
            /**
             * @param {number} k
             * @return {number}
             */
            CircularIn: function (k) {
                return 1 - Math.sqrt(1 - k * k);
            },
            /**
             * @param {number} k
             * @return {number}
             */
            CircularOut: function (k) {
                return Math.sqrt(1 - (--k * k));
            },
            /**
             * @param {number} k
             * @return {number}
             */
            CircularInOut: function (k) {
                if ((k *= 2) < 1) {
                    return -0.5 * (Math.sqrt(1 - k * k) - 1);
                }
                return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
            },

            // 创建类似于弹簧在停止前来回振荡的动画
            /**
             * @param {number} k
             * @return {number}
             */
            ElasticIn: function (k) {
                var s; 
                var a = 0.1;
                var p = 0.4;
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                if (!a || a < 1) {
                    a = 1; s = p / 4;
                }
                else {
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                }
                return -(a * Math.pow(2, 10 * (k -= 1)) *
                            Math.sin((k - s) * (2 * Math.PI) / p));
            },
            /**
             * @param {number} k
             * @return {number}
             */
            ElasticOut: function (k) {
                var s;
                var a = 0.1;
                var p = 0.4;
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                if (!a || a < 1) {
                    a = 1; s = p / 4;
                }
                else {
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                }
                return (a * Math.pow(2, -10 * k) *
                        Math.sin((k - s) * (2 * Math.PI) / p) + 1);
            },
            /**
             * @param {number} k
             * @return {number}
             */
            ElasticInOut: function (k) {
                var s;
                var a = 0.1;
                var p = 0.4;
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                if (!a || a < 1) {
                    a = 1; s = p / 4;
                }
                else {
                    s = p * Math.asin(1 / a) / (2 * Math.PI);
                }
                if ((k *= 2) < 1) {
                    return -0.5 * (a * Math.pow(2, 10 * (k -= 1))
                        * Math.sin((k - s) * (2 * Math.PI) / p));
                }
                return a * Math.pow(2, -10 * (k -= 1))
                        * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

            },

            // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
            /**
             * @param {number} k
             * @return {number}
             */
            BackIn: function (k) {
                var s = 1.70158;
                return k * k * ((s + 1) * k - s);
            },
            /**
             * @param {number} k
             * @return {number}
             */
            BackOut: function (k) {
                var s = 1.70158;
                return --k * k * ((s + 1) * k + s) + 1;
            },
            /**
             * @param {number} k
             * @return {number}
             */
            BackInOut: function (k) {
                var s = 1.70158 * 1.525;
                if ((k *= 2) < 1) {
                    return 0.5 * (k * k * ((s + 1) * k - s));
                }
                return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
            },

            // 创建弹跳效果
            /**
             * @param {number} k
             * @return {number}
             */
            BounceIn: function (k) {
                return 1 - easing.BounceOut(1 - k);
            },
            /**
             * @param {number} k
             * @return {number}
             */
            BounceOut: function (k) {
                if (k < (1 / 2.75)) {
                    return 7.5625 * k * k;
                }
                else if (k < (2 / 2.75)) {
                    return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
                }
                else if (k < (2.5 / 2.75)) {
                    return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
                }
                else {
                    return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
                }
            },
            /**
             * @param {number} k
             * @return {number}
             */
            BounceInOut: function (k) {
                if (k < 0.5) {
                    return easing.BounceIn(k * 2) * 0.5;
                }
                return easing.BounceOut(k * 2 - 1) * 0.5 + 0.5;
            }
        };

        return easing;
    }
);


/**
 * 动画主控制器
 * @config target 动画对象，可以是数组，如果是数组的话会批量分发onframe等事件
 * @config life(1000) 动画时长
 * @config delay(0) 动画延迟时间
 * @config loop(true)
 * @config gap(0) 循环的间隔时间
 * @config onframe
 * @config easing(optional)
 * @config ondestroy(optional)
 * @config onrestart(optional)
 */
define(
    'zrender/animation/Clip',['require','./easing'],function(require) {

        var Easing = require('./easing');

        function Clip(options) {

            this._targetPool = options.target || {};
            if (!(this._targetPool instanceof Array)) {
                this._targetPool = [ this._targetPool ];
            }

            // 生命周期
            this._life = options.life || 1000;
            // 延时
            this._delay = options.delay || 0;
            // 开始时间
            this._startTime = new Date().getTime() + this._delay;// 单位毫秒

            // 结束时间
            this._endTime = this._startTime + this._life * 1000;

            // 是否循环
            this.loop = typeof options.loop == 'undefined'
                        ? false : options.loop;

            this.gap = options.gap || 0;

            this.easing = options.easing || 'Linear';

            this.onframe = options.onframe;
            this.ondestroy = options.ondestroy;
            this.onrestart = options.onrestart;
        }

        Clip.prototype = {
            step : function (time) {
                var percent = (time - this._startTime) / this._life;

                // 还没开始
                if (percent < 0) {
                    return;
                }

                percent = Math.min(percent, 1);

                var easingFunc = typeof this.easing == 'string'
                                 ? Easing[this.easing]
                                 : this.easing;
                var schedule = typeof easingFunc === 'function'
                    ? easingFunc(percent)
                    : percent;

                this.fire('frame', schedule);

                // 结束
                if (percent == 1) {
                    if (this.loop) {
                        this.restart();
                        // 重新开始周期
                        // 抛出而不是直接调用事件直到 stage.update 后再统一调用这些事件
                        return 'restart';

                    }
                    
                    // 动画完成将这个控制器标识为待删除
                    // 在Animation.update中进行批量删除
                    this._needsRemove = true;
                    return 'destroy';
                }
                
                return null;
            },
            restart : function() {
                var time = new Date().getTime();
                var remainder = (time - this._startTime) % this._life;
                this._startTime = new Date().getTime() - remainder + this.gap;
            },
            fire : function(eventType, arg) {
                for (var i = 0, len = this._targetPool.length; i < len; i++) {
                    if (this['on' + eventType]) {
                        this['on' + eventType](this._targetPool[i], arg);
                    }
                }
            },
            constructor: Clip
        };

        return Clip;
    }
);

/**
 * 动画主类, 调度和管理所有动画控制器
 * 
 * @module zrender/animation/Animation
 * @author pissang(https://github.com/pissang)
 */
define(
    'zrender/animation/Animation',['require','./Clip','../tool/color','../tool/util','../tool/event'],function(require) {
        
        'use strict';

        var Clip = require('./Clip');
        var color = require('../tool/color');
        var util = require('../tool/util');
        var Dispatcher = require('../tool/event').Dispatcher;

        var requestAnimationFrame = window.requestAnimationFrame
                                    || window.msRequestAnimationFrame
                                    || window.mozRequestAnimationFrame
                                    || window.webkitRequestAnimationFrame
                                    || function (func) {
                                        setTimeout(func, 16);
                                    };

        var arraySlice = Array.prototype.slice;

        /**
         * @typedef {Object} IZRenderStage
         * @property {Function} update
         */
        
        /** 
         * @alias module:zrender/animation/Animation
         * @constructor
         * @param {Object} [options]
         * @param {Function} [options.onframe]
         * @param {IZRenderStage} [options.stage]
         * @example
         *     var animation = new Animation();
         *     var obj = {
         *         x: 100,
         *         y: 100
         *     };
         *     animation.animate(node.position)
         *         .when(1000, {
         *             x: 500,
         *             y: 500
         *         })
         *         .when(2000, {
         *             x: 100,
         *             y: 100
         *         })
         *         .start('spline');
         */
        var Animation = function (options) {

            options = options || {};

            this.stage = options.stage || {};

            this.onframe = options.onframe || function() {};

            // private properties
            this._clips = [];

            this._running = false;

            this._time = 0;

            Dispatcher.call(this);
        };

        Animation.prototype = {
            /**
             * 添加动画片段
             * @param {module:zrender/animation/Clip} clip
             */
            add: function(clip) {
                this._clips.push(clip);
            },
            /**
             * 删除动画片段
             * @param {module:zrender/animation/Clip} clip
             */
            remove: function(clip) {
                var idx = util.indexOf(this._clips, clip);
                if (idx >= 0) {
                    this._clips.splice(idx, 1);
                }
            },
            _update: function() {

                var time = new Date().getTime();
                var delta = time - this._time;
                var clips = this._clips;
                var len = clips.length;

                var deferredEvents = [];
                var deferredClips = [];
                for (var i = 0; i < len; i++) {
                    var clip = clips[i];
                    var e = clip.step(time);
                    // Throw out the events need to be called after
                    // stage.update, like destroy
                    if (e) {
                        deferredEvents.push(e);
                        deferredClips.push(clip);
                    }
                }
                if (this.stage.update) {
                    this.stage.update();
                }

                // Remove the finished clip
                for (var i = 0; i < len;) {
                    if (clips[i]._needsRemove) {
                        clips[i] = clips[len - 1];
                        clips.pop();
                        len--;
                    }
                    else {
                        i++;
                    }
                }

                len = deferredEvents.length;
                for (var i = 0; i < len; i++) {
                    deferredClips[i].fire(deferredEvents[i]);
                }

                this._time = time;

                this.onframe(delta);

                this.dispatch('frame', delta);
            },
            /**
             * 开始运行动画
             */
            start: function () {
                var self = this;

                this._running = true;

                function step() {
                    if (self._running) {
                        self._update();
                        requestAnimationFrame(step);
                    }
                }

                this._time = new Date().getTime();
                requestAnimationFrame(step);
            },
            /**
             * 停止运行动画
             */
            stop: function () {
                this._running = false;
            },
            /**
             * 清除所有动画片段
             */
            clear : function () {
                this._clips = [];
            },
            /**
             * 对一个目标创建一个animator对象，可以指定目标中的属性使用动画
             * @param  {Object} target
             * @param  {Object} options
             * @param  {boolean} [options.loop=false] 是否循环播放动画
             * @param  {Function} [options.getter=null]
             *         如果指定getter函数，会通过getter函数取属性值
             * @param  {Function} [options.setter=null]
             *         如果指定setter函数，会通过setter函数设置属性值
             * @return {module:zrender/animation/Animation~Animator}
             */
            animate : function (target, options) {
                options = options || {};
                var deferred = new Animator(
                    target,
                    options.loop,
                    options.getter, 
                    options.setter
                );
                deferred.animation = this;
                return deferred;
            },
            constructor: Animation
        };

        util.merge(Animation.prototype, Dispatcher.prototype, true);

        function _defaultGetter(target, key) {
            return target[key];
        }

        function _defaultSetter(target, key, value) {
            target[key] = value;
        }

        function _interpolateNumber(p0, p1, percent) {
            return (p1 - p0) * percent + p0;
        }

        function _interpolateArray(p0, p1, percent, out, arrDim) {
            var len = p0.length;
            if (arrDim == 1) {
                for (var i = 0; i < len; i++) {
                    out[i] = _interpolateNumber(p0[i], p1[i], percent); 
                }
            }
            else {
                var len2 = p0[0].length;
                for (var i = 0; i < len; i++) {
                    for (var j = 0; j < len2; j++) {
                        out[i][j] = _interpolateNumber(
                            p0[i][j], p1[i][j], percent
                        );
                    }
                }
            }
        }

        function _isArrayLike(data) {
            switch (typeof data) {
                case 'undefined':
                case 'string':
                    return false;
            }
            
            return typeof data.length !== 'undefined';
        }

        function _catmullRomInterpolateArray(
            p0, p1, p2, p3, t, t2, t3, out, arrDim
        ) {
            var len = p0.length;
            if (arrDim == 1) {
                for (var i = 0; i < len; i++) {
                    out[i] = _catmullRomInterpolate(
                        p0[i], p1[i], p2[i], p3[i], t, t2, t3
                    );
                }
            }
            else {
                var len2 = p0[0].length;
                for (var i = 0; i < len; i++) {
                    for (var j = 0; j < len2; j++) {
                        out[i][j] = _catmullRomInterpolate(
                            p0[i][j], p1[i][j], p2[i][j], p3[i][j],
                            t, t2, t3
                        );
                    }
                }
            }
        }

        function _catmullRomInterpolate(p0, p1, p2, p3, t, t2, t3) {
            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            return (2 * (p1 - p2) + v0 + v1) * t3 
                    + (-3 * (p1 - p2) - 2 * v0 - v1) * t2
                    + v0 * t + p1;
        }

        function _cloneValue(value) {
            if (_isArrayLike(value)) {
                var len = value.length;
                if (_isArrayLike(value[0])) {
                    var ret = [];
                    for (var i = 0; i < len; i++) {
                        ret.push(arraySlice.call(value[i]));
                    }
                    return ret;
                }
                else {
                    return arraySlice.call(value);
                }
            }
            else {
                return value;
            }
        }

        function rgba2String(rgba) {
            rgba[0] = Math.floor(rgba[0]);
            rgba[1] = Math.floor(rgba[1]);
            rgba[2] = Math.floor(rgba[2]);

            return 'rgba(' + rgba.join(',') + ')';
        }

        /**
         * @alias module:zrender/animation/Animation~Animator
         * @constructor
         * @param {Object} target
         * @param {boolean} loop
         * @param {Function} getter
         * @param {Function} setter
         */
        var Animator = function(target, loop, getter, setter) {
            this._tracks = {};
            this._target = target;

            this._loop = loop || false;

            this._getter = getter || _defaultGetter;
            this._setter = setter || _defaultSetter;

            this._clipCount = 0;

            this._delay = 0;

            this._doneList = [];

            this._onframeList = [];

            this._clipList = [];
        };

        Animator.prototype = {
            /**
             * 设置动画关键帧
             * @param  {number} time 关键帧时间，单位是ms
             * @param  {Object} props 关键帧的属性值，key-value表示
             * @return {module:zrender/animation/Animation~Animator}
             */
            when : function(time /* ms */, props) {
                for (var propName in props) {
                    if (!this._tracks[propName]) {
                        this._tracks[propName] = [];
                        // If time is 0 
                        //  Then props is given initialize value
                        // Else
                        //  Initialize value from current prop value
                        if (time !== 0) {
                            this._tracks[propName].push({
                                time : 0,
                                value : _cloneValue(
                                    this._getter(this._target, propName)
                                )
                            });
                        }
                    }
                    this._tracks[propName].push({
                        time : parseInt(time, 10),
                        value : props[propName]
                    });
                }
                return this;
            },
            /**
             * 添加动画每一帧的回调函数
             * @param  {Function} callback
             * @return {module:zrender/animation/Animation~Animator}
             */
            during: function (callback) {
                this._onframeList.push(callback);
                return this;
            },
            /**
             * 开始执行动画
             * @param  {string|Function} easing 
             *         动画缓动函数，详见{@link module:zrender/animation/easing}
             * @return {module:zrender/animation/Animation~Animator}
             */
            start: function (easing) {

                var self = this;
                var setter = this._setter;
                var getter = this._getter;
                var onFrameListLen = self._onframeList.length;
                var useSpline = easing === 'spline';

                var ondestroy = function() {
                    self._clipCount--;
                    if (self._clipCount === 0) {
                        // Clear all tracks
                        self._tracks = {};

                        var len = self._doneList.length;
                        for (var i = 0; i < len; i++) {
                            self._doneList[i].call(self);
                        }
                    }
                };

                var createTrackClip = function (keyframes, propName) {
                    var trackLen = keyframes.length;
                    if (!trackLen) {
                        return;
                    }
                    // Guess data type
                    var firstVal = keyframes[0].value;
                    var isValueArray = _isArrayLike(firstVal);
                    var isValueColor = false;

                    // For vertices morphing
                    var arrDim = (
                            isValueArray 
                            && _isArrayLike(firstVal[0])
                        )
                        ? 2 : 1;
                    // Sort keyframe as ascending
                    keyframes.sort(function(a, b) {
                        return a.time - b.time;
                    });
                    var trackMaxTime;
                    if (trackLen) {
                        trackMaxTime = keyframes[trackLen - 1].time;
                    }
                    else {
                        return;
                    }
                    // Percents of each keyframe
                    var kfPercents = [];
                    // Value of each keyframe
                    var kfValues = [];
                    for (var i = 0; i < trackLen; i++) {
                        kfPercents.push(keyframes[i].time / trackMaxTime);
                        // Assume value is a color when it is a string
                        var value = keyframes[i].value;
                        if (typeof(value) == 'string') {
                            value = color.toArray(value);
                            if (value.length === 0) {    // Invalid color
                                value[0] = value[1] = value[2] = 0;
                                value[3] = 1;
                            }
                            isValueColor = true;
                        }
                        kfValues.push(value);
                    }

                    // Cache the key of last frame to speed up when 
                    // animation playback is sequency
                    var cacheKey = 0;
                    var cachePercent = 0;
                    var start;
                    var i;
                    var w;
                    var p0;
                    var p1;
                    var p2;
                    var p3;


                    if (isValueColor) {
                        var rgba = [ 0, 0, 0, 0 ];
                    }

                    var onframe = function (target, percent) {
                        // Find the range keyframes
                        // kf1-----kf2---------current--------kf3
                        // find kf2 and kf3 and do interpolation
                        if (percent < cachePercent) {
                            // Start from next key
                            start = Math.min(cacheKey + 1, trackLen - 1);
                            for (i = start; i >= 0; i--) {
                                if (kfPercents[i] <= percent) {
                                    break;
                                }
                            }
                            i = Math.min(i, trackLen - 2);
                        }
                        else {
                            for (i = cacheKey; i < trackLen; i++) {
                                if (kfPercents[i] > percent) {
                                    break;
                                }
                            }
                            i = Math.min(i - 1, trackLen - 2);
                        }
                        cacheKey = i;
                        cachePercent = percent;

                        var range = (kfPercents[i + 1] - kfPercents[i]);
                        if (range === 0) {
                            return;
                        }
                        else {
                            w = (percent - kfPercents[i]) / range;
                        }
                        if (useSpline) {
                            p1 = kfValues[i];
                            p0 = kfValues[i === 0 ? i : i - 1];
                            p2 = kfValues[i > trackLen - 2 ? trackLen - 1 : i + 1];
                            p3 = kfValues[i > trackLen - 3 ? trackLen - 1 : i + 2];
                            if (isValueArray) {
                                _catmullRomInterpolateArray(
                                    p0, p1, p2, p3, w, w * w, w * w * w,
                                    getter(target, propName),
                                    arrDim
                                );
                            }
                            else {
                                var value;
                                if (isValueColor) {
                                    value = _catmullRomInterpolateArray(
                                        p0, p1, p2, p3, w, w * w, w * w * w,
                                        rgba, 1
                                    );
                                    value = rgba2String(rgba);
                                }
                                else {
                                    value = _catmullRomInterpolate(
                                        p0, p1, p2, p3, w, w * w, w * w * w
                                    );
                                }
                                setter(
                                    target,
                                    propName,
                                    value
                                );
                            }
                        }
                        else {
                            if (isValueArray) {
                                _interpolateArray(
                                    kfValues[i], kfValues[i + 1], w,
                                    getter(target, propName),
                                    arrDim
                                );
                            }
                            else {
                                var value;
                                if (isValueColor) {
                                    _interpolateArray(
                                        kfValues[i], kfValues[i + 1], w,
                                        rgba, 1
                                    );
                                    value = rgba2String(rgba);
                                }
                                else {
                                    value = _interpolateNumber(kfValues[i], kfValues[i + 1], w);
                                }
                                setter(
                                    target,
                                    propName,
                                    value
                                );
                            }
                        }

                        for (i = 0; i < onFrameListLen; i++) {
                            self._onframeList[i](target, percent);
                        }
                    };

                    var clip = new Clip({
                        target : self._target,
                        life : trackMaxTime,
                        loop : self._loop,
                        delay : self._delay,
                        onframe : onframe,
                        ondestroy : ondestroy
                    });

                    if (easing && easing !== 'spline') {
                        clip.easing = easing;
                    }
                    self._clipList.push(clip);
                    self._clipCount++;
                    self.animation.add(clip);
                };

                for (var propName in this._tracks) {
                    createTrackClip(this._tracks[propName], propName);
                }
                return this;
            },
            /**
             * 停止动画
             */
            stop : function() {
                for (var i = 0; i < this._clipList.length; i++) {
                    var clip = this._clipList[i];
                    this.animation.remove(clip);
                }
                this._clipList = [];
            },
            /**
             * 设置动画延迟开始的时间
             * @param  {number} time 单位ms
             * @return {module:zrender/animation/Animation~Animator}
             */
            delay : function (time) {
                this._delay = time;
                return this;
            },
            /**
             * 添加动画结束的回调
             * @param  {Function} cb
             * @return {module:zrender/animation/Animation~Animator}
             */
            done : function(cb) {
                this._doneList.push(cb);
                return this;
            }
        };

        return Animation;
    }
);

/*!
 * ZRender, a high performance canvas library.
 *  
 * Copyright (c) 2013, Baidu Inc.
 * All rights reserved.
 * 
 * LICENSE
 * https://github.com/ecomfe/zrender/blob/master/LICENSE.txt
 */
define(
    'zrender/zrender',['require','./dep/excanvas','./tool/util','./tool/log','./tool/guid','./Handler','./Painter','./Storage','./animation/Animation','./tool/env'],function(require) {
        /*
         * HTML5 Canvas for Internet Explorer!
         * Modern browsers like Firefox, Safari, Chrome and Opera support
         * the HTML5 canvas tag to allow 2D command-based drawing.
         * ExplorerCanvas brings the same functionality to Internet Explorer.
         * To use, web developers only need to include a single script tag
         * in their existing web pages.
         *
         * https://code.google.com/p/explorercanvas/
         * http://explorercanvas.googlecode.com/svn/trunk/excanvas.js
         */
        // 核心代码会生成一个全局变量 G_vmlCanvasManager，模块改造后借用于快速判断canvas支持
        require('./dep/excanvas');

        var util = require('./tool/util');
        var log = require('./tool/log');
        var guid = require('./tool/guid');

        var Handler = require('./Handler');
        var Painter = require('./Painter');
        var Storage = require('./Storage');
        var Animation = require('./animation/Animation');

        var _instances = {};    // ZRender实例map索引

        /**
         * @exports zrender
         * @author Kener (@Kener-林峰, linzhifeng@baidu.com)
         *         pissang (https://www.github.com/pissang)
         */
        var zrender = {};
        /**
         * @type {string}
         */
        zrender.version = '2.0.3';

        /**
         * 创建zrender实例
         *
         * @param {HTMLElement} dom 绘图容器
         * @return {module:zrender~ZRender} ZRender实例
         */
        // 不让外部直接new ZRender实例，为啥？
        // 不为啥，提供全局可控同时减少全局污染和降低命名冲突的风险！
        zrender.init = function(dom) {
            var zr = new ZRender(guid(), dom);
            _instances[zr.id] = zr;
            return zr;
        };

        /**
         * zrender实例销毁
         * @param {module:zrender~ZRender} zr ZRender对象，不传则销毁全部
         */
        // 在_instances里的索引也会删除了
        // 管生就得管死，可以通过zrender.dispose(zr)销毁指定ZRender实例
        // 当然也可以直接zr.dispose()自己销毁
        zrender.dispose = function (zr) {
            if (zr) {
                zr.dispose();
            }
            else {
                for (var key in _instances) {
                    _instances[key].dispose();
                }
                _instances = {};
            }

            return zrender;
        };

        /**
         * 获取zrender实例
         * @param {string} id ZRender对象索引
         * @return {module:zrender~ZRender}
         */
        zrender.getInstance = function (id) {
            return _instances[id];
        };

        /**
         * 删除zrender实例，ZRender实例dispose时会调用，
         * 删除后getInstance则返回undefined
         * ps: 仅是删除，删除的实例不代表已经dispose了~~
         *     这是一个摆脱全局zrender.dispose()自动销毁的后门，
         *     take care of yourself~
         *
         * @param {string} id ZRender对象索引
         */
        zrender.delInstance = function (id) {
            delete _instances[id];
            return zrender;
        };

        function getFrameCallback(zrInstance) {
            return function () {
                var animatingElements = zrInstance.animatingElements;
                for (var i = 0, l = animatingElements.length; i < l; i++) {
                    zrInstance.storage.mod(animatingElements[i].id);
                }

                if (animatingElements.length || zrInstance._needsRefreshNextFrame) {
                    zrInstance.refresh();
                }
            };
        }

        /**
         * ZRender接口类，对外可用的所有接口都在这里
         * 非get接口统一返回支持链式调用
         *
         * @constructor
         * @alias module:zrender~ZRender
         * @param {string} id 唯一标识
         * @param {HTMLElement} dom dom对象，不帮你做document.getElementById
         * @return {ZRender} ZRender实例
         */
        var ZRender = function(id, dom) {
            /**
             * 实例 id
             * @type {string}
             */
            this.id = id;
            this.env = require('./tool/env');

            this.storage = new Storage();
            this.painter = new Painter(dom, this.storage);
            this.handler = new Handler(dom, this.storage, this.painter);

            // 动画控制
            this.animatingElements = [];
            /**
             * @type {module:zrender/animation/Animation}
             */
            this.animation = new Animation({
                stage: {
                    update: getFrameCallback(this)
                }
            });
            this.animation.start();

            this._needsRefreshNextFrame = false;
        };

        /**
         * 获取实例唯一标识
         * @return {string}
         */
        ZRender.prototype.getId = function () {
            return this.id;
        };

        /**
         * 添加图形形状到根节点
         * 
         * @param {module:zrender/shape/Base} shape 形状对象，可用属性全集，详见各shape
         */
        ZRender.prototype.addShape = function (shape) {
            this.storage.addRoot(shape);
            return this;
        };

        /**
         * 添加组到根节点
         *
         * @param {module:zrender/Group} group
         */
        ZRender.prototype.addGroup = function(group) {
            this.storage.addRoot(group);
            return this;
        };

        /**
         * 从根节点删除图形形状
         * 
         * @param {string} shapeId 形状对象唯一标识
         */
        ZRender.prototype.delShape = function (shapeId) {
            this.storage.delRoot(shapeId);
            return this;
        };

        /**
         * 从根节点删除组
         * 
         * @param {string} groupId
         */
        ZRender.prototype.delGroup = function (groupId) {
            this.storage.delRoot(groupId);
            return this;
        };

        /**
         * 修改图形形状
         * 
         * @param {string} shapeId 形状对象唯一标识
         * @param {Object} shape 形状对象
         */
        ZRender.prototype.modShape = function (shapeId, shape) {
            this.storage.mod(shapeId, shape);
            return this;
        };

        /**
         * 修改组
         * 
         * @param {string} groupId
         * @param {Object} group
         */
        ZRender.prototype.modGroup = function (groupId, group) {
            this.storage.mod(groupId, group);
            return this;
        };

        /**
         * 修改指定zlevel的绘制配置项
         * 
         * @param {string} zLevel
         * @param {Object} config 配置对象
         * @param {string} [config.clearColor=0] 每次清空画布的颜色
         * @param {string} [config.motionBlur=false] 是否开启动态模糊
         * @param {number} [config.lastFrameAlpha=0.7]
         *                 在开启动态模糊的时候使用，与上一帧混合的alpha值，值越大尾迹越明显
         * @param {Array.<number>} [config.position] 层的平移
         * @param {Array.<number>} [config.rotation] 层的旋转
         * @param {Array.<number>} [config.scale] 层的缩放
         * @param {boolean} [config.zoomable=false] 层是否支持鼠标缩放操作
         * @param {boolean} [config.panable=false] 层是否支持鼠标平移操作
         */
        ZRender.prototype.modLayer = function (zLevel, config) {
            this.painter.modLayer(zLevel, config);
            return this;
        };

        /**
         * 添加额外高亮层显示，仅提供添加方法，每次刷新后高亮层图形均被清空
         * 
         * @param {Object} shape 形状对象
         */
        ZRender.prototype.addHoverShape = function (shape) {
            this.storage.addHover(shape);
            return this;
        };

        /**
         * 渲染
         * 
         * @param {Function} callback  渲染结束后回调函数
         */
        ZRender.prototype.render = function (callback) {
            this.painter.render(callback);
            this._needsRefreshNextFrame = false;
            return this;
        };

        /**
         * 视图更新
         * 
         * @param {Function} callback  视图更新后回调函数
         */
        ZRender.prototype.refresh = function (callback) {
            this.painter.refresh(callback);
            this._needsRefreshNextFrame = false;
            return this;
        };

        /**
         * 标记视图在浏览器下一帧需要绘制
         */
        ZRender.prototype.refreshNextFrame = function() {
            this._needsRefreshNextFrame = true;
            return this;
        };
        
        /**
         * 绘制高亮层
         * @param {Function} callback  视图更新后回调函数
         */
        ZRender.prototype.refreshHover = function (callback) {
            this.painter.refreshHover(callback);
            return this;
        };

        /**
         * 视图更新
         * 
         * @param {Array.<module:zrender/shape/Base>} shapeList 需要更新的图形列表
         * @param {Function} callback  视图更新后回调函数
         */
        ZRender.prototype.refreshShapes = function (shapeList, callback) {
            this.painter.refreshShapes(shapeList, callback);
            return this;
        };

        /**
         * 调整视图大小
         */
        ZRender.prototype.resize = function() {
            this.painter.resize();
            return this;
        };

        /**
         * 动画
         * 
         * @param {string|module:zrender/Group|module:zrender/shape/Base} el 动画对象
         * @param {string} path 需要添加动画的属性获取路径，可以通过a.b.c来获取深层的属性
         * @param {boolean} [loop] 动画是否循环
         * @return {module:zrender/animation/Animation~Animator}
         * @example:
         *     zr.animate(circle.id, 'style', false)
         *         .when(1000, {x: 10} )
         *         .done(function(){ // Animation done })
         *         .start()
         */
        ZRender.prototype.animate = function (el, path, loop) {
            if (typeof(el) === 'string') {
                el = this.storage.get(el);
            }
            if (el) {
                var target;
                if (path) {
                    var pathSplitted = path.split('.');
                    var prop = el;
                    for (var i = 0, l = pathSplitted.length; i < l; i++) {
                        if (!prop) {
                            continue;
                        }
                        prop = prop[pathSplitted[i]];
                    }
                    if (prop) {
                        target = prop;
                    }
                }
                else {
                    target = el;
                }

                if (!target) {
                    log(
                        'Property "'
                        + path
                        + '" is not existed in element '
                        + el.id
                    );
                    return;
                }

                var animatingElements = this.animatingElements;
                if (typeof el.__aniCount === 'undefined') {
                    // 正在进行的动画记数
                    el.__aniCount = 0;
                }
                if (el.__aniCount === 0) {
                    animatingElements.push(el);
                }
                el.__aniCount++;

                return this.animation.animate(target, { loop: loop })
                    .done(function () {
                        el.__aniCount--;
                        if (el.__aniCount === 0) {
                            // 从animatingElements里移除
                            var idx = util.indexOf(animatingElements, el);
                            animatingElements.splice(idx, 1);
                        }
                    });
            }
            else {
                log('Element not existed');
            }
        };

        /**
         * 停止所有动画
         */
        ZRender.prototype.clearAnimation = function () {
            this.animation.clear();
        };

        /**
         * loading显示
         * 
         * @param {Object=} loadingEffect loading效果对象
         */
        ZRender.prototype.showLoading = function (loadingEffect) {
            this.painter.showLoading(loadingEffect);
            return this;
        };

        /**
         * loading结束
         */
        ZRender.prototype.hideLoading = function () {
            this.painter.hideLoading();
            return this;
        };

        /**
         * 获取视图宽度
         */
        ZRender.prototype.getWidth = function() {
            return this.painter.getWidth();
        };

        /**
         * 获取视图高度
         */
        ZRender.prototype.getHeight = function() {
            return this.painter.getHeight();
        };

        /**
         * 图像导出
         * @param {string} type
         * @param {string} [backgroundColor='#fff'] 背景色
         * @return {string} 图片的Base64 url
         */
        ZRender.prototype.toDataURL = function(type, backgroundColor, args) {
            return this.painter.toDataURL(type, backgroundColor, args);
        };

        /**
         * 将常规shape转成image shape
         * @param {module:zrender/shape/Base} e
         * @param {number} width
         * @param {number} height
         */
        ZRender.prototype.shapeToImage = function(e, width, height) {
            var id = guid();
            return this.painter.shapeToImage(id, e, width, height);
        };

        /**
         * 事件绑定
         * 
         * @param {string} eventName 事件名称
         * @param {Function} eventHandler 响应函数
         */
        ZRender.prototype.on = function(eventName, eventHandler) {
            this.handler.on(eventName, eventHandler);
            return this;
        };

        /**
         * 事件解绑定，参数为空则解绑所有自定义事件
         * 
         * @param {string} eventName 事件名称
         * @param {Function} eventHandler 响应函数
         */
        ZRender.prototype.un = function(eventName, eventHandler) {
            this.handler.un(eventName, eventHandler);
            return this;
        };
        
        /**
         * 事件触发
         * 
         * @param {string} eventName 事件名称，resize，hover，drag，etc
         * @param {event=} event event dom事件对象
         */
        ZRender.prototype.trigger = function (eventName, event) {
            this.handler.trigger(eventName, event);
            return this;
        };
        

        /**
         * 清除当前ZRender下所有类图的数据和显示，clear后MVC和已绑定事件均还存在在，ZRender可用
         */
        ZRender.prototype.clear = function () {
            this.storage.delRoot();
            this.painter.clear();
            return this;
        };

        /**
         * 释放当前ZR实例（删除包括dom，数据、显示和事件绑定），dispose后ZR不可用
         */
        ZRender.prototype.dispose = function () {
            this.animation.stop();
            
            this.clear();
            this.storage.dispose();
            this.painter.dispose();
            this.handler.dispose();

            this.animation = 
            this.animatingElements = 
            this.storage = 
            this.painter = 
            this.handler = null;

            // 释放后告诉全局删除对自己的索引，没想到啥好方法
            zrender.delInstance(this.id);
        };

        return zrender;
    }
);

define('zrender', ['zrender/zrender'], function (main) { return main; });

define('qtek/core/mixin/derive',['require'],function(require) {

    'use strict';

    /**
     * Extend a sub class from base class
     * @param {object|Function} makeDefaultOpt default option of this sub class, method of the sub can use this.xxx to access this option
     * @param {Function} [initialize] Initialize after the sub class is instantiated
     * @param {Object} [proto] Prototype methods/properties of the sub class
     * @memberOf qtek.core.mixin.derive.
     * @return {Function}
     */
    function derive(makeDefaultOpt, initialize/*optional*/, proto/*optional*/) {

        if (typeof initialize == 'object') {
            proto = initialize;
            initialize = null;
        }

        var _super = this;

        var propList;
        if (!(makeDefaultOpt instanceof Function)) {
            // Optimize the property iterate if it have been fixed
            propList = [];
            for (var propName in makeDefaultOpt) {
                if (makeDefaultOpt.hasOwnProperty(propName)) {
                    propList.push(propName);
                }
            }
        }

        var sub = function(options) {

            // call super constructor
            _super.apply(this, arguments);

            if (makeDefaultOpt instanceof Function) {
                // Invoke makeDefaultOpt each time if it is a function, So we can make sure each 
                // property in the object will not be shared by mutiple instances
                extend(this, makeDefaultOpt.call(this));
            } else {
                extendWithPropList(this, makeDefaultOpt, propList);
            }
            
            if (this.constructor === sub) {
                // Initialize function will be called in the order of inherit
                var initializers = sub.__initializers__;
                for (var i = 0; i < initializers.length; i++) {
                    initializers[i].apply(this, arguments);
                }
            }
        };
        // save super constructor
        sub.__super__ = _super;
        // Initialize function will be called after all the super constructor is called
        if (!_super.__initializers__) {
            sub.__initializers__ = [];
        } else {
            sub.__initializers__ = _super.__initializers__.slice();
        }
        if (initialize) {
            sub.__initializers__.push(initialize);
        }

        var Ctor = function() {};
        Ctor.prototype = _super.prototype;
        sub.prototype = new Ctor();
        sub.prototype.constructor = sub;
        extend(sub.prototype, proto);
        
        // extend the derive method as a static method;
        sub.derive = _super.derive;

        return sub;
    }

    function extend(target, source) {
        if (!source) {
            return;
        }
        for (var name in source) {
            if (source.hasOwnProperty(name)) {
                target[name] = source[name];
            }
        }
    }

    function extendWithPropList(target, source, propList) {
        for (var i = 0; i < propList.length; i++) {
            var propName = propList[i];
            target[propName] = source[propName];
        }   
    }

    /**
     * @alias qtek.core.mixin.derive
     * @mixin
     */
    return {
        derive : derive
    };
});
define('qtek/core/mixin/notifier',[],function() {

    function Handler(action, context) {
        this.action = action;
        this.context = context;
    }
    /**
     * @mixin
     * @alias qtek.core.mixin.notifier
     */
    var notifier = {
        /**
         * Trigger event
         * @param  {string} name
         */
        trigger : function(name) {
            if (! this.hasOwnProperty('__handlers__')) {
                return;
            }
            if (!this.__handlers__.hasOwnProperty(name)) {
                return;
            }

            var hdls = this.__handlers__[name];
            var l = hdls.length, i = -1, args = arguments;
            // Optimize advise from backbone
            switch (args.length) {
                case 1: 
                    while (++i < l) {
                        hdls[i].action.call(hdls[i].context);
                    }
                    return;
                case 2:
                    while (++i < l) {
                        hdls[i].action.call(hdls[i].context, args[1]);
                    }
                    return;
                case 3:
                    while (++i < l) {
                        hdls[i].action.call(hdls[i].context, args[1], args[2]);
                    }
                    return;
                case 4:
                    while (++i < l) {
                        hdls[i].action.call(hdls[i].context, args[1], args[2], args[3]);
                    }
                    return;
                case 5:
                    while (++i < l) {
                        hdls[i].action.call(hdls[i].context, args[1], args[2], args[3], args[4]);
                    }
                    return;
                default:
                    while (++i < l) {
                        hdls[i].action.apply(hdls[i].context, Array.prototype.slice.call(args, 1));
                    }
                    return;
            }
        },
        /**
         * Register event handler
         * @param  {string} name
         * @param  {Function} action
         * @param  {Object} [context]
         * @chainable
         */
        on : function(name, action, context) {
            if (!name || !action) {
                return;
            }
            var handlers = this.__handlers__ || (this.__handlers__={});
            if (! handlers[name]) {
                handlers[name] = [];
            } else {
                if (this.has(name, action)) {
                    return;
                }   
            }
            var handler = new Handler(action, context || this);
            handlers[name].push(handler);

            return this;
        },

        /**
         * Register event, event will only be triggered once and then removed
         * @param  {string} name
         * @param  {Function} action
         * @param  {Object} [context]
         * @chainable
         */
        once : function(name, action, context) {
            if (!name || !action) {
                return;
            }
            var self = this;
            function wrapper() {
                self.off(name, wrapper);
                action.apply(this, arguments);
            }
            return this.on(name, wrapper, context);
        },

        /**
         * Alias of once('before' + name)
         * @param  {string} name
         * @param  {Function} action
         * @param  {Object} [context]
         * @chainable
         */
        before : function(name, action, context) {
            if (!name || !action) {
                return;
            }
            name = 'before' + name;
            return this.on(name, action, context);
        },

        /**
         * Alias of once('after' + name)
         * @param  {string} name
         * @param  {Function} action
         * @param  {Object} [context]
         * @chainable
         */
        after : function(name, action, context) {
            if (!name || !action) {
                return;
            }
            name = 'after' + name;
            return this.on(name, action, context);
        },

        /**
         * Alias of on('success')
         * @param  {Function} action
         * @param  {Object} [context]
         * @chainable
         */
        success : function(action, context) {
            return this.once('success', action, context);
        },

        /**
         * Alias of on('error')
         * @param  {Function} action
         * @param  {Object} [context]
         * @chainable
         */
        error : function(action, context) {
            return this.once('error', action, context);
        },

        /**
         * Alias of on('success')
         * @param  {Function} action
         * @param  {Object} [context]
         * @chainable
         */
        off : function(name, action) {
            
            var handlers = this.__handlers__ || (this.__handlers__={});

            if (!action) {
                handlers[name] = [];
                return;
            }
            if (handlers[name]) {
                var hdls = handlers[name];
                var retains = [];
                for (var i = 0; i < hdls.length; i++) {
                    if (action && hdls[i].action !== action) {
                        retains.push(hdls[i]);
                    }
                }
                handlers[name] = retains;
            } 

            return this;
        },

        /**
         * If registered the event handler
         * @param  {string}  name
         * @param  {Function}  action
         * @return {boolean}
         */
        has : function(name, action) {
            var handlers = this.__handlers__;

            if (! handlers ||
                ! handlers[name]) {
                return false;
            }
            var hdls = handlers[name];
            for (var i = 0; i < hdls.length; i++) {
                if (hdls[i].action === action) {
                    return true;
                }
            }
        }
    };
    
    return notifier;
});
define('qtek/core/util',['require'],function(require){
    
    'use strict';

    var guid = 0;

    /**
     * Util functions
     * @namespace qtek.core.util
     */
	var util = {

        /**
         * Generate GUID
         * @return {number}
         * @memberOf qtek.core.util
         */
		genGUID : function() {
			return ++guid;
		},
        /**
         * Relative path to absolute path
         * @param  {string} path
         * @param  {string} basePath
         * @return {string}
         * @memberOf qtek.core.util
         */
        relative2absolute : function(path, basePath) {
            if (!basePath || path.match(/^\//)) {
                return path;
            }
            var pathParts = path.split('/');
            var basePathParts = basePath.split('/');

            var item = pathParts[0];
            while(item === '.' || item === '..') {
                if (item === '..') {
                    basePathParts.pop();
                }
                pathParts.shift();
                item = pathParts[0];
            }
            return basePathParts.join('/') + '/' + pathParts.join('/');
        },

        /**
         * Extend target with source
         * @param  {Object} target
         * @param  {Object} source
         * @return {Object}
         * @memberOf qtek.core.util
         */
        extend : function(target, source) {
            if (source) {
                for (var name in source) {
                    if (source.hasOwnProperty(name)) {
                        target[name] = source[name];
                    }
                }
            }
            return target;
        },

        /**
         * Extend properties to target if not exist.
         * @param  {Object} target
         * @param  {Object} source
         * @return {Object}
         * @memberOf qtek.core.util
         */
        defaults : function(target, source) {
            if (source) {
                for (var propName in source) {
                    if (target[propName] === undefined) {
                        target[propName] = source[propName];
                    }
                }
            }
            return target;
        },
        /**
         * Extend properties with a given property list to avoid for..in.. iteration.
         * @param  {Object} target
         * @param  {Object} source
         * @param  {Array.<string>} propList
         * @return {Object}
         * @memberOf qtek.core.util
         */
        extendWithPropList : function(target, source, propList) {
            if (source) {
                for (var i = 0; i < propList.length; i++) {
                    var propName = propList[i];
                    target[propName] = source[propName];
                }
            }
            return target;
        },
        /**
         * Extend properties to target if not exist. With a given property list avoid for..in.. iteration.
         * @param  {Object} target
         * @param  {Object} source
         * @param  {Array.<string>} propList
         * @return {Object}
         * @memberOf qtek.core.util
         */
        defaultsWithPropList : function(target, source, propList) {
            if (source) {
                for (var i = 0; i < propList.length; i++) {
                    var propName = propList[i];
                    if (target[propName] === undefined) {
                        target[propName] = source[propName];
                    }
                }
            }
            return target;
        },
        /**
         * @param  {Object|Array} obj
         * @param  {Function} iterator
         * @param  {Object} [context]
         * @memberOf qtek.core.util
         */
        each : function(obj, iterator, context) {
            if (!(obj && iterator)) {
                return;
            }
            if (obj.forEach) {
                obj.forEach(iterator, context);
            } else if (obj.length === + obj.length) {
                for (var i = 0, len = obj.length; i < len; i++) {
                    iterator.call(context, obj[i], i, obj);
                }
            } else {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            }
        },

        /**
         * Is object ?
         * @param  {}  obj
         * @return {boolean}
         * @memberOf qtek.core.util
         */
        isObject : function(obj) {
            return obj === Object(obj);
        },

        /**
         * Is array ?
         * @param  {}  obj
         * @return {boolean}
         * @memberOf qtek.core.util
         */
        isArray : function(obj) {
            return obj instanceof Array;
        },

        /**
         * Is array like, which have a length property
         * @param  {}  obj
         * @return {boolean}
         * @memberOf qtek.core.util
         */
        isArrayLike : function(obj) {
            if (!obj) {
                return false;
            } else {
                return obj.length === + obj.length;
            }
        },

        /**
         * @param  {} obj
         * @return {}
         * @memberOf qtek.core.util
         */
        clone : function(obj) {
            if (!util.isObject(obj)) {
                return obj;
            } else if (util.isArray(obj)) {
                return obj.slice();
            } else if (util.isArrayLike(obj)) { // is typed array
                var ret = new obj.constructor(obj.length);
                for (var i = 0; i < obj.length; i++) {
                    ret[i] = obj[i];
                }
                return ret;
            } else {
                return util.extend({}, obj);
            }
        }
	};

    return util;
});
define('qtek/core/Base',['require','./mixin/derive','./mixin/notifier','./util'],function(require){

    'use strict';

    var deriveMixin = require('./mixin/derive');
    var notifierMixin = require('./mixin/notifier');
    var util = require('./util');

    /**
     * Base class of all objects
     * @constructor
     * @alias qtek.core.Base
     * @mixes qtek.core.mixin.notifier
     */
    var Base = function() {
        /**
         * @type {number}
         */
        this.__GUID__ = util.genGUID();
    };

    Base.__initializers__ = [
        function(opts) {
            util.extend(this, opts);
        }
    ];
    
    util.extend(Base, deriveMixin);
    util.extend(Base.prototype, notifierMixin);

    return Base;
});
/**
 * Group是一个容器，可以插入子节点，Group的变换也会被应用到子节点上
 * @module zrender/shape/Group
 * @example
 *     var Group = require('zrender/shape/Group');
 *     var Circle = require('zrender/shape/Circle');
 *     var g = new Group();
 *     g.position[0] = 100;
 *     g.position[1] = 100;
 *     g.addChild(new Circle({
 *         style: {
 *             x: 100,
 *             y: 100,
 *             r: 20,
 *             brushType: 'fill'
 *         }
 *     }));
 *     zr.addGroup(g);
 */
define('zrender/shape/Group',['require','../tool/guid','../tool/util','../mixin/Transformable','../mixin/Eventful'],function(require) {

    var guid = require('../tool/guid');
    var util = require('../tool/util');

    var Transformable = require('../mixin/Transformable');
    var Eventful = require('../mixin/Eventful');

    /**
     * @alias module:zrender/shape/Group
     * @constructor
     * @extends module:zrender/mixin/Transformable
     * @extends module:zrender/mixin/Eventful
     */
    var Group = function (options) {

        options = options || {};

        /**
         * Group id
         * @type {string}
         */
        this.id = options.id || guid();

        for (var key in options) {
            this[key] = options[key];
        }

        /**
         * @type {string}
         */
        this.type = 'group';

        /**
         * 用于裁剪的图形(shape)，所有 Group 内的图形在绘制时都会被这个图形裁剪
         * 该图形会继承Group的变换
         * @type {module:zrender/shape/Base}
         * @see http://www.w3.org/TR/2dcontext/#clipping-region
         */
        this.clipShape = null;

        this._children = [];

        this._storage = null;

        this.__dirty = true;

        // Mixin
        Transformable.call(this);
        Eventful.call(this);
    };

    /**
     * 是否忽略该 Group 及其所有子节点
     * @type {boolean}
     * @default false
     */
    Group.prototype.ignore = false;

    /**
     * 复制并返回一份新的包含所有儿子节点的数组
     * @return {Array.<module:zrender/shape/Group|module:zrender/shape/Base>}
     */
    Group.prototype.children = function() {
        return this._children.slice();
    };

    /**
     * 获取指定 index 的儿子节点
     * @param  {number} idx
     * @return {module:zrender/shape/Group|module:zrender/shape/Base}
     */
    Group.prototype.childAt = function(idx) {
        return this._children[idx];
    };

    /**
     * 添加子节点，可以是Shape或者Group
     * @param {module:zrender/shape/Group|module:zrender/shape/Base} child
     */
    Group.prototype.addChild = function(child) {
        if (child == this) {
            return;
        }
        
        if (child.parent == this) {
            return;
        }
        if (child.parent) {
            child.parent.removeChild(child);
        }

        this._children.push(child);
        child.parent = this;

        if (this._storage && this._storage !== child._storage) {
            
            this._storage.addToMap(child);

            if (child instanceof Group) {
                child.addChildrenToStorage(this._storage);
            }
        }
    };

    /**
     * 移除子节点
     * @param {module:zrender/shape/Group|module:zrender/shape/Base} child
     */
    Group.prototype.removeChild = function (child) {
        var idx = util.indexOf(this._children, child);

        this._children.splice(idx, 1);
        child.parent = null;

        if (child._storage) {
            
            this._storage.delFromMap(child.id);

            if (child instanceof Group) {
                child.delChildrenFromStorage(child._storage);
            }
        }
    };

    /**
     * 遍历所有子节点
     * @param  {Function} cb
     * @param  {Object}   context
     */
    Group.prototype.each = function (cb, context) {
        var haveContext = !!context;
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            if (haveContext) {
                cb.call(context, child);
            }
            else {
                cb(child);
            }
        }
    };

    /**
     * 深度优先遍历所有子孙节点
     * @param  {Function} cb
     * @param  {Object}   context
     */
    Group.prototype.iterate = function (cb, context) {
        var haveContext = !!context;
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            if (haveContext) {
                cb.call(context, child);
            }
            else {
                cb(child);
            }

            if (child.type === 'group') {
                child.iterate(cb, context);
            }
        }
    };

    Group.prototype.addChildrenToStorage = function (storage) {
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            storage.addToMap(child);
            if (child.type === 'group') {
                child.addChildrenToStorage(storage);
            }
        }
    };

    Group.prototype.delChildrenFromStorage = function (storage) {
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            storage.delFromMap(child);
            if (child.type === 'group') {
                child.delChildrenFromStorage(storage);
            }
        }
    };

    util.merge(Group.prototype, Transformable.prototype, true);
    util.merge(Group.prototype, Eventful.prototype, true);

    return Group;
});

define('js/CardShape',['require','zrender/shape/Base','zrender/tool/util'],function(require) {

    'use strict';

    var ShapeBase = require('zrender/shape/Base');

    function CardShape(options) {
        ShapeBase.call(this, options);
    }

    CardShape.prototype = {

        type: 'card',

        buildPath: function(ctx, style) {
            var x = style.x || 0;
            var y = style.y || 0;
            var width = style.width || 0;
            var height = style.height || 0;
            var arrowSize = style.arrowSize;
            var r = style.r;

            var r1;
            var r2;
            var r3;
            var r4;
            if(typeof r === 'number') {
                r1 = r2 = r3 = r4 = r;
            }
            else if(r instanceof Array) {
                if (r.length === 1) {
                    r1 = r2 = r3 = r4 = r[0];
                }
                else if(r.length === 2) {
                    r1 = r3 = r[0];
                    r2 = r4 = r[1];
                }
                else if(r.length === 3) {
                    r1 = r[0];
                    r2 = r4 = r[1];
                    r3 = r[2];
                } else {
                    r1 = r[0];
                    r2 = r[1];
                    r3 = r[2];
                    r4 = r[3];
                }
            } else {
                r1 = r2 = r3 = r4 = 0;
            }

            ctx.beginPath();

            // Left top
            ctx.moveTo(x + r1, y);
            // Right top
            ctx.lineTo(x + width - r2, y);
            r2 !== 0 && ctx.quadraticCurveTo(
                x + width, y, x + width, y + r2
            );
            // Right bottom
            ctx.lineTo(x + width, y + height - r3);
            r3 !== 0 && ctx.quadraticCurveTo(
                x + width, y + height, x + width - r3, y + height
            );
            // Arrow
            ctx.lineTo(x + width / 2 + arrowSize[0] / 2, y + height);
            ctx.lineTo(x + width / 2, y + height + arrowSize[1]);
            ctx.lineTo(x + width / 2 - arrowSize[0] / 2, y + height);
            // Left bottom
            ctx.lineTo(x + r4, y + height);
            r4 !== 0 && ctx.quadraticCurveTo(
                x, y + height, x, y + height - r4
            );
            // Left top
            ctx.lineTo(x, y + r1);
            r1 !== 0 && ctx.quadraticCurveTo(x, y, x + r1, y);
        },

        /**
         * 返回矩形区域，用于局部刷新和文字定位
         * @param {Object} style
         */
        getRect : function(style) {
            if (style.__rect) {
                return style.__rect;
            }
            
            var lineWidth;
            if (style.brushType == 'stroke' || style.brushType == 'fill') {
                lineWidth = style.lineWidth || 1;
            }
            else {
                lineWidth = 0;
            }
            style.__rect = {
                x : Math.round(style.x - lineWidth / 2),
                y : Math.round(style.y - lineWidth / 2),
                width : style.width + lineWidth,
                height : style.height + lineWidth + style.arrowSize[1]
            };
            
            return style.__rect;
        },
                
        isCover : function (x, y) {
            var originPos = this.getTansform(x, y);
            x = originPos[0];
            y = originPos[1];
            var rect = this.getRect(this.style);
            return !(x < rect.x || y < rect.y || x > rect.x + rect.width || y > rect.y + rect.height);
        }
    }

    require('zrender/tool/util').inherits(CardShape, ShapeBase);
    return CardShape;
});
define('js/NodeEntity',['require','qtek/core/Base','zrender/shape/Group','zrender/shape/Rectangle','./CardShape','zrender/shape/Text','zrender/shape/Image'],function(require) {

    var Base = require('qtek/core/Base');

    var Group = require('zrender/shape/Group');
    var RectShape = require('zrender/shape/Rectangle');
    var CardShape = require('./CardShape');
    var TextShape = require('zrender/shape/Text');
    var ImageShape = require('zrender/shape/Image');

    var loadingImage = new Image();
    loadingImage.src = 'imgs/logo_loading.png';
    var defaultImage = new Image();
    defaultImage.src = 'imgs/default_logo.jpg';

    var NodeEntity = Base.derive({
        
        group: null,

        visible: true,

        imageWidth: 100,

        imageHeight: 100,

        color: '#2882F8',

        highlightColor: '#8c72d4',

        labelList: [],

        labelPosition: 'inside',

        image: '',

        clickable: true,

        _isImageLoad: false,

        _cardShape: null,

        _imageShape: null,

        _depth: 0,

        _labelHeight: 25

    }, function() {
        this.init();
    }, {

        init: function() {

            var self = this;

            // Bounding rect
            this.rect = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            
            this.group = new Group();

            var padding = 3;
            var labelMargin = 5;

            var cardWidth = this.imageWidth + padding * 2;
            var cardHeight = this.imageHeight + padding * 2;

            var cardShape = new CardShape({
                style: {
                    x: 0,
                    y: 0,
                    r: 5,
                    color: this.color,
                    width: cardWidth,
                    height: cardHeight,
                    arrowSize: [20, 10],

                    shadowColor: '#333',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 5
                },
                clickable: this.clickable,
                onclick: function() {
                    self.trigger('click');
                },
                onmouseover: function() {
                    self.trigger('mouseover');
                },
                onmouseout: function() {
                    self.trigger('mouseout');
                },
                highlightStyle: {
                    opacity: 0
                }
            });

            var imageShape = new ImageShape({
                style: {
                    x: padding,
                    y: padding,
                    width: this.imageWidth,
                    height: this.imageHeight,
                    image: loadingImage
                },
                hoverable: false
            });

            var labelGroup = new Group();
            var labelY = 0;
            var labelWidth = 0;

            // var labelColor = this.labelPosition === 'inside' ? 'white' : '#111';
            var labelColor = 'white';
            // Label list
            for (var i = 0; i < this.labelList.length; i++) {
                var labelItem = this.labelList[i];
                var textShape = new TextShape({
                    style: {
                        x: 0,
                        y: labelY,
                        color: labelItem.color || labelColor,
                        textFont: labelItem.font,
                        text: labelItem.text,
                        textBaseline: 'top'
                    },
                    hoverable: false,
                    z: 1
                });
                var rect = textShape.getRect(textShape.style);
                labelY += rect.height + labelMargin;
                labelWidth = Math.max(labelWidth, rect.width);
                labelGroup.addChild(textShape);
            }

            if (this.labelPosition === 'inside') {
                labelGroup.position[0] = 10;
                labelGroup.position[1] = this.imageHeight + padding + labelMargin + 5;
                cardShape.style.height = labelGroup.position[1] + labelY;
            } else {
                labelGroup.position[0] = cardWidth + 10;
                labelGroup.position[1] = 5;
            }

            this.group.addChild(cardShape);
            this.group.addChild(imageShape);
            this.group.addChild(labelGroup);

            this._cardShape = cardShape;
            this._imageShape = imageShape;

            // Update bounding rect
            if (this.labelPosition === 'inside') {
                this.rect.width = cardWidth;
                this.rect.height = cardShape.style.height;
            } else {
                this.rect.width = cardWidth + 10 + labelWidth;
                this.rect.height = cardHeight;
            }
        },
        getOutPosition: function() {
            return [
                this._cardShape.style.width / 2 + this.group.position[0],
                this._cardShape.style.height + this.group.position[1] + this._cardShape.style.arrowSize[1]
            ];
        },
        getInPosition: function() {
            return [
                this._cardShape.style.width / 2 + this.group.position[0],
                this.group.position[1]
            ];
        },

        update: function(zr) {

        },

        highlight: function(zr) {
            // this._cardShape.style.color = this.highlightColor;
            this._cardShape.style.shadowBlur = 20;
            this._cardShape.style.shadowColor = 'white';
            zr.modShape(this._cardShape.id);
        },

        lowlight: function(zr) {
            // this._cardShape.style.color = this.color;
            this._cardShape.style.shadowBlur = 5;
            this._cardShape.style.shadowColor = '#333';
            zr.modShape(this._cardShape.id);
        },

        isImageLoad: function() {
            return this._isImageLoad;
        },

        loadImage: function(zr) {
            var self = this;
            var image = new Image();
            image.onload = function() {
                image.onload = image.oerror = null;
                self._imageShape.style.image = image;
                zr.refreshNextFrame();
            }
            image.onerror = function() {
                image.onload = image.onerror = null;
                self._imageShape.style.image = defaultImage;
                zr.refreshNextFrame();
            }
            image.src = this.image;
            this._isImageLoad = true;
            zr.modShape(this._imageShape);
        },

        setScale: function(zr, scale) {
            this._scale = scale;
            this._cardShape.style.shadowBlur = 5 * Math.pow(scale, 4);
            this.group.scale[0] = scale;
            this.group.scale[1] = scale;
            this.group.scale[2] = this._cardShape.style.width / 2;
            this.group.scale[3] = this._cardShape.style.height / 2;

            zr.modGroup(this.group.id);
        },

        getScale: function() {
            return this._scale;
        }
    });

    return NodeEntity;
});
define('js/TreeShape',['require','zrender/shape/Base','zrender/tool/util'],function(require) {

    'use strict';

    var ShapeBase = require('zrender/shape/Base');

    function TreeShape(options) {
        this.brushTypeOnly = 'stroke';
        ShapeBase.call(this, options);
    }

    function xSortFunc(a, b) {
        return a[0] - b[0];
    }

    TreeShape.prototype = {

        type: 'card',

        buildPath: function(ctx, style) {
            var parent = style.parent;
            var children = style.children;
            var minX = Infinity;
            var maxX = -Infinity;
            var midY = 0;

            // children.sort(xSortFunc);

            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                midY += child[1];
                var minX = Math.min(minX, child[0]);
                var maxX = Math.max(maxX, child[0]);
            }
            midY /= children.length;
            midY = (midY + parent[1]) / 2;

            if (children.length === 1) {
                var firstChild = children[0];
                ctx.moveTo(parent[0], parent[1]);
                ctx.lineTo(parent[0], midY);
                ctx.lineTo(firstChild[0], midY);
                ctx.lineTo(firstChild[0], firstChild[1]);
            } else {
                ctx.moveTo(parent[0], parent[1]);
                ctx.lineTo(parent[0], midY);

                // Outline
                // --------
                // |      |
                var firstChild = children[0];
                var lastChild = children[children.length - 1];
                ctx.moveTo(firstChild[0], firstChild[1]);
                ctx.lineTo(minX, midY);
                ctx.lineTo(maxX, midY);
                ctx.lineTo(lastChild[0], lastChild[1])

                for (var i = 1; i < children.length - 1; i++) {
                    var child = children[i];
                    ctx.moveTo(child[0], midY);
                    ctx.lineTo(child[0], child[1]);
                }
            }
        },

        /**
         * 返回矩形区域，用于局部刷新和文字定位
         * @param {Object} style
         */
        getRect : function(style) {
            if (style.__rect) {
                return style.__rect;
            }
            
            var lineWidth;
            if (style.brushType == 'stroke' || style.brushType == 'fill') {
                lineWidth = style.lineWidth || 1;
            }
            else {
                lineWidth = 0;
            }

            var minX = Infinity;
            var maxX = -Infinity;
            var minY = Infinity;
            var maxY = -Infinity;
            for (var i = 0; i < style.children.length; i++) {
                var child = style.children[i];
                var minX = Math.min(minX, child[0]);
                var maxX = Math.max(maxX, child[0]);

                var minY = Math.min(minY, child[1]);
                var maxY = Math.max(maxY, child[1]);
            }

            style.__rect = {
                x : minX - lineWidth / 2,
                y : minY,
                width : maxX - minX + lineWidth,
                height : maxY - minY
            };
            
            return style.__rect;
        }
    }

    require('zrender/tool/util').inherits(TreeShape, ShapeBase);
    return TreeShape;
});
define('js/Graph',['require'],function(require) {

    'use strict';

    var Graph = function() {
        this.nodes = [];
        this.edges = [];

        this._nodesMap = {};
        this._edgesMap = {};
    }

    Graph.prototype.addNode = function(name, extraData) {
        if (this._nodesMap[name]) {
            return this._nodesMap[name];
        }

        var node = new Graph.Node(name);

        if (extraData) {
            for (var key in extraData) {
                if (key == 'name' || key == 'edges') {
                    continue;
                }
                if (extraData.hasOwnProperty(key)) {
                    node[key] = extraData[key];
                }
            }
        }

        this.nodes.push(node);

        this._nodesMap[name] = node;
        return node;
    }

    Graph.prototype.getNodeByName = function(name) {
        return this._nodesMap[name];
    }

    Graph.prototype.addEdge = function(source, target, extraData) {
        if (typeof(source) == 'string') {
            source = this._nodesMap[source];
        }
        if (typeof(target) == 'string') {
            target = this._nodesMap[target];
        }
        if (! source || !target) {
            return;
        }

        var key = source.name + '-' + target.name;
        if (this._edgesMap[key]) {
            return this._edgesMap[key];
        }
        var edge = new Graph.Edge(source, target);

        if (extraData) {
            for (var key in extraData) {
                if (key == 'source' || key == 'target') {
                    continue;
                }
                if (extraData.hasOwnProperty(key)) {
                    edge[key] = extraData[key];
                }
            }
        }

        source.outEdges.push(edge);
        target.inEdges.push(edge);

        this.edges.push(edge);
        this._edgesMap[key] = edge;

        return edge;
    }

    /**
     * Get a new create filtered graph
     * @param  {string} name
     * @param  {number} maxDepth
     * @param {number} w1 跟中心节点相关的边的最低权重
     * @param {number} w2 其它边的最低权重
     * @return {Graph}
     */
    Graph.prototype.filter = function(name, maxDepth, w1, w2) {
        var graph = new Graph();
        if (!name || !this._nodesMap[name]) {
            return graph;
        }
        if (typeof(w1) == 'undefined') {
            w1 = 0;
        }
        if (typeof(w2) == 'undefined') {
            w2 = w1;
        }

        var node = this._nodesMap[name];

        filter(node, graph.addNode(node.name), 0);

        function filter(node, newNode, depth) {
            if (depth >= maxDepth) {
                return;
            }
            var edges = node.edges;

            for (var i = 0; i < edges.length; i++) {
                var edge = edges[i];
                var w = depth == 0 ? w1 : w2;
                if (edge.weight < w) {
                    continue;
                }

                if (edge.source === node) {
                    var target = graph.addNode(edge.target.name);
                    graph.addEdge(newNode, target, edge.weight);

                    filter(edge.target, target, depth+1);
                } else {
                    var source = graph.addNode(edge.source.name);
                    graph.addEdge(source, newNode, edge.weight);

                    filter(edge.source, source, depth+1);
                }
            }
        }

        // Find if any relation between each nodes
        for (var i = 0; i < graph.nodes.length; i++) {
            var na = graph.nodes[i];
            for (var j = 0; j < graph.nodes.length; j++) {
                var nb = graph.nodes[j];
                var key = na.name + '-' + nb.name;
                var edge = this._edgesMap[key];
                if (edge) {
                    var w = na.name == name || nb.name == name ? w1 : w2;
                    if (edge.weight < w) {
                        continue;
                    }
                    graph.addEdge(na, nb, edge.weight);
                } else {
                    key = nb.name + '-' + na.name;
                    edge = this._edgesMap[key];
                    if (edge) {
                        var w = na.name == name || nb.name == name ? w1 : w2;
                        if (edge.weight < w) {
                            continue;
                        }
                        graph.addEdge(nb, na, edge.weight);
                    }
                }
            }
        }

        return graph;
    }

    // TODO Test
    Graph.prototype.removeEdge = function(edge) {
        var key = source.name + '-' + target.name;
        edge.source.outEdges.splice(indexOf(edge.source.outEdges, edge), 1);
        edge.target.inEdges.splice(indexOf(edge.target.inEdges, edge), 1);

        delete this._edgesMap[edge];
        this.edges.splice(indexOf(this.edges, edge), 1);
    }

    // TODO Test
    Graph.prototype.removeNode = function(node) {
        var name = node.name;
        delete this._nodesMap[name];
        this.nodes.splice(indexOf(this.nodes, node), 1);

        for (var i = 0; i < this.edges.length;) {
            var edge = this.edges[i];
            if (edge.source == node || edge.target == node) {
                this.removeEdge(edge);
            } else {
                i++;
            }
        }
    }

    Graph.prototype.eachNode = function(cb, context) {
        for (var i = 0; i < this.nodes.length; i++) {
            cb.call(context, this.nodes[i]);
        }
    }

    Graph.prototype.eachEdge = function(cb, context) {
        for (var i = 0; i < this.edges.length; i++) {
            cb.call(context, this.edges[i]);
        }
    }

    Graph.Node = function(name) {
        this.name = name;
        this.inEdges = [];
        this.outEdges = [];
    }

    Graph.Node.prototype.degree = function() {
        return this.inEdges.length + outEdges.length; 
    }

    Graph.Node.prototype.inDegree = function() {
        return this.inEdges.length;
    }

    Graph.Node.prototype.outDegree = function() {
        return this.outEdges.length;
    }

    Graph.Edge = function(source, target) {
        this.source = source;
        this.target = target;
    }

    /**
     * 查询数组中元素的index
     */
    function indexOf(array, value){
        if (array.indexOf) {
            return array.indexOf(value);
        }
        for(var i = 0, len=array.length; i<len; i++) {
            if (array[i] === value) {
                return i;
            }
        }
        return -1;
    }

    return Graph;
});
// Parallax
define('js/Parallax',['require'],function(require) {

    function Parallax(dom) {
        if (typeof(dom) === 'string') {
            dom = document.getElementById(dom)
        }
        var current = dom.firstChild;
        var bgLayers = [];

        while (current) {
            if (current.className && current.className.indexOf('bg-layer') >= 0) {
                bgLayers.push(current);
            }
            current = current.nextSibling;
        }
        for (var i = 0; i < bgLayers.length; i++) {
            var bgLayer = bgLayers[i];
            bgLayer._offsetX = bgLayer.clientWidth - dom.clientWidth;
            bgLayer._offsetY = bgLayer.clientWidth - dom.clientWidth;
        }
        this._root = dom;
        this._bgLayers = bgLayers;
    }

    Parallax.prototype.scaleBase = 0.5;
    Parallax.prototype.scaleStep = 0.5;

    Parallax.prototype.moveTo = function(x, y) {
        var scale = this.scaleBase;
        for (var i = 0; i < this._bgLayers.length; i++) {
            var bgLayer = this._bgLayers[i];
            var left = x * scale;
            var top = y * scale;
            scale *= this.scaleStep;

            left = -Math.max(Math.min(-left, bgLayer._offsetX), 0);
            top = -Math.max(Math.min(-top, bgLayer._offsetY), 0);

            // PENDING
            // Use translate3d to create layer
            var transform = 'translate3d(' + Math.round(left) + 'px,' + Math.round(top) + 'px, 0px)';
            bgLayer.style.WebkitTransform = transform;
            bgLayer.style.MozTransform = transform;
            bgLayer.style.transform = transform;
            // bgLayer.style.left = left + 'px';
            // bgLayer.style.top = top + 'px';
        }
    }

    return Parallax;
});
define('js/Tree',['require'],function(Tree) {

    function TreeNode(name) {
        this.name = name;
        this.level = 0;
        this.height = 0;
        this.children = [];

        this.data = {};
        this.layout = {};
    }

    TreeNode.prototype.traverse = function(cb) {
        cb(this);

        for (var i = 0; i < this.children.length; i++) {
            this.children[i].traverse(cb);
        }
    }

    TreeNode.prototype.update = function(level) {
        var height = 0;
        this.level = level;
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            child.update(level + 1);
            if (child.height > height) {
                height = child.height;
            }
        }
        this.height = height + 1;
    }

    TreeNode.prototype.find = function(name) {
        if (this.name === name) {
            return this;
        }
        for (var i = 0; i < this.children.length; i++) {
            var res = this.children[i].find(name);
            if (res) {
                return res;
            }
        }
    }

    function Tree(name) {
        this.root = new TreeNode(name);
    }

    Tree.prototype.traverse = function(cb) {
        this.root.traverse(cb);
    }

    Tree.prototype.getSubTree = function(name) {
        var root = this.find(name);
        if (root) {
            var tree = new Tree(root.name);
            tree.root = root;
            return tree;
        }
    }

    Tree.prototype.find = function(name) {
        return this.root.find(name);
    }

    Tree.fromGraph = function(graph) {

        function buildHierarch(root) {
            for (var i = 0; i < root.data.outEdges.length; i++) {
                var edge = root.data.outEdges[i];
                var childTreeNode = treeNodesMap[edge.target.name]
                root.children.push(childTreeNode);
                buildHierarch(childTreeNode);
            }
        }

        var treeMap = {};
        var treeNodesMap = {};
        for (var i = 0; i < graph.nodes.length; i++) {
            var node = graph.nodes[i];
            var treeNode;
            if (node.inDegree() == 0) {
                treeMap[node.name] = new Tree(node.name);
                treeNode = treeMap[node.name].root;
            } else {
                treeNode = new TreeNode(node.name);
            }

            treeNode.data = node;
            treeNode.layout.width = node.width;
            treeNode.layout.height = node.height;

            treeNodesMap[node.name] = treeNode;
        }
        var treeList = [];
        for (var name in treeMap) {
            buildHierarch(treeMap[name].root);
            treeMap[name].root.update(0);
            treeList.push(treeMap[name]);
        }
        return treeList;
    }

    return Tree;
});
define('js/TreeLayout',['require'],function(require) {


    function TreeLayout(tree) {
        this.tree = tree;
        this.nodePadding = 30;
        this.layerPadding = 100;

        this._layerOffsets = [];

        this._layers = [];
    }

    TreeLayout.prototype.run = function() {
        this._layerOffsets.length = 0;
        for (var i = 0; i < this.tree.root.height + 1; i++) {
            this._layerOffsets[i] = 0;
            this._layers[i] = [];
        }
        this._updateNodeXPosition(this.tree.root);
        var root = this.tree.root;
        this._updateNodeYPosition(root, 0, root.layout.height);
    }

    TreeLayout.prototype._updateNodeXPosition = function(node) {
        var minX = Infinity;
        var maxX = -Infinity;
        for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            this._updateNodeXPosition(child);
            var x = child.layout.x;
            if (x < minX) {
                minX = x;
            }
            if (x > maxX) {
                maxX = x;
            }
        }
        if (node.children.length > 0) {
            node.layout.x = (minX + maxX) / 2;
        } else {
            node.layout.x = 0;
        }
        var off = this._layerOffsets[node.level] || 0;
        if (off > node.layout.x) {
            var shift = off - node.layout.x;
            this._shiftSubtree(node, shift);
            for (var i = node.level + 1; i < node.height + node.level; i++) {
                this._layerOffsets[i] += shift;
            }
        }
        this._layerOffsets[node.level] = node.layout.x + node.layout.width + this.nodePadding;

        this._layers[node.level].push(node);
    }

    TreeLayout.prototype._shiftSubtree = function(root, offset) {
        root.layout.x += offset;
        for (var i = 0; i < root.children.length; i++) {
            this._shiftSubtree(root.children[i], offset);
        }
    }

    TreeLayout.prototype._updateNodeYPosition = function(node, y, prevLayerHeight) {
        node.layout.y = y;
        var layerHeight = 0;
        for (var i = 0; i < node.children.length; i++) {
            layerHeight = Math.max(node.children[i].layout.height, layerHeight);
        }
        for (var i = 0; i < node.children.length; i++) {
            this._updateNodeYPosition(node.children[i], y + this.layerPadding + prevLayerHeight, layerHeight);
        }
    }

    return TreeLayout;
});
define('js/hierarchy',['require','exports','module','zrender','./NodeEntity','./TreeShape','./Graph','zrender/animation/Animation','zrender/tool/vector','./Parallax','./Tree','./TreeLayout'],function(require, exports, module) {

    var zrender = require('zrender');
    var NodeEntity = require('./NodeEntity');
    var TreeShape = require('./TreeShape');
    var Graph = require('./Graph');
    var Animation = require('zrender/animation/Animation');
    var vec2 = require('zrender/tool/vector');
    var Parallax = require('./Parallax');
    var Tree = require('./Tree');
    var TreeLayout = require('./TreeLayout');
    
    var graph;
    var zr;
    var parallax;
    var animation;

    var config = module.config();
    config = config || {};
    var imageUrl = config.imageUrl || '';

    var industries = {};
    var colorList = ['#7f5ce1', '#952492', '#c93558', '#4ba310', '#dc7c0b'];

    var isIE8 = document.createElement('canvas').getContext;

    // Interface
    var hierarchy = {

        start: function(graphData, mainNode) {
            graph = new Graph();
            zr = zrender.init(document.getElementById('main'));
            parallax = new Parallax('bg');
            parallax.scaleBase = 0.15;
            parallax.scaleStep = 0.5;
            animation = new Animation();
            animation.start();

            var industryCount = 0;
            for (var i = 0; i < graphData.nodes.length; i++) {
                var n = graphData.nodes[i];
                if (n && n.profession_type) {
                    var industry = industries[n.profession_type];
                    if (!industry) {
                        var color = colorList[industryCount];
                        industries[n.profession_type] = {
                            color: color,
                            name: name
                        };
                        industryCount++;
                    }
                }
            }
            for (var i = 0; i < graphData.nodes.length; i++) {
                var n = graphData.nodes[i];
                if (!n) {
                    continue;
                }
                var node = graph.addNode(n.name, n);

                var isMainNode = node.name === mainNode;
                node.isMain = isMainNode;

                var industry = industries[node.profession_type];
                if (industry) {
                    var color = industry.color;
                } else {
                    var color = '#0fb8c3';
                }

                var image = imageUrl.replace('{name}', node.name);

                var labelList = [{
                    text: node.name,
                    font: 'bold 14px 微软雅黑'
                }];
                if (node.reason) {
                    labelList.push({
                        text: node.reason,
                        font: 'bold 10px 微软雅黑'
                    });
                }
                if (node.short_title) {
                    labelList.push({
                        text: node.short_title,
                        font: '12px 微软雅黑'
                    });
                }
                if (node.ice_action_type) {
                    labelList.push({
                        text: node.ice_action_type,
                        font: '10px 微软雅黑'
                    });
                }

                node.entity = new NodeEntity({
                    image: node.logo_image || image || 'imgs/sample-man.jpg',
                    imageWidth: isMainNode ? 120 : 70,
                    imageHeight: isMainNode ? 120 : 70,
                    color: color,
                    labelList: labelList,
                    labelPosition: isMainNode ? 'inside' : 'outside'
                });
            }

            for (var i = 0; i < graphData.edges.length; i++) {
                var e = graphData.edges[i];
                if (!e) {
                    continue;
                }
                var edge = graph.addEdge(e.source, e.target);
            }

            var tree = Tree.fromGraph(graph)[0];
            tree.traverse(function(node) {
                node.layout.width = node.data.entity.rect.width;
                node.layout.height = node.data.entity.rect.height;
            });
            // Layouting

            window.layout = new TreeLayout(tree);
            layout.run();

            layout.tree.traverse(function(treeNode) {
                var node = treeNode.data;
                node.entity.group.position[0] = treeNode.layout.x;
                node.entity.group.position[1] = treeNode.layout.y;
            });

            // Draw
            graph.eachNode(function(node) {
                zr.addGroup(node.entity.group);

                if (node.outDegree() > 0) {
                    // Draw out three shapes
                    var treeShape = new TreeShape({
                        style: {
                            parent: node.entity.getOutPosition(),
                            children: [],
                            lineWidth: 2,
                            strokeColor: '#a9ecff',
                            lineJoin: 'round',
                            opacity: 0.6
                        },
                        z: -1,
                        hoverable: false
                    });
                    node.treeShape = treeShape;

                    for (var i = 0; i < node.outEdges.length; i++) {
                        var e = node.outEdges[i];
                        treeShape.style.children.push(e.target.entity.getInPosition());
                    }

                    zr.addShape(treeShape);
                }

                // 浮层
                if (isIE8) {
                    node.entity.on('click', function() {
                        hierarchy.popup(node.name, node.entity.color);
                    });
                    node.entity.on('mouseover', function() {
                        node.entity.highlight(zr);
                        zr.refreshNextFrame();
                    });
                    node.entity.on('mouseout', function() {
                        node.entity.lowlight(zr);
                        zr.refreshNextFrame();
                    });
                }
            });

            zr.modLayer(0, {
                panable: true,
                zoomable: true,
                maxZoom: 2,
                minZoom: 0.2
            });
            zr.render();

            var zrRefresh = zr.painter.refresh;

            zr.painter.refresh = function() {
                var layer = zr.painter.getLayer(0);

                // Culling
                var width = zr.getWidth();
                var height = zr.getHeight();
                var min = [0, 0];
                var max = [0, 0];
                for (var i = 0; i < graph.nodes.length; i++) {
                    var card = graph.nodes[i].entity;
                    var treeShape = graph.nodes[i].treeShape;

                    // Culling card
                    min[0] = card.rect.x + card.group.position[0];
                    min[1] = card.rect.y + card.group.position[1];
                    max[0] = card.rect.width + min[0];
                    max[1] = card.rect.height + min[1];
                    if (layer.transform) {
                        vec2.applyTransform(min, min, layer.transform);
                        vec2.applyTransform(max, max, layer.transform);
                    }
                    var ignore = min[0] > width || min[1] > height || max[0] < 0 || max[1] < 0;
                    graph.nodes[i].entity.group.ignore = ignore;

                    // Layzing loading image
                    if (!ignore && !card.isImageLoad()) {
                        card.loadImage(zr);
                    }

                    // Culling tree shape
                    if (treeShape) {
                        var rect = treeShape.getRect(treeShape.style);
                        min[0] = rect.x;
                        min[1] = rect.y;
                        max[0] = rect.width + min[0];
                        max[1] = rect.height + min[1];
                        if (layer.transform) {
                            vec2.applyTransform(min, min, layer.transform);
                            vec2.applyTransform(max, max, layer.transform);
                        }
                        var ignore = min[0] > width || min[1] > height || max[0] < 0 || max[1] < 0;
                        treeShape.ignore = ignore;
                    }
                }

                // Parallax
                parallax.moveTo(layer.position[0] / layer.scale[0], layer.position[1] / layer.scale[1]);

                zrRefresh.apply(this, arguments);
            }
            setTimeout(function() {
                hierarchy.moveTo(mainNode);
            }, 20);
        },

        moveTo: function(name, noAnim) {
            if (!zr) {
                return;
            }

            var layer = zr.painter.getLayer(0);
            var node = graph.getNodeByName(name);
            if (!node) {
                return;
            }
            var self = this;

            var pos = Array.prototype.slice.call(node.entity.group.position);
            pos[1] += node.entity.rect.height;
            pos = vec2.mul([], pos, layer.scale);
            var target = [zr.getWidth() / 2, zr.getHeight() / 2];

            var newPos = vec2.sub([], target, pos);

            if (noAnim) {
                layer.position = newPos;
                layer.dirty = true;
                zr.refresh();
            } else {
                hierarchy._moveToPos(newPos, function() {
                    if (node.isMain) {
                        return
                    }
                    function cb() {
                        var scaleObj = {
                            scale: node.entity.getScale()
                        };
                        animation.animate(scaleObj)
                            .when(500, {
                                scale: 1.3
                            })
                            .during(function() {
                                node.entity.setScale(zr, scaleObj.scale);
                                zr.refresh();
                            })
                            .start('BounceOut');
                    }
                    if (layer.__zoom && layer.__zoom !== 1) {
                        self._scaleToRatio(1, cb);
                    } else {
                        cb && cb();
                    }
                });
            }

            // Highlight
            for (var i = 0; i < graph.nodes.length; i++) {
                graph.nodes[i].entity.setScale(zr, 1);
            }
            zr.refreshNextFrame();
        },

        moveLeft: function() {
            if (!zr) {
                return;
            }
            var layer = zr.painter.getLayer(0);
            var newPos = Array.prototype.slice.call(layer.position);
            newPos[0] += zr.getWidth() * 0.6;

            hierarchy._moveToPos(newPos);
        },

        moveRight: function() {
            if (!zr) {
                return;
            }
            var layer = zr.painter.getLayer(0);
            var newPos = Array.prototype.slice.call(layer.position);
            newPos[0] -= zr.getWidth() * 0.6;

            hierarchy._moveToPos(newPos);
        },

        moveTop: function() {
            if (!zr) {
                return;
            }
            var layer = zr.painter.getLayer(0);
            var newPos = Array.prototype.slice.call(layer.position);
            newPos[1] += zr.getHeight() * 0.3;

            hierarchy._moveToPos(newPos);
        },

        moveDown: function() {
            if (!zr) {
                return;
            }
            var layer = zr.painter.getLayer(0);
            var newPos = Array.prototype.slice.call(layer.position);
            newPos[1] -= zr.getHeight() * 0.3;

            hierarchy._moveToPos(newPos);
        },

        zoomIn: function() {
            if (!zr) {
                return;
            }
            var layer = zr.painter.getLayer(0);
            layer.__zoom = layer.__zoom || 1;
            hierarchy._scaleToRatio(layer.__zoom * 1.5);
        },

        zoomOut: function() {
            if (!zr) {
                return;
            }
            var layer = zr.painter.getLayer(0);
            layer.__zoom = layer.__zoom || 1;
            hierarchy._scaleToRatio(layer.__zoom / 1.5);
        },

        highlightIndustries: function(industries) {
            if (!zr) {
                return;
            }
        },

        _moveToPos: function(newPos, cb) {
            var layer = zr.painter.getLayer(0);
            var self = this;
            animation.clear();
            animation.animate(layer)
                .when(800, {
                    position: newPos
                })
                .during(function() {
                    parallax.moveTo(layer.position[0] / layer.scale[0], layer.position[1] / layer.scale[1]);
                    layer.dirty = true;
                    zr.refreshNextFrame();
                })
                .done(function() {
                    zr.refresh();
                    cb && cb();
                })
                .start('CubicInOut');
        },

        _scaleToRatio: function(zoom, cb) {
            var cx = zr.getWidth() / 2;
            var cy = zr.getHeight() / 2;
            var layer = zr.painter.getLayer(0);
            layer.__zoom = layer.__zoom || 1;
            var zoomScale = zoom / layer.__zoom;

            var newScale = Array.prototype.slice.call(layer.scale);
            var newPos = Array.prototype.slice.call(layer.position);
            newPos[0] -= (cx - newPos[0]) * (zoomScale - 1);
            newPos[1] -= (cy - newPos[1]) * (zoomScale - 1);
            newScale[0] *= zoomScale;
            newScale[1] *= zoomScale;

            animation.clear();
            animation.animate(layer)
                .when(800, {
                    position: newPos,
                    scale: newScale,
                    __zoom: zoom
                })
                .during(function() {
                    layer.dirty = true;
                    zr.refreshNextFrame();
                })
                .done(function() {
                    zr.refresh();
                    cb && cb();
                })
                .start('CubicInOut');
        },

        popup: function(name) {},

        legends: industries
    }

    // setTimeout(function() {
    //     hierarchy.moveTo('王思聪');
    // }, 1000);
    // 
    window.onresize = function() {
        zr.resize();
    }

    return hierarchy;
});
define('js/log',[],function() {
    return function(fm, title, href){
        var url = 'http://nsclick.baidu.com/v.gif?pid=201&pj=www';
        var data = {
            fm: fm,
            path: document.location.href,
            title: title,
            url: href || "",
            refer: document.referrer
        };
        for(var i in data){
            if(data.hasOwnProperty(i)){
                url += '&' + i + '=' + encodeURIComponent(data[i]);
            }
        }
        var img = window["BD_PS_C" + (new Date()).getTime()] = new Image();
        img.src = url;
    };
});
define('js/index',['require','../lib/es5shim','zrender/tool/event','./asciiLogo.txt','./hierarchy','./log'],function(require) {

    require('../lib/es5shim');

    var zrEvent = require('zrender/tool/event');

    if (typeof(console) !== 'undefined' && console.log) {
        console.log(require('./asciiLogo.txt'));
        console.log('\n\n\n%chttp://echarts.baidu.com', 'font-size:14px;');
    }

    var hierarchy = require('./hierarchy');
    var log = require('./log');

    var data;

    // 展现日志
    log('zhishitupuse', '');

    //人物搜索
    function searchUser(query){
        //检索数据
        var users = [];
        if(query.replace(/(^\s*)|(\s*$)/g, "") == ""){
            users = data.nodes;
        }else{
            for(var i = 0; i < data.nodes.length; i++){
                var u = data.nodes[i];
                if(u && u.name.toLowerCase().indexOf(query.toLowerCase())>=0){
                    users.push(u);
                }
            }
        } 

        if (''.localeCompare) {
            users.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });   
        }
        //生成img list
        var li_list = [];
        for(var i = 0; i < users.length; i++){
            var u = users[i];
            li_list.push('<li>\
                <a href="javascript:;">\
                    <img data-src="'+ u.logo_image +'" alt="'+ u.name +'" />\
                </a>\
                <span class="title">' + u.name + '</span>\
            </li>');
        }
        li_list.push('<li><a href="#"></a></li>');

        var html = '<ul id="carousel" class="elastislide-list">';
        html = html + li_list.join();
        html = html + "</ul>";

        $("#img-scroll-list").html(html); 

        $('#carousel').elastislide( {
            minItems : 2,
            speed: 0.5,
            easing: 'ease-out'
        });
    }

    //人物精确匹配
    function loadUserData(usrName){
        var user = false;
        for(var i in data.nodes){
            var u = data.nodes[i];
            if(u.name == usrName){
                user = u;
                break;
            }
        } 

        return user; 
    }

    //弹窗
    function popup(usrName, color){

        log('zhishitupuclick', usrName);

        var u = loadUserData(usrName);
        if (u) {
            $("#dialog_name").html(u.name);
            $("#dialog_title").html(u.long_title || '');
            if (u.description.length > 200) {
                var description = u.description.substring(0, 200) + '…';
            } else {
                var description = u.description;
            }
            $("#dialog_description").html(description);

            $("#modalDialog_kg_iceb .modal-background").css("background-color", color);
            
            // Reset
            $("#dialog_img_url0 img").attr("src", '');
            $("#dialog_img_url0").attr("href", '#');
            $("#dialog_img_url0").attr("target", '_self');
            $("#dialog_img_url1").hide();
            $("#dialog_video_tumb").hide();
            if (u.video_image) {
                $("#dialog_img_url0 img").attr("src", u.video_image);
                $('#dialog_video_tumb').show();
                
                if (u.video_url) {
                    $("#dialog_img_url0").attr("href",u.video_url);
                    $("#dialog_img_url0").attr("target", '_blank');
                    $("#dialog_img_url1").attr("href",u.video_url);
                    $("#dialog_img_url1").show();
                }
            }

            if (u.baike_url) {
                $("#dialog_more").attr("href",u.baike_url).show();
            } else {
                $("#dialog_more").hide();
            }
            //调用弹窗
            $('#modalDialog_kg_iceb').modal({
                keyboard: true
            });
        } 
    }

    return {
        start: function(_data) {
            
            data = _data;
            for (var i = 0; i < data.nodes.length;) {
                var n = data.nodes[i];
                if (!n || !n.name) { // Invalid data
                    data.nodes.splice(i, 1);
                } else {
                    i++;
                }
            }
            for (var i = 0; i < data.edges.length;) {
                var n = data.edges[i];
                if (!n) { // Invalid data
                    data.edges.splice(i, 1);
                } else {
                    i++;
                }
            }

            searchUser('');
            var result = document.referrer.match(/s?wd=(.+?)&/);
            if (!result) {
                result = document.referrer.match(/s?wd=(.+?)$/);
            }
            var mainNode = '冰桶挑战';
            if (result) {
                var queryName = decodeURIComponent(result[1]);
                var matchOffset = Infinity;
                for (var i = 0; i < data.nodes.length; i++) {
                    if (!data.nodes[i]) {
                        continue;
                    }
                    var offset = queryName.indexOf(data.nodes[i].name);
                    if (offset < matchOffset && offset >= 0) {
                        mainNode = data.nodes[i].name;
                        matchOffset = offset;
                    }
                }
            }

            hierarchy.start(_data, mainNode);

            hierarchy.popup = popup;

            for (var name in hierarchy.legends) {
                var legend = hierarchy.legends[name];

                $("#legends").append('\
                    <div class="item">\
                        <label class="color" style="background-color:' + legend.color + '"></label>\
                        <label class="name">' + name + '</label>\
                    </div>\
                ')
            }

            // Search
            var timeout;
            var prevVal;
            $(".search input").bind('keydown', function(e) {
                e.stopPropagation && e.stopPropagation();
                e.cancelBubble = true;
                clearTimeout(timeout);
                var $this = $(this);
                setTimeout(function() {
                    if ($this.val() !== prevVal) {
                        searchUser($this.val());
                        prevVal = $this.val();
                        log('zhishituputonglansearch', prevVal);
                    }
                }, 100);
            });
            $("#img-scroll-list").delegate("li","click", function(){
                var name = $(this).find('img').attr('alt');
                
                $('#img-scroll-list li').removeClass('active');
                $(this).addClass('active');

                log('zhishituputonglanmoveto', name);

                hierarchy.moveTo(name);
            });
            $('#img-scroll-list').delegate('.elastislide-next', 'click', function() {
                log('zhishituputonglannext', '');
            });
            $('#img-scroll-list').delegate('.elastislide-prev', 'click', function() {
                log('zhishituputonglanprev', '');
            });

            $('.footer .toggle-btn').bind('click', function() {
                $footer = $('.footer');
                $footer.toggleClass('active');
                if ($footer.hasClass('active')) {
                    log('zhishituputonglanshow');
                    $(this).html('隐 藏');
                } else {
                    log('zhishituputonglanhide');
                    $(this).html('显 示');
                }
            });

            var size = 102;
            var halfSize = size / 2;

            function getDirection(x, y) {
                y = halfSize - y;
                x = x - halfSize;
                var angle = Math.atan(y / x) * 180 / Math.PI;

                if (Math.abs(x) < 0.01) {
                    if (y > 0) {
                        return 'arrow-up';
                    } else {
                        return 'arrow-down';
                    }
                } else if (x > 0) {
                    if (angle < 45 && angle > -45) {
                        return 'arrow-right';
                    } else if (angle > 45) {
                        return 'arrow-up';
                    } else {
                        return 'arrow-down';
                    }
                } else {
                    x = -x;
                    if (angle < 45 && angle > -45) {
                        return 'arrow-left';
                    } else if (angle > 45) {
                        return 'arrow-down';
                    } else {
                        return 'arrow-up';
                    }
                }
            }
            var $arrows = $('#control .move>div');
            $('#control .move-cover')[0].onmousemove = function(e) {
                var x = zrEvent.getX(e);
                var y = zrEvent.getY(e);
                $arrows.removeClass('active');
                $('#' + getDirection(x, y)).addClass('active');
            };
            $('#control .move-cover').mouseout(function() {
                $arrows.removeClass('active');
            });

            $('#control .move-cover')[0].onclick = function(e) {
                var x = zrEvent.getX(e);
                var y = zrEvent.getY(e);

                switch(getDirection(x, y)) {
                    case 'arrow-left':
                        log('zhishitupumoveleft', 'virtualpad');
                        hierarchy.moveLeft();
                        break;
                    case 'arrow-right':
                        log('zhishitupumoveright', 'virtualpad');
                        hierarchy.moveRight();
                        break;
                    case 'arrow-up':
                        log('zhishitupumoveup', 'virtualpad');
                        hierarchy.moveTop();
                        break;
                    case 'arrow-down':
                        log('zhishitupumovedown', 'virtualpad');
                        hierarchy.moveDown();
                        break;
                }
            };

            $("#zoom-in").click(function() {
                log('zhishitupuzoomin', 'virtualpad');
                hierarchy.zoomIn();
            });
            $("#zoom-out").click(function() {
                log('zhishitupuzoomout', 'virtualpad');
                hierarchy.zoomOut();
            });

            $(document.body).keydown(function(e) {
                switch(e.keyCode) {
                    case 87: //w
                    case 38: //up arrow
                        log('zhishitupumovetop', 'keyboard');
                        hierarchy.moveTop();
                        break;
                    case 83: //s
                    case 40: //down arrow
                        log('zhishitupumovedown', 'keyboard');
                        hierarchy.moveDown();
                        break;
                    case 65: //a
                    case 37: //left arrow
                        log('zhishitupumoveleft', 'keyboard');
                        hierarchy.moveLeft();
                        break;
                    case 68: //d
                    case 39: //right arrow
                        log('zhishitupumoveright', 'keyboard');
                        hierarchy.moveRight();
                        break; 
                }
            });

            $('#dialog_more').click(function() {
                log('zhishitupubaike', $('#dialog_name').html());
            });
        }
    }
});