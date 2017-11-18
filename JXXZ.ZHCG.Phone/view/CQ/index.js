require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
	}
});

require(['imm', 'mui','app'], function(_, mui, app) {

	mui.init({});

	mui.plusReady(function() {
		document.getElementById("lingdaodubanshouyebtn").addEventListener('tap',function(){
			openPage("lingdaodubanindex.html");
		})
		document.getElementById("weidubanliebiaobtn").addEventListener('tap',function(){
			openPage("weidubanlist.html");
		})
		document.getElementById("zijitarendubanliebiaobtn").addEventListener('tap',function(){
			openPage("lingdaodubanlist.html");
		})
		document.getElementById("adddubanbtn").addEventListener('tap',function(){
			openPage("addduban.html");
		})
		document.getElementById("zhifaanjiantongjifenxibtn").addEventListener('tap',function(){
			openPage("zhifaanjiantongjifenxi.html");
		})
		document.getElementById("shiminanjiantongjifenxibtn").addEventListener('tap',function(){
			openPage("shiminanjiantongjifenxi.html");
		})
	});
	
	function openPage(pageurl){
		mui.openWindow({
			url:pageurl,
			id:pageurl,
			extras:{			
			}
		})		
	}
})