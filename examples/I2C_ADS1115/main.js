var rawData = [];
var voltage = [];

console.log("init0:", rawData, voltage);

var microBitBle;

var ads1115;
var readEnable;

async function connect(){
	for (var i = 0; i < 4; i++) {
	  rawData[i] = document.getElementById("rawData" + i);
	  voltage[i] = document.getElementById("voltage" + i);
	}
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
    ads1115 = new ADS1x15(i2cPort, 0x48);
    await ads1115.init(true);
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
      try {
        for (var i = 0; i < 4; i++) {
          var value = await ads1115.read(i);
          rawData[i].innerHTML = "ch" + i + ":" + value.toString(16);
          voltage[i].innerHTML = ads1115.getVoltage(value).toFixed(4) + "V";
        }
      } catch (error) {
        console.log(error);
      }
      await sleep(100);
	}
}
