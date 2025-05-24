export const debounce = (callback: Function, ms: number) => {
  let timeoutId: number | null = null;
  return (...args: any[]) => {
    if (timeoutId) window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      callback(args);
    }, ms);
  };
};
