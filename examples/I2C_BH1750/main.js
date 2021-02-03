var microBitBle;

var bh1750;
var mlx;
var readEnable;

async function connect() {
  microBitBle = await microBitBleFactory.connect();
  msg.innerHTML = "micro:bit BLE接続しました。";
  var i2cAccess = await microBitBle.requestI2CAccess();
  var Port = i2cAccess.ports.get(1);

  bh1750 = new BH1750(Port, 0x23);
  await bh1750.init();
  await bh1750.set_sensitivity(128);

  mlx = new MLX90614(Port, 0x5a);
  mlx.init();

  readEnable = true;
  readData();
}

async function disconnect() {
  readEnable = false;
  await microBitBle.disconnect();
  msg.innerHTML = "micro:bit BLE接続を切断しました。";
}

async function readData() {
  while (readEnable) {
    try {
      var val = await bh1750.measure_low_res();
      console.log(val);
      light.innerHTML = val;
    } catch (error) {
      console.log("bh1750 error:" + error);
    }
    try {
      var otemp = await mlx.get_obj_temp();
      var atemp = await mlx.get_amb_temp();
      document.getElementById("obj_temperature").innerHTML =
        otemp.toFixed(2) + "degree";
      document.getElementById("amb_temperature").innerHTML =
        atemp.toFixed(2) + "degree";
    } catch (error) {
      console.log("MLX90614 error" + error);
    }

    await sleep(300);
  }
}
