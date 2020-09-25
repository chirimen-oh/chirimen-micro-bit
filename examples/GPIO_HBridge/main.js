var microBitBle;

var gpioPort0, gpioPort1;

async function connect() {
  microBitBle = await microBitBleFactory.connect();
  msg.innerHTML = "micro:bit BLE接続しました。";
  var gpioAccess = await microBitBle.requestGPIOAccess();
  var mbGpioPorts = gpioAccess.ports;
  gpioPort0 = mbGpioPorts.get(0);
  await gpioPort0.export("out"); //port0 out
  gpioPort1 = mbGpioPorts.get(1);
  await gpioPort1.export("out"); //port1 out
}

async function disconnect() {
  await microBitBle.disconnect();
  msg.innerHTML = "micro:bit BLE接続を切断しました。";
}

async function motorControl(motorCtrl) {
  if (motorCtrl === "fwd") {
    await gpioPort0.write(1);
    await gpioPort1.write(0);
  } else if (motorCtrl === "rev") {
    await gpioPort0.write(0);
    await gpioPort1.write(1);
  } else {
    await gpioPort0.write(0);
    await gpioPort1.write(0);
  }
  msg.innerHTML = "モーター駆動状態 : " + motorCtrl;
}
