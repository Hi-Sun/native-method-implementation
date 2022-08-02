/**
 * 实现异步并发数限制：对请求并发数进行限制，并且使用排队机制让请求有序的发送出去
 * 首先用一个maxCount记录允许并发的数量，用一个tasks数组保存所有开始之前设定的任务
 * 我们需要对加入的任务进行一些封装，改成promise，这样就可以获取到完成的状态进行操作
 * 我们用working数组保存正在运行的任务，用tasks保存还未完成的任务
 * 在任务完成后，将tasks队列的第一个任务放入working中，并且运行
 * 如此，通过递归，就可以完成一个并发控制器
 * @param {*} maxLimit 最大并发数限制数
 * @param {*} array 
 * @param {*} iterateFn 
 */
function limit(maxLimit, array, callback) {
  const tasks = []; // 保存所有开始之前设定的任务
  const doingTasks = []; // 正在运行的任务
  let i = 0;

  const enqueue = () => {
    if (i === array.length) {
      return Promise.resolve()
    }
    const task = Promise.resolve().then(() => iterateFn(array[i++]));
    tasks.push(task);
    const doing = task.then(() => doingTasks.splice(doingTasks.indexOf(doing), 1));
    doingTasks.push(doing);
    const res = doingTasks.length >= maxLimit ? Promise.race(doingTasks) : Promise.resolve();
    return res.then(enqueue);
  }
  return enqueue().then(() => Promise.all(tasks));

}

// test
const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i))
limit(2, [1000, 1000, 1000, 1000], timeout).then((res) => {
  console.log(res)
})