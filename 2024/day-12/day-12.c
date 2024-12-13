#include <errno.h>
#include <math.h>
#include <stdlib.h>
#include <stdio.h>
#include <sys/time.h>

#include "../helpers/challenge.h"
#include "../helpers/types.h"


#define DAY_12_MAX_SIZE 142

typedef struct {
	u16 id;
	u16 area;
	u16 perimeter;
	u16 edges;
	u8 x1;
	u8 y1;
	u8 x2;
	u8 y2;
} Plot;

void walkPlot(u16 *grid, u8 y, u8 x, u8 c, Plot *plot);

int day12(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return -1;
	}

	u16 *grid = malloc(DAY_12_MAX_SIZE * DAY_12_MAX_SIZE * sizeof *grid);
	for (u8 y = 0; y < DAY_12_MAX_SIZE; ++y) {
		for (u8 x = 0; x < DAY_12_MAX_SIZE; ++x) {
			grid[y * DAY_12_MAX_SIZE + x] = '.';
		}
	}

	u8 size = 0;
	char line[144];
	u8 y = 0;
	while (fgets(line, sizeof(line), fp) != NULL) {
		u8 x = 0;
		while (true) {
			char c = line[x];

			if (c == '\0' || c == '\n') {
				if (!size) {
					size = x;
				}
				break;
			}

			grid[(y + 1) * DAY_12_MAX_SIZE + x + 1] = (u16) c;

			++x;
		}

		++y;
	}

	fclose(fp);

	u32 answerPartOne = 0;
	u32 answerPartTwo = 0;

	const u8 startingPlotId = 100;
	u16 plotId = startingPlotId + 1;

	for (y = 1; y < size + 1; ++y) {
		for (u8 x = 1; x < size + 1; ++x) {
			u16 c = grid[y * DAY_12_MAX_SIZE + x];

			if (c > startingPlotId) {
				continue;
			}

			Plot plot = { plotId, 1, 0, 0, size, size, 0, 0 };

			walkPlot(grid, y, x, c, &plot);

			answerPartOne += plot.area * plot.perimeter;
			answerPartTwo += plot.area * plot.edges;

			++plotId;
		}
	}

	printChallengeSummary(12, startTime, answerPartOne, answerPartTwo);
	return 0;
}

void walkPlot(u16 *grid, u8 y, u8 x, u8 c, Plot *plot) {
	grid[y * DAY_12_MAX_SIZE + x] = plot->id;

	u16 up = grid[(y - 1) * DAY_12_MAX_SIZE + x];
	u16 right = grid[y * DAY_12_MAX_SIZE + x + 1];
	u16 down = grid[(y + 1) * DAY_12_MAX_SIZE + x];
	u16 left = grid[y * DAY_12_MAX_SIZE + x - 1];
	if (up != plot->id && up != c) {
		if (right != plot->id && right != c) ++plot->edges;
		if (left != plot->id && left != c) ++plot->edges;
	}
	if (down != plot->id && down != c) {
		if (right != plot->id && right != c) ++plot->edges;
		if (left != plot->id && left != c) ++plot->edges;
	}
	if (up == plot->id || up == c) {
		u16 upLeft = grid[(y - 1) * DAY_12_MAX_SIZE + x - 1];
		if (upLeft != plot->id && upLeft != c && (left == plot->id || left == c)) ++plot->edges;
		u16 upRight = grid[(y - 1) * DAY_12_MAX_SIZE + x + 1];
		if (upRight != plot->id && upRight != c && (right == plot->id || right == c)) ++plot->edges;
	}
	if (down == plot->id || down == c) {
		u16 downLeft = grid[(y + 1) * DAY_12_MAX_SIZE + x - 1];
		if (downLeft != plot->id && downLeft != c && (left == plot->id || left == c)) ++plot->edges;
		u16 downRight = grid[(y + 1) * DAY_12_MAX_SIZE + x + 1];
		if (downRight != plot->id && downRight != c && (right == plot->id || right == c)) ++plot->edges;
	}

	for (u8 i = 0; i < 4; ++i) {
		i8 dY = directions[i][0];
		i8 dX = directions[i][1];

		u16 nC = grid[(y + dY) * DAY_12_MAX_SIZE + x + dX];
		if (nC == c) {
			++plot->area;
			walkPlot(grid, y + dY, x + dX, c, plot);
		} else if (nC != grid[y * DAY_12_MAX_SIZE + x]) {
			++plot->perimeter;
		}
	}
}

#ifndef IS_MAIN

int main() {
	day12("input.txt");
}

#endif
