
var container = document.getElementById("queue");

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
	var newNode = document.createElement("div");
	newNode.innerHTML = num;
	newNode.onclick = function() {
		container.removeChild(this);
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

function init() {
	var num;
	var btn = document.getElementsByTagName("button");	
  	btn[0].onclick = function() {
  		num = getNum();
  		if (num === false) {
  			alert("只能输入数字！");
  			return false;
  		};
  		leftIn(num);
  	};
  	btn[1].onclick = function() {
		num = getNum();
		if (num === false) {
  			alert("只能输入数字！");
  			return false;
  		};
  		rightIn(num);
  	};
  	btn[2].onclick = function() {
		leftOut();
  	};
  	btn[3].onclick = function() {
  		rightOut();
  	};
}

init();
