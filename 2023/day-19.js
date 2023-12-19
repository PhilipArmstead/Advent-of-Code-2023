// Day 19
// Visit the input page https://adventofcode.com/2023/day/19/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n\n')
	const instructions = Object.fromEntries(input[0].split('\n').map(instruction => {
		const openBracketIndex = instruction.indexOf('{')
		const instructions = instruction.substring(openBracketIndex + 1, instruction.length - 1).split(',')
		const ops = instructions.map((operation, i) => {
			const colonIndex = operation.indexOf(':')
			return i === instructions.length - 1 ? [operation] : [
				operation[0], operation[1], Number(operation.substring(2, colonIndex)), operation.substring(colonIndex + 1),
			]
		})
		return [instruction.substring(0, openBracketIndex), ops]
	}))
	const parts1 = input[1].split('\n')
		.map(part => ['in', part.substring(1, part.length - 1).split(',').map(group => Number(group.split('=')[1]))])
	const parts2 = [['in', Array.from({ length: 4 }).map(() => ({ min: 1, max: 4000 }))]]

	const Parameters = { x: 0, m: 1, a: 2, s: 3 }

	const processParts = (parts, isRange = false) => {
		let sum = 0
		while (parts.length) {
			const [group, p] = parts.pop()

			for (const [param, op, target, destination] of instructions[group]) {
				let newDestination

				const part = isRange ? structuredClone(p) : p

				if (!op) {
					newDestination = param
				} else {
					const value = p[Parameters[param]]
					if (op === '>') {
						if (!isRange && value > target) {
							newDestination = destination
						} else if (isRange && value.max > target) {
							newDestination = destination
							part[Parameters[param]].min = target + 1
							part[Parameters[param]].max = value.max
							value.max = target
						}
					} else if (!isRange && value < target) {
						newDestination = destination
					} else if (isRange && value.min < target) {
						newDestination = destination
						part[Parameters[param]].max = target - 1
						part[Parameters[param]].min = value.min
						value.min = target
					}
				}

				if (newDestination) {
					if (newDestination === 'A') {
						if (!isRange) {
							sum += part[0] + part[1] + part[2] + part[3]
						} else {
							sum += (part[0].max - part[0].min + 1)
								* (part[1].max - part[1].min + 1)
								* (part[2].max - part[2].min + 1)
								* (part[3].max - part[3].min + 1)
						}
					} else if (newDestination !== 'R') {
						parts.push([newDestination, part])
					}

					if (!isRange) {
						break
					}
				}
			}
		}

		return sum
	}

	// Part one
	console.log('Solution to part one:', processParts(parts1))

	// Part two
	console.log('Solution to part two:', processParts(parts2, true))
}
