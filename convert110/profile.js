function handleImageUpload() {
    const fileInput = document.getElementById('imageUpload');
    const profileImage = document.getElementById('profileImage');

    const file = fileInput.files[0];

    // Check if a file is selected
    if (file) {
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('profileImage', file, file.name);

        // Perform a POST request to your server endpoint
        fetch('/upload-profile-image', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Assuming the server responds with the new image URL
            const newImageUrl = data.imageUrl;

            // Update the profile image in the UI
            profileImage.src = newImageUrl;

            // You can also update the image source in your database
            // ... (Add your database update logic here)
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    }
}

function triggerFileInput() {
    const fileInput = document.getElementById('imageUpload');
    fileInput.click();
}