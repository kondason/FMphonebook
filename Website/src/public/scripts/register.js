ProfessionValueChange(document.getElementById('profession-DD'));
ClubValueChange(document.getElementById('club-DD'));

function ProfessionValueChange(selectObject)
{

    const profession = document.querySelector('.other-profession').classList;
    const club = document.querySelector('.other-club').classList;

    if (selectObject.value == 10)
    {
        profession.remove('hidden');
        profession.remove('visibility-hidden');
        profession.add('display-block');
        return;
    }

    if (club.contains('hidden'))
    {
        profession.remove('display-block');
        profession.remove('visibility-hidden');
        profession.add('hidden');

        return;
    }

    if (club.contains('display-block'))
    {
        profession.add('visibility-hidden');
        profession.remove('display-block');

        return;
    }
}

function ClubValueChange(selectObject)
{
    
    const club = document.querySelector('.other-club').classList;
    const profession = document.querySelector('.other-profession').classList;

    if (selectObject.value == 6)
    {
        club.remove('hidden');
        club.add('display-block');

        if (profession.contains('hidden'))
        {
            profession.add('visibility-hidden');
            profession.remove('hidden');
        }

        return;
    }

    if (profession.contains('visibility-hidden'))
    {
        profession.add('hidden');
        profession.remove('visibility-hidden');
    }

    club.remove('display-block');
    club.add('hidden');
}