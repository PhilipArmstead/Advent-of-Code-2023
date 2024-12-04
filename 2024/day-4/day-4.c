#include <errno.h>
#include <stdio.h>
#include <sys/time.h>

#include "../helpers/types.h"


int day4(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return 2;
	}

	char line[144];
	u8 row = 0;
	u8 column = 0;
	char grid[140][140];
	u8 width = 0;
	while (fgets(line, sizeof(line), fp) != NULL) {
		while (true) {
			char c = line[column];

			if (c == '\0' || c == '\n') {
				if (!width) {
					width = column;
				}
				++row;
				column = 0;
				break;
			} else {
				grid[row][column] = c;
				++column;
			}
		}
	}

	u8 height = row;

	u32 sumPartOne = 0;
	u32 sumPartTwo = 0;

	for (row = 0; row < height; ++row) {
		for (column = 0; column < width; ++column) {
			// Part one
			{
				if (grid[row][column] == 'X') {
					if (
						column < width - 3 &&
						grid[row][column + 1] == 'M' &&
						grid[row][column + 2] == 'A' &&
						grid[row][column + 3] == 'S'
					) {
						++sumPartOne;
					}
					if (
						column >= 3 &&
						grid[row][column - 1] == 'M' &&
						grid[row][column - 2] == 'A' &&
						grid[row][column - 3] == 'S'
					) {
						++sumPartOne;
					}
					if (
						row < height - 3 &&
						grid[row + 1][column] == 'M' &&
						grid[row + 2][column] == 'A' &&
						grid[row + 3][column] == 'S'
					) {
						++sumPartOne;
					}
					if (
						row >= 3 &&
						grid[row - 1][column] == 'M' &&
						grid[row - 2][column] == 'A' &&
						grid[row - 3][column] == 'S'
					) {
						++sumPartOne;
					}
					if (
						row < height - 3 &&
						column < width - 3 &&
						grid[row + 1][column + 1] == 'M' &&
						grid[row + 2][column + 2] == 'A' &&
						grid[row + 3][column + 3] == 'S'
					) {
						++sumPartOne;
					}
					if (
						row >= 3 &&
						column >= 3 &&
						grid[row - 1][column - 1] == 'M' &&
						grid[row - 2][column - 2] == 'A' &&
						grid[row - 3][column - 3] == 'S'
					) {
						++sumPartOne;
					}
					if (
						row >= 3 &&
						column < width - 3 &&
						grid[row - 1][column + 1] == 'M' &&
						grid[row - 2][column + 2] == 'A' &&
						grid[row - 3][column + 3] == 'S'
					) {
						++sumPartOne;
					}
					if (
						row < height - 3 &&
						column >= 3 &&
						grid[row + 1][column - 1] == 'M' &&
						grid[row + 2][column - 2] == 'A' &&
						grid[row + 3][column - 3] == 'S'
					) {
						++sumPartOne;
					}
				}
			}

			// Part two
			{
				if (
					row < height - 2 &&
					column < width - 2 &&
					grid[row + 1][column + 1] == 'A' &&
					(
						(grid[row][column] == 'M' && grid[row + 2][column + 2] == 'S') ||
						(grid[row][column] == 'S' && grid[row + 2][column + 2] == 'M')
					)
					) {
					if (
						(grid[row][column + 2] == 'M' && grid[row + 2][column] == 'S') ||
						(grid[row][column + 2] == 'S' && grid[row + 2][column] == 'M')
						) {
						++sumPartTwo;
					}
				}
			}
		}
	}

	struct timeval currentTime;
	gettimeofday(&currentTime, NULL);

	printf(
		"Day 4 (ran in %ldμs)\n"
		"-----\n"
		"Part one: %u\n"
		"Part two: %u\n\n",
		((currentTime.tv_sec * (int) 1e6 + currentTime.tv_usec) -
		 (startTime.tv_sec * (int) 1e6 + startTime.tv_usec)),
		sumPartOne,
		sumPartTwo
	);

	fclose(fp);

	return 0;
}

//int main() {
//	day4("ex1.txt");
//}
