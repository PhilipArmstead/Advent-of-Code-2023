#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>

#include "../helpers/challenge.h"
#include "../helpers/types.h"


bool isValid(u64 target, u64 sum, const u16 values[12], u8 length, bool isPartTwo, u8 index);

u64 concatenateIntegers(u64 x, u64 y);

int day7(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	u64 answerPartOne = 0;
	u64 answerPartTwo = 0;

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return -1;
	}

	char line[64];
	while (fgets(line, sizeof(line), fp) != NULL) {
		char *endPointer;
		u64 target = strtoll(line, &endPointer, 10);
		endPointer += 2;

		u16 values[12];
		u8 length = 0;
		while (endPointer[0] != '\0' && endPointer[0] != '\n') {
			values[length++] = strtol(endPointer, &endPointer, 10);
		}

		if (isValid(target, values[0], values, length, false, 1)) {
			answerPartOne += target;
		} else if (isValid(target, values[0], values, length, true, 1)) {
			answerPartTwo += target;
		}
	}

	fclose(fp);

	printChallengeSummary(7, startTime, answerPartOne, answerPartOne + answerPartTwo);

	return 0;
}

bool isValid(u64 target, u64 sum, const u16 values[12], u8 length, bool isPartTwo, u8 index) {
	if (index == length) {
		return target == sum;
	} else if (sum > target) {
		return false;
	}

	return
		isValid(target, sum * values[index], values, length, isPartTwo, index + 1) ||
		isValid(target, sum + values[index], values, length, isPartTwo, index + 1) ||
		isPartTwo && isValid(target, concatenateIntegers(sum, values[index]), values, length, isPartTwo, index + 1);
}

u64 concatenateIntegers(u64 x, u64 y) {
	u64 pow = 10;
	while (y >= pow) {
		pow *= 10;
	}
	return x * pow + y;
}

#ifndef IS_MAIN

int main() {
	day7("ex1.txt");
}

#endif