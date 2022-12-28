import './profil.css'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, ListGroup, Nav } from 'react-bootstrap';
import { myPosts,deletePost } from '../../redux/postSlice';
import logo from '../../components/logo.png'
import deleteicon from '../deleteicon.png';
import EditPost from './EditPost';
import noposts from '../Noposts.png.png'





function Profile() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const user = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.post.posts);
  useEffect(() => {
    dispatch(myPosts(),deletePost())
  }, [dispatch])
  return (
    <>
      {auth ? (
        <>
    <>
      <aside className="asideprofile-card">
        <header className="ProfileProfile">
          <a>
            <img src={user?.picture}/>
          </a>
          <h1 > {user?.userName}</h1>
          <h2> {user?.phone}</h2>
        </header>
        <button className="button button1" ></button>
      </aside>
    </>
    <>
        <div className='postMap'>
          <>
          {posts.length > 0 ? posts.map((post =>

            <Card style={{ width: '18rem', float: 'left', margin: '20px 20px' }} key={post._id}>
              <Card.Img variant='top' src={logo} style={{ width: '18rem' }} />
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>{post.content}</ListGroup.Item>
                  <ListGroup.Item style={{ fontSize: '25px', lineHeight: '25px' }}>${post.price}</ListGroup.Item>
                  <ListGroup.Item>{post.title}</ListGroup.Item>

                </ListGroup>
                <ListGroup.Item>
                  <Button variant="secondary" style={{ width: '40px',height:'40px', margin: '5px 15px',marginLeft:'40px',marginTop:'10px' }} onClick={()=> deletePost({id: post._id})}>
                    <img src={deleteicon}
                      style={{ width: '50px', margin: '0px -20px',marginTop:'-10px',marginLeft:'-21px' }} />
                   </Button>{' '}
                </ListGroup.Item>
                <ListGroup.Item>
                   <EditPost/>
                </ListGroup.Item>
              </Card.Body>
            </Card>))
            : <img src={noposts} style={{ width: '700px', margin: '100px 300px' }}></img>
          }
          </>
        </div>
    </>
    </>
    ) : (
      <>
        <img src={logo} style={{ width: '700px', margin: '100px 300px' }}></img>
      </>
    )}
    </>
  );
}
export default Profile