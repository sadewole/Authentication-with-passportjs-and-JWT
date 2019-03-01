const regSubmit = document.querySelector('#regSubmit');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const errorReg = document.querySelector('#errorReg');
const confirmPassword = document.querySelector('#password2');
const url = 'http://localhost:3000/api/user/';

const clearError = () => {
	errorReg.innerText = '';
};

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
				window.location.replace('./dashboard.html');
				// console.log(data.username)
			}
			errorReg.innerHTML = data.message;
		})
		.catch((err) => {
			console.error(err);
		});
};

const validateEmail = (emailVal) => {
	const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	return reg.test(emailVal);
};
const validatePassword = (passwordVal) => {
	const pas = /^(?=.*?[\w+])(?=(.*[\W+]?))(?!.*\s).{5,}$/;
	return pas.test(passwordVal);
};
register = (e) => {
	e.preventDefault();
	if (username.value == '') {
		errorReg.innerHTML = 'Input your username';
		return;
	}
	if (!validateEmail(email.value.trim())) {
		errorReg.innerHTML = 'Enter a valid email';
		return;
	}
	if (!validatePassword(password.value.trim())) {
		errorReg.innerHTML = 'Password must not contain space and must be 5 characters long';
		return;
	}
	if (confirmPassword.value !== password.value) {
		errorReg.innerHTML = 'Password do not match';
		return;
	}

	signUp();
};

regSubmit.addEventListener('click', register);
