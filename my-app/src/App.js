import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Modal,ModalHeader,ModalBody,ModalFooter,Table,Button,Container,FormGroup,Label,Input} from 'reactstrap';
import { render } from '@testing-library/react';


class App extends Component {
  state = {
    books: [],
    newBookData:{
      title:'',
      rating:'',

    },
    editBookData:{
      id:'',
      title:'',
      rating:'',

    },
    newBookModal:false,
    editBookModal:false
  }
  componentWillMount(){
    this._refreshBooks();

  }
  toggleNewBookModal()
  {
    this.setState({
      newBookModal : ! this.state.newBookModal
    })
  }
  toggleEditBookModal()
  {
    this.setState({
      editBookModal : ! this.state.editBookModal
    })
  }
 addbook(){
   axios.post('http://127.0.0.1:8000/books/', this.state.newBookData).then((response) =>{
     let {books} = this.state;
     books.push(response.data)
    this.setState({books, newBookModal:false, newBookData:{
      title:'',
      rating:''
    }})



   })
 }
 updatebook(){
   let {title, rating} = this.state.editBookData;
   axios.patch('http://127.0.0.1:8000/books/' + this.state.editBookData.id + '/',{
    title, rating
   }).then((response) => {
     this._refreshBooks();
     this.setState({
       editBookModal:false, editBookData: {
         id:'',
         title:'',
         rating:''
       }
     })
   })

 }
 editBook(id, title, rating){
  this.setState({
    editBookData:{id, title, rating}, editBookModal: ! this.state.editBookModal
  });

 }

 _refreshBooks(){
  axios.get('http://127.0.0.1:8000/books/').then((response) => {
      this.setState({
        books: response.data
       
        
      })
        


    });

 }
 deleteBook(id){
     axios.delete('http://127.0.0.1:8000/books/' + id + '/').then((response) => {
       this._refreshBooks();
     })
 }
  render() {
    let books = this.state.books.map((book) => {
      return (
        <tr key={book.id}>
        <td>{book.id}</td>
      <td>{book.title}</td>
      <td>{book.rating}</td>
        <td><Button color="success" className='mr-2' onClick={this.editBook.bind(this,book.id,book.title,book.rating)}>Edit</Button>
        <Button color="danger" onClick={this.deleteBook.bind(this, book.id)}>Delete</Button></td>
      </tr>
      )
 
});
  


  return (
    <div className='App container mt-5'>
      <h1>Computer Coding Books </h1>
    <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>#</th>
      <th>Title </th>
      <th>Rating</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {books}
    
  </tbody>
</Table>
{/* modal for new book */}
<Button color="danger" onClick={this.toggleNewBookModal.bind(this)} className='float-right'>Add Book</Button>
      <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)} >
        <ModalHeader toggle={this.toggleNewBookModal.bind(this)}> Add a new Book</ModalHeader>
        <ModalBody>
        <FormGroup>
        <Label for="exampleEmail">Title</Label>
        <Input id="title" value={this.state.newBookData.title} placeholder="Enter a title of book" onChange={(e) => {
          let {newBookData} = this.state;
          newBookData.title = e.target.value;
          this.setState({newBookData});

        }}/>
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Rating</Label>
        <Input  id="rating" value={this.state.newBookData.rating} placeholder="Enter a book rating"  onChange={(e) => {
          let {newBookData} = this.state;
          newBookData.rating = e.target.value;
          this.setState({newBookData});

        }} />
      </FormGroup>
        </ModalBody>
        <ModalFooter>
          
        <Button color="primary" onClick={this.addbook.bind(this)}>Add</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

{/* modal for edit i.e update */}

      <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)} >
        <ModalHeader toggle={this.toggleEditBookModal.bind(this)}> Add a new Book</ModalHeader>
        <ModalBody>
        <FormGroup>
        <Label for="exampleEmail">Title</Label>
        <Input id="title" value={this.state.editBookData.title} placeholder="Enter a title of book" onChange={(e) => {
          let {editBookData} = this.state;
          editBookData.title = e.target.value;
          this.setState({editBookData});

        }}/>
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Rating</Label>
        <Input  id="rating" value={this.state.editBookData.rating} placeholder="Enter a book rating"  onChange={(e) => {
          let {editBookData} = this.state;
          editBookData.rating = e.target.value;
          this.setState({editBookData});

        }} />
      </FormGroup>
        </ModalBody>
        <ModalFooter>


          <Button color="primary" onClick={this.updatebook.bind(this)}>update</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
</div>
  )};
}

export default App;
