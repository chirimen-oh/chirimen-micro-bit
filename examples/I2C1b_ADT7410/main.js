var microBitBle;

var i2cSlaveDevice;

var readEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
	i2cSlaveDevice = await i2cPort.open(0x48);
	readEnable = true;
	readData();
}

async function disconnect(){
	readEnable = false;
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}

async function readData(){
	var readVal;
	while ( readEnable ){
		var MSB = await i2cSlaveDevice.read8(0x00); // これ以下の３行が肝です
		var LSB = await i2cSlaveDevice.read8(0x01);
		var temperature = ((MSB << 8) | (LSB & 0xff)) / 128.0;
		console.log('temperature:', temperature);
		msg.innerHTML= "温度: " + temperature + "℃";
		await sleep(1000);
	}
}
