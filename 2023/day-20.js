// Day 20
// Visit the input page https://adventofcode.com/2023/day/20/input
// Paste the following code in-> your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n')

	const broadcasterModules = []
	const modules = {}
	for (const line of input) {
		const targets = line.substring(line.indexOf('>') + 1).split(',').map(d => d.trim())
		if (line[0] === 'b') {
			broadcasterModules.push(...targets)
			continue
		}
		const name = line.substring(1, line.indexOf(' '))
		modules[name] = line[0] === '%' ? { isFlipFlop: true, state: 0, targets } : { inputs: {}, targets }
	}
	let exitNode
	const exitCycles = {}
	for (const i in modules) {
		if (modules[i].targets.includes('rx')) {
			exitNode = i
		}
		if (!modules[i].isFlipFlop) {
			for (const j in modules) {
				if (modules[j].isFlipFlop && modules[j].targets.includes(i)) {
					modules[i].inputs[j] = 0
				}
			}
		}
	}
	for (const i in modules) {
		if (modules[i].targets.includes(exitNode)) {
			exitCycles[i] = []
		}
	}

	const pushButton = (findHighPulseToExit = false, pulses = 0) => {
		const pulsesSent = [1, 0]
		const signals = broadcasterModules.map(target => [target, 0])
		while (signals.length) {
			const [target, mode, source] = signals.shift()
			const module = modules[target]
			pulsesSent[0] += !mode
			pulsesSent[1] += mode

			if (!module) continue

			if (findHighPulseToExit && !mode && exitCycles[target] !== undefined && exitCycles[target].length < 2) {
				exitCycles[target].push(pulses - (exitCycles[target].length ? exitCycles[target].at(-1) : 0))
			}

			let newMode
			if (module.isFlipFlop) {
				if (mode) continue

				module.state = !module.state
				newMode = module.state
			} else if (!module.isFlipFlop) {
				module.inputs[source] = mode
				newMode = !Object.values(module.inputs).every(mode => mode)
			}
			module.targets.forEach(destination => signals.push([destination, newMode, target]))
		}

		if (!findHighPulseToExit) {
			return pulsesSent
		}

		const exits = Object.entries(exitCycles)
		return exits.every(([, e]) => e.length === 2)
			? exits.reduce((acc, [, e]) => acc * e[1], 1)
			: false
	}

	// Part one
	const sumPartOne = [0, 0]
	for (let i = 0; i < 1000; ++i) {
		const [low, high] = pushButton()
		sumPartOne[0] += low
		sumPartOne[1] += high
	}
	console.log('Solution to part one:', sumPartOne[0] * sumPartOne[1])

	// Part two
	let lowestCommonDenominator = 0
	let i = 0
	while (!lowestCommonDenominator && i < 10000) {
		lowestCommonDenominator = pushButton(true, i++)
	}
	console.log('Solution to part two:', lowestCommonDenominator)
}
