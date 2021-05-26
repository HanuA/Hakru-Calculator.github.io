'use strict';
const calculator = new Calculator({
  buttonClass: 'btn',
  resultId: 'res',
  evalId: 'evalButton'
});

Math.cotan = function(x){
  return 1 / Math.tan(x);
}
