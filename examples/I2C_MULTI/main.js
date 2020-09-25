var microBitBle;
var readEnable;
var sht30, bh1750;
async function connect() {
  microBitBle = await microBitBleFactory.connect();
  var i2cAccess = await microBitBle.requestI2CAccess();
  var port = i2cAccess.ports.get(1);
  document.getElementById("msg").innerHTML=("micro:bit BLE接続しました。");

  sht30 = new SHT30(port, 0x44);
  bh1750 = new BH1750(port, 0x23);
  await sht30.init();
  await bh1750.init();
  await bh1750.set_sensitivity(128);
  readEnable = true;
  readData();
}

async function disconnect(){
  readEnable = false;
  await microBitBle.disconnect();
  document.getElementById("msg").innerHTML=("micro:bit BLE接続を切断しました。");
}

async function readData() {
  var head_sht30 = document.getElementById("head_sht30");
  var head_bh1750 = document.getElementById("head_bh1750");
  while (readEnable) {
    try {
      var shtValue = await sht30.readData();
      head_sht30.innerHTML = shtValue.humidity + "," + shtValue.temperature;
    } catch (error) {
      console.log("sht30 error:" + error);
    }

    try {
      var val = await bh1750.measure_low_res();
      head_bh1750.innerHTML = val;
    } catch (error) {
      console.log("bh1750 error:" + error);
    }

    sleep(500);
  }
}
