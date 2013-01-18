#!/usr/bin/env node

var generate = require('../lib')

process.stdin.on('data', function (data) {
	data = JSON.parse(String(data))

	generate(data, process.argv[2], function (err, window) {
		process.stdout.write(
			window.document.doctype +
			window.document.innerHTML
		)
	})
})

process.stdin.resume()
