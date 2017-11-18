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
//			console.log(height);
			var doms = document.querySelectorAll('.mui-control-content');
			for(var i = 0; i < doms.length; i++) {
				var dom = doms[i];
				dom.style.minHeight = (height - 95) + 'px';
			}

		});

	})();
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var user = app.getUserInfo();
		var _wfsid = self.item.id;
		var _wfdid = self.item.wfdid;
		var nextwfdid='';
		var processingMethod=[];
		var dealWithPeople=[];
		var caseid='';

		var repost = new Vue({
			el: '#repost',
			data: {
				date: {
					startDate: '请选择',
					endDate: '请选择',
					newDate:''
				},
				UnitName:'',
				clfs:'提交下一环节',
				isEnd:false
			},
			methods: {
				chooseDate: function(event) {
//					console.log(event)
					var that = this;
					var self = event.currentTarget;
					var str = self.dataset.name;
					var date = that.date;
					var cDate = new Date(date[str]);
					plus.nativeUI.pickDate(function(event) {
//						console.log(event)
						var sDate = event.date;
						that.$set(that.date, str, sDate.Format('yyyy-MM-dd'));
					}, function(event) {}, {
						title: '请选择日期',
						date: cDate
					});
				},
				getDealWithPeople:function(){
					change(true);
				},
				changeDealWithPeople:function(str){
					repost.clfs=str;
					change(false);
				}
			},
			computed: {
//				useDate: function() {
//					var obj = this.date;
//					if(obj.startDate == '请选择' || obj.endDate == '请选择')
//						return 0;
//					else {
//						var sDate = new Date(obj.startDate);
//						var eDate = new Date(obj.endDate);
//						var j = sDate.dateDiff('d', eDate);
//						return j;
//
//					}
//				}
			}
		});
		
		//获取处理人
		function getWithPeople(data){
			dataGet.choosePick(data, {
				text: ['#UnitName'],
				value: ['#UnitID']
			},function(items) {
				
			});
		}
		
//		wfsaid  流程ID*
//		wfsid   流程ID*
//		dealcontent 处理意见
//		wfcreateuserid 当前流程创建人 * 当前登录人ID
//		stime    开始时间
//		etime    结束时间
		 
		 
		document.getElementById('submit').addEventListener('tap',function () {
		     var data={};
		     data.wfdid=_wfdid;
		     data.nextwfdid=nextwfdid;
		     
		     data.wfsaid=self.item.wfsaid;
		     data.wfsid=self.item.wfsid;
		     data.dealcontent=document.getElementById("dealcontent").value;
		     data.wfcreateuserid=user.ID
		     if(document.getElementById("dealcontent").value==''){
		     	mui.toast("请输入处理意见");
		     	return
		     }
		     if(repost.clfs!='结案'){
		     	data.nextwfuserids=document.getElementById("UnitID").value;
		     	if(data.nextwfuserids==''){
			     	mui.toast("请选择处理人");
			     	return
			     }
		     }
		     
		     if(repost.date.startDate=='请选择' || repost.date.endDate=='请选择'){
		     	mui.toast("请选择时间");
		     	return
		     }
		     if(repost.date.startDate>repost.date.endDate){
		     	mui.toast("开始时间不能大于结束时间");
		     	return
		     }
		     data.stime=repost.date.startDate;
		     data.etime=repost.date.endDate;
		     
		    var url = app.webApi + 'api/CommonCase/CommonCaseHandlerApi';
			console.log(url);
			plus.nativeUI.showWaiting('请稍候...');
			mui.ajax({
				url: url,
				type: 'post',
				data: data,
				success: function(data) {
					alert('提交成功!');
					var f_self = self.opener();
			        mui.fire(f_self, 'back');
					mui.back()
				},
				error: function(x, t, e) {
					console.log(x);
					app.errorMessage(x, t, e);

				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
			
		})
		
		
		//根据用户角色获取用户 下一环节
		function getUsersListRole(content,type){
			var url = app.webApi + 'api/Phone/GetUsersListRole?rolename=' + content+"&caseid=" + caseid;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					dealWithPeople=data;
					document.getElementById("UnitName").value=data[0].text;
					document.getElementById("UnitID").value=data[0].value;
					if(type){
						getWithPeople(dealWithPeople);
					}
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
		function getUsersListUnit(content,type){
			var url = app.webApi + 'api/Phone/GetUsersListUnit?unitname=' + content;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					dealWithPeople=data;
					document.getElementById("UnitName").value=data[0].text;
					document.getElementById("UnitID").value=data[0].value;
					if(type){
						getWithPeople(dealWithPeople);
					}
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		}
		
		
		//获取案件处理的 处理方式选择数据
		getProcessingMethod(_wfdid)
		function getProcessingMethod(wfdid) {
			var url = app.webApi + 'api/CommonCase/ProcessIndex?wfid=2017030613400001&wfdid=' + wfdid;
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					processingMethod=data.nextwfdidname;
					if(data.wfdid=="2017030613500026"){
						repost.clfs='结案';
						repost.isEnd=true;
					}
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
					caseid=data.caseid;
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
					repost.date.startDate=new Date(data.stime).Format('yyyy-MM-dd');
					repost.date.endDate=new Date(data.etime).Format('yyyy-MM-dd');
					repost.date.newDate=new Date().Format('yyyy-MM-dd');
					change(false);
				},
				error: function(x, t, e) {
					console.log(x);
				},
				complete: function() {
					plus.nativeUI.closeWaiting();
				}
			});
		}
		//流转日志数据
		getLogDetails(_wfsid);
		
		//改变处理人
		function change(type){
			if(repost.clfs=='提交下一环节'){
				if(processingMethod[1].nextroleid==''){
					getUsersListUnit(processingMethod[1].nextunitid.replace(",","").replace(",",""),type)
				}else{
					getUsersListRole(processingMethod[1].nextroleid.replace(",","").replace(",",""),type)
				}
				nextwfdid=processingMethod[1].nextid;
			}else if(repost.clfs=='退回'){
				if(processingMethod[0].nextroleid==''){
					getUsersListUnit(processingMethod[0].nextunitid.replace(",","").replace(",",""),type)
				}else{
					getUsersListRole(processingMethod[0].nextroleid.replace(",","").replace(",",""),type)
				}
				nextwfdid=processingMethod[0].nextid
			}
		}

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
		
		//获取相关文书数据
		getRelatedDocuments(self.item.caseid);

		function getRelatedDocuments(caseid) {
			var url = app.webApi + 'api/DucumentTemplet/GetWFSASListAPI?caseid=' + caseid +'&tablename=case_cases';
			console.log(url);
			mui.ajax({
				url: url,
				success: function(data) {
					//使用template.js来写的简易的模板js 模板在html页面当中
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
			var url = that.target.getAttribute('uid')
			if(url==undefined){
				mui.alert('文书下载失败，请重新下载')
				return
			}
			url=app.webApi+"GetPDFFile.ashx?PathClass=LegalCasePath&DocPath="+ url.replace(/\s/g,"%20");
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
//			setTimeout(temp,2000);
//			function temp(){
//				var t = task;
//				
//				debugger;
//				setTimeout(temp,2000);
//			}
			
		});
	})
});