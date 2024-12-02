#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/time.h>

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
	size_t length;

	u32 sumPartOne = 0;
	u32 sumPartTwo = 0;

	while ((length = getline(&line, &size, fp)) != -1) {
		u8 values[10] = {strtol(line, NULL, 10)};
		u8 count = 1;
		u8 spaceStart = 0;

		for (size_t i = 0; i < length; ++i) {
			if (!spaceStart && line[i] == ' ') {
				spaceStart = i;
			} else if (spaceStart && line[i] != ' ') {
				u32 spaceEnd = i;
				values[count++] = strtol(line + spaceEnd, NULL, 10);
				spaceStart = 0;
			}
		}

		u8 faults = getFaultsWithLevels(values, count, 1);
		if (faults > 1) {
			faults = getFaultsWithLevels(values, count, -1);
		}

		if (faults == 0) {
			++sumPartOne;
		} else if (faults == 1) {
			++sumPartTwo;
		}
	}

	struct timeval currentTime;
	gettimeofday(&currentTime, NULL);

	printf(
		"Day 2 (ran in %ldμs)\n"
		"-----\n"
		"Part one: %u\n"
		"Part two: %u\n\n",
		((currentTime.tv_sec * (int) 1e6 + currentTime.tv_usec) -
		 (startTime.tv_sec * (int) 1e6 + startTime.tv_usec)),
		sumPartOne,
		sumPartOne + sumPartTwo
	);

	fclose(fp);

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

//int main() {
//	day2("ex1.txt");
//}
