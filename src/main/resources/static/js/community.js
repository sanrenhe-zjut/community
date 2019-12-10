function post() {
    var questionid = $("#question_id").val();
    var content = $("#comment_content").val();
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
                $("#comment_section").hide();
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