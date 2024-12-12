#include <errno.h>
#include <stdio.h>
#include <sys/time.h>

#include "../helpers/challenge.h"
#include "../helpers/types.h"


typedef struct {
	u8 x;
	u8 y;
} Point;

void getTrailheadCount(
	u8 grid[64][64],
	Point point,
	u8 gridSize,
	Point seenPeaks[128],
	u8 *seenPeakCount,
	u16 *answerPartOne,
	u16 *answerPartTwo
);

int day10(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return -1;
	}

	u8 grid[64][64];
	Point origin[382];
	u16 originCount = 0;
	u8 size = 0;
	{
		char line[64];
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

				grid[y][x] = c - 48;
				if (c == '0') {
					origin[originCount++] = (Point) {x, y};
				}

				++x;
			}

			++y;
		}

		fclose(fp);
	}

	u16 answerPartOne = 0;
	u16 answerPartTwo = 0;
	for (u16 o = 0; o < originCount; ++o) {
		Point seenPeaks[128];
		u8 seenPeakCount = 0;
		getTrailheadCount(
			grid,
			origin[o],
			size,
			seenPeaks,
			&seenPeakCount,
			&answerPartOne,
			&answerPartTwo
		);
	}

	printChallengeSummary(10, startTime, answerPartOne, answerPartTwo);

	return 0;
}

void getTrailheadCount(
	u8 grid[64][64],
	Point point,
	u8 gridSize,
	Point seenPeaks[128],
	u8 *seenPeakCount,
	u16 *answerPartOne,
	u16 *answerPartTwo
) {
	if (grid[point.y][point.x] == 9) {
		++(*answerPartTwo);

		for (u8 i = 0; i < *seenPeakCount; ++i) {
			if (seenPeaks[i].x == point.x && seenPeaks[i].y == point.y) {
				return;
			}
		}

		seenPeaks[(*seenPeakCount)++] = (Point) {point.x, point.y};
		++(*answerPartOne);
		return;
	}

	for (u8 d = 0; d < 4; ++d) {
		Point dPoint = {point.x + directions[d][1], point.y + directions[d][0]};
		if (
			dPoint.x >= 0 &&
			dPoint.x < gridSize &&
			dPoint.y >= 0 &&
			dPoint.y < gridSize &&
			grid[dPoint.y][dPoint.x] == grid[point.y][point.x] + 1
			) {
			getTrailheadCount(grid, dPoint, gridSize, seenPeaks, seenPeakCount, answerPartOne, answerPartTwo);
		}
	}
}

#ifndef IS_MAIN

int main() {
	day10("input.txt");
}

#endif
