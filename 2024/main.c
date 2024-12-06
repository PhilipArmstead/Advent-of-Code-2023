#include <stdio.h>


#define IS_MAIN

#include "day-1/day-1.c"
#include "day-2/day-2.c"
#include "day-3/day-3.c"
#include "day-4/day-4.c"
#include "day-5/day-5.c"
#include "day-6/day-6.c"


int main() {
	printf(
		"\nAdvent of Code 2024\n"
		"===================\n"
	);
	day1("day-1/input.txt");
	day2("day-2/input.txt");
	day3("day-3/input.txt");
	day4("day-4/input.txt");
	day5("day-5/input.txt");
	day6("day-6/input.txt");
}
