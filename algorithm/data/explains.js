define(() => {
    return {
        bubble: {
            title: 'Bubble Sort',
            desc: `
            Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent pairs and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm, which is a comparison sort, is named for the way smaller or larger elements "bubble" to the top of the list. Although the algorithm is simple, it is too slow and impractical for most problems even when compared to insertion sort.[2] Bubble sort can be practical if the input is in mostly sorted order with some out-of-order elements nearly in position.
            `
        },
        insert: {
            title: 'Insert Sort',
            desc: `
Insertion sort is a simple sorting algorithm that builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, insertion sort provides several advantages:
Simple implementation: Jon Bentley shows a three-line C version, and a five-line optimized version[2]
Efficient for (quite) small data sets, much like other quadratic sorting algorithms
More efficient in practice than most other simple quadratic (i.e., O(n2)) algorithms such as selection sort or bubble sort
Adaptive, i.e., efficient for data sets that are already substantially sorted: the time complexity is O(kn) when each element in the input is no more than k places away from its sorted position
Stable; i.e., does not change the relative order of elements with equal keys
In-place; i.e., only requires a constant amount O(1) of additional memory space
Online; i.e., can sort a list as it receives it
            `
        },
        select: {
            title: 'Select Sort',
            desc: `
            In computer science, selection sort is a sorting algorithm, specifically an in-place comparison sort. It has O(n2) time complexity, making it inefficient on large lists, and generally performs worse than the similar insertion sort. Selection sort is noted for its simplicity, and it has performance advantages over more complicated algorithms in certain situations, particularly where auxiliary memory is limited.
            `
        },
        heap: {
            title: 'Heap Sort',
            desc: `In computer science, heapsort is a comparison-based sorting algorithm. Heapsort can be thought of as an improved selection sort: like that algorithm, it divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region. The improvement consists of the use of a heap data structure rather than a linear-time search to find the maximum.`
        },
        quick: {
            title: 'Quick Sort',
            desc: `Quicksort (sometimes called partition-exchange sort) is an O(n log n) efficient sorting algorithm, serving as a systematic method for placing the elements of a random access file or an array in order. Developed by British computer scientist Tony Hoare in 1959[1] and published in 1961,[2] it is still a commonly used algorithm for sorting. When implemented well, it can be about two or three times faster than its main competitors, merge sort and heapsort.`
        },
        merge: {
            title: 'Merge Sort',
            desc: `In computer science, merge sort (also commonly spelled mergesort) is an efficient, general-purpose, comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the order of equal elements is the same in the input and output. Merge sort is a divide and conquer algorithm that was invented by John von Neumann in 1945.[2] A detailed description and analysis of bottom-up mergesort appeared in a report by Goldstine and von Neumann as early as 1948.`
        },
        shell: {
            title: 'Shell Sort',
            desc: `Shellsort, also known as Shell sort or Shell's method, is an in-place comparison sort. It can be seen as either a generalization of sorting by exchange (bubble sort) or sorting by insertion (insertion sort).[3] The method starts by sorting pairs of elements far apart from each other, then progressively reducing the gap between elements to be compared. Starting with far apart elements, it can move some out-of-place elements into position faster than a simple nearest neighbor exchange. Donald Shell published the first version of this sort in 1959.[4][5] The running time of Shellsort is heavily dependent on the gap sequence it uses. For many practical variants, determining their time complexity remains an open problem.`
        },
        count: {
            title: 'Count Sort',
            desc: `
该算法于1954年由 Harold H. Seward 提出
它是一个不需要比较的，类似于桶排序的线性时间排序算法。该算法是对已知数量范围的数组进行排序。其时间复杂度为O(n)，适用于小范围集合的排序。计数排序是用来排序0到100之间的数字的最 
好的算法。比如100万学生参加高考，我们想对这100万学生的数学成绩（假设分数为0到100）做个排序。 
基本思想： 
对于给定的输入序列中的每一个元素x，确定该序列中值小于x的元素的个数 。
一旦有了这个信息，就可以将x直接存放到最终的输出序列的正确位置上。
它创建一个长度为这个数据范围的数组C，C中每个元素记录要排序数组中对应记录的出现个数
            `
        }
    }
})