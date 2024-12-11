#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>

#include "../helpers/challenge.h"
#include "../helpers/types.h"


typedef struct {
	u32 initial;
	u64 finalSize;
} CachedNumber;

typedef struct {
	CachedNumber numbers[3800];
	u16 length;
} CachedSteps;

u64 solve(u64 value, u8 steps, CachedSteps *cache);

int day11(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return -1;
	}

	char line[40];
	fgets(line, sizeof(line), fp);

	u32 answerPartOne = 0;
	u64 answerPartTwo = 0;

	CachedSteps *cache = malloc(75 * sizeof(CachedSteps));
	for (u8 i = 0; i < 75; ++i) {
		cache[i].length = 0;
	}

	char *endPointer = line;
	do {
		while (endPointer[0] == ' ') {
			++endPointer;
		}

		u64 v = strtol(endPointer, &endPointer, 10);
		answerPartOne += solve(v, 25, cache);
		answerPartTwo += solve(v, 75, cache);
	} while (endPointer[0] != '\0' && endPointer[0] != '\n');


	fclose(fp);
	free(cache);

	printChallengeSummary(11, startTime, answerPartOne, answerPartTwo);

	return 0;
}

u64 solve(u64 value, u8 steps, CachedSteps *cache) {
	if (!steps) {
		return 1;
	}

	CachedSteps c = cache[steps];
	for (u16 i = 0; i < c.length; ++i) {
		if (c.numbers[i].initial == value) {
			return c.numbers[i].finalSize;
		}
	}

	u64 result;
	if (!value) {
		result = solve(1, steps - 1, cache);
	} else {

		char text[16];
		sprintf(text, "%llu", value);
		u8 textLength = 0;

		while (text[++textLength] != '\0');

		if (!(textLength & 1)) {
			u8 middle = textLength / 2;
			u32 pow = 1;
			u64 left = 0;
			for (u8 k = middle; k; --k) {
				left += (text[k - 1] - 48) * pow;
				pow *= 10;
			}

			pow = 1;
			u64 right = 0;
			for (u8 k = textLength; k > middle; --k) {
				right += (text[k - 1] - 48) * pow;
				pow *= 10;
			}

			result = solve(left, steps - 1, cache) + solve(right, steps - 1, cache);
		} else {
			result = solve(value * 2024, steps - 1, cache);
		}
	}

	cache[steps].numbers[cache[steps].length++] = (CachedNumber) {value, result};

	return result;
}

#ifndef IS_MAIN

int main() {
	day11("input.txt");
}

#endif
