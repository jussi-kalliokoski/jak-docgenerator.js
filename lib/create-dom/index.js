var dom = require('../utils/dom')
var map = require('../utils/map')

function createDOM_descriptor (name, ifc, elem) {
	if (!ifc[name]) return

	ifc[name].forEach(function (d) {
		var el = dom.elem({
			className: name,
			innerHTML: name + ' '
		})

		el.appendChild(dom.elem('a', {
			href: '#' + d,
			innerHTML: d
		}))

		elem.appendChild(el)
	})
}

function createDOM_descriptors (ifc) {
	var container = dom.elem({
		className: 'descriptors'
	})

	createDOM_descriptor('implements', ifc, container)
	createDOM_descriptor('inherits', ifc, container)

	if (!container.childNodes.length) return

	ifc.dom.appendChild(container)
}

function createDOM_method_argument (arg) {
	var children = [
		dom.elem('span', {
			children: [dom.text(arg.name)]
		}),
		dom.elem('p', {
			children: [
				dom.text(arg.description)
			]
		})
	]

	var type = map.get(arg.descriptors, 'type')

	if (type) children.unshift(dom.elem('span', {
		className: 'type',
		children: [dom.text(type.value)]
	}), dom.text(' '))

	if (arg.optional) children.unshift(dom.elem('span', {
		className: 'optional',
		innerHTML: 'optional'
	}), dom.text(' '))

	var el = dom.elem('li', {
		children: children
	})

	return el
}

function createDOM_method_arguments (method, el) {
	if (!method.arguments || !method.arguments.length) return

	el.appendChild(dom.elem('h4', {
		innerHTML: 'Arguments'
	}))

	var elem = dom.elem('ul', {
		className: 'arguments'
	})

	method.arguments.forEach(function (arg) {
		elem.appendChild(createDOM_method_argument(arg))
	})

	el.appendChild(elem)
}

function createDOM_method (idprefix, method) {
	var el = dom.elem('li')

	var args = method.arguments || []

	var link = dom.elem('a', {
		href: '#' + idprefix + method.name,
		children: [dom.text(method.name)]
	})

	el.appendChild(dom.elem('h3', {
		children: [link, dom.text(' (' + args.map(function (a) {
			return a.name
		}).join(', ') + ')')],
		id: idprefix + method.name
	}))

	el.appendChild(dom.elem('p', {
		children: [dom.text(method.description)]
	}))

	createDOM_method_arguments(method, el)

	return el
}

function createDOM_methods (ifc, methods, id) {
	var container = dom.elem('ul', {
		className: 'methods'
	})

	methods.map(createDOM_method.bind(null, id)).forEach(function (el) {
		container.appendChild(el)
	})

	ifc.dom.appendChild(container)
}

function createDOM_proto_methods (ifc) {
	var methods = ifc.methods
	if (!methods || !methods.length) return

	ifc.dom.appendChild(dom.elem('h2', {
		innerHTML: 'Methods',
		id: ifc.name + '-methods'
	}))

	createDOM_methods(ifc, methods, ifc.name + '#')
}

function createDOM_static_methods (ifc) {
	var methods = ifc.staticMethods
	if (!methods || !methods.length) return

	ifc.dom.appendChild(dom.elem('h2', {
		innerHTML: 'Static Methods',
		id: ifc.name + '-static-methods'
	}))

	createDOM_methods(ifc, methods, ifc.name + '.')
}

function createDOM_proto_events (ifc) {
	var methods = ifc.events
	if (!methods || !methods.length) return

	ifc.dom.appendChild(dom.elem('h2', {
		innerHTML: 'Events',
		id: ifc.name + '-events'
	}))

	createDOM_methods(ifc, methods, ifc.name + '#event-')
}

function createDOM_static_events (ifc) {
	var methods = ifc.staticEvents
	if (!methods || !methods.length) return

	ifc.dom.appendChild(dom.elem('h2', {
		innerHTML: 'Static Events',
		id: ifc.name + '-static-events'
	}))

	createDOM_methods(ifc, methods, ifc.name + '.event-')
}

function createDOM (ifc) {
	ifc.dom = dom.elem('section', {
		className: 'class',
		id: ifc.name
	})

	ifc.dom.appendChild(dom.elem('h1', {
		children: [
			dom.text('class '),
			dom.elem('a', {
				href: '#' + ifc.name,
				innerHTML: ifc.name
			})
		]
	}))

	ifc.dom.appendChild(dom.elem('p', {
		children: [dom.text(ifc.description)]
	}))

	createDOM_method_arguments(ifc, ifc.dom)

	createDOM_descriptors(ifc)
	createDOM_proto_events(ifc)
	createDOM_static_events(ifc)
	createDOM_proto_methods(ifc)
	createDOM_static_methods(ifc)
}

module.exports = createDOM
