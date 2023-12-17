// Day 17
// Visit the input page https://adventofcode.com/2023/day/17/input
// Paste the following code in to your browser's dev tools and execute it
// This takes a minute to execute. I should google Dijkstra instead of making my own

{
	const input = document.body.textContent
		.trim().split('\n').map(line => line.split('').map(Number))

	const directions = [
		[0, -1], // up
		[1, 0], // right
		[0, 1], // down
		[-1, 0], // left
	]

	class PriorityQueue {
		#heap = []

		get isEmpty() {
			return this.#heap.length === 0
		}

		pop() {
			return this.#heap.pop()[1]
		}

		push(p, value) {
			for (let i = 0; i < this.#heap.length; ++i) {
				if (p > this.#heap[i][0]) {
					this.#heap.splice(i, 0, [p, value])
					return
				}
			}

			this.#heap.push([p, value])
		}
	}

	const solveMaze = (isUltra = false) => {
		const q = new PriorityQueue()
		q.push(0, { direction: -1, heat: 0, whenToTurn: 0, x: 0, y: 0 })

		const minimums = new Map()

		while (!q.isEmpty) {
			const { direction, heat,  whenToTurn, x, y } = q.pop()

			if (minimums.has(`${x},${y},${direction},${whenToTurn}`)) {
				continue
			}
			minimums.set(`${x},${y},${direction},${whenToTurn}`, heat)

			for (let d = 0; d < directions.length; ++d) {
				if ((d + 2) % 4 === direction) {
					continue
				}
				if (d === direction && whenToTurn === 0) {
					continue
				}
				if (isUltra && whenToTurn > 6 && d !== direction) {
					continue
				}

				const [dX, dY] = directions[d]
				const tX = x + dX
				const tY = y + dY

				if (tY >= 0 && tY < input.length && tX >= 0 && tX < input[0].length) {
					const cellValue = input[tY][tX]
					q.push(heat + cellValue,{
						direction: d,
						heat: heat + cellValue,
						whenToTurn: d === direction ? whenToTurn - 1 : (isUltra ? 9 : 2),
						x: tX,
						y: tY,
					})
				}
			}
		}

		let min = Number.MAX_SAFE_INTEGER
		for (const key of minimums.keys()) {
			if (key.startsWith(`${input[0].length - 1},${input.length - 1},`)) {
				min = Math.min(min, minimums.get(key))
			}
		}
		return min
	}

	// Part one
	console.log('Solution to part one:', solveMaze())

	// Part two
	console.log('Solution to part two:', solveMaze(true))
}
