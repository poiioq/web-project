const fs = require('fs');

fs.readFile('blogs.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const parsedData = JSON.parse(data);
  for (const key in parsedData['Techsquared']) {
    fs.appendFile('newFile.txt', key + '\n', () => {
        console.log(
            'done'
        )
    });
  }
});