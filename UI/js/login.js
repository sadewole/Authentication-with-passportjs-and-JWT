const submit = document.querySelector('#submit');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const error = document.querySelector('#error');

email.addEventListener('input', clearError);
password.addEventListener('input', clearError);

signIn = () => {
	fetch(`${url}signin`, {
		method: 'POST',
		headers: {
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email.value,
			password: password.value
		})
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status === 200) {
				if (typeof Storage !== 'undefined') {
					localStorage.setItem('token', `${data.token}`);
				}
				window.location.replace('./dashboard.html');
			}
			error.innerHTML = data.message;
		})
		.catch((err) => {
			error.innerHTML = 'Invalid email or password';
		});
};

login = (e) => {
	e.preventDefault();
	if (!validateEmail(email.value.trim())) {
		error.innerHTML = 'Enter a valid email';
		return;
	}
	if (password.value == '') {
		error.innerHTML = 'Input your Password';
		return;
	}
	signIn();
};

submit.addEventListener('click', login);
