var microBitBle;

var adt7410;

var readEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
	adt7410 = new ADT7410(i2cPort, 0x48);
	await adt7410.init();
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
		readVal = await adt7410.read();
		console.log('readVal:', readVal);
		msg.innerHTML= "温度: " + readVal + "℃";
		await sleep(1000);
	}
}
