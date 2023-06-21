async function async1() {
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2 end');
}

new Promise(resolve => {
  console.log('Promise');
  resolve();
}).then(() => {
  console.log('promise1');
  setTimeout(() => {
    console.log('3333')
  })
}).then(() => {
  console.log('promise2')
})

async1();

setTimeout(() => {
  console.log('1111')
})

console.log('22222')