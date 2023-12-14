// Day 10
// Visit the input page https://adventofcode.com/2023/day/10/input
// Paste the following code in to your browser's dev tools and execute it

{
	const Direction = { UP: 1, DOWN: 2, LEFT: 4, RIGHT: 8 }
	const direction = {
		'|': Direction.UP | Direction.DOWN,
		'-': Direction.LEFT | Direction.RIGHT,
		'L': Direction.UP | Direction.RIGHT,
		'J': Direction.UP | Direction.LEFT,
		'7': Direction.DOWN | Direction.LEFT,
		'F': Direction.DOWN | Direction.RIGHT,
		'.': 0,
		'S': Direction.UP | Direction.DOWN | Direction.LEFT | Direction.RIGHT,
	}

	const input = document.body.textContent.trim()
	const grid = input.split('\n')
	const index = input.indexOf('S')
	let y = Math.floor(index / grid.length)
	let x = (index - y) % grid[0].length
	const startX = x
	const startY = y
	let area = 0
	let circumference = 0

	while (++circumference) {
		const oldX = x
		const oldY = y
		const char = grid[y][x]

		if (x < grid[0].length - 1 && direction[char] & Direction.RIGHT && direction[grid[y][x + 1]] & Direction.LEFT) {
			area += y
			x++
		} else if (y < grid.length - 1 && direction[char] & Direction.DOWN && direction[grid[y + 1][x]] & Direction.UP) {
			area -= x
			y++
		} else if (x > 0 && direction[char] & Direction.LEFT && direction[grid[y][x - 1]] & Direction.RIGHT) {
			area -= y
			x--
		} else if (y > 0 && direction[char] & Direction.UP && direction[grid[y - 1][x]] & Direction.DOWN) {
			area += x
			y--
		} else {
			break
		}
		grid[oldY] = grid[oldY].substring(0, oldX) + '.' + grid[oldY].substring(oldX + 1)
	}

	area += y * startX - x * startY

	console.log('Solution to part one:', circumference / 2)
	console.log('Solution to part two:', (Math.abs(area) - circumference) / 2 + 1)
}
