import React, { useRef, useState } from "react";
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/close.png';

const TicTacToe = () => {
    const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);

    const toggle = (index) => {
        if (lock || data[index] !== "") return;

        const newData = [...data];
        newData[index] = count % 2 === 0 ? "x" : "o";
        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Congratulations: <img src="${winner === "x" ? cross_icon : circle_icon}" alt="${winner}" />`;
    };

    const checkWin = (newData) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
                won(newData[a]);
                return;
            }
        }
    };

    const reset = () => {
        setLock(false);
        setData(["", "", "", "", "", "", "", "", ""]);
        setCount(0);
        titleRef.current.innerHTML = 'Tic Tac Toe in <span>React</span>';
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}> Tic Tac Toe Game In <span>React</span> </h1>
            <div className="board">
                {data.map((value, index) => (
                    <div className="boxes" key={index} onClick={() => toggle(index)}>
                        {value && <img src={value === "x" ? cross_icon : circle_icon} alt={value} />}
                    </div>
                ))}
            </div>
            <div className="reset-container">
                <button className="reset" onClick={reset}>Reset</button>
            </div>
        </div>
    );
};

export default TicTacToe;
