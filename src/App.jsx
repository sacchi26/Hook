import { useState } from 'react'

import './App.css'
import { useEffect } from 'react'
import PostItem from './component/PostItem'

function App() {
  const [posts, setPosts] = useState([])
  const[isLoading,setIsLoading]=useState(false)
  const[errors,setErros]=useState(null)
  const [page,setPage]=useState(1)

  async function fetchData(){
    try{
      const data=await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`)
      const res=await data.json()

      setPosts(res)
    }catch(error){
      setErros(error)

    }

  }
  useEffect(()=>{
    fetchData()
  },[page])

  useEffect(()=>{
   console.log("this is a component",posts);
  },[posts])
  useEffect(()=>{
    console.log("page no",page);
  },[page])
  return (
    <>
    <PostItem posts={posts}/>
    <div>
      <button
      disabled={page==1 ? true:false}

      onClick={()=>{
      setPage(page-1);

      }}>Prev</button>
      <button
      disabled={page==10


         ? true:false}
       onClick={()=>{
        setPage(page+1);
       }}
        >next</button>
    </div>
    </>
  )
}

export default App;