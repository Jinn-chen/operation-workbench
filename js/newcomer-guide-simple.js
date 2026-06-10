/**
 * 简化版新手指南
 */
class NewcomerGuide {
  constructor() {
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    // 渲染简单内容
    const container = document.getElementById('ngContent');
    if (container) {
      container.innerHTML = `
        <h1>存客运营新人指导书</h1>
        <p><strong>版本：V1.0</strong> | 产品运营部 | 2023年6月</p>
        <p>本手册涵盖业务需求调研、业务需求建设、业务效果优化、经验沉淀四大模块。</p>

        <h2>前言与概述</h2>
        <h3>什么是存量客户运营</h3>
        <p>银行存量客户是指银行已有的客户群体。调查显示，银行对存量客户进行挖掘经营的<strong>转化成本远低于获新客的成本</strong>。</p>

        <h3>常见存客经营场景</h3>
        <table>
          <tr><th>场景</th><th>说明</th></tr>
          <tr><td>手机银行促活</td><td>通过活动权益推送激发用户登录手机银行的意愿和次数</td></tr>
          <tr><td>资产提升</td><td>通过系列手段提升客户在银行的资产持有量</td></tr>
        </table>

        <h2>一、需求调研</h2>
        <h3>1. 明确客户目标</h3>
        <p>与客户充分沟通，了解推广目标和预期效果，再制定对应的运营策略。</p>

        <h3>2. 调查当前业务指标</h3>
        <ul>
          <li>客群规模：省行客户总数、手机银行客户数</li>
          <li>外呼总量：日均/月均呼叫量</li>
          <li>外呼频率：当前触达频率</li>
        </ul>

        <h2>八、数据分析与迭代优化</h2>
        <h3>核心指标</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div style="border: 1px solid #e8e8e8; padding: 16px; border-radius: 8px;">
            <h4>接通率</h4>
            <p style="color: #666;">触达人数/呼叫客群数</p>
          </div>
          <div style="border: 1px solid #e8e8e8; padding: 16px; border-radius: 8px;">
            <h4>转化率</h4>
            <p style="color: #666;">达标人数/触达人数</p>
          </div>
        </div>

        <div style="margin-top: 40px; padding: 20px; background: #f5f7fa; border-radius: 8px;">
          <h3>漏斗分析</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="padding: 12px; background: #1890ff; color: white; border-radius: 4px;">
              客群人数：10,000
            </div>
            <div style="padding: 12px; background: #40a9ff; color: white; border-radius: 4px;">
              接通人数：6,500
            </div>
            <div style="padding: 12px; background: #73d13d; color: white; border-radius: 4px;">
              意向人数：1,200
            </div>
            <div style="padding: 12px; background: #fa8c16; color: white; border-radius: 4px;">
              转化人数：180
            </div>
          </div>
        </div>
      `;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.newcomerGuide = new NewcomerGuide();
});
