# Examples 
回路図はリンク先htmlに掲載

## GPIO

|`LIVE`Example  |説明  |ソースコード|codesandbox|
|:---|:---|:---|:---|
| <a href="GPIO1/index.html" target="_blank">GPIO1</a> | Hello Real World (Lチカ) | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/GPIO1/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/GPIO1)|
| <a href="GPIO0/index.html" target="_blank">GPIO0</a> | タクトスイッチに反応して画面表示| [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/GPIO0) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/GPIO0)|
| <a href="GPIO2/index.html" target="_blank">GPIO2</a> | タクトスイッチに反応してLEDが点灯 | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/GPIO2/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/GPIO2)|
| <a href="GPIO3/index.html" target="_blank">GPIO3</a> | 画面のボタンに反応してモーター動作 | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/GPIO3/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/GPIO3)|
| [CMMB_GPIO_example3.png](../imgs/CMMB_GPIO_example3.png) | タクトスイッチに反応してモーター動作(回路図のみ。コードは <a href="GPIO2/index.html" target="_blank">GPIO2</a>を使用します) |[GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/GPIO2/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/GPIO2)|
| <a href="GPIO4/index.html" target="_blank">GPIO4</a> | 画面のボタン及びタクトスイッチに反応してモーター動作 | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/GPIO4/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/GPIO4)|

## I2C
micro:bitのI2C端子はpin19(SCL)とpin20(SDA)です。

|`LIVE`Example  |説明  |ソースコード|codesandbox|
|:---|:---|:---|:---|
| <a href="I2C1_ADT7410/index.html" target="_blank">I2C1_ADT7410</a> | ADT7410 温度センサー | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C1_ADT7410/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C1_ADT7410)|
| <a href="I2C1b_ADT7410/index.html" target="_blank">I2C1b_ADT7410</a> | ADT7410 温度センサー(ドライバ使わずに) | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C1b_ADT7410/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C1b_ADT7410)|
| <a href="I2C2_BMP280/index.html" target="_blank">I2C2_BMP280</a> | BMP280 気圧・温度センサー | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C2_BMP280/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C2_BMP280)|
| <a href="I2C3_VL53L0X/index.html" target="_blank">I2C3_VL53L0X</a> | VL53L0X レーザー距離センサー | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C3_VL53L0X/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C3_VL53L0X)|
| <a href="I2C4_S11059/index.html" target="_blank">I2C4_S11059</a> |  S11059 色センサー | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C4_S11059/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C4_S11059)|
| <a href="I2C5_NEOPIXEL/index.html" target="_blank">I2C5_NEOPIXEL</a> |  [NEOPIXEL I2C](https://gist.github.com/satakagi/608f6c2c963c8e9453864f11b6fb1f3d#file-readme-md)  | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C5_NEOPIXEL/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C5_NEOPIXEL)|
| <a href="I2C6_BME280/index.html" target="_blank">I2C6_BME280</a> |  BME280 気圧・温度・湿度センサー  | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C6_BME280/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C6_BME280)|
| <a href="I2C7_SHT30/index.html" target="_blank">I2C7_SHT30</a> |  SHT30 温度・湿度センサー  | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C7_SHT30/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C7_SHT30)|
| <a href="I2C8_PCA9685/index.html" target="_blank">I2C8_PCA9685</a> |  PCA9685 サーボコントロール  | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C8_PCA9685/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C8_PCA9685)|
| <a href="I2C_ADS1115/index.html" target="_blank">I2C_ADS1115</a> |  ADS1115 ADコンバータ  | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C_ADS1115/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C_ADS1115)|
| <a href="I2C_ADS1115_LoadCell/index.html" target="_blank">I2C_ADS1115_LoadCell</a> |  ADS1115 ＋ ロードセル  | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C_ADS1115_LoadCell/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C_ADS1115_LoadCell)|
| <a href="I2C_AMG8833/index.html" target="_blank">I2C_AMG8833</a> |  AMG8833 サーモグラフィ  | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C_AMG8833/) | [csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C_AMG8833)|
| <a href="I2C_BH1750/index.html" target="_blank">I2C_BH1750</a> |  BH1750 照度センサ  | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C_BH1750/) | [csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C_BH1750)|
| <a href="I2C_BMP180/index.html" target="_blank">I2C_BMP180</a> |  BMP180 気圧・温度センサ  | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C_BMP180/) | [csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C_BMP180)|
| <a href="I2C_INA219/index.html" target="_blank">I2C_INA219</a> |  INA219 DC電流センサ  | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C_INA219/) | [csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C_INA219)|
| <a href="I2C_MLX90614/index.html" target="_blank">I2C_MLX90614</a> |  MLX90614 赤外線温度センサ  | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C_MLX90614/) | [csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C_MLX90614)|

| <a href="I2C_MPU6050/index.html" target="_blank">I2C_MPU6050</a> |  I2C_MPU6050 ３軸ジャイロ＋３軸加速度センサ  | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C_MPU6050/) | [csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C_MPU6050)|
| <a href="I2C_MPU9250/index.html" target="_blank">I2C_MPU9250</a> |  I2C_MPU9250 ３軸ジャイロ＋３軸加速度＋３軸磁気センサ  | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/I2C_MPU9250/) | [csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/I2C_MPU9250)|
<br>

- <a href="i2cdetect/index.html" target="_blank">I2Cデバイスをリストアップするツール (i2cdetect.html)</a>


## 内蔵デバイス

|`LIVE`Example  |説明  |ソースコード|codesandbox|
|:---|:---|:---|:---|
| <a href="Embed/index.html" target="_blank">Embed</a> |  内蔵デバイス(LED, 加速度, 磁気, 温度, 明るさ, スイッチAB) | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/Embed/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/Embed)|


<br>

- [拡張API解説](../guidebooks/extendedFunctions.html#内蔵デバイスの利用機能)

## 拡張GPIO

|`LIVE`Example  |説明  |ソースコード|codesandbox|
|:---|:---|:---|:---|
| <a href="GPIO_EXT0/index.html" target="_blank">GPIO_EXT0</a> |  アナログ出力 (LEDが緩やかに明滅) | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/GPIO_EXT0/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/GPIO_EXT0)|
| <a href="GPIO_EXT1/index.html" target="_blank">GPIO_EXT1</a> |  アナログ入力 | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/GPIO_EXT1/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/GPIO_EXT1)|
| <a href="GPIO_EXT1b/index.html" target="_blank">GPIO_EXT1b</a> |  アナログ入力(onchange) | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/GPIO_EXT1b/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/GPIO_EXT1b)|

<br>

- [拡張API解説](../guidebooks/extendedFunctions.html#gpioの拡張機能)


## リモートコントロール ([RelayServer.js](https://chirimen.org/remote-connection/)を使います)

システム構成イメージは以下の通りです
![構成図](imgs/systemConf.png)

まずPC-sideのwebAppsを開きます。次にmicro:bit-sideを開きます。　その後、micro:bit-sideのwebAppsでmicro-bitを接続すると、二つのwebApps間で遠隔制御が実行されます。動作確認であれば両方のwebAppsをひとつのPCで開いても動きます。もちろんそれぞれを別々の場所のPCで開いても動きます。

|`LIVE`Example<br> PC-side | micro:bit-side |説明  |ソースコード|codesandbox|
|:---|:---|:---|:---|:---|
| <a href="remote_example1/pc.html" target="_blank">PC-side</a> | <a href="remote_example1/mbit.html" target="_blank2">micro:bit-side</a> | 内蔵センサーの値を配信 | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/remote_example1/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/remote_example1)|
| <a href="remote_example2/pc.html" target="_blank">PC-side</a> | <a href="remote_example2/mbit.html" target="_blank2">micro:bit-side</a> | 内蔵センサーの値をPC側からリクエスト | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/remote_example2/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/remote_example2)|
| <a href="remote_example3/pc.html" target="_blank">PC-side</a> | <a href="remote_example3/mbit.html" target="_blank2">micro:bit-side</a> | LEDにメッセージを表示 | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/remote_example3/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/remote_example3)|
| <a href="remote_example4/pc.html" target="_blank">PC-side</a> | <a href="remote_example4/mbit.html" target="_blank2">micro:bit-side</a> | GPIOに繋いだLEDをPCから点灯 | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/remote_example4/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/remote_example4)|
| <a href="remote_example5/pc.html" target="_blank">PC-side</a> | <a href="remote_example5/mbit.html" target="_blank2">micro:bit-side</a> | I2C温度湿度センサSHT30の値をPC側からリクエスト | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/remote_example5/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/remote_example5)|
| <a href="remote_example8/pc.html" target="_blank">PC-side</a> | <a href="remote_example8/mbitR.html" target="_blank2">micro:bit-side</a> | サーボモーターを遠隔コントロール | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/remote_example8/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/remote_example8)|

### 2台のmicro:bitを使った連携サンプル

micro:bitを2台用意し、それぞれに接続します。2台のCHIRIMENデバイス間での連携を行います。

|`LIVE`Example<br> micro:bit-sideA  | micro:bit-sideB |説明  |ソースコード|codesandbox|
|:---|:---|:---|:---|:---|
| <a href="remote_example6/mbit1_2.html" target="_blank">micro:bit-sideA</a> | <a href="remote_example6/mbit1_2.html" target="_blank2">micro:bit-sideB</a> | 一方のボタンを押すともう一方のLEDに表示 | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/remote_example6/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/remote_example6)|
| <a href="remote_example7/mbitT.html" target="_blank">micro:bit-sideA</a> | <a href="remote_example7/mbitR.html" target="_blank2">micro:bit-sideB</a> | 一方を傾けるともう一方に接続されたサーボモーターが傾斜に応じて回転 | [GitHub](https://github.com/chirimen-oh/chirimen-micro-bit/blob/master/examples/remote_example7/) |[csb](https://codesandbox.io/s/github/chirimen-oh/chirimen-micro-bit/tree/master/examples/remote_example7)|
