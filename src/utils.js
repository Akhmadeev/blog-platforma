
export const shortText = (text) => text.split(' ').slice(0, 14).join(' ');

export const maxLengthText = (text) => {
  if (text.split('').length > 22) return text.slice(0, 12);
  return text
}