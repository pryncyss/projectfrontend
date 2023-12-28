function toggleEventDetails(button) {
    // Find the next sibling element, which is the event details
    var eventDetails = button.nextElementSibling;

    // Toggle the visibility of event details
    eventDetails.style.display = (eventDetails.style.display === 'none' || eventDetails.style.display === '') ? 'block' : 'none';
}

function showEventDetails(event) {
    // Hide all event details
    var eventDetailsContainers = document.querySelectorAll('.event-details-container');
    eventDetailsContainers.forEach(function(container) {
        container.style.display = 'none';
    });

    // Show the selected event details
    var eventId = event.getAttribute('data-event-id');
    var eventDetailsContainer = document.getElementById('eventDetailsContainer_' + eventId);
    eventDetailsContainer.style.display = 'block';
}

function showEventDetailsModal(eventTypeName, eventCount, ...events) {
var modalBody = document.getElementById('eventDetailsModalBody');
var modalContent = '';

if (eventCount > 0) {
    modalContent += '<ul class="event-list event-details">';
    events.forEach(function (event) {
        modalContent += '<li>';
        modalContent += '<strong>' + event.eventName + '</strong>';
        modalContent += '<div>';
        modalContent += 'Description: ' + event.description + '<br>';
        modalContent += 'Date: ' + event.date + '<br>';
        modalContent += 'Time: ' + event.time + '<br>';
        modalContent += 'Location: ' + event.location;
        modalContent += '</div>';
        modalContent += '</li>';
    });
    modalContent += '</ul>';
} else {
    modalContent = '<p>No events available for ' + eventTypeName + '.</p>';
}

modalBody.innerHTML = modalContent;
$('#eventDetailsModal').modal('show'); // Show the modal
}


function toggleEventDetails(button) {
    // Find the next sibling element, which is the event details
    var eventDetails = button.nextElementSibling;

    // Toggle the visibility of event details
    eventDetails.style.display = (eventDetails.style.display === 'none' || eventDetails.style.display === '') ? 'block' : 'none';
}

function showEventDetails(event) {
    // Hide all event details
    var eventDetailsContainers = document.querySelectorAll('.event-details-container');
    eventDetailsContainers.forEach(function(container) {
        container.style.display = 'none';
    });

    // Show the selected event details
    var eventId = event.getAttribute('data-event-id');
    var eventDetailsContainer = document.getElementById('eventDetailsContainer_' + eventId);
    eventDetailsContainer.style.display = 'block';
}

function showEventDetailsModal(eventTypeName, eventCount, ...events) {
var modalBody = document.getElementById('eventDetailsModalBody');
var modalContent = '';

if (eventCount > 0) {
    modalContent += '<ul class="event-list event-details">';
    events.forEach(function (event) {
        modalContent += '<li>';
        modalContent += '<strong>' + event.eventName + '</strong>';
        modalContent += '<div>';
        modalContent += 'Description: ' + event.description + '<br>';
        modalContent += 'Date: ' + event.date + '<br>';
        modalContent += 'Time: ' + event.time + '<br>';
        modalContent += 'Location: ' + event.location;
        modalContent += '</div>';
        modalContent += '</li>';
    });
    modalContent += '</ul>';
} else {
    modalContent = '<p>No events available for ' + eventTypeName + '.</p>';
}

modalBody.innerHTML = modalContent;
$('#eventDetailsModal').modal('show'); // Show the modal
}


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
function displayEvents(events) {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = ''; // Clear previous content

    events.forEach(event => {
        // Create HTML elements for each event and append to eventsList
        const eventCard = document.createElement('div');
        eventCard.classList.add('card');
        // Add event details to the card (you can customize this part based on your data structure)
        eventCard.innerHTML = `
        <div class="card">
        <div class="card-header">${event.eventName}</div>
        <div class="card-body">
            <p>Description: ${event.description}</p>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
            <p>Location: ${event.location}</p>
            <div class="btn-group">
            <button class="btn btn-primary" onclick="joinEvent('${event.eventID}')">Join Event</button>
            <button class="btn btn-danger" onclick="cancelJoinEvent('${event.eventID}')">Cancel Joining</button>
            

</div>

        </div>
    </div>
        `;
        eventsList.appendChild(eventCard);
    });
}

// Fetch events when the page loads
window.addEventListener('load', fetchEvents);


async function joinEvent(eventID) {
    const userID = localStorage.getItem('userID');

    if (!userID) {
        console.log('User is not logged in');
        return;
    }

    try {
        const response = await fetch(`https://5fbb-175-176-84-146.ngrok-free.app/it110/public/api/events/${eventID}/join/${userID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'ngrok-skip-browser-warning': '69420',
            },
            body: JSON.stringify({}) // You may include additional data if needed
        });

        if (!response.ok) {
            throw new Error('Failed to join the event');
        }

        const data = await response.json();
        console.log('Join event response:', data);

        // Show the success message
        document.getElementById('successMessage').style.display = 'block';
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 5000); // Hide the message after 5 seconds (adjust as needed)
    } catch (error) {
        console.error('Error joining event:', error);
        alert('Failed to join the event');
    }
}

async function cancelJoinEvent(eventID) {
    const userID = localStorage.getItem('userID');

    if (!userID) {
        console.log('User is not logged in');
        return;
    }

    try {
        const response = await fetch(`https://5fbb-175-176-84-146.ngrok-free.app/it110/public/api/events/${eventID}/cancel-join/${userID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'ngrok-skip-browser-warning': '69420',
            },
            body: JSON.stringify({}) // You may include additional data if needed
        });

        if (!response.ok) {
            throw new Error('Failed to cancel joining the event');
        }

        const data = await response.json();
        console.log('Cancel join event response:', data);

        // Show the cancellation success message
        const cancelMessageElement = document.getElementById('cancelMessage');
        if (cancelMessageElement) {
            cancelMessageElement.textContent = 'Successfully cancelled joining the event';
            cancelMessageElement.style.display = 'block';
            setTimeout(() => {
                cancelMessageElement.style.display = 'none';
            }, 5000); // Hide the message after 5 seconds (adjust as needed)
        } else {
            console.error('Cancel message element not found');
        }
        
        // After cancelling, you might want to refresh the events displayed
        fetchEvents(); // Assuming fetchEvents function fetches and displays events again
    } catch (error) {
        console.error('Error cancelling join event:', error);
        alert('Failed to cancel joining the event');
    }
}
