function Move() {
    var _this = this; 
    this.oAddLeft = document.getElementById("addleft");
    this.oDecLeft = document.getElementById("decleft");
    this.oAddRight = document.getElementById("addright");
    this.oDecRight = document.getElementById("decright");
    this.oPoint1 = document.getElementById("point1");
    this.oPoint2 = document.getElementById("point2");
    this.oPodu = document.getElementById("podu");
    this.oSpanLeft = this.oPodu.getElementsByTagName("span")[0];
    this.oSudu = document.getElementById("sudu");
    this.oSpanRight = this.oSudu.getElementsByTagName("span")[0];
    this.oButtonLeft = document.getElementById("buttonleft");
    this.oButtonRight = document.getElementById("buttonright");
    this.value1 = -150;//左指针起始位置
    this.value2 = -25;//左按钮起始位置
    this.value3 = 150;//右指针起始位置
    this.value4 = 25;//右按钮起始位置
    this.i = 0;//起始坡度
    this.j = 0;//起始速度
    this.valueButtonLeft = 0;
    this.valuePointLeft = 0;
    this.valuePointRight = 0;
    this.valueButtonRight = 0;//用于保留俩位小数


    this.areaPoduGeWei = document.getElementById("poduGeWei");
    this.areaPoduShiWei = document.getElementById("poduShiWei");
    this.areaSuduGeWei = document.getElementById("suduGeWei");
    this.areaSuduShiWei = document.getElementById("suduShiWei");
    this.iliHeight = 45;
    this.speed = 5;
    this.timerPoduGeWei = null;
    this.timerPoduShiWei = null;
    this.timerSuduShiWei = null;
    this.timerSuduGeWei = null;

    this.delay = 2000;
    this.areaPoduGeWei.scrollTop = 0;
    this.areaPoduShiWei.scrollTop = 0;
    this.areaSuduShiWei.scrollTop = 0;
    this.areaSuduGeWei.scrollTop = 0;

    //左边各位
    this.setUpPoduGeWei = function() {
        this.timerPoduGeWei = setInterval(function() {
            _this.startScrollUpPoduGeWei();
        }, this.speed);
        this.areaPoduGeWei.scrollTop++;
    }
    this.setDownPoduGeWei = function() {
        this.timerPoduGeWei = setInterval(function() {
            _this.startScrollDownPoduGeWei();
        }, this.speed);
        this.areaPoduGeWei.scrollTop--;
    }
    //左边十位
    this.setUpPoduShiWei = function() {
        this.timerPoduShiWei = setInterval(function() {
            _this.startScrollUpPoduShiWei();
        }, this.speed);
        this.areaPoduShiWei.scrollTop++;
    }
    this.setDownPoduShiWei = function() {
        this.timerPoduShiWei = setInterval(function() {
            _this.startScrollDownPoduShiWei();
        }, this.speed);
        this.areaPoduShiWei.scrollTop--;
    }
    

    //右边各位
    this.setUpSuduGeWei = function() {
        this.timerSuduGeWei = setInterval(function() {
            _this.startScrollUpSuduGeWei();
        }, this.speed);
        this.areaSuduGeWei.scrollTop++;
    }
    this.setDownSuduGeWei = function() {
        this.timerSuduGeWei = setInterval(function() {
            _this.startScrollDownSuduGeWei();
        }, this.speed);
        this.areaSuduGeWei.scrollTop--;
    }
    //右边十位
    this.setUpSuduShiWei = function() {
        this.timerSuduShiWei = setInterval(function() {
            _this.startScrollUpSuduShiWei();
        }, this.speed);
        this.areaSuduShiWei.scrollTop++;
    }
    this.setDownSuduShiWei = function() {
        this.timerSuduShiWei = setInterval(function() {
            _this.startScrollDownSuduShiWei();
        }, this.speed);
        this.areaSuduShiWei.scrollTop--;
    }


    this.oAddLeft.onclick = function() {
        if(typeof _this.timerPoduGeWei == 'object' && _this.i < 25) {
            _this.setUpPoduGeWei();
            _this.fnAddLeft();
        }
        
    }
    this.oDecLeft.onclick = function() {
        if(typeof _this.timerPoduGeWei == 'object' && _this.i > 0) {
            _this.setDownPoduGeWei();
            _this.fnDecLeft();
           // console.log(_this.area.scrollTop);
        }
        
    }
    this.oAddRight.onclick = function() {
        if(typeof _this.timerSuduGeWei == 'object' && _this.j < 25 && _this.j > 0) {
            _this.setUpSuduGeWei();
            _this.fnAddRight();
        }
        
    }
    this.oDecRight.onclick = function() {
        if(typeof _this.timerSuduGeWei == 'object' && _this.j > 1) {
            _this.setDownSuduGeWei();
            _this.fnDecRight();
        }
    }  
}

Move.prototype.fnAddLeft = function() {
    if(this.i >= 25) {
        this.value1 = 0;
        this.value2 = 17.5;
        this.i = 25;//超出范围
    }else {
        this.valuePointLeft = this.changeValueAddLeft(this.value1);
        this.value1 = Math.round(this.valuePointLeft * 10) / 10;//取一位小数
        this.oPoint1.style.transform = "rotate(" + this.value1 + "deg)";//指针


        this.valueButtonLeft = this.value2 + 1.74;
        this.value2 = Math.round(this.valueButtonLeft * 10) / 10;
        this.oButtonLeft.style.transform = "rotate(" + this.value2 + "deg)";//按钮

        ++this.i;
        this.oSpanLeft.innerHTML = this.i;//数字
        console.log(this.oSpanLeft.innerHTML);
        if(this.i == 10 || this.i == 20) {

            this.setUpPoduShiWei();
        }

    }
}

Move.prototype.fnDecLeft = function() {
    if(this.i <= 0) {
        this.value1 = -150;
        this.value2 = -25;
        this.i = 0;//超出范围
    }else {
        this.valuePointLeft = this.changeValueDecLeft(this.value1);
        this.value1 = Math.round(this.valuePointLeft * 10) / 10;//取一位小数
        this.oPoint1.style.transform = "rotate(" + this.value1 + "deg)";//指针


        this.valueButtonLeft = this.value2 - 1.74;
        this.value2 = Math.round(this.valueButtonLeft * 10) / 10;//取一位小数
        this.oButtonLeft.style.transform = "rotate(" + this.value2 + "deg)";//按钮

        --this.i;
        this.oSpanLeft.innerHTML = this.i;//数字
        if(this.i == 9 || this.i == 19) {

            this.setDownPoduShiWei();
        }
    }   
}

Move.prototype.fnAddRight = function() {
    if(this.j >= 25) {
        this.value3 = 0;
        this.value4 = -17.5;
        this.j = 25;//超出范围
    }else {
        this.valuePointRight = this.changeValueAddRight(this.value3);
        this.value3 = Math.round(this.valuePointRight * 10) / 10;//取一位小数
        this.oPoint2.style.transform = "rotate(" + this.value3 + "deg)";//指针
        

        this.valueButtonRight = this.value4 - 1.74;
        this.value4 = Math.round(this.valueButtonRight * 10) / 10;
        this.oButtonRight.style.transform = "rotate(" + this.value4 + "deg)";//按钮


        ++this.j;
        if(this.j == 10 || this.j == 20) {

            this.setUpSuduShiWei();
        }
        this.oSpanRight.innerHTML = this.j;//数字
        //console.log(this.j);
        //console.log(this.value4);
    } 
}

Move.prototype.fnDecRight = function() {
    if(this.j <= 0) {
        this.value3 = 150;
        this.value4 = 25;
        this.j = 0;//超出范围
    }else {
        this.valuePointRight = this.changeValueDecRight(this.value3);
        this.value3 = Math.round(this.valuePointRight * 10) / 10;//取一位小数
        this.oPoint2.style.transform = "rotate(" + this.value3 + "deg)";//指针

        this.valueButtonRight = this.value4 + 1.74;
        this.value4 = Math.round(this.valueButtonRight * 10) / 10;
        this.oButtonRight.style.transform = "rotate(" + this.value4 + "deg)";//按钮
            
        --this.j;
        this.oSpanRight.innerHTML = this.j;//数字
        if(this.j == 9 || this.j == 19) {

            this.setDownSuduShiWei();
        }
        //console.log(this.j);
    } 
}

Move.prototype.toDou = function(n) {//0-9显示00-09
    return n < 10 ? '0' + n : '' + n;
}

Move.prototype.changeValueAddLeft = function(n) {
    return n + 6;
}

Move.prototype.changeValueDecLeft = function(n) {
    return n - 6;
}

Move.prototype.changeValueAddRight = function(n) {
    return n - 6;
}

Move.prototype.changeValueDecRight = function(n) {
    return n + 6;
}
//左边各位
Move.prototype.startScrollUpPoduGeWei = function() {
    var _this = this;
    if(this.areaPoduGeWei.scrollTop % this.iliHeight == 0) {
            clearInterval(this.timerPoduGeWei);
            this.timerPoduGeWei = null;
    }else {
        this.areaPoduGeWei.scrollTop++;
    }
 }
 Move.prototype.startScrollDownPoduGeWei = function() {
    var _this = this;
    if(this.areaPoduGeWei.scrollTop % this.iliHeight == 0) {
            clearInterval(this.timerPoduGeWei);
            this.timerPoduGeWei = null;
    }else {
        this.areaPoduGeWei.scrollTop--;
    }
 }
//左边十位

 Move.prototype.startScrollUpPoduShiWei = function() {
    var _this = this;
    if(this.areaPoduShiWei.scrollTop % this.iliHeight == 0) {
            clearInterval(this.timerPoduShiWei);
            this.timerPoduShiWei = null;
    }else {
        this.areaPoduShiWei.scrollTop++;
    }
 }
 Move.prototype.startScrollDownPoduShiWei = function() {
    var _this = this;
    if(this.areaPoduShiWei.scrollTop % this.iliHeight == 0) {
            clearInterval(this.timerPoduShiWei);
            this.timerPoduShiWei = null;
    }else {
        this.areaPoduShiWei.scrollTop--;
    }
 }


 //右边各位
Move.prototype.startScrollUpSuduGeWei = function() {
    var _this = this;
    if(this.areaSuduGeWei.scrollTop % this.iliHeight == 0) {
            clearInterval(this.timerSuduGeWei);
            this.timerSuduGeWei = null;
    }else {
        this.areaSuduGeWei.scrollTop++;
    }
 }
 Move.prototype.startScrollDownSuduGeWei = function() {
    var _this = this;
    if(this.areaSuduGeWei.scrollTop % this.iliHeight == 0) {
            clearInterval(this.timerSuduGeWei);
            this.timerSuduGeWei = null;
    }else {
        this.areaSuduGeWei.scrollTop--;
    }
 }
//右边十位

 Move.prototype.startScrollUpSuduShiWei = function() {
    var _this = this;
    if(this.areaSuduShiWei.scrollTop % this.iliHeight == 0) {
            clearInterval(this.timerSuduShiWei);
            this.timerSuduShiWei = null;
    }else {
        this.areaSuduShiWei.scrollTop++;
    }
 }
 Move.prototype.startScrollDownSuduShiWei = function() {
    var _this = this;
    if(this.areaSuduShiWei.scrollTop % this.iliHeight == 0) {
            clearInterval(this.timerSuduShiWei);
            this.timerSuduShiWei = null;
    }else {
        this.areaSuduShiWei.scrollTop--;
    }
 }
var move = new Move();