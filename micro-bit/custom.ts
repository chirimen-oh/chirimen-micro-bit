
/**
 * このファイルを使って、独自の関数やブロックを定義してください。
 * 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
 */


/**
 * カスタムブロック
 */
//% weight=100 color=#0fbc11 icon=""
namespace custom {


    /**
     * 16進数文字列を数字に変換する
     */
    //% block
    export function parseHex(inp: string): number { // Hex String to Integer parser
        return parseInt(inp, 16)
    }

    /**
     * 数字を16進数２桁文字に変換する
     */
    //% block
    export function toHex8(inp: number): string {
        //    return(inp.toString())
        let lw = inp & 0xf
        let up = (inp >> 4) & 0xf
        return (getHexStr(up) + getHexStr(lw))
    }

    let commandCode = -1
    let bleBuffer: Buffer
    let commandVal = ""
    let gpioPort = 0
    let gpioVal = 0
    /**
     * BLEで受信したコマンドをパースする
     */
    //% block
    export function parseBLEcommand(str: string): number { // returns commandCode
        commandCode = -1
        //        commandVal = str
        let command = str.substr(0, 1)
        if (command == "r") { // I2C Read(NoReg)
            commandCode = 0
        } else if (command == "R") { // I2C Read
            commandCode = 1
        } else if (command == "W") { // I2C Write
            commandCode = 2
        } else if (command == "C") { // I2C Data Cont. bytes
            commandCode = 3
        } else if (command == "L") { // Print LED
            commandCode = 4
        } else if (command == "S") { // Read All Sensor Data
            commandCode = 5
        } else if (command == "I") { // GPIO D IN
            commandCode = 6
        } else if (command == "i") { // GPIO A IN
            commandCode = 7
        } else if (command == "O") { // GPIO D OUT
            commandCode = 8
        } else if (command == "o") { // GPIO A OUT
            commandCode = 9
        } else if (command == "P") { // GPIO pull mode set
            commandCode = 10
        } else if (command == "l") { // showIcon LED
            commandCode = 11
        }
        if (commandCode == 1 || commandCode == 2 || commandCode == 0) { //I2C R/W
            i2cAddr = parseHex(str.substr(1, 2))
            dLength = parseHex(str.substr(3, 2)) // dLengthは最初のバイト（レジスタ番号）も含んで計算
            bleBuffer = pins.createBuffer(dLength)
            fillPos = 0
            for (let i = 5; i < str.length - 1; i = i + 2) {
                bleBuffer.setNumber(NumberFormat.UInt8LE, fillPos, parseHex(str.substr(i, 2)))
                ++fillPos
            }
        } else if (commandCode == 3) { // I2C Cont
            for (let i = 1; i < str.length; i = i + 2) {
                bleBuffer.setNumber(NumberFormat.UInt8LE, fillPos, parseHex(str.substr(i, 2)))
                ++fillPos
            }
        } else if (commandCode == 4) { // LED
            commandVal = str.substr(1, str.length - 1)
        } else if (commandCode == 11) { // icon LED
            commandVal = str.substr(1, str.length - 1)
        } else if (commandCode == 5) { // Internal Sensors
        } else if (commandCode == 6 || commandCode == 7) { // GPIO A/D In
            gpioPort = parseInt(str.substr(1, 2))
        } else if (commandCode == 8 || commandCode == 9) { // GPIO D Out
            gpioPort = parseInt(str.substr(1, 2))
            gpioVal = parseInt(str.substr(3))
        } else if (commandCode == 10) {
            gpioPort = parseInt(str.substr(1, 2))
            gpioVal = parseInt(str.substr(3))
        }
        return commandCode
    }

    export function processGpioDread(): string {
        gpioVal = pins.digitalReadPin(gpioDigitalPortList[gpioPort])
        return (gpioPort + "," + gpioVal)
    }
    export function processGpioAread(): string {
        gpioVal = pins.analogReadPin(getPinAddr(gpioPort))
        return (gpioPort + "," + gpioVal)
    }
    export function processGpioDwrite(): string {
        pins.digitalWritePin(gpioDigitalPortList[gpioPort], gpioVal)
        return (gpioPort + "," + gpioVal)
    }
    export function processGpioAwrite(): string {
        pins.analogWritePin(getPinAddr(gpioPort), gpioVal)
        return (gpioPort + "," + gpioVal)
    }
    export function processGpioPullMode(): string {
        pins.setPull(getPinAddr(gpioPort), pullModeList[gpioVal])
        // below two sentences are patche for input.lightLevel bug
        pins.digitalWritePin(gpioDigitalPortList[gpioPort], 0)
        led.setDisplayMode(DisplayMode.BlackAndWhite)
        return (gpioPort + "," + gpioVal)
    }

    let pullModeList = [
        PinPullMode.PullNone,
        PinPullMode.PullDown,
        PinPullMode.PullUp
    ]

    function getPinAddr(numb: number): number {
        return gpioDigitalPortList[numb]
    }

    let gpioDigitalPortList = [
        DigitalPin.P0,
        DigitalPin.P1,
        DigitalPin.P2,
        DigitalPin.P3,
        DigitalPin.P4,
        DigitalPin.P5,
        DigitalPin.P6,
        DigitalPin.P7,
        DigitalPin.P8,
        DigitalPin.P9,
        DigitalPin.P10,
        DigitalPin.P11,
        DigitalPin.P12,
        DigitalPin.P13,
        DigitalPin.P14,
        DigitalPin.P15,
        DigitalPin.P16,
        DigitalPin.P0,
        DigitalPin.P0,
        DigitalPin.P19,
        DigitalPin.P20
    ]
    /** 数値返却のgetPinAddrで省略できるか？
    let gpioAnalogPortList = [
        AnalogPin.P0,
        AnalogPin.P1,
        AnalogPin.P2,
        AnalogPin.P3,
        AnalogPin.P4,
        AnalogPin.P5,
        AnalogPin.P6,
        AnalogPin.P7,
        AnalogPin.P8,
        AnalogPin.P9,
        AnalogPin.P10,
        AnalogPin.P11,
        AnalogPin.P12,
        AnalogPin.P13,
        AnalogPin.P14,
        AnalogPin.P15,
        AnalogPin.P16,
        AnalogPin.P0,
        AnalogPin.P0,
        AnalogPin.P19,
        AnalogPin.P20
    ]
    **/

    /**
     * I2Cread処理
     */
    //% block
    export function processI2Cread(withReg: boolean): string {
        let readReg = bleBuffer.getNumber(NumberFormat.UInt8LE, 0)
        let readLength = bleBuffer.getNumber(NumberFormat.UInt8LE, 1)
        if (withReg) {
            pins.i2cWriteNumber(i2cAddr, readReg, NumberFormat.UInt8LE, true)
        }
        let readBuf = pins.i2cReadBuffer(i2cAddr, readLength, false)
        bleBuffer = null
        return (custom.bufferToString(readBuf))
    }

    /**
     * I2Cwrite処理
     */
    //% block
    export function processI2Cwrite(): string {
        pins.i2cWriteBuffer(i2cAddr, bleBuffer)
        bleBuffer = null
        return (dLength.toString())
    }

    /**
     * button状態取得
     */
    export function getButton():number{
        if (input.buttonIsPressed(Button.A)){
            return (1)
        } else if (input.buttonIsPressed(Button.B)){
            return (2)
        } else {
            return(0)
        }
    }


    /**
     * BLEで受信した継続コマンドをパースする
     * @param str 受信文字列
     * @param inBuf parseBLEcommandで作ったバッファ
     * @param pos バッファの追加位置
     *  帰り値: data:実際のデータ、fill:今回のコマンド受信で受けたデータサイズ
     */
    //% block
    export function parseContData(str: string, inBuf: Buffer, pos: number): Buffer {
        for (let i = 1; i < str.length; i = i + 2) {
            inBuf.setNumber(NumberFormat.UInt8LE, pos, parseHex(str.substr(i, 2)))
            ++pos
        }
        fillPos = pos
        return inBuf
    }

    let dLength = 0
    let fillPos = 0
    let i2cAddr = 0

    //% block
    export function commandIsTerminated(): boolean {
        if (fillPos == dLength) {
            return true
        } else {
            return false
        }
    }
    //% block
    export function getDataSize(): number {
        return dLength
    }
    //% block
    export function getFillPos(): number {
        return fillPos
    }
    //% block
    export function getI2cAddr(): number {
        return i2cAddr
    }
    //% block
    export function getCommandVal(): string {
        return commandVal
    }
    //% block
    export function bufferToString(buf: Buffer): string {
        let ans = ""
        for (let i = 0; i < buf.length; i++) {
            ans += toHex8(buf.getNumber(NumberFormat.UInt8LE, i))
        }
        // ans = (buf.getNumber(NumberFormat.UInt8LE, 0)).toString()
        // return (buf.length).toString()
        return ans
    }

    function getHexStr(inp: number): string {
        return "0123456789ABCDEF"[inp]
    }
}

