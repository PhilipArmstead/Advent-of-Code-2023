// Day 10
// Visit the input page https://adventofcode.com/2023/day/10/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim()
	const grid = input.split('\n')
	const index = input.indexOf('S')
	const pipes = {
		up: ['|', 'F', '7'],
		down: ['|', 'J', 'L'],
		left: ['F', '-', 'L'],
		right: ['J', '-', '7'],
	}

	let y = Math.floor(index / grid.length)
	let x = (index - y) % grid[0].length
	let lastY = y
	let lastX = x

	// Part one
	let i = 1
	let isStart = true
	while (true) {
		const here = grid[y][x]
		if (x !== grid[0].length - 1 && lastX !== x + 1 && pipes.right.includes(grid[y][x + 1]) && (isStart || pipes.left.includes(here))) {
			lastX = x
			lastY = y
			++x
		} else if (y !== grid.length - 1 && lastY !== y + 1 && pipes.down.includes(grid[y + 1][x]) && (isStart || pipes.up.includes(here))) {
			lastX = x
			lastY = y
			++y
		} else if (x && lastX !== x - 1 && pipes.left.includes(grid[y][x - 1]) && (isStart || pipes.right.includes(here))) {
			lastX = x
			lastY = y
			--x
		} else if (y && lastY !== y - 1 && pipes.up.includes(grid[y - 1][x]) && (isStart || pipes.down.includes(here))) {
			lastX = x
			lastY = y
			--y
		} else {
			break
		}

		++i
		isStart = false
	}
	console.log('Solution to part one:', i / 2)
}
