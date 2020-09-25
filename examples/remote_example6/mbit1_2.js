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
	channel = await relay.subscribe("chirimenIcon");
	msgDiv.innerText="achex web socketリレーサービスに接続しました";
	channel.onmessage = printMessage;
	pollButtonPush();
}

async function printMessage(message){
	if ( message.data.print ){
		var iconNumb = message.data.print;
		msgDiv.innerText="get print icon command :" + iconNumb;
		
		channel.send({start: iconNumb}); // 表示の開始を知らせるメッセージを通知
		
		await microBitBle.showIconLED(iconNumb); // micro:bitに表示を指示する(表示の完了に時間がかかる)
		
		channel.send({done: iconNumb}); // 表示の完了を知らせるメッセージを通知
	}
}


async function pollButtonPush(){
	while ( true ){
		var sensorData = await microBitBle.readSensor();
		if ( sensorData.button==1){
			channel.send({print:37});
			msgDiv.innerText="ボタンデータを送信しました： " + sensorData.button;
		} else if  ( sensorData.button==2){
			channel.send({print:2});
			msgDiv.innerText="ボタンデータを送信しました： " + sensorData.button;
		}
		await sleep(200);
	}
}

