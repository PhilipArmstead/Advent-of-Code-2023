#include <errno.h>
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
	u8 x1;
	u8 y1;
	u8 x2;
	u8 y2;
} Plot;

u16 getEdgesFromPlot(const u16 *grid, Plot *plot);

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

	u8 queue[116];

	for (y = 1; y < size + 1; ++y) {
		for (u8 x = 1; x < size + 1; ++x) {
			u16 c = grid[y * DAY_12_MAX_SIZE + x];

			if (c > startingPlotId) {
				continue;
			}

			Plot plot = {plotId, 1, 0, size, size, 0, 0};
			grid[y * DAY_12_MAX_SIZE + x] = plot.id;

			u8 qHead = 0;
			u8 qTail = 2;
			queue[0] = y;
			queue[1] = x;

			while (qHead != qTail) {
				u8 qY = queue[qHead];
				u8 qX = queue[qHead + 1];

				if (qY < plot.y1) {
					plot.y1 = qY;
				}
				if (qY > plot.y2) {
					plot.y2 = qY;
				}
				if (qX < plot.x1) {
					plot.x1 = qX;
				}
				if (qX > plot.x2) {
					plot.x2 = qX;
				}

				for (u8 i = 0; i < 4; ++i) {
					i8 dY = directions[i][0];
					i8 dX = directions[i][1];

					u16 nC = grid[(qY + dY) * DAY_12_MAX_SIZE + qX + dX];
					if (nC == c) {
						++plot.area;
						grid[(qY + dY) * DAY_12_MAX_SIZE + qX + dX] = plot.id;
						queue[qTail] = qY + dY;
						queue[qTail + 1] = qX + dX;
						qTail += 2;
					} else if (nC != grid[qY * DAY_12_MAX_SIZE + qX]) {
						++plot.perimeter;
					}
				}

				qHead += 2;
			}

			answerPartOne += plot.area * plot.perimeter;
			answerPartTwo += getEdgesFromPlot(grid, &plot);

			++plotId;
		}
	}

	free(grid);

	printChallengeSummary(12, startTime, answerPartOne, answerPartTwo);
	return 0;
}

u16 getEdgesFromPlot(const u16 *grid, Plot *plot) {
	u16 edges = 0;
	bool isInGroup = false;

	i16 steps[2] = {-1, 1};

	// Horizontal edges
	for (u8 i = 0; i < 2; ++i) {
		for (i16 j = plot->y1; j < plot->y2 + 1; ++j) {
			for (i16 k = plot->x1; k < plot->x2 + 1; ++k) {
				if (grid[j * 142 + k] == plot->id && grid[(j + steps[i]) * 142 + k] != plot->id) {
					isInGroup = true;
				} else if (isInGroup) {
					isInGroup = false;
					++edges;
				}
			}

			if (isInGroup) {
				++edges;
			}
			isInGroup = false;
		}
	}

	// Vertical edges
	for (u8 i = 0; i < 2; ++i) {
		for (i16 j = plot->x1; j < plot->x2 + 1; ++j) {
			for (i16 k = plot->y1; k < plot->y2 + 1; ++k) {
				if (grid[k * 142 + j] == plot->id && grid[k * 142 + j + steps[i]] != plot->id) {
					isInGroup = true;
				} else if (isInGroup) {
					isInGroup = false;
					++edges;
				}
			}

			if (isInGroup) {
				++edges;
			}
			isInGroup = false;
		}
	}

	return edges * plot->area;
}

#ifndef IS_MAIN

int main() {
	day12("input.txt");
}

#endif
