// Day 18
// Visit the input page https://adventofcode.com/2023/day/18/input
// Paste the following code in to your browser's dev tools and execute it

{
	const directions = ['R', 'D', 'L', 'U']
	const input = document.body.textContent.trim().split('\n')
	const instructions = input.map(line => {
		const [d, i] = line.split(' ')
		return [d, Number(i)]
	})
	const instructionsHuge = input.map(line => {
		const [, , c] = line.split(' ')
		return [directions[c[c.length - 2]], parseInt(c.substring(2, c.length - 2), 16)]
	})

	const getAreaOfPolygon = (instructions) => {
		let circumference = 0
		let x = 0
		let y = 0
		let s1 = 0
		let s2 = 0

		const coordinates = [[x, y]]
		for (const [d, c] of instructions) {
			switch (d) {
				case 'R': x += c; break
				case 'D': y += c; break
				case 'L': x -= c; break
				case 'U': y -= c; break
			}
			circumference += c
			coordinates.push([x, y])
			if (!(coordinates.length % 2)) {
				s1 += coordinates.at(-2)[0] * coordinates.at(-1)[1]
				s2 += coordinates.at(-2)[1] * coordinates.at(-1)[0]
			}
		}

		return circumference / 2 + Math.abs(s1 - s2) + 1
	}

	// Part one
	console.log('Solution to part one:', getAreaOfPolygon(instructions))

	// Part two
	console.log('Solution to part two:', getAreaOfPolygon(instructionsHuge))
}
