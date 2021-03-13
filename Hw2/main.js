getComment()

function addComment(){
    let message = document.getElementsByTagName('textarea')[0].value
    console.log(message)
    if (message == ""){
        return
    }
    postComment(message)
    saveComment(message)
}

function postComment(message){
    let p = document.createElement('p')
    p.innerText = message
    document.querySelector('p').after(p)
}

function saveComment(message){
    let comment = localStorage.getItem('comment')
    if (comment == null)
    { 
        comment = ""
    }
    comment += message + " "
    localStorage.setItem('comment', comment)
}

function getComment(){
    let commentInStorage = localStorage.getItem('comment')
    if (commentInStorage == null)
    { 
        return
    }
    let comments = commentInStorage.split(" ")
    comments.splice(-1)
    console.log(comments)
    for (comment of comments){
        postComment(comment)
    }
}