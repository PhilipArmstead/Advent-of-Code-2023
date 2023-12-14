// Day 11
// Visit the input page https://adventofcode.com/2022/day/11/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n\n').map(scenario => {
		const lines = scenario.split('\n')
		const operation = lines[2].split('old ')[1]
		const operand = operation.substring(2)
		return [
			lines[1].split(': ')[1].split(', ').map(Number),
			[operation[0], operand[0] === 'o' ? operand : Number(operand)],
			[3, 4, 5].map(i => Number(lines[i].match(/\d+/)[0])),
		]
	})

	const processScenarios = (scenarios, reliefFactor = null) => {
		const inspectionCount = Array.from({ length: scenarios.length }).fill(0)
		const rounds = reliefFactor ? 1e4 : 20

		for (let i = 0; i < rounds; ++i) {
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

					if (!reliefFactor) {
						worryLevel = Math.floor(worryLevel / 3)
					} else if (worryLevel >= reliefFactor) {
						worryLevel %= reliefFactor
					}

					const target = scenario[2][Number(!!(worryLevel % scenario[2][0])) + 1]
					scenarios[target][0].push(worryLevel)
				}
			}
		}

		inspectionCount.sort((a, b) => b - a)

		return inspectionCount[0] * inspectionCount[1]
	}

	// Part one
	const inspectionCountPartOne = processScenarios(structuredClone(input))
	console.log('Solution to part one:', inspectionCountPartOne)

	// Part two
	const reliefFactor = input.reduce((acc, cur) => acc * cur[2][0], 1)
	const inspectionCountPartTwo = processScenarios(structuredClone(input), reliefFactor)
	console.log('Solution to part two:', inspectionCountPartTwo)
}
