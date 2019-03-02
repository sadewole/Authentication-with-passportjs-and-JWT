const regSubmit = document.querySelector('#regSubmit');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const error = document.querySelector('#error');
const confirmPassword = document.querySelector('#password2');

email.addEventListener('input', clearError);
password.addEventListener('input', clearError);
confirmPassword.addEventListener('input', clearError);
username.addEventListener('input', clearError);

signUp = () => {
	fetch(`${url}/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: username.value,
			email: email.value,
			password: password.value
		})
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status == 200) {
				if (typeof Storage !== 'undefined') {
					localStorage.setItem('token', `${data.token}`);
				}
				window.location.replace('./dashboard.html');
			}
			error.innerHTML = data.message;
		})
		.catch((err) => {
			console.error(err);
		});
};

register = (e) => {
	e.preventDefault();
	if (username.value == '') {
		error.innerHTML = 'Input your username';
		return;
	}
	if (!validateEmail(email.value.trim())) {
		error.innerHTML = 'Enter a valid email';
		return;
	}
	if (!validatePassword(password.value.trim())) {
		error.innerHTML = 'Password must not contain space and must be 5 characters long';
		return;
	}
	if (confirmPassword.value !== password.value) {
		error.innerHTML = 'Password do not match';
		return;
	}

	signUp();
};

regSubmit.addEventListener('click', register);
