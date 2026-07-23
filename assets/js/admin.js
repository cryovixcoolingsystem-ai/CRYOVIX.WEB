/* ==========================================
   CRYOVIX FIXIFY
   SUPER ADMIN DASHBOARD
   dashboard.js PART 1
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    // ===========================
    // ELEMENTS
    // ===========================

    const menuLinks = document.querySelectorAll(".menu li a");
    const sections = document.querySelectorAll("section");

    const sidebar = document.querySelector(".sidebar");
    const menuToggle = document.querySelector(".menu-toggle");

    const profileMenu = document.querySelector(".profile-menu");
    const profileButton = document.querySelector(".profile-btn");

    const logoutBtn = document.getElementById("logoutBtn");



    // ===========================
    // ACTIVE MENU
    // ===========================

    menuLinks.forEach(link => {

        link.addEventListener("click", function(e){

            let href = this.getAttribute("href");

            if(href.startsWith("#")){

                e.preventDefault();

                menuLinks.forEach(item=>{

                    item.parentElement.classList.remove("active");

                });

                this.parentElement.classList.add("active");

                const target = document.querySelector(href);

                if(target){

                    target.scrollIntoView({

                        behavior:"smooth"

                    });

                }

            }

        });

    });



    // ===========================
    // MOBILE SIDEBAR
    // ===========================

    if(menuToggle){

        menuToggle.addEventListener("click",()=>{

            sidebar.classList.toggle("active");

        });

    }



    // ===========================
    // PROFILE DROPDOWN
    // ===========================

    if(profileButton){

        profileButton.addEventListener("click",()=>{

            profileMenu.classList.toggle("active");

        });

    }



    window.addEventListener("click",(e)=>{

        if(profileMenu){

            if(!profileMenu.contains(e.target)){

                profileMenu.classList.remove("active");

            }

        }

    });



    // ===========================
    // COUNTER ANIMATION
    // ===========================

    function animateCounter(id,target){

        const element=document.getElementById(id);

        if(!element) return;

        let count=0;

        const speed=Math.ceil(target/100);

        const timer=setInterval(()=>{

            count+=speed;

            if(count>=target){

                count=target;

                clearInterval(timer);

            }

            element.innerHTML=count;

        },20);

    }



    animateCounter("bookingCount",1520);

    animateCounter("customerCount",3285);

    animateCounter("employeeCount",86);



    const revenue=document.getElementById("revenue");

    if(revenue){

        revenue.innerHTML="₹4,85,000";

    }



    // ===========================
    // ADMIN NAME
    // ===========================

    const welcome=document.getElementById("welcomeName");

    if(welcome){

        const email=localStorage.getItem("adminEmail");

        if(email){

            welcome.innerHTML=email;

        }

    }



    // ===========================
    // DATE TIME
    // ===========================

    function updateClock(){

        const clock=document.getElementById("liveClock");

        if(!clock) return;

        const now=new Date();

        clock.innerHTML=now.toLocaleString();

    }

    setInterval(updateClock,1000);

    updateClock();



    // ===========================
    // LOGOUT
    // ===========================

    if(logoutBtn){

        logoutBtn.addEventListener("click",(e)=>{

            e.preventDefault();

            if(confirm("Logout from Dashboard?")){

                localStorage.clear();

                window.location.href="../../login.html";

            }

        });

    }

});
/* ==========================================
   dashboard.js PART 2A-1
   CUSTOMER CRUD
========================================== */

let customers = JSON.parse(localStorage.getItem("customers")) || [

    {
        id: "CF001",
        name: "Rahul Sharma",
        phone: "9876543210",
        city: "Delhi"
    },

    {
        id: "CF002",
        name: "Mohit Kumar",
        phone: "9876501234",
        city: "Noida"
    }

];


/* ===========================
   SAVE
=========================== */

function saveCustomers(){

    localStorage.setItem(
        "customers",
        JSON.stringify(customers)
    );

}


/* ===========================
   RENDER TABLE
=========================== */

function renderCustomers(){

    const tbody =
    document.getElementById("customerTableBody");

    if(!tbody) return;

    tbody.innerHTML = "";

    customers.forEach((customer,index)=>{

        tbody.innerHTML += `

        <tr>

            <td>${customer.id}</td>

            <td>${customer.name}</td>

            <td>${customer.phone}</td>

            <td>${customer.city}</td>

            <td>

                <button
                class="action-btn edit-btn"
                onclick="editCustomer(${index})">

                Edit

                </button>

                <button
                class="action-btn delete-btn"
                onclick="deleteCustomer(${index})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}


/* ===========================
   ADD CUSTOMER
=========================== */

function addCustomer(){

    let id =
    prompt("Customer ID");

    if(!id) return;

    let name =
    prompt("Customer Name");

    if(!name) return;

    let phone =
    prompt("Phone Number");

    if(!phone) return;

    let city =
    prompt("City");

    if(!city) return;

    customers.push({

        id:id,

        name:name,

        phone:phone,

        city:city

    });

    saveCustomers();

    renderCustomers();

}


/* ===========================
   EDIT CUSTOMER
=========================== */

function editCustomer(index){

    let customer = customers[index];

    let name = prompt(

        "Customer Name",

        customer.name

    );

    if(!name) return;

    let phone = prompt(

        "Phone Number",

        customer.phone

    );

    if(!phone) return;

    let city = prompt(

        "City",

        customer.city

    );

    if(!city) return;

    customer.name = name;

    customer.phone = phone;

    customer.city = city;

    saveCustomers();

    renderCustomers();

}


/* ===========================
   DELETE CUSTOMER
=========================== */

function deleteCustomer(index){

    if(

        confirm(

        "Delete this customer?"

        )

    ){

        customers.splice(index,1);

        saveCustomers();

        renderCustomers();

    }

}


/* ===========================
   BUTTON EVENT
=========================== */

document.addEventListener(

"DOMContentLoaded",

()=>{

    renderCustomers();

    const btn =

    document.getElementById(

    "addCustomerBtn"

    );

    if(btn){

        btn.addEventListener(

        "click",

        addCustomer

        );

    }

});

/* ==========================================
   dashboard.js PART 2A-2.1
   EMPLOYEE CRUD
========================================== */


/* ==========================
   EMPLOYEE DATA
========================== */

let employees = JSON.parse(localStorage.getItem("employees")) || [

{
    id:"EMP001",
    name:"Rohit Kumar",
    phone:"9876543210",
    role:"AC Technician",
    city:"Delhi"
},

{
    id:"EMP002",
    name:"Aman Singh",
    phone:"9876500000",
    role:"Electrician",
    city:"Noida"
}

];


/* ==========================
   SAVE
========================== */

function saveEmployees(){

    localStorage.setItem(

        "employees",

        JSON.stringify(employees)

    );

}


/* ==========================
   RENDER TABLE
========================== */

function renderEmployees(){

    const tbody =
    document.getElementById("employeeTableBody");

    if(!tbody) return;

    tbody.innerHTML="";

    employees.forEach((emp,index)=>{

        tbody.innerHTML += `

        <tr>

            <td>${emp.id}</td>

            <td>${emp.name}</td>

            <td>${emp.phone}</td>

            <td>${emp.role}</td>

            <td>${emp.city}</td>

            <td>

                <button
                class="action-btn edit-btn"
                onclick="editEmployee(${index})">

                Edit

                </button>

                <button
                class="action-btn delete-btn"
                onclick="deleteEmployee(${index})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}


/* ==========================
   ADD EMPLOYEE
========================== */

function addEmployee(){

    const id = prompt("Employee ID");

    if(!id) return;

    const name = prompt("Employee Name");

    if(!name) return;

    const phone = prompt("Phone Number");

    if(!phone) return;

    const role = prompt("Employee Role");

    if(!role) return;

    const city = prompt("City");

    if(!city) return;

    employees.push({

        id,

        name,

        phone,

        role,

        city

    });

    saveEmployees();

    renderEmployees();

}


/* ==========================
   EDIT EMPLOYEE
========================== */

function editEmployee(index){

    const emp = employees[index];

    const name = prompt(

        "Employee Name",

        emp.name

    );

    if(!name) return;

    const phone = prompt(

        "Phone Number",

        emp.phone

    );

    if(!phone) return;

    const role = prompt(

        "Role",

        emp.role

    );

    if(!role) return;

    const city = prompt(

        "City",

        emp.city

    );

    if(!city) return;

    emp.name = name;

    emp.phone = phone;

    emp.role = role;

    emp.city = city;

    saveEmployees();

    renderEmployees();

}


/* ==========================
   DELETE EMPLOYEE
========================== */

function deleteEmployee(index){

    if(confirm("Delete Employee?")){

        employees.splice(index,1);

        saveEmployees();

        renderEmployees();

    }

}


/* ==========================
   BUTTON EVENT
========================== */

document.addEventListener(

"DOMContentLoaded",

()=>{

    renderEmployees();

    const btn =

    document.getElementById(

        "addEmployeeBtn"

    );

    if(btn){

        btn.addEventListener(

            "click",

            addEmployee

        );

    }

});