require.config({
	baseUrl: 'js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'Vue': 'vue/vue.min'
	}
});

require([ 'mui', 'app', 'Vue'], function( mui, app, Vue) {
	mui.init();

	var vm = new Vue({
		el: '.mui-scroll',
		data: {
			items: []
		},
		methods:{
			openView: function(item) {
				var userid = item.id;
				var url = 'view/txl/txlxq.html';
				mui.openWindow({
					url: url,
					id: url,
					extras: {
						userid: userid,
					}
				});
			},
			hideKeyboard: function() {
				document.activeElement.blur();//隐藏软键盘 
			}
		}
	});

	function getMainList() {
		var user = app.getUserInfo();
		var str = document.getElementById("searchText").value;
		var param = mui.param({
			userid: user.ID,
			unitid:user.UnitID,
			name:str
		});
		var url = app.webApi + 'api/phone/GetMainList?' + param;
		console.log(url);
		mui.ajax({
			url: url,
			success: function(data) {
				vm.items=data[1].children;
			},
			error: function(x, t, e) {
				console.log(x);
			},
			complete: function() {
			}
		});
	}

	mui.plusReady(function() {
		getMainList();
		
		//监听查询.
		window.addEventListener('search', function(e) {
			var strText = document.getElementById("searchText").value;
			getMainList();
			document.activeElement.blur();//隐藏软键盘 
		});

		window.addEventListener('back', function() {
			var strText = document.getElementById("searchText").value;
			getMainList();
			document.activeElement.blur();//隐藏软键盘 
		});
	});
});