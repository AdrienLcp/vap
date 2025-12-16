export const sleep = async (seconds = 0.5) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000))
