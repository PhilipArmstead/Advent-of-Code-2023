#include <errno.h>
#include <stdio.h>
#include <sys/time.h>

#include "../helpers/challenge.h"
#include "../helpers/types.h"


u32 solveDay16(u8 grid[144][144], Point agent, Point exit, u8 d, u32 score, u32 *seen, u8 width, u32 minScore);

int day16(char *filepath) {
	struct timeval startTime;
	gettimeofday(&startTime, NULL);

	FILE *fp = fopen(filepath, "r");
	if (!fp || ferror(fp)) {
		printf("Error reading file: %s. Error #: %d\n", filepath, errno);
		return -1;
	}

	char line[144];
	u8 grid[144][144];

	u8 height = 0;
	u8 width = 0;
	Point agent;
	Point exit;
	while (fgets(line, sizeof(line), fp) != NULL) {
		u8 x = 0;
		while (line[x] != '\0' && line[x] != '\n') {
			if (line[x] == 'E') {
				exit.x = x;
				exit.y = height;
			} else if (line[x] == 'S') {
				agent.x = x;
				agent.y = height;
			}

			grid[height][x] = line[x];
			++x;
		}

		if (!width) {
			width = x;
		}

		++height;
	}

	fclose(fp);

	u16 seenSize = height * width;
	u32 seen[seenSize];
	for (u8 y = 0; y < height; ++y) {
		for (u8 x = 0; x < width; ++x) {
			seen[y * width + x] = 999999999;
		}
	}
	u32 answerPartOne = solveDay16(grid, agent, exit, 1, 0, seen, width, 999999999);
	u32 answerPartTwo = 0;

	printChallengeSummary(16, startTime, answerPartOne, answerPartTwo);
	return 0;
}

u32 solveDay16(u8 grid[144][144], Point agent, Point exit, u8 d, u32 score, u32 *seen, u8 width, u32 minScore) {
	if (score > seen[agent.y * width + agent.x]) {
		return minScore + 1;
	}

	seen[agent.y * width + agent.x] = score;

	if (agent.x == exit.x && agent.y == exit.y) {
		return score;
	}

	u8 possibleDirections[4];
	u8 possibleDirectionsIndex = 0;
	for (u8 i = 0; i < 4; ++i) {
		if (
			(d == 0 && i == 2) ||
			(d == 2 && i == 0) ||
			(d == 1 && i == 3) ||
			(d == 3 && i == 1)
		) {
			continue;
		}
		u8 dy = agent.y + directions[i][0];
		u8 dx = agent.x + directions[i][1];
		if (grid[dy][dx] != '#') {
			possibleDirections[possibleDirectionsIndex++] = i;
		}
	}

	for (u8 ii = 0; ii < possibleDirectionsIndex; ++ii) {
		u8 i = possibleDirections[ii];
		u8 dy = agent.y + directions[i][0];
		u8 dx = agent.x + directions[i][1];

		u32 newScore = solveDay16(
			grid,
			(Point) { dx, dy },
			exit,
			i,
			score + (i == d ? 1 : 1001),
			seen,
			width,
			minScore
		);
		if (newScore && newScore < minScore) {
			minScore = newScore;
		}
	}

	if (!possibleDirectionsIndex) {
		return 0;
	}

	return minScore;
}

#ifndef IS_MAIN

int main() {
	day16("input.txt");
}

#endif
