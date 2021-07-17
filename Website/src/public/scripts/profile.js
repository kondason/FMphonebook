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
            console.log(BirthdayDiv);
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
