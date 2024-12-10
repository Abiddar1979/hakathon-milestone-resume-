document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get references to form elements using their IDs
    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;   
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;
    const cvnameElement = document.getElementById('cvname') as HTMLInputElement;

    // Check if all the elements are present
    if (
        profilePictureInput &&
        nameElement && 
        emailElement && 
        phoneElement &&
        educationElement &&
        experienceElement &&
        skillsElement &&
        cvnameElement
    ) {

        // Get values from form
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const cvname = cvnameElement.value;
        const uniquePath = `resume/${cvname.replace(/\s+/g, '_')}_cv.html`;

        // Handle profile picture
        const profilePicture = profilePictureInput.files?.[0];
        const profilePictureURL = profilePicture ? URL.createObjectURL(profilePicture) : '';
        const resumeOutput = `
          <h2>Resume</h2>
          ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
          <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
          <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
          <p><strong>Phone Number:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
          <h3>Education</h3>
          <p id="edit-education" class="editable">${education}</p>
          <h3>Experience</h3>
          <p id="edit-experience" class="editable">${experience}</p>
          <h3>Skills</h3>
          <p id="edit-skills" class="editable">${skills}</p>
        `;

        const downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
        downloadLink.download = uniquePath;
        downloadLink.textContent = 'Download your 2024 Resume';

        // Display the resume in output container
        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            resumeOutputElement.classList.remove("hidden");

            // Create a container for buttons
            const buttonsContainer = document.createElement('div');
            buttonsContainer.id = "buttonsContainer";
            resumeOutputElement.appendChild(buttonsContainer);

            // Add download PDF button
            const downloadButton = document.createElement('button');
            downloadButton.textContent = "Download as PDF";
            downloadButton.addEventListener("click", () => {
                window.print(); // Open the print dialog allowing the user to save as PDF
            });
            buttonsContainer.appendChild(downloadButton);

            // Add shareable link button
            const shareLinkButton = document.createElement('button');
            shareLinkButton.textContent = "Copy Shareable Link";
            shareLinkButton.addEventListener("click", async () => {
                try {
                    // Create a unique shareable link (simulate it in this case)
                    const shareableLink = `https://yourdomain.com/resume/${name.replace(/\s+/g, "_")}_cv.html`;

                    // Use Clipboard API to copy the shareable link
                    await navigator.clipboard.writeText(shareableLink);
                    alert("Shareable link copied to clipboard");
                } catch (err) {
                    console.error("Failed to copy link: ", err);
                    alert("Failed to copy the link to clipboard. Please try again.");
                }
            });
            buttonsContainer.appendChild(shareLinkButton);
        }
    } else {
        console.error('One or more input elements are missing');
    }
});

function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function() {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";
            // Replace content
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing-input');
                input.addEventListener('blur', function() {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove();
                });
                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement.nextSibling);
                input.focus();
            }
        });
    });
}

// Call the makeEditable function to enable editing
makeEditable();






