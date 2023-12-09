// Day 6
// Visit the input page https://adventofcode.com/2022/day/6/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim()

	const findUniqueString = (string, length) => {
		const seen = Array.from({ length: 26 }, () => 0)
		for (let i = 0; i < input.length; ++i) {
			++seen[input.charCodeAt(i) - 97]
			--seen[input.charCodeAt(i - length) - 97]

			if (i >= length && seen.every(v => v < 2)) {
				return i + 1
			}
		}
	}

	// Part one
	console.log('Solution to part one:', findUniqueString(input, 4))

	// Part two
	console.log('Solution to part one:', findUniqueString(input, 14))
}
