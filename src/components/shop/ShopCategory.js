import { useEffect, useState, useRef } from "react";
import classes from "./ShopCategory.module.css";
import {
  Link,
  useNavigate,
  useParams,
  useLocation,
  NavLink,
} from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
const REST_API = process.env.REACT_APP_API;
let keyAutoIncrease = 0;
function ShopCategory() {
  const resetRef = useRef();
  const searchRef = useRef();
  const param = useParams();
  const [option, setOption] = useState("0");
  const { categoryProduct } = param;
  const [focusCategory, setFocusCategory] = useState(categoryProduct);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  let productsUpdate = [];

  // mỗi lần component này render key sẽ tăng lên 1 - element img sẽ bị xóa và tạo lại
  keyAutoIncrease++;

  const fetchProducts = async (category, name) => {
    try {
      const query = {};
      if (category) query.category = category;
      if (name) query.name = name;

      const queryString = new URLSearchParams(query).toString();
      const res = await fetch(`${REST_API}/products?${queryString}`);
      const resData = await res.json();
      setData(resData);
    } catch (err) {
      console.error("Fetch products failed:", err);
    }
  };

  useEffect(() => {
    setSearch("");
  }, [focusCategory]);

  useEffect(() => {
    setFocusCategory(categoryProduct);
    fetchProducts(categoryProduct, search);
  }, [categoryProduct, search]);

  // reset page khi param thay đổi
  useEffect(() => {
    setOption("0");
    searchRef.current.value = "";
  }, [categoryProduct]);

  function searchHandle(e) {
    const search = e.target.value;
    setSearch(search);
    fetchProducts(categoryProduct, search);
  }

  return (
    <div className={"col-10"}>
      <div className="container p-0">
        <div className={classes.top + " row"}>
          <div className="col-3">
            <span>CATEGORIES</span>
          </div>
          <div className="col-7">
            <input
              type="text"
              placeholder="Enter Search Here!"
              ref={searchRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchHandle(e);
                }
              }}
            />
          </div>
          <div className="col-2">
            <select defaultValue={option}>
              <option value="0">Default sorting</option>
              <option value="1">Sort descending</option>
            </select>
          </div>
        </div>
        <div className={classes.bottom + " row"}>
          <div className="col-3">
            <div className={classes.menu}>
              <p className={classes.apple}>APPLE</p>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to=""
                end
                ref={resetRef}
              >
                All
              </NavLink>
              <p className={classes.iphonemac}>IPHONE & MAC</p>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="iphone"
              >
                Iphone
              </NavLink>{" "}
              <br />
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="ipad"
              >
                Ipad
              </NavLink>{" "}
              <br />
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="macbook"
              >
                Macbook
              </NavLink>{" "}
              <br />
              <p className={classes.wireless}>WIRELESS</p>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="airpod"
              >
                Airpod
              </NavLink>{" "}
              <br />
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="watch"
              >
                Watch
              </NavLink>{" "}
              <br />
              <p className={classes.other}>OTHER</p>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="mouse"
              >
                Mouse
              </NavLink>{" "}
              <br />
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="keyboard"
              >
                Keyboard
              </NavLink>{" "}
              <br />
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="other"
              >
                Other
              </NavLink>{" "}
              <br />
            </div>
          </div>
          <div className="col-9">
            <div className={classes.products}>
              {data &&
                data.map((product) => (
                  <div className={classes.product} key={product._id}>
                    <Link to={`/detail/${product._id}`}>
                      <img
                        src={
                          product.img1.startsWith("http")
                            ? product.img1
                            : API_URL + product.img1
                        }
                        alt={product.name}
                        id={product._id}
                        key={product._id + keyAutoIncrease}
                      />
                    </Link>
                    <p>{product.name}</p>
                    <p>{(+product.price).toLocaleString("de-DE")} VND</p>
                  </div>
                ))}
            </div>
            <div className={classes.pagination}>
              <div className={classes["wrap-icon"]}>
                <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                <span
                  className={
                    data.length ? classes["span-in"] : classes["hidden"]
                  }
                >
                  1
                </span>
                <i className="fa fa-angle-double-right" aria-hidden="true"></i>
              </div>
              <span>
                Showing 1-9 of {productsUpdate.length ? 9 : 0} results
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopCategory;
// navbar iphone, sort value 1, search 64
// sort value 1 rồi f5
