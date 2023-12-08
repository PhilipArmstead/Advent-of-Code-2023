// Day 5
// Visit the input page https://adventofcode.com/2023/day/5/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n\n')
	const maps = input.slice(1).map(line => line.split('\n').slice(1).map(n => n.match(/\d+/g).map(Number)))

	// Part One
	const seeds = input[0].substring(7).match(/\d+/g).map(Number)
	let minimum = Number.MAX_SAFE_INTEGER
	seeds.forEach(id => {
		maps.forEach(map => {
			for (let i = 0; i < map.length; ++i) {
				const [target, source, length] = map[i]
				if (id >= source && id < source + length) {
					id += target - source
					break
				}
			}
		})
		if (id < minimum) {
			minimum = id
		}
	})

	console.log('Solution to part one:', minimum)


	// Part two
	let ranges = input[0].substring(7).match(/(\d+ \d+)/g).map(n => n.split(' ').map(Number))
	maps.forEach(map => {
		const overlappingRange = []
		const nonOverlappingRange = []

		for (let [rangeStart, rangeSize] of ranges) {
			let added = false
			for (const [target, sourceStart, length] of map) {
				const sourceEnd = sourceStart + length
				const difference = target - sourceStart
				if (rangeStart >= sourceStart && rangeStart + rangeSize <= sourceEnd) {
					overlappingRange.push([rangeStart + difference, rangeSize])
					added = true
					break
				}
				if (rangeStart >= sourceStart && rangeStart < sourceEnd) {
					const bump = sourceEnd - rangeStart
					overlappingRange.push([rangeStart + difference, bump])
					rangeStart += bump
					rangeSize -= bump
				}
				if (rangeStart + rangeSize > sourceStart && rangeStart + rangeSize <= sourceEnd) {
					const bump = rangeSize - sourceStart + rangeStart
					overlappingRange.push([target, bump])
					rangeSize -= bump
				}
			}

			if (!added) {
				nonOverlappingRange.push([rangeStart, rangeSize])
			}
		}

		ranges = overlappingRange.concat(nonOverlappingRange)
	})
	ranges.sort((a, b) => a[0] - b[0])

	console.log('Solution to part two:', ranges[0][0])
}
