#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>

#include "../helpers/types.h"


int day5(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return 2;
	}

	u32 sumPartOne = 0;
	u32 sumPartTwo = 0;

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
				sumPartOne += values[(index - 1) / 2];
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

				sumPartTwo += values[(index - 1) / 2];
			}
		}
	}

	struct timeval currentTime;
	gettimeofday(&currentTime, NULL);

	printf(
		"Day 5 (ran in %ldμs)\n"
		"-----\n"
		"Part one: %u\n"
		"Part two: %u\n\n",
		((currentTime.tv_sec * (int) 1e6 + currentTime.tv_usec) -
		 (startTime.tv_sec * (int) 1e6 + startTime.tv_usec)),
		sumPartOne,
		sumPartTwo
	);

	fclose(fp);

	return 0;
}

//int main() {
//	day5("ex1.txt");
//}
