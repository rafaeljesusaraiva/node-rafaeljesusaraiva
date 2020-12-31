var submitBtn = document.getElementsByClassName('submit')[0];
submitBtn.addEventListener('click', function () {
    // var newProject = {
    //     client: document.getElementsByClassName('inClient')[0].value,
    //     name: document.getElementsByClassName('inName')[0].value,
    //     price: document.getElementsByClassName('inPrice')[0].value,
    //     location: document.getElementsByClassName('inLocation')[0].value,
    //     date: document.getElementsByClassName('inDate')[0].value,
    //     totalImages: document.getElementsByClassName('inTotalImages')[0].value,
    //     fileFormat: document.getElementsByClassName('inFileFormat')[0].value
    // }
    var link = document.getElementsByClassName('feedbackForm')[0].dataset.link;
    const xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("POST", link);
    // xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.info('Feedback: Sending Request');

    var formData = new FormData();
    // xhr.onload = successfullyUploaded;
    xmlhttp.open("POST", link, true);
    xmlhttp.setRequestHeader('X-Requested-With','XMLHttpRequest');
    let files = document.querySelector('[name=files]').files;
    Array.from(files).forEach(file => {
        formData.append("photos", file);
    });
    formData.append('client', document.getElementsByClassName('inClient')[0].value);
    formData.append('name', document.getElementsByClassName('inName')[0].value);
    formData.append('price', document.getElementsByClassName('inPrice')[0].value);
    formData.append('location', document.getElementsByClassName('inLocation')[0].value);
    formData.append('date', document.getElementsByClassName('inDate')[0].value);
    formData.append('coverFile', document.getElementsByClassName('inCoverFileName')[0].value);
    formData.append('fileFormat', document.getElementsByClassName('inFileFormat')[0].value);
    xmlhttp.send(formData);
    // xmlhttp.send(JSON.stringify(newProject));
    // console.log(newProject)
    xmlhttp.onreadystatechange = (e) => {
        try {
            JSON.parse(xmlhttp.responseText)
        } catch (error) {
            return;
        }
        console.info('New Project: Response Received');
        var resp = JSON.parse(xmlhttp.responseText);
        if (resp.message == 'submitted') {
            console.log('New Project: New Project Submitted');
            submitBtn.classList.add('success');
            window.setTimeout(() => {
                submitBtn.classList.remove('success');
            }, 2000);
        } else {
            console.error('New Project: Error Occured => ' + resp.message);
            submitBtn.classList.add('error');
            window.setTimeout(() => {
                submitBtn.classList.remove('error');
            }, 2000);
        }
    }
});