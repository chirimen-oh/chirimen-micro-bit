# 拡張機能について

## 内蔵デバイスの利用機能
- 内蔵センサー
   - 3軸磁気センサ
   - 3軸加速度センサ
   - 温度
   - 明るさ
- ボタン
   - ボタンA
   - ボタンB
- マトリクスLED

[サンプル](../examples#内蔵デバイス)

### GPIOの拡張機能
- アナログ入出力
- プルアップ/プルダウン設定

[サンプル](../examples#拡張gpio)

## IDL

```
partial interface Navigator {
    MicroBitBleFactory microBitBleFactory;
};

interface MicroBitBleFactory {
    Promise<MicroBitBle> connect();
};

interface MicroBitBle {
    Promise<GPIOAccess> requestGPIOAccess ();
    Promise<I2CAccess> requestI2CAccess ();
    Promise disconnect ();
    attribute readonly boolean connected;
    Promise<MicroBitSensData> readSensor ();
    Promise printLED (DOMString message);
};

interface MicroBitSensData{
    attribute readonly VectorValue acceleration;
    attribute readonly VectorValue magneticField;
    attribute readonly int temperature;
    attribute readonly int brightness;
};

interface VectorValue{
   attribute int x;
   attribute int y;
   attribute int z;
};

patial interface GPIOPort : EventTarget {
    Promise  export (DirectionMode direction , optional PullMode pullMode);
};

enum DirectionMode { "", "in", "out", "analogin", "analogout" }
enum PullMode { "none", "up", "down" }

```

