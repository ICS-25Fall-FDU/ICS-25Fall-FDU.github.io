# ICS 实验入门手册 2025

## I. Linux 系统

本学期的实验需要使用 Linux 系统。如果你的电脑不是 Linux 系统，则需要使用虚拟机安装 Linux 系统。

手册中介绍 VMWare Workstation Pro 和 WSL 2 两种虚拟机方案。 **建议 Windows 系统的同学选择 WSL 2。**

### VMWare Desktop Hypervisor

VMWare 在 Windows/macOS 系统上的虚拟化软件 Workstation Pro 以及 Fusion Pro 于2024年5月13日起供个人免费使用，可在[官方网站](https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion)下载。这两个虚拟化软件图形界面设计较为清晰，不需要额外教学，大家可以自行尝试。

VMWare Desktop Hypervisor 系列使用的系统镜像可以从镜像站下载，如[科大镜像站的 Ubuntu 镜像链接](https://mirrors.ustc.edu.cn/ubuntu-releases/)。我们推荐使用 Ubuntu 22.04 LTS 发行版，从上面的链接进去的话，可以在 `22.04/ubuntu-22.04.4-desktop-amd64.iso` 找到对应的镜像文件。

### WSL 2

WSL 2 是 Microsoft 推出的虚拟机方案，仅支持 Windows 系统，使用体验极佳。对于 Windows 10 2004 以上版本或 Windows 11 系统，可以参考 [WSL 官方文档](https://learn.microsoft.com/zh-cn/windows/wsl/install)安装 WSL 2。该文档中还包含其它一些有用的信息，推荐感兴趣的同学完整浏览，特别是跨系统文件访问和跨系统网络访问。（当然，完整浏览不是实验必要的）

> [!tip]
>
> * 如果直接 wsl --install 失败，请参考文档中提供的手动安装步骤和常见问题。仍有疑问欢迎联系 GPT 和助教。对于 C 盘可用容量堪忧的同学，可以参考[这篇知乎文章](https://zhuanlan.zhihu.com/p/621873601)来把 WSL 迁移到别的盘。
>
> * 注：**用户名不要用大写，不要用中文！**（经热心同学踩坑后加上）
>
> * WSL 已默认使用 WSL2，其与 WSL1 之间的差异见[官方文档](https://learn.microsoft.com/zh-cn/windows/wsl/compare-versions)。

### Mac 等特殊情况

部分实验基于 AMD64（又名 x86-64）架构设计。**如有使用 Mac M 系列芯片，或其它非 AMD64 指令集 CPU（如 RISC-V——~~不会真有人用吧~~）的同学，建议联系助教为你安排服务器进行实验，也可尝试 UTM 或 QEMU，但性能可能略低。**

### Linux 命令行

对于默认没有图形界面的 WSL 2，虽然你可以自行寻找教程安装合适的图形界面应用，但我们还是推荐你以使用命令行交互为主，这是因为命令行在后续实验中是必须掌握的基础技能。命令行的基本用法可以参考 [MIT Missing Semester](https://missing-semester-cn.github.io/) 上的第一、二节入门 Linux 命令行使用。

一般来说，各种命令都可以通过在后面加上 `--help` 的方式输出用法，如运行 `ls --help` 可输出 `ls` 命令的用法。
如果你需要更加详细的说明，可以通过 `man` 查询命令对应的文档，如 `man tar`，也可以在 [GNU 网站](https://www.gnu.org/software/software.html)上找到相关软件的具体说明。
另外推荐一个命令常用用法速查的命令行工具 `tldr` ，这是 [GitHub 仓库地址](https://github.com/tldr-pages/tldr)，可以自行安装。（看不懂怎么安装的话 `pip3 install tldr` 即可）

下面列出一些基本命令和操作：

```shell
# 查看当前目录
user@linux:~$ pwd
/home/user

# 查看当前目录下的文件夹
user@linux:~$ ls
ICS2025  OS2025

# 进入 ICS2025 目录
user@linux:~$ cd ICS2025

# 查看 ICS2025 目录下的文件
user@linux:~/ICS2025$ ls
manual.md  lab0.md

# 查看文件内容
user@linux:~/ICS2025$ cat manual.md
This is the course manual.

# 输出一行文字到屏幕
user@linux:~/ICS2025$ echo "Hello Linux"
Hello Linux

# 将输出写入文件（覆盖写入）
user@linux:~/ICS2025$ echo "new notes" > notes.txt
user@linux:~/ICS2025$ cat notes.txt
new notes

# 将命令输出重定向到文件
user@linux:~/ICS2025$ ls > filelist.txt
user@linux:~/ICS2025$ cat filelist.txt
lab0.md
manual.md
notes.txt
filelist.txt

# 使用管道：统计文件个数
user@linux:~/ICS2025$ ls | wc -l
4

# 复制文件
user@linux:~/ICS2025$ cp lab0.md lab0_copy.md
user@linux:~/ICS2025$ ls
filelist.txt  lab0.md  lab0_copy.md  manual.md  notes.txt

# 移动（或重命名）文件
user@linux:~/ICS2025$ mv lab0_copy.md lab1.md
user@linux:~/ICS2025$ ls
filelist.txt  lab0.md  lab1.md  manual.md  notes.txt

# 新建目录
user@linux:~/ICS2025$ mkdir experiments
user@linux:~/ICS2025$ ls
experiments/  filelist.txt  lab0.md  lab1.md  manual.md  notes.txt

# 把文件移动到子目录
user@linux:~/ICS2025$ mv notes.txt experiments/
user@linux:~/ICS2025$ ls experiments
notes.txt

# 删除文件
user@linux:~/ICS2025$ rm filelist.txt
user@linux:~/ICS2025$ ls
experiments/  lab0.md  lab1.md  manual.md

# 删除空目录
user@linux:~/ICS2025$ rmdir experiments
rmdir: failed to remove 'experiments': Directory not empty

# 先删除文件再删除目录
user@linux:~/ICS2025$ rm experiments/notes.txt
user@linux:~/ICS2025$ rmdir experiments
user@linux:~/ICS2025$ ls
lab0.md  lab1.md  manual.md

# 返回上一级目录
user@linux:~/ICS2025$ cd ..
user@linux:~$ ls
ICS2025  OS2025

# 使用管理员权限执行命令（示例）
user@linux:~$ sudo ls /root
[sudo] password for user: 
secret.txt
```

## II. 包管理器

> 以 Ubuntu 系统的 apt 包管理器为例，其它发行版可以自行查找有关资料。

包管理器全称是软件包管理器，顾名思义是用来管理软件包的软件。在大家熟悉的 Windows 系统中，通常下载软件就是去软件的官网上下载。而在 Linux 系统中，最常见的安装软件的方式是使用软件包管理器从“软件仓库”中下载。包管理器会负责一个软件的全生命周期，包括下载、安装、依赖关系、卸载、更新等等。

Ubuntu 发行版中带有 apt 和 dpkg 包管理器，我们一般使用 apt，基本用法可以参考 [Ubuntu 包管理器文档](https://ubuntu.com/server/docs/package-management)中的 apt 一节。完整的官方文档可以运行 man apt 查阅。（使用前请先看下一节进行换源！）

在后续课程中，如果遇到命令行提示说 `xxx not found`，可以尝试使用 apt 安装相应的软件包，如 `sudo apt install xxx`。

> [!note]
> 使用 apt 时一般都需要在前面加上 sudo。

你也可以自行安装 aptitude 包管理器，官方文档中也有对其的介绍。该管理器用法与 apt 类似，且提供了图形化界面。

### 换源（非常重要）

apt 默认的软件源服务器在国外，可能被 ***the Great Fire Wall*** 直接拦下。建议将其更换为科大镜像

> [!info]
>
> [FDUCSLG（复旦大学开放原子开源社团）](https://github.com/FDUCSLG) 已经搭建了复旦自己的镜像站 [https://mirrors.fducslg.com/](https://mirrors.fducslg.com/)，需要在校园网访问）

Ubuntu 的更换方法如下：

```shell
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
sudo sed -i 's@//.*archive.ubuntu.com@//mirrors.ustc.edu.cn@g' /etc/apt/sources.list
sudo apt update
```

其中第一行是将原来的文件进行备份，这只是一个好习惯而已。
上面几行的详细说明可以参考[这个链接](https://mirrors.ustc.edu.cn/help/ubuntu.html)，如果你使用其他发行版，也可以去这个链接中寻找相关说明。

> 如需要在命令行下使用代理，可以使用环境变量，或者可以了解一下 proxychains 这个工具。

## III. 常用软件

### VS Code

如果你使用的是 VMWare，可以将 VS Code 安装在虚拟机里，也可以通过本机上的 VSCode SSH 连接到虚拟机中进行开发。
如果你使用的是 WSL 2，直接将 VSCode 装在本机上即可[使用本机上的VS Code编辑和运行虚拟机中的代码](https://code.visualstudio.com/docs/remote/wsl)。

> [!tip]
>
> WSL2 常用用法：
> `code some.txt` 即可用 Windows 上的 VSCode 打开文件。
> `code .` 即可用 Windows 上的 VSCode 打开当前文件夹。

VS Code 会提示你安装常用插件，大家也可以自行在网上寻找好用的插件。关于 VS Code 安装与配置的问题，可参考 [VS Code 官方文档](https://code.visualstudio.com/docs)。

### Git

Git 的使用将贯穿本学期的所有实验。下一次实验（Lab 0）会详细介绍 Git 的使用，感兴趣的同学可以提前了解一下。

Git 的常用操作可以通过 [Git 学习网站](https://learngitbranching.js.org/?locale=zh_CN)学习，也可参考[视频](https://www.bilibili.com/video/BV1r3411F7kn)。完整的官方文档可以运行 man git 查阅。使用 VS Code 的同学有福了，Git 插件提供了非常好用的图形化界面。

此外，要将代码库上传到云端，你可能需要注册一个 [GitHub](https://github.com/) 或其它类似网站的账号~~，或许你可以注册一个账号给我们的[课程网站仓库](https://github.com/ICS-25Fall-FDU/ICS-25Fall-FDU.github.io)一个 star~~。一套完整使用 Git 的工作流程是：[链接](https://www.bilibili.com/video/BV19e4y1q7JJ)，大家之后在本课程和其他课程的组队任务可以试试这套流程。

### SSH

在 ICS 课程中没有直接使用 SSH 连接服务器的内容，但你可能需要[在 Git 中使用 SSH](https://docs.github.com/cn/authentication/connecting-to-github-with-ssh/)。SSH 的完整文档可以通过 man ssh 查阅。

如果你从未使用过 SSH，你可能需要为自己创建一个密钥对，参考指令：`ssh-keygen -t ed25519 -C "your_email@example.com"`。密钥对的默认保存位置为 `~/.ssh/`，其中的 `id_rsa` 为私钥，`id_rsa.pub` 为公钥。如果你好奇密钥是如何工作的，可以参考[这篇文章](https://www.ruanyifeng.com/blog/2011/08/what_is_a_digital_signature.html)。

### Vim

Vim 的基本用法为运行 `vim something.txt` 打开文件，然后按 `i` 键编辑文件，此时可以直接打字，完成后按 `ESC` 键，输入 `:wq` 保存并退出，或输入 `:q!` 不保存直接退出。

由于 Vim 有一些学习难度，大家当然可以直接选择开箱即用的 VS Code ，但是如果你习惯了 Vim 的操作，用起来就非常爽快。

Vim 的用法非常丰富，如有兴趣可以通过 Vim 自带的教程程序 `vimtutor` 学习（在安装 vim 之后直接在命令行输入这个即可），也可以通过 [Vim 学习网站](https://vim-adventures.com/)学习，或者参考[这个保姆级入门视频](https://www.bilibili.com/video/BV13t4y1t7Wg)。

> Copilot 官方提供了一个 [Vim 插件](https://github.com/github/copilot.vim)，可以让你在 Vim 中使用 Copilot。

## 参考资料

* ICS 实验入门手册 2024
