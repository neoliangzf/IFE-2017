
var container = document.getElementById("queue");


// 获取输入
function getString() {
	var string = document.getElementById("input").value;
	return string;
}
// 创建元素结点，插入字符串
function createNode(str) {
	var newNode = document.createElement("div");
	newNode.textContent = str;
	newNode.onclick = function() {
	container.removeChild(this);
	}
	return newNode;
}

function leftIn(splits, len) {
	for (var i = 0; i < len; i++) {
		var node = createNode(splits[i]);    
		container.insertBefore(node,container.firstChild);
	}
}

function rightIn(splits, len) {
	for (var i = 0; i < len; i++) {
		var node = createNode(splits[i]); 
		container.appendChild(node);
	}
}

function leftOut() {
	alert("你已删除结点：" + container.firstElementChild.textContent);
	container.removeChild(container.firstElementChild);
}

function rightOut() {
	alert("你已删除结点：" + container.lastElementChild.textContent);
	container.removeChild(container.lastElementChild);
}

// 改变符合搜索条件的字符的颜色
function highLight(str) {
	var elements = document.getElementById("queue").getElementsByTagName("div");
	// 将搜索字符串的各个字符分隔，存于数组
	var words = str.split("");
	// 遍历方块元素数组
	for (let i of elements) {
		// 标记要搜索的各字符是否都被包含在元素的字符串中
		var flag = 0;
		// 搜索其它字符前，还原颜色
		var temp = i.textContent;
		i.innerHTML = temp;
		// 遍历判断元素内容是否包含搜索字符串的每一个字符
		for (var j = 0; j < words.length; j++) {
			if (i.textContent.indexOf(words[j]) === -1) {
				flag = 1;
				break;
			}
		}

		if (flag === 0) {
			// 创建正则表达式和替换内容的字符串
			// 需要创建的正则表达式形如 /(x1)|(x1)|(x3)/g	
			// 需要创建的替换字符串形如 <span style = "color: #000">$1</span>
			// <span style = "color: #000">$2</span>
			var s = ""; 
			var replacer = ""; 	
			for (var k = 0; k < words.length; k++) {
				replacer = replacer + '<span style = "color: #000">' + "$" + (k+1) + '</span>'; 
				s = s + "(" + words[k] + ")";
				if (k !== words.length - 1) {
					s = s + "|";
				}
			}	
			var reg = new RegExp(s, "g");
			console.log(i.textContent,i.innerHTML,i.textContent.replace(reg, replacer));
			i.innerHTML = i.innerHTML.replace(reg, replacer);
		}	
	}
}

function init() {
	var btn = document.getElementsByTagName("button");
	var string = document.getElementById("input").value;
	// 创建正则表达式，结合split方法将输入的字符串分割各个元素
	const regex = /\s|\,|\，|\.|\。|\、/;
	var splits = string.split(regex);

	// 添加按钮事件
  	btn[0].onclick = function () {
  		leftIn(splits, splits.length);
  	}
  	btn[1].onclick = function () {
  		rightIn(splits, splits.length);
  	}
  	btn[2].onclick = function () {
		leftOut();
  	}
  	btn[3].onclick = function () {
  		rightOut();
  	}
  	document.getElementById("btnSearch").onclick = function () {
  		var searchString = document.getElementById("search").value;
  		highLight(searchString);
  	}
}

init();
