var microBitBle;

var vl53;

var readEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
	msg.innerHTML=("VL53L0Xを初期化しています（10秒程かかります・・）");
	vl53 = new VL53L0X(i2cPort, 0x29);
	await vl53.init();
	readEnable = true;
	readData();
	var gpioAccess = await microBitBle.requestGPIOAccess(); //以下Lチカ
  var mbGpioPorts = gpioAccess.ports;
  gpioPort0 = mbGpioPorts.get(0);
  await gpioPort0.export("out"); //port0 out
  gpioPort1 = mbGpioPorts.get(1);
  await gpioPort1.export("out"); // port1 out
}

async function disconnect(){
	readEnable = false;
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}

async function readData(){
	gpioPort0 == 0;
	while ( readEnable ){
		var distance = await vl53.getRange();
		console.log("distance:",distance);
		msg.innerHTML= distance + "mm";
		if (distance < 150){
			await gpioPort0.write(gpio0Val);
			await gpioPort1.write(!gpio0Val);
		}
		else (150 < distanse){
			await gpioPort0.wite(0);
			await gpioort0.write(0);
		}
		await sleep(1000);
			}
}

