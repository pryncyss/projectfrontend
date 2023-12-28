// Wait for the document to be fully loaded before manipulating it

// Define the base URL for your API
const BASE_URL = 'https://5fbb-175-176-84-146.ngrok-free.app/it110/public/';

document.addEventListener('DOMContentLoaded', function () {
    const createEventForm = document.getElementById('createEventForm');

    createEventForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(createEventForm);

        fetch('https://5fbb-175-176-84-146.ngrok-free.app/it110/public/api/events/create', {
            method: 'POST',
            body: formData,
            headers: {
                Accept: "application/json",
                "ngrok-skip-browser-warning": "69420",
             
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Event created successfully!', data);
            // You can perform further actions after successful event creation, like displaying a success message.
        })
        .catch(error => {
            console.error('Error creating event:', error);
            // Handle errors or display an error message to the user
        });
    });
});
    








async function fetchEvents() {
    try {

        const response = await fetch("https://5fbb-175-176-84-146.ngrok-free.app/it110/public/api/events", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "ngrok-skip-browser-warning": "69420",
             
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Event data:', data);

        if (data && Array.isArray(data.events)) {
            displayEvents(data.events); // Pass the 'events' array to displayEvents
        } else {
            throw new Error('Invalid or unexpected data format');
        }

    } catch (error) {
        console.error('Error fetching event data:', error);
        // Handle the error (display an error message, retry, etc.)
    }
}




// Function to render events on the page
async function displayEvents(events) {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = ''; // Clear previous content

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('card');

        const attendeesContainer = document.createElement('div');

        // Add event details to the card (customize this part based on your data structure)
        eventCard.innerHTML = `
            <div class="card">
                <div class="card-header">${event.eventName}</div>
                <div class="card-body">
                    <p>Description: ${event.description}</p>
                    <p>Date: ${event.date}</p>
                    <p>Time: ${event.time}</p>
                    <p>Location: ${event.location}</p>
                    <div class="btn-group">
                        <button type="button" class="btn btn-primary" onclick="openEditModal(${event.eventID})">Edit</button>
                        <button type="button" class="btn btn-danger" onclick="deleteEvent(${event.eventID})">Delete</button>
                        <button type="button" class="btn btn-info showAttendeesBtn" data-eventid="${event.eventID}">Show Attendees</button>
                    </div>
                </div>
            </div>
        `;

        eventCard.appendChild(attendeesContainer);
        eventsList.appendChild(eventCard);
    });

    // Add event listener for each "Show Attendees" button
    const showAttendeesButtons = document.querySelectorAll('.showAttendeesBtn');
    showAttendeesButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const eventId = button.getAttribute('data-eventid');
            const attendeesContainer = button.parentElement.parentElement.nextElementSibling;

            if (attendeesContainer.innerHTML.trim() === '') {
                const attendees = await fetchAndDisplayAttendees(eventId);
                attendeesContainer.appendChild(attendees);
            } else {
                attendeesContainer.innerHTML = '';
            }
        });
    });
}

// Function to fetch and display event attendees
async function fetchAndDisplayAttendees(eventID) {
    try {
        const response = await fetch(`https://5fbb-175-176-84-146.ngrok-free.app/it110/public/api/events/${eventID}/attendees`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
            const attendeesList = document.createElement('ul');
            data.attendees.forEach(attendee => {
                const listItem = document.createElement('li');
                listItem.textContent = `${attendee.fname} ${attendee.lname}`;
                attendeesList.appendChild(listItem);
            });

            return attendeesList;
        } else {
            console.error('Event not found');
            // Handle the case where the event is not found
            return document.createElement('p');
        }
    } catch (error) {
        console.error('Error fetching attendees:', error);
        // Handle errors or display an error message to the user
        return document.createElement('p');
    }
}

// Fetch events when the page loads
window.addEventListener('load', fetchEvents);



// JavaScript function to delete an event
function deleteEvent(eventID) {
    if (confirm('Are you sure you want to delete this event?')) {
      fetch(`https://5fbb-175-176-84-146.ngrok-free.app/it110/public/api/events/${eventID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Include additional headers (e.g., authorization) based on your backend requirements
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          // Event deleted successfully
          console.log(`Event with ID ${eventID} deleted successfully.`);
          // Perform any necessary UI updates or additional actions after deletion
          window.location.reload();

        })
        .catch(error => {
          // Handle errors that occur during the deletion process
          console.error('There was a problem deleting the event:', error);
          // Perform any necessary error handling or display error messages to the user
        });
    }
  }
  

  function openEditModal(eventID) {
    $('#editEventModal').modal('show');

    // Fetch event details based on eventID
    fetch(`http://it110.test/api/events`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(eventData => {
            // Populate modal fields with the fetched event data
            document.getElementById('editEventName').value = eventData.eventName;
            document.getElementById('editEventDescription').value = eventData.description;
            document.getElementById('editEventDate').value = eventData.date;
            document.getElementById('editEventTime').value = eventData.time;
            document.getElementById('editEventLocation').value = eventData.location;
        })
        .catch(error => {
            console.error('Error fetching event details:', error);
            // Handle error or display error message
        });
}


document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('saveEditedEventBtn');
    if (saveButton) {
        saveButton.addEventListener('click', function () {
            const updatedEventData = {
                eventName: document.getElementById('editEventName').value,
                description: document.getElementById('editEventDescription').value,
                date: document.getElementById('editEventDate').value,
                time: document.getElementById('editEventTime').value,
                location: document.getElementById('editEventLocation').value
                // Add other fields to update based on input values from the modal
            };

            // Replace this fetch call with your actual API endpoint
            fetch('https://5fbb-175-176-84-146.ngrok-free.app/it110/public/api/events/' + eventId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEventData),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Event updated successfully:', data);
                    // Handle successful update here (e.g., close modal, update UI)
                })
                .catch(error => {
                    console.error('There was a problem updating the event:', error);
                    // Handle errors or display error messages to the user
                });
        });
    }
});
function formatDate(dateString) {
    if (!dateString || dateString.trim() === '') {
        return ''; // Handle empty or undefined date string
    }

    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) {
        return ''; // Invalid date, handle accordingly
    }

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}



document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('https://5fbb-175-176-84-146.ngrok-free.app/it110/public/api/eventTypes', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'ngrok-skip-browser-warning': '69420',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const eventTypes = await response.json();
        displayEventTypes(eventTypes);
    } catch (error) {
        console.error('Error fetching event types:', error);
    }
});

function displayEventTypes(eventTypes) {
    console.log('Received event types:', eventTypes);

    const eventTypeContainer = document.getElementById('eventTypeContainer');
    console.log('EventType container:', eventTypeContainer); // Check if the container is found

    if (eventTypeContainer) {
        // Rest of your code to render event types...
    } else {
        console.error("Element with ID 'eventTypeContainer' not found");
    }
}





document.addEventListener("DOMContentLoaded", function() {
  async function fetchEventTypes() {
    try {
      const response = await fetch("https://5fbb-175-176-84-146.ngrok-free.app/it110/public/api/eventTypes", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const eventData = await response.json();

      if (Array.isArray(eventData)) {
        const selectEventType = document.getElementById('eventType');

        eventData.forEach(eventType => {
          const option = document.createElement('option');
          option.value = eventType.eventTypeID; // Assuming eventTypeID is the value to be sent
          option.text = eventType.eventTypeName; // Adjust property according to your data
          selectEventType.appendChild(option);
        });
      } else {
        console.error('Data received from the API is not an array:', eventData);
      }
    } catch (error) {
      console.error('Error fetching event types:', error);
    }
  }

  // Call the function to fetch and populate event types in the dropdown
  fetchEventTypes();
});

$(document).ready(function() {
    // Show Create Event Form
    $('#showCreateEventForm').on('click', function() {
        $('#createEventForm').show();
        $('#eventsList').hide(); // Hide events list when form is shown
    });

    // Close Create Event Form
    $('#closeCreateEventForm').on('click', function() {
        $('#createEventForm').hide();
        $('#eventsList').show();
        $('#showCreateEventForm').show();
         // Show events list when form is closed
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const showCreateEventButton = document.getElementById('showCreateEventForm');
    const createEventForm = document.getElementById('createEventForm');
    const eventsList = document.getElementById('eventsList');
    showCreateEventButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default behavior of the button click
        
        showCreateEventButton.style.display = 'none'; // Hide the button
        createEventForm.style.display = 'block'; // Display the form
        eventsList.style.display='none';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const createEventForm = document.getElementById('createEventForm');

    if (createEventForm) {
        createEventForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Get form data
            const formData = new FormData(createEventForm);

            // Make AJAX request to submit the form data to the backend
            fetch('https://your-backend-url.com/submit-event', {
                method: 'POST',
                body: formData,
                headers: {
                    // Add any necessary headers here
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Event submitted successfully:', data);
                // Handle success or perform actions after successful event submission
            })
            .catch(error => {
                console.error('Error submitting event:', error);
                // Handle error or display an error message to the user
            });
        });
    }
});


