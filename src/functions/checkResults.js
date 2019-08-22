export const checkingResult = (player) => {
    let winningCombos = [['A0','A1','A2'], ['B0','B1','B2'], ['C0','C1','C2'], ['A0','B0','C0'], ['A1','B1','C1'], ['A2','B2','C2'], ['A0','B1','C2'], ['C0','B1','A2']];

    for(let i=0; i < winningCombos.length; i++) {
        let points = 0
        player.historyMoves.forEach(turnMoveCode => {
            if(winningCombos[i].indexOf(turnMoveCode) >= 0 && player.historyMoves.length > 2) {
                points += 1
            }
        })
        if(points < 3) {points = 0;}
        if(points === 3) {return true;}
    }
}