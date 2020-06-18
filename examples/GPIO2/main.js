var microBitBle;

var gpioPort0, gpioPort2;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var gpioAccess = await microBitBle.requestGPIOAccess();
	var mbGpioPorts = gpioAccess.ports;
	gpioPort0 = mbGpioPorts.get(0);
	gpioPort2 = mbGpioPorts.get(2);
	await gpioPort0.export("out"); //port0 out
	await gpioPort2.export("in"); //port2 in
	gpioPort2.onchange=testChange;
}

async function disconnect(){
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}

async function testChange(val){
	msg.innerHTML= val ;
	var gpio0Val = (val === 1 ) ? 0 : 1;
	await gpioPort0.write(gpio0Val);
}
