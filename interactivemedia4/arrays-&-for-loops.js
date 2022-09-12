var fruit1 = "banana";
var fruit2 = "pineapple";
var fruit3 = "apple";
var fruit4 = "peach";
var fruit5 = "orange";

var fruitArray = ["banana", "pineapple", "apple", "peach", "orange"];
/* Arrays can store many variables inside of itself.

For Mixed arrays, varying types of data even other arrays can be stored inside each other.*/
var mixedArray = [42, "pineapple", true, [3, 6, "nine"], "orange"];

fruitArray[1] = "carrot"
/* if the array detects carrot, it will do the following function of saying "this isnt a fruit"*/

for(var fruit of fruitArray){
    if(fruit === "carrot"){
        console.log("this isn't a fruit")
    } else {
        console.log(fruit)
    }
/* an else statement detects if its anything that isn't a fruit, it will be detected.*/
}

for(x of fruityArray){
    /* */
}
