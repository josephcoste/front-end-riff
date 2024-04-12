// this is the post preview module for the feed page 
import {useState, useEffect} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { getProfile } from '../../services/users.js';
import LikeButton from '../LikeButton/LikeButton.jsx';
import FollowButton from '../FollowButton/FollowButton.jsx';
import './PostPreview.css';

function PostPreview( {post, width, height} ) {
  const navigate = useNavigate();

  const [postData, setPostData] = useState({});
  const [postUser, setPostUser] = useState({});

  // get post data and user data nested
  useEffect(() => {
    // function to get post object
    const getUserData = async (id) => {
      const data = await getProfile(id);
      console.log('is get user data getting called?')
      console.log('does getting profile data work?', data)
      setPostUser(data);
      
    }
    // get Post data and call user data
    const getPostData = async () => {
      const posti = await post;
      setPostData( posti );
      getUserData( posti.author );
    }
    
    getPostData();  
  }, [post]);
  // check for follows
  console.log('do we have the data', )

  // handle the body click
  const handleClick = () => {
    navigate(`thread/${postData.id}`);
  }
  
  return (
    <div 
      id="background-PostPreview"
      style={{
        'width': width,
        'height': height,
        'backgroundImage': `linear-gradient(rgba(45,255,196,0.2), rgba(15, 15, 100, 0.5)), url(${postData.image})`
      }}
    >
      <div
        id="centerClick-PostPreview"
        onClick={handleClick}
      >
      </div>
      <div id="mainContainer-PostPreview">
        
        <div className='sidebarBg-PostPreview'>
          <NavLink to={`/user/${postUser.id}`}>
            <div 
              id="profPic-PostPreview"
              style={{'backgroundImage': `url(${postUser.profilePic})`}}
              alt="your profile pic"
            > 
            </div>
          </NavLink>

          
          <FollowButton state={false} width={'5rem'}/>
        </div>
        
        <div className='sidebarBg-PostPreview'>
          <LikeButton state={false} width={'5rem'} />
        </div>
      </div>
      
    </div>
  )
}

export default PostPreview  