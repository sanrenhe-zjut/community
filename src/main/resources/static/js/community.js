/**
 * 提交回复
 */
function post() {
    var questionid = $("#question_id").val();
    var content = $("#comment_content").val();
    comment2target(questionid, 0, content);
    /*
    if (!content) {
        alert("不能回复空内容~~~");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/comment",
        contentType: 'application/json',
        data: JSON.stringify({
            "parentId": questionid,
            "content": content,
            "type": 0
        }),
        success: function (response) {
            if (response.code == 200) {
                // $("#comment_section").hide();
                window.location.reload();
            } else {
                if (response.code == 2003) {
                    var isAccepted = confirm(response.message);
                    if (isAccepted) {
                        window.open("https://github.com/login/oauth/authorize?client_id=28da27ab160133a9b157&redirect_uri=http://localhost:8887/callback&scope=user&state=1");
                        window.localStorage.setItem("closable", true);
                    }
                } else {
                    alert(response.message);
                }

            }
            console.log(response);
        },
        dataType: "json"
    }) */
    // console.log(questionid);
    // console.log(content);
}

function comment2target(targetId, type, content) {
    // var questionid = $("#question_id").val();
    // var content = $("#comment_content").val();
    if (!content) {
        alert("不能回复空内容~~~");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/comment",
        contentType: 'application/json',
        data: JSON.stringify({
            "parentId": targetId,
            "content": content,
            "type": type
        }),
        success: function (response) {
            if (response.code == 200) {
                // $("#comment_section").hide();
                window.location.reload();
            } else {
                if (response.code == 2003) {
                    var isAccepted = confirm(response.message);
                    if (isAccepted) {
                        window.open("https://github.com/login/oauth/authorize?client_id=28da27ab160133a9b157&redirect_uri=http://localhost:8887/callback&scope=user&state=1");
                        window.localStorage.setItem("closable", true);
                    }
                } else {
                    alert(response.message);
                }

            }
            console.log(response);
        },
        dataType: "json"
    })
    // console.log(questionid);
    // console.log(content);
}

function comment(e) {
    var commentId = e.getAttribute("data-id");
    var content = $("#input-" + commentId).val();
    comment2target(commentId, 1, content);
}

/**
 * 展开二级评论
 */
function collapseComment(e) {
    // debugger;
    // console.log(this);
    var id = e.getAttribute("data-id");
    var comments = $("#comment-"+id);

    // 获取一下二级评论的展开状态
    var collapse = e.getAttribute("data-collapse");
    if (collapse) {
        // 折叠二级【评论
        comments.removeClass("in");
        e.removeAttribute("data-collapse");
        e.classList.remove("active");
    } else {
        $.getJSON("/comment/" + id, function (data) {

            /*
            var items = [];
            $.each(data, function (key, val) {
                items.push("<li id='" + key + "'>" + val + "</li>>");
            });
            $("<ul/>", {
                "class": "my-new-list",
                html: items.join("")
            }).appendTo("body")*/
            console.log(data);
            var commentBody = $("comment-body-id"+id);
            var items = [];

            $.each(data.data, function (comment) {
                var c = $("<div/>",{
                    "class": "col-lg-12 col-md-12 col-sm-12 col-xs-12 comments",
                    html: comment.content
                });
                items.push(c);

                // items.push("<li id='" + key + "'>" + val + "</li>>");
            });

            commentBody.append($("<div/>",{
                "class": "col-lg-12 col-md-12 col-sm-12 col-xs-12 collapse sub-comments",
                "id": "comment-" + id,
                html: items.join("")
            }));

            // 展开二级评论
            comments.addClass("in");
            // 标记二级评论展开状态
            e.setAttribute("data-collapse", "in");
            e.classList.add("active");
        });

    }


    // console.log(id);

}

function selectTag(e) {
    var value = e.getAttribute("data-tag");
    var previous = $("#tag").val();
    if (previous.indexOf(value) == -1) {
        if (previous) {
            $("#tag").val(previous + ',' + value);
        } else {
            $("#tag").val(value);
        }
    }
}

function showSelectTag() {
    $("#select-tag").show();
}