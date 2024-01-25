import { users } from "./data.js";

//Variables
var contact = document.getElementsByClassName('contact-list')[0];
const itemsPerPage = 10;
let currentPage = 1;

//Get the total
var total = document.getElementById("total");
total.innerHTML= `Total: ${users.length}`;

//Functions
//Display Function
function displayItems(items, page, perPage) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const itemsToShow = items.slice(start, end);

    contact.innerHTML = "";
    console.log(itemsToShow);
    itemsToShow.forEach(item => {
        addContactItem('contact-list', item.image, item.name, item.joined)

    });

}

//Pagination Function
function setupPagination(items, containerId, perPage) {
    const container = document.getElementById(containerId);
    const pageCount = Math.ceil(items.length / perPage);

    for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.addEventListener('click', () => {
            currentPage = i;
            displayItems(items, currentPage, perPage);
        });

        container.appendChild(btn);
    }
}

//Items function
function addContactItem(parentId, avatarUrl, name, joinDate) {
    //Create the list item
    const listItem = document.createElement('li');
    listItem.className = "contact-item cf";

    //Create and fill the contact details div
    const contactDetailsDiv = document.createElement('div');
    contactDetailsDiv.className = "contact-details";
    const img = document.createElement('img');
    img.className = 'avatar';
    img.src = avatarUrl;

    const h3 = document.createElement('h3');
    h3.textContent = name;

    const spanEmail = document.createElement('span');
    spanEmail.className = 'email';

    const parts = name.toLowerCase().split(' ');
    const emailLocalPart = parts.join('.');

    spanEmail.textContent = `${emailLocalPart}@${'example.com'}`;

    contactDetailsDiv.appendChild(img);
    contactDetailsDiv.appendChild(h3);
    contactDetailsDiv.appendChild(spanEmail);

    // Create and fill the joined details div
    const joinedDetailsDiv = document.createElement('div');
    joinedDetailsDiv.className = 'joined-details';

    const spanDate = document.createElement('span');
    spanDate.className = 'date';
    spanDate.textContent = `Joined ${joinDate}`;

    joinedDetailsDiv.appendChild(spanDate);

    // Append everything to the list item
    listItem.appendChild(contactDetailsDiv);
    listItem.appendChild(joinedDetailsDiv);

    const parentElement = document.getElementsByClassName(parentId)[0];
    parentElement.appendChild(listItem);

}

displayItems(users, currentPage, itemsPerPage);
setupPagination(users, 'pagination', itemsPerPage);

