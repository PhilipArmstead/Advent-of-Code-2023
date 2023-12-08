// Day 1
// Visit the input page https://adventofcode.com/2022/day/1/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim()
		.split('\n\n')
		.map(group => group.split('\n').map(Number))

	const calorieTotals = input.map((lines) => lines.reduce((sum, calories) => sum + calories, 0))
	calorieTotals.sort((a, b) => b - a)

	// Part one
	console.log('Solution to part one:', calorieTotals[0])


	// Part two
	console.log('Solution to part two:', calorieTotals[0] + calorieTotals[1] + calorieTotals[2])
}
