#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/time.h>

#include "../helpers/types.h"
#include "../helpers/vector.h"


void quickSort(Vector values, i32 low, i32 high);

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
	size_t length;

	u64 sumPartOne = 0;
	u64 sumPartTwo = 0;

	Vector listOne = vector_create(50, sizeof(u32));
	Vector listTwo = vector_create(50, sizeof(u32));

	while ((length = getline(&line, &size, fp)) != -1) {
		u8 spaceStart = 0;
		u8 spaceEnd = 0;
		for (size_t i = 0; i < length; ++i) {
			if (!spaceStart && line[i] == ' ') {
				spaceStart = i;
			} else if (spaceStart && line[i] != ' ') {
				spaceEnd = i;
				break;
			}
		}

		vector_pushUint32(&listOne, strtol(line, NULL, 10));
		vector_pushUint32(&listTwo, strtol(line + spaceEnd, NULL, 10));
	}

	// Having to implement quick sort on day 1 doesn't bode well
	quickSort(listOne, 0, (i32) listOne.length - 1);
	quickSort(listTwo, 0, (i32) listTwo.length - 1);

	for (u32 i = 0; i < listOne.length; ++i) {
		u32 listOneValue = *(u32 *) vector_at(&listOne, i);
		u32 listTwoValue = *(u32 *) vector_at(&listTwo, i);

		// Part one
		sumPartOne +=
			listOneValue > listTwoValue ? listOneValue - listTwoValue : listTwoValue - listOneValue;

		// Part two
		u32 count = 0;

		for (size_t j = 0; j < listOne.length; ++j) {
			listTwoValue = *(u32 *) vector_at(&listTwo, j);
			if (listOneValue < listTwoValue) {
				// Stop checking if we didn't find the number
				break;
			} else if (count && listOneValue != listTwoValue) {
				// Stop checking if we found the number but have stopped matching against it
				break;
			} else if (listOneValue == listTwoValue) {
				++count;
			}
		}

		sumPartTwo += count * listOneValue;
	}

	struct timeval currentTime;
	gettimeofday(&currentTime, NULL);

	printf(
		"Day 1 (ran in %ldμs)\n"
		"-----\n"
		"Part one: %lu\n"
		"Part two: %lu\n\n",
		((currentTime.tv_sec * (int) 1e6 + currentTime.tv_usec) -
			(startTime.tv_sec * (int) 1e6 + startTime.tv_usec)),
		sumPartOne,
		sumPartTwo
	);

	fclose(fp);
	vector_destroy(&listOne);
	vector_destroy(&listTwo);

	return 0;
}

void swap(Vector *vector, u32 i, u32 j) {
	u32 size = vector->elementSize;
	u32 temp[size];
	memcpy(&temp, &vector->items[i * size], size);
	memcpy(&vector->items[i * size], &vector->items[j * size], size);
	memcpy(&vector->items[j * size], &temp, size);
}

i32 partition(Vector values, i32 low, i32 high) {
	u32 pivot = *(u32 *) vector_at(&values, high);

	i32 i = low - 1;

	for (i32 j = low; j <= high; ++j) {
		if (*(u32 *) vector_at(&values, j) < pivot) {
			++i;

			if (i != j) {
				swap(&values, i, j);
			}
		}
	}

	swap(&values, i + 1, high);
	return i + 1;
}

void quickSort(Vector values, i32 low, i32 high) {
	if (low >= high) {
		return;
	}

	i32 pivot = partition(values, low, high);
	quickSort(values, low, pivot - 1);
	quickSort(values, pivot + 1, high);
}

//int main() {
//	day1("ex1.txt");
//}
