// Day 23
// Visit the input page https://adventofcode.com/2023/day/23/input
// Paste the following code in to your browser's dev tools and execute it
// Is there a better way of doing this than brute-forcing for 30 seconds? I wish I knew.

{
	const input = document.body.textContent.trim().split('\n').map(line => line.split(''))
	const start = { x: 1, y: 1 }
	const end = { x: input[0].length - 2, y: input.length - 2 }

	input[start.y - 1][start.x] = '#'
	input[end.y + 1][end.x] = '#'

	const Direction = { UP: 1, RIGHT: 2, DOWN: 4, LEFT: 8 }
	const directions = {
		[Direction.UP]: [0, -1],
		[Direction.RIGHT]: [1, 0],
		[Direction.DOWN]: [0, 1],
		[Direction.LEFT]: [-1, 0],
	}

	// Part one
	const solveMaze = () => {
		const visited = new Set([`${start.x},${start.y}`])
		const positions = [[start.x, start.y, 0]]
		const tiles = {
			'#': 0,
			'.' : Direction.UP | Direction.RIGHT | Direction.DOWN | Direction.LEFT,
			'>' : Direction.UP | Direction.RIGHT | Direction.DOWN,
			'v' : Direction.RIGHT | Direction.DOWN | Direction.LEFT,
			'<' : Direction.UP | Direction.DOWN | Direction.LEFT,
		}
		const finishes = []

		while (positions.length) {
			const [x, y, steps] = positions.pop()

			if (x === end.x && y === end.y) {
				finishes.push(steps)
				continue
			}

			for (const d in Direction) {
				const direction = directions[Direction[d]]
				const tX = x + direction[0]
				const tY = y + direction[1]

				if (
					tiles[input[tY][tX]] & Direction[d] &&
					!visited.has(`${tX},${tY}`)
				) {
					visited.add(`${tX},${tY}`)
					positions.push([tX, tY, steps + 1])
				}
			}
		}

		return finishes.reduce((max, cur) => Math.max(max, cur), 0) + 2
	}
	console.log('Solution to part one:', solveMaze())

	// Part two
	const mapGraph = () => {
		const branches = {
			[`${start.x},${start.y}`]: [],
			[`${end.x},${end.y}`]: [],
		}

		for (let y = 0; y < input.length; ++y) {
			for (let x = 0; x < input[0].length; ++x) {
				if (input[y][x] !== '#') {
					let optionCount = 0
					for (const d in directions) {
						const [dX, dY] = directions[d]
						if (input[y + dY][x + dX] !== '#') {
							++optionCount
						}
					}

					if (optionCount > 2) {
						branches[`${x},${y}`] = []
					}
				}
			}
		}

			const tiles = {
				'#': 0,
				'.' : Direction.UP | Direction.RIGHT | Direction.DOWN | Direction.LEFT,
				'>' : Direction.UP | Direction.RIGHT | Direction.DOWN | Direction.LEFT,
				'v' : Direction.UP | Direction.RIGHT | Direction.DOWN | Direction.LEFT,
				'<' : Direction.UP | Direction.RIGHT | Direction.DOWN | Direction.LEFT,
			}
			const positions = [[start.x, start.y, 1, start.x, start.y]]

			while (positions.length) {
				let [x, y, steps, lastX, lastY, lastD] = positions.shift()

				for (const d in Direction) {
					const direction = directions[Direction[d]]
					const tX = x + direction[0]
					const tY = y + direction[1]

					if (tiles[input[tY][tX]] & Direction[d] && Direction[d] * 4 !== Direction[lastD] && Direction[d] / 4 !== Direction[lastD]) {
						if (branches[`${tX},${tY}`] && !branches[`${tX},${tY}`].some(([x, y]) => x === lastX && y === lastY)) {
							branches[`${tX},${tY}`].push([lastX, lastY, steps + 1])
							steps = -1
							lastX = tX
							lastY = tY
						}
						if (!branches[`${tX},${tY}`] || !branches[`${tX},${tY}`].some(([x, y]) => x === lastX && y === lastY)) {
							positions.push([tX, tY, steps + 1, lastX, lastY, d])
						}
					}
				}
			}

		branches[`${end.x},${end.y}`].forEach(([x, y, cost]) => {
			branches[`${x},${y}`] = [[end.x, end.y, cost]]
		})

		return branches
	}
	const slowWalk = (branches) => {

		let max = 0
		const positions = [[start.x, start.y, 0, new Set([`${start.x},${start.y}`])]]
		while (positions.length) {
			const [x, y, steps, visited] = positions.pop()
			if (x === end.x && y === end.y) {
				if (steps > max) {
					max = steps
				}
				continue
			}
			for (const [tX, tY, cost] of branches[`${x},${y}`]) {
				if (!visited.has(`${tX},${tY}`)) {
					const newVisited = new Set(visited)
					newVisited.add(`${tX},${tY}`)
					positions.push([tX, tY, steps + cost, newVisited])
				}
			}
		}

		return max + 2
	}

	const branches = mapGraph()
	const maxDistance = slowWalk(branches)
	console.log('Solution to part two:', maxDistance)
}
