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
