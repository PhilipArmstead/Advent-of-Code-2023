// Day 6
// Visit the input page https://adventofcode.com/2023/day/6/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n')

	// Part One
	const times = input[0].match(/\d+/g).map(Number)
	const distances = input[1].match(/\d+/g).map(Number)
	const partOneScore = times.reduce((acc, cur, n) => {
		let count = 0
		for (let i = 1; i < cur; ++i) {
			if (i * (cur - i) > distances[n]) {
				++count
			}
		}
		return acc * count
	}, 1)

	console.log('Solution to part one:', partOneScore)


	// Part two
	const time = Number(input[0].replaceAll(/\D/g, '').match(/\d+/g)[0])
	const distance = Number(input[1].replaceAll(/\D/g, '').match(/\d+/g)[0])
	const getValidBoundary = (time, distance, findUpperBound = false) => {
		let delay = Math.floor(time / 2)
		let jump = Math.floor(delay / 2) * findUpperBound ? -1 : 1
		let lastValue = 0
		let penultimateValue = 0
		let bound = delay

		while (true) {
			if (delay * (time - delay) > distance) {
				if ((!findUpperBound && delay < bound) || (findUpperBound && delay > bound)) {
					bound = delay
				}

				delay -= jump
			} else {
				delay += jump
			}

			if (delay === penultimateValue) {
				return bound
			}

			jump = findUpperBound ? Math.min(Math.floor(jump / 2), -1) : Math.max(Math.ceil(jump / 2), 1)
			penultimateValue = lastValue
			lastValue = delay
		}
	}

	console.log('Solution to part two:', getValidBoundary(time, distance, true) - getValidBoundary(time, distance) + 1)
}
