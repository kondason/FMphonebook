const resetFormBtn = document.getElementById('clear-search-form');


resetFormBtn.addEventListener('click', () =>
{
    ResetForm();
});

function ResetForm()
{
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('professionInput').value = 0;
    document.getElementById('clubInput').value = 0;
    document.getElementById('teamAgeInput').value = 0;
    document.getElementById('employmentStatusInput').value = 0;
}
/*
function GetUsersByParameters()
{
    const nameInput = document.getElementById('nameInput').value;
    const emailInput = document.getElementById('emailInput').value;
    const professionInput = document.getElementById('professionInput').value;
    const clubInput = document.getElementById('clubInput').value;
    const teamAgeInput = document.getElementById('teamAgeInput').value;
    const employmentStatusInput = document.getElementById('employmentStatusInput').value;

    fetch('https://localhost:4000/users/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                "Name": nameInput,
                "Email": emailInput,
                "ProfessionID": professionInput,
                "ClubID": clubInput,
                "TeamAgeID": teamAgeInput,
                "EmploymentStatusID": employmentStatusInput
            })

    }

    )

}*/