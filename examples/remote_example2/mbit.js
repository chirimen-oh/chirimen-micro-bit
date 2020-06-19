// Remote Example1 - reciever
// for CHIRIMEN with:microbit

var microBitBle;
var channel;

async function connect(){
	// chirimen with micro:bitの初期化
	microBitBle = await microBitBleFactory.connect();
	msgDiv.innerHTML=("micro:bitとのBLE接続が完了しました");
	
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket" );
	channel = await relay.subscribe("chirimenMbitSensors");
	msgDiv.innerText="achex web socketリレーサービスに接続しました";
	channel.onmessage(transmitSensorData);
}

async function transmitSensorData(messge){
	msgDiv.innerText=messge;
	if ( messge =="GET SENSOR DATA"){
		var sensorData = await microBitBle.readSensor();
		channel.send(sensorData);
		msgDiv.innerText=JSON.stringify(sensorData);
	}
}

