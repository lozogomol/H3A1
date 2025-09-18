import React, { useState } from 'react'

interface SumFormProps{
    onSum: (result : number) => void
}

const SumForm: React.FC<SumFormProps> = ({onSum}) => {

    const [num1, setNum1] = useState<number>(0);
    const [num2, setNum2] = useState<number>(0);

    const handleSubmit= (e: React.FormEvent) => {
        e.preventDefault();
        const result = num1 + num2;
        onSum(result);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Numero 1: </label>
                <input type = "number"
                       value = {num1}
                       onChange = {(e) => setNum1(Number(e.target.value))}
                />
            </div>

            <div>
                <label>Numero 2: </label>
                <input type = "number"
                       value = {num2}
                       onChange = {(e) => setNum2(Number(e.target.value))}
                />
            </div>
            <button type = "submit"> Sumar </button>
        </form>
    );
};

export default SumForm