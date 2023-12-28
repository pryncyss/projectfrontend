// settings.js

document.addEventListener('DOMContentLoaded', function () {
    // Change Password logic
    document.getElementById('changePasswordForm').addEventListener('submit', function (event) {
        event.preventDefault();
        handleChangePassword();
    });
});

function handleChangePassword() {
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match');
        return;
    }

    // Implement password change logic here
    // For demonstration purposes, we'll just show an alert
    alert('Password changed successfully');
}
