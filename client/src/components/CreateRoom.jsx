import { useNavigate } from "react-router-dom"

export function CreateRoom() {

    const navigate = useNavigate();

    return(
        <div>
            <form className="flex flex-col items-center mt-28" onSubmit={() => navigate('/startgame')}>
                <input className="mb-3 border-solid border-2 border-black" type="text" name="name" id="name" placeholder="Name"/>
                <input className="border-solid border-2 border-black mb-4" type="text" name="code" id="code" placeholder="Room Name" />
                <button className="bg-blue-300 px-2" type="submit">Create</button>
            </form>
        </div>
    )
}

