import React from 'react';
import rupee from "../../../public/assets/images/rupee.png"
import Image from 'next/image';
import bankicon from "../../../public/assets/images/bank.svg"

const Wallet: React.FC = () => {
  return (
    <div className='flex justify-between flex-wrap'>
    <div className='w-[48%] max-lg:w-[100%]'>
        <div className='border-solid border-2 border-black-500 text-black w-[100%] p-5 rounded-[12px] mb-[10px]'>
            <h3 className='text-center text-[22px] mb-[20px] font-semibold'>My wallet</h3>
            <div className='flex justify-center	items-center'>
                <div className='mr-2  mb-[20px] w-[54px]'>
                    <Image src={rupee} alt='rupeeIcon' className='block size-full'/>
                </div>
                <span className='block text-[40px] mb-[20px] font-bold'>115000</span>
            </div>
            <p className='text-center font-normal'>Purchase product from wallet</p>
        </div>
        <button className='w-[100%] bg-[#212121] p-[10px] rounded-[8px] text-[#fff] font-semibold mb-[12px]'>withdrawal</button> 
    </div>
    <div className='w-[48%] max-lg:w-[100%]'>
        <h4 className='mb-[16px] text-[18px] font-semibold text-[#000]'>Transaction</h4>
        <div className='flex justify-between items-center mb-[16px] flex-wrap'>
            <div>
                <span className='block text-[#000] font-semibold'>17 jan '24</span>
                <p className='text-[14px]'>upi/57646/payment from wazeer</p>
            </div>
            <div className='flex items-end'>
                <p className='mr-[5px] text-[#000] text-[18px]'>
                    150
                </p>
                <span className='text-[11px] text-[#21aa77]'>Dr</span>
            </div>
        </div>
        <div className='flex justify-between items-center'>
            <div>
                <span className='block text-[#000] font-semibold'>20 jan '24</span>
                <p className='text-[14px]'>upi/57646/payment from wazeer</p>
            </div>
            <div className='flex items-end'>
                <p className='mr-[5px] text-[#000] text-[18px]'>
                    200
                </p>
                <span className='text-[11px] text-[red]'>Cr</span>
            </div>
        </div>
    </div>
</div>
  );
};

export default Wallet;