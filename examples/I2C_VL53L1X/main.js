var microBitBle;

var vl;
var readEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
    vl = new VL53L1X(i2cPort);
    await vl.init("short"); // Ranging mode: short, medium, long
  	await vl.startContinuous();
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
		var dat = await vl.read();
		document.getElementById("distance").innerHTML = dat + "[mm]";
		await sleep(400);
	}
}
