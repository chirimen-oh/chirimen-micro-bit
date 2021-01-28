# CHIRIMEN with micro:bit via USB

通常は Bluetooth 通信で制御する [CHIRIMEN with micro:bit](../) ですが、Bluetooth の無線通信が不安定であったり速度や給電などの都合で USB ケーブルによる有線接続で制御するバージョンを試験実装しています。但し、まだ検証が不十分なのと、API の仕様がいい加減なので Alpha 版 (初期開発版) 扱いです。

## CHIRIMEN Bridge

**micro:bit 側に書き込むブリッジプログラムは USB 専用です。**これを書き込むと Bluetooth での通信は出来なくなるので注意してください (勿論 Bluetooth 版のプログラムを書き直すことで戻せます)。

- [USB 対応ブリッジプログラムの MakeCode ページ](https://r.chirimen.org/makecode-chirimen-alpha)
  - [ソースコード (GitHub)](micro-bit-usb/)

## CHIRIMEN Polyfill

**ブラウザに読み込む Polyfill ライブラリは Bluetooth/USB 両対応です。**`microBitBleFactory.connect()` の引数でいずれにするか指定します (試験実装の実験的 API です。この挙動は将来変わる可能性が高いです)。

- [Bluetooth/USB 両対応 polyfill](https://chirimen.org/chirimen-micro-bit/alpha/microBitBLE.js)

Bluetooth 接続と USB 接続の指定方法:

- USB 接続する場合：
  - `microBitBleFactory.connect(true)` : とりあえず true にすれば USB で繋げます もしくは下記
  - `microBitBleFactory.connectUSB()`
- Bluetooth 接続する場合:
  - `microBitBleFactory.connect()`　: 従来通り もしくは下記
  - `microBitBleFactory.connectBluetooth()`

## コードサンプル (examples) の試し方

micro:bit に [USB 用ブリッジブログラム](https://r.chirimen.org/makecode-chirimen-alpha) を書き込み、試したい [コードサンプル (Examples)](../examples)の CodeSandbox (csb) リンクを開き、`index.html` と `main.js` をそれぞれ 1 行ずつ変更して保存してください。その他は一切変えずに動作します。

- `index.html` で Polyfill ライブラリを読み込む `script` タグを置き換え:
  - `<script src="https://chirimen.org/chirimen-micro-bit/alpha/microBitBLE.js"></script>`
- `main.js` で `microBitBleFactory.connect()` としているところに `true` を引数に追加:
  - `microBitBleFactory.connect(true)`

GPIO、内蔵センサー、SHT30, Neopixel を初めとしたいくつかの I2C サンプルで試験している範囲では問題ありませんが、全サンプルコードでのテストまでは出来ていません。

### i2cdetect USB 版

I2C detect については USB 版になっているページを用意しています。Bluetooth 版を編集せずこちらをご利用ください:

- [i2cdetect_usb](i2cdetect_usb/index.html)

### トラブルシューティング

- Q. 接続する USB デバイスリストに micro:bit が表示されない
  - A. USB 充電専用ケーブルを使っている場合は認識されないため注意してください。
- Q. USB 接続に失敗する、または接続は出来るが GPIO も I2C も全く動作しない、または I2C だけ動作しない
  - A. micro:bit のファームウェアが古い場合、全く動作しない場合や I2C が安定しない場合があります。最新のバージョンに更新してください。  
    - [micro:bitのファームウェアアップデート方法](https://microbit.org/get-started/user-guide/firmware/)
- Q. 特定の PC と特定の micro:bit の組み合わせでは I2C デバイスが安定動作しない
  - A. 環境によっては安定動作しない場合があるようですが、原因特定と解決にまで到っていません。I2C が動作する環境ではどのサンプルでも動作し、動作しない環境では GPIO 等シンプルな通信で動作するサンプルしか動かない場合があるようです。

