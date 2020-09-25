var microBitBle;

var sht;

var readEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
	sht = new SHT30(i2cPort, 0x44);
	await sht.init();
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
		var shtData = await sht.readData();
		console.log('shtData:', shtData);
		msg.innerHTML= "temperature:" + shtData.temperature + "degree  <br>humidity:"+ shtData.humidity + "%";
		await sleep(1000);
	}
}
