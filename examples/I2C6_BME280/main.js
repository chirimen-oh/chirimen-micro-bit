var microBitBle;

var bme280;

var readEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
	bme280 = new BME280(i2cPort, 0x76);
	await bme280.init();
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
		try{
			readVal = await bme280.readData();
			console.log('readVal:', readVal);
			msg.innerHTML= readVal.temperature + "℃ " + readVal.pressure + "hPa " +  readVal.humidity + "%";
		} catch(e){
			console.log("Err:",e," SKIP");
		}
		await sleep(1000);
	}
}

