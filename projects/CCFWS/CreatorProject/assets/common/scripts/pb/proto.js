/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

//NOTE: FIXME
// var $protobuf = require("protobufjs/minimal");
var $protobuf = protobuf;



// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * TestEnum enum.
 * @exports TestEnum
 * @enum {string}
 * @property {number} A=1 A value
 * @property {number} B=100 B value
 * @property {number} C=101 C value
 */
$root.TestEnum = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[1] = "A"] = 1;
    values[valuesById[100] = "B"] = 100;
    values[valuesById[101] = "C"] = 101;
    return values;
})();

$root.TestMsgA = (function() {

    /**
     * Properties of a TestMsgA.
     * @exports ITestMsgA
     * @interface ITestMsgA
     * @property {string} A TestMsgA A
     * @property {number} B TestMsgA B
     * @property {number} C TestMsgA C
     * @property {boolean} D TestMsgA D
     * @property {number|null} [E] TestMsgA E
     */

    /**
     * Constructs a new TestMsgA.
     * @exports TestMsgA
     * @classdesc Represents a TestMsgA.
     * @implements ITestMsgA
     * @constructor
     * @param {ITestMsgA=} [properties] Properties to set
     */
    function TestMsgA(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TestMsgA A.
     * @member {string} A
     * @memberof TestMsgA
     * @instance
     */
    TestMsgA.prototype.A = "";

    /**
     * TestMsgA B.
     * @member {number} B
     * @memberof TestMsgA
     * @instance
     */
    TestMsgA.prototype.B = 0;

    /**
     * TestMsgA C.
     * @member {number} C
     * @memberof TestMsgA
     * @instance
     */
    TestMsgA.prototype.C = 0;

    /**
     * TestMsgA D.
     * @member {boolean} D
     * @memberof TestMsgA
     * @instance
     */
    TestMsgA.prototype.D = false;

    /**
     * TestMsgA E.
     * @member {number} E
     * @memberof TestMsgA
     * @instance
     */
    TestMsgA.prototype.E = 0;

    /**
     * Creates a new TestMsgA instance using the specified properties.
     * @function create
     * @memberof TestMsgA
     * @static
     * @param {ITestMsgA=} [properties] Properties to set
     * @returns {TestMsgA} TestMsgA instance
     */
    TestMsgA.create = function create(properties) {
        return new TestMsgA(properties);
    };

    /**
     * Encodes the specified TestMsgA message. Does not implicitly {@link TestMsgA.verify|verify} messages.
     * @function encode
     * @memberof TestMsgA
     * @static
     * @param {ITestMsgA} message TestMsgA message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TestMsgA.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.A);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.B);
        writer.uint32(/* id 3, wireType 1 =*/25).double(message.C);
        writer.uint32(/* id 4, wireType 0 =*/32).bool(message.D);
        if (message.E != null && message.hasOwnProperty("E"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.E);
        return writer;
    };

    /**
     * Encodes the specified TestMsgA message, length delimited. Does not implicitly {@link TestMsgA.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TestMsgA
     * @static
     * @param {ITestMsgA} message TestMsgA message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TestMsgA.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TestMsgA message from the specified reader or buffer.
     * @function decode
     * @memberof TestMsgA
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TestMsgA} TestMsgA
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TestMsgA.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TestMsgA();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.A = reader.string();
                break;
            case 2:
                message.B = reader.int32();
                break;
            case 3:
                message.C = reader.double();
                break;
            case 4:
                message.D = reader.bool();
                break;
            case 5:
                message.E = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("A"))
            throw $util.ProtocolError("missing required 'A'", { instance: message });
        if (!message.hasOwnProperty("B"))
            throw $util.ProtocolError("missing required 'B'", { instance: message });
        if (!message.hasOwnProperty("C"))
            throw $util.ProtocolError("missing required 'C'", { instance: message });
        if (!message.hasOwnProperty("D"))
            throw $util.ProtocolError("missing required 'D'", { instance: message });
        return message;
    };

    /**
     * Decodes a TestMsgA message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TestMsgA
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TestMsgA} TestMsgA
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TestMsgA.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TestMsgA message.
     * @function verify
     * @memberof TestMsgA
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TestMsgA.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.A))
            return "A: string expected";
        if (!$util.isInteger(message.B))
            return "B: integer expected";
        if (typeof message.C !== "number")
            return "C: number expected";
        if (typeof message.D !== "boolean")
            return "D: boolean expected";
        if (message.E != null && message.hasOwnProperty("E"))
            if (!$util.isInteger(message.E))
                return "E: integer expected";
        return null;
    };

    /**
     * Creates a TestMsgA message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TestMsgA
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TestMsgA} TestMsgA
     */
    TestMsgA.fromObject = function fromObject(object) {
        if (object instanceof $root.TestMsgA)
            return object;
        var message = new $root.TestMsgA();
        if (object.A != null)
            message.A = String(object.A);
        if (object.B != null)
            message.B = object.B | 0;
        if (object.C != null)
            message.C = Number(object.C);
        if (object.D != null)
            message.D = Boolean(object.D);
        if (object.E != null)
            message.E = object.E >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a TestMsgA message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TestMsgA
     * @static
     * @param {TestMsgA} message TestMsgA
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TestMsgA.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.A = "";
            object.B = 0;
            object.C = 0;
            object.D = false;
            object.E = 0;
        }
        if (message.A != null && message.hasOwnProperty("A"))
            object.A = message.A;
        if (message.B != null && message.hasOwnProperty("B"))
            object.B = message.B;
        if (message.C != null && message.hasOwnProperty("C"))
            object.C = options.json && !isFinite(message.C) ? String(message.C) : message.C;
        if (message.D != null && message.hasOwnProperty("D"))
            object.D = message.D;
        if (message.E != null && message.hasOwnProperty("E"))
            object.E = message.E;
        return object;
    };

    /**
     * Converts this TestMsgA to JSON.
     * @function toJSON
     * @memberof TestMsgA
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TestMsgA.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TestMsgA;
})();

$root.TestMsgB = (function() {

    /**
     * Properties of a TestMsgB.
     * @exports ITestMsgB
     * @interface ITestMsgB
     * @property {number} id TestMsgB id
     * @property {ITestMsgA|null} [msg] TestMsgB msg
     * @property {Array.<number>|null} [nums] TestMsgB nums
     */

    /**
     * Constructs a new TestMsgB.
     * @exports TestMsgB
     * @classdesc Represents a TestMsgB.
     * @implements ITestMsgB
     * @constructor
     * @param {ITestMsgB=} [properties] Properties to set
     */
    function TestMsgB(properties) {
        this.nums = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TestMsgB id.
     * @member {number} id
     * @memberof TestMsgB
     * @instance
     */
    TestMsgB.prototype.id = 0;

    /**
     * TestMsgB msg.
     * @member {ITestMsgA|null|undefined} msg
     * @memberof TestMsgB
     * @instance
     */
    TestMsgB.prototype.msg = null;

    /**
     * TestMsgB nums.
     * @member {Array.<number>} nums
     * @memberof TestMsgB
     * @instance
     */
    TestMsgB.prototype.nums = $util.emptyArray;

    /**
     * Creates a new TestMsgB instance using the specified properties.
     * @function create
     * @memberof TestMsgB
     * @static
     * @param {ITestMsgB=} [properties] Properties to set
     * @returns {TestMsgB} TestMsgB instance
     */
    TestMsgB.create = function create(properties) {
        return new TestMsgB(properties);
    };

    /**
     * Encodes the specified TestMsgB message. Does not implicitly {@link TestMsgB.verify|verify} messages.
     * @function encode
     * @memberof TestMsgB
     * @static
     * @param {ITestMsgB} message TestMsgB message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TestMsgB.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
        if (message.msg != null && message.hasOwnProperty("msg"))
            $root.TestMsgA.encode(message.msg, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.nums != null && message.nums.length)
            for (var i = 0; i < message.nums.length; ++i)
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.nums[i]);
        return writer;
    };

    /**
     * Encodes the specified TestMsgB message, length delimited. Does not implicitly {@link TestMsgB.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TestMsgB
     * @static
     * @param {ITestMsgB} message TestMsgB message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TestMsgB.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TestMsgB message from the specified reader or buffer.
     * @function decode
     * @memberof TestMsgB
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TestMsgB} TestMsgB
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TestMsgB.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TestMsgB();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.int32();
                break;
            case 2:
                message.msg = $root.TestMsgA.decode(reader, reader.uint32());
                break;
            case 3:
                if (!(message.nums && message.nums.length))
                    message.nums = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.nums.push(reader.int32());
                } else
                    message.nums.push(reader.int32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("id"))
            throw $util.ProtocolError("missing required 'id'", { instance: message });
        return message;
    };

    /**
     * Decodes a TestMsgB message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TestMsgB
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TestMsgB} TestMsgB
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TestMsgB.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TestMsgB message.
     * @function verify
     * @memberof TestMsgB
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TestMsgB.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.id))
            return "id: integer expected";
        if (message.msg != null && message.hasOwnProperty("msg")) {
            var error = $root.TestMsgA.verify(message.msg);
            if (error)
                return "msg." + error;
        }
        if (message.nums != null && message.hasOwnProperty("nums")) {
            if (!Array.isArray(message.nums))
                return "nums: array expected";
            for (var i = 0; i < message.nums.length; ++i)
                if (!$util.isInteger(message.nums[i]))
                    return "nums: integer[] expected";
        }
        return null;
    };

    /**
     * Creates a TestMsgB message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TestMsgB
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TestMsgB} TestMsgB
     */
    TestMsgB.fromObject = function fromObject(object) {
        if (object instanceof $root.TestMsgB)
            return object;
        var message = new $root.TestMsgB();
        if (object.id != null)
            message.id = object.id | 0;
        if (object.msg != null) {
            if (typeof object.msg !== "object")
                throw TypeError(".TestMsgB.msg: object expected");
            message.msg = $root.TestMsgA.fromObject(object.msg);
        }
        if (object.nums) {
            if (!Array.isArray(object.nums))
                throw TypeError(".TestMsgB.nums: array expected");
            message.nums = [];
            for (var i = 0; i < object.nums.length; ++i)
                message.nums[i] = object.nums[i] | 0;
        }
        return message;
    };

    /**
     * Creates a plain object from a TestMsgB message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TestMsgB
     * @static
     * @param {TestMsgB} message TestMsgB
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TestMsgB.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.nums = [];
        if (options.defaults) {
            object.id = 0;
            object.msg = null;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.msg != null && message.hasOwnProperty("msg"))
            object.msg = $root.TestMsgA.toObject(message.msg, options);
        if (message.nums && message.nums.length) {
            object.nums = [];
            for (var j = 0; j < message.nums.length; ++j)
                object.nums[j] = message.nums[j];
        }
        return object;
    };

    /**
     * Converts this TestMsgB to JSON.
     * @function toJSON
     * @memberof TestMsgB
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TestMsgB.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TestMsgB;
})();

module.exports = $root;
