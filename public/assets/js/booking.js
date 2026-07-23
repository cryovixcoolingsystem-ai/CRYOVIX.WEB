import {
  db,
  storage,
  collection,
  addDoc,
  serverTimestamp,
  ref,
  uploadBytes,
  getDownloadURL
} from "./firebase.js";
import {
 db,
 storage
} from "./firebase.js";

import {
 collection,
 addDoc,
 serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
 ref,
 uploadBytes,
 getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";

const bookingForm =
document.getElementById("bookingForm");

bookingForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

try{

const bookingId =
"CFX"+
Date.now();

let imageUrl = "";

const imageInput =
document.querySelector(
'input[type="file"]'
);

if(imageInput.files[0]){

const file =
imageInput.files[0];

const storageRef =
ref(
storage,
`bookings/${bookingId}/${file.name}`
);

await uploadBytes(
storageRef,
file
);

imageUrl =
await getDownloadURL(
storageRef
);

}

await addDoc(
collection(db,"bookings"),
{

bookingId:bookingId,

name:
document.getElementById("name").value,

phone:
document.getElementById("phone").value,

category:
document.querySelector(
'input[name="category"]:checked'
)?.value || "",

issue:
document.getElementById("issueSelect").value,

image:imageUrl,

status:"Pending",

createdAt:
serverTimestamp()

});

alert(
"Booking Submitted Successfully"
);

bookingForm.reset();

}
catch(error){

console.error(error);

alert(
"Booking Failed"
);

}

});

// ==========================================
// Submit Booking
// ==========================================

document
  .getElementById("bookingForm")
  .addEventListener("submit", async (e) => {

e.preventDefault();

const submitBtn = document.querySelector(".submit-btn");

submitBtn.disabled = true;
submitBtn.textContent = "Booking...";

try {

  // ---------------------------
  // Basic Data
  // ---------------------------

  const category =
    document.querySelector('input[name="category"]:checked')?.value || "";

  const issue =
    document.getElementById("issueSelect").value;

  const name =
    document.getElementById("name").value;

  const phone =
    document.getElementById("phone").value;

  // File input
  const fileInput =
    document.querySelector('input[type="file"]');

  let imageUrls = [];

  // ---------------------------
  // Upload Images
  // ---------------------------

  if (fileInput.files.length > 0) {

    for (const file of fileInput.files) {

      const fileRef = ref(
        storage,
        `bookings/${Date.now()}_${file.name}`
      );

      await uploadBytes(fileRef, file);

      const url = await getDownloadURL(fileRef);

      imageUrls.push(url);
    }
  }

  // ---------------------------
  // Generate Booking ID
  // ---------------------------

  const bookingId =
    "CRYO-" +
    Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

  // ---------------------------
  // Save to Firestore
  // ---------------------------

  await addDoc(collection(db, "bookings"), {

    bookingId,
    category,
    issue,
    name,
    phone,
    imageUrls,

    status: "Pending",

    createdAt: serverTimestamp()

  });

  // ---------------------------
  // Success
  // ---------------------------

  alert(`Booking Successful! ID: ${bookingId}`);

  document.getElementById("bookingForm").reset();

  currentStep = 0;
  updateProgress();

} catch (error) {

  console.error(error);

  alert("Booking failed. Please try again.");

} finally {

  submitBtn.disabled = false;
  submitBtn.innerHTML =
    '<i class="fa-solid fa-check"></i> Book Service';

}

});