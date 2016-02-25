function nowTime() {
    this.oDate = document.getElementById("date");
    this.aSpan = this.oDate.getElementsByTagName("span");
    this.date = new Date();
    this.day = null;
    this.set = function() {
        switch(this.date.getDay()) {
            case 0: this.day = '日';break;
            case 1: this.day = '一';break;
            case 2: this.day = '二';break;
            case 3: this.day = '三';break;
            case 4: this.day = '四';break;
            case 5: this.day = '五';break;
            case 6: this.day = '六';break;
        }
        this.aSpan[0].innerHTML = this.toDou(this.date.getFullYear());
        this.aSpan[1].innerHTML = this.toDou(this.date.getMonth() + 1);
        this.aSpan[2].innerHTML = this.toDou(this.date.getDate());
        this.aSpan[3].innerHTML = this.day;
    }
}

nowTime.prototype.toDou = function(n) {
    return n < 10 ? '0' + n: '' + n;
}
var now = new nowTime();
now.set();