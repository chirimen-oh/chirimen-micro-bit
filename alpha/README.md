# CHIRIMEN with micro:bit via USB

USB 経由で CHIRIMEN with micro:bit を動かす実装を行っています。まだ検証が不十分なのと、API の仕様がいい加減なので alpha 扱いとしてあります。

## micro:bit 側のブリッジプログラムは USB 専用です

- [コードはこちら](https://makecode.microbit.org/_XPuM8WFsKR2E)
  - [ここにも同じものを保管](https://github.com/chirimen-oh/chirimen-micro-bit/tree/master/alpha/micro-bit-usb/)

## polyfill は両用で、最初の接続関数が違うのみです

- [拡張版 polyfill はこちら](microBitBLE.js)

- USB 接続：
  - `microBitBleFactory.connect(true)` : とりあえず true にすれば USB で繋げます もしくは下記
  - `microBitBleFactory.connectUSB()`
- Bluetooth 接続
  - `microBitBleFactory.connect()`　: 従来通り もしくは下記
  - `microBitBleFactory.connectBluetooth()`

## examples のためしかた

micro:bit 側に[USB 用](https://makecode.microbit.org/_XPuM8WFsKR2E)を書き込んだ後、
[examples](../examples)の csb を開き、

- index.html で、読み込んでる polyfill を以下に書き換え
  - `<script src="https://chirimen.org/chirimen-micro-bit/alpha/microBitBLE.js"></script>`
- main.js で、
  - ` microBitBleFactory.connect(true)`

に書き換えればとりあえず動かせます。
GPIO の Out と、内蔵センサー、I2C の SHT30, Neopixel, VL53L0X のサンプルだけ今のところ動作確認したところです。

## i2cdetect USB
- [i2cdetect_usb](i2cdetect_usb/index.html)