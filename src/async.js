function app() {
  setTimeout(() => {
    console.log("1-1");
    setTimeout(() => {
      console.log("end");
    });
    Promise.resolve().then(() => {
      console.log("2-1");
    });
  });
  async function async1() {
    await async2()
    console.log('async1 end')
  }
  async function async2() {
    console.log('async2 end')
  }
  async1()
  console.log("1-2");
  new Promise((resolve) => {
    console.log('1-4');
    resolve('3-1')
  }).then((val) => {
    console.log(val);
  })
  Promise.resolve().then(() => {
    console.log("1-3");
    setTimeout(() => {
      console.log("3-1");
    });
  });
}
app();
// async2 end
// 1-2
// 1-4
// 3-1
// 1-3
// async1 end
// 1-1
// 3-1
// 2-1