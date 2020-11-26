# CHIRIMEN for Raspberry Pi3との差分
- 読み込むポリフィルライブラリが異なります
   - ```https://chirimen.org/chirimen-micro-bit/polyfill/microBitBLE.js```
- 最初にBluetoothで接続が必要です　(この部分```microBitBle = await microBitBleFactory.connect();```  切断はこちら```microBitBle.disconnect()```) また、この接続関数はユーザによるHMI操作をトリガとして呼び出される必要があります。([Examples](../examples/)ではボタンUI)
- webGPIOやwebI2C APIが、```navigator```ではなく、自分で指定した変数に設置されます。(上の例では```microBitBle```)
   - ただし最初の一台分は```navigator```にも設置されます。複数のmicro:bitを同時に繋げられるのでこうなっています。
- GPIOの端子番号やプルアップ・ダウン状態が異なります
  - デフォルトはプルアップとなり、[export関数の第二引数で設定可能](extendedFunctions.md#gpioの拡張機能)
- 遅いです (Bluetooth通信のオーバーヘッドなどのため)　レーザー距離センサーを使うと気になります
- 5Vを使う回路の場合 別電源が必要です
- 内蔵センサー値取得他、[いくつかの拡張機能](extendedFunctions.md)があります
- 内蔵センサーがI2Cアドレスを占有しています(多くの場合0x19と0x1E) - [こちらを参照](https://tech.microbit.org/hardware/i2c/)
- *I2Cデバイスのドライバーは基本的にCHIRIMEN for Raspberry PI3と共通です*

## 使用できるGPIOポート

| ポート番号 | 0 | 1 | 2 | 5 | 8 | 11 | 13 | 14 | 15 | 16 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 入力        | o | o | o | o | o | o | o | o | o | o |
| 出力        | o | o | o | - | o | - | o | o | o | o |
| アナログ入力 | o | o | o | - | - | - | - | - | - | - |
| アナログ出力 | o | o | o | - | o | - | o | o | o | o |

Note: アナログ出力は50HzのPWMとなっています。
