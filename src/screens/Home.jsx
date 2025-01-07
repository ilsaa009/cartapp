import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setPage } from "../redux/productsSlice";
import { addtoCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

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
      <div className="w-full h-96 bg-white rounded-lg shadow-lg flex flex-col items-center p-4">
        <div className="w-full h-48 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="mt-4 w-3/4 h-6 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="mt-2 w-1/2 h-6 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
    );
  };
  
  
  if (STATE === "PENDING") {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
          <div className="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg h-96 flex flex-col items-center p-4">
               {shimmerLoading()}
              </div>
            ))}
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
              style={{ cursor: "pointer" }} 
            >
              {STATE === "PENDING" || hoveredProduct === item.id ? (
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
              <br></br>
              <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
              <h3 className="text-gray-600">${item.price}</h3>
            </div>
          ))}
        </div>
        <div className="pagination flex justify-center items-center gap-2 mt-6">
  <button
    onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
    disabled={page === 1}
    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
  >
    &lt;
  </button>

  {Array.from({ length: totalPages }).map((_, index) => {
    const pageNumber = index + 1;

    if (
      pageNumber === 1 ||
      pageNumber === totalPages ||
      (pageNumber >= page - 1 && pageNumber <= page + 1)
    ) {
      return (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`px-3 py-2 rounded-md ${
            page === pageNumber
              ? "bg-blue-700 text-white"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {pageNumber}
        </button>
      );
    } else if (
      (pageNumber === page - 2 && page > 3) ||
      (pageNumber === page + 2 && page < totalPages - 2)
    ) {
      return (
        <span key={pageNumber} className="px-3 py-2">
          ...
        </span>
      );
    }

    return null;
  })}

  <button
    onClick={() =>
      handlePageChange(page < totalPages ? page + 1 : totalPages)
    }
    disabled={page === totalPages}
    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
  >
    &gt;
  </button>
  <br></br>
  <br></br>
  <br></br>
</div>


      </div>
    </div>
  );
};
