#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>

#include "../helpers/challenge.h"
#include "../helpers/types.h"


int day3(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return 2;
	}

	u32 answerPartOne = 0;
	u32 answerPartTwo = 0;

	bool isEnabled = true;

	char line[4096];
	while (fgets(line, sizeof(line), fp) != NULL) {
		bool breakLine = false;
		size_t i = 0;
		while (!breakLine) {
			while (line[i] != 'm' && line[i] != 'd') {
				if (line[i] == '\0' || line[i] == '\n') {
					breakLine = true;
					break;
				}

				++i;
			}

			if (line[i] == 'd' && line[i + 1] == 'o') {
				if (line[i + 2] == 'n' && line[i + 3] == '\'' && line[i + 4] == 't') {
					isEnabled = false;
				} else {
					isEnabled = true;
				}
			} else if (line[i] == 'm') {
				if (line[i + 1] != 'u') {
					++i;
					continue;
				} else if (line[i + 2] != 'l') {
					i += 2;
					continue;
				} else if (line[i + 3] != '(') {
					i += 3;
					continue;
				}

				i += 4;
				size_t startFirst = i;

				while (line[i] >= '0' && line[i] <= '9') {
					++i;
				}

				if (line[i] != ',') {
					continue;
				}

				++i;

				size_t startSecond = i;

				while (line[i] >= '0' && line[i] <= '9') {
					++i;
				}

				if (line[i] != ')') {
					continue;
				}

				u16 value1 = strtol(line + startFirst, NULL, 10);
				u16 value2 = strtol(line + startSecond, NULL, 10);

				answerPartOne += (value1 * value2);

				if (isEnabled) {
					answerPartTwo += (value1 * value2);
				}
			}

			++i;
		}
	}

	fclose(fp);

	printChallengeSummary(3, startTime, answerPartOne, answerPartTwo);

	return 0;
}

#ifndef IS_MAIN

int main() {
	day3("ex2.txt");
}

#endif