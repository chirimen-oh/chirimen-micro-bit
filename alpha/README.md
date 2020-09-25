# CHIRIMEN with micro:bit via USB

USB経由でCHIRIMEN with micro:bitを動かす実装を行っています。まだ検証が不十分なのと、APIの仕様がいい加減なのでalpha扱いとしてあります。

## micro:bit側のブリッジプログラムはUSB専用です
* [コードはこちら](https://makecode.microbit.org/_XPuM8WFsKR2E)
  * [ここにも同じものを保管](https://github.com/chirimen-oh/chirimen-micro-bit/tree/master/alpha/micro-bit-usb/)

## polyfillは両用で、最初の接続関数が違うのみです
* [拡張版polyfillはこちら](microBitBLE.js)

* USB接続： 
  * `microBitBleFactory.connect(true)` : とりあえずtrueにすればUSBで繋げます もしくは下記
  * `microBitBleFactory.connectUSB()`
* Bluetooth接続
  * `microBitBleFactory.connect()`　: 従来通り もしくは下記
  * `microBitBleFactory.connectBluetooth()`


## examplesのためしかた

micro:bit側に[USB用](https://makecode.microbit.org/_XPuM8WFsKR2E)を書き込んだ後、
[examples](../examples)のcsbを開き、
* index.htmlで、読み込んでるpolyfillを以下に書き換え
  * ```<script type="text/javascript" src="https://chirimen.org/chirimen-micro-bit/alpha/microBitBLE.js"></script>```
* main.jsで、
  * ``` microBitBleFactory.connect(true)```

に書き換えればとりあえず動かせます。
GPIOのOutと、内蔵センサー、I2CのSHT30, Neopixel, VL53L0Xのサンプルだけ今のところ動作確認したところです。
