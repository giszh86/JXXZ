/**
 * 
 * 系统音频报警管理.(新的待办事项)
 */
define(function() {
	var beepArr = {};
	var beepTime = new Date('2000-1-1').getTime();
	//蜂鸣
	function BeepCall(perprotyName, value) {
		var flg = false;
		if(beepArr[perprotyName]) {
			if(beepArr[perprotyName] < value) {
				flg = true;
			}
		} else {
			if(value > 0){
				flg = true;
			}
		}
		beepArr[perprotyName] = value;
		if(flg) deviceBeep();

	}

	function deviceBeep() {
		var times = new Date().getTime();
		//避免同时有待办事件跟案件的时候叫两下.
		if(times - beepTime > 5000) {
			beepTime = times;
			switch(plus.os.name) {
				case "iOS":
					if(plus.device.model.indexOf("iPhone") >= 0) {
						plus.device.beep();
					} else {
						mui.toast("你有新的待办");
					}
					break;
				default:
					plus.device.beep();
					break;
			}
		}

	}

	return {
		call: function(name, value) {
			BeepCall(name, value);
		}
	}

});