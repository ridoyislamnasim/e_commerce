function generateEAN13Barcode(prefix = "894") {
  if (prefix.length !== 3) {
      throw new Error("Prefix must be 3 digits (e.g., '894' for Bangladesh).");
  }
  let barcode = prefix;
  for (let i = 0; i < 9; i++) {
      barcode += Math.floor(Math.random() * 10);
  }
  const checksum = calculateEAN13Checksum(barcode);
  
  return barcode + checksum;
}

function calculateEAN13Checksum(barcode) {
  let sum = 0;
  for (let i = 0; i < barcode.length; i++) {
      sum += (i % 2 === 0 ? 1 : 3) * parseInt(barcode[i]);
  }
  const checksum = (10 - (sum % 10)) % 10; 
  return checksum;
}

module.exports = { generateEAN13Barcode };