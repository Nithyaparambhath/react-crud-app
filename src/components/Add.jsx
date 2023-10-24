import React from 'react'
import { Button, Form, Modal} from 'react-bootstrap';
import { useState } from 'react';
import { addUser } from '../services/allAPI';

function Add({setServerResponseData}) {
  const [user,setUser] =useState({
    id:"",
    username:"",
    email:"",
    phone:""
  })
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd= async ()=>{
    const {id,username,email,phone} = user
    if(!id || !username || !email || !phone){
      alert("Please fill the form completely!!!")
    }else{
      const response = await addUser(user)
      console.log(response);
      if(response.status>=200 && response.status<=300){
        alert('user added')

        // 
        setServerResponseData(response.data)
        // hide modal
        handleClose()
      }else{
        alert("please provide unique id for users")
      }
    }
  }
  return (
    <>
        <div>
            <button onClick={handleShow} className='btn btn-success'>Create User +</button></div>

            <div>
            <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className='bg-light text-dark'  closeButton>
          <Modal.Title className='text-dark bg-light'>Create User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please Fill the following details !!!</p>

          <Form className='border border-secondary rounded p-3'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter User ID" onChange={(e)=>setUser({...user,id:e.target.value})}  />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter User Name" onChange={(e)=>setUser({...user,username:e.target.value})}  />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter User Email" onChange={(e)=>setUser({...user,email:e.target.value})}  />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter User Phone" onChange={(e)=>setUser({...user,phone:e.target.value})}  />
            </Form.Group>

            

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd}  variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
       </div>
    </>

    
  )
}

export default Add