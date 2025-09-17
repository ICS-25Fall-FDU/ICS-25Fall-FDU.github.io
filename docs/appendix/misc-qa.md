# 杂项问题 Q & A

## 1. GitHub SSH 连接端口被占用问题

### 现象描述

执行任何 GitHub **SSH 方式**的仓库指令（如 `git clone git@github.com:ICS-25Fall-FDU/ICS-25Fall-FDU.github.io.git` ）出现以下报错：

```bash
ssh: connect to host github.com port 22: Connection refused
致命错误：无法读取远程仓库。

请确认您有正确的访问权限并且仓库存在。
```

运行 `ssh -t git@github.com` 时，出现报错：

```bash
ssh: connect to host github.com port 22: Connection refused
```

### 问题可能原因

大多数校园网、公司网络会屏蔽 SSH 的 22 端口，但允许 HTTPS（443 端口）。

### 解决方法

修改 SSH 配置文件，将 GitHub 的 SSH 端口从 22 改为 443。

1. 用任意文本编辑器（比如 VSCode ， Nano 等）打开 SSH 配置文件 `~/.ssh/config`。
2. 在任意处添加以下内容：

    ```text
    Host github.com
    Hostname ssh.github.com
    Port 443
    User git
    ```

3. 保存文件并退出编辑器。
4. 重试 `ssh -t git@github.com` 指令，应该可以成功连接了，现象：

    ```bash
    Hi {username}! You've successfully authenticated, but GitHub does not provide shell access.
    ```
