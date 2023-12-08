// Day 1
// Visit the input page https://adventofcode.com/2023/day/1/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n')

	// Part one
	let sumPartOne = 0
	for (const line of input) {
		const digits = line.match(/\d/g)
		sumPartOne += parseInt(`${digits[0]}${digits.at(-1)}`)
	}

	console.log('Solution to part one:', sumPartOne)


	// Part two
	let sumPartTwo = 0
	const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
	const regExp = new RegExp(`(?=(\\d|${words.join('|')}))`, 'g')
	for (const line of input) {
		const digits = Array.from(regExp[Symbol.matchAll](line))

		let builtNumber = ''
		for (const i of [0, -1]) {
			const match = digits.at(i)[1]
			const index = words.indexOf(match)
			builtNumber += index !== -1 ? index + 1 : match
		}

		sumPartTwo += parseInt(builtNumber)
	}

	console.log('Solution to part two:', sumPartTwo)
}
