var microBitBle;

var mlx;
var readEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var port = i2cAccess.ports.get(1);
    mlx = new MLX90614(port);
    mlx.init();
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
		var otemp = await mlx.get_obj_temp();
		var atemp = await mlx.get_amb_temp();
		document.getElementById("obj_temperature").innerHTML = otemp.toFixed(2) + "degree";
		document.getElementById("amb_temperature").innerHTML = atemp.toFixed(2) + "degree";
		await sleep(300);
	}
}
