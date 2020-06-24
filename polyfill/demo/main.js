/** Setup a touch start listener to attempt an unlock in. */
function unlockPromise() {
  let unlockResolver;
  const promise = new Promise((resolve) => {
    unlockResolver = resolve;
  });
  function unlock() {
    if (window !== window.parent /** NOTE: in iframe */) {
      console.error(
        [
          "iframeの中ではWeb Bluetooth APIにアクセスすることができません。",
          "新しいウィンドウ/タブで開いてください。",
          "https://w3c.github.io/webappsec-feature-policy/",
        ].join("")
      );
      window.open(document.location.href);
      return;
    }
    document.removeEventListener("touchstart", unlock, true);
    document.removeEventListener("touchend", unlock, true);
    document.removeEventListener("click", unlock, true);
    if (unlockResolver != null) unlockResolver();
  }
  document.addEventListener("touchstart", unlock, true);
  document.addEventListener("touchend", unlock, true);
  document.addEventListener("click", unlock, true);
  return promise;
}

/** @param {number} ms */
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  await unlockPromise();
  const microbit = await window.microBitBleFactory.connect();
  while (true) {
    try {
      if (!microbit.connected) {
        document.location.reload();
        return;
      }
      await loop(microbit);
    } catch (error) {
      console.error(error);
    }
    await sleep(100);
  }
}

/**
 * @param {{
 *   connected: any;
 *   disconnect: any,
 *   requestI2CAccess: any,
 *   requestGPIOAccess: any,
 *   readSensor: any,
 *   printLED: any,
 *   showIconLED: any }} microbit
 */
async function loop(microbit) {
  /**
   * @typedef {{ x: number, y: number, z: number }} XYZ
   * @typedef {XYZ} Acceleration
   * @typedef {XYZ} MagneticField
   * @typedef {number} Temperature (℃)
   * @typedef {number} Brightness
   * @typedef {(0 | 1 | 2 | 3)} Button
   * @type {{
   *   acceleration: Acceleration,
   *   magneticField: MagneticField,
   *   temperature: Temperature,
   *   brightness: Brightness,
   *   button: Button }}
   */
  const value = await microbit.readSensor();
  console.log(value);
  if (value != null) {
    document.body.style.whiteSpace = "pre-wrap";
    document.body.textContent = JSON.stringify(value, null, 2);
  }
}

main();
