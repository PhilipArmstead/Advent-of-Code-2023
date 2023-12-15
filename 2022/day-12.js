// Day 12
// Visit the input page https://adventofcode.com/2022/day/12/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim()
	let startY
	let startX
	let endY
	let endX
	const grid = input.split('\n').map((line, y) => line.split('').map((c, x) => {
		switch (c) {
			case 'S': startX = x; startY = y; return 0
			case 'E': endX = x; endY = y; return 25
			default: return c.charCodeAt(0) - 97
		}
	}))

	const directions = [
		[0, -1], // up
		[1, 0], // right
		[0, 1], // down
		[-1, 0], // left
	]

	const solveMaze = (startX, startY) => {
		const visited = new Set([`${startX},${startY}`])
		const positions = [[startX, startY, 0]]

		while (positions.length) {
			const [x, y, i] = positions.shift()
			for (const direction of directions) {
				const tX = x + direction[0]
				const tY = y + direction[1]
				if (tY >= 0 && tY < grid.length && tX >= 0 && tX < grid[0].length && grid[tY][tX] - grid[y][x] <= 1 && !visited.has(`${tX},${tY}`)) {
					if (tY === endY && tX === endX) {
						return i + 1
					}

					positions.push([tX, tY, i + 1])
					visited.add(`${tX},${tY}`)
				}
			}
		}
	}

	// Part one
	console.log('Solution to part one:', solveMaze(startX, startY))


	// Part two
	let minimum = Number.MAX_SAFE_INTEGER
	for (let y = 0; y < grid.length; ++y) {
		for (let x = 0; x < grid[y].length; ++x) {
			if (!grid[y][x]) {
				const steps = solveMaze(x, y)
				if (steps < minimum) {
					minimum = steps
				}
			}
		}
	}
	console.log('Solution to part two:', minimum)
}
