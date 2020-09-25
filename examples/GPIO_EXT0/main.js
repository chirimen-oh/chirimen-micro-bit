var microBitBle;

var gpioPort1;
var connected;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	connected = true;
	// GPIO
	var gpioAccess = await microBitBle.requestGPIOAccess();
	var mbGpioPorts = gpioAccess.ports;
	gpioPort1 = mbGpioPorts.get(1);
	await gpioPort1.export("analogout"); //port1 aout
	wave();
}

async function disconnect(){
	connected = false;
	await gpioPort1.write(0);
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}



async function wave(){
	var g1Val=0;
	var dif = 200;
	while( connected ){
		g1Val += dif;
		if ( g1Val > 1023 ){
			g1Val = 1023;
			dif = -200;
		} else if ( g1Val < 0 ){
			g1Val = 0;
			dif = +200;
		}
		await gpioPort1.write(g1Val);
		gdata1.innerHTML=g1Val;
		await sleep(100);
	}
	await gpioPort1.write(0);
}
