function Load() {
	this.oLoading = document.getElementById("loading");
	this.timer = null;
	var _this = this;
	this.set = function() {
		this.timer = setTimeout(function() {
			_this.oLoading.style.display = "none";
			clearTimeout(_this.timer);
		}, 2000);
	}
}
var load = new Load();
load.set();