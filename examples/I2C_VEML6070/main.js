var microBitBle;

var veml;

var readEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
	veml = new VEML6070(i2cPort);
	await veml.init();
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
		var value = await veml.read();
		console.log('vemlData:', value);
		msg.innerHTML= "UV: " + value;
		await sleep(400);
	}
}
