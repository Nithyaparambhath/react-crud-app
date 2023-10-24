import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap';
import Add from './Add'
import { addUser, deleteAUser, getAUser, getAllUsers, updateAUser } from '../services/allAPI';
import { Button, Form, Modal} from 'react-bootstrap';
function View() {
  const [updateUser,setUpdateUser] = useState({})
  const [userr,setUserr]  =useState({})
    const [DeleteStatus,setDeleteStatus] = useState(false)
    const [serverResponseData,setServerResponseData] = useState({})
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showw, setShoww] = useState(false);

    const handleeClose = () => setShoww(false);
    const handleeShow = () => setShoww(true);


    
    const [allUsers,setAllUsers] =useState([])
    const getAllUsersDetails = async ()=>{

    const response = await getAllUsers()
    console.log(response.data);
    setAllUsers(response.data)
    }

    const getEditUser = async ()=>{

        const response = await getAllUsers()
        console.log(response.data);
        setAllUsers(response.data)
        }

   useEffect(()=>{
    getAllUsersDetails()
    getEditUser()
   },[serverResponseData,DeleteStatus])


   const deleteUser= async (id)=>{
    console.log(id);
        // make api call
        await deleteAUser(id)
        setDeleteStatus(true)
   }

   const viewUser = async (id)=>{
    
    const user = await getAUser(id)
    setUserr(user.data)
    handleShow()


   }

   const editUser = async (id)=>{
    
    const user = await getAUser(id)
    setUserr(user.data)
    handleeShow()


   }
 
   const handleEdit=  async ()=>{
    
    const response = await updateAUser(userr.id,userr)
    console.log(response);
    setServerResponseData(response.data)
   
    handleeClose()
  }
 
  return (
    <div style={{width:'80%',margin:'0px auto'}} className=" mt-5">
        <Row>
            <Col></Col>
            <Col></Col>
            <Col><Add setServerResponseData={setServerResponseData}/></Col>
        </Row>

        
       


        <Table variant="dark" bordered hover className='mt-3 '>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {allUsers?.map((item,index)=>(
            <tr key={index}>
            <td>{index+1}</td>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td className='d-flex justify-content-evenly'>
              <button onClick={()=>viewUser(item.id)}  className='btn btn-primary'>Read</button>
              <button onClick={()=>editUser(item.id)} className='btn btn-warning'>Edit</button>
              <button onClick={()=>deleteUser(item.id)} className='btn btn-danger'>Delete</button>
            </td>
          </tr>
        ))}
        
        
      </tbody>
    </Table>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className='bg-light text-dark'  closeButton>
          <Modal.Title className='text-dark bg-light'>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>user ID : <span className='text-warning'>{ userr.id}</span>  </h3>
          <h3>user Name : <span className='text-warning'>{userr.username}</span> </h3>
          <h3>Email : <span className='text-warning'>{userr.email}</span>  </h3>
          <h3>Phone : <span className='text-warning'>{userr.phone}</span></h3>

          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          
        </Modal.Footer>
      </Modal>


      <Modal
        show={showw}
        onHide={handleeClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className='bg-light text-dark'  closeButton>
          <Modal.Title className='text-dark bg-light'>Edit User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please Edit the following details !!!</p>

          <Form className='border border-secondary rounded p-3'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter User ID" value={userr.id} onChange={(e)=>setUserr({...userr,id:e.target.value})}  />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter User Name " value={userr.username} onChange={(e)=>setUserr({...userr,username:e.target.value})}  />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter User Email" value={userr.email} onChange={(e)=>setUserr({...userr,email:e.target.value})}  />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter User Phone" value={userr.phone} onChange={(e)=>setUserr({...updateUser,phone:e.target.value})}  />
            </Form.Group>

            

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleeClose}>
            Cancel
          </Button>
          <Button onClick={handleEdit}   variant="primary">Edit</Button>
        </Modal.Footer>
      </Modal>
      </div>
  )
}

export default View