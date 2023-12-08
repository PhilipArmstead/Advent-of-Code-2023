// Day 4
// Visit the input page https://adventofcode.com/2023/day/4/input
// Paste the following code in to your browser's dev tools and execute it
// I'm not very happy with part 2: it takes ~5 seconds to complete, which is indicative of a bad approach

{
	const input = document.body.textContent.trim()
		.split('\n')
		.map(line => line.substring(line.indexOf(':') + 2).split('|').map(half => half.match(/\d+/g).map(Number)))


	// Part one
	let sumPartOne = 0
	input.forEach(line => {
		sumPartOne += line[0].reduce((acc, cur) => line[1].includes(cur) ? (!acc ? 1 : acc * 2) : acc, 0)
	})

	console.log('Solution to part one:', sumPartOne)


	// Part two
	let sumPartTwo = 0
	const cardsToCheck = Array.from(input, (_, i) => i)
	const cardValues = {}
	while (cardsToCheck.length) {
		const card = cardsToCheck.pop()
		const line = input[card]
		const score = cardValues[card] !== undefined
			? cardValues[card]
			: line[0].reduce((acc, cur) => acc + line[1].includes(cur), 0)

		if (score) {
			cardsToCheck.push(...Array.from({ length: score }, (_, i) => card + i + 1))
		}

		++sumPartTwo
	}

	console.log('Solution to part two:', sumPartTwo)
}
