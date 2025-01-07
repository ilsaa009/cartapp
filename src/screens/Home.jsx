import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setPage } from "../redux/productsSlice";
import { addtoCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { ITEMS, STATE, error, page, totalPages, perPage } = useSelector((state) => state.products);
  
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts({ page, perPage }));
  }, [page, perPage, dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleAddToCart = (item) => {
    dispatch(addtoCart(item));
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); 
  };

  const shimmerLoading = () => {
    return (
      <div className="w-full h-48 bg-gray-300 rounded-md animate-pulse"></div>
    );
  };

  const handleMouseEnter = (id) => {
    setHoveredProduct(id);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };
  
  

  if (STATE === "PENDING") {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
          <div className="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shimmerLoading}
          </div>
        </div>
      </div>
    );
  }

  if (STATE === "FAILURE") {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Error</h1>
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-6">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-80 h-96 flex flex-col items-center"
              onClick={() => handleProductClick(item.id)} 
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: "pointer" }} 
            >
               {hoveredProduct === item.id ? (
                shimmerLoading()
              ) : (
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
              <br></br>
              <br></br>
              <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
              <h3 className="text-gray-600">${item.price}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleAddToCart({ id: item.id, title: item.title, price: item.price });
                }}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div className="pagination flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="text-lg">Page {page} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(page < totalPages ? page + 1 : totalPages)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
