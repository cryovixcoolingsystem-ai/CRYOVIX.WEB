// Live GPS Location Detect karne ka function
function fetchLiveLocation() {
    const locationText = document.getElementById('locationText');
    
    // Loading Animation dikhana
    locationText.innerText = "Detecting location...";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                try {
                    // OpenStreetMap Reverse Geocoding API se City & Country fetch karna
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                    const data = await response.json();

                    // City aur Country ka naam nikalna
                    const city = data.address.city || data.address.town || data.address.village || data.address.state_district || "Unknown City";
                    const country = data.address.country || "World";

                    // Live Location badge par update karna
                    locationText.innerText = `${city}, ${country}`;

                    // Future use/booking ke liye location save karna
                    localStorage.setItem('user_live_city', `${city}, ${country}`);

                } catch (error) {
                    console.error("Geocoding Error:", error);
                    locationText.innerText = "Mumbai, India"; // Fallback
                    alert("Location details receive nahi ho saki. Default set kar diya gaya hai.");
                }
            },
            (error) => {
                console.warn("GPS Permission Denied:", error.message);
                locationText.innerText = "Mumbai, India";
                alert("Kripya browser mein location permission allow karein taaki aapki live location detect ho sake.");
            }
        );
    } else {
        alert("Aapka browser Geolocation support nahi karta.");
        locationText.innerText = "Mumbai, India";
    }
}

// Page load hone par automatically check karna agar pehle se location saved ho
window.addEventListener('DOMContentLoaded', () => {
    const savedLocation = localStorage.getItem('user_live_city');
    if (savedLocation) {
        document.getElementById('locationText').innerText = savedLocation;
    }
});


  window.addEventListener('DOMContentLoaded', () => {
    // 1. URL se search parameters nikalein
    const urlParams = new URLSearchParams(window.location.search);
    const selectedService = urlParams.get('service');
    const offerDetails = urlParams.get('offer') || urlParams.get('price');

    // 2. Booking form elements ko select karein
    const serviceInput = document.getElementById('service-name'); // Apne form ke input/select ID ke mutabiq change karein
    const offerInput = document.getElementById('offer-details');   // Agar offer detail ka hidden/visible field ho

    // 3. Automated Fill
    if (selectedService && serviceInput) {
      serviceInput.value = selectedService;
    }

    if (offerDetails && offerInput) {
      offerInput.value = offerDetails;
    }
  });


  //  SEARCH FUNCTIONALITY
function performServiceSearch() {
    const query = document.getElementById('heroSearchInput').value.trim().toLowerCase();
    
    if (!query) {
        alert("Kripya search karne ke liye kisi service ka naam likhein!");
        return;
    }

    // Top Categories ke saare cards ko dhundna
    const categoryCards = document.querySelectorAll('.categories-grid .cat-card');
    let foundCard = null;

    categoryCards.forEach(card => {
        // Purana highlight style hatana
        card.style.border = "none";
        card.style.transform = "scale(1)";
        
        const cardText = card.innerText.toLowerCase();
        
        // Agar match mil jata hai
        if (cardText.includes(query) && !foundCard) {
            foundCard = card;
        }
    });

    if (foundCard) {
        // 1. Agar category screen par hai, to smooth scroll karke wahan jaye
        foundCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // 2. Card ko highlight karein
        foundCard.style.transition = "all 0.4s ease";
        foundCard.style.border = "2px solid #6366f1";
        foundCard.style.boxShadow = "0 0 15px rgba(99, 102, 241, 0.4)";
        foundCard.style.transform = "scale(1.08)";

        // 3 seconds baad highlight remove ho jaye
        setTimeout(() => {
            foundCard.style.border = "none";
            foundCard.style.boxShadow = "none";
            foundCard.style.transform = "scale(1)";
        }, 3000);

    } else {
        // Agar category list me nahi mil rahi to seedha Booking Page par bhej dein
        const formattedService = encodeURIComponent(query);
        window.location.href = `booking.html?service=${formattedService}`;
    }
}

// Enter Key press karne par bhi search execute ho
document.getElementById('heroSearchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        performServiceSearch();
    }
});

//Hero Section (Home)
window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('section, footer');
    let navLinks = document.querySelectorAll('header nav a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) {
            a.classList.add('active');
        }
    });
});
