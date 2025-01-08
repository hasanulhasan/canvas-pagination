import { useState } from "react"
import Image from "./component/Image"
import Table from "./component/Table"

function App() {
  const [state, setState] = useState(true);
  return (
    <div className='mx-auto max-w-4xl mt-4'>
      <div className="flex justify-between mb-4">
      <button onClick={()=> setState(true)} className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring">Task 1</button>
      <button  onClick={()=> setState(false)} className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring">Task 2</button>
      </div>
      {
        state ? <>
        <Table/>
        </> : <>
        <Image/>
        </>
      }
    </div>
  )
}

export default App
