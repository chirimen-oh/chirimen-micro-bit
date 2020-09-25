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
	pollButtonPush();
}

async function pollButtonPush(){
	while ( true ){
		var sensorData = await microBitBle.readSensor();
		if ( sensorData.button!=0){
			sensorData.time=(new Date()).toString();
			channel.send(sensorData);
			msgDiv.innerText="センサデータを送信しました： " + JSON.stringify(sensorData);
		}
		await sleep(200);
	}
}

