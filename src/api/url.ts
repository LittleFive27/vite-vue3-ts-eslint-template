const ACTIVITY_ID = 64

export const url = {
  // 活动详情
  GET_ACTIVITY_DETAIL: `/api/v2/activity/fool/${ACTIVITY_ID}`,
  // 中奖日志（通知）
  GET_ALL_REWARD: `/api/v2/activity/all_reward/${ACTIVITY_ID}`,
  // 中奖日志（个人明细）
  GET_MY_TEAM_REWARD_LOG: `/api/v2/activity/get_my_team_reward_log/${ACTIVITY_ID}`,
  // 分享信息
  GET_SHARE_INFO: `/api/v2/activity/app_share/title?activity_id=${ACTIVITY_ID}`,
  // 查询用户所有信息
  GET_USER_ALL_INFO: '/api/v2/activity/capsule_toys/user_all_info',
  // 查询用户所有信息（立即参与）
  GET_USER_ALL_INFO_IS_APP: '/api/v2/activity/capsule_toys/user_all_info?is_app=1',
  // 任务列表
  GET_ALL_TASK: '/api/v2/activity/capsule_toys/all_task',
  // 签到
  GET_SIGN_IN: '/api/v2/activity/capsule_toys/sign_in',
  // 扭蛋
  GET_DRAW: '/api/v2/activity/capsule_toys/draw',
  // 超级扭蛋
  GET_DRAW_SUPER: '/api/v2/activity/capsule_toys/draw_super',
  // 金币流水
  GET_COINS_FLOW: '/api/v2/activity/capsule_toys/coins_flow'
}

export default url
