# スタートアップガイド
 
## 概要
CHIRIMEN with micro:bitをはじめてつかうときの流れを解説します。

## 準備するもの
- Bluetooth (4.0以上) が載ったコンピュータ ＋ Web Bluetooth APIをサポートしたブラウザ（以下のいずれか）
   - ( Windows10 PC | MacOS PC | Linux PC ) ＋ ( Chrome | Chromium | [blinkエンジン搭載のEdge(現在Devリリース)](https://www.microsoftedgeinsider.com) )
   - Rasoberry Pi3 + Chromium ([Chirimen for Raspberry Pi3](https://tutorial.chirimen.org/raspi3/ja/sdcard)は、CHIRIMEN with micro:bit用としても使える環境設定済みのOSイメージになっています。raspbianで自分で設定して使うこともできます)
   - *Note: Bluetoothが載っていないPCでもBluetooth USBドングルで使えるものがあります。(Windows10マシン+エレコムLBT-UAN05C2など)*
- micro:bit (amazonや秋月電子通商などで購入可能です。2000円程)
- microUSBケーブル(PCとmicro:bitを繋いでサポートプログラムを書き込んだり、micro:bitの電源用に必要)
- micro:bit用ブレークアウトボード （micro:bitのエッジコネクタをピンヘッダに変換するパーツ。 下記に例を紹介します　数百円～）
   - http://akizukidenshi.com/catalog/g/gP-12836/
   - https://www.switch-science.com/catalog/3181/
   - https://www.amazon.co.jp/dp/B07QGZ3DKK
   - https://www.amazon.co.jp/dp/B07GTQ21ST
- Examplesに応じたパーツやジャンパー線
   - CHIRIMENスターターキットを使うと、GPIOおよび、I2C(温度センサ)のExamplesが試せます
   - Lチカに必要なパーツは以下を参照してください

### L チカに必要となるパーツ
- ブレッドボード × 1
- リード付き LED × 1
- リード付き抵抗器 (150Ω-1KΩ) × 1 (赤色のものは大きい抵抗値でも点灯するでしょう)
- ジャンパーワイヤー (オス-メス) x 2

## micro:bitのピンのことを知る
micro:bitにはGPIO等の端子が備わっていますが、ブレッドボードを接続するのに便利なピンヘッダではなく、少し独特な[エッジコネクタ](https://ja.wikipedia.org/wiki/%E3%82%A8%E3%83%83%E3%82%B8%E3%83%BB%E3%82%B3%E3%83%8D%E3%82%AF%E3%82%BF)になっています。GPIO0～2と、GND及び3Vは大きな端子になっていて、ワニ口クリップなどで簡単にLEDなどをつなぐことができますが、CHIRIMEN with micro:bitではこれ(GPIO端子)に加えて、I2C端子(SCL,SDA)を使った例が多いです。これらはとても細い端子(下図の19番(SCL)と20番の端子(SDA))なので、先述のブレークアウトボードが便利です。

### micro:bitのピン配置
![micro:bit](https://pxt.azureedge.net/blob/64c6ccff8e3ee82c4224874e5cacc9d0d5c60132/static/mb/device/pins-0.png) 
オリジナルページ：https://makecode.microbit.org/device/pins

### ブレークアウトボードの使い方
micro:bitのエッジコネクタをブレークアウトボードに差し込みます。

ブレークアウトボードにはmicro:bitのすべての端子にアクセスできるピンヘッダが付けられています。脇には端子の名称も印刷されています。

Exampleや以降の解説の実体配線図では、ブレークアウトボードは省略されています。GPIO番号やSCL,SDA,GND,VCCなどの端子の機能をもとにつないでください。

## mircro:bitにCHIRIMENサポート用プログラムを書き込む
CHIRIMEN with micro:bitでは、PCのブラウザ上で動かすウェブアプリケーションを開発します。mircro:bit側のプログラム開発は基本的に必要ありません。ただし、Bluetooth経由でGPIOやI2C端子などを使用できるようにする[専用のサポートプログラム](https://makecode.microbit.org/_DEy9fTMpreEu)をmicro:bitに書き込んでおく必要があります。

- [こちらのページ](https://makecode.microbit.org/_DEy9fTMpreEu)にアクセスして、micro:bitにサポートプログラムを書き込みます。
   - 書き込み方は通常のmicro:bit用プログラムと全く同じです。
   - PCにプログラムをダウンロード
   - micro:bitをUSBでPCに接続 (USBドライブとしてPC上にマウント)
   - ダウンロードしたプログラムをマウントしたmicro:bit USBドライブにコピー
   - 自動的に再起動しインストール完了
   - これで準備完了です！ USBケーブルを外して次に進みましょう。

*なお、このCHIRIMEN用のサポートプログラムは、micro:bit上で動かす他のプログラムと同じ動作環境で構築してありますので、CHIRIMEN with micro:bitを使わないときは、特別な手順は必要なく自由に他のプログラムと置き換えることができます。*

## LEDを点滅させてみる
- 以下の実態配線図のように配線しましょう。*(ブレークアウトボードは省略しています)*
![LED blink](../imgs/CMMB_GPIO_example1.png)
- micro:bitにUSBケーブルをつなぎ、電源を供給します。(PCのUSBポートからも電源供給可能)
- [こちらのページ](../examples/GPIO1.html)にアクセス
- [接続]ボタンを押して、micro:bitとペアリングします
- ペアリングが成功するとLEDが点滅します
