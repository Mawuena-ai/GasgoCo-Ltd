// This selects all the links in the navigation bar
const navLinks = document.querySelectorAll('header nav ul li a');

// This selects all the main sections on the page
const sections = document.querySelectorAll('main section');

// This function adds or removes the active class on the navigation links
const options = {
    root: null, // The viewport
    threshold: 0.5, // Trigger when 50% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove 'active-nav-link' class from all links
            navLinks.forEach(link => link.classList.remove('active-nav-link'));

            // Find the link that corresponds to the visible section
            const id = entry.target.id;
            const activeLink = document.querySelector(`header nav ul li a[href="#${id}"]`);

            // Add the 'active-nav-link' class to the correct link
            if (activeLink) {
                activeLink.classList.add('active-nav-link');
            }
        }
    });
}, options);

// Tell the observer to watch each section
sections.forEach(section => {
    observer.observe(section);
});

// We'll also keep the fade-in effect for each section
const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.2
});

const sectionsToAnimate = document.querySelectorAll('main section');

sectionsToAnimate.forEach(section => {
    fadeObserver.observe(section);
});

// Add this new function to your existing script.js file
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.classList.toggle('active');
}
// Functionality for the lubricant slider
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.lubricant-slider-container');
    const slider = document.querySelector('.lubricant-slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let counter = 0;
    
    // Ensure the slider elements exist before adding functionality
    if (slider && slides.length > 0) {
        const slideWidth = slides[0].offsetWidth;

        nextButton.addEventListener('click', () => {
            if (counter >= slides.length - 1) {
                counter = 0;
            } else {
                counter++;
            }
            slider.style.transform = `translateX(${-slideWidth * counter}px)`;
        });

        prevButton.addEventListener('click', () => {
            if (counter <= 0) {
                counter = slides.length - 1;
            } else {
                counter--;
            }
            slider.style.transform = `translateX(${-slideWidth * counter}px)`;
        });
    }
});
// Functionality for the lubricant slider
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.lubricant-slider-container');
    const slider = document.querySelector('.lubricant-slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let counter = 0;
    
    // Ensure the slider elements exist before adding functionality
    if (slider && slides.length > 0) {
        const slideWidth = slides[0].offsetWidth;

        // Function to move the slide
        const moveSlide = () => {
            slider.style.transform = `translateX(${-slideWidth * counter}px)`;
        };

        // Automatic sliding functionality
        setInterval(() => {
            if (counter >= slides.length - 1) {
                counter = 0;
            } else {
                counter++;
            }
            moveSlide();
        }, 5000); // 5000 milliseconds = 5 seconds

        nextButton.addEventListener('click', () => {
            if (counter >= slides.length - 1) {
                counter = 0;
            } else {
                counter++;
            }
            moveSlide();
        });

        prevButton.addEventListener('click', () => {
            if (counter <= 0) {
                counter = slides.length - 1;
            } else {
                counter--;
            }
            moveSlide();
        });
    }
});
// firebase-auth.js

// Firebase Authentication functions
const auth = firebase.auth();

// Function to sign up a new user
function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

// Function to sign in an existing user
function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

// Function to sign out the current user
function signOut() {
    return auth.signOut();
}

// Listen for authentication state changes
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in, update UI
        console.log("User is signed in:", user.email);
        document.getElementById('auth-status').textContent = `Signed in as: ${user.email}`;
    } else {
        // User is signed out, update UI
        console.log("User is signed out.");
        document.getElementById('auth-status').textContent = 'Signed out';
    }
});

// Example usage (you would connect this to your UI)
// You would have forms for sign-up and sign-in in your HTML.
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signUp(email, password)
        .then(() => {
            console.log('User signed up successfully!');
        })
        .catch(error => {
            console.error('Sign-up error:', error.message);
        });
});

document.getElementById('signout-button').addEventListener('click', () => {
    signOut()
        .then(() => {
            console.log('User signed out successfully!');
        })
        .catch(error => {
            console.error('Sign-out error:', error.message);
        });
});

// firebase-crud.js

const db = firebase.firestore();
const outletListContainer = document.getElementById('outlet-list');
const addOutletForm = document.getElementById('add-outlet-form');
const adminPanel = document.getElementById('admin-panel');

// Check if user is logged in to show/hide the admin panel
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        adminPanel.style.display = 'block';
    } else {
        adminPanel.style.display = 'none';
    }
});

// Function to CREATE a new outlet
addOutletForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('outlet-name').value;
    const location = document.getElementById('outlet-location').value;
    const tel = document.getElementById('outlet-tel').value;
    const lat = parseFloat(document.getElementById('outlet-lat').value);
    const lng = parseFloat(document.getElementById('outlet-lng').value);

    // Basic validation to ensure lat and lng are valid numbers
    if (isNaN(lat) || isNaN(lng)) {
        alert("Please enter valid numbers for Latitude and Longitude.");
        return;
    }

    try {
        await db.collection("outlets").add({
            name,
            location,
            tel,
            lat, // Add the latitude
            lng, // Add the longitude
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("Outlet added successfully!");
        addOutletForm.reset();
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

// Function to READ all outlets and display them on the page
function getOutlets() {
    db.collection("outlets").orderBy("timestamp", "desc").onSnapshot((querySnapshot) => {
        outletListContainer.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const outletItem = document.getElementById('outlet-template').content.cloneNode(true);
            
            outletItem.querySelector('.outlet-name').textContent = data.name;
            outletItem.querySelector('.outlet-location').textContent = data.location;
            outletItem.querySelector('.outlet-tel').textContent = data.tel;

            const editButton = outletItem.querySelector('.edit-btn');
            const deleteButton = outletItem.querySelector('.delete-btn');

            editButton.addEventListener('click', () => updateOutlet(doc.id, data));
            deleteButton.addEventListener('click', () => deleteOutlet(doc.id));

            outletListContainer.appendChild(outletItem);
        });
    });
}

// Function to UPDATE an existing outlet
function updateOutlet(id, currentData) {
    const newName = prompt("Enter new name:", currentData.name);
    const newLocation = prompt("Enter new location:", currentData.location);
    const newTel = prompt("Enter new telephone:", currentData.tel);

    if (newName && newLocation && newTel) {
        db.collection("outlets").doc(id).update({
            name: newName,
            location: newLocation,
            tel: newTel
        })
        .then(() => {
            alert("Outlet successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }
}

// Function to DELETE an outlet
function deleteOutlet(id) {
    if (confirm("Are you sure you want to delete this outlet?")) {
        db.collection("outlets").doc(id).delete()
        .then(() => {
            alert("Outlet successfully deleted!");
        })
        .catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
}

// Call getOutlets to display the list when the page loads
getOutlets();

let map;

function initMap() {
  const accra = { lat: 5.6037, lng: -0.1870 }; // Center the map on Accra
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: accra,
  });

  // Use the Firebase CRUD function to get your outlets
  // This will dynamically create markers for each outlet
  firebase.firestore().collection("outlets").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // You need to add latitude and longitude to your outlets in Firebase
      // For example, each outlet document should have fields like:
      // { name: "Accra Outlet", location: "...", lat: 5.6148, lng: -0.2058, ... }
      
      if (data.lat && data.lng) {
        new google.maps.Marker({
          position: { lat: data.lat, lng: data.lng },
          map,
          title: data.name,
        });
      }
    });
  });
}