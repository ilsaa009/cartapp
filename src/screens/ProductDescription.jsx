import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import Stars from "../components/Stars";
import Reviews from "../components/Reviews";
import { addtoCart } from "../redux/cartSlice";

export const ProductDescription = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { ITEMS: cartItems } = useSelector((state) => state.cart);

  const {
    data: currentProduct,
    isLoading,
    isError,
    error,
  } = useQuery(
    ["product", productId],
    async () => {
      const response = await axios.get(
        `https://dummyjson.com/products/${productId}`
      );
      return response.data;
    },
    {
      enabled: !!productId, 
    }
  );

  useEffect(() => {
    console.log("Cart items:", cartItems);
  }, [cartItems]);

  const handleAddToCart = () => {
    if (currentProduct && !isProductInCart(currentProduct.id)) {
      const { id, title, price } = currentProduct;
      dispatch(addtoCart({ id, title, price }));
    }
  };

  const isProductInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const getRatingDistribution = (reviews) => {
    const distribution = [0, 0, 0, 0, 0];
    if (reviews) {
      reviews.forEach((review) => {
        if (review.rating >= 1 && review.rating <= 5) {
          distribution[review.rating - 1] += 1;
        }
      });
    }
    return distribution.reverse();
  };

  return (
    <div className="product-description-page px-6 py-4">
      <button
        onClick={() => navigate(-1)}
        className="back-button bg-gray-300 px-4 py-2 rounded-md mb-4"
      >
        Back
      </button>

      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">Error: {error.message}</p>}

      {currentProduct && (
        <>
          <div className="flex gap-6">
          <div className="product-images w-1/3">
            <div
              className="main-image bg-gray-100 h-80 mb-4"
              style={{ backgroundImage: `url(${currentProduct.thumbnail})` }}
            >
            </div>
          </div>

            <div className="product-details w-2/3">
              <div className="product-description bg-gray-100 p-4 mb-4">
                <p>{currentProduct.description}</p>
              </div>
              <div className="product-description bg-gray-100 p-4 mb-4">
                <p>Brand: {currentProduct.brand}</p>
                <p>Stock: {currentProduct.stock}</p>
                <p>Warranty: {currentProduct.warrantyInformation}</p>
                <p>Shipping: {currentProduct.shippingInformation}</p>
                <p>Category: {currentProduct.category}</p>
                <p>Availability: {currentProduct.availabilityStatus}</p>
                <p>Return Policy: {currentProduct.returnPolicy}</p>
                <p>Minimum Orders: {currentProduct.minimumOrderQuantity}</p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isProductInCart(currentProduct.id)}
                className={`mt-4 py-2 px-4 rounded-md ${
                  isProductInCart(currentProduct.id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                {isProductInCart(currentProduct.id) ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="ratings-overview bg-gray-100 p-6 rounded-lg">
            <div className="flex items-center gap-6">
              <div className="average-rating text-center">
                <h2 className="text-4xl font-bold">
                  {calculateAverageRating(currentProduct.reviews)}/5
                </h2>
                <Stars
                  rating={Math.round(calculateAverageRating(currentProduct.reviews))}
                />
                <p className="text-gray-600">
                  {currentProduct.reviews?.length || 0} ⭐ Ratings
                </p>
              </div>

              <div className="rating-distribution w-full">
                {getRatingDistribution(currentProduct.reviews).map((count, index) => (
                  <div key={5 - index} className="flex items-center mb-2">
                    <span className="text-sm font-medium w-10 text-right">
                      {5 - index} ⭐
                    </span>
                    <div className="w-full bg-gray-300 h-2 mx-2 rounded">
                      <div
                        className="bg-yellow-500 h-2 rounded"
                        style={{
                          width: `${(count / currentProduct.reviews.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
            <Reviews reviews={currentProduct.reviews} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDescription;
