// Day 12
// Visit the input page https://adventofcode.com/2023/day/12/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n')
		.map(line => line.split(' '))
		.map(([parts, count]) => [parts, count.split(',').map(Number)])

	// Part one
	let matchPartOne = 0
	for (const [line, count] of input) {
		const questionMarks = []

		for (let c= 0; c < line.length; ++c) {
			if (line[c] === '?') {
				questionMarks.push(c)
			}
		}
		let rule = count.reduce((acc, cur) => acc + `#{${cur}}[^#]+?`, '(^|[^#])')
		rule = rule.substring(0, rule.length - 6) + '([^#]|$)'
		const regexp = new RegExp(rule)

		for (let i = 0; i < Math.pow(2, questionMarks.length); ++i) {
			let modifiedLine = line
			for (let j = 0; j < questionMarks.length; ++j) {
				if (Math.pow(2, j) & i) {
					modifiedLine = modifiedLine.substring(0, questionMarks[j]) + '#' + modifiedLine.substring(questionMarks[j] + 1)
				}
			}

			if (modifiedLine.match(/#/g)?.length === count.reduce((acc, cur) => acc + cur, 0)) {
				matchPartOne += !!regexp.exec(modifiedLine)
			}
		}
	}
	console.log('Solution to part one:', matchPartOne)

	// Part two
	console.log('Solution to part two:', 0)
}
