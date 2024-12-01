#pragma once

#include "types.h"


typedef struct {
	u64 elementSize;
	u32 maxLength;
	u32 length;
	u32 offset;
	u8 *items;
} Vector;

Vector vector_create(u32 size, u64 elementSize);
void vector_destroy(Vector *vector);
void vector_pushUint32(Vector *vector, u32 item);

/**
 * Usage:
 *  int value = *(vector_at(&vec, 5)
 *  or
 *  int value = *(int *) (vector_at(&vec, 5))
 */
u8 *vector_at(Vector *vector, u32 index);
