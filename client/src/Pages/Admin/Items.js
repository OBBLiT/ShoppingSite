import React, { useEffect, useState } from "react";
import "../css/Admin/EditItems.css";
import Loading from "../Tools/loading";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AiOutlineRollback } from "react-icons/ai";
let pm = sessionStorage.getItem("pm") ? JSON.parse(sessionStorage.getItem("pm")) : undefined;
function Items() {
  const history = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("/getItems", {
      method: "POST",
      body: JSON.stringify({ code: pm.message }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("/getCategories")
      .then((res) => res.json())
      .then((dat) => {
        const x = dat;
        x.unshift({ name: "All Categories" });
        setCategories(x);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main id="editItemsOverallContainer">
      <header id="editItemsHeader">
        <form id="editItemsSearchForm">
          <input type="search" name="" id="" placeholder="search" />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
            }}
            id="editItemsSubmitBtn"
          >
            <FaSearch />
          </button>
        </form>
        <select
          name="category"
          id="editItemsCategories"
          onChange={(e) => {
            setIsLoading(true);
            console.log(e.target.value);
            fetch(`/getCategoryItems`, {
              method: "POST",
              body: JSON.stringify({ message: e.target.value }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((dat) => {
                setItems(dat);
                setIsLoading(false);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          {categories.map((item, index) => {
            return (
              <option key={index} value={item.name === "All Categories" ? "" : item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
        <h1 id="editItemsHeading">Items</h1>
      </header>
      {isLoading ? (
        <Loading />
      ) : (
        <div id="editItemsContainer">
          {items.map((item) => {
            return (
              <div
                key={item._id}
                /* className='editItemsItemContainer' */ onClick={() => {
                  history(item._id);
                }}
              >
                <img
                  src={item.images.urls[0]}
                  alt={item.name}
                  className="editItemsItemImage"
                  style={{
                    height: "300px",
                    width: "300px",
                    objectFit: "cover",
                  }}
                />
                <section className="editItemsItemDitsContainer">
                  <h5 className="editItemsItemName">{item.name}</h5>
                  <span className="editItemsItemBrand">{item.brand}</span>
                  <span className="editItemsItemPrice">{item.price}</span>
                  <p className="editItemsItemDescription">{`${item.description.slice(0, 200)}...`}</p>
                </section>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default Items;
