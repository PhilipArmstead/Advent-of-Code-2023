#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>

#include "../helpers/challenge.h"
#include "../helpers/types.h"


typedef struct {
	i32 x;
	i32 y;
	i8 vx;
	i8 vy;
} Bot;

static inline u32 solvePartOne(Bot *bots, u16 botLength, u8 grid[103][103], u8 height, u8 width);

static inline u32 solvePartTwo(Bot *bots, u16 botLength, u8 grid[103][103], u8 height, u8 width);

int day14(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return -1;
	}

	Bot bots[504];
	u16 botLength = 0;

	char line[48];
	char *endPointer;
	fgets(line, sizeof(line), fp);

	// NOTE: set the first line of your input to be the width and height of the grid
	//  e. g. "11 7"
	//  or    "101 103"
	u8 width = strtol(line, &endPointer, 10);
	u8 height = strtol(endPointer + 1, NULL, 10);

	u8 grid[103][103];
	for (u8 y = 0; y < height; ++y) {
		for (u8 x = 0; x < width; ++x) {
			grid[y][x] = 0;
		}
	}

	while (fgets(line, sizeof(line), fp) != NULL) {
		i8 px = (i8) strtol(line + 2, &endPointer, 10);
		i8 py = (i8) strtol(endPointer + 1, &endPointer, 10);
		i8 vx = (i8) strtol(endPointer + 3, &endPointer, 10);
		i8 vy = (i8) strtol(endPointer + 1, NULL, 10);

		Bot bot = { px, py, vx, vy };
		bots[botLength++] = bot;
		++grid[py][px];
	}

	fclose(fp);

	u32 answerPartOne = solvePartOne(bots, botLength, grid, height, width);
	u32 answerPartTwo = solvePartTwo(bots, botLength, grid, height, width);

	printChallengeSummary(14, startTime, answerPartOne, answerPartTwo + 100);
	return 0;
}

static inline u32 solvePartOne(Bot *bots, u16 botLength, u8 grid[103][103], u8 height, u8 width) {
	u8 quadrantPopulation[4] = { 0 };

	u8 xMiddle = width / 2;
	u8 yMiddle = height / 2;

	for (u16 i = 0; i < botLength; ++i) {
		Bot *bot = &bots[i];
		--grid[bot->y][bot->x];
		bot->x += (bot->vx * 100);
		bot->y += (bot->vy * 100);

		while (bot->x < 0) {
			bot->x += width;
		}
		while (bot->y < 0) {
			bot->y += height;
		}
		while (bot->x >= width) {
			bot->x -= width;
		}
		while (bot->y >= height) {
			bot->y -= height;
		}

		++grid[bot->y][bot->x];

		if (bot->y < yMiddle) {
			if (bot->x < xMiddle) {
				++quadrantPopulation[0];
			} else if (bot->x > xMiddle) {
				++quadrantPopulation[1];
			}
		} else if (bot->y > yMiddle) {
			if (bot->x < xMiddle) {
				++quadrantPopulation[2];
			} else if (bot->x > xMiddle) {
				++quadrantPopulation[3];
			}
		}
	}

	return quadrantPopulation[0] * quadrantPopulation[1] * quadrantPopulation[2] * quadrantPopulation[3];
}

static inline u32 solvePartTwo(Bot *bots, u16 botLength, u8 grid[103][103], u8 height, u8 width) {
	u16 index = 0;

	u8 mostConsecutive = 0;
	for (u32 i = 1; i < width * height; ++i) {
		for (u16 j = 0; j < botLength; ++j) {
			Bot *bot = &bots[j];
			--grid[bot->y][bot->x];
			bot->x += bot->vx;
			bot->y += bot->vy;

			while (bot->x < 0) {
				bot->x += width;
			}
			while (bot->y < 0) {
				bot->y += height;
			}
			while (bot->x >= width) {
				bot->x -= width;
			}
			while (bot->y >= height) {
				bot->y -= height;
			}

			++grid[bot->y][bot->x];
		}

		for (u8 y = 0; y < height; ++y) {
			u8 consecutive = 0;
			for (u8 x = 0; x < width; ++x) {
				if (grid[y][x]) {
					++consecutive;
				} else {
					if (consecutive > mostConsecutive) {
						mostConsecutive = consecutive;
						index = i;
					}
					consecutive = 0;
				}
			}
		}
	}

	return index;
}

#ifndef IS_MAIN

int main() {
	day14("input.txt");
}

#endif
