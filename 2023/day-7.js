// Day 7
// Visit the input page https://adventofcode.com/2023/day/7/input
// Paste the following code in to your browser's dev tools and execute it

{
	const handStrengths = new Map()

	const getHandStrength = (hand, cardValues, useWildcards = false) => {
		if (handStrengths.has(hand)) {
			return handStrengths.get(hand)
		}

		const analysis = {}
		let fractionalValue = 0
		let unit = 1e8
		let wildcardCount = 0
		for (const card of hand) {
			if (!analysis[card]) {
				analysis[card] = 1
			} else {
				++analysis[card]
			}

			if (useWildcards && card === 'J') {
				++wildcardCount
			}

			// Add value of card
			fractionalValue += (cardValues[card] * unit)
			unit /= 100
		}

		let value = fractionalValue / 1e10
		const analysisValues = Object.entries(analysis)
		analysisValues.sort((a, b) => {
			if (useWildcards && a[0] === 'J') return 1
			else if (useWildcards && b[0] === 'J') return -1
			return b[1] - a[1]
		})

		for (const values of analysisValues) {
			values[1] += wildcardCount
		}

		const fiveOfaKind = 1 + !!wildcardCount
		const fourOfaKind = 2 + !!wildcardCount
		const fullHouse = 2 + !!wildcardCount
		const threeOfAKind = 3 + !!wildcardCount
		const twoPairs = 3 + !!wildcardCount
		const onePair = 4 + !!wildcardCount
		const highestOccurrence = analysisValues[0][1]

		if (analysisValues.length === 1 || analysisValues.length === fiveOfaKind) {
			value += 7
		} else if (analysisValues.length === fourOfaKind && highestOccurrence === 4) {
			value += 6
		} else if (analysisValues.length === fullHouse && highestOccurrence === 3) {
			value += 5
		} else if (analysisValues.length === threeOfAKind && highestOccurrence === 3) {
			value += 4
		} else if (analysisValues.length === twoPairs && highestOccurrence === 2) {
			value += 3
		} else if (analysisValues.length === onePair && highestOccurrence === 2) {
			value += 2
		} else {
			value += 1
		}

		handStrengths.set(hand, value)
		return value
	}

	const input = document.body.textContent.trim().split('\n').map(s => {
		const parts = s.split(' ')
		return [parts[0], Number(parts[1])]
	})


	// Part one
	const cardValuesPartOne = {
		1: 11, 2: 12, 3: 13, 4: 14, 5: 15, 6: 16, 7: 17, 8: 18, 9: 19, T: 20, J: 21, Q: 22, K: 23, A: 24
	}
	let sumPartOne = 0
	input.sort((a, b) => getHandStrength(a[0], cardValuesPartOne) -getHandStrength(b[0], cardValuesPartOne))

	for (let i = 0; i < input.length; ++i) {
		sumPartOne += input[i][1] * (i + 1)
	}

	console.log('Solution to part one:', sumPartOne)


	// Part two
	const cardValuesPartTwo = {
		J: 10, 1: 11, 2: 12, 3: 13, 4: 14, 5: 15, 6: 16, 7: 17, 8: 18, 9: 19, T: 20, Q: 22, K: 23, A: 24
	}
	handStrengths.clear()

	let sumPartTwo = 0
	input.sort((a, b) => getHandStrength(a[0], cardValuesPartTwo, true) - getHandStrength(b[0], cardValuesPartTwo, true))

	for (let i = 0; i < input.length; ++i) {
		sumPartTwo += input[i][1] * (i + 1)
	}

	console.log('Solution to part two:', sumPartTwo)
}