/*
General Details Edit
*/
const generalDetailsBtn = document.getElementById('general-details-edit-btn');
const generalDetailsSave = document.getElementById('general-details-save-btn');
const generalDetailsEditContainer = document.getElementById('general-details-edit-container');
const generalDetailsSaveForm = document.getElementById('general-details-save-form');

function ShowGeneralDetailsForm()
{
    generalDetailsSave.classList.remove('hidden');
    generalDetailsSaveForm.classList.remove('hidden');

    generalDetailsEditContainer.classList.add('hidden');
    generalDetailsBtn.classList.add('hidden');
}

function HideGeneralDetailsForm()
{
    generalDetailsSave.classList.add('hidden');
    generalDetailsSaveForm.classList.add('hidden');

    generalDetailsEditContainer.classList.remove('hidden');
    generalDetailsBtn.classList.remove('hidden');
}

async function SaveGeneralDetailsFormData(userID)
{
    /* input fields */
    const firstNameInput = document.getElementById('FirstNameInput').value;
    const lastNameInput = document.getElementById('LastNameInput').value;
    const birthdayInput = document.getElementById('BirthdayInput').value;
    const emailInput = document.getElementById('EmailInput').value;
    const emailCheckboxInput = document.getElementById('EmailCheckbox').checked;
    const mobileInput = document.getElementById('MobileInput').value;
    const mobileCheckboxInput = document.getElementById('MobileCheckbox').checked;
    const employmentStatusInput = document.getElementById('EmploymentStatusInput');

    /* Display Fields  */

    const fullNameSpan = document.getElementById('FullNameSpan');
    const birthdaySpans = document.getElementById("BirthdayDiv").querySelectorAll("span");
    const emailSpans = document.getElementById("EmailDiv").querySelectorAll("span");
    const mobileSpans = document.getElementById("MobileDiv").querySelectorAll("span");
    const employmentStatusSpans = document.getElementById("EmploymentStatusDiv").querySelectorAll("span");

    const dataObject = {
        FirstName: firstNameInput,
        LastName: lastNameInput,
        Birthday: birthdayInput,
        Email: emailInput,
        PublicEmail: emailCheckboxInput,
        MobilePhone: mobileInput,
        PublicMobile: mobileCheckboxInput,
        EmploymentStatusID: employmentStatusInput.value
    };

    const result = await fetch(`/Users/edit/${userID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObject)
    });

    const resultJson = await result.json();

    if (resultJson.Status == 200 && resultJson.Msg == "Updated.")
    {

        fullNameSpan.innerHTML = firstNameInput + ' ' + lastNameInput;

        birthdaySpans.forEach(span =>
        {
            
            span.innerHTML = birthdayInput;
        });

        employmentStatusSpans.forEach(span =>
        {
            span.innerHTML = employmentStatusInput.options[employmentStatusInput.selectedIndex].text;
        });


        mobileSpans.forEach(span =>
        {
            span.innerHTML = mobileInput;
        });

        emailSpans.forEach(span =>
        {
            span.innerHTML = emailInput;
        });


        HideGeneralDetailsForm();
    }
};

/*Club Details */
const clubDetailsBtn = document.getElementById('club-details-edit-btn');
const clubDetailsSave = document.getElementById('club-details-save-btn');
const clubDetailsEditContainer = document.getElementById('club-details-edit-container');
const clubDetailsSaveForm = document.getElementById('club-details-save-form');

function ShowClubDetailsForm()
{
    clubDetailsSave.classList.remove('hidden');
    clubDetailsSaveForm.classList.remove('hidden');

    clubDetailsEditContainer.classList.add('hidden');
    clubDetailsBtn.classList.add('hidden');
}

function HideClubDetailsForm()
{
    clubDetailsSave.classList.add('hidden');
    clubDetailsSaveForm.classList.add('hidden');

    clubDetailsEditContainer.classList.remove('hidden');
    clubDetailsBtn.classList.remove('hidden');
}

function LoadClubIcon()
{
    const clubInput = document.getElementById('ClubInput');
    const img = document.getElementById('club-details-img-edit'); 
    const img2 = document.getElementById('club-details-img-form'); 

    img.src = `/images/Clubs/${clubInput.value}.png`;    
    img2.src = `/images/Clubs/${clubInput.value}.png`;    
}

async function SaveClubDetailsFormData(userID)
{
     /* input fields */
     const clubInput = document.getElementById('ClubInput');
     const professionInput = document.getElementById('ProfessionInput');
     const teamAgeInput = document.getElementById('TeamAgeInput');
 
     /* Display Fields  */
     const clubSpan = document.getElementById('ClubSpan');
     const professionSpans = document.getElementById('ProfessionDiv').querySelectorAll("span");
     const teamAgeSpans = document.getElementById('TeamAgeDiv').querySelectorAll("span");
 
     const dataObject = {
         ClubID: clubInput.value,
         ProfessionID: professionInput.value,
         TeamAgeID: teamAgeInput.value
     };
 
     const result = await fetch(`/Users/edit/${userID}`, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(dataObject)
     });
 
     const resultJson = await result.json();
 
     if (resultJson.Status == 200 && resultJson.Msg == "Updated.")
     {
 
        clubSpan.innerHTML = clubInput.options[clubInput.selectedIndex].text;
 
        professionSpans.forEach(span =>
         {
            span.innerHTML = professionInput.options[professionInput.selectedIndex].text;
         });
 
         teamAgeSpans.forEach(span =>
         {
             span.innerHTML = teamAgeInput.options[teamAgeInput.selectedIndex].text;
         });
 
         HideClubDetailsForm();
     }
}


/*Resume */

const resumeBtn = document.getElementById('resume-edit-btn');
const resumeSave = document.getElementById('resume-save-btn');
const resumeEditContainer = document.getElementById('resume-container');
const resumeSaveForm = document.getElementById('resume-editor');

function ShowResumeDetailsForm()
{
    resumeSave.classList.remove('hidden');
    resumeSaveForm.classList.remove('hidden');

    resumeEditContainer.classList.add('hidden');
    resumeBtn.classList.add('hidden');
}

function HideResumeDetailsForm()
{
    resumeSave.classList.add('hidden');
    resumeSaveForm.classList.add('hidden');

    resumeEditContainer.classList.remove('hidden');
    resumeBtn.classList.remove('hidden');
}


async function SaveResumeDetailsFormData(userID)
{
     /* input fields */
     const resumeEditorInput = document.getElementById('formData');
 
     /* Display Fields  */
     const resumeDisplay = document.getElementById('resume-container');
 
     const dataObject = {
         Resume: resumeEditorInput.value
     };
 
     const result = await fetch(`/Users/edit/${userID}`, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(dataObject)
     });
 
     const resultJson = await result.json();
 
     if (resultJson.Status == 200 && resultJson.Msg == "Updated.")
     {
 
        resumeDisplay.innerHTML = resumeEditorInput.value;
 
        HideResumeDetailsForm();
     }
}