// SkillSync - simple beginner version of script.js

// Sample student information
var students = [
    { id: 1, name: "Alex Morgan", domain: "Web Development", skills: ["HTML", "CSS", "JavaScript", "Git"], interests: ["Frontend", "UI Design"], project: "Student Portfolio Builder", bio: "Enjoys building websites and student tools." },
    { id: 2, name: "Priya Sharma", domain: "Artificial Intelligence", skills: ["Python", "Machine Learning", "NumPy"], interests: ["AI", "Data Science"], project: "Student Performance Predictor", bio: "Interested in machine learning projects." },
    { id: 3, name: "Rahul Verma", domain: "Web Development", skills: ["HTML", "CSS", "JavaScript", "React"], interests: ["Frontend", "Accessibility"], project: "Accessible College Website", bio: "Likes making websites easy to use." },
    { id: 4, name: "Ananya Gupta", domain: "Data Science", skills: ["Python", "SQL", "Pandas"], interests: ["Analytics", "Research"], project: "Campus Data Dashboard", bio: "Enjoys working with data." },
    { id: 5, name: "Arjun Singh", domain: "Cybersecurity", skills: ["Python", "Linux", "Networking"], interests: ["Security", "Linux"], project: "Security Awareness Portal", bio: "Learning about online security." },
    { id: 6, name: "Meera Patel", domain: "Design", skills: ["Figma", "UI Design", "HTML", "CSS"], interests: ["UX Research", "Web Design"], project: "Student Experience Redesign", bio: "Enjoys designing websites and apps." },
    { id: 7, name: "Kabir Khan", domain: "App Development", skills: ["Java", "Kotlin", "Android"], interests: ["Mobile Apps", "Education"], project: "College Event Companion", bio: "Interested in building mobile apps." },
    { id: 8, name: "Ishita Roy", domain: "Artificial Intelligence", skills: ["Python", "TensorFlow", "Machine Learning"], interests: ["AI", "Computer Vision"], project: "Image Classification Demo", bio: "Learning about artificial intelligence." },
    { id: 9, name: "Dev Malhotra", domain: "Web Development", skills: ["JavaScript", "Node.js", "SQL"], interests: ["Backend", "APIs"], project: "Local Event Discovery", bio: "Likes building web applications." },
    { id: 10, name: "Sana Ahmed", domain: "Data Science", skills: ["Python", "Excel", "SQL"], interests: ["Data Analysis", "Visualization"], project: "Student Expense Analyzer", bio: "Uses data to understand patterns." },
    { id: 11, name: "Vikram Joshi", domain: "Cybersecurity", skills: ["Linux", "Networking", "Python"], interests: ["Security", "Automation"], project: "Linux Learning Toolkit", bio: "Learning Linux and computer security." },
    { id: 12, name: "Nisha Kapoor", domain: "Design", skills: ["Figma", "UI Design", "Canva"], interests: ["Visual Design", "User Experience"], project: "Student Opportunity Explorer", bio: "Likes making information easy to understand." }
];

// Example opportunities
var opportunities = [
    { id: 101, title: "Smart India Hackathon", category: "Hackathon", icon: "⚡", description: "Build a project with a team.", audience: "Student teams", url: "https://www.sih.gov.in/" },
    { id: 102, title: "Google Solution Challenge", category: "Competition", icon: "✦", description: "Create technology solutions to real problems.", audience: "Student developers", url: "https://developers.google.com/community/gdsc-solution-challenge" },
    { id: 103, title: "National Scholarship Portal", category: "Scholarship", icon: "🎓", description: "Find information about government scholarships.", audience: "Eligible students", url: "https://scholarships.gov.in/" },
    { id: 104, title: "GitHub Student Developer Pack", category: "Learning", icon: "⌘", description: "Find developer tools and learning resources.", audience: "Students", url: "https://education.github.com/pack" },
    { id: 105, title: "Kaggle Competitions", category: "Competition", icon: "◈", description: "Practise data science and machine learning.", audience: "Data science learners", url: "https://www.kaggle.com/competitions" },
    { id: 106, title: "freeCodeCamp", category: "Learning", icon: "</>", description: "Learn web development for free.", audience: "Beginners", url: "https://www.freecodecamp.org/" }
];

// Default profile
var profile = {
    name: "Sam Carter",
    domain: "Web Development",
    skills: ["HTML", "CSS", "JavaScript"],
    desiredSkills: ["Python", "Machine Learning"],
    bio: "Computer Science student who enjoys learning new technologies."
};

var savedOpportunities = [];
var showSavedOnly = false;

// Load saved information from the browser
function loadSavedData() {
    try {
        var savedProfile = localStorage.getItem("skillsync_profile_simple");
        var savedItems = localStorage.getItem("skillsync_saved_simple");

        if (savedProfile) {
            profile = JSON.parse(savedProfile);
        }

        if (savedItems) {
            savedOpportunities = JSON.parse(savedItems);
        }
    } catch (error) {
        console.log("Could not load saved data.");
    }
}

// Save information in the browser
function saveData() {
    localStorage.setItem("skillsync_profile_simple", JSON.stringify(profile));
    localStorage.setItem("skillsync_saved_simple", JSON.stringify(savedOpportunities));
}

// Small helper to find an element by its ID
function getElement(id) {
    return document.getElementById(id);
}

// Show a short message
function showToast(message) {
    var toast = getElement("toast");
    if (toast) {
        toast.textContent = message;
        toast.classList.remove("hidden");
        toast.classList.add("show");
        setTimeout(function() {
            toast.classList.remove("show");
            toast.classList.add("hidden");
        }, 2500);
    }
}

// Make the first letters of a student's name
function getInitials(name) {
    var words = name.split(" ");
    var result = "";

    for (var i = 0; i < words.length && i < 2; i++) {
        result += words[i].charAt(0);
    }

    return result.toUpperCase();
}

// Turn a list of skills into small labels
function makeTags(skills) {
    var html = "";

    if (!skills || skills.length === 0) {
        return '<span class="tag neutral">Not specified</span>';
    }

    for (var i = 0; i < skills.length; i++) {
        html += '<span class="tag">' + skills[i] + '</span>';
    }

    return html;
}

// Calculate a simple match score
function getMatchScore(student) {
    var score = 0;

    for (var i = 0; i < profile.desiredSkills.length; i++) {
        if (student.skills.indexOf(profile.desiredSkills[i]) !== -1) {
            score += 25;
        }
    }

    for (var j = 0; j < profile.skills.length; j++) {
        if (student.skills.indexOf(profile.skills[j]) !== -1) {
            score += 10;
        }
    }

    if (score > 100) {
        score = 100;
    }

    return score;
}

// Create a card for one student
function makeStudentCard(student) {
    var skills = makeTags(student.skills);
    var score = getMatchScore(student);

    return '<div class="student-card">' +
        '<div class="student-card-top">' +
        '<div class="student-avatar">' + getInitials(student.name) + '</div>' +
        '<div class="student-info"><div class="student-name">' + student.name + '</div>' +
        '<div class="student-domain">' + student.domain + '</div></div>' +
        '<span class="match-score">' + score + '%</span>' +
        '</div>' +
        '<p class="student-bio">' + student.bio + '</p>' +
        '<div class="card-label">SKILLS</div>' +
        '<div class="tag-container">' + skills + '</div>' +
        '<div class="student-card-bottom">' +
        '<button class="small-button" data-student-id="' + student.id + '">View profile</button>' +
        '</div></div>';
}

// Display a list of students
function showStudentCards(elementId, list, emptyId) {
    var html = "";

    for (var i = 0; i < list.length; i++) {
        html += makeStudentCard(list[i]);
    }

    if (getElement(elementId)) {
        getElement(elementId).innerHTML = html;
    }

    if (emptyId && getElement(emptyId)) {
        getElement(emptyId).classList.toggle("hidden", list.length > 0);
    }
}

// Show dashboard information
function showDashboard() {
    getElement("student-count").textContent = students.length;
    getElement("skill-count").textContent = countSkills();
    getElement("opportunity-count").textContent = opportunities.length;
    getElement("saved-count").textContent = savedOpportunities.length;

    var topStudents = students.slice(0, 3);
    showStudentCards("dashboard-students", topStudents);

    var html = "";
    for (var i = 0; i < 3; i++) {
        html += makeOpportunityCard(opportunities[i]);
    }
    getElement("dashboard-opportunities").innerHTML = html;
}

// Count all different skills
function countSkills() {
    var allSkills = [];

    for (var i = 0; i < students.length; i++) {
        for (var j = 0; j < students[i].skills.length; j++) {
            if (allSkills.indexOf(students[i].skills[j]) === -1) {
                allSkills.push(students[i].skills[j]);
            }
        }
    }

    return allSkills.length;
}

// Search for students
function findStudents(searchText, domain) {
    var results = [];
    searchText = searchText.toLowerCase();

    for (var i = 0; i < students.length; i++) {
        var student = students[i];
        var details = student.name + " " + student.domain + " " +
            student.skills.join(" ") + " " + student.project + " " +
            student.bio + " " + student.interests.join(" ");

        var matchesText = details.toLowerCase().indexOf(searchText) !== -1;
        var matchesDomain = domain === "all" || student.domain === domain;

        if (matchesText && matchesDomain) {
            results.push(student);
        }
    }

    return results;
}

function searchMatches() {
    var searchText = getElement("match-search").value;
    var domain = getElement("domain-filter").value;
    var results = findStudents(searchText, domain);

    if (getElement("sort-filter").value === "name") {
        results.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
    } else {
        results.sort(function(a, b) {
            return getMatchScore(b) - getMatchScore(a);
        });
    }

    getElement("match-result-count").textContent = results.length + " students found";
    showStudentCards("match-results", results, "no-matches");
}

function showAllStudents() {
    var searchText = getElement("student-search").value;
    showStudentCards("all-students", findStudents(searchText, "all"), "no-students");
}

// Show a student's full profile in the pop-up
function openStudent(studentId) {
    var student = null;

    for (var i = 0; i < students.length; i++) {
        if (students[i].id === Number(studentId)) {
            student = students[i];
        }
    }

    if (!student) {
        return;
    }

    getElement("modal-avatar").textContent = getInitials(student.name);
    getElement("modal-name").textContent = student.name;
    getElement("modal-domain").textContent = student.domain;
    getElement("modal-bio").textContent = student.bio;
    getElement("modal-interests").textContent = student.interests.join(", ");
    getElement("modal-skills").innerHTML = makeTags(student.skills);
    getElement("modal-score").textContent = getMatchScore(student) + "% match";
    getElement("student-modal").classList.remove("hidden");
}

function closeStudent() {
    getElement("student-modal").classList.add("hidden");
}

// Show the current profile in the preview and form
function showProfile() {
    getElement("preview-name").textContent = profile.name;
    getElement("preview-domain").textContent = profile.domain;
    getElement("profile-avatar").textContent = getInitials(profile.name);
    getElement("preview-skills").innerHTML = makeTags(profile.skills);
    getElement("preview-desired").innerHTML = makeTags(profile.desiredSkills);

    getElement("profile-name").value = profile.name;
    getElement("profile-domain").value = profile.domain;
    getElement("current-skills").value = profile.skills.join(", ");
    getElement("desired-skills").value = profile.desiredSkills.join(", ");
    getElement("profile-bio").value = profile.bio;
}

// Save profile form
function saveProfile(event) {
    event.preventDefault();

    var name = getElement("profile-name").value.trim();

    if (name === "") {
        showToast("Please enter your name.");
        return;
    }

    profile.name = name;
    profile.domain = getElement("profile-domain").value;
    profile.skills = getElement("current-skills").value.split(",");
    profile.desiredSkills = getElement("desired-skills").value.split(",");
    profile.bio = getElement("profile-bio").value.trim();

    for (var i = 0; i < profile.skills.length; i++) {
        profile.skills[i] = profile.skills[i].trim();
    }

    for (var j = 0; j < profile.desiredSkills.length; j++) {
        profile.desiredSkills[j] = profile.desiredSkills[j].trim();
    }

    profile.skills = profile.skills.filter(function(skill) { return skill !== ""; });
    profile.desiredSkills = profile.desiredSkills.filter(function(skill) { return skill !== ""; });

    saveData();
    showProfile();
    showDashboard();
    searchMatches();
    showToast("Profile saved!");
    getElement("profile-message").textContent = "Profile saved successfully.";
}

// Create an opportunity card
function makeOpportunityCard(item) {
    var saved = savedOpportunities.indexOf(item.id) !== -1;
    return '<div class="opportunity-card">' +
        '<div class="opportunity-icon">' + item.icon + '</div>' +
        '<span class="opportunity-category">' + item.category + '</span>' +
        '<h3>' + item.title + '</h3>' +
        '<p>' + item.description + '</p>' +
        '<p>Suitable for: ' + item.audience + '</p>' +
        '<button class="button button-primary" data-opportunity-url="' + item.url + '">Explore</button> ' +
        '<button class="save-button ' + (saved ? "saved" : "") + '" data-save-id="' + item.id + '">' +
        (saved ? "♥" : "♡") + '</button></div>';
}

// Display opportunities using the selected category
function showOpportunities() {
    var category = getElement("opportunity-filter").value;
    var html = "";

    for (var i = 0; i < opportunities.length; i++) {
        var item = opportunities[i];
        var correctCategory = category === "all" || item.category === category;
        var isSaved = savedOpportunities.indexOf(item.id) !== -1;

        if (correctCategory && (!showSavedOnly || isSaved)) {
            html += makeOpportunityCard(item);
        }
    }

    getElement("all-opportunities").innerHTML = html;
    getElement("no-opportunities").classList.toggle("hidden", html !== "");
    getElement("show-saved").textContent = showSavedOnly ? "Show all opportunities" : "♡ Show saved only";
}

// Save or unsave an opportunity
function toggleSaved(id) {
    var index = savedOpportunities.indexOf(Number(id));

    if (index === -1) {
        savedOpportunities.push(Number(id));
    } else {
        savedOpportunities.splice(index, 1);
    }

    saveData();
    showOpportunities();
    showDashboard();
}

// Open an opportunity website
function openOpportunity(url) {
    window.open(url, "_blank", "noopener,noreferrer");
}

// Change the page
function goToPage(pageName) {
    var pages = document.getElementsByClassName("page");

    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove("active");
    }

    getElement(pageName).classList.add("active");

    var title = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    getElement("page-heading").textContent = title;
    getElement("breadcrumb-page").textContent = title;

    var buttons = document.getElementsByClassName("nav-item");
    for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("active");
        if (buttons[j].getAttribute("data-page") === pageName) {
            buttons[j].classList.add("active");
        }
    }
}

// Connect buttons and inputs to functions
document.addEventListener("click", function(event) {
    var button = event.target.closest("button");
    if (!button) {
        return;
    }

    if (button.getAttribute("data-page")) {
        goToPage(button.getAttribute("data-page"));
    }

    if (button.getAttribute("data-student-id")) {
        openStudent(button.getAttribute("data-student-id"));
    }

    if (button.getAttribute("data-save-id")) {
        toggleSaved(button.getAttribute("data-save-id"));
    }

    if (button.getAttribute("data-opportunity-url")) {
        openOpportunity(button.getAttribute("data-opportunity-url"));
    }
});

getElement("search-button").addEventListener("click", searchMatches);
getElement("match-search").addEventListener("input", searchMatches);
getElement("domain-filter").addEventListener("change", searchMatches);
getElement("sort-filter").addEventListener("change", searchMatches);
getElement("student-search").addEventListener("input", showAllStudents);

getElement("clear-filters").addEventListener("click", function() {
    getElement("match-search").value = "";
    getElement("domain-filter").value = "all";
    getElement("sort-filter").value = "match";
    searchMatches();
});

getElement("profile-form").addEventListener("submit", saveProfile);
getElement("reset-profile").addEventListener("click", function() {
    profile = {
        name: "Sam Carter",
        domain: "Web Development",
        skills: ["HTML", "CSS", "JavaScript"],
        desiredSkills: ["Python", "Machine Learning"],
        bio: "Computer Science student who enjoys learning new technologies."
    };

    saveData();
    showProfile();
    showDashboard();
    searchMatches();
    showToast("Profile reset.");
});

getElement("opportunity-filter").addEventListener("change", showOpportunities);
getElement("show-saved").addEventListener("click", function() {
    showSavedOnly = !showSavedOnly;
    showOpportunities();
});

getElement("close-modal").addEventListener("click", closeStudent);
getElement("modal-close-button").addEventListener("click", closeStudent);
getElement("student-modal").addEventListener("click", function(event) {
    if (event.target.id === "student-modal") {
        closeStudent();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeStudent();
    }
});

// Start the website
loadSavedData();
showProfile();
showDashboard();
searchMatches();
showAllStudents();
showOpportunities();
