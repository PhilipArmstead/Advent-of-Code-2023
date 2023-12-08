// Day 2
// Visit the input page https://adventofcode.com/2022/day/2/input
// Paste the following code in to your browser's dev tools and execute it

{
	const ROCK1 = 'A'
	const PAPER1 = 'B'
	const SCISSORS1 = 'C'
	const ROCK2 = 'X'
	const PAPER2 = 'Y'
	const SCISSORS2 = 'Z'
	const LOSS = 'X'
	const DRAW = 'Y'
	const WIN = 'Z'

	const choices = {
		[ROCK1]: {
			[ROCK2]: DRAW,
			[PAPER2]: WIN,
			[SCISSORS2]: LOSS,
		},
		[PAPER1]: {
			[ROCK2]: LOSS,
			[PAPER2]: DRAW,
			[SCISSORS2]: WIN,
		},
		[SCISSORS1]: {
			[ROCK2]: WIN,
			[PAPER2]: LOSS,
			[SCISSORS2]: DRAW,
		},
	}
	const scores = {
		[ROCK2]: 1,
		[PAPER2]: 2,
		[SCISSORS2]: 3,
	}
	const results = {
		[WIN]: 6,
		[DRAW]: 3,
		[LOSS]: 0,
	}

	const input = document.body.textContent.trim().split('\n')


	// Part one
	const scorePartOne = input.reduce((acc, cur) => acc + scores[cur[2]] + results[choices[cur[0]][cur[2]]], 0)
	console.log('Solution to part one:', scorePartOne)


	// Part two
	const scorePartTwo = input.reduce((acc, cur) => {
		let choice
		for (choice in choices[cur[0]]) {
			if (choices[cur[0]][choice] === cur[2]) {
				break
			}
		}

		return acc + scores[choice] + results[choices[cur[0]][choice]]
	}, 0)
	console.log('Solution to part two:', scorePartTwo)
}
