const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
	item.addEventListener('click', function() {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
		this.parentElement.classList.add('is-active')
	})
})


async function loginFormHandler(event) {
	event.preventDefault();

	const email = document.querySelector('#login-email').value.trim();
	const password = document.querySelector('#login-password').value.trim();

	if (email && password) {
	const response = await fetch('/api/users/login', {
		method: 'post',
		body: JSON.stringify({
			email,
			password
		}),
		headers: { 'Content-Type': 'application/json' }
	});

		if (response.ok) {
			document.location.replace('/blog');
		} else {
			alert(response.statusText);
		}
	}
}

async function signupFormHandler(event) {
	event.preventDefault();

	const username = document.querySelector('#signup-username').value.trim();
	const email = document.querySelector('#signup-email').value.trim();
	const password = document.querySelector('#signup-password').value.trim();

	if (username && email && password) {
		const response = await fetch('/api/users', {
			method: 'post',
			body: JSON.stringify({
				username,
				email,
				password
			}),
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.ok) {
			document.location.replace('/blog');
		} else {
			try {
			const responseData = await response.json();

			if (responseData.errors && responseData.errors.length > 0) {
				const errorMessages = responseData.errors.map((error) => {
				if (error.validatorKey === 'len') {
					return 'Password must be at least 8 characters long.';
				} else if (error.validatorKey === 'not_unique') {
					if (error.path === 'username') {
					return 'Username is already taken.';
					} else if (error.path === 'email') {
					return 'Email is already registered.';
					}
				} else if (error.validatorKey === 'isEmail') {
					return 'Invalid email address.';
				}

				return error.message;
				});

				alert(errorMessages.join('\n'));
			} else {
				alert('Signup failed. Please try again.');
			}
			} catch (error) {
			alert('Signup failed. Please try again.');
			}
		}
	}
}

document.querySelector('.form-login').addEventListener('submit', loginFormHandler);
document.querySelector('.form-signup').addEventListener('submit', signupFormHandler);
