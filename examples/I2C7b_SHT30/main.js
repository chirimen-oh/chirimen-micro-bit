var microBitBle;
var i2cSlaveDevice;

var readEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
	i2cSlaveDevice = await i2cPort.open(0x44);
	readEnable = true;
	readData();
}

async function disconnect(){
	readEnable = false;
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}

async function readData(){
	while ( readEnable ){
	    await i2cSlaveDevice.write8(0x2C, 0x06);
	    await sleep(100);
	    var shtData= await i2cSlaveDevice.readBytes(6);
	    var temperature = ((((shtData[0] * 256.0) + shtData[1]) * 175) / 65535.0) - 45; // celsius
	    var humidity = 100 * (shtData[3] * 256 + shtData[4]) / 65535.0
	    console.log("temperature:", temperature);
	    msg.innerHTML = "温度: " + temperature + "℃<br>" + "湿度: " + humidity + "％";
	    await sleep(1000);
	}
}
