import { useContext } from "react";
// Use ./ to look in the same folder instead of ../
import MyContext from "./MyContext"; 

function Child() {
    const { name, setName } = useContext(MyContext);
    
    return (
        <div>
            <h1>Child Component</h1>
            <p>Name: {name}</p>
            <button onClick={() => setName('Pedro')}>Change Name</button>
        </div>
    );
}

export default Child;