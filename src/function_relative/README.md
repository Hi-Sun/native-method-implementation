bind 和 call/apply 的区别
是否立刻执行：
call/apply 改变了函数的 this 上下文后 马上 执行该函数。
bind 则是返回改变了上下文后的函数, 不执行该函数 。

返回值的区别:
call/apply 返回 fun 的执行结果。
bind 返回 fun 的拷贝，并指定了 fun 的 this 指向，保存了 fun 的参数
