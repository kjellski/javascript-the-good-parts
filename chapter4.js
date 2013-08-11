// These are my notes to chapter 4, the functions chapter. I'm just recapping how "this" 
// works in the different invocation patterns.

// #######################################################################################
// the "Method Invocation Pattern" is showing that this is bound to 
// an object that is limiting the scope of a function. 
// Notes: if that object is missing, this is bound to the global
//        object, see "Function Invocation Pattern"
var methodInvocationPattern = {	
	value: 0,
	increment: function (inc){ // in this function, this is bound to the enclosing object.
		this.value += typeof inc === 'number' ? inc : 1;
	}
};

console.info("methodInvocationPattern");
console.log("value: " + methodInvocationPattern.value);
methodInvocationPattern.increment();
console.log("value: " + methodInvocationPattern.value);
methodInvocationPattern.increment(2);
console.log("value: " + methodInvocationPattern.value);

// #######################################################################################
// The function invcation pattern is the one that is somewhat bad designed.
// the inner function should get its this bound to the enclosing function,
// but instead, it's bound to the global scope.
var functionInvocationPattern = {
	value: 0,
	sum: function () {
		// this "this" is what we expect from the "Method Invocation Pattern"
		console.log("inside sums this: ", this); 
		var insideSumFunction = function (argsOfSum) {
			// this "this" is the design error, it's not bound to the outer
			// closure, it's bound to the global object: "[object global]"
			console.log("inside innersums this: " + this);
			var result = 0;
			for (var i = argsOfSum.length - 1; i >= 0; i--) {
				result += argsOfSum[i];
			};
			return result;
		};

		this.value = insideSumFunction(arguments);
	}
};

console.log("functionInvocationPattern");
console.log("value: " + functionInvocationPattern.value);
functionInvocationPattern.sum(1,2,3,4,5);
console.log("value: " + functionInvocationPattern.value);