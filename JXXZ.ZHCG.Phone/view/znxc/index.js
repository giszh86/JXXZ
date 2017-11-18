require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'dataGet': 'DataGet',
		'pic': 'mui.picker.all',
		'Vue': 'vue/vue.min',
	}
});

require([ 'mui','app','pic','dataGet'], function( mui, app,pic,dataGet) {
	mui.init({});
	mui.plusReady(function() {
		document.getElementById('pickvalue').addEventListener('tap',function () {
		        var data = [{
		        	text:'沿街店家',
		        	value:1
		        },{
		        	text:'小摊小贩',
		        	value:2
		        },{
		        	text:'行政审批',
		        	value:3
		        }];
		        dataGet.choosePick(data,{
		        	text:'#pick_text',
		        	value:'#pick_value'
		        },function(items){
		        	
		        });
		});
		
		var address = app.getItem('position_addresses');
		if(address) document.getElementById("address").innerText = address;
		
		//查询按钮
		document.getElementById('search').addEventListener('tap',function () {
				var _type=document.getElementById("pick_value").value;
				if(!_type){
					mui.toast('请选择类型！');
					return;
				}
		        url = 'znxc-results.html';
				mui.openWindow({
					url: url,
					id: url,
					extras:{
						radius:app.getRadioValue('distance'),
						type:_type
					}
				});
		})
	});
})