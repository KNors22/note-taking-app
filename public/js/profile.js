const deleteAccountForm = document.querySelector('[data-delete-account-form]');

if (deleteAccountForm) {
  const deleteAccountButton = deleteAccountForm.querySelector('[data-confirm-delete-button]');
  const cancelDeleteButton = deleteAccountForm.querySelector('[data-cancel-delete-button]');
  const deleteAccountStatus = document.getElementById('delete-account-status');
  const defaultLabel = 'Delete Account';
  const confirmationLabel = 'DELETE FOREVER';
  let isAwaitingConfirmation = false;

  const resetConfirmation = () => {
    isAwaitingConfirmation = false;
    deleteAccountButton.textContent = defaultLabel;
    cancelDeleteButton.hidden = true;
    deleteAccountStatus.textContent = '';
  };

  deleteAccountForm.addEventListener('submit', (event) => {
    if (isAwaitingConfirmation) {
      deleteAccountButton.disabled = true;
      cancelDeleteButton.disabled = true;
      deleteAccountStatus.textContent = 'Deleting account.';
      return;
    }

    event.preventDefault();
    isAwaitingConfirmation = true;
    deleteAccountButton.textContent = confirmationLabel;
    cancelDeleteButton.hidden = false;
    deleteAccountStatus.textContent = 'Account deletion is permanent. Select DELETE FOREVER to confirm or Nevermind to cancel.';
  });

  cancelDeleteButton.addEventListener('click', resetConfirmation);
}
