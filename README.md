# eam-server

EAM（企业资产管理系统）服务端使用[Nest.js](https://nestjs.com/)构建。

企业资产管理系统小程序端位于[eam-mini-program](https://github.com/Edward-Brock/eam-mini-program)，欢迎访问。

## 项目介绍

搭建轻量型企业资产管理系统，通过使用设备自带的图像捕捉工具或外置图像捕捉工具，扫描预制生成、固定生成的二维码、一维码或其他类型的资产标签，显示当前资产内容。

## 使用技术

- [TypeORM](https://typeorm.io/)
- [Node MySQL 2](https://github.com/sidorares/node-mysql2)

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

## LICENSE

[GNU General Public License v3.0](LICENSE)
