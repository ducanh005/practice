import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";
const ModalAddNew = (props) => {
  const { show, handleClose,handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const handleSaveuser = async () => {
    let res = await postCreateUser(name, job);

    if (res && res.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("A User is created succeed");
    handleUpdateTable({first_name:name,id:res.id})
    } else {
      toast.error("An error...");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <form>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label
                  for="exampleInputPassword1"
                  className="form-label"
                  value={job}
                  onChange={(event) => setJob(event.target.value)}
                >
                  Job
                </label>
                <input type="text" className="form-control" />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveuser()}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
