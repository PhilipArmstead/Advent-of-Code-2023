// Day 8
// Visit the input page https://adventofcode.com/2022/day/8/input
// Paste the following code in to your browser's dev tools and execute it

{
	const checkHighest = (input, x, y, visibleTrees, highest) => {
		if (input[y][x] > highest) {
			visibleTrees[`${x},${y}`] = (visibleTrees[`${x},${y}`] || 0) + 1
		}
		return Math.max(highest, input[y][x])
	}

	const input = document.body.textContent.trim().split('\n')
	const visibleTrees = {}

	for (let y = 1; y < input.length - 1; ++y) {
		let highest = input[y][0]
		for (let x = 1; x < input[0].length - 1; ++x) {
			highest = checkHighest(input, x, y, visibleTrees, highest)
		}
		highest = input[y][input[0].length - 1]
		for (let x = input[0].length - 2; x > 0; --x) {
			highest = checkHighest(input, x, y, visibleTrees, highest)
		}
	}
	for (let x = 1; x < input[0].length - 1; ++x) {
		let highest = input[0][x]
		for (let y = 1; y < input.length - 1; ++y) {
			highest = checkHighest(input, x, y, visibleTrees, highest)
		}
		highest = input[input.length - 1][x]
		for (let y = input.length - 2; y > 0; --y) {
			highest = checkHighest(input, x, y, visibleTrees, highest)
		}
	}

	// Part one
	console.log('Solution to part one:', input.length * 2 + input[0].length * 2 - 4 + Object.keys(visibleTrees).length)

	// Part two
	const getScenicScore = (x, y) => {
		const value = input[y][x]
		let score = 1
		let treesSeen = 0
		for (let i = x + 1; i < input[0].length; ++i) {
			++treesSeen
			if (input[y][i] >= value) {
				break
			}
		}
		score *= treesSeen
		treesSeen = 0
		for (let i = x - 1; i >= 0; --i) {
			++treesSeen
			if (input[y][i] >= value) {
				break
			}
		}
		score *= treesSeen
		treesSeen = 0
		for (let i = y + 1; i < input.length; ++i) {
			++treesSeen
			if (input[i][x] >= value) {
				break
			}
		}
		score *= treesSeen
		treesSeen = 0
		for (let i = y - 1; i>= 0; --i) {
			++treesSeen
			if (input[i][x] >= value) {
				break
			}
		}
		score *= treesSeen

		return score
	}

	let scorePartTwo = 0
	for (let y = 1; y < input.length - 1; ++y) {
		for (let x = 1; x < input[0].length - 1; ++x) {
			scorePartTwo = Math.max(scorePartTwo, getScenicScore(x, y))
		}
	}
	console.log('Solution to part two:', scorePartTwo)
}
