input.onButtonPressed(Button.AB, function () {
    input.calibrateCompass()
})
input.onButtonPressed(Button.A, function () {
    button = 1
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
    basic.pause(1000)
})
input.onButtonPressed(Button.B, function () {
    button = 2
})
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Diamond)
    basic.pause(2000)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
})
let ledMsg = ""
let bleRes = ""
let bleMsg = ""
let button = 0
let commandCode = -1
let originCommandCode = -1
bluetooth.startUartService()
basic.showIcon(IconNames.Heart)

// basic.showNumber(custom.parseHex("FF"))
// basic.showString(custom.toHex8(254))
basic.forever(function () {
    bleMsg = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    commandCode = custom.parseBLEcommand(bleMsg)
    if (commandCode != 3) {
        originCommandCode = commandCode
    }
    if (custom.commandIsTerminated()) {
        if (originCommandCode == 2) {
            bleRes = custom.processI2Cwrite()
            bluetooth.uartWriteString("END:W" + bleRes)
        } else if (originCommandCode == 0) {
            bleRes = custom.processI2Cread(false)
            bluetooth.uartWriteString("ENDr" + bleRes)
        } else if (originCommandCode == 1) {
            bleRes = custom.processI2Cread(true)
            bluetooth.uartWriteString("END:R" + bleRes)
        } else if (originCommandCode == 4) {
            ledMsg = custom.getCommandVal()
            basic.showString(ledMsg)
            bluetooth.uartWriteString("END:L" + ledMsg.length)
        } else if (originCommandCode == 5) {
            bluetooth.uartWriteString("A:" + input.acceleration(Dimension.X) + "," + input.acceleration(Dimension.Y) + "," + input.acceleration(Dimension.Z))
            bluetooth.uartWriteString("M:" + input.magneticForce(Dimension.X) + "," + input.magneticForce(Dimension.Y) + "," + input.magneticForce(Dimension.Z))
            bluetooth.uartWriteString("T:" + input.temperature() + "," + input.lightLevel())
            // bluetooth.uartWriteString("T:" + input.temperature() + "," + 0)
            bluetooth.uartWriteString("END:B:" + button)
            button = 0
        } else if (originCommandCode == 6) { // GPIO Din
            bleRes = custom.processGpioDread()
            bluetooth.uartWriteString("END:I" + bleRes)
        } else if (originCommandCode == 7) { // GPIO Ain
            bleRes = custom.processGpioAread()
            bluetooth.uartWriteString("END:i" + bleRes)
        } else if (originCommandCode == 8) { // GPIO Dout
            bleRes = custom.processGpioDwrite()
            bluetooth.uartWriteString("END:O" + bleRes)
        } else if (originCommandCode == 9) { // GPIO Aout
            bleRes = custom.processGpioAwrite()
            bluetooth.uartWriteString("END:o" + bleRes)
        } else if (originCommandCode == 10) { // GPIO pullmode set and other init
            bleRes = custom.processGpioPullMode()
            bluetooth.uartWriteString("END:P" + bleRes)
        }
    } else {
        bluetooth.uartWriteString("END:" + custom.getFillPos() + "," + custom.getDataSize())
    }
})
