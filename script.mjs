// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIDs } from "./common.mjs";
import { getData, addData, clearData } from "./storage.mjs";


const dropDown = document.getElementById('userId');
const agendaForm = document.getElementById("add-agenda-form");
const agendaNameInput = document.getElementById("agenda-name");
const agendaDateInput = document.getElementById("agenda-date");
const agendasSection = document.getElementById('agendas');

agendaForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission

  const userId = dropDown.value;
  const agendaName = agendaNameInput.value.trim();
  const agendaDate = agendaDateInput.value;

  if (!userId) {
    alert('Please select a user.');
    return;
  }

  if (!agendaName || !agendaDate) {
    alert('Please enter both name and date for the agenda.');
    return;
  }

  const newAgenda = { topic: agendaName, date: agendaDate };
  addData(userId, [newAgenda]);

  // Clear previous inputs
  agendaNameInput.value = '';
  agendaDateInput.value = '';

  // Refresh agenda display
  updateAgendaForUser(userId);
});


function updateAgendaForUser(userId) {
  const updatedAgendas = getData(userId);
  displayAgenda(updatedAgendas);
}


const populateDropdown = (users) => {
  const defaultOpt = document.createElement('option');
  defaultOpt.textContent = '--Select a user--';
  defaultOpt.value = '';
  dropDown.appendChild(defaultOpt);

  for (let i = 0; i < users.length; i++) {
    const option = document.createElement('option');
    // option.value = i + 1;
    option.value = users[i]; // Use the user ID directly
    option.textContent = `User ${users[i]}`;
    dropDown.appendChild(option);
  }
}


const displayAgenda = (agendaItems) => {
  agendasSection.innerHTML = ''; // Clear previous content

  if (!agendaItems || agendaItems.length === 0) {
    agendasSection.textContent = 'No agenda found for this user.';
    return;
  }

  // Filter out past revision dates
  const today = new Date();
  const upcoming = agendaItems.filter(item => new Date(item.date) >= today);

  if (upcoming.length === 0) {
    agendasSection.textContent = 'No upcoming revisions for this user.';
    return;
  }

  // Sort by date ascending
  upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

  const ul = document.createElement('ul');
  for (const item of upcoming) {
    const li = document.createElement('li');
    // Format date nicely (e.g. YYYY-MM-DD)
    const dateStr = new Date(item.date).toISOString().split('T')[0];
    li.textContent = `${item.topic}, ${dateStr}`;
    ul.appendChild(li);
  }
  agendasSection.appendChild(ul);
};

window.onload = function () {
  const users = getUserIDs();
  populateDropdown(users);

  dropDown.addEventListener('change', () => {
    const selectedUserId = dropDown.value;
    if (!selectedUserId) {
      agendasSection.textContent = 'Please select a user to view their agenda.';
      return;
    }
    const agendaData = getData(selectedUserId);
    displayAgenda(agendaData);
  });

  agendasSection.textContent = 'Please select a user to view their agenda.';
};