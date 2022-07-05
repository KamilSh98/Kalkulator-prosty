var clear = document.getElementById("clear");
(function() {
    "use strict";
    var el = function(element) {
      if (element.charAt(0) === "#") {
        return document.querySelector(element);
      }
      return document.querySelectorAll(element);
    };
  
    var viewer = el("#viewer");
    var screen = el("#screen"),
      equals = el("#equals"),
      nums = el(".num"),
      ops = el(".ops"),
      newNum = "",
      oldNum = "",
      resultNum,
      screenNum,
      operator;
  
    var setNum = function() {
      if (resultNum) {
        newNum = this.getAttribute("data-num");
        resultNum = "";
      } else {
        newNum += this.getAttribute("data-num");
      }
      viewer.innerHTML = newNum;
      screen.innerHTML = newNum;
    };
  
    var moveNum = function() {
      oldNum = newNum;
      newNum = "";
      operator = this.getAttribute("data-ops");
  
      equals.setAttribute("data-result", "");
    };
  
    var displayNum = function() {
      oldNum = parseFloat(oldNum);
      newNum = parseFloat(newNum);
      switch (operator) {
        case "plus":
          resultNum = oldNum + newNum;
          screenNum = oldNum + " + " + newNum;
          break;
        case "minus":
          resultNum = oldNum - newNum;
          screenNum = oldNum + " - " + newNum;
          break;
        case "times":
          resultNum = oldNum * newNum;
          screenNum = oldNum + " × " + newNum;
          break;
        case "divided by":
          resultNum = oldNum / newNum;
          screenNum = oldNum + " ÷ " + newNum;
          break;
        case "root":
          resultNum = Math.sqrt(oldNum).toFixed(5);
          screenNum = "Pierwiastek kwadratowy z liczby " + oldNum + " wynosi:";
          break;
        case "root3":
          resultNum = Math.pow(oldNum,1/3).toFixed(5);
          screenNum = "Pierwiastek sześcienny z liczby " + oldNum + " wynosi:";
          break;
          case "rootx":
          resultNum = Math.pow(oldNum, 1/newNum).toFixed(5);
          screenNum = "Pierwiastek " + newNum + " stopnia z liczby " + oldNum + " wynosi:";
          break;
        case "exponentiation2":
          resultNum = oldNum * oldNum;
          screenNum = oldNum + " × " + oldNum;
          break;
        case "exponentiation3":
          resultNum = oldNum * oldNum * oldNum;
          screenNum = oldNum + " × " + oldNum + " × " + oldNum;
          break;
        case "exponentiationx":
          resultNum = Math.pow(oldNum, newNum);
          screenNum = "Liczba " + oldNum + " do potęgi " + newNum + " wynosi:"
          break;
        default:
          resultNum = newNum;
      }
  
      if (!isFinite(resultNum)) {
        if (isNaN(resultNum)) {
          resultNum = "Błąd";
        } else {
          resultNum = "Nie dziel przez 0";
          el('#calculator').classList.add("broken");
          el('#reset').classList.add("show");
        }
      }
  
      viewer.innerHTML = resultNum;
      screen.innerHTML = screenNum;
      equals.setAttribute("data-result", resultNum);
  
      oldNum = 0;
      newNum = resultNum;
  
    };

  
    clear.addEventListener("click", () => {
      oldNum = "";
      newNum = "";
      viewer.innerHTML = "0";
      screen.innerHTML = "0";
      equals.setAttribute("data-result", resultNum);
    });

 
    for (var i = 0, l = nums.length; i < l; i++) {
      nums[i].onclick = setNum;
    }
  
    for (var i = 0, l = ops.length; i < l; i++) {
      ops[i].onclick = moveNum;
    }
  
    equals.onclick = displayNum;

    el("#reset").onclick = function() {
      window.location = window.location;
    };
  
  }());