export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function cleanText(text: string){
  return text
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\.\s+/g, '. ')
    .trim();
}

export function formatNumber(num: number, digit: number = 3){
  return num.toString().padStart(digit, '0');
}