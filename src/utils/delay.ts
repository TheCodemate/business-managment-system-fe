export const delay = async (delayTime: number, callback: () => void) =>
  new Promise((resolve) => setTimeout(() => resolve(callback()), delayTime));
