/*
 * Electron screenshot helper
 * In a perfect world, we could hook into nightwatch's 'capture' function.
 *
 * Unfortunately, this capture function doesn't work in any chrome-based browser
 * at the time of writing.
 *
 * The approach here is to take a screenshot on the client side using rasterizeHTML.js,
 * then pass it back as a base64 encoded string.
 *
 * See: https://github.com/cburgmer/rasterizeHTML.js
 *
*/

import { readFileSync, writeFile, existsSync, mkdirSync } from 'fs';
import { exec } from 'child_process';
const rasterizeHTML = readFileSync('./node_modules/rasterizehtml/dist/rasterizeHTML.allinone.js', 'utf-8');

// Get current commit SHA
let currentSHA = 'current';
exec('git rev-parse HEAD', (err, stdout) => {
  currentSHA = stdout.substr(0, 7);
<<<<<<< HEAD
  currentSHA = stdout.replace(/\r?\n|\r/, '');
=======
>>>>>>> 9becdc61d4a2b1d83f217cdd18976069ef884d84
});

// Inject rasterizeHTML
function injectScript(client) {
  client
    .execute((script) => {
      /* eslint-disable */
      eval(script);
      return window.rasterizeHTML === undefined;
      /* eslint-enable */
    },
    [rasterizeHTML]
    );
}

// Check to see if rasterizeHTML is loaded
function checkDependencies(client) {
  client
    .execute(() => {
      return window.rasterizeHTML === undefined;
    },
    [],
    (result) => {
      if (result.value === true) {
        injectScript(client);
      }
    });
}

// Create directories if needed
<<<<<<< HEAD

=======
>>>>>>> 9becdc61d4a2b1d83f217cdd18976069ef884d84
function setupDirectories(module) {
  const arr = ['./logs', 'screenshots', currentSHA, module];
  arr.forEach((d, i) => {
    const dir = arr.slice(0, i + 1).join('/');
    if (!existsSync(dir)) {
      mkdirSync(dir);
    }
  });
}

function takeScreenshot(client, url) {
<<<<<<< HEAD
  const filename = url.replace(/\//g, '_');
=======
>>>>>>> 9becdc61d4a2b1d83f217cdd18976069ef884d84
  const filename = url.replace(/\//g, '_').substr(1);
  checkDependencies(client);

  client
    .timeoutsAsyncScript(5000)
    .executeAsync((callback) => {
      /* eslint-disable */
      // Get correct document dimensions
      // via http://stackoverflow.com/questions/1145850
      var body = document.body,
          html = document.documentElement;

      var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight), 
          width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);

      // Append canvas
      var canvas = document.createElement('canvas');
      canvas.height = height; 
      canvas.width = width;
      canvas.id = 'screenshot-canvas';
      document.body.appendChild(canvas);

      // Draw screen to canvas
      rasterizeHTML
        .drawDocument(document, canvas)
        .then(function(result) {
          callback(canvas.toDataURL());
          // Remove canvas
          canvas.parentNode.removeChild(canvas);
        });
      /* eslint-disable */
    },
    [], 
    function(base64){
      // Strip metadata from string 
      const data = base64.value.replace(/^data:image\/\w+;base64,/, '');
<<<<<<< HEAD

      const module = client.currentTest.module.split('/').pop();

      // Write screenshot to disk
      const path = `./logs/screenshots/${currentSHA}/${module}/${filename}.png`;
  
      setupDirectories(module);

      writeFile(path, data, 'base64', function(err) {
        if (err){
          console.error(`Could not save screenshot to ${path}`);
        } else {
          console.log(`Saved screenshot to ${path}`);
        }
=======
>>>>>>> 9becdc61d4a2b1d83f217cdd18976069ef884d84
      const module = client.currentTest.module.split('/').pop();

      // Write screenshot to disk
      const path = `./logs/screenshots/${currentSHA}/${module}/${filename}.png`;
  
      setupDirectories(module);

      writeFile(path, data, 'base64', function(err) {
        if (err){
          console.error(`Could not save screenshot to ${path}`);
        } else {
          console.log(`Saved screenshot to ${path}`);
        }
      });
    });
}

module.exports = {
  takeScreenshot: takeScreenshot
}
