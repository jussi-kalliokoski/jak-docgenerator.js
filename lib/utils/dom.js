function extend (obj) {
	var i, k

	for (i=1; i<arguments.length; i++) {
		if (!arguments[i]) continue

		for (k in arguments[i]) {
			if (!arguments[i].hasOwnProperty(k)) continue

			obj[k] = arguments[i][k]
		}
	}

	return obj
}

var dom = {
	document: null,

	elem: function (type, options) {
		if (typeof type !== 'string') {
			options = type
			type = 'div'
		}

		var children

		if (!options) options = {}

		if (options.children) {
			children = options.children
			delete options.children
		}

		var el = extend(dom.document.createElement(type), options)

		if (children) {
			children.forEach(function (c) {
				el.appendChild(c)
			})
		}

		return el
	},

	text: function (str) {
		return dom.document.createTextNode(str)
	}
}

module.exports = dom
