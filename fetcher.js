
const userURL = process.argv[2];
const fileToWrite = process.argv[3];

const request = require('request');
const fs = require('fs');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(userURL, (error, response, body) => {

  if (error) {
    console.log('error, please enter valid address');
    return;
  }

  console.log(response.headers);
  console.log('response status code: ', response.statusCode);

  if (fs.existsSync(fileToWrite)) {
    rl.question('File already exists. Do you want to overwrite? press y for yes', userInput => {
      if (userInput.toLowerCase() !== 'y') {
        rl.close();
      } else {
        fs.writeFile(fileToWrite, body, (error) => {
          if (error) throw error;
          const stats = fs.statSync("./index.html");
          const fileSizeInBytes = stats.size;
          console.log(`Downloaded and saved ${fileSizeInBytes} to ${fileToWrite}`);
        });
        rl.close();
      }
    })
  } else {
    fs.writeFile(fileToWrite, body, (error) => {
      if (error) throw error;
      const stats = fs.statSync("./index.html");
      const fileSizeInBytes = stats.size;
      console.log(`Downloaded and saved ${fileSizeInBytes} to ${fileToWrite}`);
    });
    rl.close();
  }

});

