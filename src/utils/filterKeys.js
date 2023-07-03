export const filterKeys = (event) => {
  const pattern = /^[0-9\b]+$/;
  const allowedKeys = ["Backspace"];
  if (!pattern.test(event.key) && !allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
};
