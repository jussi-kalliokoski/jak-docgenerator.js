var dom = require('./utils/dom')
var createDOM = require('./create-dom')
var jsdom = require('jsdom')

function onloaded (interfaces, callback, err, window) {
	if (err) return callback(err)

	dom.document = window.document

	interfaces.forEach(function (ifc) {
		createDOM(ifc)

		dom.document.body.appendChild(ifc.dom)
	})

	dom.document = null

	callback(null, window)
}

function generate (interfaces, templateFile, callback) {
	jsdom.env({
		html: templateFile,
		done: onloaded.bind(null, interfaces, callback)
	})
}

module.exports = generate
