let Day1 = dayjs().format('dddd, MM/DD/YYYY');
let Day2 = dayjs().add(1, 'day').format('dddd, MM/DD/YYYY');
let Day3 = dayjs().add(2, 'day').format('dddd, MM/DD/YYYY');
let Day4 = dayjs().add(3, 'day').format('dddd, MM/DD/YYYY');
let Day5 = dayjs().add(4, 'day').format('dddd, MM/DD/YYYY');
let Day6 = dayjs().add(5, 'day').format('dddd, MM/DD/YYYY');

$('#Day1').text(Day1);
$('#Day2').text(Day2);
$('#Day3').text(Day3);
$('#Day4').text(Day4);
$('#Day5').text(Day5);
$('#Day6').text(Day6);

