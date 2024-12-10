#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>

#include "../helpers/challenge.h"
#include "../helpers/types.h"


typedef struct {
	u16 start;
	u16 end;
	u32 indices[2048];
} BlankSlot;


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

	u64 answerPartOne = 0;
	u64 answerPartTwo = 0;

	u16 *data = malloc(131072 * sizeof *data);
	u16 *data2 = malloc(131072 * sizeof *data2);
	BlankSlot blanks[10] = {0};

	u32 head = 0;
	u16 id = 1;
	u32 dataLength = 0;
	while (true) {
		u8 value = (line[head++] - 48);
		while (value--) {
			data[dataLength] = id;
			data2[dataLength] = id;
			++dataLength;
		}

		if (line[head] == '\0' || line[head] == '\n') {
			break;
		}

		value = line[head] - 48;
		++head;
		blanks[value].indices[blanks[value].end++] = dataLength;
		while (value--) {
			data[dataLength] = 0;
			data2[dataLength] = 0;
			++dataLength;
		}

		++id;
	}

	u16 lineLength = head;

	// Part one
	head = 0;
	u32 tail = dataLength - 1;
	while (head < tail) {
		if (data[head] == 0) {
			data[head] = data[tail];
			--tail;
		}

		answerPartOne += (data[head] - 1) * head;
		++head;

		while (data[tail] == 0) {
			--tail;
		}
	}
	answerPartOne += (data[head] - 1) * head;

	// Part two
	u32 dataTail = dataLength - 1;
	u16 lineTail = lineLength - 1;
	while (lineTail) {
		u8 value = line[lineTail] - 48;

		u32 earliestIndex = 0;
		u8 slotIndex = 0;
		for (u8 i = value; i < 10; ++i) {
			BlankSlot slot = blanks[i];
			if (slot.end && slot.start < slot.end && (!earliestIndex || slot.indices[slot.start] < earliestIndex)) {
				earliestIndex = slot.indices[slot.start];
				slotIndex = i;
			}
		}

		if (earliestIndex && earliestIndex < dataTail) {
			for (u8 i = 0; i < value; ++i) {
				data2[dataTail] = 0;
				data2[earliestIndex] = id;

				--dataTail;
				++earliestIndex;
			}
			++blanks[slotIndex].start;

			if (value < slotIndex) {
				u8 diff = slotIndex - value;
				u16 newIndex = blanks[diff].start;
				for (; newIndex < blanks[diff].end; ++newIndex) {
					if (earliestIndex < blanks[diff].indices[newIndex]) {
						break;
					}
				}

				if (blanks[diff].start && newIndex == blanks[diff].start) {
					blanks[diff].indices[blanks[diff].start - 1] = earliestIndex;
					--blanks[diff].start;
				} else {
					for (u16 j = blanks[diff].end; j > newIndex; --j) {
						blanks[diff].indices[j] = blanks[diff].indices[j - 1];
					}
					blanks[diff].indices[newIndex] = earliestIndex;
					++blanks[diff].end;
				}
			}
		} else {
			dataTail -= value;
		}

		if (blanks[1].indices[blanks[1].start] >= dataTail) {
			break;
		}

		--lineTail;

		dataTail -= line[lineTail] - 48;

		--lineTail;
		--id;
	}

	for (u32 i = 0; i < dataLength; ++i) {
		if (data2[i]) {
			answerPartTwo += (data2[i] - 1) * i;
		}
	}

	free(line);
	free(data);
	free(data2);

	printChallengeSummary(9, startTime, answerPartOne, answerPartTwo);

	return 0;
}

#ifndef IS_MAIN

int main() {
	day9("input.txt");
}

#endif
