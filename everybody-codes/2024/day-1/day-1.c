#include <errno.h>
#include <stdio.h>
#include <sys/time.h>

#include "../../helpers/challenge.h"
#include "../../helpers/types.h"


u16 day1Part3(bool isTesting) {
#ifdef IS_MAIN
	char *filePath = isTesting ? "day-1/ex3.txt" : "day-1/input3.txt";
#else
	char *filePath = isTesting ? "ex3.txt" : "input3.txt";
#endif

	FILE *fp = fopen(filePath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filePath, errno);
		return 2;
	}

	char line[9008];
	u16 i = 0;
	u16 answer = 0;
	while (fgets(line, sizeof(line), fp) != NULL) {
		while (line[i] != '\0' && line[i] != '\n') {
			u8 xCount = 0;

			for (u8 j = 0; j < 3; ++j, ++i) {
				if (line[i] == 'B') {
					answer += 1;
				} else if (line[i] == 'C') {
					answer += 3;
				} else if (line[i] == 'D') {
					answer += 5;
				} else if (line[i] == 'x') {
					++xCount;
				}
			}

			if (xCount == 0) {
				answer += 6;
			} else if (xCount == 1) {
				answer += 2;
			}
		}
	}

	fclose(fp);

	return answer;
}

u16 day1Part2(bool isTesting) {
#ifdef IS_MAIN
	char *filePath = isTesting ? "day-1/ex2.txt" : "day-1/input2.txt";
#else
	char *filePath = isTesting ? "ex2.txt" : "input2.txt";
#endif

	FILE *fp = fopen(filePath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filePath, errno);
		return 2;
	}

	char line[2008];
	u16 i = 0;
	u16 answer = 0;
	while (fgets(line, sizeof(line), fp) != NULL) {
		while (line[i] != '\0' && line[i] != '\n') {
			u8 xCount = 0;

			for (u8 j = 0; j < 2; ++j, ++i) {
				if (line[i] == 'B') {
					answer += 1;
				} else if (line[i] == 'C') {
					answer += 3;
				} else if (line[i] == 'D') {
					answer += 5;
				} else if (line[i] == 'x') {
					++xCount;
				}
			}

			if (!xCount) {
				answer += 2;
			}
		}
	}

	fclose(fp);

	return answer;
}

u16 day1Part1(bool isTesting) {
#ifdef IS_MAIN
	char *filePath = isTesting ? "day-1/ex1.txt" : "day-1/input1.txt";
#else
	char *filePath = isTesting ? "ex1.txt" : "input1.txt";
#endif

	FILE *fp = fopen(filePath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filePath, errno);
		return 2;
	}

	char line[1008];
	u16 i = 0;
	u16 answer = 0;
	while (fgets(line, sizeof(line), fp) != NULL) {
		while (line[i] != '\0' && line[i] != '\n') {

			if (line[i] == 'B') {
				answer += 1;
			} else if (line[i] == 'C') {
				answer += 3;
			}

			++i;
		}
	}

	fclose(fp);

	return answer;
}

u8 day1(bool isTesting) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	u16 answerPart1 = day1Part1(isTesting);
	u16 answerPart2 = day1Part2(isTesting);
	u16 answerPart3 = day1Part3(isTesting);

	printChallengeSummary(1, startTime, answerPart1, answerPart2, answerPart3);

	return 0;
}

#ifndef IS_MAIN

int main() {
	day1(false);
}

#endif