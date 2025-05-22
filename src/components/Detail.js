import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../components/store/AuthContext";
import { fetchProductDetail, fetchProducts } from "../services/homeServices";
import { fetchAddToCart } from "../services/cartServices";
import classes from "./Detail.module.css";

const API_URL = process.env.REACT_APP_API_URL;
function DetailPage() {
  const { isLogged, user, fetchProfile } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const product = useLoaderData();
  const param = useParams();
  const navigate = useNavigate();
  const { productId } = param;
  const refQuantity = useRef();
  let { category } = product[0];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchProducts();
      setRelatedProduct(
        response
          .filter((product) => product.category === category)
          .filter((product) => product._id !== productId)
      );
    };
    fetchData();
  }, [productId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [param]);

  function decrementHandle() {
    setQuantity((prev) => Math.max(prev - 1, 1));
  }

  function incrementHandle() {
    setQuantity((prev) => prev + 1);
  }

  async function addToCartHandle() {
    if (!isLogged) {
      alert("Vui lòng đăng nhập để thực hiện chức năng này!");
    }
    // console.log(productId, quantity, user);
    const response = await fetchAddToCart({ productId, quantity, user });
    await fetchProfile();
    navigate("/cart");
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className={classes.detail + " col-10"}>
          <div className={classes.listImage}>
            <div className={classes.smallImage}>
              <img
                src={
                  product[0]?.img1?.startsWith("http")
                    ? product[0]?.img1
                    : API_URL + product[0]?.img1
                }
                alt={product[0]?.name}
              />
              <img
                src={
                  product[0]?.img2?.startsWith("http")
                    ? product[0]?.img2
                    : API_URL + product[0]?.img2
                }
                alt={product[0]?.name}
              />
              <img
                src={
                  product[0]?.img3?.startsWith("http")
                    ? product[0]?.img3
                    : API_URL + product[0]?.img3
                }
                alt={product[0]?.name}
              />
              <img
                src={
                  product[0]?.img4?.startsWith("http")
                    ? product[0]?.img4
                    : API_URL + product[0]?.img4
                }
                alt={product[0]?.name}
              />
            </div>
            <div className={classes.bigImage}>
              <img
                src={
                  product[0]?.img4?.startsWith("http")
                    ? product[0]?.img4
                    : API_URL + product[0]?.img4
                }
                alt={product[0]?.name}
              />
            </div>
            <div className={classes.description}>
              <p className={classes.name}>{product[0]?.name}</p>
              <p className={classes.price}>
                {(+product[0]?.price).toLocaleString("de-DE")} VND
              </p>
              <p className={classes.short_desc}>{product[0]?.short_desc}</p>
              <p className={classes.category}>
                <strong>
                  <i>CATEGORY: </i>
                </strong>
                {product[0]?.category}
              </p>
              <div className={classes.btn}>
                <div className={classes.quantity}>
                  QUANTITY
                  <div>
                    <p onClick={decrementHandle}>
                      <i className="fa fa-caret-up" aria-hidden="true"></i>
                    </p>
                    <input
                      type="number"
                      min="1"
                      ref={refQuantity}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                    <p onClick={incrementHandle}>
                      <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </p>
                  </div>
                </div>

                <button onClick={addToCartHandle}>Add to cart</button>
              </div>
            </div>
          </div>
          <div className={classes.more}>
            <div className={classes["more-desc"]}>
              <button>DESCRIPTION</button>
              <div className={classes.title}>PRODUCT DESCRIPTION</div>
              <div className={classes["long-desc"]}>
                {product[0]?.long_desc.split("\n").map((str, index) => (
                  <p key={index}>{str}</p>
                ))}
              </div>
            </div>
            <div className={classes["related-product"]}>
              <div className={classes["related-title"]}>RELATED PRODUCTS</div>
              <div className={classes["list-related"]}>
                {relatedProduct?.map((prod) => (
                  <div className={classes["wrap-product"]} key={prod._id}>
                    <Link to={`/detail/${prod._id}`}>
                      <img
                        src={
                          prod.img1.startsWith("http")
                            ? prod.img1
                            : API_URL + prod.img1
                        }
                        alt="related products"
                      />
                    </Link>
                    <div className={classes["related-name"]}>{prod.name}</div>
                    <div className={classes["related-price"]}>
                      {(+prod.price).toLocaleString("de-DE")} VND
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const loader = async ({ request, params }) => {
  const { productId } = params;
  const response = await fetchProductDetail(productId);
  // console.log(response);
  return response;
};

export default DetailPage;
