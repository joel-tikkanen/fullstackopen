export const calculateBmi = (height: number, weight: number): string => {
  if (!height || !weight)
    throw new Error("Invalid input. Both height and weight are required.");
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

// const args = process.argv.slice(2);
// const height = parseInt(args[0]);
// const weight = parseInt(args[1]);

// console.log(calculateBmi(height, weight));


