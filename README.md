<p align="right">Language: <a href="https://chirimen.org/chirimen-micro-bit/">Japanese</a>, <a href="https://translate.google.co.jp/translate?sl=ja&tl=en&u=https%3A%2F%2Fchirimen.org%2Fchirimen-micro-bit%2F">English (Google Translation)</a></p>

![CHIRIMEN with micro:bit](imgs/CHIRIMEN_MICROBIT.png "CHIRIMEN with micro:bit")

# CHIRIMEN with micro:bit

## はじめに

[micro:bit](https://microbit.org/) を利用した [CHIRIMEN](https://chirimen.org/#about) の実装です。

CHIRIMEN とは、[WebGPIO API](https://github.com/browserobo/WebGPIO) と [WebI2C API](https://github.com/browserobo/WebI2C) を用い、ボードコンピュータの端子につないだセンサやアクチュエータを使用した(ブラウザ上で動作する)ウェブアプリから制御できる環境です。micro:bit ではウェブラウザは(多分:-)動きませんが、パソコンやスマートフォン等で動く (Chrome など [Web Bluetooth API](https://webbluetoothcg.github.io/web-bluetooth/) をサポートする) ウェブブラウザから micro:bit と Bluetooth 接続することで CHIRIMEN 環境を実現しています。

なお、CHIRIMEN with micro:bit では、CHIRIMEN 環境共通の WebGPIO, WebI2C API に加え、micro:bit 内蔵しているセンサーや LED、アナログ GPIO などもウェブアプリから使うための機能も追加実装しています。

## 使い方

- [スタートアップガイド](guidebooks/startup.md)
- [チュートリアル](https://tutorial.chirimen.org/microbit/)

## サンプルコード集 (Examples)

基本的な利用例、各種ドライバを使ったセンサーやアクチュエーターを利用するサンプル、インターネット経由で相互通信するサンプルなどを多数用意しています。こちらのサンプルコードを試したり書き換えたりしてご利用ください。

- [Examples](examples/)

## その他の情報

- [システム構成の説明](guidebooks/systemConfiguration.md)
- [拡張機能の仕様](guidebooks/extendedFunctions.md)
- [micro:bit 標準搭載機能を使う際のポイント](guidebooks/features.md)
- [CHIRIMEN for Raspberry Pi との違い](guidebooks/diff_rpi3.md)
- [USB 接続版 (開発中)](alpha)

## 補足

この実装は、WebGPIO だけを実装した [webGPIO-etc-on-microbit-via-webBluetooth](https://github.com/chirimen-oh/webGPIO-etc-on-microbit-via-webBluetooth)を前身としていますが、micro:bit のリソース上の制限から全く異なる新規実装となっています。
