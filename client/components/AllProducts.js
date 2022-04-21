import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default AllProducts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProducts());
  }, []);
    let { products } = useSelector((state) => state.products);
  return (

  )
}
