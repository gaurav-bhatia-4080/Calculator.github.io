
(function() {
  "use strict";

  // Shortcut to get elements
  var short = function(element) {
    if (element.charAt(0) === "#") { // If passed an ID...
      return document.querySelector(element); // ... returns single element
    }

    return document.querySelectorAll(element); // Otherwise, returns a nodelist
  };
  function isInt(n){
    return Number(n) === n && n % 1 === 0;
  }

  function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
    }
  // Variables
  var viewer = short("#viewer"), // Calculator screen where result is displayed
    equals = short("#equals"), // Equal button
    nums = short(".num"), // List of numbers
    ops = short(".ops"), // List of operators
    theNum = "", // Current number
    oldNum = "", // First number
    resultNum, // Result
    operator; // Batman

  // When: Number is clicked. Get the current number selected
  var setNum = function() {
    if (resultNum) { // If a result was displayed, reset number
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else { // Otherwise, add digit to previous number (this is a string!)
      theNum += this.getAttribute("data-num");
    }

    viewer.innerHTML = theNum; // Display current number

  };

  // When: Operator is clicked. Pass number to oldNum and save operator
  var moveNum = function() {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", ""); // Reset result in attr
  };

  // When: Equals is clicked. Calculate result
  var displayNum = function() {

    // Convert string input to numbers
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    // Perform operation
    switch (operator) {
      case "+":
        resultNum = oldNum + theNum;
        break;

      case "-":
        resultNum = oldNum - theNum;
        break;

      case "X":
        resultNum = oldNum * theNum;
        break;

      case "/":
        resultNum = oldNum / theNum;
        break;
      case "%":
        resultNum = oldNum % theNum;
        break;
      case "to the power":
        resultNum = oldNum ** theNum;
        break;
      case "log base 10":
        resultNum = oldNum / theNum;
        break;
      case "log base e":
        resultNum = oldNum / theNum;
        break;

        // If equal is pressed without an operator, keep number and continue
      default:
        resultNum = theNum;
    }

    // If NaN or Infinity returned
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) { 
        resultNum = "You broke it!";
        short('#calculator').classList.add("broken"); // Break calculator
        short('#reset').classList.add("show"); // And show reset button
      } else { // If result is infinity, set off by dividing by zero
        resultNum = "Aww Snap!!";
        short('#calculator').classList.add("broken"); 
        short('#reset').classList.add("show"); 
      }
    }

    // Display result
    
    console.log(typeof(resultNum));
    if (isFloat(resultNum)){
      resultNum=resultNum.toPrecision(10);
    }
    else if (isInt(resultNum)){
      resultNum=resultNum;
    }
    // else{
    //   resultNum=resultNum;
    // }
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    // Now reset oldNum & keep result
    oldNum = 0;
    theNum = resultNum;

  };

  // When: Clear button is pressed. Clear everything
  var clearAll = function() {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };

  /* The click events */

  // Add click event to numbers
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  // Add click event to operators
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  // Add click event to equal sign
  equals.onclick = displayNum;

  // Add click event to clear button
  short("#clear").onclick = clearAll;

  // Add click event to reset button
  short("#reset").onclick = function() {
    window.location = window.location;
  };

}());