#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>

#include "../helpers/challenge.h"
#include "../helpers/types.h"


u8 getFaultsWithLevels(u8 *values, u8 length, char direction);

bool isLevelSafe(char direction, i32 value, i32 lastValue);

int day2(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return 2;
	}

	char *line = NULL;
	size_t size = 0;

	u32 answerPartOne = 0;
	u32 answerPartTwo = 0;

	while (getline(&line, &size, fp) != -1) {
		char *endPointer;
		u8 values[10] = {strtol(line, &endPointer, 10)};
		u8 count = 1;

		while (endPointer[0] != '\0' && endPointer[0] != '\n') {
			values[count++] = strtol(endPointer, &endPointer, 10);
		}

		u8 faults = getFaultsWithLevels(values, count, 1);
		if (faults > 1) {
			faults = getFaultsWithLevels(values, count, -1);
		}

		if (faults == 0) {
			++answerPartOne;
		} else if (faults == 1) {
			++answerPartTwo;
		}
	}

	fclose(fp);

	printChallengeSummary(2, startTime, answerPartOne, answerPartOne + answerPartTwo);

	return 0;
}

u8 getFaultsWithLevels(u8 *values, u8 length, char direction) {
	i8 lastLastIndex = -1;
	u8 lastIndex = 0;
	char unsafeCount = 0;

	for (u8 index = 1; index < length; ++index) {
		if (isLevelSafe(direction, values[index], values[lastIndex])) {
			lastLastIndex = lastIndex;
			lastIndex = index;
		} else {
			++unsafeCount;

			if (unsafeCount > 1) {
				return unsafeCount;
			}

			if (lastLastIndex != -1) {
				if (isLevelSafe(direction, values[index], values[lastLastIndex])) {
					lastIndex = index;
				}
			} else {
				if (isLevelSafe(direction, values[index + 1], values[index])) {
					lastLastIndex = lastIndex;
					lastIndex = index;
				} else if (isLevelSafe(direction, values[index + 1], values[lastIndex])) {
					lastLastIndex = lastIndex;
				}
			}
		}
	}

	return unsafeCount;
}

bool isLevelSafe(char direction, i32 value, i32 lastValue) {
	if (value == lastValue) {
		return false;
	} else if (direction == 1) {
		if (value < lastValue || value > lastValue + 3) {
			return false;
		}
	} else if (value > lastValue || value < lastValue - 3) {
		return false;
	}

	return true;
}

#ifndef IS_MAIN

int main() {
	day2("ex1.txt");
}

#endif
