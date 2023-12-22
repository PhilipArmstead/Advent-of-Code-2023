// Day 21
// Visit the input page https://adventofcode.com/2023/day/21/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim()
	const index = input.indexOf('S')
	const grid = input.split('\n')
	const startY = Math.floor(index / grid.length)
	const startX = (index - startY) % grid[0].length

	const directions = [
		[0, -1], // up
		[1, 0], // right
		[0, 1], // down
		[-1, 0], // left
	]

	const takeSteps = (maxSteps) => {
		const visited = new Set([`${startX},${startY}`])
		const tiles = new Map()
		const positions = [[startX, startY, 1]]

		while (positions.length) {
			const [x, y, steps] = positions.shift()

			const tileCount = tiles.get(steps) || 0
			tiles.set(steps, tileCount + 1)

			for (const direction of directions) {
				const tX = x + direction[0]
				const tY = y + direction[1]
				const tXWrapped = ((tX % grid[0].length) + grid[0].length) % grid[0].length
				const tYWrapped = ((tY % grid.length) + grid.length) % grid.length

				if (
					tYWrapped >= 0 &&
					tYWrapped < grid.length &&
					tXWrapped >= 0 &&
					tXWrapped < grid[0].length &&
					grid[tYWrapped][tXWrapped] !== '#' &&
					steps <= maxSteps &&
					!visited.has(`${tX},${tY}`)
				) {
					positions.push([tX, tY, steps + 1])
					visited.add(`${tX},${tY}`)
				}
			}
		}

		return Array.from(tiles).reduce((acc, [d, a]) => d % 2 !== maxSteps % 2 ? acc + a : acc, 0)
	}

	// Part one
	console.log('Solution to part one:', takeSteps(64))

	// Part two
	const edge = Math.floor(grid[1].length / 2)
	const y = [
		takeSteps(edge),
		takeSteps(edge + grid[1].length),
		takeSteps(edge + grid[1].length + grid[1].length),
	]
	const a = Math.floor((y[2] - (2 * y[1]) + y[0]) / 2)
	const b = y[1] - y[0] - a
	const n = Math.floor((26501365 - edge) / grid[1].length)
	console.log('Solution to part two:', (a * n ** 2) + (b * n) + y[0])
}
