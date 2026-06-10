/**
 * 新手指南完整版 - 使用简化数据
 */

class NewcomerGuide {
  constructor() {
    // Load data from JSON file
    this.dataPath = '../data/newcomer-guide-data.json';
    this.data = this.getFallbackData(); // Use fallback data for now
    this.init();
  }

  getFallbackData() {
    return {
      "meta": {
        "title": "存客运营新人指导书",
        "version": "V1.0",
        "department": "产品运营部",
        "updateDate": "2023-06-01",
        "description": "本手册涵盖业务需求调研、业务需求建设、业务效果优化、经验沉淀四大模块，指导产品运营人员快速掌握存客运营方法和技巧。"
      },
      "sections": [
        {
          "id": "overview",
          "title": "前言与概述",
          "icon": "📖",
          "intro": "本手册涵盖业务需求调研、业务需求建设、业务效果优化、经验沉淀四大模块。",
          "subsections": [
            {
              "id": "what-is",
              "title": "什么是存量客户运营",
              "type": "card",
              "content": "银行存量客户是指银行已有的客户群体。调查显示，银行对存量客户进行挖掘经营的<strong>转化成本远低于获新客的成本</strong>。存量客户具有基数大、信息完善度好、维系运营方便等特征，具有较高的潜力挖掘价值。",
              "highlights": [
                { "icon": "📉", "text": "转化成本低" },
                { "icon": "📊", "text": "基数大、信息完善" },
                { "icon": "💡", "text": "潜力挖掘价值高" }
              ]
            },
            {
              "id": "scenarios",
              "title": "常见存客经营场景",
              "type": "interactive-table",
              "columns": ["场景", "说明"],
              "data": [
                { "scene": "手机银行促活", "desc": "通过活动权益推送激发用户登录手机银行的意愿和次数，让"流量"转变成"留量"" },
                { "scene": "资产提升", "desc": "通过系列手段提升客户在银行的资产持有量（活期、定期、基金、理财、保险等）" },
                { "scene": "信用卡经营", "desc": "包括信用卡获新客、促激活、分期等场景" },
                { "scene": "贷款营销", "desc": "促授信、已授信促提款、已提款促提升等场景" },
                { "scene": "催收", "desc": "根据贷款到期时间，通过短信、外呼、企微等方式进行催收提醒" },
                { "scene": "业务提醒", "desc": "定期到期提醒等，维护客户权益，减少客诉" }
              ]
            },
            {
              "id": "process-flow",
              "title": "存客运营全流程",
              "type": "flowchart",
              "steps": [
                { "id": "s1", "name": "需求调研", "phase": "phase1" },
                { "id": "s2", "name": "客筛范围圈定", "phase": "phase2" },
                { "id": "s3", "name": "交互方案设计", "phase": "phase3" },
                { "id": "s4", "name": "机器人搭建", "phase": "phase4" },
                { "id": "s5", "name": "调优与上线", "phase": "phase5" },
                { "id": "s6", "name": "呼前数据处理", "phase": "phase6" },
                { "id": "s7", "name": "外呼执行", "phase": "phase7" },
                { "id": "s8", "name": "数据分析与迭代优化", "phase": "phase8" }
              ]
            }
          ],
          "progress": { "weight": 5 }
        },

        {
          "id": "phase1",
          "title": "一、需求调研",
          "icon": "🔍",
          "intro": "设计原则："流程有逻辑，话术讲人话，产品有人设"。",
          "subsections": [
            {
              "id": "step1-1",
              "title": "1. 明确客户目标",
              "type": "card",
              "content": "与客户充分沟通，了解推广目标和预期效果，再制定对应的运营策略。以手机银行促活为例，需了解月活/年活目标，再拆分为细项指标执行。"
            },
            {
              "id": "step1-2",
              "title": "2. 调查当前业务指标",
              "type": "card",
              "content": "了解当前业务状态的关键指标",
              "highlights": [
                { "icon": "📊", "text": "客群规模：省行客户总数、手机银行客户数、各资产等级分布" },
                { "icon": "📈", "text": "外呼总量：日均/月均呼叫量" },
                { "icon": "⏰", "text": "外呼频率：当前触达频率（30天/14天）" }
              ]
            },
            {
              "id": "step1-3",
              "title": "3. 了解客户过往营销内容与效果",
              "type": "card",
              "content": "调研维度包括：往期活动参与人数规模/途径/频次/时间/响应速度；客户对营销活动的反馈和评价；营销活动效果（销售额、转化率等指标变化）；同业竞品策略与权益类型。"
            },
            {
              "id": "step1-6",
              "title": "4. 确定指标统计口径",
              "type": "important-box",
              "items": [
                "意向人数判定标准（明确表示肯定 vs 听完活动介绍）",
                "意向率 = 意向人数/接通人数 还是 /客群人数",
                "有效触达率判定（听完开场白 vs 听到活动介绍）",
                "转化人数标准、转化率统计口径、转化金额计算方法",
                "指标统计周期（当天/T+3/月底/30天）"
              ],
              "note": "需书面确认的关键口径"
            }
          ],
          "progress": { "weight": 15 }
        },

        {
          "id": "phase2",
          "title": "二、客筛范围圈定",
          "icon": "🎯",
          "subsections": [
            {
              "id": "step2-1",
              "title": "1. 获取客筛规则，圈定外呼客群",
              "type": "card",
              "content": "通过SQL规则筛数（另有AI营销平台模型筛数）。手机促活类以登录频率、消费偏好为主要规则；资产提升类以资产状况、交易流水为主要规则。"
            },
            {
              "id": "step2-rules",
              "title": "常见客筛规则参考",
              "type": "interactive-table",
              "columns": ["业务种类", "典型客群", "核心规则要点"],
              "data": [
                { "type": "资产提升", "customers": "临界/高余额宝/高代发低资产/同名跨行转账等", "rules": "手机银行近3月登录、全量金融资产≤20万、年龄≤70岁" },
                { "type": "手机银行促活", "customers": "低频/中频/高频", "rules": "按近6月登录次数分层，去除30天内已外呼、本月自然月活客户" },
                { "type": "贷款营销", "customers": "中银E贷/好客贷", "rules": "房贷客户、月日均20万以下、信用卡消费额上月>3000元等" }
              ]
            },
            {
              "id": "step2-2",
              "title": "2. 外呼客群去黑排重",
              "type": "numbered-list",
              "items": [
                "时间维度排重（30天/14天仅外呼一次）",
                "渠道维度排重（全渠道含人工+智能语音）",
                "投诉标签客户批量拉黑处理",
                "已投诉客户及时黑名单添加"
              ]
            }
          ],
          "progress": { "weight": 10 }
        },

        {
          "id": "phase3",
          "title": "三、交互方案设计",
          "icon": "✏️",
          "intro": "设计原则："流程有逻辑，话术讲人话，产品有人设"。",
          "subsections": [
            {
              "id": "step3-1",
              "title": "1. 流程设计",
              "type": "card",
              "content": "完整营销流程三个模块：<strong>客户身份确认</strong>（明确来电身份+确认接听人，增强信任感）→ <strong>开场白</strong>（简明描述利好内容引发兴趣，首层意向筛选）→ <strong>活动介绍</strong>（说明参与方式与条件，精筛意向确认）。小活动可跳过身份确认以缩短流程提升线路效率。"
            },
            {
              "id": "step3-2",
              "title": "2. 话术共创 — 交互设计文档",
              "type": "card",
              "content": "由4个步骤组成：确定流程节点名称 → 节点提示音文本设计 → 意图出口节点设计（流程出口）及拓展 → 跳转节点名称。"
            },
            {
              "id": "step3-3",
              "title": "3. 短信内容设计",
              "type": "card",
              "content": "三个部分：活动名称 + 活动内容 + 参与路径。需严格确认言简意赅，遵守局点字数要求，推动添加活动直达短链。"
            }
          ],
          "progress": { "weight": 15 }
        },

        {
          "id": "phase4",
          "title": "四、机器人搭建",
          "icon": "🤖",
          "intro": "三部分工作：知识库建库、流程配置、提示音录制。搭建前可参考运营案例货架。",
          "subsections": [
            {
              "id": "step4-1",
              "title": "1. 知识库建库（讯飞言知）",
              "type": "numbered-steps",
              "steps": [
                { "step": "Step1", "title": "新建BOT" },
                { "step": "Step2", "title": "配置技能（词集+意图）" },
                { "step": "Step3", "title": "发布BOT到渠道" }
              ]
            }
          ],
          "progress": { "weight": 15 }
        },

        {
          "id": "phase5",
          "title": "五、调优与上线",
          "icon": "🔧",
          "subsections": [
            {
              "id": "step5-1",
              "title": "1. 核心效果优化 — 三个维度",
              "type": "card",
              "content": "语义识别效果优化：≥85%（平均90%）分析拒识数据 → 意图缺失则新增意图 → 语料缺失则新增扩展问 → 训练BOT"
            }
          ],
          "progress": { "weight": 10 }
        },

        {
          "id": "phase6",
          "title": "六、呼前数据处理",
          "icon": "📊",
          "subsections": [
            {
              "id": "step6-1",
              "title": "数据处理步骤",
              "type": "numbered-list",
              "items": [
                "<strong>白名单预埋</strong>：数据组提取名单后加密发送至分行/预埋单位，尽量当天完成预埋",
                "<strong>外呼名单处理</strong>：基于OBS系统标准模板调整表格，填充动态参数（MAX值取数、多音字修正等）",
                "<strong>线路预分配</strong>：根据客群人数与OBS产能估算线路需求"
              ]
            }
          ],
          "progress": { "weight": 5 }
        },

        {
          "id": "phase7",
          "title": "七、外呼执行与报表数据建设",
          "icon": "📋",
          "subsections": [
            {
              "id": "step7-1",
              "title": "1. 呼叫计划确定与执行",
              "type": "card",
              "content": "操作步骤：创建任务 → 导入名单excel → 设置外呼周期和限制 → 配置重复策略 → 设置显示号码和路数 → 执行任务。"
            },
            {
              "id": "step7-2",
              "title": "2. 登记外呼记录",
              "type": "card",
              "content": "标准记录维度：需求部门 | 发起日期 | 业务大类 | 话术名称 | 客群规则 | 渠道 | 外呼总量 | 客群人数 | 接通人数 | 接通率 | 意向人数 | 意向率 | 转化人数 | 转化率"
            },
            {
              "id": "step7-6",
              "title": "3. 建设项目数据报表",
              "type": "card",
              "content": "已整理<strong>48张报表</strong>的数据报表体系，涵盖四类业务：资产提升、手机促活、贷款营销、信用卡。"
            }
          ],
          "progress": { "weight": 10 }
        },

        {
          "id": "phase8",
          "title": "八、数据分析与迭代优化",
          "icon": "📈",
          "subsections": [
            {
              "id": "metrics",
              "title": "1. 数据分析目标与核心指标",
              "type": "metrics-cards",
              "metrics": [
                { "name": "接通率", "formula": "触达人数/呼叫客群数", "type": "process", "desc": "影响因素：号码资源、客群质量、呼叫号码、时间" },
                { "name": "意向率", "formula": "意向人数/接通客群数", "type": "process", "desc": "反映客户对活动的偏好与意向" },
                { "name": "转化率", "formula": "达标人数/触达人数", "type": "result", "desc": "越高显示客筛越精准、话术设计越优质" },
                { "name": "净增额", "formula": "(外呼组增长率-对照组增长率)×管户总额", "type": "result", "desc": "排除自然行为，反映增量价值" }
              ]
            },
            {
              "id": "funnel-analysis",
              "title": "2. 漏斗分析",
              "type": "chart",
              "data": {
                "stages": ["客群人数", "接通人数", "有效触达", "意向人数", "转化人数"],
                "values": [10000, 6500, 5500, 1200, 180]
              }
            },
            {
              "id": "loss-analysis",
              "title": "3. 流失分析",
              "type": "interactive-table",
              "columns": ["数据类型", "流失类型", "占比参考", "优化措施"],
              "data": [
                { "dataType": "未接通", "lossType": "号码异常（空号/拨打失败）", "rate": "0.18%", "action": "推动银行更新客户信息" },
                { "dataType": "未接通", "lossType": "未接听或屏蔽", "rate": "19.70%", "action": "建立呼叫档案，调整触达策略" },
                { "dataType": "用户挂机", "lossType": "提示音过长/设计不合理", "rate": "2.64%", "action": "精简营销节点提示音" },
                { "dataType": "用户挂机", "lossType": "无需求无意向", "rate": "1.77%", "action": "优化客筛逻辑，尝试模型训练" },
                { "dataType": "系统挂机", "lossType": "明确拒绝", "rate": "3.17%", "action": "—" },
                { "dataType": "用户交互", "lossType": "不方便", "rate": "4.04%", "action": "重呼" },
                { "dataType": "拒识", "lossType": "意图缺失/语料缺失", "rate": "2.00%/4.22%", "action": "优化转写、语义，减少拒识率" }
              ]
            },
            {
              "id": "optimization",
              "title": "4. 基于分析结果的迭代优化",
              "type": "optimization-cards",
              "strategies": [
                {
                  "title": "触达策略优化",
                  "items": [
                    "优先使用官方短号 → 来电名片功能",
                    "重呼策略优化（复用2次间隔1小时）",
                    "多渠道组合触达（智能外呼+企微+短信+App+人工）",
                    "同客户2周内1次触达"
                  ]
                },
                {
                  "title": "客筛策略优化",
                  "items": [
                    "调整标签参数取值（如余额宝转入≥3000元）",
                    "增减规则内容",
                    "案例：转化率从5.89%提升至7.03%（+1.14%）"
                  ]
                }
              ]
            }
          ],
          "progress": { "weight": 20 }
        },

        {
          "id": "summary",
          "title": "总结沉淀",
          "icon": "📝",
          "subsections": [
            {
              "id": "summary-1",
              "title": "优秀话术沉淀至货架",
              "type": "card",
              "content": "适时将话术和意图打包回流至外呼运营案例货架，做到资源回流和集中管理。"
            },
            {
              "id": "summary-2",
              "title": "输出方法论",
              "type": "card",
              "content": "基于运营方案与数据关系总结——各场景客群特点与客筛思路、话术设计思路与方法、转化率提升策略、高效数据标签治理方法。"
            },
            {
              "id": "core-concept",
              "title": "核心理念",
              "type": "tip-box",
              "content": "在不断的思考、总结、输出过程中提升自己，同时也将无形的宝贵经验和资产传递下去。存客运营以精细化的千人千面运营方案，助力银行将长尾客户逐渐转化为高价值客户，形成"客户—用户—核心用户"的转化路线。"
            }
          ],
          "progress": { "weight": 5 }
        }
      ]
    };

    }
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    // 渲染左侧导航
    this.renderSidebar();
    // 渲染主内容
    this.renderContent();
    // 渲染右侧面板
    this.renderRightPanel();
  }

  renderSidebar() {
    const container = document.getElementById('ngSidebarNav');
    if (!container) return;

    let html = `
      <div class="nav-header">
        <span>目录导航</span>
      </div>
      <div class="nav-section">
        <div class="nav-section-title">分析工具</div>
        <a href="data-analysis.html" class="nav-item">
          <span class="nav-icon">📊</span>
          <span class="nav-text">数据分析工具</span>
        </a>
      </div>
      <div class="nav-section">
        <div class="nav-section-title">章节目录</div>
    `;

    this.data.sections.forEach(section => {
      html += `
        <div class="nav-item" data-section="${section.id}">
          <span class="nav-icon">${section.icon}</span>
          <span class="nav-text">${section.title}</span>
        </div>
      `;
    });

    html += `</div>`;

    container.innerHTML = html;
  }

  renderContent() {
    const container = document.getElementById('ngContent');
    if (!container) return;

    let html = `
      <div class="ng-meta">
        <p><strong>${this.data.meta.title}</strong> | 版本：${this.data.meta.version} | ${this.data.meta.department} | ${this.data.meta.updateDate}</p>
        <p>${this.data.meta.description}</p>
      </div>
    `;

    this.data.sections.forEach(section => {
      html += this.renderSection(section);
    });

    container.innerHTML = html;
  }

  renderSection(section) {
    let html = `
      <section class="ng-section" id="section-${section.id}">
        <div class="ng-section-header" data-toggle="${section.id}">
          <div class="ng-section-icon">${section.icon}</div>
          <h2 class="ng-section-title">${section.title}</h2>
          ${section.progress ? `<span class="ng-section-badge">权重 ${section.progress.weight}%</span>` : ''}
        </div>
    `;

    if (section.intro) {
      html += `<p style="font-size: 15px; color: var(--ng-text-secondary); margin-bottom: 20px;">${section.intro}</p>`;
    }

    if (section.subsections) {
      section.subsections.forEach(sub => {
        html += this.renderSubsection(sub, section.id);
      });
    }

    html += `</section>`;
    return html;
  }

  renderSubsection(sub, sectionId) {
    const fullId = `${sectionId}-${sub.id}`;

    let html = `<div class="ng-subsection" id="${fullId}">`;

    html += `
      <div class="ng-toolbar">
        <div class="ng-toolbar-left">
          <h3 style="font-size: 18px; font-weight: 600; color: var(--ng-text); margin: 0;">
            ${sub.title}
          </h3>
        </div>
      </div>
    `;

    switch (sub.type) {
      case 'card':
        html += this.renderCard(sub);
        break;
      case 'interactive-table':
        html += this.renderTable(sub);
        break;
      case 'flowchart':
        html += this.renderFlowchart(sub);
        break;
      case 'numbered-list':
        html += this.renderNumberedList(sub);
        break;
      case 'metrics-cards':
        html += this.renderMetricsCards(sub);
        break;
      case 'chart':
        html += this.renderChart(sub);
        break;
      case 'important-box':
        html += this.renderImportantBox(sub);
        break;
      case 'optimization-cards':
        html += this.renderOptimizationCards(sub);
        break;
      case 'tip-box':
        html += this.renderTipBox(sub);
        break;
      case 'interactive-form':
        html += this.renderInteractiveForm(sub);
        break;
      case 'principles':
        html += this.renderPrinciples(sub);
        break;
      case 'warning-box':
        html += this.renderWarningBox(sub);
        break;
      case 'tags':
        html += this.renderTags(sub);
        break;
      case 'numbered-steps':
        html += this.renderNumberedSteps(sub);
        break;
      case 'card-list':
        html += this.renderCardList(sub);
        break;
      case 'flow-steps':
        html += this.renderFlowSteps(sub);
        break;
      case 'metrics-form':
        html += this.renderMetricsForm(sub);
        break;
      case 'checklist-card':
        html += this.renderChecklistCard(sub);
        break;
      case 'expandable':
        html += this.renderExpandable(sub);
        break;
      case 'important-box':
        html += this.renderImportantBox(sub);
        break;
      default:
        if (sub.content) {
          html += `<div class="ng-card"><div class="ng-card-content">${sub.content}</div></div>`;
        }
    }

    html += `</div>`;
    return html;
  }

  renderCard(sub) {
    let html = '<div class="ng-card">';
    html += `<div class="ng-card-content">${sub.content}</div>`;

    if (sub.highlights) {
      html += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-top: 16px;">';
      sub.highlights.forEach(h => {
        html += `
          <div style="background: #fff; border: 1px solid #e8e8e8; border-radius: 8px; padding: 16px; text-align: center;">
            <div style="font-size: 28px; margin-bottom: 8px;">${h.icon}</div>
            <div style="font-size: 13px; color: var(--ng-text-secondary);">${h.text}</div>
          </div>
        `;
      });
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  renderTable(sub) {
    let html = '<div class="ng-table-wrapper"><table class="ng-table"><thead><tr>';
    sub.columns.forEach(col => {
      html += `<th>${col}</th>`;
    });
    html += '</tr></thead><tbody>';
    sub.data.forEach(row => {
      html += '<tr>';
      const keys = Object.keys(row);
      keys.forEach(key => {
        html += `<td>${row[key]}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
  }

  renderFlowchart(sub) {
    let html = '<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin: 24px 0;">';
    sub.steps.forEach((step, index) => {
      html += `
        <div style="display: flex; align-items: center; gap: 8px;">
          <a href="#section-${step.phase || step.id}" class="ng-flow-node" style="padding: 12px 20px;">
            ${step.name}
          </a>
          ${index < sub.steps.length - 1 ? '<span style="color: var(--ng-primary); font-size: 20px;">→</span>' : ''}
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  renderNumberedList(sub) {
    let html = '<ol style="margin: 0; padding-left: 20px;">';
    sub.items.forEach(item => {
      html += `<li style="padding: 6px 0;">${item}</li>`;
    });
    html += '</ol>';
    return html;
  }

  renderMetricsCards(sub) {
    let html = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">';
    sub.metrics.forEach(m => {
      const bgColor = m.type === 'process' ? 'var(--ng-primary)' : 'var(--ng-success)';
      html += `
        <div style="background: #fff; border: 1px solid #e8e8e8; border-top: 3px solid ${bgColor}; border-radius: 8px; padding: 20px; transition: all 0.3s ease;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <span style="font-size: 14px; font-weight: 600; color: var(--ng-text);">${m.name}</span>
            <span style="font-size: 11px; padding: 2px 8px; border-radius: 10px; background: rgba(24, 144, 255, 0.1); color: var(--ng-primary);">${m.type === 'process' ? '过程指标' : '结果指标'}</span>
          </div>
          <div style="background: #f5f7fa; padding: 10px 12px; border-radius: 4px; font-size: 13px; color: var(--ng-text-secondary); font-family: 'Courier New', monospace; margin-bottom: 8px;">
            ${m.formula}
          </div>
          <div style="font-size: 12px; color: var(--ng-text-muted);">${m.desc}</div>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  renderChart(sub) {
    const maxValue = Math.max(...sub.data.values);

    let html = '<div style="margin: 24px 0;">';
    html += '<h4 style="margin-bottom: 16px;">漏斗分析</h4>';
    sub.data.stages.forEach((stage, index) => {
      const value = sub.data.values[index];
      const percent = Math.round((value / maxValue) * 100);
      const rate = index > 0 ? `(${Math.round((value / sub.data.values[index - 1]) * 100)}%)` : '';

      const colors = ['#1890ff', '#40a9ff', '#73d13d', '#faad14', '#fa8c16'];
      const color = colors[index % colors.length];

      html += `
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="width: 120px; text-align: right; padding-right: 12px; font-size: 13px; color: var(--ng-text-secondary);">${stage}</span>
          <div style="flex: 1; margin-right: 12px;">
            <div style="height: 36px; background: ${color}; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">
              <span style="margin-right: 8px;">${value.toLocaleString()}</span>
              <span style="opacity: 0.8; font-size: 12px;">${rate}</span>
            </div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  renderImportantBox(sub) {
    let html = `
      <div style="background: linear-gradient(135deg, #fff7e6 0%, #fffbe6 100%); border-left: 4px solid #faad14; border-radius: 0 8px 8px 0; padding: 16px 20px; margin-bottom: 20px;">
        <div style="font-size: 14px; font-weight: 600; color: #faad14; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          ⚠️ ${sub.note || '重要提示'}
        </div>
        <ul style="margin: 0; padding-left: 20px;">
    `;
    sub.items.forEach(item => {
      html += `<li style="padding: 6px 0; font-size: 14px; color: var(--ng-text-secondary);">• ${item}</li>`;
    });
    html += '</ul></div>';
    return html;
  }

  renderOptimizationCards(sub) {
    let html = '<div style="display: grid; gap: 20px;">';
    sub.strategies.forEach(s => {
      html += `
        <div style="background: #fff; border: 1px solid #e8e8e8; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%); color: white; padding: 14px 16px; font-size: 14px; font-weight: 600;">
            ${s.title}
          </div>
          <div style="padding: 16px;">
      `;
      s.items.forEach(item => {
        html += `<div style="display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; font-size: 13px; color: var(--ng-text-secondary); border-bottom: 1px dashed #e8e8e8;">`;
        html += `<span style="color: #1890ff;">→</span> <span>${item}</span>`;
        html += '</div>';
      });
      html += '</div></div>';
    });
    html += '</div>';
    return html;
  }

  renderTipBox(sub) {
    return `
      <div style="background: linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%); border-radius: 8px; padding: 16px 20px; margin-bottom: 20px; border: 1px solid #b7eb8f;">
        <div style="font-size: 14px; font-weight: 600; color: #52c41a; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          💡 ${sub.title || '提示'}
        </div>
        <div style="font-size: 14px; color: var(--ng-text-secondary);">${sub.content}</div>
      </div>
    `;
  }

  renderRightPanel() {
    const container = document.getElementById('ngRightPanel');
    if (!container) return;

    let html = `
      <div class="ng-panel-card">
        <div class="ng-panel-title">🔗 快速入口</div>
        <a href="data-analysis.html" class="ng-tag" style="text-decoration: none;">
          <span class="ng-tag-label">📊 数据分析工具</span>
          <span class="ng-tag-desc">执行数据分析任务</span>
        </a>
      </div>

      <div class="ng-panel-card">
        <div class="ng-panel-title">📚 相关资源</div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <a href="call-scripts.html" class="ng-tag" style="text-decoration: none;">
            <span class="ng-tag-label">🗣️ 外呼话术货架</span>
          </a>
          <a href="operation-strategies.html" class="ng-tag" style="text-decoration: none;">
            <span class="ng-tag-label">📋 运营策略集</span>
          </a>
          <a href="operation-cases.html" class="ng-tag" style="text-decoration: none;">
            <span class="ng-tag-label">📊 运营案例</span>
          </a>
        </div>
      </div>

      <div class="ng-panel-card">
        <div class="ng-panel-title">📖 学习进度</div>
        <p style="font-size: 13px; color: var(--ng-text-muted);">章节权重分布：</p>
        <div style="margin-top: 12px;">
          ${this.data.sections.map(s => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 13px;">${s.icon} ${s.title}</span>
              <span style="font-size: 13px; font-weight: 600;">${s.progress ? s.progress.weight + '%' : ''}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  // Additional content type renderers
  renderInteractiveForm(sub) {
    let html = '<div class="ng-form">';
    html += `<p style="margin-bottom: 16px; font-size: 14px; color: var(--ng-text-secondary);">${sub.description}</p>`;
    html += '<div style="display: grid; gap: 12px;">';
    sub.fields.forEach(field => {
      html += `
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <label style="font-size: 13px; color: var(--ng-text); font-weight: 500;">${field.name}</label>
          <input type="text" placeholder="${field.placeholder || ''}" style="padding: 8px 12px; border: 1px solid #e8e8e8; border-radius: 4px; font-size: 13px;">
        </div>
      `;
    });
    html += '</div>';
    html += '</div>';
    return html;
  }

  renderPrinciples(sub) {
    let html = '<div style="background: #fff; border: 1px solid #e8e8e8; border-radius: 8px; padding: 20px;">';
    html += '<h4 style="margin: 0 0 16px 0; font-size: 15px; font-weight: 600;">设计原则</h4>';
    html += '<div style="display: grid; gap: 12px;">';
    sub.principles.forEach(principle => {
      html += `
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <div style="width: 24px; height: 24px; background: var(--ng-primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; flex-shrink: 0;">
            ${principle.name.substring(0, 1)}
          </div>
          <div>
            <h5 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600;">${principle.name}</h5>
            <p style="margin: 0; font-size: 13px; color: var(--ng-text-secondary);">${principle.desc}</p>
          </div>
        </div>
      `;
    });
    html += '</div>';
    html += '</div>';
    return html;
  }

  renderWarningBox(sub) {
    const color = sub.level === 'warning' ? '#ff4d4f' : '#faad14';
    let html = `
      <div style="background: linear-gradient(135deg, #fff2f0 0%, #ffeded 100%); border-left: 4px solid ${color}; border-radius: 0 8px 8px 0; padding: 16px 20px; margin-bottom: 20px;">
        <div style="font-size: 14px; font-weight: 600; color: ${color}; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          ⚠️ ${sub.level === 'warning' ? '警告' : '重要提示'}
        </div>
    `;
    if (sub.categories) {
      html += '<div style="display: grid; gap: 12px;">';
      sub.categories.forEach(category => {
        html += `
          <div style="background: rgba(255, 255, 255, 0.6); border-radius: 4px; padding: 12px;">
            <h5 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600;">${category.name}</h5>
            <div style="font-size: 12px; color: var(--ng-text-secondary); margin-left: 8px;">
              <strong>${category.words}</strong>
            </div>
          </div>
        `;
      });
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  renderTags(sub) {
    let html = '<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px;">';
    sub.tags.forEach(tag => {
      html += `
        <div style="background: #f0f0f0; border-radius: 16px; padding: 6px 16px; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 14px; font-weight: 500;">${tag.label}</span>
          <span style="font-size: 12px; color: var(--ng-text-secondary);">${tag.desc}</span>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  renderNumberedSteps(sub) {
    let html = '<div style="display: grid; gap: 8px;">';
    sub.steps.forEach(step => {
      html += `
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f5f7fa; border-radius: 4px;">
          <div style="width: 28px; height: 28px; background: var(--ng-primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; flex-shrink: 0;">
            ${step.step}
          </div>
          <div>
            <div style="font-size: 14px; font-weight: 600;">${step.title}</div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  renderCardList(sub) {
    let html = '<div style="display: grid; gap: 12px;">';
    sub.items.forEach(item => {
      html += `
        <div style="background: #fff; border: 1px solid #e8e8e8; border-radius: 8px; padding: 16px;">
          <h5 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">${item.title}</h5>
          <p style="margin: 0; font-size: 13px; color: var(--ng-text-secondary);">${item.desc}</p>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  renderFlowSteps(sub) {
    let html = '<div style="display: grid; gap: 16px;">';
    sub.steps.forEach(step => {
      html += `
        <div>
          <div style="font-size: 14px; font-weight: 600; color: var(--ng-primary); margin-bottom: 8px;">${step.name}</div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${step.items.map(item => `
              <span style="background: #f0f0f0; padding: 4px 12px; border-radius: 4px; font-size: 12px; color: var(--ng-text-secondary);">
                ${item}
              </span>
            `).join('')}
          </div>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  renderMetricsForm(sub) {
    let html = '<div class="ng-form">';
    html += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">';
    sub.fields.forEach(field => {
      html += `
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <label style="font-size: 13px; color: var(--ng-text); font-weight: 500;">${field}</label>
          <input type="text" style="padding: 8px 12px; border: 1px solid #e8e8e8; border-radius: 4px; font-size: 13px;">
        </div>
      `;
    });
    html += '</div>';
    html += '</div>';
    return html;
  }

  renderChecklistCard(sub) {
    let html = '<div class="ng-card">';
    html += '<div class="ng-card-content">';
    if (sub.title) {
      html += `<h4 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 600;">${sub.title}</h4>`;
    }
    html += '<ul style="margin: 0; padding-left: 20px;">';
    sub.items.forEach(item => {
      html += `<li style="padding: 4px 0; font-size: 14px; color: var(--ng-text-secondary);">
        <input type="checkbox" style="margin-right: 8px;">
        <span>${item}</span>
      </li>`;
    });
    html += '</ul>';
    html += '</div>';
    html += '</div>';
    return html;
  }

  renderExpandable(sub) {
    const uniqueId = `expand-${sub.id}`;
    return `
      <div class="ng-expandable">
        <div style="background: #f5f7fa; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4 style="margin: 0; font-size: 15px; font-weight: 600;">${sub.title}</h4>
            <button id="${uniqueId}-toggle" style="background: none; border: none; font-size: 20px; cursor: pointer; color: var(--ng-primary);">
              +
            </button>
          </div>
          <div id="${uniqueId}-content" style="display: none; margin-top: 16px; padding-top: 16px; border-top: 1px dashed #e8e8e8;">
            <div style="font-size: 14px; color: var(--ng-text-secondary);">
              ${sub.content}
            </div>
            ${sub.checklist ? `
              <div style="margin-top: 12px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">检查清单：</div>
                <ul style="margin: 0; padding-left: 20px;">
                  ${sub.checklist.map(item => `
                    <li style="padding: 2px 0; font-size: 13px;">
                      <input type="checkbox" style="margin-right: 8px;">
                      <span>${item}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const self = this;

    // 章节导航点击
    document.querySelectorAll('.nav-item[data-section]').forEach(item => {
      item.addEventListener('click', (e) => {
        const sectionId = e.currentTarget.dataset.section;
        this.scrollToSection(sectionId);
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        e.currentTarget.classList.add('active');
      });
    });

    // 可折叠内容
    document.querySelectorAll('[data-toggle]').forEach(header => {
      header.addEventListener('click', () => {
        const sectionId = header.dataset.toggle;
        const section = document.getElementById(`section-${sectionId}`);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // 展开内容点击事件
    document.querySelectorAll('.ng-expandable button[id$="-toggle"]').forEach(button => {
      button.addEventListener('click', (e) => {
        const contentId = e.target.id.replace('-toggle', '-content');
        const content = document.getElementById(contentId);
        if (content) {
          if (content.style.display === 'none') {
            content.style.display = 'block';
            e.target.textContent = '-';
          } else {
            content.style.display = 'none';
            e.target.textContent = '+';
          }
        }
      });
    });
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(`section-${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.newcomerGuide = new NewcomerGuide();
});