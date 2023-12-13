// Day 13
// Visit the input page https://adventofcode.com/2023/day/13/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent
		.trim()
		.split('\n\n')
		.map(grid => grid.split('\n'))

	const getTransposedGrid = grid => {
		const transposedArray = []
		for (let x = 0; x < grid[0].length; x++) {
			transposedArray.push('')
			for (let y = 0; y < grid.length; y++) {
				transposedArray[x] += grid[y][x]
			}
		}

		return transposedArray
	}

	const getLineOfSymmetry = (grid, allowedDifferences = 0) => {
		for (let y = 0; y < grid.length - 1; ++y) {
			let differences = 0
			for (let y2 = 0; y2 < grid.length; ++y2) {
				const up = y - y2
				const down = y + 1 + y2

				if (up < 0 || down >= grid.length || up >= down) {
					break
				}

				for (let x = 0; x < grid[0].length; ++x) {
					differences += grid[up][x] !== grid[down][x]

					if (differences > allowedDifferences) {
						y2 = grid.length
						x = grid[0].length
					}
				}
			}

			if (differences === allowedDifferences) {
				return y + 1
			}
		}
	}

	// Part one
	const sumGrid1 = (sum, grid) => sum + (getLineOfSymmetry(grid) * 100 || getLineOfSymmetry(getTransposedGrid(grid)))
	const sumPartOne = input.reduce(sumGrid1, 0)
	console.log('Solution to part one:', sumPartOne)

	// Part two
	const sumGrid2 = (sum, grid) => sum + (getLineOfSymmetry(grid, 1) * 100 || getLineOfSymmetry(getTransposedGrid(grid), 1))
	const sumPartTwo = input.reduce(sumGrid2, 0)
	console.log('Solution to part two:', sumPartTwo)
}
