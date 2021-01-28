
# micro:bitのバージョンについて #
CHIRIMEN with micro:bitは micro:bit V1.5に加え、2020年11月に発売されたmicro:bit V2で動作確認しています。全てのコードは共通です。

一方、[micro:bit V2で新たに拡張されたハードウェア機能](https://support.microbit.org/support/solutions/articles/19000119052-new-details-of-the-latest-micro-bit-revision)には現時点では対応していません。

*なお、検証できていませんが[それ以前のバージョンのmicro:bit](https://support.microbit.org/support/solutions/articles/19000087020-micro-bit-motion-sensor-hardware-change-v1-5-)でも動作する可能性が高いです。*

ただし、micro:bit V2ではCHIRIMENの環境に依存するものではありませんが、V2本体の電気的な特性による下記の注意事項があります。


## micro:bit V2の注意事項 ##

*Note: 本項に記述した内容は 製品のロットによって挙動が変化する可能性があります。*

micro:bit V2は[電源の仕様](https://tech.microbit.org/hardware/powersupply/)が変更になっています。この仕様を見る限り、様々な電源環境でより良好に動作するよう改良されています。
しかし2020年12月に調達したV2の製品を用いて検証した結果、JSTコネクタ(電池駆動用の白色のコネクタ)を使って作動させた場合、 下記の通り端子の駆動能力が低下する事象が確認されました。

* 1.5V一次電池 × 2 (マンガン・もしくはアルカリ)
  * 特に問題なく動作
* ニッケル水素電池 × 2 (エネループ等の高性能型も同様)
  * 複数のI2Cデバイスを接続するとI2Cデバイスとの通信が安定しない
  * [MOSFETを駆動するサンプル](https://chirimen.org/chirimen-micro-bit/examples/GPIO3/index.html)で、動作確認用に抵抗付きLEDを並列に追加するとFETがONにならない場合がある

以上より、**micro:bit V2ではニッケル水素電池の使用はお勧めできません。**
