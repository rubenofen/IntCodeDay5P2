const statuses = {
  current_pointer: "current_pointer",
  read: "read",
  read_pointer: "read_pointer",
  write_pointer: "write_pointer",
  write: "write"
};

const getOpCodeAndMode = op => {
  const opCode =
    op.length === 1 ? 0 + op : op[op.length - 2] + op[op.length - 1];
  const mode = op.substring(0, op.length - 2);
  const result = [
    opCode,
    mode
    .split("")
    .reverse()
    .join("")
  ];
  return result;
};


const getValue = (array, mode, i) => {
console.log("TCL: getValue -> mode, i", mode, i)
  
  if (typeof mode !== 'undefined' && mode != 0) {
    console.log("immediate mode");
    array[i].status = statuses.read;
    return array[i].value;
  } else {
    console.log("position mode");
    array[i].status = statuses.read_pointer;
    array[array[i].value].status = statuses.read;
    return array[array[i].value].value;
  }
}

const write = (input, array, i) => {
  const position = array[i].value;
  if (!array[position]) array[position] = {};
  array[position].value = input;
  array[i].status = statuses.write_pointer;
  array[position].status = statuses.write;
  return i + 1;
}

const calculate = (op, array, modes, i) => {
  const operand1 = getValue(array, modes[0], i + 1);
  const operand2 = getValue(array, modes[1], i + 2);
  write(op == "01" ? operand1 + operand2 : operand1 * operand2, array, i + 3)
  return i + 4;
}

export const part1 = (table, i) => {
  const input = table.concat();
  const returnObject = {
    op: "",
    nextOp: "",
    output: "",
    current_pointer: 0,
    table: []
  };

  const magicInput = 1;
  const op = getOpCodeAndMode(input[i].value.toString());
  input[i].status = statuses.current_pointer;
  returnObject.op = input[i].value.toString();

  if (op[0] === "01" || op[0] === "02") {
    console.log(op);
    returnObject.current_pointer = calculate(op[0], input, op[1], i);
  }

  if (op[0] === "03") {
    returnObject.current_pointer = write(magicInput, input, i += 1);
  }
  if (op[0] === "04") {
    returnObject.output = getValue(input, op[1][0], i + 1);
    returnObject.current_pointer = i + 2;
  }

  returnObject.table = input;
  returnObject.nextOp = input[returnObject.current_pointer].value;
  return returnObject;
};