(() => {
    let user = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : '';
    document.addEventListener('DOMContentLoaded', () => {
        const urlUser = 'http://localhost:3400/users/';
        const urlRobot = 'http://localhost:3400/robots/';
        document
            .querySelector('.register form')
            .addEventListener('submit', (ev) => {
                ev.preventDefault();
                const data = {
                    name: document.querySelectorAll('.register input')[0].value,
                    email: document.querySelectorAll('.register input')[1]
                        .value,
                    password:
                        document.querySelectorAll('.register input')[2].value,
                };
                fetch(urlUser, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-type': 'application/json' },
                })
                    .then((resp) => {
                        console.log(resp);
                        return resp.json();
                    })
                    .then((data) => console.log(data));
            });
        document
            .querySelector('.login form')
            .addEventListener('submit', (ev) => {
                ev.preventDefault();
                const data = {
                    email: document.querySelectorAll('.login input')[0].value,
                    password:
                        document.querySelectorAll('.login input')[1].value,
                };
                fetch(urlUser + 'login', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-type': 'application/json' },
                })
                    .then((resp) => {
                        console.log(resp);
                        return resp.json();
                    })
                    .then((data) => {
                        user = data;
                        localStorage.setItem('user', JSON.stringify(user));
                        console.log(user);
                    });
            });
        document
            .querySelector('.login [type="button"]')
            .addEventListener('click', () => {
                user = '';
                localStorage.removeItem('user');
            });
        document
            .querySelector('.robot button')
            .addEventListener('click', () => {
                fetch(urlRobot, {
                    headers: {
                        authorization: `Bearer ${user.token}`,
                    },
                })
                    .then((resp) => {
                        console.log(resp);
                        return resp.json();
                    })
                    .then((data) => console.log(data));
            });
    });
})();
