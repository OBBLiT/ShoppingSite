import React, { useState, useEffect, useRef } from "react";
import "../css/Admin/AddItems.css";
import { AiOutlineRollback } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function reducer(state, action) {
  if (action.type === "setSelectedFile1") {
    return {
      selectedFiles: { ...state.selectedFiles, file1: action.payload },
    };
  } else if (action.type === "setSelectedFile2") {
    return {
      selectedFiles: { ...state.selectedFiles, file2: action.payload },
    };
  } else if (action.type === "setSelectedFile3") {
    return {
      selectedFiles: { ...state.selectedFiles, file3: action.payload },
    };
  } else if (action.type === "setSelectedFile4") {
    return {
      selectedFiles: { ...state.selectedFiles, file4: action.payload },
    };
  } else if (action.type === "setSelectedFile5") {
    return {
      selectedFiles: { ...state.selectedFiles, file5: action.payload },
    };
  } else if (action.type === "setSelectedFile6") {
    return {
      selectedFiles: { ...state.selectedFiles, file6: action.payload },
    };
  } else if (action.type === "clearAll") {
    return {
      selectedFiles: {
        file1: "",
        file2: "",
        file3: "",
        file4: "",
        file5: "",
        file6: "",
      },
    };
  }
}
export default function AdminAddItems() {
  const categoriesContainer = useRef();
  const [state, dispatch] = React.useReducer(reducer, { selectedFiles: {} });
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [itemCategories, setItemCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState("");
  const [selectedFileValue1, setSelectedFileValue1] = useState("");
  const [selectedFileValue2, setSelectedFileValue2] = useState("");
  const [selectedFileValue3, setSelectedFileValue3] = useState("");
  const [selectedFileValue4, setSelectedFileValue4] = useState("");
  const [selectedFileValue5, setSelectedFileValue5] = useState("");
  const [selectedFileValue6, setSelectedFileValue6] = useState("");
  const [existingCategories, setExistingCategories] = useState([]);
  const [categoriesInputEmpty, setCategoriesInputEmpty] = useState(true);
  const history = useNavigate();
  const categoriesSetter = async (value) => {
    var newValue = value.map((item) => {
      return item.trim();
    });
    setItemCategories((prev) => {
      return [...prev, ...newValue];
    });
    return value;
  };
  const categoriesInput = (e) => {
    if (itemCategories.length < 1 && e.target.value < 1) {
      setCategoriesInputEmpty(true);
    } else {
      setCategoriesInputEmpty(false);
    }
    if (e.key == "Enter") {
      e.preventDefault();
      categoriesSetter(e.target.value.split(",")).then((val) => {
        e.target.value = "";
        categoriesContainer.current.scrollTop = categoriesContainer.current.scrollHeight;
      });
    } else if (e.key == "Backspace" && e.target.value.length < 1) {
      setItemCategories((prev) => {
        return prev.slice(0, prev.length - 1);
      });
    }
  };
  useEffect(() => {
    fetch("/getCategories")
      .then((res) => res.json())
      .then((dat) => {
        setExistingCategories(dat);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <header className="header">
        <div id="HIContainer">
          <span className="title">Add a Product</span>
          <button
            id="aiBackBtn"
            onClick={() => {
              history("..");
              sessionStorage.setItem("adminHomePage", "");
            }}
          >
            <AiOutlineRollback />
          </button>
        </div>
      </header>

      <div id="adminAddItemsContainer">
        <form id="addItemsForm">
          <input
            type="text"
            name="name"
            id="nameInput"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            name="brand"
            id="brandInput"
            placeholder="Brand"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
          />
          <div id="addItemCategories" ref={categoriesContainer}>
            {itemCategories.map((item, index) => {
              return (
                <div key={index} className="categoriesItemContainer">
                  <p className="categoriesItem">{item}</p>
                  <span
                    className="categoriesItemDelete"
                    onClick={() => {
                      setItemCategories((prev) => {
                        return prev.filter((items) => {
                          return items != item;
                        });
                      });
                    }}
                  >
                    x
                  </span>
                </div>
              );
            })}
            <input
              onKeyDown={(e) => {
                categoriesInput(e);
              }}
              placeholder={categoriesInputEmpty ? "categories" : ""}
              type="text"
              name="addItemCategoriesInput"
              id="addItemCategoriesInput"
            />
          </div>
          <input
            type="text"
            name="price"
            id="priceInput"
            placeholder="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <input
            type="text"
            name="colors"
            id="colorsInput"
            placeholder="Colors"
            value={colors}
            onChange={(e) => {
              setColors(e.target.value);
            }}
          />
          <textarea
            name="description"
            placeholder="Description"
            id="descriptionInput"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>

          <input
            type="file"
            name="image"
            id="imageInput1"
            value={selectedFileValue1}
            onChange={(e) => {
              setSelectedFileValue1(e.target.value);
              const reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onloadend = () => {
                dispatch({ type: "setSelectedFile1", payload: reader.result });
              };
            }}
          />
          <img src={state.selectedFiles.file1} alt="First Image" id="image1" style={{ height: "100px", width: "100px", objectFit: "contain" }} />
          <input
            type="file"
            name="image"
            id="imageInput2"
            value={selectedFileValue2}
            onChange={(e) => {
              setSelectedFileValue2(e.target.value);
              const reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onloadend = () => {
                dispatch({ type: "setSelectedFile2", payload: reader.result });
              };
            }}
          />
          <img src={state.selectedFiles.file2} alt="Second Image" id="image2" style={{ height: "100px", width: "100px", objectFit: "contain" }} />
          <input
            type="file"
            name="image"
            id="imageInput3"
            value={selectedFileValue3}
            onChange={(e) => {
              setSelectedFileValue3(e.target.value);
              const reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onloadend = () => {
                dispatch({ type: "setSelectedFile3", payload: reader.result });
              };
            }}
          />
          <img src={state.selectedFiles.file3} alt="Third Image" id="image3" style={{ height: "100px", width: "100px", objectFit: "contain" }} />
          <input
            type="file"
            name="image"
            id="imageInput4"
            value={selectedFileValue4}
            onChange={(e) => {
              setSelectedFileValue4(e.target.value);
              const reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onloadend = () => {
                dispatch({ type: "setSelectedFile4", payload: reader.result });
              };
            }}
          />
          <img src={state.selectedFiles.file4} alt="Fourth Image" id="image4" style={{ height: "100px", width: "100px", objectFit: "contain" }} />
          <input
            type="file"
            name="image"
            id="imageInput5"
            value={selectedFileValue5}
            onChange={(e) => {
              setSelectedFileValue5(e.target.value);
              const reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onloadend = () => {
                dispatch({ type: "setSelectedFile5", payload: reader.result });
              };
            }}
          />
          <img src={state.selectedFiles.file5} alt="Fifth Image" id="image5" style={{ height: "100px", width: "100px", objectFit: "contain" }} />
          <input
            type="file"
            name="image"
            id="imageInput6"
            value={selectedFileValue6}
            onChange={(e) => {
              setSelectedFileValue6(e.target.value);
              const reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onloadend = () => {
                dispatch({ type: "setSelectedFile6", payload: reader.result });
              };
            }}
          />
          <img src={state.selectedFiles.file6} alt="Sixth Image" id="image6" style={{ height: "100px", width: "100px", objectFit: "contain" }} />
          <div id="saveBtnContainer">
            <button
              type="submit"
              id="saveBtn"
              onClick={(e) => {
                e.preventDefault();
                e.target.disabled = true;
                if (
                  !name ||
                  !brand ||
                  !price ||
                  !itemCategories ||
                  !description ||
                  !colors ||
                  !selectedFileValue1 ||
                  !selectedFileValue2 ||
                  !selectedFileValue3 ||
                  !selectedFileValue4 ||
                  !selectedFileValue5 ||
                  !selectedFileValue6
                ) {
                  e.target.disabled = false;
                  return;
                } else if (
                  name &&
                  brand &&
                  price &&
                  itemCategories &&
                  description &&
                  colors &&
                  selectedFileValue1 &&
                  selectedFileValue2 &&
                  selectedFileValue3 &&
                  selectedFileValue4 &&
                  selectedFileValue5 &&
                  selectedFileValue6
                ) {
                  fetch("/admadditems", {
                    method: "POST",
                    body: JSON.stringify({
                      name,
                      brand,
                      price,
                      itemCategories,
                      description,
                      colors,
                      images: state.selectedFiles,
                    }),
                    headers: { "Content-Type": "application/json" },
                  })
                    .then((result) => {
                      return result.json();
                    })
                    .then((data) => {
                      if (data.message === "success") {
                        if (
                          !existingCategories.some((item) => {
                            return item.name === itemCategories;
                          })
                        ) {
                          setExistingCategories([...existingCategories, { name: itemCategories }]);
                        }
                        setName("");
                        setBrand("");
                        setPrice("");
                        setItemCategories("");
                        setDescription("");
                        setColors("");
                        setSelectedFileValue1("");
                        setSelectedFileValue2("");
                        setSelectedFileValue3("");
                        setSelectedFileValue4("");
                        setSelectedFileValue5("");
                        setSelectedFileValue6("");
                        dispatch({ type: "clearAll" });
                        console.log(data.message);
                      }
                      e.target.disabled = false;
                    })
                    .catch((err) => {
                      console.log(err);
                      e.target.disabled = false;
                    });
                }
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
