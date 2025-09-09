## 1) What is the difference between `var`, `let`, and `const`?

* `var` is the old way to declare variables. It’s function-scoped and can be re-declared and updated.
* `let` is the modern way. It’s block-scoped and can be updated but not re-declared in the same scope.
* `const` is also block-scoped, but it can’t be updated or re-declared. We use it when the value should not change.


## 2) What is the difference between `map()`, `forEach()`, and `filter()`?

* `forEach()` - just loops through an array and lets us run code for each item. It doesn’t return anything.
* `map()` also loops, but it returns a new array with the result of whatever we do to each item.
* `filter()` returns a new array with only the items that pass a condition.


## 3) What are arrow functions in ES6?

* Arrow functions are a shorter way to write functions using `=>`.
* They remove the need for the `function` keyword.
* They do not have their own `this`.
* Great for quick functions or one-liners.


## 4) How does destructuring assignment work in ES6?

* Destructuring lets us unpack values from arrays or objects into variables.
* Array example : `let [a, b] = [1, 2];` → `a = 1`, `b = 2`
* Object example : `let { name, age } = { name: "Alice", age: 25 };`
* Makes code shorter and cleaner when working with data.


## 5) Explain template literals in ES6. How are they different from string concatenation?

* Template literals use backticks (\`) instead of quotes.
* We can insert variables using `${variable}` inside the string.
* Easier and cleaner than using `+` for string building.
* Supports multi-line strings without needing `\n`.
