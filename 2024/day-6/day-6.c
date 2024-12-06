#include <errno.h>
#include <stdio.h>
#include <sys/time.h>
#include <memory.h>

#include "../helpers/types.h"


int day6(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return 2;
	}

	char line[136];
	u8 grid[136][136] = {'\0'};
	u8 initialX;
	u8 initialY;
	{
		u8 y = 0;
		while (fgets(line, sizeof(line), fp) != NULL) {
			u8 x = 0;
			while (line[x] != '\0' && line[x] != '\n') {
				grid[y + 1][x + 1] = line[x];

				if (line[x] == '^') {
					initialX = x + 1;
					initialY = y + 1;
				}

				++x;
			}
			++y;
		}
	}

	i8 directions[4][3] = {
		{-1, 0,  '^'},
		{0,  1,  '>'},
		{1,  0,  'v'},
		{0,  -1, '<'},
	};
	u8 directionIndex = 0;

	u32 sumPartOne = 1;
	u32 sumPartTwo = 0;

	u8 currentX = initialX;
	u8 currentY = initialY;

	while (true) {
		i8 *d = directions[directionIndex];
		u8 cell = grid[currentY + d[0]][currentX + d[1]];

		if (cell == '\0') {
			break;
		} else if (cell == '#') {
			directionIndex = directionIndex == 3 ? 0 : directionIndex + 1;
		} else {
			currentY += d[0];
			currentX += d[1];

			if (grid[currentY][currentX] == '.') {
				grid[currentY][currentX] = '-';
				++sumPartOne;
			}
		}
	}

	u8 gridCopy[136][136];

	for (u8 y = 1; y < 135; ++y) {
		for (u8 x = 1; x < 135; ++x) {
			memcpy(gridCopy, grid, 136 * 136);
			u8 c = gridCopy[y][x];
			if ((y == initialY && x == initialX) || (c != '-')) {
				continue;
			}

			gridCopy[y][x] = '#';
			currentX = initialX;
			currentY = initialY;
			directionIndex = 0;

			while (true) {
				i8 *d = directions[directionIndex];
				u8 cell = gridCopy[currentY + d[0]][currentX + d[1]];

				if (cell == '\0') {
					break;
				} else if (cell == '#') {
					directionIndex = directionIndex == 3 ? 0 : directionIndex + 1;
				} else {
					currentY += d[0];
					currentX += d[1];

					if (gridCopy[currentY][currentX] == d[2]) {
						++sumPartTwo;
						break;
					}

					gridCopy[currentY][currentX] = d[2];
				}
			}
		}
	}

	struct timeval currentTime;
	gettimeofday(&currentTime, NULL);

	printf(
		"Day 6 (ran in %ldms)\n"
		"-----\n"
		"Part one: %u\n"
		"Part two: %u\n\n",
		((currentTime.tv_sec * (int) 1e6 + currentTime.tv_usec) -
		 (startTime.tv_sec * (int) 1e6 + startTime.tv_usec)) / 1000,
		sumPartOne,
		sumPartTwo
	);

	fclose(fp);

	return 0;
}

#ifndef IS_MAIN

int main() {
	day6("ex1.txt");
}

#endif