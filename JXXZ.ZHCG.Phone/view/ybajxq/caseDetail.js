require.config({
	baseUrl: '../../js',
	paths: {
		'mui': 'mui',
		'app': 'app',
		'Vue': 'vue/vue.min',
		'imm': 'immersed',
		'template': 'template',
		"pic": 'mui.picker',
		"pop": "mui.poppicker",
		'dataGet': 'DataGet',
		'com': 'common',
	}
});

require(['mui', 'app', 'Vue', 'template', 'pic', 'pop','dataGet','com'], function(mui, app, Vue, template, pic, pop,dataGet,com) {
	mui.init({
		swipeBack: false
	});

	mui('.mui-scroll-wrapper').scroll({
		indicators: true //是否显示滚动条
	});

	document.getElementById('slider').addEventListener('slide', function(e) {
		if(e.detail.slideNumber === 1) {

		} else if(e.detail.slideNumber === 2) {

		}
		var dom = document.querySelector('.mui-slider-group');
	});

	(function() {
		mui.ready(function() {
			var height = window.innerHeight;
			console.log(height);
			var doms = document.querySelectorAll('.mui-control-content');
			for(var i = 0; i < doms.length; i++) {
				var dom = doms[i];
				dom.style.minHeight = (height - 95) + 'px';
			}

		});

	})();
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		console.log(JSON.stringify(self))
		var _wfsid;
		if(self.item.wfsid!=null){
			_wfsid=self.item.wfsid
		}else{
			_wfsid = self.item.id;
		}
//		var _wfsid = self.item.id;
		var _wfdid = self.item.wfdid;
		console.log(self);

		
		//获取处理人
		function getWithPeople(data){
//			console.log(data)
			dataGet.choosePick(data, {
				text: ['#UnitName'],
				value: ['#UnitID']
			},
				function(items) {
					
				}
			)
		}
		
		
		//根据用户角色获取用户 下一环节
		function getUsersListRole(content){
			var url = app.webApi + 'api/Phone/GetUsersListRole?rolename=' + content;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					dealWithPeople=data;
					getWithPeople(dealWithPeople);
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		}
		
		//根据用户类型获取用户 退回
		function getUsersListUnit(content){
			var url = app.webApi + 'api/Phone/GetUsersListUnit?unitname=' + content;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					dealWithPeople=data;
					getWithPeople(dealWithPeople);
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		}
		
		
		
		getProcessingMethod(_wfdid)
		function getProcessingMethod(wfdid) {
			var url = app.webApi + 'api/CommonCase/ProcessIndex?wfid=2017030613400001&wfdid=' + wfdid;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					processingMethod=data.nextwfdidname;
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		}
		
		
		
		getDetail(_wfsid);

		//获得详情
		function getDetail(wfsid) {
			var url = app.webApi + 'api/CommonCase/GetCaseModel?wfsid=' + wfsid;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					app.setFormByData(data);
//					console.log(data)
					//判断当事人是自然人还说法人
					if(data.persontype=='type_dw'){
						document.getElementById("typename").innerText='法人'
						document.getElementById("showHide").style.display="block"
					}else{
						document.getElementById("typename").innerText='自然人'
					}
					//判断一个证书为空的情况下显示另外一个证书   后台说的  以后有需求再改
//					if(data.p_cardtypename==""){
//						document.getElementById("cardtypename").innerText=data.f_cardtypename
//					}else{
//						document.getElementById("cardtypename").innerText=data.p_cardtypename
//					}
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		}
		getLogDetails(_wfsid);

		function getLogDetails(wfsid) {
			var url = app.webApi + 'api/CommonCase/GetCaseOidList?wfsid=' + wfsid;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					//使用template.js来写的简易的模板js 模板在html页面当中
					var html = template('logDetails', {
						list: data
					});
					document.getElementById("page4").innerHTML = html;
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		}
		
		getRelatedDocuments(self.item.caseid);

		function getRelatedDocuments(caseid) {
			var url = app.webApi + 'api/DucumentTemplet/GetWFSASListAPI?caseid=' + caseid +'&tablename=case_cases';
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					//使用template.js来写的简易的模板js 模板在html页面当中
					console.log(data)
					var html = template('relatedDocuments', {
						list: data
					});
					document.getElementById("wenshu").innerHTML = html;
					
				},
				error: function(x, t, e) {
					console.log(x);
					document.getElementById("wenshuDateil").innerText='暂无文书'
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		}
		
		
		document.getElementById("wenshu").addEventListener('tap', function(event) {
			var that=event;
			var url = that.target.getAttribute('alt')
			if(url==undefined){
				mui.alert('文书下载失败，请重新下载')
				return
			}
			url=app.webApi+"GetPDFFile.ashx?PathClass=LegalCasePath&DocPath="+url;
			console.log(url)
			plus.nativeUI.showWaiting('下载中...');
			var task = plus.downloader.createDownload(url, {
				filename: "_downloads/",		//保存路径
				timeout:120,
				retryInterval:1,
				retry:3
			}, function(down, status) {
				if(status == 200) {
					//下载成功
					//打开文件
					plus.runtime.openFile(down.filename, {}, function(err) {
						//失败回调
						alert('文件打开错误!');
					});
					
				} else {
					//其他,下载没成功
					alert('下载失败!');
				}
				plus.nativeUI.closeWaiting();
			});
			task.start();
		});
	})
});