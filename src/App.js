import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/content';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Create from './components/create';
import Read from './components/read';
import Edit from './components/edit';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Navbar style={{ backgroundColor: 'purple' }} data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Card Database</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/create">Add to Database</Nav.Link>
            <Nav.Link href="/read">Read Database</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<Content></Content>}></Route>
        <Route path='/read' element={<Read></Read>}></Route>
        <Route path='/create' element={<Create></Create>}></Route>
        <Route path='/edit/:id' element={<Edit></Edit>}></Route>
      </Routes>
  
    </div>
    </BrowserRouter>
  );
}

export default App;
