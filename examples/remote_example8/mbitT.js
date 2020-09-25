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
	channel = await relay.subscribe("chirimenMbitRemoteServo");
	msgDiv.innerText="achex web socketリレーサービスに接続しました";
	pollSens();
}

async function pollSens(){
	var prevSlope = -100;
	while ( true ){
		var sensorData = await microBitBle.readSensor();
		var slope = getDigitizedSlope(sensorData.acceleration);
		if ( slope != prevSlope ){ // 傾斜角が変化したときだけ送信することでrelayServiceへの負荷を軽減する
			console.log("acc:",sensorData.acceleration,"  slope:",slope);
			channel.send({slope:slope});
			msgDiv.innerText="傾斜データを送信しました： " + slope;
		} else {
			msgDiv.innerText="";
		}
		await sleep(100);
		prevSlope = slope;
	}
}

function getDigitizedSlope(g){ // 4度単位の角度を得る
	var angleX = (180 / Math.PI) * Math.atan(g.x / g.z); // 横方向(LED面を上に向け)の傾きを得る
//	var angleY = (180 / Math.PI) * Math.atan(g.y / g.z); // これを用いると縦方向
	
	var digitizedAngle = Math.floor(angleX / 4) * 4;
	return ( digitizedAngle );
}