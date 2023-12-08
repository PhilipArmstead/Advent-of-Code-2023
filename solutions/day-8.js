// Day 8
// Visit the input page https://adventofcode.com/2023/day/8/input
// Paste the following code in to your browser's dev tools and execute it
// There's a few aspects of this solution which make it highly specific to the input data of this puzzle
// - there's no guarantee each node has the same exit interval
// - there's no guarantee all intervals share a prime factor

{
	const input = document.body.textContent.trim().split('\n')
	const instructions = input[0]
	const nodeList = Object.fromEntries(input.slice(2).map(line => [
		line.substring(0, 3),
		[line.substring(7, 10), line.substring(12, 15)],
	]))

	// Part one
	let node = 'AAA'
	let i = 0
	while (node !== 'ZZZ') {
		node = nodeList[node][instructions[i++ % instructions.length] === 'L' ? 0 : 1]
	}

	console.log('Solution to part one:', i)


	// Part two
	const getPrimeFactors = (value) => {
		for (let i = 5; i * i <= value; i = i + 6) {
			if (value % i === 0) {
				return [i, value / i]
			} else if (value % (i + 2) === 0) {
				return [i + 2, value / (i + 2)]
			}
		}

		return value
	}

	const nodes = Object.keys(nodeList).filter(n => n[2] === 'A')
	i = 0
	const intervals = []
	while (intervals.length !== nodes.length) {
		for (let j = 0; j < nodes.length; ++j) {
			nodes[j] = nodeList[nodes[j]][instructions[i % instructions.length] === 'L' ? 0 : 1]

			if (nodes[j][2] === 'Z') {
				intervals.push(i + 1)
			}
		}
		++i
	}

	const hops = intervals.reduce((acc, cur) => acc * getPrimeFactors(cur)[0], 1) * getPrimeFactors(intervals[0])[1]
	console.log('Solution to part two:', hops)
}
