import Post from './Post';
import React from 'react';

function PostList({posts, search}){
  return(
    <div className="mt-3">
      {posts.filter((filterPost) => { 
        let lower = search.toLowerCase();
        return filterPost.text.toLowerCase().includes(lower);
      })
        .map((post,index) => (
          <Post 
            key={index}
            id={index}
            postid={post.id}
            image={post.image}
            createdAt={post.createdAt}
            author={post.author.username}
            text={post.text}
            likes={post.likes}
            comments={post.comments}
          />
        )                
        )}
    </div>
  );
}

export default PostList;