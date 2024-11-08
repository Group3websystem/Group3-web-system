let map; // Declare the map variable globally

function initMap() {
    map = L.map('map').setView([51.505, -0.09], 13); // Initialize the map

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Optional: Add a marker at the initial location
    const marker = L.marker([51.505, -0.09]).addTo(map);
    marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
}

// Function to handle the search
async function searchLocation() {
    const searchInput = document.getElementById('search-input').value;
    if (searchInput) {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchInput)}&format=json&limit=1`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.length > 0) {
                const { lat, lon } = data[0]; // Get the latitude and longitude
                map.setView([lat, lon], 13); // Set map view to the new coordinates

                // Optional: Add a marker at the searched location
                L.marker([lat, lon]).addTo(map).bindPopup(`<b>${data[0].display_name}</b>`).openPopup();
            } else {
                alert('Location not found. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching location:', error);
            alert('Error fetching location. Please try again.');
        }
    }
}

// Function to handle Enter key in the search bar
function handleSearch(event) {
    if (event.key === 'Enter') {
        searchLocation();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initMap(); 
});
