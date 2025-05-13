
/**
 * SKU Validator Utility
 * 
 * This utility helps validate and format SKUs according to the required format:
 * [3 uppercase letters]-[3 uppercase letters]-[alphanumeric sequence]
 */

/**
 * Validates if a SKU string follows the required format
 * @param sku - The SKU string to validate
 * @returns boolean - True if valid, false otherwise
 */
export const isValidSku = (sku: string): boolean => {
  // Format: 3 uppercase letters, dash, 3 uppercase letters, dash, then alphanumeric sequence
  const pattern = /^[A-Z]{3}-[A-Z]{3}-[A-Z0-9]+$/;
  return pattern.test(sku);
};

/**
 * Formats a SKU to ensure it follows the required pattern
 * @param categoryPrefix - Category prefix (will be truncated/padded to 3 chars)
 * @param brandPrefix - Brand prefix (will be truncated/padded to 3 chars)
 * @param productIdentifier - Product identifier
 * @returns string - Properly formatted SKU
 */
export const formatSku = (
  categoryPrefix: string, 
  brandPrefix: string, 
  productIdentifier: string
): string => {
  // Ensure prefixes are exactly 3 uppercase characters
  const formattedCategoryPrefix = categoryPrefix
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .padEnd(3, 'X')
    .substring(0, 3);
  
  const formattedBrandPrefix = brandPrefix
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .padEnd(3, 'X')
    .substring(0, 3);
  
  // Process product identifier - convert to uppercase and remove special characters
  const formattedProductId = productIdentifier
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
  
  return `${formattedCategoryPrefix}-${formattedBrandPrefix}-${formattedProductId}`;
};

/**
 * Fixes an existing SKU to match the required format
 * This is helpful for data migration and corrections
 * @param sku - The existing SKU to fix
 * @returns string - The corrected SKU if possible, or the original if it can't be fixed
 */
export const fixSku = (sku: string): string => {
  // Try to extract parts from an SKU that may not follow the exact pattern
  const parts = sku.split('-');
  
  if (parts.length !== 3) {
    return sku; // Can't fix if format is completely different
  }
  
  return formatSku(parts[0], parts[1], parts[2]);
};
