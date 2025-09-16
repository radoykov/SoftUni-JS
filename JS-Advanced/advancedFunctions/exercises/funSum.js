function add(num) {
    let sum = num;
  
    function func(num2) {
      sum += num2;
      
      return func;
    }
  
    func.toString = function() {return sum;};
    return func;
  }
  

  console.log(
    add(1).toString()
  );
  console.log(
    add(1)(6)(-3).toString()
  ); 