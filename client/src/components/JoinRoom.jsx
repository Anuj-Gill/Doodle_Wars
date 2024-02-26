import { useNavigate } from "react-router-dom"

export function JoinRoom() {

    const navigate = useNavigate(); 

    return(
        <div className="mt-28">
            <form className="flex flex-col items-center mt-28" onSubmit={() => navigate('/wait')}>
                <input className="mb-3 border-solid border-2 border-black" type="text" name="name" id="name" placeholder="Name"/>
                <input className="border-solid border-2 border-black mb-4" type="text" name="code" id="code" placeholder="Room Code" />
                <button className="bg-blue-300 px-2" type="submit">Join</button>
            </form>
        </div>
    )
}