import React, { useEffect, useState, useReducer } from 'react';
import '../css/Admin/DeleteItems.css';
import Loading from '../Tools/loading';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineRollback } from 'react-icons/ai';
let pm = sessionStorage.getItem('pm')
  ? JSON.parse(sessionStorage.getItem('pm'))
  : undefined;
function reducer(state, action) {
  if (action.type === 'markMe') {
    return { ...state, [action.payload]: true };
  } else if (action.type === 'unmarkMe') {
    return { ...state, [action.payload]: false };
  } else if (action.type === 'markAll') {
  } else if (action.type === 'unmarkAll') {
    return {};
  }
}
function DeleteItems() {
  const history = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isMarkItems, setIsMarkItems] = useState(false);
  const [state, dispatch] = useReducer(reducer, {});
  useEffect(() => {
    fetch('/getItems', {
      method: 'POST',
      body: JSON.stringify({ code: pm.message }),
      headers: {
        'Content-Type': 'application/json',
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
    fetch('/getCategories')
      .then((res) => res.json())
      .then((dat) => {
        const x = dat;
        x.unshift({ name: 'All Categories' });
        setCategories(x);
      })
      .catch((err) => {
        console.log(err);
      });
    items.forEach((value, index) => {});
  }, []);

  return (
    <main id='deleteItemsContainer'>
      <header id='deleteItemsHeader'>
        <form id='deleteItemsSearchForm'>
          <input type='search' name='' id='' placeholder='search' />
          <button
            type='submit'
            onClick={(e) => {
              e.preventDefault();
            }}
            id='deleteItemsSubmitBtn'
          >
            <FaSearch />
          </button>
        </form>
        <select
          name='category'
          id='deleteItemsCategories'
          onChange={(e) => {
            setIsLoading(true);
            console.log(e.target.value);
            fetch(`/getCategoryItems`, {
              method: 'POST',
              body: JSON.stringify({ message: e.target.value }),
              headers: {
                'Content-Type': 'application/json',
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
              <option
                key={index}
                value={item.name === 'All Categories' ? '' : item.name}
              >
                {item.name}
              </option>
            );
          })}
        </select>
        {isMarkItems ? (
          <>
            <button onClick={() => {}}>Mark All</button>
            <button
              onClick={() => {
                setIsMarkItems(false);
              }}
            >
              Unmark All
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setIsMarkItems(true);
            }}
          >
            Mark Items
          </button>
        )}
        <h1 id='deleteItemsHeading'>Delete Items</h1>
        <button
          id='diBackBtn'
          onClick={() => {
            history('..');
            sessionStorage.setItem('adminHomePage', '');
          }}
        >
          <AiOutlineRollback />
        </button>
      </header>
      {isLoading ? (
        <Loading />
      ) : (
        <div id='deleteItemsContainer'>
          {items.map((item, index) => {
            return (
              <div key={item._id} /* className='deleteItemsItemContainer' */>
                {isMarkItems ? (
                  <input
                    type='checkbox'
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch({
                          type: 'markMe',
                          payload: `isItem${index}Checked`,
                        });
                      } else {
                        dispatch({
                          type: 'unmarkMe',
                          payload: `isItem${index}Checked`,
                        });
                      }
                    }}
                  />
                ) : null}
                <img
                  src={item.images.urls[0]}
                  alt={item.name}
                  className='deleteItemsItemImage'
                  style={{
                    height: '300px',
                    width: '300px',
                    objectFit: 'cover',
                  }}
                />
                <section className='deleteItemsItemDitsContainer'>
                  <h5 className='deleteItemsItemName'>{item.name}</h5>
                  <span className='deleteItemsItemBrand'>{item.brand}</span>
                  <span className='deleteItemsItemPrice'>{item.price}</span>
                  <p className='deleteItemsItemDescription'>{`${item.description.slice(
                    0,
                    200
                  )}...`}</p>
                </section>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default DeleteItems;
