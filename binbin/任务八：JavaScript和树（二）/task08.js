/* 3个全局变量，nodes用来顺序存储遍历的树结点，timer存储setInterval的返回值,
 * colored存储要查找的结点的索引
 */
var nodes = []
var timer = null
var colored = 0

// 前序遍历
function DLR(node) {
	if (node !== null) {	
		nodes.push(node)
		var children = node.children
		for (var i = 0; i < children.length; i++) {
			DLR(children[i])
		}
	}
} 

// 改变正在遍历的结点的颜色
function highlight(flag) {
	var i = 0
	timer = setInterval(function () {
		if (i <= nodes.length - 1) {
            if (i > 0) {
                nodes[i - 1].style.backgroundColor = '#fff'
            }
            nodes[i].style.backgroundColor = '#b5d6ec'
        } else {
            clearInterval(timer);
            if (flag ===1) {
           		nodes[nodes.length - 1].style.backgroundColor = '#fff'
       		}
        }
		i++;
	},100)
}

function search(str,root) {
	DLR(root)
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].childNodes[0].nodeValue.indexOf(str) !== -1) {
			colored = i
			nodes.splice(i + 1,nodes.length - (i + 1))
			highlight()			
			break
		}
	}
 }

function init () {
	var root = document.getElementsByClassName('root')[0]
	var btn = document.getElementsByTagName('button')  
	btn[0].onclick = function () { 
		DLR(root)
		// flag让highlight区分调用它的是遍历还是查找，以作出不同的表现
		var flag = 1
		highlight(flag)
		}
	btn[1].onclick = function () {  
		var str = document.getElementById('search').value
		if (nodes[colored] != undefined) {
			nodes[colored].style.backgroundColor = '#fff'
		}
		nodes = []
		temp = search(str,root)
		}
}

init()