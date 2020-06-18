// Remote Example1 - controller

var channel;
onload = async function(){
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket" );
	channel = await relay.subscribe("chirimenMbitSensors");
	messageDiv.innerText="achex web socketリレーサービスに接続しました";
	channel.onMessage(getMessage);
}

function getMessage(msg){ // メッセージを受信したときに起動する関数
	messageDiv.innerText = JSON.stringify(msg);
	var acc = msg.acceleration;
	var mag = msg.magneticField;
	accTd.innerText = acc.x + ", " + acc.y + ", " + acc.z;
	magTd.innerText = mag.x + ", " + mag.y + ", " + mag.z;
	temTd.innerText = msg.temperature;
	briTd.innerText = msg.brightness;
	butTd.innerText = msg.button;
	timTd.innerText = msg.time;
}
