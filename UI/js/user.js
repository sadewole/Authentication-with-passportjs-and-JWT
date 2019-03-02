const logout = document.querySelector('#Logout');
const welcomeText = document.querySelector('#welcomeText');
const url = 'http://localhost:3000/api/user/';
let token = null;

window.addEventListener('load', () => {
	if (localStorage.getItem('token')) {
		token = localStorage.getItem('token');
		fetch(`${url}secret`, {
			headers: {
				Authorization: `${token}`
			}
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status !== 200) {
					window.location.replace('./login.html');
				}
				const { username } = data.data;
				welcomeText.innerHTML = `Welcome ${username}`;
			});
	} else {
		window.location.replace('./login.html');
	}
});

signOut = () => {
	console.log('Hey! what are you trying to do');

	fetch(`${url}logout`, {
		method: 'GET',
		headers: {
			Authorization: `${token}`
		}
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status == 200) {
				if (typeof Storage !== 'undefined') {
					localStorage.setItem('token', `${data.token}`);
				}
				window.location.replace('./login.html');
			}
		});
};

logout.addEventListener('click', signOut);
