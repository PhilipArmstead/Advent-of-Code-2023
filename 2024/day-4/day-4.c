#include <errno.h>
#include <stdio.h>
#include <sys/time.h>

#include "../helpers/challenge.h"
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

	fclose(fp);

	u8 height = row;

	u32 answerPartOne = 0;
	u32 answerPartTwo = 0;

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
						++answerPartOne;
					}
					if (
						column >= 3 &&
						grid[row][column - 1] == 'M' &&
						grid[row][column - 2] == 'A' &&
						grid[row][column - 3] == 'S'
						) {
						++answerPartOne;
					}
					if (
						row < height - 3 &&
						grid[row + 1][column] == 'M' &&
						grid[row + 2][column] == 'A' &&
						grid[row + 3][column] == 'S'
						) {
						++answerPartOne;
					}
					if (
						row >= 3 &&
						grid[row - 1][column] == 'M' &&
						grid[row - 2][column] == 'A' &&
						grid[row - 3][column] == 'S'
						) {
						++answerPartOne;
					}
					if (
						row < height - 3 &&
						column < width - 3 &&
						grid[row + 1][column + 1] == 'M' &&
						grid[row + 2][column + 2] == 'A' &&
						grid[row + 3][column + 3] == 'S'
						) {
						++answerPartOne;
					}
					if (
						row >= 3 &&
						column >= 3 &&
						grid[row - 1][column - 1] == 'M' &&
						grid[row - 2][column - 2] == 'A' &&
						grid[row - 3][column - 3] == 'S'
						) {
						++answerPartOne;
					}
					if (
						row >= 3 &&
						column < width - 3 &&
						grid[row - 1][column + 1] == 'M' &&
						grid[row - 2][column + 2] == 'A' &&
						grid[row - 3][column + 3] == 'S'
						) {
						++answerPartOne;
					}
					if (
						row < height - 3 &&
						column >= 3 &&
						grid[row + 1][column - 1] == 'M' &&
						grid[row + 2][column - 2] == 'A' &&
						grid[row + 3][column - 3] == 'S'
						) {
						++answerPartOne;
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
						++answerPartTwo;
					}
				}
			}
		}
	}

	printChallengeSummary(4, startTime, answerPartOne, answerPartTwo);

	return 0;
}

#ifndef IS_MAIN

int main() {
	day4("ex1.txt");
}

#endif