document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const registrationSuccess = document.querySelector('.registration-success');

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(registrationForm);
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        fetch('https://5fbb-175-176-84-146.ngrok-free.app/it110/public/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                // Handle non-JSON response (likely HTML)
                throw new Error('Received non-JSON response');
            }
        })
        .then(data => {
            // Handle JSON data if successful
            registrationSuccess.style.display = 'block';
            registrationForm.reset();
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        })
        .catch(error => {
            console.error('Error occurred:', error);
            // Handle non-JSON response or other errors here
        });
    });
});
