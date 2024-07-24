interface Feedback {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  exerciseHours: Array<number>,
  target: number
): Feedback => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((day) => day > 0).length;
  const totalHours = exerciseHours.reduce((acc, curr) => acc + curr, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "great job! You met your target.";
  } else if (average >= target * 0.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription =
      "you need to spend more time exercising to meet your target";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const args = process.argv.slice(2);
const target = parseFloat(args[0]);
const exerciseHours = args.slice(1).map((arg) => parseFloat(arg));

console.log(JSON.stringify(calculateExercises(exerciseHours, target), null, 2));

