require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'dataGet': 'DataGet',
		'pic': 'mui.picker.all',
		'Vue': 'vue/vue.min',
		'img': 'getBase64Image'
	}
});

require(['mui', 'app', 'Vue'], function(mui, app, Vue) {
	mui.init({

	});
	
	var nowType = 0;

	var vm = new Vue({
		el: '.mui-content',
		data: {
			items: [],
			Total: 0,
			Complete: 0,
			Kept: 0
		},
		methods: {
			addValue:function(){
				var that = this;
				var flg = false;
				var total = that.Total;
				for (var i = 0; i <that.items.length; i++) {
					var temp = that.items[i];
					var num = temp.nowNum + temp.stepNum;
					if(num > temp.count){
						num = temp.count;
					} else{
						flg = true;
					}
					temp.nowNum = num;
					if(total > 0){
						temp.zb = (temp.nowNum * 100 / total).toFixed(2) + '%'
					}else{
						temp.zb = 0;
					}
				}
				if(flg) window.setTimeout(function(){
					that.addValue();
				},30);
			}

		},
		computed: {
			completeNumber: function() {
				if(this.Total == 0) {
					return '0%';
				} else {
					return(this.Complete * 100 / this.Total).toFixed(2) + '%'
				}
			},
			keptNumber: function() {
				if(this.Total == 0) {
					return '0%';
				} else {
					return(this.Kept * 100 / this.Total).toFixed(2) + '%'
				}
			}
		}
	});

	

	function getStatistics(type) {
		if(type == nowType) return;
		
		var list=document.getElementsByClassName('bluebtn');
		for (var i=0;i<list.length;i++){
			if(i==type-1){
				list[i].style.background='#005A8D';
			}else{
				list[i].style.background='grey';
			}
		}
			
		var url = app.webApi + 'api/phone/GetStatisticsBySMSJ?type=' + type;
		console.log(url);
		plus.nativeUI.showWaiting();
		mui.ajax({
			url: url,
			success: function(data) {
				vm.items.splice(0);
				for(var i = 0; i < data.Items.length; i++) {
					var temp = data.Items[i];
					temp.nowNum = 0;
					temp.stepNum =parseInt(( temp.count / 15).toFixed(0));
					if(temp.stepNum == 0) temp.stepNum = 1;
					if(data.Total > 0){
						temp.zb = (temp.nowNum * 100 / data.Total).toFixed(2) + '%'
					}else{
						temp.zb = 0;
					}
					
					vm.items.push(temp);
				}
				vm.Total = data.Total;
				vm.Complete = data.Complete;
				vm.Kept = data.Kept;
				vm.addValue();
				nowType = type;
			},
			error: function(x, t, e) {
				console.log(x);
			},
			complete: function() {
				plus.nativeUI.closeWaiting();
			}
		});
	}

	mui.plusReady(function() {
		
		getStatistics(1);
		
		mui('.nyrstyle').on('tap', '.bluebtn', function() {
			var type = this.dataset.type;
			
			getStatistics(type);
		});
	});
});