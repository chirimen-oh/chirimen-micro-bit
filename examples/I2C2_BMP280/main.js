var microBitBle;

var bmp280;

var readEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
	bmp280 = new BMP280(i2cPort, 0x76);
	await bmp280.init();
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
		readVal = await bmp280.readData();
		console.log('readVal:', readVal);
		msg.innerHTML= readVal.temperature + "℃ " + readVal.pressure + "hPa";
		await sleep(1000);
	}
}

