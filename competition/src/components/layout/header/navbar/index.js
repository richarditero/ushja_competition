import React, {useState} from 'react';
import './Navbar.css';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import navItems from '../../../../_nav';

function AppNavBar() {
  const [show, setShow] = useState(Array(navItems.items.length).fill(false));

  const showDropdown = index => {
    setShow(show => {
      return show.map((item, showIndex) =>
        showIndex === index ? (item = true) : (item = false)
      );
    });
  };

  const hideDropdown = index => {
    setShow(show => {
      return show.map((item, showIndex) =>
        showIndex === index ? (item = false) : item
      );
    });
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="#FFF"
      variant="light"
      className="padrl15">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {navItems.items.map((item, index) => {
            return (
              <div key={index}>
                {item?.dropDownItems ? (
                  <NavDropdown
                    show={show[index]}
                    href={item.url}
                    onMouseEnter={() => showDropdown(index)}
                    onMouseLeave={() => hideDropdown(index)}
                    title={item.name}
                    id="collasible-nav-dropdown">
                    {item?.dropDownItems.map((dropDownItem, itemIndex) => (
                      <NavDropdown.Item
                        href={dropDownItem.url}
                        key={index + '' + itemIndex}>
                        {dropDownItem.name}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ) : (
                  <Nav.Link href={item.url}>{item.name}</Nav.Link>
                )}
              </div>
            );
          })}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavBar;
