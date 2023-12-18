// Day 18
// Visit the input page https://adventofcode.com/2023/day/18/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n')
	const instructions = input.map(line => {
		const [direction, distance] = line.split(' ')
		return [direction, Number(distance)]
	})
	const directions = ['R', 'D', 'L', 'U']
	const instructionsHuge = input.map(line => {
		const [, , colour] = line.split(' ')
		return [directions[colour[colour.length - 2]], parseInt(colour.substring(2, colour.length - 2), 16)]
	})

	const getAreaOfPolygon = (instructions) => {
		let circumference = 0
		let x1 = 0
		let y1 = 0
		let x2 = 0
		let y2 = 0
		let s1 = 0
		let s2 = 0
		let even = false

		for (const [direction, distance] of instructions) {
			switch (direction) {
				case 'R': x1 += distance; break
				case 'D': y1 += distance; break
				case 'L': x1 -= distance; break
				case 'U': y1 -= distance; break
			}
			circumference += distance

			// Sum up shoelace area every other coordinate
			even = !even
			if (even) {
				s1 += x2 * y1
				s2 += x1 * y2
			} else {
				x2 = x1
				y2 = y1
			}
		}

		return circumference / 2 + Math.abs(s1 - s2) + 1
	}

	// Part one
	console.log('Solution to part one:', getAreaOfPolygon(instructions))

	// Part two
	console.log('Solution to part two:', getAreaOfPolygon(instructionsHuge))
}
