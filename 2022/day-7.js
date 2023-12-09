// Day 7
// Visit the input page https://adventofcode.com/2022/day/7/input
// Paste the following code in to your browser's dev tools and execute it

{
	const input = document.body.textContent.trim().split('\n')

	const fileStructure = {}
	let currentDirectory = fileStructure

	const createDirectory = (name) => {
		if (!currentDirectory[name]) {
			currentDirectory[name] = {
				'..': currentDirectory,
			}
		}
	}

	input.forEach(line => {
		if (line.startsWith('$ cd')) {
			const name = line.substring(5)

			if (name === '/') {
				currentDirectory = fileStructure
			} else {
				createDirectory(name)
				currentDirectory = currentDirectory[name]
			}
		} else if (line.startsWith('dir ')) {
			createDirectory(line.substring(4))
		} else if (line[0] !== '$') {
			const size = parseInt(line.split(' ')[0])
			let d = currentDirectory
			while (d) {
				d._totalSize = (d._totalSize || 0) + size
				d = d['..']
			}
		}
	})

	const getDirectorySizesRecursively = (dir, sizes = []) => {
		sizes.push(dir._totalSize)
		for (const name in dir) {
			if (name[0] !== '.' && name[0] !== '_') {
				sizes = getDirectorySizesRecursively(dir[name], sizes)
			}
		}

		return sizes
	}

	const directorySizes = getDirectorySizesRecursively(fileStructure)

	// Part one
	console.log('Solution to part one:', directorySizes.reduce((acc, cur) => cur < 100000 ? acc + cur : acc, 0))

	// Part two
	const sizeTarget = 3e7 + fileStructure._totalSize - 7e7
	console.log('Solution to part two:', directorySizes.reduce((acc, cur) => cur >= sizeTarget ? Math.min(acc, cur) : acc, fileStructure._totalSize))
}
