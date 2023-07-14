import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { createContext, useState } from 'react';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';



// const URL = "https://inotebook-backened-eapl.onrender.com";
const URL = "https://inotebook-backened-eapl.onrender.com";
const myNotes = createContext();       //creating a context 
const myAlert = createContext();





function App() {
  //alert context
  const [alert, setalert] = useState(null);
  function showalert(message, type) {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }




  var initialnotes = [];
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    date: ""
  });
  const [notes, setnotes] = useState(initialnotes);

  //get all notes passed as context -------------------------------------------->
  async function getnotes() {
    const url = `${URL}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setnotes(json);
  }


  //get user details ------------------------------------------------------>
  async function getuserdetails() {
    const url = `${URL}/api/auth/getuser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setuser({
      name: json.name,
      email: json.email,
      password: json.password,
      date: json.date
    });
  }



  //add notes passed as context ------------------------------------------->
  async function addnotes(title, description, tag) {
    const url = `${URL}/api/notes/addnotes`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title: title, description: description, tag: tag })
    });
    const json = await response.json();
    setnotes(notes.concat(json));
    showalert('notes added successfully', 'success');
    console.log('adding a note');
  }


  //delete notes passed as context ------------------------------------------->
  async function deletenotes(id) {
    const url = `${URL}/api/notes/deletenotes/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    console.log('deleting note');
    const newnotes = notes.filter((note) => { return note._id != id })
    setnotes(newnotes);
    showalert('deleted successfully', 'success')
  }


  //edit notes passed as context -------------------------------------------------->
  async function editnotes(id, title, description, tag) {
    const url = `${URL}/api/notes/updatenotes/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    // const json = await response.json();
    // console.log(json);

    for (var i = 0; i < notes.length; i++) {
      const elem = notes[i];
      if (elem._id == id) {
        elem.title = title;
        elem.description = description;
        elem.tag = tag;
      }
    }

  }

  return (
    <myNotes.Provider value={{ notes, user, addnotes, deletenotes, editnotes, getnotes, getuserdetails }}>
      <myAlert.Provider value={showalert}>
        <BrowserRouter>
          <div className="bg-info bg-gradient bg-opacity-25">
            <Navbar />
            <div className="">
              <Alert alert={alert} />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
              </Routes>
            </div>
            <div className="bg-primary text-center p-5">
              <a href="https://www.linkedin.com/in/aksingh564/" className='text-dark text-decoration-none'><i className="fa-brands fa-linkedin mx-4 py-2 fa-3x" ></i></a>
              <a href="https://github.com/ayush-kumarsingh" className='text-dark text-decoration-none'><i className="fa-brands fa-github mx-4 py-2 fa-3x"></i></a>
              <a href="https://www.instagram.com/kum8r_ay4sh/" className='text-dark text-decoration-none'><i className="fa-brands fa-square-instagram mx-4 py-2 fa-3x"></i></a>
              <br />
              <br />

              <p>Email at : <a className='text-dark text-decoration-none' href='mailto:aksingh.er564@gmail.com'>aksingh.er564@gmail.com</a></p>
            </div>
          </div>
        </BrowserRouter>
      </myAlert.Provider>
    </myNotes.Provider >

  );
}

export default App;
export { myNotes, myAlert };


