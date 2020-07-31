var microBitBle;

var gpioPort0;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var gpioAccess = await microBitBle.requestGPIOAccess();
	var mbGpioPorts = gpioAccess.ports;
	gpioPort0 = mbGpioPorts.get(0);
	await gpioPort0.export("out"); //port0 out
}

async function disconnect(){
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}

async function motorControl(val){
	if ( val == true ){
		await gpioPort0.write(1);
	} else {
		await gpioPort0.write(0);
	}
	msg.innerHTML= "モーター駆動状態 : "+val ;
}
