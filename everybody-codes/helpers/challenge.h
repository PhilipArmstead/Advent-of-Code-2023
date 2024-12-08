#pragma once

#include <stdio.h>
#include <sys/time.h>


void printChallengeSummary(
	char day,
	struct timeval startTime,
	unsigned long long answerPartOne,
	unsigned long long answerPartTwo,
	unsigned long long answerPartThree
) {
	struct timeval now;
	gettimeofday(&now, NULL);

	unsigned long duration = (now.tv_sec * (int) 1e6 + now.tv_usec) - (startTime.tv_sec * (int) 1e6 + startTime.tv_usec);

	char *timeChar = "μ";
	if (duration > 3000000) {
		duration /= 1000000;
		timeChar = "";
	} else if (duration > 3000) {
		duration /= 1000;
		timeChar = "m";
	}

	printf(
		"Day %d (ran in %ld%ss)\n"
		"-----\n"
		"Part one: %llu\n"
		"Part two: %llu\n"
		"Part three: %llu\n\n",
		day,
		duration,
		timeChar,
		answerPartOne,
		answerPartTwo,
		answerPartThree
	);
}