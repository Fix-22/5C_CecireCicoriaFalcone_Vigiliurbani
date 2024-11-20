export const generateLoginComponent = (parentElement) => {
    let token;
    let isLogged;
    let privateClass;

    const login = (username, password) => {
        return new Promise((resolve, reject) => {
            fetch("https://ws.cipiaceinfo.it/credential/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "key": token
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(r => r.json())
            .then(data => resolve(data.result))
            .catch(err => reject(err.result));
        });
    };

    return {
        build: (inputToken, inputPrivateClass) => {
            token = inputToken;
            isLogged = sessionStorage.getItem("logged") || false;
            privateClass = inputPrivateClass;

            if (isLogged) {
                document.getElementById("loginContainer").classList.add("d-none");
                document.querySelectorAll("." + privateClass).forEach(e => {
                    e.classList.remove("d-none");
                });
            }
        },
        renderForm: () => {
            const html = `<form id="loginForm" class="form-inline">
                            <div class="row">
                                <div class="col">
                                    <input type="text" id="usernameInput" class="form-control" placeholder="Username">
                                </div>
                                <div class="col">
                                    <input type="password" id="passwordInput" class="form-control sm" placeholder="Password">
                                </div>
                                <div class="col">
                                    <button type="button" id="loginButton" class="btn btn-primary mb-2">Accedi</button>
                                </div>
                            </div>
                        </form>`;
            parentElement.innerHTML = html;

            document.getElementById("loginButton").onclick = () => {
                const username = document.getElementById("usernameInput").value;
                const password = document.getElementById("passwordInput").value;

                if (username && password) {
                    login(username, password)
                    .then(r => {
                        if (r) {
                            sessionStorage.setItem("logged", true);
                            isLogged = true;
                            document.getElementById("usernameInput").value = "";
                            document.getElementById("passwordInput").value = "";

                            document.querySelectorAll("." + privateClass).forEach(e => {
                                e.classList.remove("d-none");
                            });

                            document.getElementById("loginContainer").classList.add("d-none");
                        }
                    })
                    .catch(err => {

                    });
                }
            };
        },
        isLogged: () => {
            return isLogged;
        }
    };
};