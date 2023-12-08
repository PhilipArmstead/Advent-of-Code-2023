// Day 4
// Visit the input page https://adventofcode.com/2022/day/4/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n')
		.map(line => line.split(',').map(range => range.split('-').map(Number)))


	// Part one
	const scorePartOne = input.reduce((acc, [a, b]) =>
		acc + !!((a[0] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[1] <= a[1]))
	, 0)
	console.log('Solution to part one:', scorePartOne)


	// Part two
	const scorePartTwo = input.reduce((acc, [a, b]) =>
		acc + !!((a[0] >= b[0] && a[0] <= b[1]) || (b[0] >= a[0] && b[0] <= a[1]) || (a[1] >= b[0] && a[1] <= b[1]) || (b[1] >= a[0] && b[1] <= a[1]))
	, 0)
	console.log('Solution to part two:', scorePartTwo)
}
