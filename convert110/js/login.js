document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Prepare login data
        const loginData = {
            username: username,
            password: password
        };

        // Make a POST request to the login endpoint
        fetch('https://5fbb-175-176-84-146.ngrok-free.app/it110/public/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid credentials. Please check your username and password.');
            }
            return response.json(); // Parse the JSON response
        })
        // ... (other code remains the same)

.then(data => {
    // Log the received data to check if it contains the userID field
    console.log('Received data:', data);

    // Check if the received data contains the userID field
    if (data.userID !== undefined && data.userID !== null) {
        // Store the userID in localStorage upon successful login
        localStorage.setItem('userID', data.userID);

        // Check the user role and redirect accordingly
        if (data.role === 'admin') {
            window.location.href = 'admin/dashboard.html';
        } else if (data.role === 'officer') {
            window.location.href = 'officer (1)/OfficerDashboard.html';
        } else {
            window.location.href = 'UserDashboard.html';
        }
    } else {
        // If userID is missing or undefined, handle the issue appropriately
        console.error('User ID not found in the response data');
        alert('Login failed. Please try again.');
    }
})
.catch(error => {
    console.error('There was a problem with the login:', error);
    alert('Login failed. Please check your credentials.');
});

    });
});
