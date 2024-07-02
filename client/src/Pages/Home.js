import React, { useEffect, useState } from 'react'
import Loading from './Tools/loading'
import { FaSearch } from 'react-icons/fa'
import { useNavigate, Link } from 'react-router-dom'
import '../Pages/css/Home.css'
function Home() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const history = useNavigate()
  const changeColor = () => {
    const root = document.querySelector(':root')
    var rootStyle = getComputedStyle(root)
    var rootMainColor = rootStyle.getPropertyValue('--mainColor')
    if (parseInt(rootMainColor) + 1 < 359) {
      root.style.setProperty('--mainColor', `${parseInt(rootMainColor) + 1}`)
    } else {
      root.style.setProperty('--mainColor', `0`)
    }
  }
  useEffect(() => {
    const colorInterval = setInterval(changeColor, 10)
    fetch('/getItemsFree', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data)
        setIsLoading(false)
        clearInterval(colorInterval)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <main id='homeOverallContainer'>
      <form>
        <input type='search' name='' id='' />
        <button
          type='submit'
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          <FaSearch />
        </button>
      </form>
      {isLoading ? (
        <Loading />
      ) : (
        <div id='homeContainer'>
          {items.map((item) => {
            return (
              <div
                key={item._id}
                /* className='homeItemContainer' */
                onClick={() => {
                  history(`${item._id}`)
                }}
              >
                <img
                  src={item.images.urls[0]}
                  alt={item.name}
                  className='homeItemImage'
                  style={{
                    height: '300px',
                    width: '300px',
                    objectFit: 'cover',
                  }}
                />
                <section className='homeItemDitsContainer'>
                  <h5 className='homeItemName'>{item.name}</h5>
                  <span className='homeItemBrand'>{item.brand}</span>
                  <span className='homeItemPrice'>{item.price}</span>
                  <p className='homeItemDescription'>{`${item.description.slice(
                    0,
                    200
                  )}...`}</p>
                </section>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default Home
