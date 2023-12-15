// Day 4
// Visit the input page https://adventofcode.com/2023/day/4/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim()
		.split('\n')
		.map(line => line.substring(line.indexOf(':') + 2).split('|').map(half => half.match(/\d+/g).map(Number)))

	const cardScores = Array.from({ length: input.length }).map(() => ({ score: 0, count: 0 }))
	input.forEach((line, i) => {
		cardScores[i].score = line[0].reduce((acc, cur) => {
			if (line[1].includes(cur)) {
				++cardScores[i].count
				return (!acc ? 1 : acc * 2)
			}
			return acc
		}
		, 0)
	})

	// Part one
	console.log('Solution to part one:', cardScores.reduce((acc, cur) => acc + cur.score, 0))


	// Part two
	const copyCard = (i, totalCards = 0) => {
		if (cardScores[i].count) {
			for (let j = i + 1; j <= i + cardScores[i].count; ++j) {
				totalCards = copyCard(j, totalCards)
			}
		}

		return ++totalCards
	}

	console.log('Solution to part two:', cardScores.reduce((acc, _, i) => acc + copyCard(i), 0))
}
