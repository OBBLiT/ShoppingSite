import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, Link, useParams } from "react-router-dom";
import { BiHome, BiWrench, BiHelpCircle, BiStore } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineCategory, MdOutlineSupervisorAccount } from "react-icons/md";
import profilePic from "../../Untitled.jpg";
import "../css/Admin/Admin.css";
let pm = sessionStorage.getItem("pm") ? JSON.parse(sessionStorage.getItem("pm")) : undefined;
function Admin() {
  const [height, setHeight] = React.useState(window.innerHeight);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useNavigate();
  const chckWidth = () => {
    if (window.innerWidth !== width) {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", chckWidth);
    return () => {
      window.removeEventListener("resize", chckWidth);
    };
  }, []);
  const adminLogin = (e) => {
    e.preventDefault();
    fetch("/admlog", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.parse(JSON.stringify(data)));
        pm = data;
        sessionStorage.setItem("pm", JSON.stringify(data));
        history(`/admin/${data.message}`);
      });

    console.log({ username, password });
  };
  return (
    <>
      <div id="admin-login-page" style={{ height, width }}>
        <main id="admin-login-form-container" style={{ height: height * 0.45, width: width * 0.45 }}>
          <form action="" id="admin-login-form" style={{ width: width * 0.4 }}>
            <h3 id="login-title">LOG-IN</h3>
            <input
              type="text"
              name="username"
              placeholder="username"
              id="admin-login-username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              id="admin-login-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button type="submit" id="admin-login-submit" onClick={adminLogin}>
              login
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
export const AdminSuccess = () => {
  const { id } = useParams();
  if (pm) {
    return (
      <>
        <aside id="sideBar">
          <div id="sideNavHead">
            <span id="sideNavHeadText">Admin Panel</span>
            <img id="profilePic" src={profilePic} alt="" />
          </div>
          <Link
            to={
              window.location.href.includes("additems") || window.location.href.includes("edititems") || window.location.href.includes("deleteitems")
                ? `/${window.location.href.slice(22)}`
                : `/admin/${id}/${sessionStorage.getItem("adminHomePage")}`
            }
            className="sideNavLink"
          >
            <BiHome className="sideNavLinkIcon" />
            <span className="sideNavLinkText">Dashboard</span>
          </Link>
          <span className="sideNavHeading">Stock</span>

          <Link to={`items`} className="sideNavLink">
            <BiStore className="sideNavLinkIcon" />
            <span className="sideNavLinkText">Products</span>
          </Link>

          <Link to={`items`} className="sideNavLink">
            <MdOutlineCategory className="sideNavLinkIcon" />
            <span className="sideNavLinkText">Categories</span>
          </Link>

          <span className="sideNavHeading">Users</span>

          <Link to={`users`} className="sideNavLink">
            <MdOutlineSupervisorAccount className="sideNavLinkIcon" />
            <span className="sideNavLinkText">Operators</span>
          </Link>

          <Link to={`users`} className="sideNavLink">
            <HiOutlineUserGroup className="sideNavLinkIcon" />
            <span className="sideNavLinkText">Customers</span>
          </Link>

          <span className="sideNavHeading">Control</span>

          <Link to={`settings`} className="sideNavLink">
            <BiWrench className="sideNavLinkIcon" />
            <span className="sideNavLinkText">Settings</span>
          </Link>

          <Link to={`settings`} className="sideNavLink">
            <BiHelpCircle className="sideNavLinkIcon" />
            <span className="sideNavLinkText">Help</span>
          </Link>
        </aside>
        <div id="outlet">
          <Outlet></Outlet>
        </div>
      </>
    );
  }
  return (
    <>
      <h1>PAGE NOT FOUND</h1>
    </>
  );
};
export function AdminHome() {
  const history = useNavigate();
  const [categoriesAmount, setCategoriesAmount] = React.useState(0);
  const [itemsQuantity, setItemsQuantity] = useState(0);
  const [soldItemsQuantity, setSoldItemsQuantity] = useState(0);
  const [visitCount, setVisitCount] = useState(0);
  useEffect(() => {
    fetch("/getItemsFree", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setItemsQuantity(data.length);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("/getCategories")
      .then((res) => res.json())
      .then((dat) => {
        const x = dat;
        setCategoriesAmount(x.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <main id="adminHomeContainer">
        <div id="infoContainer">
          <section className="info">Number of Items: {itemsQuantity}</section>
          <section className="info">Number of Categories: {categoriesAmount}</section>
          <section className="info">Number of Sold Items: {soldItemsQuantity}</section>
          <section className="info">Website Visit Count: {visitCount}</section>
        </div>
        <div id="pageActionsContainer">
          <span style={{ fontSize: "3.1vw" }}>Edit Products</span>
          <button
            id="abtn1"
            onClick={() => {
              history("additems");
              sessionStorage.setItem("adminHomePage", "additems");
            }}
          >
            <IoIosAddCircle style={{ color: "tomato", fontSize: "2vw" }} />
            <span style={{ fontSize: "1vw" }}>Add Item(s)</span>
          </button>
          <button
            id="abtn2"
            onClick={() => {
              history("edititems");
              sessionStorage.setItem("adminHomePage", "edititems");
            }}
          >
            <AiFillEdit style={{ color: "orange", fontSize: "2vw" }} />
            <span style={{ fontSize: "1vw" }}>Edit Item(s)</span>
          </button>
          <button
            id="abtn3"
            onClick={() => {
              history("deleteitems");
              sessionStorage.setItem("adminHomePage", "deleteitems");
            }}
          >
            <BsTrashFill style={{ color: "black", fontSize: "1.5vw" }} />
            <span style={{ fontSize: "1vw" }}>Delete Items</span>
          </button>
        </div>
      </main>
    </>
  );
}

export default Admin;
