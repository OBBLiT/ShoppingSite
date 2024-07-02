import React from "react";
import { useParams } from "react-router-dom";
import "./css/Item.css";

function Item() {
  const { id } = useParams();
  const [info, setInfo] = React.useState({});
  React.useEffect(() => {
    fetch(`/getItem/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
      });
  }, []);
  const itemImagesContainer = React.useRef();
  var indx = 0;
  return (
    <div id="itemBackground">
      <main id="itemContainer">
        <div id="imageContainer">
          <button
            id="itemImagesSlideLeft"
            onClick={() => {
              if (info.images && indx < 0) {
                itemImagesContainer.current.style.transform = `translateX(${indx + 400}px)`;
                indx += 400;
              }
            }}
          >
            {"<"}
          </button>
          <section id="img">
            <div id="itemImagesContainer" ref={itemImagesContainer}>
              <img className="images" src={info.images ? info.images.urls[0] : undefined} alt={info.name} />
              <img className="images" src={info.images ? info.images.urls[1] : undefined} alt={info.name} />
              <img className="images" src={info.images ? info.images.urls[2] : undefined} alt={info.name} />
              <img className="images" src={info.images ? info.images.urls[3] : undefined} alt={info.name} />
              <img className="images" src={info.images ? info.images.urls[4] : undefined} alt={info.name} />
              <img className="images" src={info.images ? info.images.urls[5] : undefined} alt={info.name} />
            </div>
          </section>
          <button
            id="itemImagesSlideRight"
            onClick={() => {
              if (info.images && indx > -(400 * (info.images.urls.length - 1))) {
                itemImagesContainer.current.style.transform = `translateX(${indx - 400}px)`;
                indx -= 400;
              }
            }}
          >
            {">"}
          </button>
        </div>
        <h3>{info.name}</h3>
        <p>{info.brand}</p>
        <p>{info.price}</p>
        <p>{info.description}</p>
        <section id="buttons">
          <button>add to cart</button>
          <button>buy now</button>
        </section>
      </main>
    </div>
  );
}

export default Item;
