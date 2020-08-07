var microBitBle;

var bmp180;
var readEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
    bmp180 = new BMP180(i2cPort, 0x77);
    await bmp180.init();
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
		var temperature = await bmp180.readTemperature();
		temp.innerHTML = temperature;
		var pressure = await bmp180.readPressure();
		pres.innerHTML = pressure;
		await sleep(500);
	}
}
