// Day 24
// Visit the input page https://adventofcode.com/2023/day/24/input
// Paste the following code in-> your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n').map(line => {
		const [p, v] = line.split('@')
		return [p.split(',').map(i => Number(i.trim())), v.split(',').map(i => Number(i.trim()))]
	})

	const testIntersection = (i, j, min, max) => {
		const [p1, v1] = input[i]
		const [p2, v2] = input[j]
		const m1 = v1[1] / v1[0]
		const m2 = v2[1] / v2[0]
		const x = (m1 * p1[0] - m2 * p2[0] + p2[1] - p1[1]) / (m1 - m2)
		const y = m1 * (x - p1[0]) + p1[1]

		const tA = (x - p1[0]) / v1[0]
		const tB = (x - p2[0]) / v2[0]

		const inFuture = tA > 0 && tB > 0
		const inArea = x >= min && x <= max && y >= min && y <= max

		return inArea && inFuture
	}

	// Part one
	let sumPartOne = 0
	let start = 1
	for (let i = 0; i < input.length - 1; ++i) {
		for (let j = start; j < input.length; ++j) {
			sumPartOne += testIntersection(i, j, 200000000000000, 400000000000000)
		}
		++start
	}
	console.log('Solution to part one:', sumPartOne)
}
