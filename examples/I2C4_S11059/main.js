var microBitBle;

var s11059;

var readEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
	s11059 = new S11059(i2cPort, 0x2a);
	await s11059.init();
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
		var values = await s11059.readR8G8B8();
		var red = values[0] & 0xff;
		var green = values[1] & 0xff;
		var blue = values[2] & 0xff;
		var gain_level = values[3];
		console.log("red:" + red + " green:" + green + " blue:" + blue);
		
		msg.innerHTML= "R:" + red + " G:" + green + " B:" + blue + " GAIN:" + gain_level;
		document.getElementById("color").style.backgroundColor =
		"rgb(" + red + ", " + green + "," + blue + ")";
		await sleep(1000);
	}
}

