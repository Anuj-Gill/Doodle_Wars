import { useNavigate } from "react-router-dom"

export function StartGame() {

    const navigate = useNavigate();

    return(
        <div>
            Players: 
            <button onClick={() => navigate('/battlearena')}>Start Game</button>
        </div>
    )
}