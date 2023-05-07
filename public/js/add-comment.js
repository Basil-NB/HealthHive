async function newFormHandler(event) {
    event.preventDefault()
    const comment_text = document.querySelector('#add_comment'.value)

    const response = await fetch(`/api/comment`, {
        method: "POST",
        body: JSON.stringify({
            comment_text,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (response.ok) {
        document.location.replace("/")
    } else {
        alert("Unable to add comment")
    }
}

document.querySelector(".new-comment-form").addEventListener("submit", newFormHandler)