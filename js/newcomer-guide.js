/**
 * 新手指南交互逻辑
 * 功能：JSON数据加载、动态渲染、进度追踪、书签、笔记
 */

class NewcomerGuide {
  constructor(options = {}) {
    this.dataPath = options.dataPath || 'data/newcomer-guide-data.json';
    this.storageKey = 'ng_progress';
    this.bookmarkKey = 'ng_bookmarks';
    this.notesKey = 'ng_notes';

    this.data = null;
    this.progress = this.loadProgress();
    this.bookmarks = this.loadBookmarks();
    this.notes = this.loadNotes();
    this.currentSection = null;

    this.init();
  }

  init() {
    try {
      this.loadData();
      this.render();
      this.bindEvents();
      this.restoreState();
    } catch (error) {
      console.error('初始化失败:', error);
      this.showError('数据加载失败，请刷新页面重试');
    }
  }

  // ========== 数据加载 ==========
  loadData() {
    // 将JSON数据直接嵌入代码中，避免跨域问题
    this.data = {
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
          "type": "intro",
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
              "interactive": true,
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
          "type": "guide",
          "subsections": [
            {
              "id": "step1-1",
              "title": "1. 明确客户目标",
              "type": "expandable",
              "content": "与客户充分沟通，了解推广目标和预期效果，再制定对应的运营策略。以手机银行促活为例，需了解月活/年活目标，再拆分为细项指标执行。",
              "checklist": [
                "已确认推广目标",
                "已确认预期效果指标",
                "已拆分子目标"
              ]
            },
            {
              "id": "step1-2",
              "title": "2. 调查当前业务指标",
              "type": "interactive-form",
              "description": "了解当前业务状态的关键指标",
              "fields": [
                { "name": "客群规模", "key": "customerScale", "placeholder": "省行客户总数、手机银行客户数、各资产等级分布" },
                { "name": "外呼总量", "key": "callVolume", "placeholder": "日均/月均呼叫量" },
                { "name": "外呼频率", "key": "callFrequency", "placeholder": "当前触达频率（30天/14天）" },
                { "name": "消保流程", "key": "consumerProtection", "placeholder": "审核流程和平均耗时" },
                { "name": "短信兜底", "key": "smsBackup", "placeholder": "是否具备短信同步发送功能" }
              ]
            },
            {
              "id": "step1-3",
              "title": "3. 了解客户过往营销内容与效果",
              "type": "card",
              "content": "调研维度包括：往期活动参与人数规模/途径/频次/时间/响应速度；客户对营销活动的反馈和评价；营销活动效果（销售额、转化率等指标变化）；同业竞品策略与权益类型。"
            }
          ],
          "progress": { "weight": 15 }
        },

        {
          "id": "phase8",
          "title": "八、数据分析与迭代优化",
          "icon": "📈",
          "type": "analysis",
          "subsections": [
            {
              "id": "metrics",
              "title": "1. 数据分析目标与核心指标",
              "type": "metrics-cards",
              "metrics": [
                {
                  "name": "接通率",
                  "formula": "触达人数/呼叫客群数",
                  "type": "process",
                  "desc": "影响因素：号码资源、客群质量、呼叫号码、时间"
                },
                {
                  "name": "意向率",
                  "formula": "意向人数/接通客群数",
                  "type": "process",
                  "desc": "反映客户对活动的偏好与意向"
                },
                {
                  "name": "转化率",
                  "formula": "达标人数/触达人数",
                  "type": "result",
                  "desc": "越高显示客筛越精准、话术设计越优质"
                },
                {
                  "name": "净增额",
                  "formula": "(外呼组增长率-对照组增长率)×管户总额",
                  "type": "result",
                  "desc": "排除自然行为，反映增量价值"
                }
              ]
            },
            {
              "id": "funnel-analysis",
              "title": "2. 数据分析方向 — 流失分析",
              "type": "interactive-chart",
              "chartType": "funnel",
              "title": "漏斗分析",
              "data": {
                "stages": ["客群人数", "接通人数", "有效触达", "意向人数", "转化人数"],
                "exampleValues": [10000, 6500, 5500, 1200, 180]
              }
            },
            {
              "id": "loss-analysis",
              "title": "流失分析详情",
              "type": "interactive-table",
              "columns": ["数据类型", "流失类型", "占比参考", "优化措施"],
              "data": [
                { "dataType": "未接通", "lossType": "号码异常（空号/拨打失败）", "rate": "0.18%", "action": "推动银行更新客户信息" },
                { "dataType": "未接通", "lossType": "未接听或屏蔽", "rate": "19.70%", "action": "建立呼叫档案，调整触达策略" },
                { "dataType": "用户挂机", "lossType": "提示音过长/设计不合理", "rate": "2.64%", "action": "精简营销节点提示音" }
              ]
            }
          ],
          "progress": { "weight": 20 }
        }
      ],

      "settings": {
        "progressTracking": true,
        "checklistCompletion": true,
        "bookmarkNotes": true,
        "exportPDF": true,
        "autoSave": true,
        "showEstimatedTime": true
      }
    };
  }

  // ========== 存储操作 ==========
  loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || {};
    } catch {
      return {};
    }
  }

  saveProgress() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
  }

  loadBookmarks() {
    try {
      return JSON.parse(localStorage.getItem(this.bookmarkKey)) || [];
    } catch {
      return [];
    }
  }

  saveBookmarks() {
    localStorage.setItem(this.bookmarkKey, JSON.stringify(this.bookmarks));
  }

  loadNotes() {
    try {
      return JSON.parse(localStorage.getItem(this.notesKey)) || {};
    } catch {
      return {};
    }
  }

  saveNotes() {
    localStorage.setItem(this.notesKey, JSON.stringify(this.notes));
  }

  // ========== 渲染方法 ==========
  render() {
    this.renderSidebar();
    this.renderContent();
    this.renderRightPanel();
    this.updateProgress();
  }

  renderSidebar() {
    const container = document.getElementById('ngSidebarNav');
    if (!container || !this.data) return;

    let html = `
      <div class="nav-header">
        <span>目录导航</span>
      </div>
      <div class="nav-section">
        <div class="nav-section-title">分析工具</div>
    `;

    // 渲染分析工具入口
    html += `
      <a href="data-analysis.html" class="nav-item">
        <span class="nav-icon">📊</span>
        <span class="nav-text">数据分析工具</span>
      </a>
    `;

    html += `</div><div class="nav-section"><div class="nav-section-title">章节目录</div>`;

    // 渲染章节
    this.data.sections.forEach(section => {
      const isActive = this.currentSection === section.id;
      html += `
        <div class="nav-item ${isActive ? 'active' : ''}" data-section="${section.id}">
          <span class="nav-icon">${section.icon}</span>
          <span class="nav-text">${section.title}</span>
        </div>
      `;
    });

    html += `</div>`;

    // 渲染进度
    html += `
      <div class="ng-progress">
        <div class="ng-progress-label">
          <span>学习进度</span>
          <span id="progressPercent">0%</span>
        </div>
        <div class="ng-progress-bar">
          <div class="ng-progress-fill" id="progressFill" style="width: 0%"></div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  renderContent() {
    const container = document.getElementById('ngContent');
    if (!container || !this.data) return;

    let html = '';

    // 渲染元信息
    html += `
      <div class="ng-meta" style="margin-bottom: 24px;">
        <p style="font-size: 14px; color: var(--ng-text-muted);">
          <strong>${this.data.meta.title}</strong> |
          版本：${this.data.meta.version} |
          ${this.data.meta.department} |
          ${this.data.meta.updateDate}
        </p>
        <p style="margin-top: 8px; color: var(--ng-text-secondary);">
          ${this.data.meta.description}
        </p>
      </div>
    `;

    // 渲染各章节
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

    // 渲染简介
    if (section.intro) {
      html += `<p style="font-size: 15px; color: var(--ng-text-secondary); margin-bottom: 20px;">${section.intro}</p>`;
    }

    // 渲染子章节
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
    const isBookmarked = this.bookmarks.includes(fullId);
    const note = this.notes[fullId];

    let html = `<div class="ng-subsection" id="${fullId}">`;

    // 工具栏（书签、笔记）
    html += `
      <div class="ng-toolbar">
        <div class="ng-toolbar-left">
          <h3 style="font-size: 18px; font-weight: 600; color: var(--ng-text); margin: 0;">
            ${sub.title}
          </h3>
        </div>
        <div class="ng-toolbar-right">
          <button class="ng-bookmark-btn ${isBookmarked ? 'active' : ''}"
                  data-bookmark="${fullId}" title="添加书签">
            ${isBookmarked ? '⭐' : '☆'}
          </button>
          <button class="ng-btn ng-btn-outline" data-note="${fullId}" title="添加笔记">
            📝 笔记
          </button>
        </div>
      </div>
    `;

    // 笔记显示
    if (note) {
      html += `
        <div class="ng-note-item">
          <div class="ng-note-content">📝 ${note}</div>
          <button class="ng-btn ng-btn-outline" style="font-size: 12px; padding: 4px 8px;" data-delete-note="${fullId}">删除</button>
        </div>
      `;
    }

    // 根据类型渲染内容
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
      case 'expandable':
        html += this.renderExpandable(sub, fullId);
        break;
      case 'checklist-card':
        html += this.renderChecklistCard(sub, fullId);
        break;
      case 'interactive-form':
        html += this.renderForm(sub, fullId);
        break;
      case 'important-box':
        html += this.renderImportantBox(sub);
        break;
      case 'principles':
        html += this.renderPrinciples(sub);
        break;
      case 'metrics-cards':
        html += this.renderMetricsCards(sub);
        break;
      case 'interactive-chart':
        html += this.renderChart(sub);
        break;
      case 'optimization-cards':
        html += this.renderOptimizationCards(sub);
        break;
      case 'tags':
        html += this.renderTags(sub);
        break;
      case 'tip-box':
        html += this.renderTipBox(sub);
        break;
      case 'warning-box':
        html += this.renderWarningBox(sub);
        break;
      case 'numbered-list':
        html += this.renderNumberedList(sub);
        break;
      case 'numbered-steps':
        html += this.renderNumberedSteps(sub);
        break;
      case 'card-list':
        html += this.renderCardList(sub);
        break;
      case 'mini-flow':
        html += this.renderMiniFlow(sub);
        break;
      case 'flow-steps':
        html += this.renderFlowSteps(sub);
        break;
      case 'metrics-form':
        html += this.renderMetricsForm(sub, fullId);
        break;
      case 'summary':
        html += this.renderSummary(sub);
        break;
      default:
        if (sub.content) {
          html += `<div class="ng-card"><div class="ng-card-content">${sub.content}</div></div>`;
        }
    }

    html += `</div>`;
    return html;
  }

  // ========== 组件渲染 ==========
  renderCard(sub) {
    let html = '<div class="ng-card">';
    html += `<div class="ng-card-content">${sub.content}</div>`;

    if (sub.highlights) {
      html += '<div class="ng-card highlights" style="margin-top: 16px;">';
      sub.highlights.forEach(h => {
        html += `
          <div class="ng-highlight-item">
            <div class="ng-highlight-icon">${h.icon}</div>
            <div class="ng-highlight-text">${h.text}</div>
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
    let html = '<div class="ng-flowchart">';

    sub.steps.forEach((step, index) => {
      const isCompleted = this.progress.completedSteps?.includes(step.phase || step.id);
      html += `
        <div class="ng-flow-step">
          <a href="#section-${step.phase || step.id}" class="ng-flow-node ${isCompleted ? 'completed' : ''}" data-goto="${step.phase || step.id}">
            ${step.name}
          </a>
          ${index < sub.steps.length - 1 ? '<span class="ng-flow-arrow">→</span>' : ''}
        </div>
      `;
    });

    html += '</div>';
    return html;
  }

  renderExpandable(sub, fullId) {
    const isOpen = this.progress.openSections?.includes(fullId);
    let html = `
      <div class="ng-expandable ${isOpen ? 'open' : ''}" data-expandable="${fullId}">
        <div class="ng-expandable-header">
          <div class="ng-expandable-title">
            <span>📌</span>
            ${sub.title}
          </div>
          <span class="ng-expandable-icon">▼</span>
        </div>
        <div class="ng-expandable-content">
          <p>${sub.content}</p>
    `;

    if (sub.checklist) {
      html += this.renderChecklist(sub.checklist, fullId);
    }

    if (sub.tips) {
      html += '<div style="margin-top: 12px;"><strong>提示：</strong><ul style="margin: 8px 0; padding-left: 20px;">';
      sub.tips.forEach(tip => {
        html += `<li>${tip}</li>`;
      });
      html += '</ul></div>';
    }

    html += '</div></div>';
    return html;
  }

  renderChecklist(items, fullId) {
    let html = '<div class="ng-checklist">';
    items.forEach((item, index) => {
      const itemId = `${fullId}-item-${index}`;
      const isChecked = this.progress.checkedItems?.includes(itemId);
      html += `
        <div class="ng-checklist-item ${isChecked ? 'completed' : ''}">
          <div class="ng-checkbox ${isChecked ? 'checked' : ''}" data-check="${itemId}"></div>
          <span class="ng-checklist-text">${item}</span>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  renderChecklistCard(sub, fullId) {
    let html = '<div class="ng-card"><div class="ng-card-title">✅ 检查清单</div>';
    html += this.renderChecklist(sub.items, fullId);
    html += '</div>';
    return html;
  }

  renderForm(sub, fullId) {
    let html = `
      <div class="ng-card">
        <div class="ng-card-title">📋 ${sub.title}</div>
        <p style="font-size: 14px; color: var(--ng-text-muted); margin-bottom: 16px;">${sub.description || ''}</p>
    `;

    sub.fields.forEach(field => {
      const savedValue = this.progress.formData?.[fullId]?.[field.key] || '';
      html += `
        <div class="ng-form-group">
          <label class="ng-form-label">${field.name}</label>
          <input type="text" class="ng-form-input" data-form="${fullId}" data-field="${field.key}"
                 value="${savedValue}" placeholder="${field.placeholder || ''}">
        </div>
      `;
    });

    html += `
        <button class="ng-btn ng-btn-primary" data-save-form="${fullId}">保存</button>
      </div>
    `;
    return html;
  }

  renderImportantBox(sub) {
    const levelClass = sub.level === 'important' ? '' : 'danger';
    let html = `
      <div class="ng-important-box ${levelClass}">
        <div class="ng-important-title">
          ${sub.level === 'important' ? '⚠️' : '🚫'} ${sub.note || '重要提示'}
        </div>
        <ul class="ng-important-list">
    `;

    sub.items.forEach(item => {
      html += `<li>${item}</li>`;
    });

    html += '</ul></div>';
    return html;
  }

  renderPrinciples(sub) {
    let html = '<div class="ng-principles">';
    sub.principles.forEach(p => {
      html += `
        <div class="ng-principle-card">
          <div class="ng-principle-name">${p.name}</div>
          <div class="ng-principle-desc">${p.desc}</div>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  renderMetricsCards(sub) {
    let html = '<div class="ng-metrics-grid">';
    sub.metrics.forEach(m => {
      html += `
        <div class="ng-metric-card ${m.type}">
          <div class="ng-metric-header">
            <span class="ng-metric-name">${m.name}</span>
            <span class="ng-metric-type ${m.type}">${m.type === 'process' ? '过程指标' : '结果指标'}</span>
          </div>
          <div class="ng-metric-formula">${m.formula}</div>
          <div class="ng-metric-desc">${m.desc}</div>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  renderChart(sub) {
    if (sub.chartType === 'funnel') {
      return this.renderFunnel(sub);
    }
    return '';
  }

  renderFunnel(sub) {
    const stages = sub.data.stages;
    const values = sub.data.exampleValues;
    const maxValue = values[0];

    let html = '<div class="ng-funnel">';
    stages.forEach((stage, index) => {
      const value = values[index];
      const percent = Math.round((value / maxValue) * 100);
      const rate = index > 0 ? `(${Math.round((value / values[index - 1]) * 100)}%)` : '';

      html += `
        <div class="ng-funnel-stage">
          <div class="ng-funnel-label">${stage}</div>
          <div class="ng-funnel-bar-wrapper">
            <div class="ng-funnel-bar" style="width: ${percent}%;">
              <span class="ng-funnel-value">${value.toLocaleString()}</span>
              <span class="ng-funnel-rate">${rate}</span>
            </div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  renderOptimizationCards(sub) {
    let html = '<div class="ng-optimization-grid">';
    sub.strategies.forEach(s => {
      html += `
        <div class="ng-optimization-card">
          <div class="ng-optimization-header">${s.title}</div>
          <div class="ng-optimization-body">
      `;
      s.items.forEach(item => {
        html += `<div class="ng-optimization-item">${item}</div>`;
      });
      html += '</div></div>';
    });
    html += '</div>';
    return html;
  }

  renderTags(sub) {
    let html = '<div class="ng-tags">';
    sub.tags.forEach(t => {
      html += `
        <div class="ng-tag">
          <span class="ng-tag-label">${t.label}</span>
          <span class="ng-tag-desc">${t.desc}</span>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  renderTipBox(sub) {
    const levelClass = sub.level || '';
    return `
      <div class="ng-tip-box ${levelClass}">
        <div class="ng-tip-title">💡 ${sub.title || '提示'}</div>
        <div class="ng-tip-content">${sub.content}</div>
      </div>
    `;
  }

  renderWarningBox(sub) {
    let html = `
      <div class="ng-important-box danger">
        <div class="ng-important-title">🚫 敏感词汇</div>
    `;

    if (sub.categories) {
      sub.categories.forEach(cat => {
        html += `<p style="margin: 8px 0;"><strong>${cat.name}：</strong>${cat.words}</p>`;
      });
    }

    html += '</div>';
    return html;
  }

  renderNumberedList(sub) {
    let html = '<ol class="ng-numbered-list">';
    sub.items.forEach(item => {
      html += `<li>${item}</li>`;
    });
    html += '</ol>';
    return html;
  }

  renderNumberedSteps(sub) {
    let html = '<div class="ng-steps">';
    sub.steps.forEach(s => {
      html += `
        <div class="ng-step">
          <div class="ng-step-number">${s.step}</div>
          <div class="ng-step-content">
            <div class="ng-step-title">${s.title}</div>
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
        <div class="ng-card">
          <div class="ng-card-title">${item.title}</div>
          <div class="ng-card-content">${item.desc}</div>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  renderMiniFlow(sub) {
    let html = '<div class="ng-flowchart" style="justify-content: flex-start;">';
    sub.steps.forEach((step, index) => {
      html += `
        <div class="ng-flow-step">
          <span class="ng-flow-node" style="padding: 8px 16px; font-size: 13px;">${step}</span>
          ${index < sub.steps.length - 1 ? '<span class="ng-flow-arrow">→</span>' : ''}
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  renderFlowSteps(sub) {
    let html = '<div style="display: grid; gap: 20px;">';
    sub.steps.forEach((step, index) => {
      html += `
        <div class="ng-card">
          <div class="ng-card-title">📌 ${step.name}</div>
          <ul style="margin: 0; padding-left: 20px; color: var(--ng-text-secondary);">
            ${step.items.map(item => `<li style="padding: 4px 0;">${item}</li>`).join('')}
          </ul>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  renderMetricsForm(sub, fullId) {
    let html = `
      <div class="ng-card">
        <div class="ng-card-title">📊 外呼记录登记</div>
        <p style="font-size: 13px; color: var(--ng-text-muted); margin-bottom: 12px;">
          标准记录维度（点击展开填写）
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    `;

    sub.fields.forEach(field => {
      html += `<span style="background: var(--ng-bg-light); padding: 4px 12px; border-radius: 12px; font-size: 13px;">${field}</span>`;
    });

    html += `
        </div>
        <div style="margin-top: 16px;">
          <button class="ng-btn ng-btn-primary" onclick="window.open('data-analysis.html', '_blank')">
            前往数据分析工具
          </button>
        </div>
      </div>
    `;
    return html;
  }

  renderSummary(sub) {
    let html = '';
    if (sub.content) {
      html += `<div class="ng-card"><div class="ng-card-content">${sub.content}</div></div>`;
    }
    return html;
  }

  // ========== 右侧面板 ==========
  renderRightPanel() {
    const container = document.getElementById('ngRightPanel');
    if (!container) return;

    let html = `
      <div class="ng-panel-card">
        <div class="ng-panel-title">📌 我的书签</div>
        <div id="bookmarksList">
    `;

    if (this.bookmarks.length === 0) {
      html += '<p style="font-size: 13px; color: var(--ng-text-muted);">暂无书签</p>';
    } else {
      html += '<div style="display: flex; flex-direction: column; gap: 8px;">';
      this.bookmarks.forEach(bm => {
        const [sectionId, subId] = bm.split('-').slice(0, 2);
        const section = this.data?.sections.find(s => s.id === sectionId);
        const sub = section?.subsections?.find(s => s.id === subId);
        if (sub) {
          html += `
            <a href="#${bm}" class="ng-tag" style="text-decoration: none;">
              <span class="ng-tag-label">${section?.icon} ${sub.title}</span>
            </a>
          `;
        }
      });
      html += '</div>';
    }

    html += `
        </div>
      </div>

      <div class="ng-panel-card">
        <div class="ng-panel-title">📝 我的笔记</div>
        <div id="notesList">
    `;

    const noteKeys = Object.keys(this.notes);
    if (noteKeys.length === 0) {
      html += '<p style="font-size: 13px; color: var(--ng-text-muted);">暂无笔记</p>';
    } else {
      html += '<div class="ng-notes-list">';
      noteKeys.forEach(key => {
        const note = this.notes[key];
        html += `
          <div class="ng-note-item">
            <div class="ng-note-content">${note}</div>
            <a href="#${key}" style="font-size: 11px; color: var(--ng-primary);">查看</a>
          </div>
        `;
      });
      html += '</div>';
    }

    html += `
        </div>
      </div>

      <div class="ng-panel-card">
        <div class="ng-panel-title">⚙️ 操作</div>
        <button class="ng-btn ng-btn-outline" style="width: 100%; margin-bottom: 8px;" id="exportProgress">
          📥 导出进度
        </button>
        <button class="ng-btn ng-btn-outline" style="width: 100%; margin-bottom: 8px;" id="importProgress">
          📤 导入进度
        </button>
        <button class="ng-btn ng-btn-outline" style="width: 100%; color: var(--ng-error);" id="resetProgress">
          🗑️ 重置所有进度
        </button>
      </div>
    `;

    container.innerHTML = html;
  }

  // ========== 事件绑定 ==========
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
    document.querySelectorAll('[data-expandable]').forEach(item => {
      item.querySelector('.ng-expandable-header').addEventListener('click', () => {
        item.classList.toggle('open');
        const id = item.dataset.expandable;
        if (!this.progress.openSections) this.progress.openSections = [];
        if (item.classList.contains('open')) {
          if (!this.progress.openSections.includes(id)) {
            this.progress.openSections.push(id);
          }
        } else {
          this.progress.openSections = this.progress.openSections.filter(s => s !== id);
        }
        this.saveProgress();
      });
    });

    // 复选框
    document.querySelectorAll('.ng-checkbox[data-check]').forEach(checkbox => {
      checkbox.addEventListener('click', (e) => {
        const id = e.target.dataset.check;
        e.target.classList.toggle('checked');
        e.target.closest('.ng-checklist-item').classList.toggle('completed');

        if (!this.progress.checkedItems) this.progress.checkedItems = [];
        if (e.target.classList.contains('checked')) {
          if (!this.progress.checkedItems.includes(id)) {
            this.progress.checkedItems.push(id);
          }
        } else {
          this.progress.checkedItems = this.progress.checkedItems.filter(i => i !== id);
        }
        this.saveProgress();
        this.updateProgress();
      });
    });

    // 书签
    document.querySelectorAll('[data-bookmark]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.bookmark;
        const index = this.bookmarks.indexOf(id);
        if (index > -1) {
          this.bookmarks.splice(index, 1);
          e.target.classList.remove('active');
          e.target.textContent = '☆';
        } else {
          this.bookmarks.push(id);
          e.target.classList.add('active');
          e.target.textContent = '⭐';
        }
        this.saveBookmarks();
        this.renderRightPanel();
        this.bindEvents();
      });
    });

    // 笔记按钮
    document.querySelectorAll('[data-note]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.note;
        const existingNote = this.notes[id] || '';
        const note = prompt('添加笔记：', existingNote);
        if (note !== null) {
          if (note.trim()) {
            this.notes[id] = note;
          } else {
            delete this.notes[id];
          }
          this.saveNotes();
          this.renderContent();
          this.bindEvents();
        }
      });
    });

    // 删除笔记
    document.querySelectorAll('[data-delete-note]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.deleteNote;
        delete this.notes[id];
        this.saveNotes();
        this.renderContent();
        this.bindEvents();
      });
    });

    // 表单保存
    document.querySelectorAll('[data-save-form]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const formId = e.target.dataset.saveForm;
        const inputs = document.querySelectorAll(`[data-form="${formId}"]`);
        if (!this.progress.formData) this.progress.formData = {};
        if (!this.progress.formData[formId]) this.progress.formData[formId] = {};

        inputs.forEach(input => {
          const field = input.dataset.field;
          this.progress.formData[formId][field] = input.value;
        });

        this.saveProgress();
        alert('已保存！');
      });
    });

    // 导出进度
    document.getElementById('exportProgress')?.addEventListener('click', () => {
      const data = {
        progress: this.progress,
        bookmarks: this.bookmarks,
        notes: this.notes,
        exportDate: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `newcomer-guide-progress-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    // 导入进度
    document.getElementById('importProgress')?.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const data = JSON.parse(event.target.result);
              if (data.progress) this.progress = data.progress;
              if (data.bookmarks) this.bookmarks = data.bookmarks;
              if (data.notes) this.notes = data.notes;
              this.saveProgress();
              this.saveBookmarks();
              this.saveNotes();
              this.render();
              this.bindEvents();
              alert('导入成功！');
            } catch (err) {
              alert('导入失败：文件格式错误');
            }
          };
          reader.readAsText(file);
        }
      };
      input.click();
    });

    // 重置进度
    document.getElementById('resetProgress')?.addEventListener('click', () => {
      if (confirm('确定要重置所有学习进度吗？此操作不可恢复。')) {
        this.progress = {};
        this.bookmarks = [];
        this.notes = {};
        this.saveProgress();
        this.saveBookmarks();
        this.saveNotes();
        this.render();
        this.bindEvents();
        alert('已重置！');
      }
    });

    // 流程图节点点击
    document.querySelectorAll('.ng-flow-node[data-goto]').forEach(node => {
      node.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = e.target.dataset.goto;
        this.scrollToSection(sectionId);
      });
    });
  }

  // ========== 工具方法 ==========
  scrollToSection(sectionId) {
    const section = document.getElementById(`section-${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  updateProgress() {
    // 计算总检查项数量
    let totalItems = 0;
    let completedItems = 0;

    this.data?.sections.forEach(section => {
      section.subsections?.forEach(sub => {
        if (sub.checklist) {
          totalItems += sub.checklist.length;
          sub.checklist.forEach((_, index) => {
            const itemId = `${section.id}-${sub.id}-item-${index}`;
            if (this.progress.checkedItems?.includes(itemId)) {
              completedItems++;
            }
          });
        }
        if (sub.type === 'checklist-card' && sub.items) {
          totalItems += sub.items.length;
          sub.items.forEach((_, index) => {
            const itemId = `${section.id}-${sub.id}-item-${index}`;
            if (this.progress.checkedItems?.includes(itemId)) {
              completedItems++;
            }
          });
        }
      });
    });

    const percent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');

    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressPercent) progressPercent.textContent = `${percent}%`;
  }

  restoreState() {
    // 恢复表单数据
    if (this.progress.formData) {
      Object.keys(this.progress.formData).forEach(formId => {
        const fields = this.progress.formData[formId];
        Object.keys(fields).forEach(field => {
          const input = document.querySelector(`[data-form="${formId}"][data-field="${field}"]`);
          if (input) input.value = fields[field];
        });
      });
    }

    // 恢复折叠状态
    if (this.progress.openSections) {
      this.progress.openSections.forEach(id => {
        const el = document.querySelector(`[data-expandable="${id}"]`);
        if (el) el.classList.add('open');
      });
    }
  }

  showError(message) {
    const container = document.getElementById('ngContent');
    if (container) {
      container.innerHTML = `
        <div class="ng-important-box danger">
          <div class="ng-important-title">❌ 错误</div>
          <p>${message}</p>
        </div>
      `;
    }
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  window.newcomerGuide = new NewcomerGuide({
    dataPath: '../data/newcomer-guide-data.json'
  });
});
