var microBitBle;

var gpioPort0;

var blinkEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var gpioAccess = await microBitBle.requestGPIOAccess();
	var mbGpioPorts = gpioAccess.ports;
	gpioPort0 = mbGpioPorts.get(0);
	await gpioPort0.export("out"); //port0 out
	blinkEnable = true;
	LEDblink();
}

async function disconnect(){
	blinkEnable = false;
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}

async function LEDblink(){
	var gpio0Val = 0;
	while ( blinkEnable ){
		gpio0Val = (gpio0Val === 1 ) ? 0 : 1; // 条件 (三項) 演算子
		await gpioPort0.write(gpio0Val);
		msg.innerHTML= gpio0Val ;
		await sleep(1000);
	}
}

