const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-modal-close]');
const overlay = document.getElementById('modal-overlay');

const openModal = (modal) =>
{
    if (modal == null)
        return;

    modal.classList.add('modal-active');
    overlay.classList.add('modal-overlay-active');
}

const closeModal = (modal) =>
{
    if (modal == null)
        return;

    modal.classList.remove('modal-active');
    overlay.classList.remove('modal-overlay-active');
}

openModalButtons.forEach(button =>
{
    button.addEventListener('click', () =>
    {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });

});

closeModalButtons.forEach(button =>
{
    button.addEventListener('click', () =>
    {
        const modal = button.closest('.modal');
        closeModal(modal);
    });

});

overlay.addEventListener('click', () =>
{
    const modals = document.querySelectorAll('.modal-active');
    modals.forEach(modal =>
    {
        closeModal(modal);
    });
});