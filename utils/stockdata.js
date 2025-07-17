export function generateStockData(numPoints = 10) {
  const data = [];
  let value = 100;

  for (let i = 0; i < numPoints; i++) {
    value += Math.random() * 10 - 5;
    data.push({ x: `Day ${i + 1}`, y: Math.round(value * 100) / 100 });
  }

  return [
    {
      id: 'Stock Price',
      data,
    },
  ];
}
