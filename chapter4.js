// These are my notes to chapter 4, the functions chapter. I'm just recapping how "this" 
// works in the different invocation patterns.

// #######################################################################################
// the "Method Invocation Pattern" is showing that this is bound to 
// an object that is limiting the scope of a function. 
// Notes: if that object is missing, this is bound to the global
//        object, see "Function Invocation Pattern"
console.info("Method Invocation Pattern, page 28.");
var methodInvocationPattern = {	
	value: 0,
	increment: function (inc){ // in this function, this is bound to the enclosing object.
		this.value += typeof inc === 'number' ? inc : 1;
	}
};

console.log("\tmethodInvocationPattern.value: " + methodInvocationPattern.value);
methodInvocationPattern.increment();
console.log("\tmethodInvocationPattern.value: " + methodInvocationPattern.value);
methodInvocationPattern.increment(2);
console.log("\tmethodInvocationPattern.value: " + methodInvocationPattern.value);

// #######################################################################################
// The function invcation pattern is the one that is somewhat bad designed.
// the inner function should get its this bound to the enclosing function,
// but instead, it's bound to the global scope.
console.log("\nFunction Invocation Pattern, page 28.");
var functionInvocationPattern = {
	value: 0,
	sum: function () {
		// this "this" is what we expect from the "Method Invocation Pattern"
		console.log("\tinside sums this: ", this); 
		var insideSumFunction = function (argsOfSum) {
			// this "this" is the design error, it's not bound to the outer
			// closure, it's bound to the global object: "[object global]"
			console.log("\tinside innersums this: " + this);
			var result = 0;
			for (var i = argsOfSum.length - 1; i >= 0; i--) {
				result += argsOfSum[i];
			};
			return result;
		};

		this.value = insideSumFunction(arguments);
	}
};

console.log("\tfunctionInvocationPattern.value: " + functionInvocationPattern.value);
functionInvocationPattern.sum(1,2,3,4,5);
console.log("\tfunctionInvocationPattern.value: " + functionInvocationPattern.value);

// #######################################################################################
// this is the "Constructor Invocation Pattern", this shows how this is bound in 
// prototypes and how they're instantiated.
console.log("\nConstructor Invocation Pattern, page 29.");
var ConstructorInvocationPattern = function (number) {
    // this "this" is bound to global, unless you'll invoke the new constructor and 
    // retrieve it with the get_value function
    console.log("\tConstructorInvocationPatterns this: " + this);
    this.value = typeof number === 'number' ? number : 1;
}

ConstructorInvocationPattern.prototype.get_value = function() {
    return this.value;
}

// instantiate a prototype, this will show that the this is now
// bound to the object instantiated

// show global when not invoked from the prototype instance
var withoutNew = ConstructorInvocationPattern(1);
console.log("\twithoutNew is undefined, new was not used: " + withoutNew);

var object = new ConstructorInvocationPattern(2);
console.log("\tvalue: " + object.get_value());

// #######################################################################################
// The last of the four invocation patterns, the "Apply Invocation Pattern"
console.log("\nApply Invocation Pattern, page 30.");
var array = [1,2];
var add = function (a, b) {
    console.log("\targuments inside of add: ", arguments)
    return a + b;
}

console.log("\tnormal call to add: ");
add(3,4)

// apply the array to the function add, this replaces the arguments array 
console.log("\tarray applied to add function: ");
var sum = add.apply(null, array);

var objWithValue = {
    value: 1337
};

var value = ConstructorInvocationPattern.prototype.get_value.apply(objWithValue);
console.log("\tvalue from applied ConstructorInvocationPattern.prototype.get_value.apply(objWithValue): " + value);