function knightMoves(coorStart, coorEnd) {
  if (!Array.isArray(coorStart) || !Array.isArray(coorEnd)) {
    throw Error;
  } else if (coorStart.length > 2 || coorEnd.length > 2) {
    throw Error;
  } else if (
    !Number.isInteger(coorStart[0]) ||
    !Number.isInteger(coorStart[1])
  ) {
    throw Error;
  } else if (!Number.isInteger(coorEnd[0]) || !Number.isInteger(coorEnd[1])) {
    throw Error;
  } else if (
    coorStart[0] < 0 ||
    coorStart[0] > 7 ||
    coorStart[1] < 0 ||
    coorStart[1] > 7
  ) {
    throw Error;
  } else if (
    coorEnd[0] < 0 ||
    coorEnd[0] > 7 ||
    coorEnd[1] < 0 ||
    coorEnd[1] > 7
  ) {
    throw Error;
  }

  function withinBoard(coor) {
    if (coor[0] < 0 || coor[0] > 7) {
      return false;
    }

    if (coor[1] < 0 || coor[1] > 7) {
      return false;
    }

    return true;
  }

  function possibleMoves(coor) {
    if (!Array.isArray(coor)) {
      throw Error;
    } else if (coor.length > 2) {
      throw Error;
    } else if (!Number.isInteger(coor[0]) || !Number.isInteger(coor[1])) {
      throw Error;
    } else if (coor[0] < 0 || coor[0] > 7 || coor[1] < 0 || coor[1] > 7) {
      throw Error;
    }

    const moves = [];
    if (withinBoard([coor[0] + 1, coor[1] + 2])) {
      moves.push([coor[0] + 1, coor[1] + 2]);
    }

    if (withinBoard([coor[0] + 2, coor[1] + 1])) {
      moves.push([coor[0] + 2, coor[1] + 1]);
    }

    if (withinBoard([coor[0] + 2, coor[1] - 1])) {
      moves.push([coor[0] + 2, coor[1] - 1]);
    }

    if (withinBoard([coor[0] + 1, coor[1] - 2])) {
      moves.push([coor[0] + 1, coor[1] - 2]);
    }

    if (withinBoard([coor[0] - 1, coor[1] - 2])) {
      moves.push([coor[0] - 1, coor[1] - 2]);
    }

    if (withinBoard([coor[0] - 2, coor[1] - 1])) {
      moves.push([coor[0] - 2, coor[1] - 1]);
    }

    if (withinBoard([coor[0] - 2, coor[1] + 1])) {
      moves.push([coor[0] - 2, coor[1] + 1]);
    }

    if (withinBoard([coor[0] - 1, coor[1] + 2])) {
      moves.push([coor[0] - 1, coor[1] + 2]);
    }

    return moves;
  }

  function printResult() {
    // console.log("bingo!");
  }

  const passedMoves = [];
  const visitedGameboard = [];
  for (let i = 0; i < 8; i++) {
    visitedGameboard.push([]);
  }

  const queue = [];

  function traverse(coor) {
    const nextMoves = possibleMoves(coor);

    if (nextMoves.includes(coorEnd)) {
      // print something...
    } else {
      // all the possible next move can't get to the destination

      // now queue is full of possible 1 layer next moves
      queue.push(...nextMoves);

      // I passed the parameter coor, its next moves doesn't have what we want,
      // so we dig into next level
      passedMoves.push(coor);
      visitedGameboard[coor[1]].push(coor[0]);

      // I need to first check if the children of next layer has our destination.
      for (let i = 0; i < nextMoves.length; i++) {
        if (possibleMoves(nextMoves[i]).includes(coorEnd)) {
          // second layer has the destination
          return true;
        } else {
          // second layer doesn't have it
        }
      }
      // use graph
    }
  }

  function traverse(coor) {
    const nextMoves = possibleMoves(coor);

    if (nextMoves.includes(coorEnd)) {
      // print something...
    } else {
      // all the possible next move can't get to the destination

      // now queue is full of possible 1 layer next moves
      queue.push(...nextMoves);

      // I passed the parameter coor, its next moves doesn't have what we want,
      // so we dig into next level
      passedMoves.push(coor);
      visitedGameboard[coor[1]].push(coor[0]);

      // I need to first check if the children of next layer has our destination.
      if (checkNextLayer(nextMoves)) {
        // print something
      } else {
        traverse(...queue);
      }
      // use graph
    }
  }

  function checkNextLayer(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (possibleMoves(arr[i]).includes(coorEnd)) {
        return true;
      }
    }
    return false;
  }

  const nextMoves = possibleMoves(coorStart);
  if (nextMoves.includes(coorEnd)) {
    //
  } else {
    nextMoves.forEach((c) => {
      if (possibleMoves(c).includes(coorEnd)) {
        //
      } else {
        passedMoves.push(c);
        visitedGameboard[c[1]].push(c[0]);
      }
    });
  }
  // possibleMoves(coorStart).forEach((coor) => {
  //   visitedGameboard[coor[1]].push(coor[0]);
  // });

  // while (!visitedGameboard[coorEnd[1]].includes(coorEnd[0])) {
  //   //
  //   for (let j = 0; j < visitedGameboard.length; j++) {
  //     for (let i = 0; i < visitedGameboard[j].length; i++) {
  //       //
  //       if (passedMoves.includes([i, j])) {
  //         continue;
  //       }

  //       possibleMoves([i, j]).forEach((coor) => {
  //         if (!passedMoves.includes(coor)) {
  //           visitedGameboard[coor[1]].push(coor[0]);
  //         }
  //       });

  //       passedMoves.push([i, j]);
  //     }
  //   }
  // }

  printResult();
}

knightMoves([0, 1], [0, 0]);
