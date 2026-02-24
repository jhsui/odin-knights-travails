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

  if (coorStart[0] === coorEnd[0] && coorStart[1] === coorEnd[1]) {
    printResult();
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
  const route = [];

  function checkIfIncludesCoor() {}
  function checkArrEquals() {}

  function traverse(coor, coorDes) {
    // if (checkArrEquals(coor, coorEnd)) {
    //   return coor;
    // }

    const nextMoves = possibleMoves(coor);

    if (nextMoves.checkIfIncludesCoor(coorDes)) {
      // printResult();
      return coor;
    } else {
      // passedMoves.push(coor);
      visitedGameboard[7 - coor[1]].push(coor[0]);

      nextMoves.forEach((c) => {
        if (!visitedGameboard[7 - c[1]].includes(c[0])) {
          //
          queue.push(c);
        }
      });

      traverse(queue.shift(), coorDes);
    }
  }

  function getRoute(coorSta, coorDes) {
    const whatIsReturned = traverse(coorSta, coorDes);
    route.unshift(traverse(coorSta, coorDes));

    if (!whatIsReturned.checkArrEquals(coorSta)) {
      getRoute(coorSta, route[route.length - 1]);
    }
  }

  function checkNextLayer(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (possibleMoves(arr[i]).checkIfIncludesCoor(coorEnd)) {
        return true;
      }
    }
    return false;
  }

  printResult();
}

knightMoves([0, 1], [0, 0]);
