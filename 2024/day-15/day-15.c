#include <errno.h>
#include <stdio.h>
#include <sys/time.h>

#include "../helpers/challenge.h"
#include "../helpers/types.h"


int day15(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return -1;
	}

	Point origin;

	char grid[50][50];
	char line[1008];
	u8 width = 0;
	u8 y = 0;
	while (true) {
		fgets(line, sizeof(line), fp);
		if (line[0] == '\n') {
			break;
		}

		u8 x = 0;
		while (line[x] != '\n') {
			if (line[x] == '@') {
				origin.x = x;
				origin.y = y;
				grid[y][x] = '.';
			} else {
				grid[y][x] = line[x];
			}

			++x;
		}

		if (!width) {
			width = x;
		}

		++y;
	}

	u8 height = y;

	u32 answerPartOne = 0;
	u32 answerPartTwo = 0;

	while (fgets(line, sizeof(line), fp) != NULL) {
		u16 x = 0;

		while (line[x] != '\0' && line[x] != '\n') {
			u8 d = 0;
			if (line[x] == '>') {
				d = 1;
			} else if (line[x] == 'v') {
				d = 2;
			} else if (line[x] == '<') {
				d = 3;
			}

			u8 ny = origin.y + directions[d][0];
			u8 nx = origin.x + directions[d][1];
			u8 c = grid[ny][nx];
			if (c == '.') {
				origin.x = nx;
				origin.y = ny;
			} else if (c == 'O') {
				u8 ty = ny + directions[d][0];
				u8 tx = nx + directions[d][1];
				while (true) {
					u8 nc = grid[ty][tx];
					if (nc == 'O') {
						ty += directions[d][0];
						tx += directions[d][1];
					} else {
						if (nc == '.') {
							grid[ty][tx] = 'O';
							grid[ny][nx] = '.';
							origin.x = nx;
							origin.y = ny;
						}
						break;
					}
				}
			}

			++x;
		}
	}

	fclose(fp);

	for (y = 0; y < height; ++y) {
		for (u8 x = 0; x < width; ++x) {
			if (grid[y][x] == 'O') {
				answerPartOne += y * 100 + x;
			}
		}
	}

	printChallengeSummary(15, startTime, answerPartOne, answerPartTwo);
	return 0;
}

#ifndef IS_MAIN

int main() {
	day15("ex1.txt");
}

#endif
