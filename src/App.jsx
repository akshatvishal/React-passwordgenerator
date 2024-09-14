import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [Charallowed, setcharacterAllowed] = useState(false)
  const [password, setpassword] = useState("")
  const passwordref=useRef(null)
  const copypasswordtoclipboard= useCallback(()=>{
    window.navigator.clipboard.writeText(password)
  },[password])
const passwordgenerator=useCallback(()=>{
  let pass=""
let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if(numberAllowed) str+="0123456789"
if(Charallowed) str+="!@#$%^&*(){}[]"
for (let i = 0; i < length; i++) {
  let char=Math.floor(Math.random()*str.length+1)  
  pass +=str.charAt(char);
}
setpassword(pass)
},[length,numberAllowed,Charallowed,setpassword])

useEffect(()=>{passwordgenerator()},[length,numberAllowed,Charallowed,passwordgenerator])
  return (
    <>
     <div className=' w-full max-w-md text-orange-500 mx-auto bg-gray-700 text-center m-8 p-2 rounded-xl shadow-md'><h1 className=' text-white mb-2'>Password generator</h1>
     <div className=' flex shadow rounded-lg overflow-hidden mb-2'>
      <input type="text"
      value={password} 
      className=' outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
      ref={passwordref}
      />
      <button
      onClick={copypasswordtoclipboard} 
      className='outline-none bg-blue-700 text-white px-5 py-0.5'>
        copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
         min={8}
         max={100}
         value={length}
         className=' cursor-pointer'
         onChange={(e)=>{setLength(e.target.value)}}
         />
         <label>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={numberAllowed}
        id='numberInput'
        onChange={()=>{
          setNumberAllowed((prev)=>!prev)
        }} />
         <label htmlFor='numberInput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
      <input type="checkbox"
        defaultChecked={Charallowed}
        id='characterInput'
        onChange={()=>{
          setcharacterAllowed((prev)=>!prev)
        }} />
         <label htmlFor='characterInput'>Characters</label>
      </div>
     </div>
     </div>
    </>
  )
}

export default App
