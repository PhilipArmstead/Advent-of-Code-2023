// Day 12
// Visit the input page https://adventofcode.com/2023/day/12/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n')
		.map(line => line.split(' '))
		.map(([line, count]) => [line, count.split(',').map(Number)])


	const permutationsCache = new Map()
	const computeLine = (characters, blocks, cIndex = 0, bIndex = 0, currentBlockLength = 0) => {
		const key = `${cIndex},${bIndex},${currentBlockLength}`
		if (permutationsCache.has(key)) {
			return permutationsCache.get(key)
		}

		if (cIndex === characters.length) {
			if (bIndex === blocks.length && !currentBlockLength) {
				return 1
			} else if (bIndex === blocks.length - 1 && blocks[bIndex] === currentBlockLength) {
				return 1
			} else {
				return 0
			}
		}

		let answer = 0
		for (const c of ['.', '#']) {
			if ([c, '?'].includes(characters[cIndex])) {
				if (c === '.') {
					if (!currentBlockLength) {
						answer += computeLine(characters, blocks, cIndex + 1, bIndex, 0)
					} else if (bIndex < blocks.length && blocks[bIndex] === currentBlockLength) {
						answer += computeLine(characters, blocks, cIndex + 1, bIndex + 1, 0)
					}
				} else if (c === '#') {
					answer += computeLine(characters, blocks, cIndex + 1, bIndex, currentBlockLength + 1)
				}
			}
		}
		permutationsCache.set(key, answer)

		return answer
	}

	// Part one
	let sumPartOne = 0
	for (const [line, count] of input) {
		permutationsCache.clear()
		sumPartOne += computeLine(line, count)
	}

	console.log('Solution to part one:', sumPartOne)

	// Part two
	let sumPartTwo = 0
	for (const [line, count] of input) {
		permutationsCache.clear()
		sumPartTwo += computeLine([line, line, line, line, line].join('?'), [count, count, count, count, count].flat())
	}

	console.log('Solution to part two:', sumPartTwo)
}
