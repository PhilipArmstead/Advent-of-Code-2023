// Day 3
// Visit the input page https://adventofcode.com/2022/day/3/input
// Paste the following code in to your browser's dev tools and execute it

{
	const getCharacterValue = character => character.charCodeAt(0) - ((character < 'a' ? 38 : 96))
	const input = document.body.textContent.trim().split('\n')
	const seenCharacters = Array.from({ length: 52 })


	// Part one
	const scorePartOne = input.reduce((acc, line) => {
		seenCharacters.fill(false)
		const mid = line.length / 2

		for (let i = 0; i < line.length; ++i) {
			const value = getCharacterValue(line[i])
			if (i < mid) {
				seenCharacters[value - 1] = true
			} else if (seenCharacters[value - 1]) {
				return acc + value
			}
		}
	}, 0)
	console.log('Solution to part one:', scorePartOne)


	// Part two
	let scorePartTwo = 0
	seenCharacters.fill(0)
	for (let i = 0; i < input.length; ++i) {
		const line = input[i]
		const lineNumber = i % 3

		for (let j = 0; j < line.length; ++j) {
			const value = getCharacterValue(line[j])
			if (lineNumber === 2 && seenCharacters[value - 1] === 2) {
				scorePartTwo += value
				seenCharacters.fill(0)
				break
			} else if (seenCharacters[value - 1] === lineNumber) {
				++seenCharacters[value - 1]
			}
		}
	}
	console.log('Solution to part two:', scorePartTwo)
}
