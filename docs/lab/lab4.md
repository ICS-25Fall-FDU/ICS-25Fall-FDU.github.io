# Lab4: Cachelab

> Deadline: 2025-12-11 23:59:59

## 实验概述

本实验为 CSAPP 第 6 章配套实验，目的是加深同学们对高速缓存 cache 的认识。实验分为三个部分：

- **Part A**：用 **C语言** 实现一个 cache 模拟器，使其能读取指定格式的 trace文件，并且输出命中、缺失、替换次数。我们已经为你提供一部分的代码。
- **Part B**：根据特定的 cache 参数设计一个矩阵转置的算法，使得矩阵转置运算中 cache 的 miss 次数尽可能低。
- **Honor Part**：实现矩阵乘法的 cache 友好版本。

考虑到PJ将至，助教将本次lab的难度相较于原版调低了一些（除了Honor Part，但Honor Part的分数很少），而且本次实验全程用 C语言（可以不用和抽象的汇编打交道了），所以大家不用过于担心~

分值分配：
- Part A: 40%
- Part B: 45%
- Honor Part: 10%
- 实验报告 + 代码风格: 15%

## 部署实验环境

> [!important]
>
> 点击 [此链接]() 领取作业

### 准备工作

- **gcc**：`gcc -v`，如未安装：`sudo apt-get install gcc`
- **make**：`make -v`，如未安装：`sudo apt-get update && sudo apt-get install make libc6 libc6-dev libc6-dev-i386`
- **python**：`python --version`（一般已有）
- **valgrind**：`sudo apt-get install valgrind`

## Part A

设计一个 cache 模拟器，读入指定格式的 trace 文件，模拟 cache 的运行过程，然后输出 cache 的命中、缺失、替换次数。trace 文件是通过 valgrind 的 lackey 工具生成的，它具有以下格式：

```
I 0400d7d4,8
 M 0421c7f0,4
 L 04f6b868,8
 S 7ff0005c8,8
```

每行格式为 ：

```
[space]operation address,size
```

其中`I`代表读指令操作，`L`代表读数据操作，`S`代表写数据操作，`M`代表修改数据操作（即读数据后写数据）。除
了`I`操作外，其他操作都会在开头都会有一个空格。`address`为操作的地址，`size`为操作的大小（单位为字节）。

你的所有实现都在 `csim.c` / `csim.h`中。你的全局变量和函数需要定义在`csim.h`中，你的函数实现需要在`csim.c`中。
我们在`ref-bin`文件夹下提供了一个`csim-ref`文件，这是一个参考实现，你可以通过它来检查你的实现是否正确，它的用法如下:

```bash
./ref-bin/csim-ref [-hv] -s <s> -E <E> -b <b> -t <tracefile>
```
- `-h` 代表帮助
- `-v` 代表 verbose, 即输出详细信息
- `-s` 代表 cache set index 的位数 (实际 cache 的 set 数 为 `2^s`)
- `-E` 代表每个 set 中的 cache line 的个数
- `-b` 代表块偏移位数（块大小 `B=2^b`）
- `-t` 代表trace文件的路径

`csim-ref`会输出 cache 的命中、缺失、替换次数，比如：

```bash
$ ./ref-bin/csim-ref -s 16 -E 1 -b 16 -t traces/yi.trace
hits:8 misses:1 evictions:0

$ ./ref-bin/csim-ref -v -s 16 -E 1 -b 16 -t traces/yi.trace
L 10,1 miss
M 20,1 hit hit
L 22,1 hit
S 18,1 hit
L 110,1 hit
L 210,1 hit
M 12,1 hit hit
hits:8 misses:1 evictions:0
```

>  [!NOTE] 
>
> **Task 1 (40 pts)**
>
> 你的实现需要具有和`csim-ref`相同的功能，包括`verbose`模式输出debug信息。
> 在`csim.c`中，我们已经为你提供了基本的解析命令行参数的代码，你需要在此基础上进行实现。
>
> **需求：**
>
> 1. 你的代码在编译时不能存在warning。
> 2. 你只能使用 **c语言** 来实现。
> 3. 虽然给了测试数据，但不允许面向数据编程，助教会做源码检查；不允许通过直接调用`csim-ref`来实现。

每次修改你的代码，在进行测试前先编译：

```bash
$ make clean && make                                           # 生成 ./csim
```

共有8项测试

```bash
$ ./csim -s 1 -E 1 -b 1 -t traces/yi2.trace
$ ./csim -s 4 -E 2 -b 4 -t traces/yi.trace
$ ./csim -s 2 -E 1 -b 4 -t traces/dave.trace
$ ./csim -s 2 -E 1 -b 3 -t traces/trans.trace
$ ./csim -s 2 -E 2 -b 3 -t traces/trans.trace
$ ./csim -s 2 -E 4 -b 3 -t traces/trans.trace
$ ./csim -s 5 -E 1 -b 5 -t traces/trans.trace
$ ./csim -s 5 -E 1 -b 5 -t traces/long.trace
```

原始分为：前7项每项3分，最后一项6分，共27分。对于每一项，hit、miss、eviction的正确性各占 1/3 的分数。

原始分会被乘以 40 / 27 得到最终的分数。

***最终的分数可以直接通过`python3 driver.py`来查看。***

### hints

- 可以使用`malloc`和`free`构造 cache。
- 你可以使用`csim-ref`来检查你的实现是否正确，通过开启`verbose`模式可以更好地debug。
- LRU算法可以简单地使用计数器的实现方式。

## Part B

cache为何被称为“高速缓存”，是因为读取cache的速率远快于读取主存的速率（可能大概100倍），因此cache  miss的次数往往决定了程序的运行速度。因此，我们需要尽可能设计cache-friendly的程序，使得cache miss的次数尽可能少。

在这部分的实验，你将对矩阵转置程序（一个非常容易cache miss的程序）进行优化，让cache miss的次数尽可能少。你的分数将由cache miss的次数决定。

> [!NOTE]
>
> **Task 2.1 (36 pts)**
>
> 你的所有实现都将在`trans.c`中。你将设计这样的一个函数：它接收四个参数：M，N，一个N * M的矩阵A和一个M * N的矩阵B，你需要把A转置后的结果存入B中。
>

```c
char trans_desc[] = "some description";
void trans(int M, int N, int A[N][M], int B[M][N])
{
    // your implementation here
}
```

每设计好一个这样的函数，你都可以在`registerFunctions()`中为其进行“注册”，只有“注册”了的函数才会被加入之后的评测中，你可以“注册”并评测多个函数；为上面的函数进行注册只需要将下面代码加入`registerFunctions()`中

```c
registerTransFunction(trans, trans_desc);
```

我们提供了一个名为`trans()`的函数作为示例。

你需要保证有一个且有唯一一个“注册”的函数用于最终提交，我们将靠“注册”时的description进行区分，请确保你的提交函数的description是“Transpose submission” ，比如：

```c
char transpose_submit_desc[] = "Transpose submission";
void transpose_submit(int M, int N, int A[N][M], int B[M][N])
{
    // your implementation here
}
```

我们将使用特定形状的矩阵和特定参数的cache来进行评测，所以你 **可以** 针对这些特殊情况来编写代码。

**要求**：

- 你的代码在编译时不能存在warning。
- 在每个矩阵转置函数中，你至多能定义12个int类型的局部变量（不包括循环变量，但你不能将循环变量用作其他用途），且不能使用任何全局变量。你不能定义除int以外类型的变量。你不能使用malloc等方式申请内存块。你可以使用int数组，但等同于数组大小的数量的int类型变量也同样被计入。
- 你不能使用递归。
- 你只允许使用一个函数完成矩阵转置的功能，而不能在函数中调用任何辅助函数。
- 你不能修改原始的矩阵A，但是你可以任意修改矩阵B。
- 你可以定义宏。

**评分**：

我们将使用cache参数为：`S = 48, E = 1, B = 48`。
我们将使用以下3种矩阵来进行评测：

  - 48 * 48的矩阵，分值`12`分，miss次数`< 500`则满分，miss次数`> 800`则0分，`500~800`将按miss次数获取一定比例的分数。
  - 96 * 96的矩阵，分值`12`分，miss次数`< 2200`则满分，miss次数`> 3000`则0分，`2200~3000`将按miss次数获取一定比例的分数。
  - 93 * 99的矩阵，分值`12`分，miss次数`< 3000`则满分，miss次数`> 4000`则0分，`3000~4000`将按miss次数获取一定比例的分数。

我们只会针对这三种矩阵进行测试，所以你 **可以** 只考虑这三种情况。

#### step 0

```bash
make clean && make
```

#### step 1

在测试之前，进行算法正确性的测试。

```bash
./tracegen -M <row> -N <col>
```

比如对48 * 48转置函数进行测试。

```bash
./tracegen -M 48 -N 48
```

你也可以对特定的函数进行测试，比如对第0个“注册”的函数。

```bash
./tracegen -M 48 -N 48 -F 0
```

#### step 2

```bash
./test-trans -M <row> -N <col>
```

这个程序将使用valgrind工具生成trace文件，然后调用csim-ref程序获取cache命中、缺失、替换的次数。

### hints

- 在调用`./test-trans`之后，可以使用如下命令查看你的cache命中/缺失情况；你可以把`f0`替换为`fi`来查看第 i 个“注册”的函数带来的cache命中/缺失情况。

```bash
./csim-ref -v -S 48 -E 1 -B 48 -t trace.f0 > result.txt
```

- [这篇文章可能对你有所启发](http://csapp.cs.cmu.edu/public/waside/waside-blocking.pdf)
- 你可能要考虑冲突带来的miss。
- 脑测一下你的miss次数或许是一个很好的选择，你可以计算一下大概有多少比例的miss，然后乘以总的读写次数；你可以在上面生成的`result.txt`文件中验证你的想法。
- 你可以认为A和B矩阵的起始地址位于某个cacheline的开始（即A和B二维数组的起始地址能被48整除）。

### 矩阵转置优化 Plus

> [!NOTE]
> **Task 2.2 (9 pts)**
> 1. 将 Part B 的 48 * 48 矩阵转置的 cache miss 优化到 **450 次以下** （4分）
> 2. 将 Part B 的 96 * 96 矩阵转置的 cache miss 优化到 **1900 次以下** （5分）

## Honor Part

恭喜你！你已经来到了 Cachelab 的**最后一部分**。

在完成了矩阵转置的优化后，我们来研究一个更具挑战性的问题：**矩阵乘法的缓存优化**。

```c
for (int i = 0; i < N; i++) {
    for (int j = 0; j < N; j++) {
        C[i][j] = 0;
        for (int k = 0; k < M; k++) {
            C[i][j] += A[i][k] * B[k][j];
        }
    }
}
```

这段代码是实现矩阵乘法的最朴素算法，虽然看起来很简洁优雅，但从缓存角度分析，存在严重的性能问题。我们不妨分析一下是哪里出现了问题。

假设矩阵按行优先存储，我们来分析一下内循环（`k` 循环）中的访问模式：

   对于`C[i][j]`，每次迭代访问同一地址，编译器通常会用寄存器优化。

   对于`A[i][k]`，随着 `k` 增加，沿着 A 的第 `i` 行连续访问。

   对于`B[k][j]`，每次 `k` 增加 1，需要跳过整整一行，相当于**按列访问**矩阵 B。

显然，在这里`B[k][j]`的读取导致了**大量的 cache miss**。由于按列访问，虽然每次加载一个 cache line ，但只使用其中一个元素就跳到下一行，缓存利用率很低。我们或许可以考虑更改循环顺序（比如把 k 调到中间那一层循环？）但是即使改变了循环顺序，当矩阵较大时，整个矩阵仍然无法完全放入缓存，还是会产生**大量的 cache miss**。所以我们可以考虑将大矩阵分解为小块，每次只处理能装入缓存的小块，这也就是分块算法的原理。

对于 $C = A \times B$，我们可以将矩阵分块：

$$
\begin{bmatrix}
C_{11} & C_{12} \\
C_{21} & C_{22}
\end{bmatrix} = 
\begin{bmatrix}
A_{11} & A_{12} \\
A_{21} & A_{22}
\end{bmatrix} \times
\begin{bmatrix}
B_{11} & B_{12} \\
B_{21} & B_{22}
\end{bmatrix}
$$

其中每个子块的计算为：
$C_{ij} = \sum_{k} A_{ik} \times B_{kj}$
当然，这里提出的分块算法只是抛砖引玉，想要通过Honor Part还需在此基础上继续思考和优化。大家八仙过海，各显神通吧！

#### 测试环境

**矩阵规模**：$A_{32 \times 32}$, $B_{32 \times 32}$，计算 $C = A \times B$

**缓存配置**：

- 组数 S = 32
- 相连度 E = 1
- 块大小 B = 32

> [!NOTE]  
> **Task 3 (10 pts)**
>
> 在 `honor-part/mul.c` 的 `mul_submit` 函数中实现矩阵乘法算法，要求 **cache miss < 4000**。
>
> 需求（同Part B):
>
> 1. 最多定义 **16 个 int 类型**的局部变量（循环变量不计入，但不能将循环变量用作其他用途）。
> 2. 不能修改矩阵 A 和 B，但可以任意修改矩阵C。

#### 测试方法

```bash
cd honor-part
make clean && make
./build/bin/test-mul -M 32 -N 32
```

输出示例：

```bash
Function 0 (1 total)
Step 1: Validating and generating memory traces
Step 2: Evaluating performance (s=32, E=1, b=32)
func 0 (multiply submission): hits:XXXX, misses:YYYY, evictions:ZZZZ

Summary for official submission (func 0): correctness=1 misses=YYYY
TEST_MUL_RESULTS=1:YYYY
```

## 提交

实验报告中可以包括下面内容：

- 代码运行效果展示
- 实现思路和创新点
- 对后续实验的建议
- 其他任何你想写的内容

实验报告及代码通过 Github 提交。

## 参考资料

- CMU 原版 Lab: http://csapp.cs.cmu.edu/3e/labs.html
- 本实验参考 2023、2024 年的 Cachelab 实验开发
  
> 负责助教： 项正豪 @[xzh2004](https://github.com/xzh2004) 蔡亦扬 @[Caibao7](https://github.com/Caibao7)