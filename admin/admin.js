async function fetchOfficers() {
    try {
        const response = await fetch("https://5fbb-175-176-84-146.ngrok-free.app/it110/public/api/get-officers", {
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
        console.log('Officers data:', data);

        if (Array.isArray(data) && data.length > 0) {
            displayOfficers(data);
        } else {
            displayNoOfficersFound();
        }

    } catch (error) {
        console.error('Error fetching officer data:', error);
        displayNoOfficersFound();
    }
}

function displayOfficers(officers) {
    const officersCards = document.getElementById('officersCards');
    officersCards.innerHTML = '';

    officers.forEach(officer => {
        const card = document.createElement('div');
        card.classList.add('col-md-6', 'mb-3');

        const imageSrc = officer.image ? officer.image : 'placeholder.jpg'; // Set placeholder image if officer image not available

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'delete-btn');
        deleteButton.setAttribute('data-officer-id', officer.userID);
        deleteButton.innerHTML = `
            <i class="fas fa-trash-alt"></i> Delete
        `;
        deleteButton.addEventListener('click', function() {
            deleteOfficer(officer.userID); // Call deleteOfficer function with the officer's userID
        });

        card.innerHTML = `
            <div class="card">
                <img src="${imageSrc}" class="card-img-top" alt="Officer Image">
                <div class="card-body">
                    <h5 class="card-title">${officer.fname} ${officer.lname}</h5>
                    <p class="card-text">Email: ${officer.email}</p>
                </div>
            </div>
        `;

        card.querySelector('.card-body').appendChild(deleteButton);
        officersCards.appendChild(card);
    });
}


// Function to display a message when no officers are found
function displayNoOfficersFound() {
    const officersCards = document.getElementById('officersCards');
    officersCards.innerHTML = '<p>No officers found.</p>';
}


// Fetch officers when the page loads
window.addEventListener('load', fetchOfficers);

// Function to display a message
function displayMessage(message, isSuccess = true) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.classList.remove('text-danger', 'text-success');
    messageElement.classList.add(isSuccess ? 'text-success' : 'text-danger');
}
async function deleteOfficer(userID) {
    const confirmDelete = confirm('Are you sure you want to remove this officer?');

    if (confirmDelete) {
        try {
            const response = await fetch(`https://5fbb-175-176-84-146.ngrok-free.app/it110/public/api/officers/${userID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            // Officer deleted successfully
            displayMessage(`Officer with ID ${userID} deleted successfully.`, true);

            // After deletion, fetch and display the updated officers list
            await fetchOfficers();
        } catch (error) {
            // Handle errors that occur during the deletion process
            displayMessage(`Error deleting officer: ${error.message}`, false);
        }
    }
}








// Function to handle editing an officer
function editOfficer(userID) {
    // Logic to fetch officer details using userID and populate the modal fields
    fetch(`http://it110.test/api/officers/${userID}`)
        .then(response => response.json())
        .then(data => {
            // Populate modal fields with officer details
            document.getElementById('username').value = data.username;
            document.getElementById('fname').value = data.fname;
            document.getElementById('lname').value = data.lname;
            document.getElementById('email').value = data.email;

            // Show the edit officer modal
            $('#editOfficerModal').modal('show');
        })
        .catch(error => {
            console.error('Error fetching officer details:', error);
        });

    // Logic to handle form submission for updating officer details
    const saveChangesBtn = document.getElementById('saveChangesBtn');
    saveChangesBtn.addEventListener('click', function() {
        // Logic to update officer details (make a PUT request to update details)
        // Implement the logic to update officer details using fetch or other means

        // After updating the officer details, you can close the modal if needed
        $('#editOfficerModal').modal('hide');
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const addOfficerForm = document.getElementById('addOfficerForm');

    addOfficerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(addOfficerForm);

        fetch('https://5fbb-175-176-84-146.ngrok-free.app/it110/public/api/officers/add', {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                "ngrok-skip-browser-warning": "69420",
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add officer');
            }
            return response.json();
        })
        .then(data => {
            console.log('Officer added successfully:', data);
            // Optionally, perform actions after successful addition (e.g., close modal, display success message)
            $('#addOfficerModal').modal('hide'); // Close the modal using Bootstrap modal's hide method
        })
        .catch(error => {
            console.error('Error adding officer:', error);
            // Optionally, display an error message or handle the error
        });
    });
});
