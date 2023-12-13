// Day 10
// Visit the input page https://adventofcode.com/2022/day/10/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n').map(line => {
		const [direction, count] = line.split(' ')
		return [direction, count ? parseInt(count) : 0]
	})

	const cycleWeight = {
		noop: 1,
		addx: 2,
	}

	const processInstructions = (drawPixels = false) => {
		let sum = 0
		let register = 1
		let cycles = 0
		let cycleTarget = 20
		const pixels = []
		for (const [instruction, value] of input) {
			for (let i = 0; i < cycleWeight[instruction]; ++i) {
				++cycles

				if (drawPixels && Math.ceil(cycles / 40) > pixels.length) {
					pixels.push('')
				}

				if (drawPixels) {
					const c = (cycles % 40) - 1
					pixels[pixels.length - 1] += register >= c - 1 && register <= c + 1 ? '#' : '.'
				} else if (cycles === cycleTarget) {
					cycleTarget += 40
					sum += register * cycles
				}
			}

			register += value
		}

		return drawPixels ? pixels.join('\n') : sum
	}

	// Part one
	console.log('Solution to part one:', processInstructions())

	// Part two
	console.log('Solution to part two:\n', processInstructions(true))
}
