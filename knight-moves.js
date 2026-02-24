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
    console.log("bingo!");
  }

  const visitedGameboard = [];
  for (let i = 0; i < 8; i++) {
    visitedGameboard.push([]);
  }

  const queue = [];

  const route = []; // doesn't include the end coor

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

  function traverse(coor, coorDes) {
    if (!coor) return;

    const nextMoves = possibleMoves(coor);

    if (checkIfIncludesCoor(nextMoves, coorDes)) {
      return coor;
    } else {
      visitedGameboard[7 - coor[1]].push(coor[0]);

      nextMoves.forEach((c) => {
        if (!visitedGameboard[7 - c[1]].includes(c[0])) {
          queue.push(c);
        }
      });

      return traverse(queue.shift(), coorDes);
    }
  }

  function getRoute(coorSta, coorDes) {
    const whatIsReturned = traverse(coorSta, coorDes);
    route.unshift(whatIsReturned);

    if (!checkArrEquals(coorSta, whatIsReturned)) {
      getRoute(coorSta, route[route.length - 1]);
    }
  }

  getRoute(coorStart, coorEnd);
  console.log(route);
  printResult();
}

knightMoves([0, 1], [0, 0]);
