import React from 'react'

export default function About() {
  return (
    <div className='p-2'>
      <h2 className='text-center mt-2'> About this iNotebook App</h2>
      <div className="container">
        <h4 className='text-left'>Features of this iNotebook</h4>
        <ul itemType='disc'>
          <li>create an account</li>
          <li>Login in an account</li>
          <li>create a Note</li>
          <li>Read a Note</li>
          <li>Update Note</li>
          <li>Delete Note</li>
        </ul>
      </div>
      <div className="container">
        <h4 className='text-left'>Tech-Stack</h4>
        <ul itemType='disc'>
          <li>
            <h5>Frontend</h5>
            <ul itemType='square'>
              <li>React</li>
              <li>Bootstrap</li>
            </ul>
          </li>
          <li>
            <h5>Backened</h5>
            <ul itemType='square'>
              <li>Node js</li>
              <li>Express js</li>
            </ul>
          </li>
          <li>
            <h5>Database</h5>
            <ul itemType='square'>
              <li>MongoDB</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="container">
        <h4>Description</h4>
        <p>This App is a <b>full stack web-development project</b> which comprises of the features such as <b>Login</b> and <b>Signup</b> page along with the functionality of <b>CRUD </b>operations on notes. Various other frameworks such as <b>Bcrypt</b> js is used to encrypt the password so that the password must remain protected. <b>JWT (json web tokens) </b>is also used to generate tokens upon login to prevent the unauthorized access of notes. With this ,user will be able to access only his/her notes only.</p>
        <p>The Backened is developed as an API and the requests to these API is made through the React fetch methods in the frontend. The alerts are also added to guide the user through the app.</p>
        <p>Thank you for visiting us!</p>
      </div>
    </div>
  )
}
