import React, {useState} from 'react';
import { HeartFill } from 'react-bootstrap-icons'; 
import { likePost , getPost } from '../Services/axiosConfig';

function Post({id, postid, image, createdAt, author, text, likes, comments}){
  
  const [like, setLike] = useState(likes);

  let changeColor = () =>{ 
    likePost(postid)
      .then(async(response) =>{
        if(response?.status === 200 || response?.status === 204){
          await getPost().then(async (response) =>{
            if(response?.status === 200 || response?.status === 204){
              let postTemp = response?.data
                .map((item)=>{
                  if(item.id === postid){
                    return item.likes;
                  }
                });
              setLike(postTemp);
            }
          });
        }
      })
      .catch(()=>{
        //Error
      });
  };
  
  const coments = comments.map((item, index)=>{
    return(
      <div key={index}  className="comments m-2" id="commentFirstId">          
        <div className="d-flex flex-row mb-2 commentclassName" id="commentIdFirst">
          <img src={item.user.avatar} width="40" className="rounded-image"></img>
          <div className="d-flex flex-column ms-2"> 
            <span className="name">{item.user.username}</span><small className="comment-text">{item.text}</small>
            <div className="d-flex flex-row align-items-center status"> 
              <small>{new Date(item.createdAt).toDateString()}</small>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return(
    <div>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-12 col-sm-12 col-md-6 col-lg-4">
            <img src={image} className="img-fluid rounded-start img-post" alt=""></img>
            <small className="text-muted">{new Date(createdAt).toDateString()}</small>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 post-div">
            <div className="card-body">
              <h5 className="card-title">{author}</h5>
              <p className="card-text">{text}</p>
              <hr></hr>
            </div>
            <div className="d-flex justify-content-between align-items-center optionComment">
              <div className="d-flex flex-row icons d-flex align-items-center"> 
                <HeartFill className="bi-heart-fill mb-2 ms-1" id={`heart${id}`} onClick={() => changeColor()}/>                                  
                <p className="mb-2" id="likeQuan">{like}</p>
              </div>
            </div>     
          </div>
          <div className="col-12 col-sm-6 col-md-12 col-lg-4 comment-div" id="parentCommentId">
            {coments}
            <div className="comment-input mx-2"> 
              <input type="text" className="form-control comment-input-text"></input>
            </div>
            <div className="mt-2 post-button">
              <button type="button" className="btn btn-primary comment-button">Comentar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;