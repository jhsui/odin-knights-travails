function knightMoves(coor1, coor2) {
  if (!Array.isArray(coor1) || !Array.isArray(coor2)) {
    throw Error;
  } else if (coor1.length > 2 || coor2.length > 2) {
    throw Error;
  } else if (Number.isInteger(coor1[0]) || Number.isInteger(coor1[1])) {
    throw Error;
  } else if (Number.isInteger(coor2[0]) || Number.isInteger(coor2[1])) {
    throw Error;
  } else if (coor1[0] < 0 || coor1[0] > 7) {
    throw Error;
  } else if (coor1[1] < 0 || coor1[1] > 7) {
    throw Error;
  } else if (coor2[0] < 0 || coor2[0] > 7) {
    throw Error;
  } else if (coor2[1] < 0 || coor2[1] > 7) {
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

  // return an array of all the possible coordinates of next move,
  function possibleMoves(coor) {
    const moves = [];

    if (withinBoard([coor[0] - 2, coor[1] + 1])) {
      moves.push([coor[0] - 2, coor[1] + 1]);
    }

    if (withinBoard([coor[0] - 1, coor[1] + 2])) {
      moves.push([coor[0] - 1, coor[1] + 2]);
    }

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

    return moves;
  }

  // how to solve this problem? I have the start point, I need to find the shortest route to the end point
  // 1. from the start point, I can get all the possible next moves

  // 2. then I can get all the possible next next moves
  // 3. check if the end point is within the array?
}
