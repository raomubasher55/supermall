import React from 'react'

export default function Company() {
    let Data = [
        {
            img:'../src/assets/amazon.png'
        },
        {
            img:'../src/assets/shopee.png'
        },
        {
            img:'../src/assets/shopify.png'
        },
        {
            img:'../src/assets/alibaba.png'
        },
        {
            img:'../src/assets/walmart.png'
        },
        {
            img:'../src/assets/lazada.png'
        },
        {
            img:'../src/assets/bukalapak.png'
        },
        {
            img:'../src/assets/orami.png'
        }
    ]
  return (
    <div className='container flex justify-between items-center flex-wrap'>
      
      {
        Data.map((item,index)=>{
            return(
                <div className="col-6 p-2 md:p-4" key={index}>
                    <img src={item.img} alt="img" className="w-[100%] rounded-lg" />
                </div>
            )
        })
      }

    </div>
  )
}
