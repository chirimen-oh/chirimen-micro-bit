var microBitBle;

var gpioPort1;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var gpioAccess = await microBitBle.requestGPIOAccess();
	var mbGpioPorts = gpioAccess.ports;
	gpioPort1 = mbGpioPorts.get(1);
	await gpioPort1.export("out"); //port1 out
}

async function disconnect(){
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}

async function motorControl(val){
	if ( val == true ){
		await gpioPort1.write(1);
	} else {
		await gpioPort1.write(0);
	}
	msg.innerHTML= "モーター駆動状態 : "+val ;
}
