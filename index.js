
//let x = 15;
//let y = 15;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//let complex = { easy: 20, hard: getRandomInt(10, 20) };

//const co = complex['easy'];
//console.log(co)
function mine(co) { 
 
  return () => {
    
    const mine = getRandomInt(1,20);
      if (mine == getRandomInt(1,20) && co > 0) {
        co = co - 1;
        return true;
      }
    return false;
    
  };
}

function getMatrix(y,x,mines){
let matrix = []
const x0 = x - 1;
const y0 = y - 1;

let minef = mine(mines)
let number = 0;
for (let i0 = 0; i0 <= y0; i0++) {
  matrix[i0] = [];
  for (let i1 = 0; i1 <= x0; i1++) {
    number++;
    matrix[i0][i1] = {
      mine: minef(),
      position: i0+","+i1,
      flag: false,
      number,
      show:false,
      boom: false // Si es false entonces asumo que todos los cuadros adyacentes no tienen minas por lo tanto los puedo mostrar

    };
  }
}

eachCell(matrix, function(cell, y, x, matrix) {
  //console.log(cell)
  const sr = surroundings(matrix, y, x)
  matrix[y][x]['surroundings'] = []
  //let boom = false;
  //matrix[y][x]['boom'] = false
  for(let item in sr){
    //console.log(sr[item])
    if (sr[item] !== null){
     //console.log("hay mina en el pariente? "+sr[item].mine)
      if(sr[item].mine === true){
         matrix[y][x]['boom'] = true;
      }
      matrix[y][x]['surroundings'].push(sr[item].position);
    }
  }


});
return matrix
}

// ... Matrix declaration goes here

function getCell(matrix, y, x) {
  var NO_VALUE = null;
  var value, hasValue;
  
  try {
    hasValue = matrix[y][x] !== undefined;
    value    = hasValue?  matrix[y][x] : NO_VALUE;
  } catch(e) {
    value    = NO_VALUE;
  }

  return value;
}

function surroundings(matrix, y, x) {

  // Directions are clockwise
  return {
    up:        getCell(matrix, y-1, x),
    upRight:   getCell(matrix, y-1, x+1),
    right:     getCell(matrix, y,   x+1),
    downRight: getCell(matrix, y+1, x+1),
    down:      getCell(matrix, y+1, x),
    downLeft:  getCell(matrix, y+1, x-1),
    left:      getCell(matrix, y,   x-1),
    upLeft:    getCell(matrix, y-1, x-1)
  }
}

function eachCell(matrix, action, thisArg) {
  var rows = matrix.length;

  thisArg = (typeof thisArg === 'object')
    ? thisArg
    : null;

  // Access each row in the matrix
  for(var y = 0; y < rows; y++) {
    var row   = matrix[y];
    var cells = row.length;

    // Access each cell in the row
    for(var x = 0; x < cells; x++) {
      var cell = row[x];

      action.call(thisArg, cell, y, x, matrix);
    }
  }
}

/*
eachCell(matrix, function(cell, y, x, matrix) {
  //console.log(cell)
  const sr = surroundings(matrix, y, x)
  matrix[y][x]['surroundings'] = []
  //let boom = false;
  //matrix[y][x]['boom'] = false
  for(let item in sr){
    //console.log(sr[item])
    if (sr[item] !== null){
     //console.log("hay mina en el pariente? "+sr[item].mine)
      if(sr[item].mine === true){
         matrix[y][x]['boom'] = true;
      }
      matrix[y][x]['surroundings'].push(sr[item].position);
    }
  }
 
 
});
*/
console.log(JSON.stringify(getMatrix(15,15,20)));
