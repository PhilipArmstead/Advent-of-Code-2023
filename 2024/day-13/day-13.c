#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>

#include "../helpers/challenge.h"
#include "../helpers/types.h"


inline static u64 solveCrossMultiply(u8 ax, u8 ay, u8 bx, u8 by, u64 px, u64 py);

int day13(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return -1;
	}

	u64 answerPartOne = 0;
	u64 answerPartTwo = 0;
	u64 partTwoBump = 10000000000000;

	char line[48];
	while (fgets(line, sizeof(line), fp) != NULL) {
		char *endPointer;
		u8 ax = strtol(line + 12, &endPointer, 10);
		u8 ay = strtol(endPointer + 4, NULL, 10);

		fgets(line, sizeof(line), fp);
		u8 bx = strtol(line + 12, &endPointer, 10);
		u8 by = strtol(endPointer + 4, NULL, 10);

		fgets(line, sizeof(line), fp);
		u64 px = strtoll(line + 9, &endPointer, 10);
		u64 py = strtoll(endPointer + 4, NULL, 10);

		answerPartOne += solveCrossMultiply(ax, ay, bx, by, px, py);
		answerPartTwo += solveCrossMultiply(ax, ay, bx, by, px + partTwoBump, py + partTwoBump);

		fgets(line, sizeof(line), fp);
	}

	fclose(fp);

	printChallengeSummary(13, startTime, answerPartOne, answerPartTwo);
	return 0;
}

inline static u64 solveCrossMultiply(u8 ax, u8 ay, u8 bx, u8 by, u64 px, u64 py) {
	i64 a = (i64) (px * by - py * bx) / (ax * by - ay * bx);
	i64 b = (i64) (py * ax - px * ay) / (ax * by - ay * bx);

	if (ax * a + bx * b == px && ay * a + by * b == py) {
		return a * 3 + b;
	}

	return 0;
}

#ifndef IS_MAIN

int main() {
	day13("input.txt");
}

#endif
