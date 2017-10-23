// 两个全局变量，nodes用来顺序存储遍历的树结点，timer存储setInterval的返回值
var nodes = []
var timer = null	

// 前序遍历
function DLR(node) {
	if (node !== null) {	
		nodes.push(node)
		DLR(node.firstElementChild)
		DLR(node.lastElementChild)
	}
} 

// 中序遍历
function LDR(node) {
	if (node !== null) {		
		LDR(node.firstElementChild)
		nodes.push(node)
		LDR(node.lastElementChild)
	}
}

// 后序遍历
function LRD(node) {
	if (node !== null) {		
		LRD(node.firstElementChild)
		LRD(node.lastElementChild)
		nodes.push(node)
	}
} 

// 改变正在遍历的结点的颜色
function highlight() {
	var i = 0
	timer = setInterval(function () {
		if (i <= nodes.length - 1) {
            if (i > 0) {
                nodes[i - 1].style.backgroundColor = '#fff'
            }

            nodes[i].style.backgroundColor = '#33e'
        } else {
            clearInterval(timer);
            nodes[i - 1].style.backgroundColor = '#fff'
            // 遍历完后，清空数组
            nodes = []
        }
		i++;

	},300)
}

function init () {
	var root = document.getElementsByClassName("root")[0]
	var btn = document.getElementsByTagName("button")  
	btn[0].onclick = function () { 
		DLR(root)
		highlight()
		}
	btn[1].onclick = function () {  
		LDR(root)
		highlight()
		}
	btn[2].onclick = function () {
		LRD(root)
		highlight()
		}
}

init()