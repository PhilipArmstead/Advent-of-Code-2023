// Day 2
// Visit the input page https://adventofcode.com/2023/day/2/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n')

	const limits = [
		[/(\d+) (red)/g, 12],
		[/(\d+) (green)/g, 13],
		[/(\d+) (blue)/g, 14],
	]

	// Part one
	let valuePartOne = 0
	input.forEach(line => {
		if (limits.every(([matchRule, limit]) => Array.from(line.matchAll(matchRule))
			.every(match => parseInt(match[1]) <= limit))) {
			valuePartOne += parseInt(line.match(/Game (\d+)/)[1])
		}
	})

	console.log('Solution to part one:', valuePartOne)


	// Part two
	let valuePartTwo = 0
	input.forEach(line => {
		const minimums = {}
		limits.forEach(([matchRule]) => {
			Array.from(line.matchAll(matchRule)).forEach(match => {
				const count = parseInt(match[1])
				const colour = match[2]
				if (!minimums[colour] || count > minimums[colour]) {
					minimums[colour] = count
				}
			})
		})

		valuePartTwo += Object.values(minimums).reduce((acc, cur) => acc * cur, 1)
	})

	console.log('Solution to part two:', valuePartTwo)
}
