#pragma once

#include "./types.h"

/** top down merge sort */
static inline void mergeTopDown(u32 *copy, u16 begin, u16 middle, u16 end, u32 *values) {
	u16 i = begin;
	u16 j = middle;

	for (u16 k = begin; k < end; k++) {
		if (i < middle && (j >= end || values[i] <= values[j])) {
			copy[k] = values[i];
			++i;
		} else {
			copy[k] = values[j];
			++j;
		}
	}
}

void splitMergeTopDown(u32 *copy, u16 begin, u16 end, u32 *values) {
	if (end - begin <= 1) {
		return;
	}

	u16 middle = (end + begin) / 2;

	splitMergeTopDown(values, begin, middle, copy);
	splitMergeTopDown(values, middle, end, copy);

	mergeTopDown(copy, begin, middle, end, values);
}

void mergeSortTopDown(u32 *values, u16 length) {
	u32 copy[length];
	for (u16 i = 0; i < length; ++i) {
		copy[i] = values[i];
	}

	splitMergeTopDown(values, 0, length, copy);
}


/** bottom up merge sort */
void mergeBottomUp(const u32 *values, u16 left, u16 right, u16 end, u32 *copy) {
	u16 i = left;
	u16 j = right;

	for (u16 k = left; k < end; k++) {
		if (i < right && (j >= end || values[i] <= values[j])) {
			copy[k] = values[i];
			i = i + 1;
		} else {
			copy[k] = values[j];
			j = j + 1;
		}
	}
}

void mergeSortBottomUp(u32 *values, u16 length) {
	u32 copy[length];

	for (u16 width = 1; width < length; width *= 2) {
		for (u16 i = 0; i < length; i += 2 * width) {
			u16 iWidth = i + width;
			u16 i2Width = i + 2 * width;
			mergeBottomUp(values, i, length < iWidth ? length : iWidth, length < i2Width ? length : i2Width, copy);
		}

		for (u16 i = 0; i < length; ++i) {
			values[i] = copy[i];
		}
	}
}
