// Day 13
// Visit the input page https://adventofcode.com/2023/day/13/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`
		.trim()
		.split('\n\n')
		.map(grid => grid.split('\n'));

	const getDifferenceCount = (line1, line2) => {
		let differences = 0;
		for (let i = 0; i < line1.length; ++i) {
			if (line1[i] !== line2[i]) {
				++differences
			}
		}
		return differences;
	};

	const getTransposedGrid = grid => {
		const transposedArray = [];
		for (let x = 0; x < grid[0].length; x++) {
			transposedArray.push('');
			for (let y = 0; y < grid.length; y++) {
				transposedArray[x] += grid[y][x];
			}
		}

		return transposedArray;
	};

	const getLineOfSymmetry = (grid, allowedDifferences = 0) => {
		let matches = 0;
		let match = 0;
		let localAllowedDifferences = allowedDifferences
console.log(grid)
		for (let y = 1; y < grid.length; ++y) {
			let hadMatch = match
			if (getDifferenceCount(grid[y], grid[y - 1 - matches * 2]) === localAllowedDifferences) {
				localAllowedDifferences = Math.max(--localAllowedDifferences, 0)
				++matches;
				match = match || y;
			} else {
				localAllowedDifferences = allowedDifferences
				matches = 0;
				match = 0;

				if (hadMatch && getDifferenceCount(grid[y], grid[y - 1]) === localAllowedDifferences) {
					localAllowedDifferences = Math.max(--localAllowedDifferences, 0)
					++matches;
					match = y;
				}
			}

			if (matches && matches > y / 2) {
				return match;
			}
		}

		return match;
	};

	// Part one
	// const sumGrid1 = (sum, grid) => sum + (getLineOfSymmetry(grid) * 100 || getLineOfSymmetry(getTransposedGrid(grid)));
	// const sumPartOne = input.reduce(sumGrid1, 0);
	// console.log('Solution to part one:', sumPartOne);

	// Part two
	// const sumGrid2 = (sum, grid) => sum + (getLineOfSymmetry(grid, 1) * 100 || getLineOfSymmetry(getTransposedGrid(grid), 1));
	// const sumPartTwo = input.reduce(sumGrid2, 0);
	// console.log('Solution to part two:', sumPartTwo);

	console.log(getLineOfSymmetry(input[0], 1))
	// console.log(getLineOfSymmetry(getTransposedGrid(input[0]), 1))
	// console.log(getLineOfSymmetry(input[1], 1))
	// console.log(getLineOfSymmetry(getTransposedGrid(input[1]), 1))
}
