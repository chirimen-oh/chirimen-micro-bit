# CHIRIMEN with micro:bit via USB

USB経由でCHIRIMEN with micro:bitを動かす実装を行っています。まだ検証が不十分なのと、APIの仕様がいい加減なのでalpha扱いとしてあります。

## micro:bit側のブリッジプログラムはUSB専用です
* [コードはこちら](https://makecode.microbit.org/_FCyPDq5kUhzr)
  * [ここにも同じものを保管・・](micro-bit-usb/)

## polyfillは両用で、最初の接続関数が違うのみです
* [拡張版polyfillはこちら](microBitBLE.js)

* USB接続： 
  * `microBitBleFactory.connect(true)` : とりあえずtrueにすればUSBで繋げます もしくは下記
  * `microBitBleFactory.connectUSB()`
* Bluetooth接続
  * `microBitBleFactory.connect()`　: 従来通り もしくは下記
  * `microBitBleFactory.connectBluetooth()`


