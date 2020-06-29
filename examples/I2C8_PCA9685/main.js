var microBitBle;

var servoEnable;
var pca9685;
var angle = 0;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	head.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
	pca9685 = new PCA9685(i2cPort, 0x40);
	await pca9685.init(0.001, 0.002, 30);
	servoEnable = true;
	moveServo();
}

async function disconnect(){
	servoEnable = false;
	await microBitBle.disconnect();
	head.innerHTML=("micro:bit BLE接続を切断しました。");
}

async function moveServo() {
  while (servoEnable) {
    angle = angle <= -30 ? 30 : -30;
    // console.log("angle"+angle);
    await pca9685.setServo(0, angle);
    // console.log('value:', angle);
    head.innerHTML = angle;
    await sleep(1000);
  }
}
