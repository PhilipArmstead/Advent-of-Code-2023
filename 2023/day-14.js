// Day 14
// Visit the input page https://adventofcode.com/2023/day/14/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n')

	const getLoad = (input) => {
		let load = 0
		for (let y = 0; y < input.length; ++y) {
			for (let x = 0; x < input[0].length; ++x) {
				if (input[y][x] === 'O') {
					load += input.length - y
				}
			}
		}

		return load
	}

	const getTransposedGrid = grid => {
		const transposedArray = []
		for (let x = 0; x < grid[0].length; x++) {
			transposedArray.push('')
			for (let y = grid.length - 1; y >= 0; y--) {
				transposedArray[x] += grid[y][x]
			}
		}
		return transposedArray
	}

	const tiltUp = (input) => {
		for (let x = 0; x < input[0].length; ++x) {
			let empty = 0
			for (let y = 0; y < input.length; ++y) {
				switch (input[y][x]) {
					case 'O':
						input[y] = input[y].substring(0, x) + '.' + input[y].substring(x + 1)
						input[empty] = input[empty].substring(0, x) + 'O' + input[empty].substring(x + 1)
						++empty
						break
					case '#': empty = y + 1
				}
			}
		}
	}

	const cacheCount = new Map()
	const cache = new Map()
	const getLoadOfNthFullCycle = (grid, targetCycle) => {
		let i = 0
		let uniquePermutations = 0
		let nonUniquePermutations = 0

		while (true) {
			for (let j = 0; j < 4; ++j) {
				tiltUp(grid)
				grid = getTransposedGrid(grid)
			}

			const key = grid.join('\n')
			let count = cacheCount.get(key) || 0
			cacheCount.set(key, ++count)

			uniquePermutations += count === 1
			nonUniquePermutations += count === 2

			if (count === 3) {
				break
			} else if (count === 2) {
				cache.set(i + 1, getLoad(grid))
			}

			++i
		}

		return cache.get(i + (targetCycle - uniquePermutations) % nonUniquePermutations - nonUniquePermutations)
	}

	// Part one
	const tiltedGrid = structuredClone(input)
	tiltUp(tiltedGrid)
	console.log('Solution to part one:', getLoad(tiltedGrid))

	// Part two
	let rotatedGrid = structuredClone(input)
	console.log('Solution to part two:', getLoadOfNthFullCycle(rotatedGrid, 1e9))
}