// Day 3
// Visit the input page https://adventofcode.com/2023/day/3/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n')

	const isNumeric = char => char >= '0' && char <= '9'
	const isSymbol = char => char !== '.' && (char < '0' || char > '9')
	const readPerpendicularNumbersAtPosition = (line, position) =>
		isNumeric(line[position])
			? [readNumberAtPosition(line, position)]
			: [readNumberAtPosition(line, position + 1), readNumberAtPosition(line, position - 1)]

	const readNumberAtPosition = (line, position) => {
		if (isNumeric(line[position])) {
			let start = position
			let end = position
			while (isNumeric(line[start - 1])) --start
			while (isNumeric(line[end + 1])) ++end
			return parseInt(line.substring(start, end + 1))
		}

		return 0
	}

	let valuePartOne = 0
	let valuePartTwo = 0

	for (let y = 0; y < input.length; ++y) {
		const line = input[y]
		for (let x = 0; x < line.length; ++x) {
			const char = line[x]
			if (isSymbol(char)) {
				const numbers = [
					readNumberAtPosition(line, x + 1),
					readNumberAtPosition(line, x - 1),
					...readPerpendicularNumbersAtPosition(input[y - 1], x),
					...readPerpendicularNumbersAtPosition(input[y + 1], x),
				].filter(n => n)

				// Part one
				for (const number of numbers) {
					valuePartOne += number
				}

				// Part two
				if (numbers.length === 2) {
					valuePartTwo += numbers[0] * numbers[1]
				}
			}
		}
	}

	console.log('Solution to part one:', valuePartOne)
	console.log('Solution to part two:', valuePartTwo)
}
