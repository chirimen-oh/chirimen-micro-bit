var microBitBle;

var gpioPort2;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var gpioAccess = await microBitBle.requestGPIOAccess();
	var mbGpioPorts = gpioAccess.ports;
	gpioPort2 = mbGpioPorts.get(2);
	await gpioPort2.export("in"); //port2 in
	gpioPort2.onchange=testChange;
}

async function disconnect(){
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}

function testChange(val){
	msgTxt = (val === 1 ) ? "High" : "Low"; // 条件 (三項) 演算子
	msg.innerHTML= msgTxt  ;
}


