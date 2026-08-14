export function numNoun(num: number, one: string, two: string, five: string)
{
	num = Math.abs(num);
	num %= 100;
	if (num >= 5 && num <= 20) return five;
	num %= 10;
	if (num == 1) return one;
	if (num >= 2 && num <= 4) return two;
	return five;
}