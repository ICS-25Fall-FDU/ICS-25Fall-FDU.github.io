# Lab1: DataLab

## 实验简介

CSAPP 第一章配套实验。

本实验是 CSAPP 第一章配套实验，目的是加深同学们对整数和浮点数二进制表示的认识。同学们需要解出若干程序谜题，编写代码并通过正确性测试，最后提交代码和报告。希望同学们多加思考，在解题过程中能学到的远不止二进制本身，还能加深对位运算的理解，以及学到一些算法知识。

本实验的满分为 110 分。每迟交一天（迟交 1ms 到 24h 均视作一天）会在你的得分上扣除 5 分，扣完为止，报告另外算分。例如：如果你迟交一天，但是完成了 107 分的作业，则你的实验得分为 100 分，多余的 2 分可以加到报告的分数上。

## 部署实验环境

### 领取作业并克隆仓库到本地

从 `GitHub Classroom` 拉取 `lab1-datalab-xxx` 仓库，其中的内容就是本次实验用到的文件了，拉取指令如下：

```shell
git clone git@github.com:ICS-25Fall-FDU/lab1-datalab-xxx.git  # 将 xxx 替换为你的 GitHub 用户名
cd lab1-datalab-xxx
```

### 安装必要软件

#### 确保已安装了 gcc

在终端中检查是否安装了 gcc：

```shell
gcc -v
```

如果已安装，终端将会反馈版本信息，否则会反馈 `command not found` 。

如未安装，尝试执行以下命令进行安装：

```shell
sudo apt-get install gcc
```

#### 确保已安装了 make

检查是否安装 make，在终端输入：

```shell
make -v
```

同理，如未安装，尝试以此执行以下命令：

```shell
sudo apt-get update
sudo apt-get install make
```

本实验需要用到以下 C 运行库和编译包：

```shell
sudo apt-get install libc6 libc6-dev libc6-dev-i386
```

#### 确保实验文件能正常 make 并运行测试

键入 `ls` 查看内容，你应当看到如下文件：

```shell
Driverhdrs.pm  Driverlib.pm  Makefile  README  bits.c  bits.h  btest  btest.c
btest.h  decl.c  dlc  driver.pl  fshow  fshow.c  ishow  ishow.c  test.sh  tests.c
```

在终端中依次执行如下命令，以生成可执行文件并执行：

```shell
make clean
make all
./btest
```

如果过程顺利，最后会输出测试结果，最后一行为 `Total points: 0/69` 。

如果过程中出现如下报错：

```shell
/usr/bin/ld: cannot found -lgcc
```

那么尝试执行：

```shell
sudo apt install gcc-multilib
```

#### 确保 dlc（data lab compiler）能正常执行

执行：

```shell
./dlc bits.c
```

如果遇到 `./dlc: Permission denied`，说明没有当前文件的执行权限，执行:

```shell
chmod +x dlc
```

增加执行权限。

如果执行立即结束并且没有任何反馈，则没有问题。

## 实验提示与说明

### 如何入手

推荐阅读顺序：本文档 > `README` > `bits.c` 的注释部分。

`README` 文档中对实验文件做了较为详细的介绍。`bits.c` 是同学们唯一需要编辑的文件，其中包含了谜题规则介绍，18 个谜题以及谜题内容、难度、分数等。上面的两个文件请务必仔细阅读。

注意到，每一个谜题包含了如下信息：

* 能使用的运算符。
* 能使用的运算符总数量。
* 能使用的常数的值域范围。
* 变量类型。
* 能否使用控制语句（如 `if` ）等。

### 测试

* 除了 `bits.c` ，你不应该编辑任何其余文件。

* 完成谜题后，需要检验自己的代码是否正确：

  * 首先，执行下述指令，检查每个函数使用的运算符类型、数目是否符合要求：

  * ```shell
    ./dlc -e bits.c
    ```

  * 如没有任何报错，按顺序执行下述指令，测试每个函数的正确性：

  * ```shell
    make clean
    make all
    ./btest
    ```

  * `btest` 执行时会给出每个谜题（函数）是否通过测试（未通过时会给出测试数据），并且会计算你的最终得分。

* 你可以利用上 `./ishow` 和 `./fshow` 来帮助你调试（用法见 `README`）。

## 提交实验

### 内容要求

你需要提交至少两份文件，包含你的 `bits.c` 和一份实验报告。

实验报告应该包含以下内容：

* 实验标题，你的姓名，学号。
* 你在终端中执行 `./dlc -e bits.c` 后的截图。
* 你在终端中执行 `./btest` 后的截图。
* 描述你实现每个函数的思路。`bits.c` 中不要求给自己的代码写注释（写了也无妨）
* 如果有，请务必在报告中列出引用的内容以及参考的资料。
* 对本实验的感受（可选）。
* 对助教们的建议（可选）。

### 格式要求

可提交 `.md` 文件或者 `.pdf` 文件。请勿提交 `.doc` 或 `.docx` 文件。  
（如果提交 `.md` 文件，请确保助教能同时看到你报告中的截图！）

> [!tip]
>
> 在你的 Markdown 报告中插入图片时，使用 **相对路径** 并将图片一并上传到 GitHub。如果你不确定这一步是否正确，请进入你的远程仓库预览你的报告。

### 上传

打开终端，**在 `lab1-datalab-xxx` 路径下** 执行以下指令：

```shell
# 提交当前文件夹下的所有更改到暂存区
git add -A

# 将暂存区的所有更改提交到本地仓库
git commit -m "xxx(可以是你的提交注释)"

# 将本地仓库推送到远程
git push
```

### 评分规则

* 实验报告要求简洁清晰，不必追求字数，描述清楚思路即可。
* 对每道谜题请先做思考，不要立即使用搜索引擎，如果使用了 AI，请在提交的报告中注明。
* 严禁抄袭其它人的代码，一旦发现，零分处理。

## 参考资料

* [CMU 原版 Lab](http://csapp.cs.cmu.edu/3e/labs.html)
* 本文档编写时参考了 24 年的实验文档 。

> [!info] 本 Lab 负责助教
>
> * [蔡亦扬](mailto:caiyy23@m.fudan.edu.cn)
> * [项正豪](mailto:zhxiang23@m.fudan.edu.cn)
>
> **特别鸣谢**：24 年秋学期 ICS 助教李增昊
