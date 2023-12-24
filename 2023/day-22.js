// Day 22
// Visit the input page https://adventofcode.com/2023/day/22/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent
	.trim()
	.split('\n')
	.map(line => line.split('~').map(segment => segment.split(',').map(Number)))
	.sort((a, b) => a[1][2] - b[1][2])

	const doBlocksOverlap = (b1, b2) => {
		// If one rectangle is on left side of other
		if (b1[0][0] > b2[1][0] || b2[0][0] > b1[1][0]) {
			return false
		}

		// If one rectangle is above other
		if (b1[1][1] < b2[0][1] || b2[1][1] < b1[0][1]) {
			return false
		}

		return true
	}

	const collapseAllBricks = (grid, breakOnFall = false) => {
		for (let i = 0; i < grid.length; ++i) {
			if (grid[i][0][2] === 1) {
				continue
			}

			let newZ = 1
			for (let j = i - 1; j >= 0; --j) {
				if (grid[i][0][2] > grid[j][1][2] && doBlocksOverlap(grid[i], grid[j])) {
					newZ = grid[j][1][2] + 1
					break
				}
			}

			const difference = grid[i][0][2] - newZ
			if (difference) {
				if (breakOnFall) {
					return
				}

				grid[i][0][2] -= difference
				grid[i][1][2] -= difference
				grid.sort((a, b) => a[1][2] - b[1][2])
			}
		}

		return grid
	}
	const bruteForceRemovals = (grid) => {
		let count = 0
		for (let i = 0; i < grid.length; ++i) {
			const g = structuredClone(grid)
			g.splice(i, 1)
			if (collapseAllBricks(g, true)) {
				++count
			}
		}
		return count
	}

	const grid = collapseAllBricks(structuredClone(input))
	const count = bruteForceRemovals(grid)

	// Part one
	console.log('Solution to part one:', count)
}
