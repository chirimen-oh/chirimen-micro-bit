var rawData = [];
var voltage = [];

console.log("init0:", rawData, voltage);

var microBitBle;

var ads1115;
var readEnable;

async function connect(){
	for (var i = 0; i < 2; i++) {
	  rawData[i] = document.getElementById("rawData" + i);
	  voltage[i] = document.getElementById("voltage" + i);
	}
	microBitBle = await microBitBleFactory.connect();
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	var i2cPort = i2cAccess.ports.get(1);
    ads1115 = new ADS1x15(i2cPort, 0x48);
	await ads1115.init(true,7); // High Gain
	readEnable = true;
	readData();
}

async function disconnect(){
	readEnable = false;
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}

async function readData(){
    var firstTime=true;
	while ( readEnable ){
      try {
      	
        var difA = await ads1115.read("0,1");  // p0-p1 differential mode
        rawData[0].innerHTML = "dif chA(0-1):" + difA.toString(16);
        voltage[0].innerHTML = ads1115.getVoltage(difA).toFixed(6) + "V";
      	if ( firstTime){
      		tare = difA;
      		firstTime = false;
      	}
      	
      	weight = difA - tare; 
        rawData[1].innerHTML = "rawData - Tare:" + weight.toString(16);
        voltage[1].innerHTML = ads1115.getVoltage(weight).toFixed(6) + "V";
      	/**
        var difB = await ads1115.read("2,3");
        rawData[1].innerHTML = "dif chB(2-3):" + difB.toString(16);
        voltage[1].innerHTML = ads1115.getVoltage(difB).toFixed(6) + "V";
      	**/
      } catch (error) {
        console.log(error);
      }
      await sleep(100);
	}
}
