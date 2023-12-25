// Day 25
// Visit the input page https://adventofcode.com/2023/day/25/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n')
	const edges = []
	const vertexIds = new Map()

	for (const line of input) {
		const [v1, ...v2s] = line.match(/[a-z]+/g)

		if (!vertexIds.has(v1)) {
			vertexIds.set(v1, vertexIds.size)
		}

		for (const v2 of v2s) {
			if (!vertexIds.has(v2)) {
				vertexIds.set(v2, vertexIds.size)
			}

			edges.push([vertexIds.get(v1), vertexIds.get(v2)])
		}
	}

	const findUnions = (vertexCount, edges, desiredCuts) => {
		for (let i = 0; i < edges.length; ++i) {
			const idx = Math.floor(Math.random() * i + 1);
			[edges[i], edges[idx]] = [edges[idx], edges[i]]
		}

		const groupParents = [-1]
		const vertexGroups = new Uint16Array(vertexCount)
		const groupPromotions = [-1]

		const union = (v1, v2) => {
			if (!vertexGroups[v1] && !vertexGroups[v2]) {
				const group = groupParents.length
				groupParents.push(group)
				groupPromotions.push(1)
				vertexGroups[v1] = group
				vertexGroups[v2] = group
			} else if (!vertexGroups[v1]) {
				const g = (vertexGroups[v2] = parent(v2))
				++groupPromotions[g]
				vertexGroups[v1] = g
			} else if (!vertexGroups[v2]) {
				const g = (vertexGroups[v1] = parent(v1))
				++groupPromotions[g]
				vertexGroups[v2] = g
			} else {
				const g1 = parent(v1)
				const g2 = parent(v2)

				if (g1 !== g2) {
					if (groupPromotions[g1] > groupPromotions[g2]) {
						[g2, g1] = [g1, g2]
					}

					groupPromotions[g2] += groupPromotions[g1] + 1
					groupParents[g1] = g2
					vertexGroups[v1] = g2
					vertexGroups[v2] = g2
				} else {
					return false
				}
			}

			return true
		}

		const parent = (v) => {
			if (vertexGroups[v] === 0) {
				return -1
			}

			let group = vertexGroups[v]
			while (group !== groupParents[group]) {
				group = groupParents[group]
			}

			return group
		}

		let edgeIdx = 0
		while (vertexCount > 2) {
			const [v1, v2] = edges[edgeIdx++]

			if (union(v1, v2)) {
				--vertexCount
			}
		}

		let removedEdges = 0
		for (let [v1, v2] of edges) {
			if ((vertexGroups[v1] = parent(v1)) !== (vertexGroups[v2] = parent(v2))) {
				++removedEdges
			}
		}

		if (removedEdges === desiredCuts) {
			return vertexGroups
		}

		return null
	}

	const findMinimumCut = () => {
		while (true) {
			const groups = findUnions(vertexIds.size, edges, 3)

			if (groups !== null) {
				const group1Count = groups.filter(x => x === groups[0]).length
				return group1Count * (vertexIds.size - group1Count)
			}
		}
	}

	const sumPartOne = findMinimumCut()

	// Part one
	console.log('Solution to part one:', sumPartOne)
}
