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

document.getElementById('bubble').addEventListener('click', clickBubble);
document.getElementById('insertion').addEventListener('click', clickInsertion);
document.getElementById('selection').addEventListener('click', clickSelection);
document.getElementById('merge').addEventListener('click', clickMerge);

function clickBubble() {
  var typeList = document.getElementById('type').children;
  var inputValues = document.getElementById('show').children;

  for(var i = 0; i < typeList.length; i++) {
    typeList[i].classList.remove('sorted');
  }
  for(var j = 0; j < inputValues.length; j++) {
    inputValues[j].classList.remove('merged');
  }

  document.getElementById('bubble').classList.add('sorted');
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
      changeBubbleColor(j, time);
      time++;
    }
    changeSortedColor(i, time);
  }

  setTimeout(function() {
    document.getElementById('standard').textContent = 'Complete!';
  }, 1000 * time);
}

function changeBubbleColor(index, delay) {
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

function changeSortedColor(index, delay) {
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
  for(var i = 0; i < inputValues.length; i++) {
    inputValues[i].classList.remove('merged');
  }

  document.getElementById('insertion').classList.add('sorted');
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
        changeInsertionPlace(k, time);
        time++;
      } else {
        break;
      }
    }
    numbers[k + 1] = tmp;
    changeInsertionPlace(k + 1, time, tmp);
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

function changeInsertionPlace(sorted, delay, standardValue) {
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

  document.getElementById('selection').classList.add('sorted');
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
        changeSelectionColor(k, time);
        time++;
      }
    }
    numbers[turnPoint] = numbers[j];
    numbers[j] = min;
    changePlace(j, time);
    changeSortedColor(j, time);
    time++;
  }

  setTimeout(function() {
    document.getElementById('standard').textContent = 'Complete!';
    inputValues[j].classList.remove('white');
    inputValues[j].classList.remove('red');
    inputValues[j].classList.add('sorted');
  }, 1000 * time);
}

function changePlace(index, delay) {
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

function changeSelectionColor(index, delay) {
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

  document.getElementById('merge').classList.add('sorted');
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

  var storage = [];
  var colorStorage = [];

  function split(arr) {
    if(arr.length === 1) {
      return arr;
    }

    var center = Math.round(arr.length/2);
    var left = arr.slice(0, center);
    var right = arr.slice(center);

    return merge(split(left), split(right));
  }

  function merge(left, right) {
    var sorted = [];
    var clone = [];
    var colorIndex = [];

    while(left.length && right.length) {
      if(left[0] <= right[0]) {
        sorted.push(left[0]);
        left.splice(0, 1);
      } else {
        sorted.push(right[0]);
        right.splice(0, 1);
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

    var firstIndex = numbers.indexOf(sorted[0]);
    var lastIndex = numbers.indexOf(sorted[0]);

    for(var k = 0; k < sorted.length; k++) {
      if(numbers.indexOf(sorted[k]) < firstIndex) {
        firstIndex = numbers.indexOf(sorted[k]);
      }
      if(numbers.indexOf(sorted[k]) > lastIndex) {
        lastIndex = numbers.indexOf(sorted[k]);
      }
    }
    colorIndex = [firstIndex, lastIndex];
    colorStorage.push(colorIndex);

    for(var k = 0; k < sorted.length; k++) {
        numbers.splice(firstIndex, 1);
    }
    for(var l = sorted.length - 1; l >= 0; l--) {
      numbers.splice(firstIndex, 0, sorted[l]);
    }
    clone = numbers.slice(0);
    storage.push(clone);
    return sorted;
  }

  split(numbers);
  var time = 1;

  setTimeout(function() {
    for(var m = 0; m < inputValues.length; m++) {
      inputValues[m].classList.remove('merged');
    }
  }, 1000 * time);
  time++;

  for(var n = 0; n < storage.length; n++) {
    changeMergeColor(storage[n], colorStorage[n][0], colorStorage[n][1] + 1, time);
    time++;
  }

  setTimeout(function() {
    document.getElementById('standard').textContent = 'Complete!';
    for(var i = 0; i < inputValues.length; i++) {
      inputValues[i].classList.remove('red');
      inputValues[i].classList.add('sorted');
    }
  }, 1000 * time);
}

function changeMergeColor(storageNum, colorStart, colorFinish, delay) {
  var inputValues = document.getElementById('show').children;

  setTimeout(function() {
    for(var i = 0; i < inputValues.length; i++) {
      inputValues[i].classList.remove('red');
      inputValues[i].classList.remove('merged');
    }
    for(var j = colorStart; j < colorFinish; j++) {
      inputValues[j].classList.add('red');
      inputValues[j].classList.add('merged');
    }
    for(var k = 0; k < storageNum.length; k++) {
      inputValues[k].textContent = storageNum[k];
    }
  }, 1000 * delay);
}

var clear = document.getElementById('clear');

clear.addEventListener('click', function() {
  var list = document.getElementById('show');
  list.removeChild(list.childNodes[list.children.length]);
});
// ================================
// START YOUR APP HERE
// ================================
