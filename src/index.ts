// Import stylesheet
import './style.css';

import JsonGenerator from './models/generator';
// import testJson from './test.json';
import testJson from './test.json';

const template: any | HTMLElement = document.getElementById('template');
const result: any | HTMLElement = document.getElementById('result');

console.log(testJson);
template.innerHTML = JSON.stringify(testJson, null, 2);

let generator = new JsonGenerator();

let genText = generator.generateJson(JSON.stringify(testJson, null, 2));
console.log("Generated text = ", genText);

result.innerHTML = genText;