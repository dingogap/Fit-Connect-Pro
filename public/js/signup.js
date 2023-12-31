const signupFormHandler = async (event) => {
  event.preventDefault();

  const first_name = document.querySelector('#first_name').value.trim();
  const last_name = document.querySelector('#last_name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const mobile = document.querySelector('#mobile').value.trim();

  // Add new user
  if (first_name && last_name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ first_name, last_name, email, password, mobile }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
