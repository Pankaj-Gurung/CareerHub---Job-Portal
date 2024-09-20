

const fs = require('fs');
const pdf = require('pdf-parse');
const lda = require('lda');
const nlp = require('compromise');




let pathstring = ('./uploads/cv.pdf');
let dataBuffer = fs.readFileSync(pathstring);
const extractTopicsFromResume = async (filePath) => {
    try {
      let dataBuffer = fs.readFileSync(filePath);
  
      return pdf(dataBuffer).then(function(data) {
        const doc = nlp(data.text);
        let documentx = doc.sentences().out('array');
        console.log(documentx);
  
        const cps = documentx.map(docc => docc.toLowerCase().split(/\s+/));
        const rs = lda(cps, 3, 5);
        rs.forEach((topic, i) => {
          console.log(`Topic ${i + 1}:`);
          topic.forEach(term => {
            console.log(`${term.term}: ${term.probability}`);
          });
          console.log();
        });
  
        return rs;
      });
    } catch (error) {
      console.error('Error extracting topics from resume:', error);
      throw error;
    }
  };
  
  module.exports = extractTopicsFromResume (pathstring);