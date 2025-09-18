import React from "react";

interface ResultProps{
    value: number;
}
const Result: React.FC<ResultProps> = ({value}) => {
    return (
        <div>
            <h2>
                Resultado : {value}
            </h2>
        </div>
    )
}

export default Result;

