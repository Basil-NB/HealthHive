async function createPostHandler(event) {
    event.preventDefault();

    document.location.replace('/blog/new')
}


document.querySelector('#create-new-post').addEventListener('click', createPostHandler);