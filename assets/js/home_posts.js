

{
    //method to submit the form data using post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault(); //prevent page refreshing

            $.ajax({
                type:'post',
                url:'/posts/create', //same given in the form action
                data: newPostForm.serialize() ,//converts to json
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost))
                }, error:function(error){
                    console.log(error.responseText);
                }
            })
        });
    }
    //method to create post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${ post._id}">X</a>
            </small>
            ${post.content}
            <br>
            <small>
            ${post.user.name}
            </small>
        </p>
        <div class="post-comments">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type Here to add comment..." required>
                    <input type="hidden" name="post" value="${post._id}" >
                    <input type="submit" value="Add Comment">
                </form>
    
    
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                    
                </ul>
            </div>
        </div>  
        
    </li>`)
    }

    //method to delete a post
    let deletePost = function(deleteLink){
        $(deleteLink.click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'), //getting href value from a tag
                success: function(data){ //data is the id of the post which is to be deleted
                    $(`#post-${data.data.post_id}`).remove();
                },error:function(error){
                    console.log(error.responseText);
                }
            })
        }))
    }
    createPost();
}