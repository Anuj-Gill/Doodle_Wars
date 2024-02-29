import { useState } from "react"


export function Score({socket}) {
    const [usersScore, setUsersScore] = useState([]);
    socket.on('scores',(userName, points) => {
        const finalScore = `${userName}: ${points}`
        setUsersScore(...usersScore, finalScore);
        console.log();
    })

    console.log(usersScore);
    return(
        <div>
            {usersScore.map((p, i) => {
                return(
                    <div key={i}>{p}</div>
                )
            })}
        </div>
    )
}