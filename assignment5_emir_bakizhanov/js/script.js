
"use strict";

const userProfile = {
    name: "Emir Bakizhanov",
    birthYear: 2005,
    isDeveloper: true,
    hobbies: [
        "Web Design",
        "Football",
        "Photography"
    ]
};

const profileForm = document.getElementById("profileForm");
const usernameInput = document.getElementById("username");
const birthYearInput = document.getElementById("birthYear");
const formMessage = document.getElementById("formMessage");

const hobbyList = document.getElementById("hobbyList");
const newHobbyInput = document.getElementById("newHobby");
const addItemBtn = document.getElementById("addItemBtn");
const removeItemBtn = document.getElementById("removeItemBtn");
const listMessage = document.getElementById("listMessage");

function calculateAge() {
    const currentYear = new Date().getFullYear();
    return currentYear - userProfile.birthYear;
}

function calculateMonths() {
    const age = calculateAge();
    return age * 12;
}

function updateProfile() {
    const currentYear = new Date().getFullYear();

    document.getElementById("profileName").textContent =
        userProfile.name;

    document.getElementById("displayName").textContent =
        userProfile.name;

    document.getElementById("displayYear").textContent =
        userProfile.birthYear;

    document.getElementById("displayDeveloper").textContent =
        userProfile.isDeveloper ? "Yes" : "No";

    document.getElementById("displayCurrentYear").textContent =
        currentYear;

    document.getElementById("displayAge").textContent =
        calculateAge();

    document.getElementById("displayMonths").textContent =
        calculateMonths();

    document.getElementById("displayCount").textContent =
        userProfile.hobbies.length;

    console.log("User Profile:", userProfile);
    console.log("Age:", calculateAge());
    console.log("Approximate Months:", calculateMonths());
    console.log("Hobbies:", userProfile.hobbies.length);
}

profileForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newName = usernameInput.value.trim();
    const newBirthYear = Number(birthYearInput.value);
    const currentYear = new Date().getFullYear();

    if (newName === "") {
        formMessage.textContent = "Please enter your username.";
        formMessage.className = "message error";
        return;
    }

    if (
        !Number.isInteger(newBirthYear) ||
        newBirthYear < 1900 ||
        newBirthYear > currentYear
    ) {
        formMessage.textContent = "Please enter a valid birth year.";
        formMessage.className = "message error";
        return;
    }

    userProfile.name = newName;
    userProfile.birthYear = newBirthYear;

    updateProfile();

    formMessage.textContent = "Profile updated successfully!";
    formMessage.className = "message success";
});

function displayHobbies() {
    hobbyList.innerHTML = "";

    userProfile.hobbies.forEach(function(hobby, index) {
        const listItem = document.createElement("li");
        const hobbyName = document.createElement("span");
        const hobbyNumber = document.createElement("span");

        hobbyName.textContent = hobby;
        hobbyNumber.textContent = index + 1;
        hobbyNumber.className = "hobby-number";

        listItem.appendChild(hobbyName);
        listItem.appendChild(hobbyNumber);

        hobbyList.appendChild(listItem);
    });

    if (userProfile.hobbies.length === 0) {
        const emptyItem = document.createElement("li");

        emptyItem.textContent = "No hobbies added yet.";
        emptyItem.className = "empty-item";

        hobbyList.appendChild(emptyItem);
    }

    document.getElementById("listCounter").textContent =
        userProfile.hobbies.length + " Items";

    document.getElementById("displayCount").textContent =
        userProfile.hobbies.length;

    removeItemBtn.disabled = userProfile.hobbies.length === 0;
}

function addHobby() {
    const newHobby = newHobbyInput.value.trim();

    if (newHobby === "") {
        listMessage.textContent = "Please enter a hobby.";
        listMessage.className = "message error";
        return;
    }

    userProfile.hobbies.push(newHobby);

    displayHobbies();

    newHobbyInput.value = "";

    listMessage.textContent = "Hobby added successfully!";
    listMessage.className = "message success";

    console.log("Updated Hobbies:", userProfile.hobbies);
}

function removeHobby() {
    if (userProfile.hobbies.length === 0) {
        return;
    }

    userProfile.hobbies.pop();

    displayHobbies();

    listMessage.textContent = "Last hobby removed!";
    listMessage.className = "message success";

    console.log("Updated Hobbies:", userProfile.hobbies);
}

addItemBtn.addEventListener("click", addHobby);

removeItemBtn.addEventListener("click", removeHobby);

newHobbyInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addHobby();
    }
});

usernameInput.value = userProfile.name;
birthYearInput.value = userProfile.birthYear;

updateProfile();
displayHobbies();
