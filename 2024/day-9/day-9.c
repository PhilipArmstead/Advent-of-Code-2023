#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>

#include "../helpers/challenge.h"
#include "../helpers/types.h"


int day9(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	char *line = malloc(20008);

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return -1;
	}

	fgets(line, 20008, fp);
	fclose(fp);

	u16 tail = 0;
	while (line[tail + 1] != '\0' && line[tail + 1] != '\n') {
		++tail;
	}

	u64 answerPartOne = 0;
	u16 answerPartTwo = 0;

	u16 *data = malloc(32768);

	u16 head = 0;
	u16 startId = 0;
	u16 endId = tail / 2;
	u8 availableGaps = 0;
	u8 requiredGaps = line[tail] - 48;
	u16 dataIndex = 0;

	while (head < tail) {
		u8 value = line[head++] - 48;
		for (u8 i = 0; i < value; ++i) {
			answerPartOne += startId * dataIndex;
			data[dataIndex++] = startId;
		}

		availableGaps += line[head] - 48;
		while (availableGaps) {
			u8 t = availableGaps < requiredGaps ? availableGaps : requiredGaps;
			for (u8 i = 0; i < t; ++i) {
				answerPartOne += endId * dataIndex;
				data[dataIndex++] = endId;
				--availableGaps;
				--requiredGaps;
			}

			if (!requiredGaps) {
				--endId;
				tail -= 2;
				requiredGaps += line[tail] - 48;
			}
		}

		++head;
		++startId;
	}

	while (requiredGaps--) {
		answerPartOne += endId * dataIndex;
		data[dataIndex++] = endId;
	}

	free(line);
	free(data);

	printChallengeSummary(9, startTime, answerPartOne, answerPartTwo);

	return 0;
}

#ifndef IS_MAIN

int main() {
	day9("ex1.txt");
}

#endif
