// Day 15
// Visit the input page https://adventofcode.com/2023/day/15/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split(',')

	const hash = (text) => {
		let value = 0

		for (let i = 0; i < text.length; ++i) {
			value += text.charCodeAt(i)
			value *= 17
			value %= 256
		}

		return value
	}

	// Part one
	const sumPartOne = input.reduce((acc, cur) => acc + hash(cur), 0)
	console.log('Solution to part one:', sumPartOne)


	// Part two
	const list = Array.from({ length: input.length }).map(() => [])
	input.forEach((line) => {
		const operationIndex = Math.max(line.indexOf('-'), line.indexOf('='))
		const label = line.substring(0, operationIndex)
		const value = hash(label)

		switch (line[operationIndex]) {
			case '=': {
				const i = list[value].findIndex(l => l.startsWith(label))
				if (i !== -1) {
					list[value][i] = line.replace('=', ' ')
				} else {
					list[value].push(line.replace('=', ' '))
				}
				break
			}
			case '-': {
				const i = list[value].findIndex(l => l.startsWith(label))
				if (i !== -1) {
					list[value].splice(i, 1)
				}
			}
		}
	})
	const sumPartTwo = list.reduce((acc, box, i) =>
		acc + box.reduce((sum, label, j) => sum + (i + 1) * (j + 1) * Number(label.substring(label.indexOf(' '))), 0)
	, 0)
	console.log('Solution to part two:', sumPartTwo)
}
