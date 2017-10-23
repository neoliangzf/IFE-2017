
var container = document.getElementById("queue");
var count = 0; //统计元素个数
var items = [];

//获取输入
function getNum() {
	var num = document.getElementById("input").value;
	if (isNaN(num)) {
		return false;
	};
	return num;
}
//创建元素结点，插入数字
function createNode(num) {
	if (count == 60) {
		alert("队列元素不能超过60个");
		return false;
	}
	var newNode = document.createElement("div");

	items[count++] = num; //将队列元素的数值存进数组

	newNode.style.height = num + "px";
	newNode.onclick = function() {
		container.removeChild(this);
		count--;
	}
	return newNode;
}

function leftIn(num) {
	var node = createNode(num);
	    
	container.insertBefore(node,container.firstChild);
}

function rightIn(num) {
	var node = createNode(num);
	
	container.appendChild(node);
}

function leftOut() {
	alert("你已删除结点：" + container.firstElementChild.textContent);
	container.removeChild(container.firstElementChild);
}

function rightOut() {
	container.removeChild(container.lastElementChild);
}

function swap(k) {
	var temp = items[k];
	items[k] = items[k+1];
	items[k+1] = temp;
}

function bubbleSort() {
	var flag = 1;
	var j = 0;
	for (var i = 0; i < items.length - 1; i++) {
		for (var k = 0; k < items.length - j; k++) {
			if (items[k] > items[k+1]) {
				swap(k);
				flag = 0;
			} 
		}
		if (flag == 1) {
			break;
		}
		j++;
	}
}

function init() {
	var num;
	var btn = document.getElementsByTagName("button");	
  	btn[0].onclick = function () {
  		num = getNum();
  		if (num === false) {
  			alert("只能输入数字！");
  			return false;
  		}
  		if (10 > num || num >100) {
  			alert("输入10-100的数字");
  			return false;
  		}
  		leftIn(num);
  	};
  	btn[1].onclick = function () {
		num = getNum();
		if (num === false) {
  			alert("只能输入数字！");
  			return false;
  		}
  		if (10 > num || num >100) {
  			alert("输入10-100的数字");
  			return false;
  		}
  		rightIn(num);
  	}
  	btn[2].onclick = function () {
		leftOut();
  	}
  	btn[3].onclick = function () {
  		rightOut();
  	}
  	btn[4].onclick = function () {
  		bubbleSort();
  			for (var a = 0; a < items.length; a++) {
			console.log(items[a]);
		}
  		var nodes = (document.getElementById("queue")).getElementsByTagName("div");
  		for (var i = 0; i < items.length; i++) {
  			nodes[i].style.height = items[i] + "px";
  		}	
  	}
}

init();
