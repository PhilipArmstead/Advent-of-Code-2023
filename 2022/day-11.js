// Day 11
// Visit the input page https://adventofcode.com/2022/day/11/input
// Paste the following code in to your browser's dev tools and execute it

{
	const data = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`
	const input = document.body.textContent
	// const input = data
		.trim()
		.split('\n\n').map(scenario => {
		const lines = scenario.split('\n')

		const operation = lines[2].split('old ')[1]
		const operand = operation.substring(2)
		return [
			lines[1].split(': ')[1].split(', ').map(Number),
			[operation[0], operand[0] === 'o' ? operand : Number(operand)],
			[3, 4, 5].map(i => Number(lines[i].match(/\d+/)[0])),
		]
	})

	const processScenarios = (scenarios) => {
		let inspectionCount = Array.from({length: scenarios.length}).fill(0)

		for (let i = 0; i < 20; ++i) {
			for (let j = 0; j < scenarios.length; ++j) {
				const scenario = scenarios[j]
				while (scenario[0].length) {
					let worryLevel = scenario[0].shift()

					++inspectionCount[j]

					const operand = isNaN(scenario[1][1]) ? worryLevel : scenario[1][1]
					switch (scenario[1][0]) {
						case '*': worryLevel *= operand; break
						case '+': worryLevel += operand; break
					}

					worryLevel = Math.floor(worryLevel / 3)

					const target = scenario[2][Number(!!(worryLevel % scenario[2][0])) + 1]
					scenarios[target][0].push(worryLevel)
				}
			}
		}

		inspectionCount.sort((a, b) => b - a)

		return inspectionCount[0] * inspectionCount[1]
	}

	// Part one
	const inspectionCountPartOne = processScenarios(input)
	console.log('Solution to part one:', inspectionCountPartOne)

	// Part two
	console.log('Solution to part two:', 0)
}
