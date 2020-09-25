var microBitBle;

var mpu6050;

var readEnable;

    
async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
    mpu6050 = new MPU6050(i2cPort, 0x68);
	await mpu6050.init();
	readEnable = true;
	readData();
}

async function disconnect(){
	readEnable = false;
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}

async function readData(){
	var temp = document.getElementById("temp");
	var gx = document.getElementById("gx");
	var gy = document.getElementById("gy");
	var gz = document.getElementById("gz");
	var rx = document.getElementById("rx");
	var ry = document.getElementById("ry");
	var rz = document.getElementById("rz");
	while ( readEnable ){
		var val = await mpu6050.readAll();
		// console.log('value:', value);
		temp.innerHTML = val.temperature;
		gx.innerHTML = val.gx;
		gy.innerHTML = val.gy;
		gz.innerHTML = val.gz;
		rx.innerHTML = val.rx;
		ry.innerHTML = val.ry;
		rz.innerHTML = val.rz;
		await sleep(1000);
	}
}
