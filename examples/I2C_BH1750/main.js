var microBitBle;

var bh1750;
var readEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
    bh1750 = new BH1750(i2cPort);
    await bh1750.init();
    await bh1750.set_sensitivity(128);
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
//      var val = await bh1750.measure_high_res2(0.2);
//      var val = await bh1750.measure_high_res(0.2);
      var val = await bh1750.measure_low_res();
		console.log(val);
		light.innerHTML = val;
		await sleep(300);
	}
}
