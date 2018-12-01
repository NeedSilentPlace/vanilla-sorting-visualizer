// Load application styles
import 'styles/index.less';

var inputBox = document.getElementById('box');

inputBox.addEventListener('keydown', function(ev) {
  if(ev.keyCode === 13) {
    var inputValue = ev.target.value;

    for(var i = 0; i < inputValue.length; i++) {
      if(inputValue[i].charCodeAt() < 48 || inputValue[i].charCodeAt() > 57) {
        return alert('Please only number!');
      }
    }

    var div = document.createElement('div');
    div.classList.add('numbers');
    div.textContent = inputValue;
    document.getElementById('show').appendChild(div);

    ev.target.value = '';
  }
});

var clear = document.querySelector('.clear');

clear.addEventListener('click', function() {
  var list = document.getElementById('show');
  list.removeChild(list.childNodes[list.children.length]);
});

document.querySelector('.bubble').addEventListener('click', clickBubble);
document.querySelector('.insertion').addEventListener('click', clickInsertion);
document.querySelector('.selection').addEventListener('click', clickSelection);
document.querySelector('.merge').addEventListener('click', clickMerge);

function clickBubble() {
  var typeList = document.getElementById('type').children;
  var inputValues = document.getElementById('show').children;

  for(var i = 0; i < typeList.length; i++) {
    typeList[i].classList.remove('sorted');
  }
  for(var j = 0; j < inputValues.length; j++) {
    inputValues[j].classList.remove('merged');
  }

  document.querySelector('.bubble').classList.add('sorted');
  document.getElementById('btn').removeEventListener('click', sortByInsertion);
  document.getElementById('btn').removeEventListener('click', sortBySelection);
  document.getElementById('btn').removeEventListener('click', sortByMerge);
  document.getElementById('btn').addEventListener('click', sortByBubble);
}

function sortByBubble() {
  var inputValues = document.getElementById('show').children;

  if(inputValues.length < 5) {
    return alert('at least 5 numbers!');
  }
  if(inputValues.length > 10) {
    return alert('too much numbers! (max 10)');
  }

  var time = 0
  for(var i = inputValues.length - 1; i >= 0; i--) {
    for(var j = 0; j < i; j++) {
      swapBubble(j, time);
      time++;
    }
    fixedVisualizer(i, time);
  }

  setTimeout(function() {
    document.getElementById('standard').textContent = 'Complete!';
  }, 1000 * time);
}

function swapBubble(index, delay) {
  var inputValues = document.getElementById('show').children;

  setTimeout(function() {
    var tmp = 0;
    for(var i = 0; i < inputValues.length; i++) {
      inputValues[i].classList.remove('white');
    }
    inputValues[index].classList.add('white');
    inputValues[index + 1].classList.add('white');

    if(parseInt(inputValues[index].textContent) > parseInt(inputValues[index + 1].textContent)) {
      tmp = inputValues[index].textContent;
      inputValues[index].textContent = inputValues[index + 1].textContent;
      inputValues[index + 1].textContent = tmp;
    }
  }, 1000 * delay);
}

function fixedVisualizer(index, delay) {
  var inputValues = document.getElementById('show').children;

  setTimeout(function() {
    for(var i = 0; i < inputValues.length; i++) {
      inputValues[i].classList.remove('white');
      inputValues[i].classList.remove('red');
    }
    inputValues[index].classList.add('sorted');
  }, 1000 * delay);
}

function clickInsertion() {
  var typeList = document.getElementById('type').children;
  var inputValues = document.getElementById('show').children;

  for(var i = 0; i < typeList.length; i++) {
    typeList[i].classList.remove('sorted');
  }
  for(var j = 0; j < inputValues.length; j++) {
    inputValues[j].classList.remove('merged');
  }

  document.querySelector('.insertion').classList.add('sorted');
  document.getElementById('btn').removeEventListener('click', sortByBubble);
  document.getElementById('btn').removeEventListener('click', sortBySelection);
  document.getElementById('btn').removeEventListener('click', sortByMerge);
  document.getElementById('btn').addEventListener('click', sortByInsertion);
}

function sortByInsertion() {
  var inputValues = document.getElementById('show').children;
  var numbers = [];

  for(var i = 0; i < inputValues.length; i++) {
    numbers.push(parseInt(inputValues[i].textContent));
  }

  if(inputValues.length < 5) {
    return alert('at least 5 numbers!');
  }
  if(inputValues.length > 10) {
    return alert('too much numbers! (max 10)');
  }

  var time = 0;
  for(var j = 0; j < numbers.length; j++) {
    var tmp = numbers[j];
    insertStandard(tmp, j, time);
    time++;
    for(var k = j - 1; k >= 0; k--) {
      if(numbers[k] > tmp) {
        numbers[k + 1] = numbers[k];
        swapInsertion(k, time);
        time++;
      } else {
        break;
      }
    }
    numbers[k + 1] = tmp;
    swapInsertion(k + 1, time, tmp);
    time++;
  }

  setTimeout(function() {
    document.getElementById('standard').textContent = 'Complete!';
    for(var l = 0; l < inputValues.length; l++) {
      inputValues[l].classList.add('sorted');
    }
  }, 1000 * time);
}

function insertStandard(value, index, delay) {
  var standard = document.getElementById('standard');
  var inputValues = document.getElementById('show').children;

  setTimeout(function() {
    standard.textContent = value;
    inputValues[index].textContent = '';
  }, 1000 * delay);
}

function swapInsertion(sorted, delay, standardValue) {
  var inputValues = document.getElementById('show').children;
  var standard = document.getElementById('standard');

  if(arguments.length === 2) {
    setTimeout(function() {
      inputValues[sorted + 1].textContent = inputValues[sorted].textContent;
      inputValues[sorted].textContent = '';
    }, 1000 * delay);
  } else {
    setTimeout(function() {
      inputValues[sorted].textContent = standardValue;
      standard.textContent = '';
    }, 1000 * delay);
  }
}

function clickSelection() {
  var typeList = document.getElementById('type').children;
  var inputValues = document.getElementById('show').children;

  for(var i = 0; i < typeList.length; i++) {
    typeList[i].classList.remove('sorted');
  }
  for(var j = 0; j < inputValues.length; j++) {
    inputValues[j].classList.remove('merged');
  }

  document.querySelector('.selection').classList.add('sorted');
  document.getElementById('btn').removeEventListener('click', sortByBubble);
  document.getElementById('btn').removeEventListener('click', sortByInsertion);
  document.getElementById('btn').removeEventListener('click', sortByMerge);
  document.getElementById('btn').addEventListener('click', sortBySelection);
}

function sortBySelection() {
  var inputValues = document.getElementById('show').children;
  var numbers = [];

  for(var i = 0; i < inputValues.length; i++) {
    numbers.push(parseInt(inputValues[i].textContent));
  }

  if(inputValues.length < 5) {
    return alert('at least 5 numbers!');
  }
  if(inputValues.length > 10) {
    return alert('too much numbers! (max 10)');
  }

  var time = 0;
  for(var j = 0; j < numbers.length - 1; j++) {
    var min = numbers[j], turnPoint = j;
    insertMinimum(j, time);
    time++;
    for(var k = j + 1; k < numbers.length; k++) {
      if(numbers[k] < min) {
        min = numbers[k];
        turnPoint = k
        insertMinimum(k, time);
        time++;
      } else {
        swapSelectionVisualizer(k, time);
        time++;
      }
    }
    numbers[turnPoint] = numbers[j];
    numbers[j] = min;
    swapSelection(j, time);
    fixedVisualizer(j, time);
    time++;
  }

  setTimeout(function() {
    document.getElementById('standard').textContent = 'Complete!';
    inputValues[j].classList.remove('white');
    inputValues[j].classList.remove('red');
    inputValues[j].classList.add('sorted');
  }, 1000 * time);
}

function swapSelection(index, delay) {
  var inputValues = document.getElementById('show').children;

  setTimeout(function() {
    var standard = document.getElementById('standard').textContent;

    for(var i = index; i < inputValues.length; i++) {
      if(inputValues[i].textContent === standard.slice(6)) {
        inputValues[i].textContent = inputValues[index].textContent;
        inputValues[index].textContent = standard.slice(6);
        document.getElementById('standard').textContent = 'change!';
      }
    }
  }, 1000 * delay);
}

function insertMinimum(index, delay) {
  var inputValues = document.getElementById('show').children;

  setTimeout(function() {
    for(var i = 0; i < inputValues.length; i++) {
      inputValues[i].classList.remove('white');
      inputValues[i].classList.remove('red');
    }
    inputValues[index].classList.add('red');
    document.getElementById('standard').textContent = 'min : ' + inputValues[index].textContent;
  }, 1000 * delay);
}

function swapSelectionVisualizer(index, delay) {
  var inputValues = document.getElementById('show').children;

  setTimeout(function() {
    for(var i = 0; i < inputValues.length; i++) {
      inputValues[i].classList.remove('white');
      inputValues[i].classList.remove('red');
    }
    inputValues[index].classList.add('white');
  }, 1000 * delay);
}

function clickMerge() {
  var inputValues = document.getElementById('show').children;
  var typeList = document.getElementById('type').children;

  for(var i = 0; i < inputValues.length; i++) {
    inputValues[i].classList.add('merged');
  }
  for(var j = 0; j < typeList.length; j++) {
    typeList[j].classList.remove('sorted');
  }

  document.querySelector('.merge').classList.add('sorted');
  document.getElementById('btn').removeEventListener('click', sortByInsertion);
  document.getElementById('btn').removeEventListener('click', sortBySelection);
  document.getElementById('btn').removeEventListener('click', sortByBubble);
  document.getElementById('btn').addEventListener('click', sortByMerge);
}

function sortByMerge() {
  var inputValues = document.getElementById('show').children;
  var numbers = [];

  for(var i = 0; i < inputValues.length; i++) {
    numbers.push(parseInt(inputValues[i].textContent));
  }

  if(inputValues.length < 5) {
    return alert('at least 5 numbers!');
  }
  if(inputValues.length > 10) {
    return alert('too much numbers! (max 10)');
  }

  var swapHistory = [];
  var colorIndex = [];

  function split(arr, startIndex) {
    if(arr.length === 1) {
      return arr;
    }

    var mid = Math.round(arr.length / 2);
    var left = arr.slice(0, mid);
    var right = arr.slice(mid);
    var index = startIndex;

    return recordMergedData(split(left, index), split(right, index + mid), index, index + arr.length - 1);
  }

  function recordMergedData(left, right, from, to) { 
    var sorted = [];
    var clone = numbers.slice(0);
    
    while(left.length && right.length) {
      if(left[0] > right[0]) {
        sorted.push(right[0]);
        right.splice(0, 1);
      } else {
        sorted.push(left[0]);
        left.splice(0, 1);
      }
    }

    if(left.length) {
      for(var i = 0; i < left.length; i++) {
        sorted.push(left[i]);
      }
    }
    if(right.length) {
      for(var j = 0; j < right.length; j++) {
        sorted.push(right[j]);
      }
    }

    for(var k = from; k <= to; k++) {
      clone[k] = sorted[k - from];
      numbers[k] = sorted[k -from];
    }
    swapHistory.push(clone);
    colorIndex.push([from, to]);
    
    return sorted
  }
  split(numbers, 0);

  var time = 0;
  setTimeout(function() {
    for(var i = 0; i < inputValues.length; i++) {
      inputValues[i].classList.add('rewind');
    }
  }, 1000 * time);
  time++;

  for(var i = 0; i < swapHistory.length; i++) {
    swapData(swapHistory[i], time);
    swapVisualizer(colorIndex[i], time);
    time++;
  }

  setTimeout(function() {
    for(var i = 0; i < inputValues.length; i++) {
      inputValues[i].classList.remove('white');
      inputValues[i].classList.add('sorted');
    }
    document.getElementById('standard').textContent = 'Complete!';
  }, 1000 * time);
}

function swapData(data, delay) {
  var inputValues = document.getElementById('show').children;

  setTimeout(function() {
    for(var i = 0; i < inputValues.length; i++) {
      inputValues[i].textContent = data[i];
    }
  }, 1000 * delay);
}

function swapVisualizer(data, delay) {
  var inputValues = document.getElementById('show').children;

  setTimeout(function() {
    for(var i = 0; i < inputValues.length; i++) {
      if(i >= data[0] && i <= data[1]) {
        inputValues[i].classList.remove('rewind');
        inputValues[i].classList.add('merged');
        inputValues[i].classList.add('white');
      } else {
        inputValues[i].classList.remove('merged');
        inputValues[i].classList.remove('white');
        inputValues[i].classList.add('rewind');
      }
    }
  }, 1000 * delay);
}
// ================================
// START YOUR APP HERE
// ================================
