// Day 9
// Visit the input page https://adventofcode.com/2023/day/9/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n').map(line => line.match(/-?\d+/g).map(Number))
	const increments = []

	for (let i = 0; i < input.length; ++i) {
		increments.push([input[i]])
		const incrementSet = new Set()
		while (incrementSet.size !== 1) {
			incrementSet.clear()
			increments[i].push([])
			const currentIncrement = increments[i].at(-2)
			const nextIncrement = increments[i].at(-1)
			for (let j = 0; j < currentIncrement.length - 1; ++j) {
				const increment = currentIncrement[j + 1] - currentIncrement[j]
				nextIncrement.push(increment)
				incrementSet.add(increment)
			}
		}
		for (let j = increments[i].length - 2; j >= 0; --j) {
			increments[i][j].push(increments[i][j].at(-1) + increments[i][j + 1].at(-1))
		}
	}


	// Part one
	const sumPartOne = increments.reduce((acc, cur) => acc + cur[0].at(-1), 0)
	console.log('Solution to part one:', sumPartOne)


	// Part two
	for (let i = 0; i < increments.length; ++i) {
		for (let j = increments[i].length - 2; j >= 0; --j) {
			increments[i][j].unshift(increments[i][j][0] - increments[i][j + 1][0])
		}
	}

	const sumPartTwo = increments.reduce((acc, cur) => acc + cur[0][0], 0)
	console.log('Solution to part two:', sumPartTwo)
}
