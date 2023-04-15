import { useRouter } from 'next/router'
import React from 'react'

const pokemon = () => {
  const router=useRouter();
  // console.log(router.query.id);
  
  return (
    <div>index</div>
  )
}

export default pokemon