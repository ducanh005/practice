import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _, { debounce } from "lodash";
import "./TableUser.scss";
import Papa from "papaparse";
import { toast } from "react-toastify";
import { CSVLink, CSVDownload } from "react-csv";

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPAges, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState("");

    const [dataExport, setDataExport] = useState([]);
    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    };

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    };

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    };

    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex((item) => item.id === user.id);
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);
    };

    useEffect(() => {
        getUsers(1);
    }, []);

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setTotalUsers(res.total);
            setListUsers(res.data);
            setTotalPages(res.total_pages);
        }
    };

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    };

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    };

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);

        setListUsers(cloneListUsers);
    };

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        setListUsers(cloneListUsers);
    };

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter((item) =>
                item.email.includes(term)
            );
            setListUsers(cloneListUsers);
        } else {
            getUsers(1);
        }
    }, 1000);

    const getUserExport = (event, done) => {
        let result = [];
        if (listUsers && listUsers.length > 0) {
            result.push(["Id", "Email", "First name", "Last name"]);
            listUsers.map((item, index) => {
                result.push([
                    item.id,
                    item.email,
                    item.first_name,
                    item.last_name,
                ]);
            });
            setDataExport(result);
            done();
        }
    };

    const handleImportCSV = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];

            if (file.type !== "text/csv") {
                toast.error("Only accept scv files...");
                return;
            }
            Papa.parse(file, {
                // header:true,
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (
                                rawCSV[0][0] !== "email" ||
                                rawCSV[0][1] !== "first_name" ||
                                rawCSV[0][2] !== "last_name"
                            ) {
                                toast.error("Wrong format Header CSV file!");
                            } else {
                                let result = [];

                                // eslint-disable-next-line array-callback-return
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        result.push(obj);
                                    }
                                });
                              

                                setListUsers(result);
                            }
                        } else {
                            toast.error("Wrong format CSV file!");
                        }
                    } else toast.error("Not found data on CSV file!");
                },
            });
        }
    };

    return (
        <>
            <div className="my-3 add-new d-sm-flex ">
                <span >List User:</span>
                <div className="group-btns mt-sm-0 mt-2">
                    <label htmlFor="test" className="btn btn-warning">
                        <i className="fa-solid fa-file-import"></i> Import
                    </label>
                    <input
                        id="test"
                        type="file"
                        hidden
                        onChange={(event) => {
                            handleImportCSV(event);
                        }}
                    ></input>

                    <CSVLink
                        filename="user.csv"
                        className="btn btn-primary"
                        data={dataExport}
                        asyncOnClick={true}
                        onClick={getUserExport}
                    >
                        <i className="fa-solid fa-file-arrow-down"></i> Export
                    </CSVLink>
                    <button
                        className="btn btn-success"
                        onClick={() => setIsShowModalAddNew(true)}
                    >
                        <i className="fa-solid fa-plus"></i> Add new
                    </button>
                </div>
            </div>
            <div className="col-12 col-sm-4 my-3">
                <input
                    className="form-control"
                    placeholder="Search user by email"
                    // value={keyword}
                    onChange={(event) => handleSearch(event)}
                ></input>
            </div>
          <div className="customize-table">
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>
                                <div className="sort_header">
                                    <span>ID</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down"
                                            onClick={() => handleSort("desc", "id")}
                                        ></i>
                                        <i
                                            className="fa-solid fa-arrow-up"
                                            onClick={() => handleSort("asc", "id")}
                                        ></i>
                                    </span>
                                </div>
                            </th>
                            <th>Email</th>
                            <th>
                                <div className="sort_header">
                                    <span>First name </span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down"
                                            onClick={() =>
                                                handleSort("desc", "first_name")
                                            }
                                        ></i>
                                        <i
                                            className="fa-solid fa-arrow-up"
                                            onClick={() =>
                                                handleSort("asc", "first_name")
                                            }
                                        ></i>
                                    </span>
                                </div>
                            </th>
                            <th>Last name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers &&
                            listUsers.length > 0 &&
                            listUsers.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning mx-3"
                                                onClick={() => handleEditUser(item)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    handleDeleteUser(item)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
          </div >
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPAges}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />

            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            ></ModalAddNew>

            <ModalEditUser
                show={isShowModalEdit}
                dataUserEdit={dataUserEdit}
                handleClose={handleClose}
                handleEditUserFromModal={handleEditUserFromModal}
            ></ModalEditUser>

            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            ></ModalConfirm>
        </>
    );
};

export default TableUsers;
