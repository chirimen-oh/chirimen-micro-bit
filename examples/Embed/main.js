var microBitBle;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
}

async function disconnect(){
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}


async function readSensor(){
	var sdat = await microBitBle.readSensor();
	console.log("sensor:",sdat);
	isens.innerHTML="acceleration:"+sdat.acceleration.x+","+sdat.acceleration.y+","+sdat.acceleration.z+"  magneticField:"+sdat.magneticField.x+","+sdat.magneticField.y+","+sdat.magneticField.z+","+"  temperature:"+sdat.temperature+"  brightness:"+sdat.brightness+"  button:"+sdat.button;
}

async function print(){
	await microBitBle.printLED(txt.value);
}

async function showIcon(){
	await microBitBle.showIconLED(Number(txt2.value));
}
