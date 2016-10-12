function generateRandomBinary() {
  return Math.round(Math.random());
}

function getRuleBinary(ruleNumber) {
  var ruleNumberArray = ruleNumber.toString(2).split('');
  if (ruleNumberArray.length > 8) {
  } else if (ruleNumberArray.length === 8) {
    var finalArray = ruleNumberArray.map(function(item){
      return parseInt(item);
    });
    return finalArray;
  } else {
    ruleNumberArray.unshift('0');
    return getRuleBinary(ruleNumberArray.join(''));
  }
}

function createAndPopulateRow() {
  const row = document.createElement('div');
  document.getElementById('automata').appendChild(row);
  row.classList.add('row');

  for (let i = 0; i < 101; i += 1) {
    let div = document.createElement('div');
    if (generateRandomBinary()) {
      div.classList.add('active');
    } else {
      div.classList.add('inactive');
    }
    row.appendChild(div);
  }
  return row;
}

function duplicatingRows() {
  var automataSize = document.getElementById('automata').childNodes.length;
  var lastRow = document.getElementsByClassName('row')[automataSize - 1];
  var clone = lastRow.cloneNode(true);
  iterateOnNodes(lastRow, clone);
}

function iterateOnNodes(lastRow, clone) {
  for (let i = 0; i < lastRow.childNodes.length; i += 1) {
    let target = clone.childNodes[i];
    let self = lastRow.childNodes[i];
    let leftOfSelf = lastRow.childNodes[i - 1] || lastRow.childNodes[lastRow.childNodes.length - 1];
    let rightOfSelf = lastRow.childNodes[i + 1] || lastRow.childNodes[0];
    applyRule(target, self, leftOfSelf, rightOfSelf, ruleBinary);
    document.getElementById('automata').appendChild(clone);
  }
}

function applyRule(target, self, leftOfSelf, rightOfSelf, rulesArray) {
  if (isActive(leftOfSelf) && isActive(self) && isActive(rightOfSelf)) {
    toggleActive(target, rulesArray[0]);
  } else if (isActive(leftOfSelf) && isActive(self) && isInactive(rightOfSelf)) {
    toggleActive(target, rulesArray[1]);
  } else if (isActive(leftOfSelf) && isInactive(self) && isActive(rightOfSelf)) {
    toggleActive(target, rulesArray[2]);
  } else if (isActive(leftOfSelf) && isInactive(self) && isInactive(rightOfSelf)) {
    toggleActive(target, rulesArray[3]);
  } else if (isInactive(leftOfSelf) && isActive(self) && isActive(rightOfSelf)) {
    toggleActive(target, rulesArray[4]);
  } else if (isInactive(leftOfSelf) && isActive(self) && isInactive(rightOfSelf)) {
    toggleActive(target, rulesArray[5]);
  } else if (isInactive(leftOfSelf) && isInactive(self) && isActive(rightOfSelf)) {
    toggleActive(target, rulesArray[6]);
  } else if (isInactive(leftOfSelf) && isInactive(self) && isInactive(rightOfSelf)) {
    toggleActive(target, rulesArray[7]);
  }
}

function isActive(node) {
  return node.classList.contains('active');
}

function isInactive(node) {
  return node.classList.contains('inactive');
}

function toggleActive(node, isActive) {
  if(isActive) {
    node.classList.remove('inactive');
    node.classList.add('active');
  } else {
    node.classList.remove('active');
    node.classList.add('inactive');
  }
}

var ruleNumber = parseInt(window.location.href.split('/').pop());
var ruleBinary = getRuleBinary(ruleNumber);

createAndPopulateRow();
setInterval(duplicatingRows, 300);
