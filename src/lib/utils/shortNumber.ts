export const shortNumber = (num?: number) => {
  if (num === undefined) {
    return 0;
  }

  if (num > 1e19) {
    return 0;
  }

  if (num < -1e19) {
    return 0;
  }

  if (Math.abs(num) < 1000) {
    const isFloat = num % 1 !== 0;

    if (isFloat) {
      return num.toFixed(2);
    }

    return num;
  }

  const sign = num < 0 ? '-' : '';
  const suffixes = {
    'K': 6,
    'M': 9,
    'B': 12,
    'T': 16
  };

  let shortNumber;
  let exponent;
  let size;

  num = Math.abs(num);
  size = Math.floor(num).toString().length;

  exponent = size % 3 === 0 ? size - 3 : size - (size % 3);


  shortNumber = `${Math.round(10 * (num / Math.pow(10, exponent))) / 10}`;

  for (const [key, value] of Object.entries(suffixes)) {
    if (exponent < value) {
      shortNumber += key;
      break;
    }
  }

  return sign + shortNumber;
};