basic.forever(function () {
	
})
let ledMsg = ""
let bleMsg = ""
let bleRes = ""
let rp = 0
let commandCode = -1
let originCommandCode = -1
serial.redirectToUSB()
basic.showIcon(IconNames.Heart)

serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    bleMsg = serial.readLine()
    // serial.writeLine(bleMsg)
    commandCode = custom.parseBLEcommand(bleMsg)
    if (commandCode != 3) {
        originCommandCode = commandCode
    }
    if (custom.commandIsTerminated()) {
        if (originCommandCode == 2) {
            bleRes = custom.processI2Cwrite()
            serial.writeLine("END:W" + bleRes)
        } else if (originCommandCode == 0) {
            bleRes = custom.processI2Cread(false)
            for (rp = 0; rp < bleRes.length; rp = rp + 16) {
                if (rp + 16 >= bleRes.length) {
                    serial.writeLine("ENDr" + bleRes.substr(rp, 16))
                } else {
                    serial.writeLine("r" + bleRes.substr(rp, 16))
                }
            }
        } else if (originCommandCode == 1) {
            bleRes = custom.processI2Cread(true)
            serial.writeLine("END:R" + bleRes)
        } else if (originCommandCode == 4) {
            ledMsg = custom.getCommandVal()
            basic.showString(ledMsg)
            serial.writeLine("END:L" + ledMsg.length)
        } else if (originCommandCode == 11) {
            basic.showIcon(parseInt(custom.getCommandVal()), 10)
            serial.writeLine("END:l" + custom.getCommandVal())
        } else if (originCommandCode == 5) {
            serial.writeLine("A:" + input.acceleration(Dimension.X) + "," + input.acceleration(Dimension.Y) + "," + input.acceleration(Dimension.Z))
            serial.writeLine("M:" + input.magneticForce(Dimension.X) + "," + input.magneticForce(Dimension.Y) + "," + input.magneticForce(Dimension.Z))
            serial.writeLine("T:" + input.temperature() + "," + input.lightLevel())
            serial.writeLine("END:B:" + custom.getButton())
        } else if (originCommandCode == 6) {
            bleRes = custom.processGpioDread()
            serial.writeLine("END:I" + bleRes)
        } else if (originCommandCode == 7) {
            bleRes = custom.processGpioAread()
            serial.writeLine("END:i" + bleRes)
        } else if (originCommandCode == 8) {
            bleRes = custom.processGpioDwrite()
            serial.writeLine("END:O" + bleRes)
        } else if (originCommandCode == 9) {
            bleRes = custom.processGpioAwrite()
            serial.writeLine("END:o" + bleRes)
        } else if (originCommandCode == 10) {
            bleRes = custom.processGpioPullMode()
            serial.writeLine("END:P" + bleRes)
        }
    } else {
        serial.writeLine("END:" + custom.getFillPos() + "," + custom.getDataSize())
    }
})
