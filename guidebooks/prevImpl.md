# 前身の実装について #

CHIRIMEN with micro:bitは、WebGPIO だけを実装した [webGPIO-etc-on-microbit-via-webBluetooth](https://github.com/chirimen-oh/webGPIO-etc-on-microbit-via-webBluetooth)を前身としていますが、micro:bit のリソース上の制限から全く異なる新規実装となっています。

[webGPIO-etc-on-microbit-via-webBluetooth](https://github.com/chirimen-oh/webGPIO-etc-on-microbit-via-webBluetooth)は、[onchange](http://browserobo.github.io/WebGPIO/#onchange-gpioaccess) APIなどで現在のCHIRIMEN with micro:bitの実装と比べ一部高性能な実装が含まれていますが、CHIRIMENスペックのサポートが不十分なため開発プロジェクトは終了しています。（micro:bit V1.5のリソースが限られているため実装が難しい）