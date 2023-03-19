import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput, MDBContainer, MDBCardText,MDBTypography
}
from 'mdb-react-ui-kit';



const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'foo' && password === 'bar') {
      onLogin();
    } else {
      alert('Invalid username or password');
    }
  };

  return (
     <form onSubmit={handleLogin}>
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <img src='https://www.faceprep.in/statics/media/logo_web.47d10a50.svg' alt="Logo" />
                
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Login into your account</h5>

                <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='text' size="lg"value={username} onChange={(e) => setUsername(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"value={password} onChange={(e) => setPassword(e.target.value)} />

              <MDBBtn className="mb-4 px-5" color='dark' size='lg'type="submit">Login</MDBBtn>
            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  </form>
  );
};

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return <button type="button" onClick={handleLogout} className='btn btn-primary btn-lg btn-block'>Logout</button>;
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://randomuser.me/api/?results=50&page=${page}`);
        const newUsers = response.data.results;
        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [page]);

  const handleLoadMore = () => {
    setLoading(true);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
     <ul>
        {users.map((user) => (
          <li key={user.login.uuid}>
            <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src={user.picture.thumbnail} alt="thumbnail"
                     className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
                  <MDBCardText>Web Designer</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Name</MDBTypography>
                        <MDBCardText className="text-muted">{`${user.name.first} ${user.name.last}`}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{user.email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Address</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                         <MDBTypography tag="h6">Address</MDBTypography>
                        <MDBCardText className="text-muted">{`${user.location.street.name} ,${user.location.city},${user.location.postcode}`}</MDBCardText>
                       
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Country</MDBTypography>
                        <MDBCardText className="text-muted">{user.location.country}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
          </li>
        ))}
      </ul> 
       
      {loading && <button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>}
      {!loading && (
        <button onClick={handleLoadMore} type='button' className='btn btn-primary btn-lg btn-block'>
          Load more
        </button>
      )}
    </>
  );
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (
        <>
          <Logout onLogout={handleLogout} />
          <UserList />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
