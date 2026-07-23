// =============================
// BOOKING SYSTEM
// =============================

let cart = [];
let total = 0;

// =============================
// ELEMENTS
// =============================

const bookingDrawer = document.getElementById("bookingDrawer");
const openCartBtn = document.getElementById("openCart");
const closeDrawerBtn = document.getElementById("closeDrawer");
const bookingList = document.getElementById("bookingList");
const continueBookingBtn = document.getElementById("continueBooking");

const modal = document.getElementById("serviceModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const shortDescription = document.getElementById("shortDescription");
const fullDetails = document.getElementById("fullDetails");
const modalVideo = document.getElementById("modalVideo");
const viewAllBtn = document.getElementById("viewAllBtn");

const totalText = document.querySelector(".drawer-footer h3");

// =============================
// SERVICES DATA
// =============================

const services = [
{
name: "AC Servicing",
price: 499,
short: "Complete AC cleaning service.",
full: "Indoor unit cleaning, outdoor unit cleaning, filter wash, cooling check and performance testing.",
video: "videos/service.mp4"
},
{
name: "AC Repair",
price: 699,
short: "Repair all AC faults.",
full: "Technician inspection, electrical repair, PCB checking, compressor and cooling fault diagnosis.",
video: "videos/repair.mp4"
},
{
name: "AC Installation",
price: 999,
short: "Professional AC installation.",
full: "Wall mounting, copper pipe fitting, drainage setup and testing.",
video: "videos/install.mp4"
},
{
name: "AC Uninstallation",
price: 699,
short: "Safe AC removal service.",
full: "Indoor and outdoor unit removal with safety check.",
video: "videos/uninstall.mp4"
},
{
name: "Gas Refilling",
price: 2499,
short: "AC gas refill service.",
full: "Leak testing, vacuuming and complete gas charging.",
video: "videos/gas.mp4"
},
{
name: "Water Leakage",
price: 599,
short: "Fix AC water leakage.",
full: "Drain pipe cleaning, blockage removal and leakage repair.",
video: "videos/water.mp4"
},
{
name: "Cooling Problem",
price: 799,
short: "Low cooling solution.",
full: "Cooling diagnosis, sensor check and performance repair.",
video: "videos/cooling.mp4"
},
{
name: "AC Not Turning On",
price: 699,
short: "Power issue repair.",
full: "Power supply, PCB and capacitor inspection.",
video: "videos/noton.mp4"
},
{
name: "Outdoor Unit Not Working",
price: 799,
short: "Outdoor unit repair.",
full: "Fan motor, compressor and wiring inspection.",
video: "videos/outdoor.mp4"
},
{
name: "Outdoor Noise Problem",
price: 799,
short: "Noise fixing service.",
full: "Fan balancing, vibration fixing and part replacement.",
video: "videos/noise.mp4"
}
];

// =============================
// DRAWER OPEN / CLOSE
// =============================

openCartBtn.addEventListener("click", () => {
bookingDrawer.classList.add("active");
});

closeDrawerBtn.addEventListener("click", () => {
bookingDrawer.classList.remove("active");
});

// =============================
// UPDATE CART
// =============================

function updateCart() {

bookingList.innerHTML = "";

total = 0;

cart.forEach((item,index)=>{

total += item.price;

const div = document.createElement("div");

div.style.padding = "10px";
div.style.borderBottom = "1px solid #ddd";

div.innerHTML = `
<h4>${item.name}</h4>
<p>₹${item.price}</p>
<button onclick="removeItem(${index})">
Remove
</button>
`;

bookingList.appendChild(div);

});

totalText.innerText = `Total: ₹${total}`;
}

// =============================
// REMOVE ITEM
// =============================

window.removeItem = function(index){

cart.splice(index,1);

updateCart();

}

// =============================
// ADD SERVICE BUTTON
// =============================

document.querySelectorAll(".addService").forEach((btn,index)=>{

btn.addEventListener("click",()=>{

cart.push(services[index]);

updateCart();

bookingDrawer.classList.add("active");

alert(services[index].name + " Added Successfully");

});

});

// =============================
// MORE DETAILS BUTTON
// =============================

document.querySelectorAll(".viewDetails").forEach((btn,index)=>{

btn.addEventListener("click",()=>{

const service = services[index];

modalTitle.innerText = service.name;

shortDescription.innerText = service.short;

fullDetails.innerHTML = "";

modalVideo.querySelector("source").src = service.video;
modalVideo.load();

viewAllBtn.onclick = ()=>{

fullDetails.innerHTML = `
<h3>Full Details</h3>
<p>${service.full}</p>
<p><strong>Price:</strong> ₹${service.price}</p>
`;

};

modal.style.display = "flex";

});

});

// =============================
// CLOSE MODAL
// =============================

closeModal.addEventListener("click",()=>{

modal.style.display = "none";

});

// =============================
// CONTINUE BOOKING
// =============================

continueBookingBtn.addEventListener("click",()=>{

if(cart.length === 0){

alert("Please Add At Least One Service");

return;

}

localStorage.setItem("bookingServices",JSON.stringify(cart));

window.location.href = "booking.html";

});