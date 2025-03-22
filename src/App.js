import { useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import ModalAddNew from "./components/ModalAddNew";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";

function App() {

  const [isShowModalAddNew,setIsShowModalAddNew] = useState(false)
  const handleClose = ()=>{
    setIsShowModalAddNew(false)
  }
  return (
    <div className="app-container">
      <Header></Header>
      <Container>
        <div className="my-3 add-new ">
          <span>List User:</span>
          <button className="btn btn-success" onClick={()=>setIsShowModalAddNew(true)}>Add new User</button>
        </div>
        <TableUsers></TableUsers>
      </Container>

      <ModalAddNew show={isShowModalAddNew} handleClose={handleClose}></ModalAddNew>
    </div>
  );
}

export default App;
