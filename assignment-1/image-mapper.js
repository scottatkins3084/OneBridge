const ctx = document.getElementById("canvas").getContext("2d");
const selectedPoints = [];

function loadFile(event) {
  let output = document.getElementById("output");
  output.src = URL.createObjectURL(event.target.files[0]);
  let fileInformation = event.target.files[0];
  output.onload = function () {
    let height = this.height;
    let width = this.width;
    URL.revokeObjectURL(output.src); // free memory
    document.getElementById("height").innerHTML = height;
    document.getElementById("width").innerHTML = width;
    document.getElementById("name").innerHTML = fileInformation.name;
    document.getElementById("type").innerHTML = fileInformation.type;
    document.getElementById("imageProperties").style.display = 'block';
    document.getElementById("tagPoints").style.display = 'block';
    console.log(this);
  };
};

document.getElementById("canvas").addEventListener("click", printMousePos);

function printMousePos(e) {
  let cursorX = e.pageX - 239;
  let cursorY = e.pageY - 260;
  let name = '';
  addLabel(cursorX, cursorY);
  document.getElementById('pointName').onsubmit = function() {
    name = document.getElementById('pointNameInput').value;
    name.trim();
    if (name !== '') {
      let areaSelected = {'x': cursorX, 'y': cursorY, 'name': (name ? name : 'No Label')};
      addTableRow(cursorX, cursorY, name);
      selectedPoints.push(areaSelected);
      console.log(selectedPoints);
      drawCoordinates(cursorX, cursorY);
      closeLabel();
    }
    return false;
  };

}

function addTableRow(cellOne, cellTwo, cellThree ) {
  let table = document.getElementById("tagDisplay");
  let row = table.insertRow(1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  cell1.innerHTML = cellOne;
  cell2.innerHTML = cellTwo;
  cell3.innerHTML = cellThree;
}

function addLabel(x, y) {
  document.getElementById("pointName").style.marginLeft = ((x + 100) + 'px');
  document.getElementById("pointName").style.marginTop = (y + 'px');
  document.getElementById("formWrapper").style.display = 'block';
}

function closeLabel() {
  document.getElementById("formWrapper").style.display = 'none';
  document.getElementById("pointNameInput").value = '';
}

function drawCoordinates(x, y) {
  ctx.fillStyle = "#ff2626";
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, Math.PI * 2, true);
  ctx.fill();
}

function drawToolTip(x, y, name) {
  document.getElementById("tooltip").style.marginLeft = ((x + 90) + 'px');
  document.getElementById("tooltip").style.marginTop = (y + 'px');
  document.getElementById('tooltip').innerHTML = name;
  document.getElementById("tooltip").style.display = 'block';
}

function clearToolTip() {
  document.getElementById('tooltip').innerHTML = '';
  document.getElementById("tooltip").style.display = 'none';
}

function mouseMovement(e) {
  let x = e.clientX - 239;
  let y = e.clientY - 260;
  if (selectedPoints.length > 0) {
    for(let i = 0; i < selectedPoints.length; i++) {
      if (inRange(x, y, selectedPoints[i].x, selectedPoints[i].y)) {
        drawToolTip(selectedPoints[i].x, selectedPoints[i].y, selectedPoints[i].name);
        break;
      } else {
        clearToolTip();
      }
    }
  }
}

function inRange(baseNumberX, baseNumberY, pointerPositionX, pointerPositionY) {
  if (pointerPositionX >= baseNumberX-2 && pointerPositionX <= baseNumberX+2) {
    return pointerPositionY >= baseNumberY - 2 && pointerPositionY <= baseNumberY + 2;
  } else {
    return false;
  }
}
