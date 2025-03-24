import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/images/logo192.png";
const Header = (props) => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logoApp}
                            width="30"
                            height="30"
                            className="d-inline-block alight-top"
                            alt="React Bootstrap logo"
                        ></img>
                        <span>Vu Duc Anh's App</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" activeKey={"/users"}>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/users">Manage Users</Nav.Link>
                            <NavDropdown
                                title="Setting"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="/login">
                                    Login
                                </NavDropdown.Item>
                                <NavDropdown.Item href="logout">
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
