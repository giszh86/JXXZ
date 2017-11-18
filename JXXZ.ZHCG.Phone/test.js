require.config({
	baseUrl: 'js',
	paths: {
		'mui': 'mui.min',
		'app': 'app',
		'dataGet': 'DataGet',
		'Vue': 'vue/vue.min',
		"pic": 'mui.picker',
		"pop": "mui.poppicker",
	}
});

require(['mui', 'app', 'dataGet', 'Vue', 'pic', 'pop'], function(mui, app, dataGet, Vue, pic, pop) {

	function AppendText(str) {
		var dom = document.getElementById("test");
		var p = document.createElement("p");
		p.innerText = str;
		dom.appendChild(p);
	}

	/**
	 * 解析某个函数定义的参数名称
	 * @param {Function} fun
	 */
	function GetProperty(fun) {
		var strSource = fun.toString();
		var str = strSource;
		str = str.replace(/\s/g, "");
		var st = str.match(/\([^)]*\)/)[0];
		var arr = st.match(/[^(,)]+/g);
		var rst = [];
		if(arr == null) return rst;
		for(var i = 0; i < arr.length; i++) {
			var str = arr[i];
			var obj = {
				name: str,
				value: ''
			}
			var tempValue = getValueByName(strSource, obj.name);
			if(tempValue) obj.value = tempValue;
			if(obj.name == 'callback') {
				obj.value = 'function fn(data){alert(JSON.stringify(data)}';
			}
			rst.push(obj);
		}
		return rst;

	}

	function getValueByName(funStr, name) {
		var exp = new RegExp(name + '=\\S*');
		var mat = funStr.match(exp);
		if(mat && mat.length > 0) {
			var temp = mat[0].split('=');
			return temp[1];
		}
		return null;
	}

	function fn(data) {
		alert(JSON.stringify(data));
	}

	var vm = new Vue({
		el: '.mui-content',
		data: {
			items: []
		},
		methods: {
			run: function(event) {
				var self = event.currentTarget;
				var index = self.dataset.index;
				var item = this.items[index];
				var fun = dataGet[item.name]; //获取方法.
				var pros = [];
				for(var i = 0; i < item.data.length; i++) {
					var pro = item.data[i];
					if(pro.value == '') pro.value = undefined;
					if(pro.name == 'callback') {
						pros.push(fn);
					} else {
						pros.push(pro.value);
					}

				}
				fun.apply(null, pros);
			}

		}
	});

	for(var pro in dataGet) {
		var fun = dataGet[pro];
		var arr = GetProperty(fun);
		var obj = {
			name: pro,
			data: arr
		};
		if(obj.name == 'callback') {
			obj.value = 'function fn(data){alert(JSON.stringify(data)}';
		}
		vm.items.push(obj);
	}

});