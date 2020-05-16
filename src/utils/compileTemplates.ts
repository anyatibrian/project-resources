import hoganJs from 'hogan.js';
import path from 'path'
import fs from 'fs';

export const compileTemplate = () => {
  const filePath = path.join(__dirname, '../views/email.hjs')
  const template = fs.readFileSync(filePath, 'utf-8')
  return hoganJs.compile(template)
};
