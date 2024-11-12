import React, { useCallback, useEffect, useState } from 'react'
import './stickCircket.css'

const StickCircket = () => {
    const [selectedValue, setSelectedValue] = useState(null)
    const [computerScore, setComputerScore] = useState(0)
    const [playerScore, setPlayerScore] = useState(0)
    const [message, setMessage] = useState('')
    const [wicket, setWicket] = useState(false)
    const [gameOver, setGameOver] = useState(false);
    const [disableButtons, setDisableButtons] = useState(false);    

    const handleScore = (e) => {
        if (gameOver) return;
        const computerValue = Math.floor(Math.random() * 6 + 1)
        if (computerValue == selectedValue) {
            setWicket(true)
        } else {
            setPlayerScore(prevScore => prevScore + e)
        }
    }

    useEffect(() => {
        setComputerScore(Math.floor(Math.random() * 90) + 10)
    }, [])

    useEffect(() => {
        if (wicket) {
            setDisableButtons(true);
            setTimeout(() => {
                setMessage('./lose.webp');
                setGameOver(true);
            }, 3000); 
        }
    }, [wicket]);


    useEffect(() => {
        if (wicket) {
            if (computerScore == playerScore) {
                setMessage('./tie.gif')
            } else if (computerScore > playerScore) {
                setMessage('./lose.webp')
            }
        } else if (computerScore < playerScore) {
            setMessage('./win.webp')
            setDisableButtons(true);

        }
    }, [playerScore])

    return (
        <div className='main-content'>

            <div className='score-board'>
                <div className='score-card'>
                    Computer Score : {computerScore}
                </div>
                <div className='score-card'>
                    Target Score : {computerScore + 1}
                </div>
                <div className='score-card'>
                    Your Score : {playerScore}
                </div>
            </div>
            <div className='score-message'>
                {
                    message === '' ? (
                        <>
                            {!wicket &&
                            <>
                                {selectedValue == null && <img src='./start.webp'></img>}
                                {selectedValue == 1 && (playerScore > 0 || computerScore > 0) && <img src='./one.webp'></img>}
                                {selectedValue == 2 && (playerScore > 0 || computerScore > 0) && <img src='./two.webp'></img>}
                                {selectedValue == 3 && (playerScore > 0 || computerScore > 0) && <img src='./three.webp'></img>}
                                {selectedValue == 4 && (playerScore > 0 || computerScore > 0) && <img src='./four.webp'></img>}
                                {selectedValue == 5 && (playerScore > 0 || computerScore > 0) && <img src='./five.webp'></img>}
                                {selectedValue == 6 && (playerScore > 0 || computerScore > 0) && <img src='./six.webp'></img>}
                            </>}
                            {wicket && <img src={!message?`./out.webp`:message}></img>}
                        </>
                    ) : (
                        <img src={message}></img>
                    )
                }
            </div>

            <div className='score-buttons'>
                {[1,2,3,4,5,6].map((e,i) => {
                 return  ( 
                <button key={i} className='score-button' onClick={() => {setSelectedValue(e);handleScore(e)}} disabled={disableButtons}>
                    {e}
                </button>)
                })
                }
            </div>
            <div style={{margin:'16px'}} onClick={()=>window.location.reload()} >  
                <button className='score-button' disabled={!disableButtons}>
                    Restart
                </button>
            </div>

        </div>
    )
}

export default StickCircket
