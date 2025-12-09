const fs = require('fs');
const path = require('path');

// Tailwind config content
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};`;

// PostCSS config content
const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;

// Write tailwind.config.js
fs.writeFileSync(path.join(__dirname, 'tailwind.config.js'), tailwindConfig);
console.log('Created tailwind.config.js');

// Write postcss.config.js
fs.writeFileSync(path.join(__dirname, 'postcss.config.js'), postcssConfig);
console.log('Created postcss.config.js');
