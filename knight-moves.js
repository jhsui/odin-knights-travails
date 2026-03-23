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

  function printResult() {
    //
    console.log("bingo!");
  }

  /*
  // if the input are the same, output
  if (coorStart[0] === coorEnd[0] && coorStart[1] === coorEnd[1]) {
    printResult();
    return;
  }
  */

  function withinBoard(coor) {
    if (coor[0] < 0 || coor[0] > 7) {
      return false;
    }

    if (coor[1] < 0 || coor[1] > 7) {
      return false;
    }

    return true;
  }

  // return an array of coordinates of all the possible next moves
  // (x, y) from 0 ~ 7
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

    let moves = [];

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

    moves = moves.filter((c) => !visitedCoor[7 - c[1]].includes(c[0]));

    return moves;
  }

  // use to track one coordinate's parent (last step)
  // key = current coor, value = its parent
  const parentMap = new Map();

  // use to track visited coordinates
  const visitedCoor = [[], [], [], [], [], [], [], []];

  // use to track next coor to be processed
  const queue = [];

  // check if the array contains the coor
  function checkIfArrContainsCoor(arr, coor) {
    for (const c of arr) {
      if (checkIfTwoArrSame(c, coor)) {
        return true;
      }
    }

    return false;
  }

  function checkIfTwoArrSame(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  }

  // one time breath first traversal
  function traverse(coStart, coEnd) {
    const nextMoves = possibleMoves(coStart);

    if (nextMoves.length == 0) {
      return;
    }

    for (const c of nextMoves) {
      parentMap.set(c, coStart);
    }

    if (checkIfArrContainsCoor(nextMoves, coEnd)) {
      for (const c of nextMoves) {
        if (checkIfTwoArrSame(c, coEnd)) {
          return c;
        }
      }
    } else {
      // no one in the next move is the end.

      // mark it as visited
      visitedCoor[7 - coStart[1]].push(coStart[0]);

      // push into queue
      queue.push(...nextMoves);

      // what's next?
      const next = queue.shift();
      return traverse(next, coEnd);
    }
  }

  const final = traverse(coorStart, coorEnd);

  const result = [];

  result.push(final);

  while (parentMap.has(result[result.length - 1])) {
    const key = result[result.length - 1];
    result.push(parentMap.get(key));
  }

  for (let i = result.length - 1; i >= 0; i--) {
    console.log(result[i]);
  }
}

// knightMoves([0, 0], [7, 7]);
knightMoves([0, 0], [5, 3]);
