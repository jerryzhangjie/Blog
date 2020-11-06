function demo(){
  console.log(this); // undefined
}
let a = 1;
demo();