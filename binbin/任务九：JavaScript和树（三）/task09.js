/* nodes顺序存储遍历的树结点，timer存储setInterval的返回值,
 * colored存储要查找的结点的索引
 */
var nodes = [],
 	timer = null,
	colored = 0,
	divs = document.getElementsByTagName('div')

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
            clearInterval(timer)
            if (flag ===1) {
           		nodes[nodes.length - 1].style.backgroundColor = '#fff'
       		}
        }
		i++
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

//点击选中元素
function click() {
	for(var i = 0; i < divs.length; i++) {
		divs[i].onclick = function (event) {
			event.stopPropagation() // 阻止事件冒泡到父元素
			for(var j = 0; j < divs.length; j++) {
				divs[j].style.background = "#fff"
			}
			//divs[i++].style.backgroundColor = "#f89484"
			this.style.background = "#f89484"
		}
	}
}

function init () { 	
	var root = document.getElementsByClassName('root')[0],
		btn = document.getElementsByTagName('button')

	click()

	btn[0].onclick = function () { 
		nodes = []
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
	btn[2].onclick = function () {
		var input = document.getElementById('input')
		for (var i = 0; i < divs.length; i++) {
			if (divs[i].style.backgroundColor === 'rgb(248, 148, 132)') {
				var newNode = document.createElement('div'),
					str = document.getElementById('input').value
				newNode.textContent = str
				divs[i].appendChild(newNode)
			}
		}
		// 在这里加入click方法使新插入的结点可以选中变色
		click()
	}
	btn[3].onclick = function () {
		for (var i = 0; i < divs.length; i++) {
			if (divs[i].style.backgroundColor === 'rgb(248, 148, 132)') {
				divs[i].remove()
			}
		}
	}
}

init()