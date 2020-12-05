var microBitBle;
var gpioPort0;
var gpioPort1
var vl53;

var readEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
	msg.innerHTML=("VL53L0Xを初期化しています（10秒程かかります・・）");
	vl53 = new VL53L0X(i2cPort, 0x29);
	await vl53.init();
	readEnable = true;
	readData();
	//↑距離センサーの初期設定
	//↓モーターの初期設定
	var gpioAccess = await microBitBle.requestGPIOAccess();
  var mbGpioPorts = gpioAccess.ports;
  gpioPort0 = mbGpioPorts.get(0);
  await gpioPort0.export("out"); //port0 out
  gpioPort1 = mbGpioPorts.get(1);
  await gpioPort1.export("out"); // port1 out
}

async function disconnect(){
	readEnable = false;
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}
async function readData(){
	var rot = 0;//0か1かで回転方向を指定
	var gpio0Val = 0;
	gpio0Val = 0;
	gpio0Val = rot===0 ? 0:1;
	
	while ( readEnable ){
		var distance = await vl53.getRange();
		var speed = 10;//0〜10までの数値で速度を変化させる。
		var time = 100;//１判定にかかる時間を設定（単位はミリ秒）
		var Hspeed = 10;//
		var Htime = 100; 
		distance = rot === 0 ? distance :2500-distance;
		console.log("distance:",distance);
		msg.innerHTML= distance + "mm";
		switch (distance){
			case distance <= 150:
				var i = 0;
				for (i;time;i++){
				await gpioPort0.write(gpio0Val);
				await gpioPort1.write(!gpio0Val);
				await sleep(speed);
				await gpioPort0.write(0);
				await gpioPort1.write(0);
				await sleep(10-speed);
				}
				break;
			case distance < 150 && 200<distance:
				for (i;Htime;i++){
	  		await gpioPort0.write(gpio0Val);
				await gpioPort1.write(!gpio0Val);
				await sleep(Hspeed);
				await gpioPort0.write(0);
				await gpioPort1.write(0);
				await sleep(10-Hspeed);
					}	
			break;
		   default:
				await gpioPort0.write(0);
				await gpioPort1.write(0);
		}


		await sleep(100);
	}
}

