
import React from 'react';
import LZString from 'lz-string';

export const longToShort = async(originalString) => {
  return LZString.compressToBase64(originalString);
};

export const shortToLong = async(compressedString) => {
  return LZString.decompressFromBase64(compressedString);
};