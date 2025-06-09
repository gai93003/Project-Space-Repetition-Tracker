// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIDs } from "./common.mjs";
const dropDown = document.getElementById('userId');

const populateDropdown = (users) => {
  const defaultOpt = document.createElement('option');
  defaultOpt.textContent = 'Select a user';
  defaultOpt.value = '';
  dropDown.appendChild(defaultOpt);

  for (let i = 0; i < users.length; i++) {
    const option = document.createElement('option');
    option.value = i + 1;
    option.textContent = `User ${users[i]}`;
    dropDown.appendChild(option);
  }
}

window.onload = function () {
  const users = getUserIDs();
  populateDropdown(users);
  console.log(users);
  // document.querySelector("body").innerText = `There are ${users.length} users`;
};
