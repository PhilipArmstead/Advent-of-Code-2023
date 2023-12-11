// Day 11
// Visit the input page https://adventofcode.com/2023/day/11/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n')

	const galaxies = {
		all: [],
		columns: {},
		rows: {},
		weights: [],
	}

	// Map galaxies
	for (let y = 0; y < input.length; ++y) {
		for (let x = 0; x < input[y].length; ++x) {
			if (input[y][x] === '#') {
				const galaxy = { x, y }
				if (!galaxies.rows[y]) galaxies.rows[y] = []
				if (!galaxies.columns[x]) galaxies.columns[x] = []

				galaxies.all.push(galaxy)
				galaxies.rows[y].push(galaxy)
				galaxies.columns[x].push(galaxy)
			}
		}
	}

	const getDistanceBetweenAllPairs = (expansionRate = 1) => {
		const localGalaxies = structuredClone(galaxies)

		// Expand space
		const loopData = [['rows', 'y', input.length], ['columns', 'x', input[0].length]]
		for (const [property, coordinate, limit] of loopData) {
			let empty = 0
			for (let i = 0; i < limit; ++i) {
				if (!localGalaxies[property][i]) {
					empty += expansionRate
				} else {
					for (const galaxy of localGalaxies[property][i]) {
						galaxy[coordinate] += empty
					}
				}
			}
		}

		// Measure weights
		for (let i = 0; i < localGalaxies.all.length; ++i) {
			localGalaxies.weights.push(Array.from({ length: localGalaxies.all.length }))
			for (let j = 0; j < localGalaxies.all.length; ++j) {
				if (j === i) {
					continue
				}

				localGalaxies.weights[i][j] = Math.abs(localGalaxies.all[j].x - localGalaxies.all[i].x) + Math.abs(localGalaxies.all[j].y - localGalaxies.all[i].y)
			}
		}

		return localGalaxies.weights.reduce((acc, cur) => acc + cur.reduce((i, c) => c !== undefined ? i + c : i, 0), 0) / 2
	}


	// Part one
	console.log('Solution to part one:', getDistanceBetweenAllPairs())

	// Part two
	console.log('Solution to part two:', getDistanceBetweenAllPairs(1e6 - 1))
}
