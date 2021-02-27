export const reportObj = [
  {
    parant: {
      name: '财务报表',
      children: [
        {
          name: '冲调账报表',
          inx: 0,
          tableColumn: [
            { field: 'arranged_amount', title: '调账金额' },
            { field: 'balance_after_arranged', title: '剩余金额' },
            { field: 'account.room_num', title: '房间号' },
            { field: 'account.biz_date', title: '财务日期' },
            { field: 'modify_datetime', title: '调账时间' },
            { field: 'account.market_code_desc', title: '市场码' },
            { field: 'account.source_code_desc', title: '来源码' },
            { field: 'desc', title: '备注' },
            { field: 'modify_user', title: '操作人' }
          ]
        },
        {
          name: 'AR入账简表',
          inx: 1,
          tableColumn: [
            { field: 'amount', title: '金额' },
            { field: 'desc', title: '房费' },
            { field: 'count', title: '笔数' }
          ]
        },
        {
          name: 'AR账户实时余额表',
          inx: 2,
          tableColumn: [
            { field: 'name', title: '姓名' },
            { field: 'account.pay_amount', title: '支付' },
            { field: 'account.total_consumption', title: '消费' },
            { field: 'account.balance', title: '余额' },
            { field: 'account.total_refund', title: '退款金额' },
            { field: 'ar_status_desc', title: 'AR状态' }
          ]
        },
        // {
        //   name: 'AR账户收款汇总表',
        //   inx: 3
        // },
        {
          name: 'AR付款明细',
          inx: 4,
          tableColumn: [
            { field: 'ar_account_name', title: 'AR名称' },
            { field: 'incoming_account_reason_desc', title: '入账原因' },
            { field: 'incoming_account_code_desc', title: '入账代码' },
            { field: 'account.pay_amount', title: '付款金额' },
            { field: 'pay_status_desc', title: '付款状态' },
            { field: 'charge_amount', title: '消费金额' },
            { field: 'biz_date', title: '日期' },
            { field: 'desc', title: '备注' }
          ]
        },
        {
          name: 'AR收款简表',
          inx: 5,
          tableColumn: [
            { field: 'desc', title: '方式' },
            { field: 'amount', title: '金额' },
            { field: 'count', title: '笔数' }
          ]
        },
        {
          name: 'AR账户入账明细表',
          inx: 6,
          tableColumn: [
            { field: 'ar_account_name', title: 'AR账户名称' },
            { field: 'room_num', title: '房间号' },
            { field: 'incoming_account_reason_desc', title: '入账原因' },
            { field: 'incoming_account_code_desc', title: '入账代码' },
            { field: 'account.pay_amount', title: '付款金额' },
            { field: 'charge_amount', title: '消费金额' },
            { field: 'account.balance', title: '余额' },
            { field: 'modify_datetime', title: '操作时间' },
            { field: 'desc', title: '备注' }
          ]
        },
        // {
        //   name: '催账报表',
        //   inx: 7
        // },
        // {
        //   name: '消费详情表',
        //   inx: 8
        // },
        // {
        //   name: '收银清单',
        //   inx: 9
        // }，
        {
          name: '前台转账记录表',
          inx: 10,
          tableColumn: [
            { field: 'from_account.room_num', title: '转出房间' },
            { field: 'to_account.room_num', title: '转入账户' },
            { field: 'amount', title: '金额' }
          ]
        },
        {
          name: '哑房帐报表',
          inx: 63,
          tableColumn: [
            { field: 'room_number', title: '房间号' },
            { field: 'subject_desc', title: '类型' },
            { field: 'biz_date', title: '营业日期' },
            { field: 'charge_amount', title: '消费金额' },
            { field: 'can_arrange', title: '可操作金额' },
            { field: 'pay_status_desc', title: '订单状态' },
            { field: 'incoming_account_reason_desc', title: '入账原因' },
            { field: 'incoming_account_code_desc', title: '入账代码' },
            { field: 'create_user_name', title: '创建人' },
            { field: 'modify_user_name', title: '修改人' }
          ]
        }
      ]
    }
  },
  {
    parant: {
      name: '综合报表',
      children: [
        {
          name: '营业日报（区间）表',
          inx: 11,
          tableColumn: [
            { field: 'project', title: '项目' },
            { field: 'interval', title: '本期' }
          ]
        },
        {
          name: '营业日报表',
          inx: 12
        }
        // {
        //   name: '销售员业绩汇总报表',
        //   inx: 13
        // },
        // {
        //   name: '销售分析汇总表',
        //   inx: 14
        // },
        // {
        //   name: '销售分析明细表',
        //   inx: 15
        // },
        // {
        //   name: '销售分析区间报表',
        //   inx: 16
        // },
        // {
        //   name: '市场码渠道分析表',
        //   inx: 17
        // },
        // {
        //   name: '业主分成收入汇总表',
        //   inx: 18
        // },
        // {
        //   name: '业主分成收入明细表',
        //   inx: 19
        // }
      ]
    }
  },
  {
    parant: {
      name: '房单报表',
      children: [
        // {
        //   name: '指定日期零房价报表',
        //   inx: 20
        // },
        // {
        //   name: '指定日期免费房报表',
        //   inx: 21
        // },
        // {
        //   name: '指定日期自用房报表',
        //   inx: 22
        // },
        // {
        //   name: '免费升级明细表',
        //   inx: 23
        // },
        // {
        //   name: '*当前在住免费房报表',
        //   inx: 24
        // },
        {
          name: '当前在住全日房报表',
          inx: 25,
          tableColumn: [
            { field: 'room_number', width: 80, title: '房号' },
            { field: 'room_type_desc', title: '房型' },
            { field: 'master_guest_list', title: '姓名' },
            { field: 'code_market_desc', title: '市场码' },
            { field: 'code_src_desc', title: '来源码' },
            { field: 'from_name', overflow: true, title: '团队|会员|协议' },
            { field: 'arr_time', title: '到达时间' },
            { field: 'leave_time', title: '离店时间' },
            { field: 'room_price', width: 80, title: '房价' },
            { field: 'remark', overflow: true, title: '备注' }
          ]
        },
        // {
        //   name: '*当前在住钟点房报表',
        //   inx: 26
        // },
        // {
        //   name: '*当前在住夜宵房报表',
        //   inx: 27
        // },
        // {
        //   name: '*当前在住常住房报表',
        //   inx: 28
        // }
        {
          name: '*当前在住客人报表',
          inx: 29,
          tableColumn: [
            { field: 'name', title: '宾客' },
            { field: 'room_type_desc', title: '房型' },
            { field: 'room_number', title: '房号' },
            { field: 'market_desc', title: '市场码' },
            { field: 'id_no', title: '证件号' },
            { field: 'sex', title: '性别' },
            { field: 'telephone', title: '电话号码' },
            { field: 'price', title: '房价' },
            { field: 'arr_time', title: '入住时间' },
            { field: 'leave_time', title: '离店时间' }
          ]
        },
        // {
        //   name: '当前在住客人余额报表',
        //   inx: 30
        // },
        {
          name: '*换房改房价报表',
          inx: 31,
          tableColumn: [
            { field: 'old_room_type_desc', title: '原房型' },
            { field: 'old_room', title: '原房号' },
            { field: 'new_room_type_desc', title: '新房型' },
            { field: 'new_room', title: '新房号' },
            { field: 'change_reason', title: '更换原因' },
            { field: 'discount', title: '折扣额' },
            { field: 'remark', title: '备注' },
            { field: 'create_user', title: '接单人' },
            { field: 'modify_user', title: '改单人' }
          ]
        },
        // {
        //   name: '*本日续住报表',
        //   inx: 32
        // },
        // {
        //   name: '*本日将离客人报表',
        //   inx: 33,
        //   tableColumn: [
        //     { type: 'seq', width: 60, title: '序号' },
        //     { field: 'room_number_list', title: '房间号' },
        //     { field: 'room_type_desc', title: '房型' },
        //     { field: 'days', title: '入住天数' },
        //     { field: 'arr_time', title: '到达时间' },
        //     { field: 'leave_time', title: '离店时间' },
        //     { field: 'modify_user', title: '操作人' }
        //   ]
        // }
        // {
        //   name: '*本日离店客人报表',
        //   inx: 34
        // },
        // {
        //   name: '*本日入住客人报表',
        //   inx: 35
        // },
        {
          name: '本日入住散客报表',
          inx: 36,
          tableColumn: [
            { field: 'room_number', title: '房间号' },
            { field: 'name', title: '姓名' },
            { field: 'id_code', title: '证件' },
            { field: 'id_no', title: '证件号' },
            { field: 'country_code', title: '国籍' },
            { field: 'arr_time', title: '抵店时间' },
            { field: 'leave_time', title: '离店时间' },
            { field: 'remark', title: '备注' }
          ]
        }
        // {
        //   name: '本日入住团队成员报表',
        //   inx: 37
        // },
        // {
        //   name: '当前在住早餐明细表',
        //   inx: 38
        // },
        // {
        //   name: '当前在住早餐汇总表',
        //   inx: 39
        // },
        // {
        //   name: '本日延迟退房客人报表',
        //   inx: 40
        // }
      ]
    }
  },
  {
    parant: {
      name: '房态报表',
      children: [
        // {
        //   name: '当前维修房报表',
        //   inx: 41
        // },
        // {
        //   name: '历史维修房报表',
        //   inx: 42
        // },
        // {
        //   name: '历史维修房--解除报表',
        //   inx: 43
        // },
        // {
        //   name: '房态管理报表',
        //   inx: 44
        // },
        {
          name: '实时房态报表',
          inx: 45,
          tableColumn: [
            { field: 'room_no', title: '房间号' },
            { field: 'room_type_name', title: '房型' },
            { field: 'room_state', title: '当前房态' },
            { field: 'room_class_name', title: '房类' },
            { field: 'building_name', title: '楼栋' },
            { field: 'arr_time', title: '抵店时间' },
            { field: 'leave_time', title: '离店时间' }
          ]
        },
        // {
        //   name: '可用房报表',
        //   inx: 46
        // },
        // {
        //   name: '当前临时锁房报表',
        //   inx: 47
        // },
        // {
        //   name: '当前临时锁房区间查询',
        //   inx: 48
        // },
        // {
        //   name: '历史临时锁房报表',
        //   inx: 49
        // },
        // {
        //   name: '历史临时锁房-解除报表',
        //   inx: 50
        // },
        // {
        //   name: '客房清洁任务表',
        //   inx: 51
        // }
        {
          name: '客房房间出租表',
          inx: 62,
          tableColumn: [
            { field: 'room_number', title: '房间号' },
            { field: 'room_type_desc', title: '房型' },
            { field: 'room_floor', title: '楼层' },
            { field: 'count', title: '出租数' },
            { field: 'percentage', title: '出租率' }
          ]
        }

      ]
    }
  },
  // {
  //   parant: {
  //     name: '宾客报表',
  //     children: [
  //       {
  //         name: '营业日报（区间）表',
  //         inx: 52
  //       },
  //       {
  //         name: '营业日报表',
  //         inx: 53
  //       },
  //       {
  //         name: '销售员业绩汇总报表',
  //         inx: 54
  //       }，
  //       {
  //         name: '销售员业绩汇总报表',
  //         inx: 55
  //       }，
  //     ]
  //   }
  // },
  {
    parant: {
      name: '预定报表',
      children: [
        // {
        //   name: '指定日期预定报表',
        //   inx: 56
        // },
        // {
        //   name: '指定日期团队预定表(含房价)',
        //         inx: 57
        // },
        // {
        //   name: '指定日期团队预定表(无房价)',
        //         inx: 58
        // },
        // {
        //   name: '指定日期Cancel报表',
        //         inx: 59
        // },
        // {
        //   name: '指定日期Noshow报表',
        //         inx: 56
        // },
        {
          name: '本日将到客人报表',
          inx: 61,
          tableColumn: [
            { field: 'reserve_base.order_no', title: '预定单号' },
            { field: 'reserve_base.name', title: '姓名' },
            { field: 'room_number_list', title: '房号' },
            { field: 'room_type', title: '房型' },
            { field: 'room_count', title: '房数' },
            { field: 'days', title: '天数' },
            { field: 'arr_time', title: '到达日期' },
            { field: 'leave_time', title: '离店日期' },
            { field: 'price', title: '房价' },
            { field: 'modify_user', title: '销售员' },
            { field: 'remark', title: '备注' }
          ]
        },
        {
          name: '离店客人报表',
          inx: 64,
          tableColumn: [
            { field: 'order_no', width: 130, title: '预定单号' },
            { field: 'master_guest_list', title: '姓名' },
            { field: 'room_number', width: 80, title: '房号' },
            { field: 'room_type_desc', title: '房型' },
            { field: 'days', width: 50, title: '天数' },
            { field: 'from_name', overflow: true, title: '团｜会｜协' },
            { field: 'code_market_desc', width: 80, title: '市场码' },
            { field: 'code_src_desc', width: 90, title: '来源码' },
            { field: 'arr_time', width: 135, title: '到达日期' },
            { field: 'leave_time', width: 135, title: '离店日期' },
            { field: 'room_price', width: 80, title: '房价' },
            { field: 'modify_user', width: 90, title: '销售员' },
            { field: 'remark', overflow: true, title: '备注' }
          ]
        }
      ]
    }
  }
  // {
  //   parant: {
  //     name: '事管家报表',
  //     children: [
  //       {
  //         name: '营业日报（区间）表'
  //       },
  //       {
  //         name: '营业日报表'
  //       },
  //       {
  //         name: '销售员业绩汇总报表'
  //       }
  //     ]
  //   }
  // },
  // {
  //   parant: {
  //     name: '发票审核报表',
  //     children: [
  //       {
  //         name: '营业日报（区间）表'
  //       },
  //       {
  //         name: '营业日报表'
  //       },
  //       {
  //         name: '销售员业绩汇总报表'
  //       }
  //     ]
  //   }
  // },
  // {
  //   parant: {
  //     name: '库存报表',
  //     children: [
  //       {
  //         name: '营业日报（区间）表'
  //       },
  //       {
  //         name: '营业日报表'
  //       },
  //       {
  //         name: '销售员业绩汇总报表'
  //       }
  //     ]
  //   }
  // },
  // {
  //   parant: {
  //     name: '其他综合报表',
  //     children: [
  //       {
  //         name: '营业日报（区间）表'
  //       },
  //       {
  //         name: '营业日报表'
  //       },
  //       {
  //         name: '销售员业绩汇总报表'
  //       }
  //     ]
  //   }
  // }
]

