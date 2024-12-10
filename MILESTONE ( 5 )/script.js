var _a;
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    // Get references to form elements using their IDs
    var profilePictureInput = document.getElementById("profilePicture");
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var addressElement = document.getElementById('address');
    var quarterElement = document.getElementById('quarter');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');
    var cvnameElement = document.getElementById('cvname');
    // Check if all the elements are present
    if (profilePictureInput &&
        nameElement &&
        emailElement &&
        phoneElement &&
        addressElement &&
        quarterElement &&
        educationElement &&
        experienceElement &&
        skillsElement &&
        cvnameElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var address = addressElement.value;
        var quarter = quarterElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skills = skillsElement.value;
        var cvname = cvnameElement.value;
        var uniquePath = "resume/".concat(cvname.replace(/\s+/g, '_'), "_cv.html");
        // Picture elements
        var profilePicture = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePictureURL = profilePicture ? URL.createObjectURL(profilePicture) : '';
        var resumeOutput = "\n          <h2>Resume</h2>\n          ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilePicture\">") : '', "\n          <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">").concat(name_1, "</span></p>\n          <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n          <p><strong>Phone Number:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n          <p><strong>Address:</strong> <span id=\"edit-address\" class=\"editable\">").concat(address, "</span></p>\n          <p><strong>Quarter:</strong> <span id=\"edit-quarter\" class=\"editable\">").concat(quarter, "</span></p>\n          <h3>Education</h3>\n          <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n          <h3>Experience</h3>\n          <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n          <h3>Skills</h3>\n          <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n        ");
        var downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
        downloadLink.download = uniquePath;
        downloadLink.textContent = 'Download your 2024 Resume';
        var resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            resumeOutputElement.appendChild(downloadLink);
            resumeOutputElement.style.display = "block";
        }
    }
    else {
        console.error('One or more input elements are missing');
    }
});
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            // Replace content
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentValue;
                input_1.classList.add('editing-input');
                input_1.addEventListener('blur', function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = 'inline';
                    input_1.remove();
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement.nextSibling);
                input_1.focus();
            }
        });
    });
}
