// Remote Example1 - controller

var channel;
onload = async function(){
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket" );
	channel = await relay.subscribe("chirimenMatrix");
	messageDiv.innerText="achex web socketリレーサービスに接続しました";
	channel.onmessage = getMessage;
}

function getMessage(msg){ // メッセージを受信したときに起動する関数
	if ( msg.data.done ){
		messageDiv.innerText = "表示が完了しました";
	} else if ( msg.data.start ){
		messageDiv.innerText = "文字列 " + msg.data.start + " の表示を開始しました";
	}
}

function printText(){ // LED ON
	var message = {
		print: messageText.value
	}
	channel.send( message );
	messageDiv.innerText = "表示を指示します : "+ messageText.value;
}
