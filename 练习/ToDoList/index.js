$(function () {
	load();
	$("#title").on("keydown", function (event) {
		if (event.keyCode === 13) {
			if ($(this).val() === "") {
				alert("请输入你要的操作")
			} else {
				var local = getDate();
				local.push({ title: $(this).val(), done: false });
				savaDate(local);
				load();
				$(this).val("");
			}
		}
	});
	function getDate() {//获取
		var data = localStorage.getItem("todolist");
		if (data !== null) {
			return JSON.parse(data);
		} else {
			return [];
		}
	}
	function savaDate(data) { //存入
		localStorage.setItem("todolist", JSON.stringify(data));
	}
	function load() {  //渲染
		var data = getDate();
		var todoCount = 0;//正在进行的个数
		var doneCount = 0;//已经完成的个数
		$("ol,ul").empty(); //遍历前清空ol里的元素
		$.each(data, function (i, n) {
			if (n.done) {
				$("ul").prepend("<li><input type='checkbox' checked='checked' class='ipt'><p>" + n.title + "</p><a href='#' id=" + i + ">删除</a></li>");
				doneCount++;
			} else {
				$("ol").prepend("<li><input type='checkbox' class='ipt'><p>" + n.title + "</p><a href='#' id=" + i + ">删除</a></li>");
				todoCount++;
			}
		});
		$("#todocount").text(todoCount);
		$("#donecount").text(doneCount);
	}
	$("ol,ul").on("click", "a", function () {
		var data = getDate();
		var index = $(this).attr("id");
		data.splice(index, 1);
		savaDate(data);
		load();
	})
	$("ol,ul").on("click", ".ipt", function () {
		var data = getDate();
		var index = $(this).siblings("a").attr("id");
		data[index].done = $(this).prop("checked");
		savaDate(data);
		load();
	})
	var ol = document.querySelector('ol');
	var ul = document.querySelector('ul');
	var ulp = ul.querySelector('p');
	var olp = ol.querySelector('p');
	for (i = 0; i < ol.children.length; i++) {
		if (ol.children.length > 0) {
			ol.children[i].children[1].ondblclick = function () {
				modify(this);
			}
		}
		if (ul.children.length > 0) {
			ul.children[i].children[1].ondblclick = function () {
				modify(this);
			}
		}
	};

	function modify(olp) {
		var str = olp.innerHTML;
		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();   //双击禁止选定文字
		olp.innerHTML = '<input type="text"  />';
		var input = olp.children[0];
		input.value = str;
		input.select();
		input.onblur = function () {
			this.parentNode.innerHTML = this.value;
		}
		input.onkeyup = function (e) {
			if (e.keyCode === 13) {
				this.blur();
			}
		}
	}

	/*var todolist=[{
		title:'1234',
		done:false
	},
	{
		title:'dasdsa',
		done:false
	}];
	localStorage.setItem("todo",JSON.stringify(todolist));*/
})