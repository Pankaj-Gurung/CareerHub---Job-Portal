import fs from 'fs';
import path from 'path';

const counterFilePath = path.join('uploads', 'counter.txt');

// Function to read the current counter value from the file
const readCounter = () => {
  try {
    const counter = fs.readFileSync(counterFilePath, 'utf-8');
    return parseInt(counter, 10) || 1;
  } catch (err) {
    // If the file doesn't exist, start from 1
    return 1;
  }
};

// Function to write the new counter value to the file
const writeCounter = (counter) => {
  fs.writeFileSync(counterFilePath, counter.toString(), 'utf-8');
};

// Function to generate the new file name
export const generateFileName = () => {
  const counter = readCounter();
  const newFileName = `Resume${counter}`;
  writeCounter(counter + 1);
  return newFileName;
};
