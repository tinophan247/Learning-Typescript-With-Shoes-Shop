import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard/ProductCard'
import { DispatchType, RootState } from '../../redux/configStore'
import { getProductDetailApi, ProductDetailModel, RelatedProduct } from '../../redux/ProductReducer/productReducer'

type Props = {

}

export default function Detail({ }: Props) {
  const { productDetail } = useSelector((state: RootState) => state.productReducer);
  const dispatch:DispatchType = useDispatch();
  const params = useParams();

  const getProductByIdApi = () => {
      //B1: Lấy param từ url 
      const id:string | undefined = params.id;
      //B2: Dispatch thunk
      const actionThunk = getProductDetailApi(id as string);
      dispatch(actionThunk);
  }


  useEffect(()=>{
    //call api
    getProductByIdApi();
  },[params.id])

  return (
    <div className='container'>
      {/* <h3>Product name</h3> */}
      <div className='row mt-2'>
        <div className='col-4'>
          <img src={productDetail?.image} alt='...' height={350} width={350} style={{ objectFit: 'cover' }} />
        </div>
        <div className='col-8'>
          <h3>{productDetail?.name}</h3>
          <p>{productDetail?.description}</p>
        </div>
      </div>
      <h3 className='mt-2 text-center'>-Realate Product -</h3>
      <div className='row'>
        {productDetail?.relatedProducts.map((prod: RelatedProduct, index: number) => {
          return <div className='col-4'>
            <ProductCard prod={prod} />
          </div>

        })}
      </div>
    </div>
  )
}