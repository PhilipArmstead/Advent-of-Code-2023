#include <math.h>
#include <memory.h>
#include <stdlib.h>

#include "vector.h"


Vector vector_create(u32 size, u64 elementSize) {
	Vector vector = { elementSize, size, 0, 0, calloc(size, elementSize) };

	return vector;
}

void vector_destroy(Vector *vector) {
	free(vector->items);
}

bool onBeforePush(Vector *vector) {
	bool isVectorFull = vector->length + vector->offset == vector->maxLength;

	if (!isVectorFull) {
		return true;
	}

	bool isAdding = false;

	if (vector->offset > 0) {
		// if we're at capacity but there are unused elements at the head, compress the vector
		memcpy(
			vector->items,
			vector->items + vector->offset * vector->elementSize,
			vector->length * vector->elementSize
		);
		vector->offset = 0;
		isAdding = true;
	} else {
		vector->maxLength = ceil(vector->maxLength * 1.5);
		void *tmp = realloc(vector->items, vector->elementSize * vector->maxLength);

		if (tmp) {
			vector->items = tmp;
			isAdding = true;
		}
	}

	return isAdding;
}

void onAfterPush(Vector *vector) {
	++vector->length;
}

void vector_pushUint32(Vector *vector, u32 item) {
	if (onBeforePush(vector)) {
		u32 index = vector->length + vector->offset;
		u32 *i = (u32 *) (vector->items + index * vector->elementSize);
		*i = item;
		onAfterPush(vector);
	}
}

u8 *vector_at(Vector *vector, u32 index) {
	return vector->items + (index + vector->offset) * vector->elementSize;
}
