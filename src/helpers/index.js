export const weekDay = (time) => {
  const date = new Date(time);
  return date.toLocaleDateString("ru", {
    weekday: "short",
    // weekday: "long",
  });
};

export const dateFormat = (time) => {
  const date = new Date(time);
  return date.toLocaleDateString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getTime = (time) => {
  const date = new Date(time);
  return date.toLocaleTimeString("ru", {
    hour: "numeric",
    minute : "numeric",
  });
};
