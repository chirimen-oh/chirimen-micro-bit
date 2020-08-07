var microBitBle;

var mpu6500,ak8963;

var readEnable;

async function connect(){
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var port = i2cAccess.ports.get(1);
	
    mpu6500 = new MPU6500(port, 0x68);
    ak8963 = new AK8963(port, 0x0c);
    await mpu6500.init();
    await ak8963.init();
	
	readEnable = true;
	readData();
}

async function disconnect(){
	readEnable = false;
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}

async function readData(){
	while ( readEnable ){
      var val0 = await mpu6500.getAcceleration();
      var val1 = await mpu6500.getGyro();
      var val2 = await ak8963.readData();
      // console.log('value:', value);
      gx.innerHTML = val0.x;
      gy.innerHTML = val0.y;
      gz.innerHTML = val0.z;
      rx.innerHTML = val1.x;
      ry.innerHTML = val1.y;
      rz.innerHTML = val1.z;
      hx.innerHTML = val2.x;
      hy.innerHTML = val2.y;
      hz.innerHTML = val2.z;
      await sleep(600);
	}
}
