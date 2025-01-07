import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { fetchProductById } from "../redux/productsSlice";
import Stars from "../components/Stars";
import Reviews from "../components/Reviews";
import { addtoCart } from "../redux/cartSlice";

export const ProductDescription = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { STATE, currentProduct, error } = useSelector((state) => state.products);

  const handleAddToCart = () => {
    if (currentProduct) {
      const { id, title, price } = currentProduct;
      dispatch(addtoCart({ id, title, price }));
    }
  }

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

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

      {STATE === 'PENDING' && <p>Loading...</p>}
      {STATE === 'FAILIURE' && <p className="text-red-500">Error: {error}</p>}

      {STATE === 'SUCCESS' && currentProduct && (
        <>
          <div className="flex gap-6">
            <div className="product-images w-1/3">
              <div
                className="main-image bg-gray-100 h-60 mb-4"
                style={{ backgroundImage: `url(${currentProduct.thumbnail})` }}
              ></div>
            </div>
            <div className="product-details w-2/3">
              <div className="product-description bg-gray-100 p-4 mb-4">
                <p>{currentProduct.description}</p>
              </div>
              <button
            onClick={handleAddToCart}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add to Cart
          </button>
            </div>
          </div>
         
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
                  {currentProduct.reviews?.length || 0} Ratings
                </p>
              </div>

              <div className="rating-distribution w-full">
                {getRatingDistribution(currentProduct.reviews).map((count, index) => (
                  <div key={5 - index} className="flex items-center mb-2">
                    <span className="text-sm font-medium w-10 text-right">
                      {5 - index} star
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
