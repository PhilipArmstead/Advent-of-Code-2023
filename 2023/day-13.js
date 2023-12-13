// Day 13
// Visit the input page https://adventofcode.com/2023/day/13/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n\n')
		.map(grid => grid.split('\n'))

	const getHorizontalLineOfSymmetry = (grid) => {
		const values = []
		let matches = 0
		let match = 0
		for (let y = 0; y < grid.length; ++y) {
			let value = 0
			for (let x = 0; x < grid[y].length; ++x) {
				if (grid[y][x] === '#') {
					value += Math.pow(2, x)
				}
			}

			if (y) {
				if (value === values[y - 1 - matches * 2]) {
					++matches
					match = match || y
				} else {
					matches = 0
					match = 0
				}

				if (value === values[y - 1 - matches * 2]) {
					++matches
					match = match || y
				}
			}

			if (matches && matches > values.length / 2) {
				return match
			}

			values.push(value)
		}

		return match
	}

	const getVerticalLineOfSymmetry = (grid) => {
			const values = []
			let matches = 0
			let match = 0

			for (let x = 0; x < grid[0].length; ++x) {
				let value = 0
				for (let y = 0; y < grid.length; ++y) {
					if (grid[y][x] === '#') {
						value += Math.pow(2, y)
					}
				}
				if (x) {
					if (value === values[x - 1 - matches * 2]) {
						++matches
						match = match || x
					} else {
						matches = 0
						match = 0
					}

					if (value === values[x - 1 - matches * 2]) {
						++matches
						match = match || x
					}
				}

				if (matches && matches > values.length / 2) {
					return match
				}

				values.push(value)
			}

		return match
	}

	// Part one
	let sumPartOne = 0
	for (const grid of input) {
		sumPartOne += getHorizontalLineOfSymmetry(grid) * 100
		sumPartOne += getVerticalLineOfSymmetry(grid)
	}

	console.log('Solution to part one:', sumPartOne)
	// 27654 < answer < 28064

	// Part two
	// console.log('Solution to part two:', sumPartTwo)
}
