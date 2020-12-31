var submitBtn = document.getElementsByClassName('submit')[0];
var evntFired = false;
submitBtn.addEventListener('click', function () {
    var inputUsername = document.getElementsByClassName('username')[0].value;
    var inputPassword = document.getElementsByClassName('password')[0].value;
    var messageAlert = document.getElementsByClassName('message')[0];
    var messageSuccess = document.getElementsByClassName('message')[1];

    if (!evntFired) {
        evntFired = true;

        if (isEmpty(inputUsername) || isEmpty(inputPassword)) {
            showMessage(messageAlert, 'Nome de Utilizador e/ou Palavra-passe não inserido(s)!');
            return;
        }

        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", '/api/auth/signin');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        console.info('Auth: Sending Request');
        xmlhttp.send(JSON.stringify({
            username: inputUsername,
            password: inputPassword
        }));
        xmlhttp.onreadystatechange = (e) => {
            try {
                JSON.parse(xmlhttp.responseText)
            } catch (error) {
                return;
            }
            console.info('Auth: Response Received');
            var resp = JSON.parse(xmlhttp.responseText);
            if (resp.message == 'Login com sucesso') {
                console.log('Auth: User Authenticated');
                showMessage(messageSuccess, resp.message+', a redirecionar...');
                window.setTimeout(() => {
                    window.location.href = '/private';
                    evntFired = false;
                }, 1000);
            } else {
                console.error('Auth: Error Occured => ' + resp.message);
                showMessage(messageAlert, resp.message);
                window.setTimeout(() => {
                    evntFired = false;
                }, 2000);
            }
        }
    }
});

function isEmpty(input) {
    if (input == '') return true;
    else return false;
}

function showMessage(container, message) {
    container.style.display = '';
    container.textContent = message;
    container.classList.add('show');
    window.setTimeout(() => {
        container.classList.remove('show');
        window.setTimeout(() => {
            container.style.display = 'none';
        }, 400);
    }, 4000);
}