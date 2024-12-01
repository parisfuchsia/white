import List from './list.tsx';
import { TbCategoryMinus } from "react-icons/tb";
import { useState } from 'react';
import fuchsia from '../../../fuchsia.svg';
import { fetchProducts } from '../../state/slice';
import { useDispatch } from 'react-redux';
import { FaFacebookSquare } from "react-icons/fa";

const categories = [
  {
    title: "Fashion",
    children: [
      { title: "Men's Shirts", categoryKey: "mens-shirts" },
      { title: "Men's Shoes", categoryKey: "mens-shoes" },
      { title: "Men's Watches", categoryKey: "mens-watches" },
      { title: "Women's Bags", categoryKey: "womens-bags" },
      { title: "Women's Dresses", categoryKey: "womens-dresses" },
      { title: "Women's Jewellery", categoryKey: "womens-jewellery" },
      { title: "Women's Shoes", categoryKey: "womens-shoes" },
      { title: "Women's Watches", categoryKey: "womens-watches" }
    ]
  },
  {
    title: "Electronics",
    children: [
      { title: "Laptops", categoryKey: "laptops" },
      { title: "Smartphones", categoryKey: "smartphones" },
      { title: "Tablets", categoryKey: "tablets" },
      { title: "Mobile Accessories", categoryKey: "mobile-accessories" }
    ]
  },
  {
    title: "Home & Kitchen",
    children: [
      { title: "Furniture", categoryKey: "furniture" },
      { title: "Home Decoration", categoryKey: "home-decoration" },
      { title: "Kitchen Accessories", categoryKey: "kitchen-accessories" }
    ]
  },
  {
    title: "Beauty & Personal Care",
    children: [
      { title: "Beauty", categoryKey: "beauty" },
      { title: "Fragrances", categoryKey: "fragrances" },
      { title: "Skin Care", categoryKey: "skin-care" }
    ]
  },
  {
    title: "Sports & Outdoors",
    children: [
      { title: "Sports Accessories", categoryKey: "sports-accessories" },
      { title: "Sunglasses", categoryKey: "sunglasses" }
    ]
  },
  {
    title: "Vehicles",
    children: [
      { title: "Motorcycle", categoryKey: "motorcycle" },
      { title: "Vehicle", categoryKey: "vehicle" }
    ]
  },
  {
    title: "Grocery",
    children: [
      { title: "Groceries", categoryKey: "groceries" }
    ]
  }
];


export default function Sidebar({onClose}){
  
  const dispatch = useDispatch();
  
  const fetchAll = async() => {
    await dispatch(fetchProducts(0));
  }

  return <div className = 'bg-black/0 inset-0 fixed z-20 '>
    <div className = 'fixed inset-y-0 h-screen z-20 bg-white px-10 py-10 shadow-lg w-[280px] left-0'>
   <div className = 'flex justify-between items-center mb-5'> 

   <div className = 'size-14'><img className  = 'w-full h-full object-cover'src = {fuchsia} /></div>
  
   <TbCategoryMinus onClick = {onClose} className = 'size-8'/>
   </div>
   <button onClick = {fetchAll} className = 'my-5 text-lg'>All products</button>
   <div className = 'overflow-y-auto h-[50vh]'>
    <List list = {categories}/>
    </div>
    <div className = 'absolute left-[40px] bottom-10 flex gap-2 w-8/12 items-center bg-white z-50'>
<a className = 'size-40'href = 'https://www.facebook.com/a.hopelieswithin?mibextid=ZbWKwL'>
        <FaFacebookSquare className = 'w-full h-full opacity-80'/>
</a>
      <div>
              <p className = '  opacity-50 text-xs'>This website is made only for practice. This is not capable to do of any transactions.
          <span className = 'block mt-2'>12/01/24           ©Paris</span>
          </p>
          </div>
          </div>
  </div>
  </div>
  
}