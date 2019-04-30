### Some sort and search algorithms popularly used

#### 项目的目的

有一天 Google 快速排序算法，得到了 Youtobe 上的一些视频，
这些视频非常形象地、以动画的形式展示了排序算法的执行过程，并且伴随声音。

我觉得很有意思，并且对于形象化地理解一个排序算法的过程很有帮助。
因此，自己在 Web 端实现了一下，主要涉及以下 API：

```
Graphic APIs of Canvas
requestAnimationFrame
performance.now
Generator (Convert an Array to generator.)

```

运行地址：

http://zhangxinghai.cn/algorithm/graph/index.html



#### 最新更新

实现了版本2（v2），对应的文件也都改为了 ***.v2.js。动画的生成方式改为：
```
先运行完 排序算法，并且统计运行时间，收集交换索引对，然后使用这两个数据来生成动画
```
其次，增加了 “Restore” 功能按钮，用于还原到初始数据。

#### Sort algorithm

1. 插入排序(√)
2. 希尔排序(√)
3. 选中排序(√)
4. 堆排序(√)
5. 冒泡排序(√)
6. 快速排序(√)
7. 归并排序(√)
8. 计数排序(√)
9. 桶排序(...)
10. 基数排序(...)

#### Search algorithm

1. 顺序查找(√)
2. 二分查找(√)
3. 插值查找(...)
4. 斐波那契查找(...)
5. 树表查找(...)
6. 分块查找(...)
7. 哈希查找(...)