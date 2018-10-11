import * as $protobuf from "protobufjs";
/** TestEnum enum. */
export enum TestEnum {
    A = 1,
    B = 100,
    C = 101
}

/** Properties of a TestMsgA. */
export interface ITestMsgA {

    /** TestMsgA A */
    A: string;

    /** TestMsgA B */
    B: number;

    /** TestMsgA C */
    C: number;

    /** TestMsgA D */
    D: boolean;

    /** TestMsgA E */
    E?: (number|null);
}

/** Represents a TestMsgA. */
export class TestMsgA implements ITestMsgA {

    /**
     * Constructs a new TestMsgA.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITestMsgA);

    /** TestMsgA A. */
    public A: string;

    /** TestMsgA B. */
    public B: number;

    /** TestMsgA C. */
    public C: number;

    /** TestMsgA D. */
    public D: boolean;

    /** TestMsgA E. */
    public E: number;

    /**
     * Creates a new TestMsgA instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TestMsgA instance
     */
    public static create(properties?: ITestMsgA): TestMsgA;

    /**
     * Encodes the specified TestMsgA message. Does not implicitly {@link TestMsgA.verify|verify} messages.
     * @param message TestMsgA message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ITestMsgA, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified TestMsgA message, length delimited. Does not implicitly {@link TestMsgA.verify|verify} messages.
     * @param message TestMsgA message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ITestMsgA, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a TestMsgA message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns TestMsgA
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TestMsgA;

    /**
     * Decodes a TestMsgA message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns TestMsgA
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TestMsgA;

    /**
     * Verifies a TestMsgA message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a TestMsgA message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns TestMsgA
     */
    public static fromObject(object: { [k: string]: any }): TestMsgA;

    /**
     * Creates a plain object from a TestMsgA message. Also converts values to other types if specified.
     * @param message TestMsgA
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: TestMsgA, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this TestMsgA to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a TestMsgB. */
export interface ITestMsgB {

    /** TestMsgB id */
    id: number;

    /** TestMsgB msg */
    msg?: (ITestMsgA|null);

    /** TestMsgB nums */
    nums?: (number[]|null);
}

/** Represents a TestMsgB. */
export class TestMsgB implements ITestMsgB {

    /**
     * Constructs a new TestMsgB.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITestMsgB);

    /** TestMsgB id. */
    public id: number;

    /** TestMsgB msg. */
    public msg?: (ITestMsgA|null);

    /** TestMsgB nums. */
    public nums: number[];

    /**
     * Creates a new TestMsgB instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TestMsgB instance
     */
    public static create(properties?: ITestMsgB): TestMsgB;

    /**
     * Encodes the specified TestMsgB message. Does not implicitly {@link TestMsgB.verify|verify} messages.
     * @param message TestMsgB message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ITestMsgB, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified TestMsgB message, length delimited. Does not implicitly {@link TestMsgB.verify|verify} messages.
     * @param message TestMsgB message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ITestMsgB, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a TestMsgB message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns TestMsgB
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TestMsgB;

    /**
     * Decodes a TestMsgB message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns TestMsgB
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TestMsgB;

    /**
     * Verifies a TestMsgB message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a TestMsgB message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns TestMsgB
     */
    public static fromObject(object: { [k: string]: any }): TestMsgB;

    /**
     * Creates a plain object from a TestMsgB message. Also converts values to other types if specified.
     * @param message TestMsgB
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: TestMsgB, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this TestMsgB to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
