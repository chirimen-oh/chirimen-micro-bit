var microBitBle;

var gpioPort2;
var connected;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	connected = true;
	// GPIO
	var gpioAccess = await microBitBle.requestGPIOAccess();
	var mbGpioPorts = gpioAccess.ports;
	gpioPort2 = mbGpioPorts.get(2);
	await gpioPort2.export("analogin"); //port2 analogin : pull none
	measure();
}

async function disconnect(){
	connected = false;
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}



async function measure(){
	while( connected ){
		var g2Val = await gpioPort2.read();
		gdata2.innerHTML=g2Val;
		await sleep(100);
	}
}

