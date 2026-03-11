function knightMoves(coorStart, coorEnd) {
  // validate the input coordinates
  if (!Array.isArray(coorStart) || !Array.isArray(coorEnd)) {
    throw Error;
  } else if (coorStart.length !== 2 || coorEnd.length !== 2) {
    throw Error;
  } else if (
    !Number.isInteger(coorStart[0]) ||
    !Number.isInteger(coorStart[1])
  ) {
    throw Error;
  } else if (!Number.isInteger(coorEnd[0]) || !Number.isInteger(coorEnd[1])) {
    throw Error;
  } else if (!withinBoard(coorStart)) {
    throw Error;
  } else if (!withinBoard(coorEnd)) {
    throw Error;
  }

  // if the input are the same, output
  if (coorStart[0] === coorEnd[0] && coorStart[1] === coorEnd[1]) {
    printResult();
    return;
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

  // return an array of all the possible next moves
  function possibleMoves(coor) {
    if (!Array.isArray(coor)) {
      throw Error;
    } else if (coor.length !== 2) {
      throw Error;
    } else if (!Number.isInteger(coor[0]) || !Number.isInteger(coor[1])) {
      throw Error;
    } else if (!withinBoard(coor)) {
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
    //
    console.log("bingo!");
  }

  const visitedGameboard = [];
  for (let i = 0; i < 8; i++) {
    visitedGameboard.push([]);
  }

  const queue = [];

  const route = []; // doesn't include the end coor and the start coor

  // check if two array are the same
  function checkArrEquals(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;

    return (
      a.length === b.length && a.every((element, index) => element === b[index])
    );
  }

  function checkIfIncludesCoor(array, coor) {
    for (let i = 0; i < array.length; i++) {
      if (checkArrEquals(array[i], coor)) {
        return true;
      }
    }

    return false;
  }

  // it returns the coordinate which comes from the coor and has the coorDes as next move
  function traverse(coor, coorDes) {
    if (!coor) return null;

    const nextMoves = possibleMoves(coor);

    // is the following line necessary?
    if (nextMoves.length > 0) {
      // if the current coordinate's next moves contains the destination, return this current coor
      if (checkIfIncludesCoor(nextMoves, coorDes)) {
        return coor;
      } else {
        // otherwise, mark it as visited on the gameboard
        visitedGameboard[7 - coor[1]].push(coor[0]);

        // for the next layer, try to find if each next move has the destination. 8 * 8
        nextMoves.forEach((c) => {
          // is the following line necessary?
          if (c !== undefined) {
            if (!visitedGameboard[7 - c[1]].includes(c[0])) {
              visitedGameboard[7 - c[1]].push(c[0]);
              queue.push(c);
            }
          }
        });

        return traverse(queue.shift(), coorDes);
      }
    }
  }

  // 1. what is returned is not necessarily accessible by the start coor
  // 2. fon one step situation, it would go "outward" then go back
  function getRoute(coorSta, coorDes) {
    const currentSecondLast = traverse(coorSta, coorDes);

    // new added line
    if (!currentSecondLast) return;

    route.unshift(currentSecondLast);

    if (!checkIfIncludesCoor(possibleMoves(coorSta), currentSecondLast)) {
      getRoute(coorSta, currentSecondLast);
    }
  }

  getRoute(coorStart, coorEnd);
  console.log(route);
  printResult();
}

// knightMoves([0, 1], [0, 0]);
knightMoves([2, 5], [0, 0]);

// when it comes to [6, 1], there is no next move of [2, 5] could reach it
