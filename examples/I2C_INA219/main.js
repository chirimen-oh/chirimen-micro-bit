var microBitBle;

var ina;
var readEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var port = i2cAccess.ports.get(1);
    ina = new INA219(port);
    await ina.init(null);
//    await ina.configure(ina.RANGE_32V,ina.GAIN_8_320MV);
    await ina.configure();
	readEnable = true;
	readData();
}

async function disconnect(){
	readEnable = false;
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}

async function readData(){
	while ( readEnable ){
		var c = await ina.current();
		var p = await ina.power();
		var sh = await ina.shunt_voltage();
		var v = await ina.voltage();
		var sv = await ina.supply_voltage();
		document.getElementById("current").innerHTML = c.toFixed(3);
		document.getElementById("power").innerHTML = p.toFixed(3);
		document.getElementById("shunt").innerHTML = sh.toFixed(3);
		document.getElementById("voltage").innerHTML = v.toFixed(3);
		document.getElementById("supply_voltage").innerHTML = sv.toFixed(3);
		await sleep(300);
	}
}
