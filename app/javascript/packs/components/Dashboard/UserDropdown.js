import React from "react";
import Popper from "popper.js";
import { Link, useHistory } from "react-router-dom";

const UserDropdown = (props) => {
  const user = props.profile;
  let history = useHistory()
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const handleLogOutClick = e => {
    e.preventDefault()
    fetch('/users/sign_out', {
      method: 'DELETE',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content,

      }
    }).then((response) => {

    }).then((data) => {
      window.localStorage.clear()
      history.replace('/')
    })
      .catch((error) => {
        // console.log(error);
        // Toast.fire({
        //     icon: 'error',
        //     title: 'Log out failed, try again'
        // })
      })
  }
  return (
    <>
      <a
        className="text-gray-600 block"
        href="#"
        ref={btnDropdownRef}
        onClick={e => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-gray-300 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("../../assets/img/team-1-800x800.jpg")}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
        }
        style={{ minWidth: "12rem" }}
      >
        { user &&
        <Link
          to={`/profile/${user.username}`}
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          }
        >
          Profile
        </Link>}
        <div className="h-0 my-2 border border-solid border-gray-200" />
        <a
          href="#"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          }
          onClick={handleLogOutClick}
        >
          Log out
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
