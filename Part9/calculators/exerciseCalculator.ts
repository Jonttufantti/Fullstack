interface ExerciseData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): ExerciseData => {
  const periodLength = hours.length;
  let trainingDays = 0;
  hours.forEach((element) => {
    if (element > 0) trainingDays += 1;
  });
  const average = hours.reduce((a, b) => a + b, 0) / periodLength;
  let rating = 2;
  if (average > target) rating = 3;
  else if (average < target) rating = 1;
  let ratingDescription: string;
  switch (rating) {
    case 1:
      ratingDescription = "not too bad but could be better";
      break;
    case 2:
      ratingDescription = "Congratulations, you met your goal!";
      break;
    case 3:
      ratingDescription = "WOW, you exceeded your goal! Keep on the good work!";
      break;
  }
  const success = average >= target;

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
