#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>

#include "../helpers/challenge.h"
#include "../helpers/types.h"


int day5(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return 2;
	}

	u32 answerPartOne = 0;
	u32 answerPartTwo = 0;

	char line[72];
	u8 map[100][50] = {0};
	while (fgets(line, sizeof(line), fp) != NULL) {
		if (line[2] == '|') {
			u8 index = strtol(line, NULL, 10);
			map[index][++map[index][0]] = strtol(line + 3, NULL, 10);
		} else if (line[2] == ',') {
			u8 values[24] = {0};
			u8 index = 0;
			char *endPointer;
			u8 value = strtol(line, &endPointer, 10);
			while (value) {
				values[index++] = value;
				value = strtol(endPointer + 1, &endPointer, 10);
			}

			// Part one
			bool isValid = true;
			u8 i = index;
			while (--i) {
				u8 after = values[i];
				u8 j = i;
				while (j--) {
					u8 before = values[j];
					for (u8 k = 1; k <= map[after][0]; ++k) {
						if (map[after][k] == before) {
							isValid = false;
							j = 0;
							i = 1;
							break;
						}
					}
				}
			}

			if (isValid) {
				answerPartOne += values[(index - 1) / 2];
			} else {
				// Part two
				i = index;
				while (--i) {
					u8 after = values[i];
					u8 j = i;
					while (j--) {
						u8 before = values[j];
						for (u8 k = 1; k <= map[after][0]; ++k) {
							if (map[after][k] == before) {
								u8 tmp = values[i];
								values[i] = values[j];
								values[j] = tmp;
								j = 0;
								i++;
								break;
							}
						}
					}
				}

				answerPartTwo += values[(index - 1) / 2];
			}
		}
	}

	fclose(fp);

	printChallengeSummary(5, startTime, answerPartOne, answerPartTwo);

	return 0;
}

#ifndef IS_MAIN

int main() {
	day5("ex1.txt");
}

#endif