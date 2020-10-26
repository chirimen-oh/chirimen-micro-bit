## CHIRIMEN with micro:bitのシステム構成

![block diagram](../imgs/chirimenMicrobitDiagram.png)

- Web Apps (ウェブアプリ)
   - CHIRIMEN with micro:bit 環境を使って開発し、ブラウザ上で実行するアプリです
   - [Examples](../examples/) のサンプルコードもこの部分に相当します
   - I2C デバイスのドライバライブラリも、この部分に位置します (通常の MakeCode プログラムと異なり、micro:bit にインストールするプログラム側にドライバは含めません)
- WebGPIO WebI2C Polyfill
   - WebGPIO, WebI2C API と micro:bit 内蔵センサーなどを操作する拡張 JavaScript API を提供するライブラリの実装です
   - Web Apps が最初にこのライブラリを読み込むことで、ブラウザが直接 WebGPIO 等をサポートしている場合と同様にアプリを開発可能にします
   - Web Bluetooth を用いて、micro:bit 側の CHIRIMEN BLE bridge と通信することで動作します
   - ソースコード: [microBitBLE.js](../polyfill/microBitBLE.js)
   - script タグ読み込み用 URL: [https://cdn.jsdelivr.net/npm/@chirimen/microbit](https://cdn.jsdelivr.net/npm/@chirimen/microbit)
- CHIRIMEN BLE brigde
   - micro:bit の GPIO, I2C, 内蔵デバイスを制御する、micro:bit 上で動作するサポートプログラム
   - Bluetooth を用いて、ウェブブラウザ側の WebGPIO WebI2C Polyfill と連携動作します
   - ソースコード: [このディレクトリの内容](../micro-bit)
   - インストール用 MakeCode ページ:  <a href="https://r.chirimen.org/makecode-chirimen" target="_blank">https://r.chirimen.org/makecode-chirimen</a>

### Tests

[フレームワークのテストページ](../tests/)
