function getJSON(url, successHandler, errorHandler) {
    var xhr = typeof XMLHttpRequest !== 'undefined' ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    xhr.open('GET', url);

    xhr.onreadystatechange = function () {
        var status,
            data;

        if (xhr.readyState === 4) {
            status = xhr.status;

            if (status === 200) {
                data = JSON.parse(xhr.responseText);

                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };

    xhr.send();
}

function showPosts(data) {
    var div,
        i;

    for (i = 0; i < data.length; i++) {
        div = document.createElement('div');
        div.className = 'posts';
        div.innerHTML = 'title: ' + data[i].title + ' autor: ' + data[i].author +
            ' id: ' + data[i].id;

        document.body.insertBefore(div, document.body.firstChild);
    }
}

getJSON('http://localhost:3000/posts', function (data) {
    showPosts(data);

    console.log(data);
}, function (status) {
    console.log('Something went wrong.', status);
});

function addPost(data) {
    div = document.createElement('div');
    div.className = 'posts';
    div.innerHTML = 'title: ' + data.title + ' autor: ' + data.author + ' id: ' + data.id;

    document.body.insertBefore(div, document.body.firstChild);
}

function postJSON(url, successHandler, errorHandler) {
    var xhr = typeof XMLHttpRequest !== 'undefined' ?
            new XMLHttpRequest() :
            new ActiveXObject('Microsoft.XMLHTTP'),
        responseType = 'responseType' in xhr,
        title = document.getElementsByName('title')[0].value,
        author = document.getElementsByName('author')[0].value;

    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        var status,
            data,
            post;

        if (xhr.readyState === 4) {
            status = xhr.status;
            post = JSON.parse(xhr.responseText);

            addPost(post);

            if (status === 201) {
                data = responseType ? xhr.response : post;

                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };

    xhr.send(JSON.stringify({
        title: title,
        author: author
    }));
}

document.forms[0].onsubmit = function (event) {
    event.preventDefault();

    postJSON('http://localhost:3000/posts', function (data) {
        console.log('Success ', data);
    }, function (status) {
        console.log('Something went wrong.', status);
    });
};