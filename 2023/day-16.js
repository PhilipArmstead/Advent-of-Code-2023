// Day 16
// Visit the input page https://adventofcode.com/2023/day/16/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n')

	const directions = [
		[0, -1], // up
		[0, 1], // down
		[-1, 0], // left
		[1, 0], // right
	]

	const solveMaze = (startX, startY, directionIndex) => {
		const visited = new Map()
		const positions = [[startX, startY, directionIndex]]

		while (positions.length) {
			const [x, y, d] = positions.shift()
			const [dX, dY] = directions[d]
			const tX = x + dX
			const tY = y + dY
			const seen = visited.get(`${tX},${tY}`) || 0
			const directionValue = Math.pow(2, d)

			if (tY >= 0 && tY < input.length && tX >= 0 && tX < input[0].length && !(seen & directionValue)) {
				const cell = input[tY][tX]
				const p = positions.length

				if ((cell === '/' && dX > 0) || (cell === '\\' && dX < 0) || (cell === '|' && dX)) {
					positions.push([tX, tY, 0])
				}
				if ((cell === '/' && dX < 0) || (cell === '\\' && dX > 0) || (cell === '|' && dX)) {
					positions.push([tX, tY, 1])
				}
				if ((cell === '/' && dY > 0) || (cell === '\\' && dY < 0) || (cell === '-' && dY)) {
					positions.push([tX, tY, 2])
				}
				if ((cell === '/' && dY < 0) || (cell === '\\' && dY > 0) || (cell === '-' && dY)) {
					positions.push([tX, tY, 3])
				}

				if (positions.length === p) {
					positions.push([tX, tY, d])
				}

				visited.set(`${tX},${tY}`, seen | directionValue)
			}
		}

		return visited.size
	}

	// Part one
	console.log('Solution to part one:', solveMaze(-1, 0, 3))


	// Part two
	let maximum = 0
	for (let x = 0; x < input[0].length; ++x) {
		for (const [startY, direction] of [[-1, 1], [input.length, 0]]) {
			const steps = solveMaze(x, startY, direction)
			if (steps > maximum) {
				maximum = steps
			}
		}
	}
	for (let y = 0; y < input.length; ++y) {
		for (const [startX, direction] of [[-1, 3], [input[0].length, 2]]) {
			const steps = solveMaze(startX, y, direction)
			if (steps > maximum) {
				maximum = steps
			}
		}
	}
	console.log('Solution to part two:', maximum)
}
