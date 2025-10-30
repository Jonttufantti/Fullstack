export const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) return "Invalid input";
  height = height / 100;
  const bmi = weight / (height * height);

  if (bmi < 16.0) return "Underweight (Severe thinness)";
  if (bmi < 17.0) return "Underweight (Moderate thinness)";
  if (bmi < 18.5) return "Underweight (Mild thinness)";
  if (bmi < 25.0) return "Normal range";
  if (bmi < 30.0) return "Overweight (Pre-obese)";
  if (bmi < 35.0) return "Obese (Class I)";
  if (bmi < 40.0) return "Obese (Class II)";
  return "Obese (Class III)";
};

if (require.main === module) {
  const args = process.argv.slice(2).map(Number);
  if (args.length !== 2 || args.some(isNaN)) {
    console.log("Error: Provide height and weight as numbers.");
    process.exit(1);
  }
  const [height, weight] = args;
  console.log(calculateBmi(height, weight));
}
