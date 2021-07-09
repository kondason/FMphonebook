const resetFormBtn = document.getElementById('clear-search-form');


resetFormBtn.addEventListener('click', () =>
{
    ResetForm();
});

function ResetForm()
{
    const nameInput = document.getElementById('nameInput').value = '';
    const emailInput = document.getElementById('emailInput').value = '';
    const professionInput = document.getElementById('professionInput').value = 0;
    const clubInput = document.getElementById('clubInput').value = 0;
    const teamAgeInput = document.getElementById('teamAgeInput').value = 0;
    const employmentStatusInput = document.getElementById('employmentStatusInput').value = 0;
}