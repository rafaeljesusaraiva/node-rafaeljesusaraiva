var submitBtn = document.getElementsByClassName('submit')[0];
submitBtn.addEventListener('click', function () {
    var inputFeedback = document.getElementsByClassName('feedback')[0].value;
    var link = document.getElementsByClassName('feedbackForm')[0].dataset.link;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", link);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.info('Feedback: Sending Request '+inputFeedback);
    xmlhttp.send(JSON.stringify({ feedbackInput: inputFeedback }));
    xmlhttp.onreadystatechange = (e) => {
        try {
            JSON.parse(xmlhttp.responseText)
        } catch (error) {
            return;
        }
        console.info('Feedback: Response Received');
        var resp = JSON.parse(xmlhttp.responseText);
        if (resp.message == 'submitted') {
            console.log('Feedback: Feedback Submitted');
            submitBtn.classList.add('success');
            window.setTimeout(() => {
                submitBtn.classList.remove('success');
            }, 2000);
        } else {
            console.error('Feedback: Error Occured => ' + resp.message);
            submitBtn.classList.add('error');
            window.setTimeout(() => {
                submitBtn.classList.remove('error');
            }, 2000);
        }
    }
});