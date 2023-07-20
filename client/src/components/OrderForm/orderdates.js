const currentDate = new Date();
const futureDates = [];
const futureTimes = [];

for (let i = 0; i < 14; i++) {
  const futureDate = new Date();
  futureDate.setDate(currentDate.getDate() + i + 1);
  futureDates.push(futureDate);
}

for (let i = 8; i < 21; i++) {
  futureTimes.push(`${i}:00`);
}


export { futureDates, futureTimes };
