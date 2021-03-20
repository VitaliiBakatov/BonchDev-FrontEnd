if(localStorage.getItem('sortingMethod') == null){
    getCommentsWithSort()
}
else{
    getCommentsWithSort(localStorage.getItem('sortingMethod'))
}


class Comment {
    constructor(authorName, commentText) {
        this.authorName = authorName
        this.commentText = commentText
        this.publicationDate = new Date()
    }

    localStorageMessage() {
        let message = this.authorName + "&/*_=" + this.commentText + "&/*_=" + this.publicationDate.toString()
        return message
    }
}

//Собирает данные из полей textarea для добавления нового коммента
function getCommentFromTextarea(authorNameFromTextarea, commentTextFromTextarea) {
    let authorName = document.getElementById(authorNameFromTextarea).value
    let commentText = document.getElementById(commentTextFromTextarea).value
    if ((authorName == "") && (commentText == "")) {
        return
    }
    let comment = new Comment(authorName, commentText).localStorageMessage()
    let array = [authorName, commentText, comment]
    return array
}

function addComment() {
    let comment = getCommentFromTextarea('addComment_authorName', 'addComment_commentText')[2]
    let comment_id = saveCommentAndGetIdComment(comment)
    postComment(comment, comment_id)
}

function saveCommentAndGetIdComment(comment, comment_id = 1) {
    if (localStorage.getItem('comment#' + comment_id) == null) {
        localStorage.setItem('comment#' + comment_id, comment)
        return comment_id
    }
    else {
        return saveCommentAndGetIdComment(comment, comment_id + 1)
    }
}

//Меняет теги на textarea для последующего изменения
function editComment(comment_id) {
    let general_comment = document.getElementById('comment#' + comment_id)
    let authorName = general_comment.childNodes[1].childNodes[1].textContent
    let commentText = general_comment.childNodes[1].childNodes[3].textContent
    general_comment.childNodes[1].childNodes[1].outerHTML = '<textarea id="textareaAuthorNameComment#' + comment_id + '" rows="1" placeholder="Ваше имя">' + authorName + '</textarea>'
    general_comment.childNodes[1].childNodes[3].outerHTML = '<textarea id="textareaTextComment#' + comment_id + '" rows="5" cols="40"placeholder="Ваш комментарий">' + commentText + '</textarea>'
    general_comment.childNodes[3].childNodes[1].outerHTML = '<button id="confirmChangesComment">Потвердить изменения</button>'
    general_comment.childNodes[3].childNodes[1].addEventListener('click', function () {
        confirmChangesComment(comment_id)

        general_comment.childNodes[3].childNodes[1].addEventListener('click', function () {
            editComment(comment_id)
        })
    })
}

//Потверждает изменения и меняет элементы textarea на первоначальные
function confirmChangesComment(comment_id) {
    let commentFromLocalStorage = localStorage.getItem('comment#' + comment_id)
    comment = commentFromLocalStorage.split("&/*_=")
    let authorName = getCommentFromTextarea(('textareaAuthorNameComment#' + comment_id), ('textareaTextComment#' + comment_id))[0]
    let commentText = getCommentFromTextarea(('textareaAuthorNameComment#' + comment_id), ('textareaTextComment#' + comment_id))[1]
    comment[0] = authorName
    comment[1] = commentText
    comment = comment.join("&/*_=")
    localStorage.setItem('comment#' + comment_id, comment)
    let general_comment = document.getElementById('comment#' + comment_id)
    general_comment.childNodes[1].childNodes[1].outerHTML = '<h3 id="comment_author">' + authorName + '</h3>'
    general_comment.childNodes[1].childNodes[3].outerHTML = '<p id="comment_text">' + commentText + '</p>'
    general_comment.childNodes[3].childNodes[1].outerHTML = '<button id="comment_edit_btn" onclick="">Редактировать комментарий</button>'
}

function deleteComment(comment_id) {
    localStorage.setItem('comment#' + comment_id, "DELETED__COMMENT")
    document.getElementById('comment#' + comment_id).remove()
}

function getCommentsWithSort(sortingMethod,comment_id = 1) {
    if (localStorage.getItem('comment#' + comment_id) == null) {
        return
    }
    else {
        postComment(localStorage.getItem('comment#' + comment_id), comment_id, sortingMethod)
        getCommentsWithSort(sortingMethod,comment_id + 1)
    }
}

//Добавляет с помощью шаблона коммент на страничку, первым идет последний добавленный коммент
function postComment(comment, comment_id, sortingMethod = 2) {
    if (comment == "DELETED__COMMENT") {
        return
    }
    comment = comment.split("&/*_=")
    let authorName = comment[0]
    let commentText = comment[1]
    let publicationDate = comment[2].split("GMT")

    let comment_template = document.createElement('div');
    comment_template.append(comment__template.content.cloneNode(true));
    let comment_id_for_place = comment_id - 1
    var place_for_comments = document.getElementById("comment#" + comment_id_for_place);
    while ((place_for_comments == null)) {
        comment_id_for_place = comment_id_for_place - 1
        var place_for_comments = document.getElementById("comment#" + comment_id_for_place);
    }
    if (sortingMethod == 1){
        place_for_comments.insertAdjacentElement('beforeBegin', comment_template);
    }
    else{
        place_for_comments.insertAdjacentElement('afterEnd', comment_template);
    }

    let general_comment = document.getElementById("comment#")
    let comment_author = document.getElementById("comment_author")
    let comment_text = document.getElementById("comment_text")
    let comment_date = document.getElementById("comment_date")
    let comment_edit_btn = document.getElementById("comment_edit_btn")
    let comment_delete_btn = document.getElementById("comment_delete_btn")

    comment_author.innerHTML = authorName
    comment_text.innerHTML = commentText
    comment_date.innerHTML = publicationDate[0]

    general_comment.setAttribute('id', 'comment#' + comment_id)
    comment_author.removeAttribute('id')
    comment_text.removeAttribute('id')
    comment_date.removeAttribute('id')
    comment_edit_btn.addEventListener('click', function () {
        editComment(comment_id)
    })
    comment_edit_btn.removeAttribute('id')
    comment_delete_btn.addEventListener('click', function () {
        deleteComment(comment_id)
    })
    comment_delete_btn.removeAttribute('id')
}


function sortComment(sortingMethod) {
    comments = document.getElementsByClassName('comments')
    while (comments.length) {
        comments[comments.length-1].remove()
    }
    getCommentsWithSort(sortingMethod)
    localStorage.setItem('sortingMethod', sortingMethod)
}
