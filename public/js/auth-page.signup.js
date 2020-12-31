var submitBtn = document.getElementsByClassName('submit')[0];
var evntFired = false;
submitBtn.addEventListener('click', function () {
    var data = { 
        name: document.getElementsByClassName('name')[0].value, 
        email: document.getElementsByClassName('email')[0].value,
        username: document.getElementsByClassName('username')[0].value, 
        password: document.getElementsByClassName('password')[0].value 
    }
    var messageAlert = document.getElementsByClassName('message')[0];
    var messageSuccess = document.getElementsByClassName('message')[1];

    if (!evntFired) {
        evntFired = true;

        if (isEmpty(data.name) || isEmpty(data.email) || 
            isEmpty(data.username) || isEmpty(data.password)) {
            showMessage(messageAlert, 'Informação em falta no registo!');
            return;
        }

        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", '/api/auth/signup');
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        console.info('Auth: Sending Request');
        xmlhttp.send(JSON.stringify(data));
        xmlhttp.onreadystatechange = (e) => {
            try {
                JSON.parse(xmlhttp.responseText)
            } catch (error) {
                return;
            }
            console.info('Auth: Response Received');
            var resp = JSON.parse(xmlhttp.responseText);
            if (resp.message == 'Utilizador registado com sucesso!') {
                console.log('Auth: User Registered');
                showMessage(messageSuccess, resp.message);
                window.setTimeout(() => {
                    window.location.href = '/login';
                    evntFired = false;
                }, 2000);
            } else {
                console.error('Auth: Error Occured => ' + resp.message);
                if (resp.message == 'Validation error: Validation isEmail on email failed')
                showMessage(messageAlert, 'Formato do email incorreto.');
                else showMessage(messageAlert, resp.message);
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