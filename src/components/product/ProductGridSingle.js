import React, { Fragment, useState, useEffect  } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import { addToWishlist } from "../../store/slices/wishlist-slice";

const ProductGridSingle = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass
}) => {
  const [modalShow, setModalShow] = useState(false);
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);
  const dispatch = useDispatch();
  const apiUrl = 'https://okazy-production.up.railway.app/annonces/valides';
  const token = localStorage.getItem('token');

  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      try {
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) {
          throw new Error('La requête a échoué.');
        }
        const data = await response.json();
        setAnnonces(data.data); 
      } catch (error) {
        console.error('Erreur lors de la requête à l\'API:', error);
      }
    };

    fetchData(); 
  }, [apiUrl, token, setAnnonces]);
  useEffect(() => {
    console.log("aaa", annonces);
  }, [annonces]);
  return (
    <Fragment>
      {annonces.map((annonce, index) => (
      <div className={clsx("product-wrap", spaceBottomClass)} key={index}>
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/product/" + annonce.id}>
          {annonce && annonce.image && annonce.image[0] && (
            <img
              className="default-img"
              src={annonce.description}
              alt={annonce.description}
            />
            )}
              <img
                className="hover-img"
                src={annonce.description}
                alt={annonce.description}
              />
            
          </Link>
          {/* {product.discount || product.new ? (
            <div className="product-img-badges">
              {product.discount ? (
                <span className="pink">-{product.discount}%</span>
              ) : (
                ""
              )}
              {product.new ? <span className="purple">New</span> : ""}
            </div>
          ) : (
            ""
          )} */}

          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
              <button
                className={wishlistItem }
                // disabled={wishlistItem }
                title={"Ajouter au favoris"}
                onClick={() => dispatch(addToWishlist(product))}
              >
                <i className="pe-7s-like" />  
              </button>
            </div>
            <div className="pro-same-action pro-cart">
                <Link to={`${process.env.PUBLIC_URL}/product/${annonce.id}`}>
                  Interreser
                </Link>
            </div>
            {/* <div className="pro-same-action pro-quickview">
              <button title="Quick View" onClick={() => setModalShow(true)}>
                <i className="pe-7s-look" />
              </button>
            </div> */}
          </div>
        </div>
        
        <div className="product-content text-center">
          <h3>
          <Link to={process.env.PUBLIC_URL + "/product/" + annonce.id}>
            {annonce.voiture && annonce.voiture.model && annonce.voiture.model.nom ? (
              annonce.voiture.model.nom
            ) : (
              "Nom du modèle non disponible"
            )}
          </Link>
          </h3>
          {/* {product.rating && product.rating > 0 ? (
            <div className="product-rating">
              <Rating ratingValue={product.rating} />
            </div>
          ) : (
            ""
          )} */}
          <div className="product-price">
                <span className="old">
                  {annonce.prix}
                </span>
          </div>
        </div>
      </div>
      ))}
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedPrice={discountedPrice}
        finalProductPrice={finalProductPrice}
        finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      />
    </Fragment>
  );
};

ProductGridSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridSingle;
