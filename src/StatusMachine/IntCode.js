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
  //console.log(`Op ${result} from ${op}`);
  return result;
};

const singleMovement = (magicInput, array, position) => {
    if(!array[position]) array[position] = {};
  array[position].value = magicInput;
  array[position].status = statuses.write;
};

const suma = a => b => (array, position) => {
  //console.log(`suma: a ${a}, b ${b}, position ${position}`);
  array[position].value = a + b;
  array[position].status = statuses.write;
  //console.log(array[position]);
};

const multi = a => b => (array, position) => {
  //console.log(`multi: a ${a}, b ${b}, position ${position}`);
  array[position].value = a * b;
  array[position].status = statuses.write;
  //console.log(array[position]);
};

export const part1 = (table, i) => {
  const input = table.concat();
  const returnObject = {
    op: "",
    output: "",
    current_pointer: "",
    table: []
  };

  const magicInput = 1;
  const op = getOpCodeAndMode(input[i].value.toString());
  input[i].status = statuses.current_pointer;
  returnObject.op = input[i].value.toString();

  if (op[0] === "01" || op[0] === "02") {
    let calculo = op[0] === "01" ? suma : multi;
    for (let index = 0; index < 2; index++) {
      const mode = parseInt(op[1][index]);
      let operand;
      if (mode) {
        operand = input[(i += 1)].value;
        input[i].status = statuses.read;
      } else {
        operand = input[input[(i += 1)].value].value;
        input[i].status = statuses.read_pointer;
        input[input[i].value].status = statuses.read;
      }
      calculo = calculo(operand);
    }
    calculo(input, input[(i += 1)].value);
    input[i].status = statuses.write_pointer;
  }

  if (op[0] === "03") {
      singleMovement(magicInput, input, input[(i += 1)].value);
      input[i].status = statuses.write_pointer;
  }
  if (op[0] === "04")
    if (op[1][0]) {
      returnObject.output = input[(i += 1)].value;
      input[i].status = statuses.read;
    } else {
      returnObject.output = input[input[(i += 1)].value].value;
      input[i].status = statuses.read_pointer;
      input[input[i].value].status = statuses.read;
    }
  returnObject.current_pointer = i + 1;
  returnObject.table = input;
  return returnObject;
};
