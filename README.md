<!--
 * @Author: wangxuan
 * @Date: 2020-08-14 16:05:01
 * @LastEditors: wangxuan
 * @LastEditTime: 2020-12-30 09:44:25
 * @FilePath: /vue-misb/README.md
-->

## 项目地址

> https://github.com/iSpidercom/VUE-MISB

## 运行

```
git clone git@github.com:iSpidercom/VUE-MISB.git

npm install

// 开发环境
npm run dev

```

## 代码提交

```
// 合并代码到master之前
git checkout master

git pull

// 合并自己分支代码
git merge xxx

git push

// 确保自己本地代码为最新

```

> master 分支为生产环， master提[jekins](http://121.40.214.42:8080/) 构建 **web-pmsb生产** admin yilu_2018

## 房态状态码

1. OC 住净
2. OD 住脏
3. VD 脏房
4. VC 净房
5. OO 维修

## 重要字段

1. name__icontains 模糊搜索

## 房态显示角标

```
 room_state_extra = '10000000' // 团队
 room_state_extra = '01000000' // 欠款
 room_state_extra = '00100000' // 终点房
 room_state_extra = '00010000' // 将离
 room_state_extra = '00001000' // 联房
 room_state_extra = '00000100' // 自用
 room_state_extra = '00000010' // 自助机
 room_state_extra = '00000001' // 预定
```

## 支付状态

```
PAY_STATUS = (
  (0, '未结账'),  # 消费，或者成功的支付的初始化状态
  (1, '部分结账'),  # 部分结账后的状态
  (2, '已结账'),  # 可操作金额已经被操作为0之后的状态
  (3, '已冲账'),  # 只针对消费，
  (4, '已转账'),  # 转账到普通账户后的状态
  (5, '挂AR'),  # 转账到AR账户后的状态
  (6, '异常'),  # 未使用
  (7, '初始化'),  # 发起支付，拉起二维码
  (8, '正在退款'),  # 发起退款，还未成功
  (9, '已取消'),  # 关闭支付
)
```

## 可住房间

```
key : can_live_type
  1:入住
  2:预订
  3:换房
  4:排房
```

## http无法访问摄像头

1. 打开网址

> chrome://flags/
2. 搜索

> unsafely-treat-insecure-origin-as-secure

3. 粘贴http域名
> http://tpms.eloadspider.com/#/houseStaus

4. 改为enable

5. 重启浏览器