// Day 5
// Visit the input page https://adventofcode.com/2022/day/5/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trimEnd().split('\n')
	let stackCount
	let instructionStartLine

	for (let i = 0; i < input.length; ++i) {
		if (input[i][1] === '1') {
			stackCount = parseInt(input[i].at(-2))
			instructionStartLine = i + 2
			break
		}
	}
	const stacks = Array.from({ length: stackCount }, () => [])
	for (const line of input) {
		if (line[1] === '1') {
			break
		}

		for (let i = 1; i < line.length; i += 4) {
			const c = line[i]
			if (c !== ' ') {
				const index = (i - 1) / 4
				stacks[index].unshift(c)
			}
		}
	}


	// Part one
	const mover9000 = structuredClone(stacks)
	for (let i = instructionStartLine; i < input.length; ++i) {
		const [count, start, end] = input[i].match(/(\d+)/g).map(Number)
		for (let j = 0; j < count; ++j) {
			mover9000[end - 1].push(mover9000[start - 1].pop())
		}
	}
	console.log('Solution to part one:', mover9000.map(stack => stack.at(-1)).join(''))


	// Part two
	const mover9001 = structuredClone(stacks)
	for (let i = instructionStartLine; i < input.length; ++i) {
		const [count, start, end] = input[i].match(/(\d+)/g).map(Number)
		mover9001[end - 1].push(...mover9001[start - 1].splice(mover9001[start - 1].length - count, count))
	}
	console.log('Solution to part two:', mover9001.map(stack => stack.at(-1)).join(''))
}
