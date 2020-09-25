// Remote Example1 - reciever
// for CHIRIMEN with:microbit

var microBitBle;
var channel;
var sht;

async function connect(){
	// chirimen with micro:bitの初期化
	microBitBle = await microBitBleFactory.connect();
	msgDiv.innerHTML=("micro:bitとのBLE接続が完了しました");
	
	// I2Cポートと、I2CデバイスSHT30の初期化
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
	sht = new SHT30(i2cPort);
	await sht.init();
	
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket" );
	channel = await relay.subscribe("chirimenSHT");
	msgDiv.innerText="achex web socketリレーサービスに接続しました";
	channel.onmessage = transmitSensorData;
}

async function transmitSensorData(messge){
	msgDiv.innerText=messge.data;
	if ( messge.data =="GET SENSOR DATA"){
		var sensorData = await readData();
		channel.send(sensorData);
		msgDiv.innerText=JSON.stringify(sensorData);
	}
}

async function readData(){
	var shtData = await sht.readData();
	console.log('shtData:', shtData);
	msgDiv.innerHTML= "temperature:" + shtData.temperature + "degree  <br>humidity:"+ shtData.humidity + "%";
	return(shtData);
}
