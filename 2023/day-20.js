// Day 20
// Visit the input page https://adventofcode.com/2023/day/20/input
// Paste the following code in-> your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n')

	const ModuleType = { FlipFlop: 0, Conjunction: 1 }
	const broadcasterModules = []
	const modules = {}
	for (const line of input) {
		const targets = line.substring(line.indexOf('>') + 1).split(',').map(d => d.trim())
		if (line[0] === 'b') {
			broadcasterModules.push(...targets)
			continue
		}
		const name = line.substring(1, line.indexOf(' '))
		modules[name] = line[0] === '%'
			? { type: ModuleType.FlipFlop, state: 0, targets }
			: { type: ModuleType.Conjunction, targets, inputs: {} }
	}
	let rxInput
	let rxInputInput = {}
	for (const i in modules) {
		if (modules[i].targets.includes('rx')) {
			rxInput = i
		}
		if (modules[i].type === ModuleType.Conjunction) {
			for (const j in modules) {
				if (modules[j].type === ModuleType.FlipFlop && modules[j].targets.includes(i)) {
					modules[i].inputs[j] = 0
				}
			}
		}
	}
	for (const i in modules) {
		if (modules[i].targets.includes(rxInput)) {
			rxInputInput[i] = []
		}
	}

	const broadcastSignal = (input, findHighPulseToExit = false, pulses = 0) => {
		const pulsesSent = [1, 0]
		const signals = broadcasterModules.map(target => [target, 0, 'broadcaster'])
		while (signals.length) {
			const [target, mode, source] = signals.shift()
			const module = modules[target]
			pulsesSent[0] += !mode
			pulsesSent[1] += mode

			if (findHighPulseToExit && !mode && rxInputInput[target] !== undefined && rxInputInput[target].length < 2) {
				rxInputInput[target].push(pulses - (rxInputInput[target].length ? rxInputInput[target].at(-1) : 0))
			}

			if (!module) {
				continue
			}

			if (module.type === ModuleType.FlipFlop) {
				if (mode) {
					continue
				}

				module.state = !module.state
				module.targets.forEach(destination => signals.push([destination, module.state, target]))
			} else if (module.type === ModuleType.Conjunction) {
				module.inputs[source] = mode
				const newMode = !Object.values(module.inputs).every(mode => mode)
				module.targets.forEach((destination) => signals.push([destination, newMode, target]))
			}
		}

		if (!findHighPulseToExit) {
			return pulsesSent
		}

		const exits = Object.entries(rxInputInput)
		if (exits.every(([, e]) =>e.length === 2)) {
			return exits.reduce((acc, [, e]) => acc * e[1], 1)
		}

		return false
	}

	// Part one
	const inputPartOne = structuredClone(input)
	const sumPartOne = [0, 0]
	for (let i = 0; i < 1000; ++i) {
		const [low, high] = broadcastSignal(inputPartOne)
		sumPartOne[0] += low
		sumPartOne[1] += high
	}
	console.log('Solution to part one:', sumPartOne[0] * sumPartOne[1])

	// Part two
	const inputPartTwo = structuredClone(input)
	let lowestCommonDenominator = 0
	let i = 0
	while (!lowestCommonDenominator) {
		lowestCommonDenominator = broadcastSignal(inputPartTwo, true, i++)
	}
	console.log('Solution to part two:', lowestCommonDenominator)
}
