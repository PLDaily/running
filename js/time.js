function Time() {
	var _this = this;
	this.oClock = document.getElementById("clock");
	this.oStart = document.getElementById("start");
	this.oStop = document.getElementById("stop");
	this.oRebuilt = document.getElementById("rebuilt");
    this.centerKeDu = document.getElementById("centerkedu");
	this.timer = null;
	this.aTime = [];

	this.oDistance = document.getElementById("distance");
	this.oDistanceValue = this.oDistance.getElementsByTagName("span")[0];
	this.oCal = document.getElementById("cal");
	this.oCalValue = this.oCal.getElementsByTagName("span")[0];

	this.oLength = document.getElementById("length");
	this.oLengthValue = this.oLength.getElementsByTagName("span")[0];
    this.oPower = document.getElementById("power");
    this.oPowerValue = this.oPower.getElementsByTagName("span")[0];
	this.oSudu = document.getElementById("sudu");
	this.oPodu = document.getElementById("podu");
	this.disValue = 0;
	this.calValue = 0;
	this.oKeDuValue = 38;
	this.lengthValue = 0;
    this.powerValue = 0;
	this.oSuduShiWei = document.getElementById("suduShiWei");
	this.oSuduGeWei = document.getElementById("suduGeWei");


	this.oBox = null;
	this.s = 0;//秒
	this.m =0;//分钟
	this.h = 0;//小时

	this.n = 0;
	this.set = function() {
		this.inner();
		this.timer = setInterval(function() {
			_this.inner();
		}, 500);
	}

	this.oStart.onclick = function() {
		_this.sytemBegin();
		_this.fnStart();
	}

	this.oRebuilt.onclick = function() {
		_this.fnRebuilt();
	}

	this.oStop.onclick = function() {
		_this.fnStop();
	}
}

Time.prototype.sytemBegin = function() {
	//var Connect = plus.android.importClass("com.tagcell.treadmill.Connect");    
   	//var Con = new  Connect(); 
    //Con.senddata("58"+"08"+"20"+"00"+"00"+"00"+"00"+"28"+"50"+"53"); 
}

Time.prototype.inner = function() {

    this.n++;
    if (this.n == 2) {
        this.n = 0;
        if (this.m == 59 && this.s == 60) {
            this.h++;
            this.m = 0;
            this.s = 0;
        }

        if (this.s == 60) {
            this.m++;
            this.s = 0;
        }

        var now = this.toDou(this.h) + this.toDou(this.m) + this.toDou(this.s);

        for (var i = 0; i < now.length; i++) {

            this.aTime[i].className = 'box';
            this.aTime[i].innerHTML = '<span class="number">' + now.charAt(i) + '</span>';

        }
        this.s++;

        /*------距离的计算----------*/
        var oSuduValue = this.oSudu.getElementsByTagName("span")[0].innerHTML;
        var value1 = Math.round((1 * oSuduValue / 1000) * 1000) / 1000;
        this.disValue = Math.round((this.disValue + value1) * 1000) / 1000;
        this.oDistanceValue.innerHTML = this.disValue.toFixed(2) + ' km';
        /*------中间刻度的旋转---------*/
        this.oKeDuValue = 38 - this.disValue*1000*0.5;
        //console.log(oKeDuValue);
        this.centerKeDu.style.transform = "rotate(" + this.oKeDuValue + "deg)"

        /*----------卡路里的计算------------*/
        var oCalValue = this.oPodu.getElementsByTagName("span")[0].innerHTML;
        var value2 = 70.3 * oSuduValue * 3.6 * (1 / 3600) * (1 + oCalValue / 100);
        this.calValue += value2;
        this.oCalValue.innerHTML = parseInt(this.calValue) + ' kcal';

        /*-----------累计路程----------*/
        this.lengthValue += value1;
        this.oLengthValue.innerHTML = this.lengthValue.toFixed(2) + ' km';

        /*----------累计消耗----------*/
        this.powerValue += value2;
        this.oPowerValue.innerHTML = parseInt(this.powerValue) + ' kcal';

    }
    /*-----向后台传输数据----------------*///500秒传一次

    var poduValue = this.oPodu.getElementsByTagName("span")[0].innerHTML;
    var suduValue = this.oSudu.getElementsByTagName("span")[0].innerHTML;
    var poduValueSixteen = parseInt(poduValue).toString(16);
    var suduValueSixteen = parseInt(suduValue).toString(16);
    var check = (parseInt(poduValue) + parseInt(suduValue)).toString(16);
    //Con.senddata("58"+"08"+"20"+"50"+"00"+"速度"+"坡度"+"19"+"校验值"+"53");
    //console.log("58" + "08" + "20" + "50" + "00" + this.toDouSixteen(suduValueSixteen) + this.toDouSixteen(poduValueSixteen) + "19" + this.toDouSixteen(check) + "53");
    //Con.senddata("58" + "08" + "20" + "50" + "00" + this.toDouSixteen(suduValueSixteen) + this.toDouSixteen(poduValueSixteen) + "19" + this.toDouSixteen(check) + "53");
    /*-------验证后台接受回来的数据----------------*/

    //var rev = Con.Received().toString().substr(23,1);
    //switch(rev){
        //case 1:


    //}


}

Time.prototype.toDouSixteen = function(n) {
	return n.length < 2 ? "0" + n : n;
}
Time.prototype.doHtml = function() {//秒表通过JS动态创建
	for(var i = 0; i < 8; i++) {
		this.oBox = document.createElement('div');
		this.oBox.className = 'box';

		if((i + 1) % 3) {
			this.aTime.push(this.oBox);
			this.oBox.innerHTML = '<span class="number">0</span>';
		}else {
			this.oBox.innerHTML = '<span class="dian">:</span>';
		}
		this.oClock.appendChild(this.oBox);
	}
	this.oDistanceValue.innerHTML = this.disValue.toFixed(2) + ' km';
	this.oCalValue.innerHTML = this.calValue + ' kcal';
	this.oLengthValue.innerHTML = this.lengthValue.toFixed(2) + ' km';
    this.oPowerValue.innerHTML = this.powerValue + ' kcal';
}

Time.prototype.toDou = function(n) {
	return n < 10 ? '0' + n: '' + n;
}

Time.prototype.fnStart = function() {
	if(typeof this.timer == 'object'){//多次点击定时器叠加
		this.set();
		//move.js的move对象
		if(move.j == 0) {
			move.setUpSuduGeWei();
			move.fnAddRight();
		}
	}
}

Time.prototype.fnStop = function() {
	clearInterval(this.timer);
	this.timer = null;
	move.j = 0
	move.areaSuduShiWei.scrollTop = 0;
    move.areaSuduGeWei.scrollTop = 0;
    move.value3 = 150;//右指针起始位置
    move.oPoint2.style.transform = "rotate(" + move.value3 + "deg)";
    move.value4 = 25;//右按钮起始位置
    move.oButtonRight.style.transform = "rotate(" + move.value4 + "deg)";
}

Time.prototype.fnRebuilt = function() {
	this.s = this.h = this.m = 0;
	clearInterval(this.timer);
	this.timer = null;

	var now = this.toDou(this.h) + this.toDou(this.m) + this.toDou(this.s);

	for(var i = 0; i < now.length; i++) {

		this.aTime[i].className = 'box';
		this.aTime[i].innerHTML = '<span class="number">'+now.charAt(i)+'</span>';
	
	}//时间显示为0

	this.disValue = 0;
	this.oDistanceValue.innerHTML = this.disValue.toFixed(2) + ' km';//距离显示为0
	this.calValue = 0;
	this.oCalValue.innerHTML = this.calValue + ' kcal';
	this.oKeDuValue = 38;
	this.centerKeDu.style.transform = "rotate(" + this.oKeDuValue + "deg)"

	//速度按钮等定时器开启才有效	
	move.j = 0//
	move.areaSuduShiWei.scrollTop = 0;
    move.areaSuduGeWei.scrollTop = 0;
    move.value3 = 150;//右指针起始位置
    move.oPoint2.style.transform = "rotate(" + move.value3 + "deg)";
    move.value4 = 25;//右按钮起始位置
    move.oButtonRight.style.transform = "rotate(" + move.value4 + "deg)";
}
var time = new Time();
time.doHtml();