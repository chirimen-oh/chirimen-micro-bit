// i2cDetect的なものを実装してみます
// https://kernel.googlesource.com/pub/scm/utils/i2c-tools/i2c-tools/+/v3.1.2/tools/i2cdetect.c
// によると、 readmodeの場合はi2c_smbus_read_byteしてるだけなんですね・・
// しかし、res = i2c_smbus_read_byte(file); で res<0かどうかで有無を弁別している(すなわちエラーステートがわかる)のですが、つながってない時もmicro:bitのi2cReadBufferでは0が返ってくる・・・・？

var microBitBle;

var i2cPort;

var readEnable;

onload = function(){
	makeTable();
}

async function connect(){
	microBitBle = await microBitBleFactory.connect(true);
	msg.innerHTML=("micro:bit BLE接続しました。");
	var i2cAccess = await microBitBle.requestI2CAccess();
	i2cPort = i2cAccess.ports.get(1);
	readData();
}

async function disconnect(){
	readEnable = false;
	await microBitBle.disconnect();
	msg.innerHTML=("micro:bit BLE接続を切断しました。");
}

async function readData(){
	for ( var i = 0 ; i < 128 ; i++ ){
		document.getElementById("ADDR"+i).innerText = "";
	}
	for ( var slaveAddress = 0 ; slaveAddress <128 ; slaveAddress++ ){
		var i2cSlave = await i2cPort.open(slaveAddress);
		try{
			var ret = await i2cSlave.readBytes(8); // ので、苦し紛れですが最初の8バイトを読んで0以外があったら・・
			var ans ="-";
			for ( var k = 0 ; k < ret.length ; k++ ){
				if (ret[k]!=0){
					ans = slaveAddress.toString(16);
					break;
				}
			}
			console.log("addr:",slaveAddress,"  ans:",ret);
			document.getElementById("ADDR"+slaveAddress).innerText = ans;
			await sleep(10);
		} catch ( e ){
			console.log("addr:",slaveAddress,"  ans: ERROR");
		}
	}
	
	for ( var slaveAddress = 0 ; slaveAddress <128 ; slaveAddress++ ){
		if ( document.getElementById("ADDR"+slaveAddress).innerText == "-"){
			var i2cSlave = await i2cPort.open(slaveAddress);
			try{
				var ans ="--";
				ret = await i2cSlave.read16(0x80); // さらに苦し紛れ・・・(BMP280はこの辺から値がある・・)
				if ( ret != 0){
					ans = slaveAddress.toString(16);
				}
				console.log("addr:",slaveAddress,"  ans:",ret);
				document.getElementById("ADDR"+slaveAddress).innerText = ans;
				await sleep(10);
			} catch ( e ){
				console.log("addr:",slaveAddress,"  ans: ERROR");
			}
		}
	}
	
	
	
}

function makeTable(){
	var tbl = document.createElement("table");
	var addr =0;
	for ( var i = 0 ; i < 9 ; i++ ){
		var tr = document.createElement("tr");
		
		for ( var j = 0 ; j < 17 ; j++ ){
			var td = document.createElement("td");
			if ( i==0 ){
				if ( j==0){
				} else {
					td.innerText= ((j-1)).toString(16);
				}
			} else {
				if ( j==0 ){
					td.innerText= ((i-1) * 16).toString(16);
				} else {
					td.id="ADDR"+addr;
					++ addr;
				}
			}
			tr.appendChild(td);
		}
		tbl.appendChild(tr);
	}
	detect.appendChild(tbl);
}
