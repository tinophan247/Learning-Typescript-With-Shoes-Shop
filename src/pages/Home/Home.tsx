import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../../components/ProductCard/ProductCard';
import { DispatchType, RootState } from '../../redux/configStore';
import { getProductApi, ProductModel } from '../../redux/ProductReducer/productReducer';

type Props = {}

export default function Home({}: Props) {

  const {arrProduct} = useSelector((state:RootState) => state.productReducer);
  const dispatch:DispatchType = useDispatch();
  const getAllProductApi = () => {
    //Gọi api và đưa dữ liệu lên redux 
    const actionAsync = getProductApi();
    dispatch(actionAsync);
  }


  useEffect(()=>{
    //call api
    getAllProductApi();
  },[])

 
  return (
    <div className='container'>
        <h3>Product Feature</h3>
        <div className='row mb-2'>
          {arrProduct.map((prod:ProductModel,index:number)=>{
            return <div className='col-4 mt-2' key={index}>
              <ProductCard prod={prod}/>
            </div>
          })}
        </div>
    </div>
  )
}