import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setPage } from '../redux/productsSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const{ ITEMS, STATE, error, page, totalPages, perPage} = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts({ page, perPage}));
  }, [page, perPage, dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const shimmerLoading = () => {
    return new Array(10).fill(null).map((_, index) => {
      <div key={index} className='shimmer-item flex flex-col gap-4 p-4 bg-gray-200 rounded-lg'>
        <div className='shimmer-image w-full h-48 bg-gray-300 rounded-md animate-pulse'></div>
      </div>
    })
  }

  if(STATE === 'PENDING') {
    return(
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
          <div className='product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {shimmerLoading()}
          </div>
        </div>
      </div>
    )
  }
  if(STATE === 'FAILIURE') {
    return(
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Error</h1>
         <p className="text-xl text-red-500">{error}</p>
        </div>
      </div>
    )
  }
  return (
      <div className= "min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-6">
            {ITEMS.map((item) => (
              <div key={item.id}
               className='bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-80 h-96 flex flex-col items-center'>
                <img src={item.thumbnail} alt={item.name} className='w-full h-48 object-cover rounded-md' />
                <br></br>
                <br></br>
                <br></br>
                <h2 className='text-xl font-semibold text-gray-800'>{item.title}</h2>
                <h3 className='text-gray-600'>${item.price}</h3>
              </div>
            ))}
          </div>
          <div className='pagination flex justify-center items-center gap-4 mt-6'>
            <button onClick={() => handlePageChange(page > 1 ? page -1 : 1)}
            disabled = {page === 1}
            className='px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300'
              >
                Previous
              </button>
            <span className='text=lg'>Page {page} of {totalPages}</span>

            <button onClick={() => handlePageChange(page < totalPages ? page + 1 : totalPages)}
            disabled = {page === totalPages}
            className='px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300'
            >
              Next
            </button>

          </div>
        </div>
      </div>
  )
}


