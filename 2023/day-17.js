// Day 17
// Visit the input page https://adventofcode.com/2023/day/17/input
// Paste the following code in to your browser's dev tools and execute it
// This executes in 3 and a half seconds; it might be more efficient if I actually googled Dijkstra

{
	const input = document.body.textContent.trim().split('\n').map(line => line.split('').map(Number))

	const directions = [
		[0, -1], // up
		[1, 0], // right
		[0, 1], // down
		[-1, 0], // left
	]

	class PriorityQueue {
		#heap = []

		get isEmpty () {
			return this.#heap.length === 0
		}

		pop () {
			return this.#heap.shift()[1]
		}

		push (p, value) {
			if (this.isEmpty) {
				this.#heap.push([p, value])
				return
			}

			const index = this.#findPriority(p)
			const offset = p > this.#heap[index][0]
			this.#heap.splice(index + offset, 0, [p, value])
		}

		#findPriority (p) {
			let start = 0
			let end = this.#heap.length - 1

			while (start <= end) {
				const mid = Math.floor((start + end) / 2)

				if (this.#heap[mid][0] === p) return mid
				if (this.#heap[mid][0] > p) end = mid - 1
				if (this.#heap[mid][0] < p) start = mid + 1
			}

			return Math.max(end, 0)
		}
	}

	const solveMaze = (minSteps = 0, maxSteps = 3) => {
		const q = new PriorityQueue()
		q.push(0, { direction: -1, heat: 0, whenToTurn: 0, x: 0, y: 0 })

		const visited = new Set()

		while (!q.isEmpty) {
			const { direction, heat, whenToTurn, x, y } = q.pop()

			if (visited.has(`${x},${y},${direction},${whenToTurn}`)) {
				continue
			}
			visited.add(`${x},${y},${direction},${whenToTurn}`)

			for (let d = 0; d < directions.length; ++d) {
				if ((d + 2) % 4 === direction) {
					continue
				}
				if (d === direction && whenToTurn === 0) {
					continue
				}
				if (whenToTurn > (maxSteps - minSteps) && d !== direction) {
					continue
				}

				const [dX, dY] = directions[d]
				const tX = x + dX
				const tY = y + dY

				if (tY >= 0 && tY < input.length && tX >= 0 && tX < input[0].length) {
					const cellValue = input[tY][tX]

					if (tX === input[0].length - 1 && tY === input.length - 1) {
						return heat + cellValue
					}

					q.push(heat + cellValue, {
						direction: d,
						heat: heat + cellValue,
						whenToTurn: d === direction ? whenToTurn - 1 : (maxSteps - 1),
						x: tX,
						y: tY,
					})
				}
			}
		}
	}

	// Part one
	console.log('Solution to part one:', solveMaze())

	// Part two
	console.log('Solution to part two:', solveMaze(4, 10))
}
