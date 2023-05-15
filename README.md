# eam-server

EAM（企业资产管理系统）服务端使用[Nest.js](https://nestjs.com/)构建。

企业资产管理系统小程序端位于[eam-mini-program](https://github.com/Edward-Brock/eam-mini-program)，欢迎访问。

## 项目介绍

搭建轻量型企业资产管理系统，通过使用设备自带的图像捕捉工具或外置图像捕捉工具，扫描预制生成、固定生成的二维码、一维码或其他类型的资产标签，显示当前资产内容。

## 使用技术

- [TypeORM](https://typeorm.io/)
- [Node MySQL 2](https://github.com/sidorares/node-mysql2)
- [Axios](https://axios-http.com/)

## 文件结构

- config
  - env.ts：env 环境判断切换
- modules
  - asset：资产设备模块
  - option：EAM 设置模块
  - upload：文件模块
  - user：用户模块

## 如何使用

### 安装依赖

```shell
cd eam-server
npm install
```

### 调试

`npm run start:dev`

### 运行

`npm run start`

## 已完成的功能

- 用户模块
  - [x] 用户创建
  - [x] 通过临时 CODE 获取 OPENID 和 SESSION
  - [x] 用户更新
  - [x] 用户删除
- 资产模块
  - [x] 资产创建
  - [x] 通过类别获取资产金额
  - [x] 通过类别获取资产总数及相关信息
  - [x] 资产更新
  - [x] 资产删除
- 设置模块
  - [x] 设置创建
  - [x] 设置更新
  - [x] 设置删除
- 文件模块
  - [x] 文件上传
  - [x] 文件下载

## LICENSE

[GNU General Public License v3.0](LICENSE)
