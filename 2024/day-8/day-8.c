#include <errno.h>
#include <stdio.h>
#include <sys/time.h>

#include "../helpers/challenge.h"
#include "../helpers/types.h"


int day8(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	u8 size = 0;
	u8 seen[62][16];
	for (u8 i = 0; i < 62; ++i) {
		seen[i][0] = 0;
	}

	char antennae[50][50];
	u16 antennaeCount = 0;
	{
		FILE *fp = fopen(filepath, "r");
		if (!fp || ferror(fp)) {
			printf("Error reading file: %s. Error #: %d\n", filepath, errno);
			return -1;
		}

		char line[56];
		u8 row = 0;
		while (fgets(line, sizeof(line), fp) != NULL) {
			u8 i = 0;
			while (true) {
				char c = line[i];

				if (c == '\0' || c == '\n') {
					if (!size) {
						size = i;
					}
					break;
				}

				u8 offset = 0;
				if (c >= '0' && c <= '9') {
					offset = 48;
				} else if (c >= 'A' && c <= 'Z') {
					offset = 55;
				} else if (c >= 'a' && c <= 'z') {
					offset = 61;
				}

				if (offset) {
					u8 index = c - offset;
					u8 count = seen[index][0];
					seen[index][count * 2 + 1] = i;
					seen[index][count * 2 + 2] = row;
					++seen[index][0];
					antennae[row][i] = '^';
					++antennaeCount;
				} else {
					antennae[row][i] = '.';
				}
				++i;
			}
			++row;
		}

		fclose(fp);
	}

	u16 answerPartOne = 0;
	u16 answerPartTwo = 0;

	for (u8 i = 0; i < 62; ++i) {
		u8 count = seen[i][0];

		for (u8 j = 0; j < count - 1; ++j) {
			u8 x1 = seen[i][j * 2 + 1];
			u8 y1 = seen[i][j * 2 + 2];

			for (u8 k = j + 1; k < count; ++k) {
				u8 x2 = seen[i][k * 2 + 1];
				u8 y2 = seen[i][k * 2 + 2];

				i8 xDiff = (i8) (x1 - x2);
				i8 yDiff = (i8) (y1 - y2);

				if (xDiff < 0) {
					xDiff = -xDiff;
				}
				if (yDiff < 0) {
					yDiff = -yDiff;
				}

				i8 dX = (i8) (x1 < x2 ? -xDiff : xDiff);
				i8 dY = (i8) (y1 < y2 ? -yDiff : yDiff);
				i8 d[2][3] = {{1,  x1, y1},
				              {-1, x2, y2}};
				for (i8 l = 0; l < 2; ++l) {
					i8 nDX = dX * d[l][0];
					i8 nDY = dY * d[l][0];
					i8 antiX = d[l][1] + nDX;
					i8 antiY = d[l][2] + nDY;
					bool first = true;
					while (antiX >= 0 && antiX < size && antiY >= 0 && antiY < size) {
						if (antennae[antiY][antiX] == '^') {
							--antennaeCount;
						}

						if (antennae[antiY][antiX] != '#') {
							if (first) {
								++answerPartOne;
								if (antennae[antiY][antiX] == '!') {
									--answerPartTwo;
								}
								antennae[antiY][antiX] = '#';
							} else if (antennae[antiY][antiX] != '!') {
								++answerPartTwo;
								antennae[antiY][antiX] = '!';
							}
						}

						first = false;
						antiX += nDX;
						antiY += nDY;
					}
				}
			}
		}
	}

	printChallengeSummary(8, startTime, answerPartOne, answerPartOne + answerPartTwo + antennaeCount);

	return 0;
}

#ifndef IS_MAIN

int main() {
	day8("ex1.txt");
}

#endif
