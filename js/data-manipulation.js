// data-manipulation.html EXCLUSIVELY USES THIS
// HANDLEBARS NOW IMPLEMENTED
/* ------ FOOTER TIME DISPLAY START ------ */
const timer = () => {
    let now = new Date();
    document.querySelector("#date").textContent =
        now.toLocaleTimeString();
    /* NOT needed for now, will come back to this code, though
    + " " +
    now.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" }); */
}
setInterval(timer, 1000);
/* ------ FOOTER TIME DISPLAY END ------ */

/* ------ data-manipulation.html BANNER IMAGE ROLLOVER START ------ */
document.addEventListener('DOMContentLoaded', function() {
    const bannerImage = document.getElementById('banner-img-data-manipulation');
    bannerImage.addEventListener('mouseenter', () => {
        bannerImage.src = 'images/data-manipulation/data-manipulation-2.png';
        bannerImage.classList.add('banner-image-enter');
    });
    bannerImage.addEventListener('mouseleave', () => {
        bannerImage.src = 'images/data-manipulation/data-manipulation-1.png';
        bannerImage.classList.add('banner-image-leave');
    });
});
/* ------ data-manipulation.html BANNER IMAGE ROLLOVER END ------ */

/* COMPUTER ARRAY OF OBJECTS START (MUST BE DECLARED @ TOP) */
const computers = [
    {
        serialNum: "SN123456",
        manufacturer: "Dell",
        type: "Laptop",
        specification: "Intel Core i7, 16GB RAM, 512GB SSD",
        price: 1299.99
    },
    {
        serialNum: "SN789012",
        manufacturer: "Apple",
        type: "Desktop",
        specification: "M2, 32GB RAM, 2TB SSD",
        price: 2499.99
    },
    {
        serialNum: "SN345678",
        manufacturer: "Lenovo",
        type: "Workstation",
        specification: "AMD Ryzen 9, 64GB RAM, 2TB NVMe SSD",
        price: 1899.99
    },
    {
        serialNum: "SN901234",
        manufacturer: "HP",
        type: "Server",
        specification: "Intel Xeon, 128GB RAM, 4TB HDD",
        price: 3499.99
    },
    {
        serialNum: "SN567890",
        manufacturer: "Samsung",
        type: "Tablet",
        specification: "Snapdragon 8 Gen 2, 12GB RAM, 256GB SSD",
        price: 899.99
    },
    {
        serialNum: "SN112233",
        manufacturer: "Microsoft",
        type: "Laptop",
        specification: "Intel Core i5, 8GB RAM, 256GB SSD",
        price: 999.99
    },
    {
        serialNum: "SN445566",
        manufacturer: "Acer",
        type: "Mini-Computer",
        specification: "Intel Core i3, 4GB RAM, 128GB SSD",
        price: 499.99
    },
    {
        serialNum: "SN778899",
        manufacturer: "Asus",
        type: "Embedded",
        specification: "ARM Cortex-A72, 2GB RAM, 32GB eMMC",
        price: 299.99
    },
    {
        serialNum: "SN101112",
        manufacturer: "LG",
        type: "Wearable",
        specification: "Qualcomm Snapdragon Wear 4100, 1GB RAM, 8GB Storage",
        price: 199.99
    },
    {
        serialNum: "SN131415",
        manufacturer: "Nokia",
        type: "Smartphone",
        specification: "Mediatek Dimensity 9200, 12GB RAM, 512GB Storage",
        price: 1099.99
    },
    {
        serialNum: "SN161718",
        manufacturer: "Apple",
        type: "Watch",
        specification: "Apple S9, 1GB RAM, 64GB Storage",
        price: 499.99
    },
    {
        serialNum: "SN192021",
        manufacturer: "Dell",
        type: "Mainframe",
        specification: "IBM z16, 512GB RAM, 20TB SSD",
        price: 89999.99
    },
    {
        serialNum: "SN222324",
        manufacturer: "HP",
        type: "PDA",
        specification: "Intel XScale, 64MB RAM, 256MB Flash",
        price: 149.99
    },
    {
        serialNum: "SN252627",
        manufacturer: "Lenovo",
        type: "Quantum",
        specification: "64-Qubit Superconducting Quantum Processor",
        price: 299999.99
    }
];
/* COMPUTER ARRAY OF OBJECTS END */

/* ARRAY OF OBJECTS FORM/TABLE START */
let table = document.getElementById("table");
let form = document.querySelector("form");

// New displayRecs Method that uses Handlebars instead of direct HTML manipulation (Assignment Part 2)
const displayRecs = () => {
    let template = document.getElementById("computer-sys-template");
    let compiled = Handlebars.compile(template.innerHTML);
    let rendered = compiled(computers);
    table.innerHTML = rendered;
}

displayRecs(); // Need to call for first load

const addRecord = (evt) => {
    evt.preventDefault();
    let newComputer = {
        serialNum: form.elements.serialNum.value,
        manufacturer: form.elements.manufacturer.value,
        type: form.elements.type.value,
        specification: form.elements.specification.value,
        price: form.elements.price.value
    };

    computers.push(newComputer);

    // The alert below can't be implemented using Handlebars as Handlebars states it can't be used
    // for alerts, confirms, or prompts without a separate JS library,
    alert(`
        You added a new computer to the system!

        => Serial Number: ${newComputer.serialNum}
        => Manufacturer: ${newComputer.manufacturer}
        => Type: ${newComputer.type}
        => Specification: ${newComputer.specification}
        => Price: ${newComputer.price}
    `);

    displayRecs();
    form.reset();
    form.elements[0].focus();
};

displayRecs();

form.addEventListener("submit", addRecord);

table.addEventListener("click", (evt) => {
    if (evt.target.matches("button")) {
        let deleteRec = computers.findIndex((computer) => computer.serialNum
            === evt.target.dataset.id);
        let deleteComputer = computers[deleteRec]; // Since we already have the index, may as well use this
        // Again, Handlebars states it can't be used for alert/confirm/prompt without needing a separate library.
        // So, the below confirm is kept as is.
        let deleteConfirm = confirm(`
        Are you sure you want to remove this computer from the system?

        => Serial Number: ${deleteComputer.serialNum}
        => Manufacturer: ${deleteComputer.manufacturer}
        => Type: ${deleteComputer.type}
        => Specification: ${deleteComputer.specification}
        => Price: ${deleteComputer.price}
        `);
        if (deleteConfirm) {
            computers.splice(deleteRec, 1);
            displayRecs();
        }
    }
});
displayRecs();
/* ARRAY OF OBJECTS FORM/TABLE START */

/* DATE TIME START (FOR LAST UPDATED SPAN UNDER HEADING 2)  */
// SAME LOGIC AS IN A01, JUST CHANGED FOR HANDLEBARS DISPLAY
function setPreviousDateTime() {
    let dateTime = new Date();

    // Setting a hard date here, as this shouldn't be dynamic
    // Fresh date
    dateTime.setHours(23, 11);
    dateTime.setDate(1);
    dateTime.setMonth(4); // ZERO-BASED INDEX, 2=MARCH
    dateTime.setFullYear(2025);

    const timeOptions = {
        weekday: dateTime.toLocaleDateString('en-ie', { weekday: 'long' }),
        day: dateTime.getDate(),
        month: dateTime.toLocaleDateString('en-ie', { month: 'long' }),
        year: dateTime.toLocaleDateString('en-ie', { year: 'numeric' }),
        time: dateTime.toLocaleTimeString('en-ie', { hour: '2-digit', minute: '2-digit', hour12: false })
    };

    const lastUpdateSpan = document.getElementById("com-mgmt-last-update");
    const template = document.getElementById("last-updated-template").innerHTML;
    const compiled = Handlebars.compile(template);
    const renderedHtml = compiled(timeOptions);

    lastUpdateSpan.innerHTML = renderedHtml;

    // Re-attaching to fix weird bug where the buttons stop working after a few clicks
    document.getElementById("update-system-datetime").addEventListener("click", setCurrentDateTime);
    document.getElementById("reset-system-datetime").addEventListener("click", setPreviousDateTime);
}

function setCurrentDateTime() {
    let dateTime = new Date();

    const timeOptions = {
        weekday: dateTime.toLocaleDateString('en-ie', { weekday: 'long' }),
        day: dateTime.getDate(),
        month: dateTime.toLocaleDateString('en-ie', { month: 'long' }),
        year: dateTime.toLocaleDateString('en-ie', { year: 'numeric' }),
        time: dateTime.toLocaleTimeString('en-ie', { hour: '2-digit', minute: '2-digit', hour12: false })
    };

    const updateTimeSpan = document.getElementById("com-mgmt-last-update");
    const template = document.getElementById("last-updated-template").innerHTML;
    const compiled = Handlebars.compile(template);
    const rendered = compiled(timeOptions);

    updateTimeSpan.innerHTML = rendered;

    // Re-attaching again to fix weird bug where the buttons stop working after a few clicks
    document.getElementById("update-system-datetime").addEventListener("click", setCurrentDateTime);
    document.getElementById("reset-system-datetime").addEventListener("click", setPreviousDateTime);
}

// DEFAULT WILL BE HARD-CODED DATE TIME
// GOING TO USE SetTimeOut() for half a second to allow time for the rest of the page to load.
// I could've waited for DOMContentLoaded, but this method was required in assignment specification.
setTimeout(() => {
    setPreviousDateTime();
    console.log("Assignment spec: showing I used setTimeout(), setting previous date time (default) " +
        "after a half second");
}, 500);
/* DATE TIME END (FOR LAST UPDATED SPAN UNDER HEADING 2)  */

/* SEARCH FOR A COMPUTER BAR START */
// LOGIC SAME AS BEFORE, ONLY THE DISPLAY THE COMPUTER SYSTEM PART CHANGED BELOW
document.getElementById("searchInput").addEventListener("input", () => {
    let searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredComputers = computers.filter((computer) => {
        return (
            // LATE MODIFICATION 31/03/25 14:28
            // FORGOT TO ADD THE VALUES FOR THE KEYS I ADDED LATER
            computer.serialNum.toLowerCase().includes(searchTerm) ||
            computer.manufacturer.toLowerCase().includes(searchTerm) ||
            computer.type.toLowerCase().includes(searchTerm) ||
            computer.specification.toLowerCase().includes(searchTerm) ||
            // ONLY RUN THE BELOW IF IT IS(!!) A NUMBER, STOP THE ERROR
            (!(isNaN(parseFloat(searchTerm))) && searchTerm.trim() !== '' && computer.price === parseFloat(searchTerm))
        );
    });

    // Just going to re-use existing Handlebars for first display of the table
    let template = document.getElementById("computer-sys-template").innerHTML;
    let compiled = Handlebars.compile(template);

    // Handlebars handles when no results are found with an unless this in the html file
    let rendered = compiled(filteredComputers);
    document.getElementById("table").innerHTML = rendered;
});
/* SEARCH FOR A COMPUTER BAR END */

/* CLEAR RESULTS START */
document.getElementById("reset-search-button").addEventListener("click", () => {
    document.getElementById("searchInput").value = ""; // Clear the input box
    // GOING TO USE SetTimeOut() for a full second here to show I used it for assignment spec
    setTimeout(() => {
        displayRecs();
        console.log("Assignment spec: showing I used setTimeout(), clearing results after a second");
    }, 1000);
});
/* CLEAR RESULTS END */
