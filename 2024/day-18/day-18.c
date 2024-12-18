#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/time.h>

#include "../helpers/challenge.h"
#include "../helpers/types.h"


static inline u16 solveMazeDay18(u32 *queue, u8 grid[71][71], u16 size, u8 seenMask);

int day18(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return -1;
	}

	char line[8];
	char *endPointer;
	u8 grid[71][71];

	for (u8 y = 0; y < 71; ++y) {
		for (u8 x = 0; x < 71; ++x) {
			grid[y][x] = 1;
		}
	}

	u8 coordinates[3450][2];
	u16 coordinateLength = 0;

	fgets(line, sizeof(line), fp);
	u16 byteCount = strtol(line, NULL, 10);

	u8 size = 0;
	while (fgets(line, sizeof(line), fp) != NULL) {
		u8 x = strtol(line, &endPointer, 10);
		u8 y = strtol(endPointer + 1, NULL, 10);

		coordinates[coordinateLength][0] = x;
		coordinates[coordinateLength][1] = y;

		if (x > size) {
			size = x;
		}
		if (y > size) {
			size = y;
		}

		if (coordinateLength < byteCount) {
			grid[y][x] = 0;
		}

		++coordinateLength;
	}

	fclose(fp);

	// pack 1 byte for x and y and 2 bytes for steps in to a four-byte array
	u32 *queue = malloc(4096 * sizeof(u32));

	u32 answerPartOne = solveMazeDay18(queue, grid, size, 's');

	char answerPartTwo[8];
	u8 seenMask = 0;
	u16 c = byteCount;
	{
		while (true) {
			++seenMask;
			while (seenMask < 2) {
				++seenMask;
			}
			grid[coordinates[c][1]][coordinates[c][0]] = 0;

			if (!solveMazeDay18(queue, grid, size, seenMask)) {
				snprintf(answerPartTwo, 8, "%d,%d", coordinates[c][0], coordinates[c][1]);
				break;
			}

			++c;
		}
	}

	printChallengeSummaryDay18(18, startTime, answerPartOne, answerPartTwo);

	free(queue);

	return 0;
}

static inline u16 solveMazeDay18(u32 *queue, u8 grid[71][71], u16 size, u8 seenMask) {
	u16 requiredSteps = 0;
	queue[0] = 0;
	u16 queueHead = 0;
	u16 queueTail = 1;
	while (queueHead < queueTail && !requiredSteps) {
		u32 q = queue[queueHead++];
		u8 x = (q >> (8 * 0)) & 0xff;
		u8 y = (q >> (8 * 1)) & 0xff;
		u16 steps = (q >> (8 * 2)) & 0xffff;

		for (u8 d = 0; d < 4; ++d) {
			u8 ny = y + directions[d][0];
			u8 nx = x + directions[d][1];

			if (
				(x == 0 && directions[d][1] == -1)
				|| (y == 0 && directions[d][0] == -1)
				|| ny > size
				|| nx > size
				|| grid[ny][nx] == 0
				|| grid[ny][nx] == seenMask
				) {
				continue;
			}

			if (nx == size && ny == size) {
				requiredSteps = steps + 1;
				break;
			}

			grid[ny][nx] = seenMask;

			queue[queueTail++] = ((steps + 1) << 16) + (ny << 8) + nx;
		}
	}

	return requiredSteps;
}

#ifndef IS_MAIN

int main() {
	day18("input.txt");
}

#endif
