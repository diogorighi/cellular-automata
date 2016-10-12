// create row
// populate row with divs

function generateRandomBinary() {
  return Math.round(Math.random());
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
    applyRule(target, self, leftOfSelf, rightOfSelf);
    document.getElementById('automata').appendChild(clone);
  }
}

function applyRule(target, self, leftOfSelf, rightOfSelf) {
  if (isActive(leftOfSelf) && isActive(self) && isActive(rightOfSelf)) {
    setInactive(target);
  } else if (isActive(leftOfSelf) && isActive(self) && isInactive(rightOfSelf)) {
    setActive(target);
  } else if (isActive(leftOfSelf) && isInactive(self) && isActive(rightOfSelf)) {
    setInactive(target);
  } else if (isActive(leftOfSelf) && isInactive(self) && isInactive(rightOfSelf)) {
    setInactive(target);
  } else if (isInactive(leftOfSelf) && isActive(self) && isActive(rightOfSelf)) {
    setActive(target);
  } else if (isInactive(leftOfSelf) && isActive(self) && isInactive(rightOfSelf)) {
    setInactive(target);
  } else if (isInactive(leftOfSelf) && isInactive(self) && isActive(rightOfSelf)) {
    setInactive(target);
  } else if (isInactive(leftOfSelf) && isInactive(self) && isInactive(rightOfSelf)) {
    setActive(target);
  }
}

function isActive(node) {
  return node.classList.contains('active');
}

function isInactive(node) {
  return node.classList.contains('inactive');
}

function setActive(node) {
  node.classList.remove('inactive');
  node.classList.add('active');
}

function setInactive(node) {
  node.classList.remove('active');
  node.classList.add('inactive');
}

createAndPopulateRow();
setInterval(duplicatingRows, 300);
