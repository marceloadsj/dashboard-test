import { getRandomInteger } from "utils/utilities";

/**
 * Generating random data here to populate the chart
 */
const days = getRandomInteger(5, 15);

const activeUsers = Array(days)
  .fill()
  .map((_, index) => {
    return {
      quantity: getRandomInteger(0, 50),
      date: `${index + 1}/3/20`
    };
  });

const newUsers = Array(days)
  .fill()
  .map((_, index) => {
    return {
      quantity: getRandomInteger(0, 50),
      date: `${index + 1}/3/20`
    };
  });

export default [
  {
    id: "Active Users",
    data: activeUsers.map(item => ({ x: item.date, y: item.quantity }))
  },
  {
    id: "New Users",
    data: newUsers.map(item => ({ x: item.date, y: item.quantity }))
  }
];
