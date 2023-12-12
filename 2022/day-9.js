// Day 9
// Visit the input page https://adventofcode.com/2022/day/9/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n').map(line => {
		const [direction, count] = line.split(' ')
		return [direction, parseInt(count)]
	})
	const directions = {
		U: { x: 0, y: -1 },
		D: { x: 0, y: 1 },
		L: { x: -1, y: 0 },
		R: { x: 1, y: 0 },
	}

	const parseInstructions = (length) => {
		const snake = Array.from({ length }).map(_ => ({ x: 0, y: 0 }))
		const tailVisits = new Set([`${snake[0].x},${snake[0].y}`])

		for (const [direction, count] of input) {
			for (let i = 1; i <= count; ++i) {
				snake[0].x += directions[direction].x
				snake[0].y += directions[direction].y

				for (let j = 1; j < length; ++j) {
					const previous = snake[j - 1]
					const current = snake[j]
					const isTouching = previous.x >= current.x - 1 &&
						previous.x <= current.x + 1 &&
						previous.y >= current.y - 1 &&
						previous.y <= current.y + 1
					if (!isTouching) {
						current.x += Math.max(Math.min(previous.x - current.x, 1), -1)
						current.y += Math.max(Math.min(previous.y - current.y, 1), -1)
						if (j === length - 1) {
							tailVisits.add(`${current.x},${current.y}`)
						}
					}
				}
			}
		}

		return tailVisits.size
	}

	// Part one
	console.log('Solution to part one:', parseInstructions(2))

	// Part two
	console.log('Solution to part two:', parseInstructions(10))
}
