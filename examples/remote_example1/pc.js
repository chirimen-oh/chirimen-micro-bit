// Remote Example1 - controller

var channel;
onload = async function(){
	// webSocketリレーの初期化
	var relay = RelayServer("achex", "chirimenSocket" );
	channel = await relay.subscribe("chirimenMbitSensors");
	messageDiv.innerText="achex web socketリレーサービスに接続しました";
	channel.onmessage = getMessage;
}

function getMessage(msg){ // メッセージを受信したときに起動する関数
	var mdata = msg.data;
	messageDiv.innerText = JSON.stringify(mdata);
	var acc = mdata.acceleration;
	var mag = mdata.magneticField;
	accTd.innerText = acc.x + ", " + acc.y + ", " + acc.z;
	magTd.innerText = mag.x + ", " + mag.y + ", " + mag.z;
	temTd.innerText = mdata.temperature;
	briTd.innerText = mdata.brightness;
	butTd.innerText = mdata.button;
	timTd.innerText = mdata.time;
}
