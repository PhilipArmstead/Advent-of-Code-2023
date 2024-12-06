#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>

#include "../helpers/types.h"


void quickSort(u32 *values, i32 low, i32 high);

int day1(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return 2;
	}

	char *line = NULL;
	size_t size = 0;

	u32 listOne[1000] = {};
	u32 listTwo[1000] = {};
	i16 length = 0;

	char *endPointer;
	while (getline(&line, &size, fp) != -1) {
		listOne[length] = strtol(line, &endPointer, 10);
		listTwo[length] = strtol(endPointer, NULL, 10);

		++length;
	}

	// Having to implement quick sort on day 1 doesn't bode well
	quickSort(listOne, 0, length - 1);
	quickSort(listTwo, 0, length - 1);

	u64 sumPartOne = 0;
	u64 sumPartTwo = 0;

	for (u32 i = 0; i < length; ++i) {
		// Part one
		sumPartOne += listOne[i] > listTwo[i] ? listOne[i] - listTwo[i] : listTwo[i] - listOne[i];

		// Part two
		u32 count = 0;

		for (size_t j = 0; j < length; ++j) {
			if (listOne[i] < listTwo[j]) {
				// Stop checking if we didn't find the number
				break;
			} else if (count && listOne[i] != listTwo[j]) {
				// Stop checking if we found the number but have stopped matching against it
				break;
			} else if (listOne[i] == listTwo[j]) {
				++count;
			}
		}

		sumPartTwo += count * listOne[i];
	}

	struct timeval currentTime;
	gettimeofday(&currentTime, NULL);

	printf(
		"Day 1 (ran in %ldμs)\n"
		"-----\n"
		"Part one: %lu\n"
		"Part two: %lu\n\n",
		((currentTime.tv_sec * (int) 1e6 + currentTime.tv_usec) - (startTime.tv_sec * (int) 1e6 + startTime.tv_usec)),
		sumPartOne,
		sumPartTwo
	);

	fclose(fp);

	return 0;
}

void swap(u32 *values, u32 i, u32 j) {
	u32 temp = values[i];
	values[i] = values[j];
	values[j] = temp;
}

i32 partition(u32 *values, i32 low, i32 high) {
	u32 pivot = values[high];
	i32 i = low - 1;

	for (i32 j = low; j <= high; ++j) {
		if (values[j] < pivot) {
			++i;

			if (i != j) {
				swap(values, i, j);
			}
		}
	}

	swap(values, i + 1, high);
	return i + 1;
}

void quickSort(u32 *values, i32 low, i32 high) {
	if (low >= high) {
		return;
	}

	i32 pivot = partition(values, low, high);
	quickSort(values, low, pivot - 1);
	quickSort(values, pivot + 1, high);
}


#ifndef IS_MAIN

int main() {
	day1("ex1.txt");
}

#endif