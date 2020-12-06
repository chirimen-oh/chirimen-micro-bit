var microBitBle;
var gpioPort0;
var gpioPort1;
var vl53;
var channel;
var readEnable;
var start;

async function connect() {
  microBitBle = await microBitBleFactory.connect();
  msg.innerHTML = "micro:bit BLE接続しました。";
  var i2cAccess = await microBitBle.requestI2CAccess();
  var i2cPort = i2cAccess.ports.get(1);
  msg.innerHTML = "VL53L0Xを初期化しています（10秒程かかります・・）";
  vl53 = new VL53L0X(i2cPort, 0x29);
  await vl53.init();
  readEnable = true;
  var relay = RelayServer("achex", "KandKSocket");
  channel = await relay.subscribe("KandKSensors");
  // channel.onmessage = getdata;
  //↑距離センサーの初期設定

  //↓モーターの初期設定
  var gpioAccess = await microBitBle.requestGPIOAccess();
  var mbGpioPorts = gpioAccess.ports;
  gpioPort0 = mbGpioPorts.get(0);
  await gpioPort0.export("out"); //port0 out
  gpioPort1 = mbGpioPorts.get(1);
  await gpioPort1.export("out"); // port1 out

  readData();
}

async function disconnect() {
  readEnable = false;
  await microBitBle.disconnect();
  msg.innerHTML = "micro:bit BLE接続を切断しました。";
}
async function readData() {
  //var rot = 1; //0か1かで回転方向を指定
  var gpio0Val = 0;

  //start = true;
  gpio0Val = 0;
  //gpio0Val = rot === 0 ? 0 : 1;
  //var distance = 100;
  var k = 0;
  while (true) {
    var distance = await vl53.getRange();
    console.log("distance:", distance);
    msg.innerHTML = distance + "mm";
    switch (true) {
      case distance >= 50:
        await gpioPort0.write(gpio0Val);
        await gpioPort1.write(!gpio0Val);
        console.log("case1");
        await sleep(300);
        break;
      default:
        var i = false;
        await gpioPort0.write(i);
        await gpioPort1.write(i);
        console.log("case0");
        await sleep(300);
        channel.send({ stWindow: distance === 0 ? 1 : 0 });
    }
    //distance = distance - 10;
    k = k + 1;
    console.log("K=" + k);
  }
}
/*function getdata(val) {
  if ("doOpen" in val.data) {
    start = val.data.doOpen === 1 ? true : false;
    if (start) {
      readData();
    }
  }
}*/
