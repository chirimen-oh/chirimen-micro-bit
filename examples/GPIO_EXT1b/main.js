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
	gpioPort2.onchange=testChange;
}

function testChange(val){
	gdata2.innerHTML= val + " : " + new Date();
}

async function disconnect(){
	connected = false;
	gpioPort2.onchange=null;
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}
