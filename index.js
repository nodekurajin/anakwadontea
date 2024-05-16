const moment = require('moment'); // Requires installation: npm install moment

// Sample period data (replace with user data storage)
const periods = [];

// Function to add a new period to the data
function addPeriod(startDate, endDate) {
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    throw new Error('startDate and endDate must be valid Date objects');
  }

  periods.push({ startDate, endDate });
}

// Function to calculate estimated next period based on average cycle length
function calculateNextPeriod(cycleLength) {
  if (periods.length === 0) {
    throw new Error('No period data available to estimate next period');
  }

  const lastPeriod = periods[periods.length - 1];
  const averageCycleLength = calculateAverageCycleLength();

  const estimatedStartDate = moment(lastPeriod.endDate).add(averageCycleLength, 'days').toDate();

  return { estimatedStartDate };
}

// Function to calculate average cycle length based on existing data
function calculateAverageCycleLength() {
  if (periods.length <= 1) {
    return null; // Not enough data to calculate average
  }

  let totalDays = 0;
  for (let i = 1; i < periods.length; i++) {
    const currentPeriod = periods[i];
    const previousPeriod = periods[i - 1];
    const daysInCycle = moment(currentPeriod.startDate).diff(previousPeriod.startDate, 'days');
    totalDays += daysInCycle;
  }

  return totalDays / (periods.length - 1);
}

// Function to retrieve a random inspirational quote
function getRandomQuote() {
  const quotes = [
    // Add an array of inspirational quotes for women
    '“You are a woman of incredible strength and power.” - Unknown',
    '“The best thing about a woman is her confidence.” - Maya Angelou',
    '“She believed she could, so she did.” - Unknown',
  ];
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

// Example usage
addPeriod(new Date(2024, 4, 1), new Date(2024, 4, 5)); // Sample period data

try {
  const nextPeriodInfo = calculateNextPeriod(28); // Assuming average cycle length of 28 days
  console.log('Estimated next period start:', nextPeriodInfo.estimatedStartDate.toISOString());
} catch (error) {
  console.error(error.message);
}

console.log('Inspirational Quote:', getRandomQuote());
