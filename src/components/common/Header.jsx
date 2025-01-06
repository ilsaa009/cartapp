import React, { useState } from 'react'
import LogoImg from "../../assets/common/logo.png"
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'
import { Badges, CustomLink } from './Custom'
import Drawer from 'react-modern-drawer'
import { FaRegHeart } from 'react-icons/fa'
import 'react-modern-drawer/dist/index.css';


const Header = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const items = [
    'Makeup',
    'Food',
    'Fruits',
    'Vegetables',
    'Juice',
    'Furniture',
  ]

  const toggleCartDrawer = () => {
    setIsCartVisible((prevState) => !prevState);
  }
  const toggleSearchBar = () => {
    setIsSearchVisible((prevState) => !prevState);
    setSearchResult([]);
  }
  const handleSearch = () => {
   if(searchQuery.trim() === '') {
    setSearchResult([]);
    return;
   }
   const results = items.filter((item) => 
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setSearchResult(results);
  }
  return (
    <>
    <header className='header px-12 py-3 bg-white-100 relative z-20'>
     
      <nav className='p-4 flex justify-between items-centre relative'>
        <div className='flex items-centre gap-14'>
          <div>
            <img src={LogoImg} alt="LogoImg" className='h-7' />
          </div>
          <ul className="flex space-x-8 text-gray-600">
          <li>
            <a href="#" className="hover:text-blue-500">HOME</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">SHOP</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">BLOG</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">ABOUT</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">SERVICES</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">CONTACT</a>
          </li>
        </ul>
        </div>
        <div className='flex items-center gap-8'>
            <div className='uppercase hidden lg:block text-inherit'>
              <CustomLink>Login</CustomLink>
              <span>/</span>
              <CustomLink>Register</CustomLink>
            </div>

            <div className='flex items-center gap-6'>
              <IoSearchOutline size={23} onClick={toggleSearchBar} className='cursor-pointer'/>
              <FaRegHeart size={23}/>
              <div className='relative'>
                <IoCartOutline size={23} onClick={toggleCartDrawer} />
                <div className='absolute -top-2 -right-1.5'>
                  <Badges color='bg-primary-green'>0</Badges>
                </div>
              </div>
              
            </div>
          </div>
      </nav>
    </header>
    {isSearchVisible && (
        <div className="absolute top-0 left-0 w-full bg-white shadow-md p-4 z-30">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Search
            </button>
            <button
              onClick={toggleSearchBar}
              className="text-gray-500 text-xl"
            >
              &times;
            </button>
          </div>
          <div className="mt-4">
            {searchResult.length > 0 ? (
              <ul className="space-y-2">
                {searchResult.map((result, index) => (
                  <li key={index} className="border-b py-2">
                    {result}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No results found</p>
            )}
          </div>
        </div>
      )}

    <Drawer
    open = {isCartVisible}
    onClose={toggleCartDrawer}
    direction='right'
    size= "400px"
    >
      <div className='p-4 flex flex-col h-full'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold'>YOUR CART</h2>
          <button className='text-gray-500 text-xl' onClick={toggleCartDrawer}>
            &times;
          </button>
        </div>
        <div className='cart-items flex-grow'>
          <p>No Items</p>
        </div>
        <div className='mt-6'>
          <button className='bg-blue-500 text-white py-2 px-4 rounded-md w-full'>
            Go to Checkout
          </button>
        </div>
      </div>
    </Drawer>
    </>
 
  )
}

export default Header;
