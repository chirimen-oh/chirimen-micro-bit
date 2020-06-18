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
	channel = await relay.subscribe("chirimenMatrix");
	msgDiv.innerText="achex web socketリレーサービスに接続しました";
	channel.onMessage(printMessage);
}

async function printMessage(message){
	if ( message.print ){
		var msgTxt = message.print;
		msgDiv.innerText="get print command :" + msgTxt;
		
		channel.sendMessage({start: msgTxt}); // 表示の開始を知らせるメッセージを通知
		
		await microBitBle.printLED(msgTxt); // micro:bitに表示を指示する(表示の完了に時間がかかる)
		
		channel.sendMessage({done: msgTxt}); // 表示の完了を知らせるメッセージを通知
	}
}

