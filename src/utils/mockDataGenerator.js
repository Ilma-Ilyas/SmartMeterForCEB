// mockDataGenerator.js
export function generateMockData() {
    return Math.random() * 10; // Random number between 0 and 10
  }
  
  export function generateHistoricalData() {
    // Generate an array of historical data points
    const historicalData = [];
    const currentDate = new Date();
  
    for (let i = 0; i < 20; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - i);
  
      historicalData.push(generateMockData() * 10); // Example usage, scale as needed
    }
  
    return historicalData.reverse(); // Return data in chronological order
  }
  