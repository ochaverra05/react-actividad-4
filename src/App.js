import React, { useState, useEffect }  from 'react';
import './App.css';
import Navbar from './Componentes/Navbar';
import PostList from './Componentes/PostList';
import SearchBar from './Componentes/Searchbar';
import Profile from './Componentes/Profile';
import Login from './Componentes/login';
import { getPost, getUser } from './Services/axiosConfig';
import { Switch, Route, useHistory } from 'react-router-dom';

function App(){
  const loadingText = 'Loading...';
  const [post, setPost] = useState([]);
  const [currentUser, setcurrentUser] = useState([]);
  const [loginOk, setLoginOK] = useState(false);
  const [search, setSearch] = useState('');
  const [section, setSection] = useState('Post');
  const history = useHistory(); 
  let user = JSON.parse(localStorage.getItem('UserID'));
  let handlePost = (data) => {
    setPost(data);    
  };    
  let handleUser = (userParam) => {
    setcurrentUser(userParam);
  };
  let handleLoginOk = (login) => {
    setLoginOK(login);
    if(login === true){
      handleUser(JSON.parse(localStorage.getItem('UserID')));
      posts();
      changeSection('Post');
    }else{
      history.push('/login');      
    }    
  };
  let posts = () => {
    getPost()
      .then(response => {
        handlePost(response.data);
      });
  };
  // Should not ever set state during rendering, so do this in useEffect instead.
  useEffect(() => {
    if(user){
      getUser(user.id)
        .then(response => {
          if(response?.status === 200){
            handleLoginOk(true);
          }
          else if(response?.status === 401){
            handleUser([]);
            handleLoginOk(false);
          }
          else{
            //(response?.status + ' FALLO');
          }
        })
        .catch( ()=> {
          //ERROR
        });
    }else{    
      history.push('/login');
    }
  }, []);

  let changeSearch = (value) => {
    setSearch( value);
  };
  let changeSection = (value) => {
    setSection( value);
    if(value === 'Post'){    
      posts();  
      history.push('/');
    }else if(value === 'Logo'){
      handlePost([]);
      history.push('/Profile');
    }
  };
  let changeToLogout = (value) =>{   
    if(value){
      handleLoginOk(false);
      handleUser([]);
      handlePost([]);
      changeSection([]);
      localStorage.clear();
    }
  };
  return (
    <div className="container mt-4">
      <Switch>
        {
          loginOk? (
            <div>
              <Navbar onLogoClick={(logo)=>changeSection(logo)} onProfileClick={(profile)=>changeSection(profile)}/>
              {section === 'Post'?(
                post.length > 0? (       
                  <div> 
                    <SearchBar value={search} onSearch={(value)=>changeSearch(value)}/>          
                    <Route path="/" exact component={(props) => 
                      <PostList {...props} posts={post} search={search}/>} />
                  </div>
                ):
                  <div>
                    {loadingText}
                  </div>
              ):
                <div>
                  <Route path="/Profile" exact component={(props) => 
                    <Profile {...props} 
                      avatar={currentUser.avatar} 
                      username={currentUser.username} 
                      bio={currentUser.bio} 
                      onClickLogout={(logout)=>changeToLogout(logout)}/>} />
                </div>}
            </div>   
          ): 
            <div>
              {currentUser.length > 0? (
                <div>
                  <h3 className="text-center">Oriller Login</h3>
                  <hr></hr>
                  {loadingText}
                </div>  
              ): 
                <Route path="/login"  exact component={(props) =>                 
                  <Login {...props} onLoginComplete={(login)=> handleLoginOk(login) }/> }/>
              }
            </div>
        }
      </Switch>
    </div>
  );
}

export default App;
