// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIDs, dateRepetion, dateFormat } from "./common.mjs";
import { getData, addData, clearData } from "./storage.mjs";


const dropDown = document.getElementById('userId');
const agendaForm = document.getElementById("add-agenda-form");
const agendaNameInput = document.getElementById("agenda-name");
const agendaDateInput = document.getElementById("agenda-date");
const agendasSection = document.getElementById('agendas');
const topicInput = document.getElementById('agenda-name');
const dateInput = document.getElementById('add-agenda-date');
const submitBtn = document.getElementById('submit-btn');

const setDefaultDate = () => {
  if (dateInput) {
    dateInput.valueAsDate = new Date();
    return;
  }
}

const formSubmission = (event) => {
  // event.preventDefault();

  const userId = dropDown.value
  let topicOfRevision = topicInput.value;
  let dateOfRevision = dateInput.value;

  if (!userId) {
    alert("Please select a user before adding a topic");
    return;
  }

  if (!topicOfRevision || !dateOfRevision) {
    alert("Please enter a topic and a start date.");
    return;
  }

  const newRevision = { topic: topicOfRevision, date: new Date(dateOfRevision) };
  const repeatedRevisions = dateRepetion(newRevision);

  // console.log(repeatedRevisions);

  addData(userId, repeatedRevisions); // Add and store the revision dates to the localStorage

  topicInput.value = '';

}

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
  defaultOpt.textContent = 'Select a user';
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
  today.setHours(0,0,0,0) // This is to make sure that only the date is compared.
  const upcoming = agendaItems.filter(item => {
    const itemDate = new Date(item.date);
    itemDate.setHours(0,0,0,0);
    return itemDate >= today
});

  if (upcoming.length === 0) {
    agendasSection.textContent = 'No upcoming revisions for this user.';
    return;
  }

  // Sort by date ascending
  upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

  const ul = document.createElement('ul');
  for (const item of upcoming) {
    const li = document.createElement('li');
    
    li.textContent = `${item.topic}, ${dateFormat(item.date)}`;
    ul.appendChild(li);
  }
  agendasSection.appendChild(ul);
};

window.onload = function () {
  const users = getUserIDs();
  populateDropdown(users);
  setDefaultDate();

  dropDown.addEventListener('change', () => {
    const selectedUserId = dropDown.value;
    if (!selectedUserId) {
      agendasSection.textContent = 'Please select a user to view their agenda.';
      return;
    }
    const agendaData = getData(selectedUserId);
    displayAgenda(agendaData);
  });

  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    formSubmission(event);
    const selectedUserId = dropDown.value;
    const agendaData = getData(selectedUserId);
    displayAgenda(agendaData)
})

const clearBtn = document.getElementById('clear-btn');

clearBtn.addEventListener('click', () => {
  const selectedUserId = dropDown.value;
  if (!selectedUserId) {
    alert("Please select a user before clearing data.");
    return;
  }
  const agendaData = getData(selectedUserId);
  if (!agendaData || agendaData.length === 0) {
    alert("There is no agenda to clear for this user.");
    return;
  }
  clearData(selectedUserId); // This uses your imported clearData function
  displayAgenda([]); // Clear the display
});
};