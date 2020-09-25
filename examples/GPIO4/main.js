mainFunction();

async function mainFunction() {
  var connectButton = document.getElementById("connect");
  connectButton.onclick = connect;
  document.getElementById("disconnect").onclick=disconnect;
	
  var onoff = document.getElementById("onoff");
  onoff.onmousedown = onLed;
  onoff.onmouseup = offLed;
}

var microBitBle;
async function disconnect(){
  await microBitBle.disconnect();
  msg.innerHTML=("micro:bit BLE接続を切断しました。");
}

function onLed() {
  ledOnOff(1);
}

function offLed() {
  ledOnOff(0);
}

function ledOnOff(v) {
  var ledView = document.getElementById("ledView");
  if (v === 0) {
    gpioPort0.write(0);
    ledView.style.backgroundColor = "black";
  } else {
    gpioPort0.write(1);
    ledView.style.backgroundColor = "red";
  }
}

var gpioPort0, gpioPort2;
async function connect() {
  microBitBle = await microBitBleFactory.connect();
  msg.innerHTML=("micro:bit BLE接続しました。");
  var gpioAccess = await microBitBle.requestGPIOAccess();
  var mbGpioPorts = gpioAccess.ports;
  gpioPort0 = mbGpioPorts.get(0);
  await gpioPort0.export("out");
  gpioPort2 = gpioAccess.ports.get(2); // タクトスイッチのポート番号
  await gpioPort2.export("in");
  gpioPort2.onchange = toggleLed;
}

function toggleLed(val) {
  // スイッチは Pull-up なので OFF で 1、LED は OFF で 0 と反転させる
  ledOnOff(val === 0 ? 1 : 0);
}
