"use client"
import React, { useState, useRef} from 'react'
import LoadingBar from 'react-top-loading-bar';
import { Progress } from '@/components/ui/progress';
import loadicon from "../../../../public/loadingAnimationMem.svg";
import Image from 'next/image';
const Loading = ({fileSize}:{fileSize:number}) => {
    const percentage = Math.floor((fileSize / 90) * 100)
    const [progress, setProgress] = useState(0);
    const loadingBar = useRef(null);
  return (
    <div className='flex gap-10 p-8 items-center h-full justify-center relative bg-jas-grey_light rounded-[2rem]'>
      <div className='flex justify-center flex-1 flex-col items-center gap-8 relative w-full h-full'>
      <Image alt="" src={loadicon} className='w-80 h-40' />
            <h1 className='text-4xl font-extrabold w-full text-center'>Loading your scan data...</h1>

            <Progress value={30} className='text-white bg-[#D3D8DC]' style={{color: 'rgb(0 148 255)', width:'500px', height:'30px'}} />
            <p className='text-cl font-bold text-jas-grey'>{percentage}% uploaded  |  {fileSize}/90mb</p>
      </div>
    </div>
  )
}

export default Loading
