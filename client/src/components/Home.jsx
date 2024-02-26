import { useNavigate } from "react-router-dom"

export function Home() {

  const navigate = useNavigate(); 



    return(
        <div className="text-center ">
          <div className="">
            <h1 className="text-3xl mb-20">Doodle Wars</h1>
          </div>
          <div className="flex justify-center items-center ">
              <button className="mr-6 p-2 bg-pink-300" onClick={() => navigate('/createroom')}>Create</button>
              <button className=" p-2 bg-pink-300" onClick={() => navigate('/joinroom')}>Join</button>
          </div>
        </div>
    )
}