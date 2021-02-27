export const listObj = [
  {
    img: [require('@/assets/image/F.png')],
    report: '前台入账明细',
    inx: 0,
    tableColumn: [
      { type: 'seq', width: 60, title: '序号' },
      { field: 'room_num', title: '房间' },
      // { field: 'market_code_desc', title: '房间来源码' },
      { field: 'incoming_account_reason_desc', title: '入账原因' },
      { field: 'incoming_account_code_desc', title: '入账代码' },
      { field: 'pay_status_desc', title: '状态' },
      { field: 'charge_amount', title: '消费金额' },
      { field: 'cashier_desc', title: '收银点' },
      { field: 'create_user_name', title: '操作员' },
      { field: 'modify_datetime', title: '创建日期' }
    ]
  }, {
    img: [require('@/assets/image/F.png')],
    report: '前台入账简表',
    inx: 1,
    tableColumn: [
      { type: 'seq', width: 60, title: '序号' },
      { field: 'desc', title: '入账原因' },
      { field: 'amount', title: '金额' },
      { field: 'count', title: '笔数' }
    ]
  }, {
    img: [require('@/assets/image/F.png')],
    report: '前台收款明细',
    inx: 2,
    tableColumn: [
      { type: 'seq', width: 60, title: '序号' },
      { field: 'room_num', title: '房间号' },
      { field: 'name', title: '宾客' },
      { field: 'incoming_account_reason_desc', title: '付款方式' },
      { field: 'incoming_account_code_desc', title: '付款代码' },
      { field: 'charge_amount', title: '付款金额' },
      { field: 'cashier_desc', title: '收银点' },
      { field: 'create_user_name', title: '操作员' },
      { field: 'modify_datetime', title: '创建日期' }
    ]
  },
  {
    img: [require('@/assets/image/F.png')],
    report: '前台退款明细',
    inx: 15,
    tableColumn: [
      { type: 'seq', width: 60, title: '序号' },
      { field: 'room_num', title: '房间号' },
      { field: 'name', title: '宾客' },
      { field: 'incoming_account_reason_desc', title: '付款方式' },
      { field: 'incoming_account_code_desc', title: '付款代码' },
      { field: 'charge_amount', title: '付款金额' },
      { field: 'cashier_desc', title: '收银点' },
      { field: 'create_user_name', title: '操作员' },
      { field: 'modify_datetime', title: '创建日期' }
    ]
  }, {
    img: [require('@/assets/image/F.png')],
    report: '前台收退款汇总',
    inx: 3,
    tableColumn: [
      { type: 'seq', width: 60, title: '序号' },
      { field: 'desc', title: '支付方式' },
      { field: 'pay', title: '收款' },
      { field: 'refund', title: '退款' },
      { field: 'count', title: '笔数' }
    ]
  }, {
    img: [require('@/assets/image/F.png')],
    report: '前台转账明细',
    inx: 4,
    tableColumn: [
      { type: 'seq', width: 60, title: '序号' },
      { field: 'from_account.room_num', title: '转出房号' },
      { field: 'to_account.room_num', title: '转入房号' },
      { field: 'amount', title: '转账金额' },
      { field: 'create_user', title: '转账人员' },
      { field: 'create_datetime', title: '转账时间' },
      { field: 'desc', title: '摘要' }
    ]
  }, {
    img: [require('@/assets/image/F.png')],
    report: '冲账调账报表',
    inx: 5,
    tableColumn: [
      { type: 'seq', width: 60, title: '序号' },
      { field: 'room_num', title: '房间号' },
      { field: 'market_code_desc', title: '市场码' },
      { field: 'source_code_desc', title: '来源码' },
      { field: 'balance', title: '原始金额' },
      { field: 'arranged_amount', title: '冲调账金额' },
      { field: 'balance_after_arranged', title: '冲调账后金额' },
      { field: 'modify_datetime', title: '操作时间' },
      { field: 'modify_user', title: '操作员' }
    ]
  }, {
    img: [require('@/assets/image/A.png')],
    report: 'AR入账明细',
    inx: 6,
    tableColumn: [
      { type: 'seq', width: 60, title: '序号' },
      { field: 'room_num', title: '房间号' },
      { field: 'charge_amount', title: '金额' },
      { field: 'incoming_account_code_desc', title: '入账原因' },
      { field: 'incoming_account_code_desc', title: '入账代码' },
      { field: 'ar_account_name', title: 'AR账户' },
      { field: 'modify_datetime', title: '操作时间' },
      { field: 'modify_user_name', title: '操作员' }
    ]
  }, {
    img: [require('@/assets/image/A.png')],
    report: 'AR入账简表',
    inx: 7,
    tableColumn: [
      { type: 'seq', width: 60, title: '序号' },
      { field: 'desc', title: '入账原因' },
      { field: 'amount', title: '金额' },
      { field: 'count', title: '笔数' }
    ]
  }, {
    img: [require('@/assets/image/A.png')],
    report: 'AR收款明细',
    inx: 8,
    tableColumn: [
      { type: 'seq', width: 60, title: '序号' },
      { field: 'ar_account_name', title: 'AR账户' },
      { field: 'charge_amount', width: 90, title: '金额' },
      { field: 'incoming_account_reason_desc', title: '入账原因' },
      { field: 'incoming_account_code_desc', title: '入账代码' },
      { field: 'modify_datetime', title: '操作时间' },
      { field: 'modify_user_name', title: '操作员' }
    ]
  }, {
    img: [require('@/assets/image/A.png')],
    report: 'AR收款简表',
    inx: 9,
    tableColumn: [
      { type: 'seq', width: 60, title: '序号' },
      { field: 'desc', title: '入账原因' },
      { field: 'amount', title: '金额' },
      { field: 'count', title: '笔数' }
    ]
  }
  // {
  //   img: [require('@/assets/image/R.png')],
  //   report: '客房中心入账汇总表',
  //   count: '1',
  //   inx: 10
  // }, {
  //   img: [require('@/assets/image/R.png')],
  //   report: '商务中心入账汇总表',
  //   count: '1',
  //   inx: 11
  // },
  // {
  //   img: [require('@/assets/image/C.png')],
  //   report: '储值卡款项汇总表',
  //   count: '1',
  //   inx: 12
  // }, {
  //   img: [require('@/assets/image/C.png')],
  //   report: '储值卡充值明细表',
  //   count: '1',
  //   inx: 13
  // }
]
