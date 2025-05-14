function greeting(name) {
    if (name === null || name === undefined) {
      name = 'stranger';
    }
    console.log('Hello, ' + name + '!');
  }

  var numbers = [1, 2, 3, 4, 5];
  numbers.forEach(function(number) {
    console.log('Number: ' + number)
  });

  var unusedVar = 42;

  function add(x, y) {
    const result = x + y;
    return result;
  }

  const foo = {};
  foo.bar = 'baz';
  foo['bar'] = 'qux'; // Duplicate key in object

  add(2, 3); // Unused function call