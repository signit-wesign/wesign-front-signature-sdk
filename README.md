# 易企签开放平台前端签署SDK

为了方便第三方系统打开签署链接对应的页面以及获取签署页面内的签署操作的消息，封装了一个用于打开签署链接操作页面的SDK：wesign-signature-sdk.js

在页面引用入SDK脚本：

![0](https://user-images.githubusercontent.com/41995643/51877343-d402b000-23a6-11e9-82ea-0e6f7b463de5.png)

SDK脚本会在全局提供一个 **WesignSignatureSDK** 的类，这个类实例化以后会提供三个对外可操作的函数：*addEventListener*、*removeEventListener*、*close*，用于监听从签署页面传来的消息以及主动关闭弹窗。

## API

### WesignSignatureSDK (src)

WesignSignatureSDK 对象是一个类，通过new WesignSignatureSDK (href)来实例化这个类，需要传入签署链接（src）参数，在实例化完成后会自动打开对应的签署链接页面。

### 函数详情

#### addEventListener(type, listener)

这个函数用于监听从签署页面传递来的事件，type为监听的消息名称，listener为监听的回调函数。

#### removeEventListener(type, listener)

这个函数用于取消之前设置的监听，type为监听的消息名称，listener为需要取消监听的回调函数。

#### close()

调用这个函数来关闭该对象打开的签署页面

### 事件详情

#### operationcomplete

operationcomplete事件会在签署页面完成相关操作后返回，具体的相关操作在event对象的operation属性上，目前会传回消息的操作有5个：**REVOKE（撤销）、SIGN（签署）、 REJECTE（拒签）、 AUDIT_PASS（审核通过）、 AUDIT_NOTPASS（审核不通过）**

## 调用demo介绍

demo.html页面
易企签技术提供一个演示demo，帮助调用方快速理解SDK中事件的作用并且可直接进行测试：

1.访问demo

![0 1](https://user-images.githubusercontent.com/41995643/51877491-57240600-23a7-11e9-850b-39a43095b0f4.png)

2.输入签署链接

![0](https://user-images.githubusercontent.com/41995643/51877510-6d31c680-23a7-11e9-806f-6caf15604791.png)

3.点击“打开签署页面”

![0 1](https://user-images.githubusercontent.com/41995643/51877530-89356800-23a7-11e9-96c2-a0d67e8f479c.png)

4.签署人就在新开页面进行签署操作；

5.签署完成之后，返回到“调用方业务系统”，点击“关闭签署页面”可以直接将新开的签署页面自动关闭。

## 注意

1.  EDGE在本地打开HTML文件时，存在window.open执行无法返回窗口对象的问题，这会导致无法返回操作消息

## 开发

1.  安装依赖
    >   npm install

2.  启动开发服务器
    >   npm run dev

3.  访问本地8080端口