const questions = require('questions');
const fs = require('fs');

questions.askMany({
  name: { info: 'Name' },
  age: { info: 'Age' },
  phone: { info: 'Phone', required: false },
}, (result) => {
  const data = JSON.stringify(result);
  fs.writeFile('test.json', data, (err) => {
      if (err) {
          return console.log(err);
      }
  });
  // console.log(result);
});
