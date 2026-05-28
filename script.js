const baseStats = {
  study: 50,
  energy: 60,
  budget: 70,
  mood: 60,
  social: 45,
  stress: 35
};

const statMeta = {
  study: { name: "学习值", icon: "📚", color: "#9ecbff" },
  energy: { name: "体力值", icon: "🌿", color: "#9ee6c8" },
  budget: { name: "预算值", icon: "🛒", color: "#ffd38f" },
  mood: { name: "心情值", icon: "✨", color: "#ffb8d0" },
  social: { name: "社交值", icon: "🧋", color: "#c7b6ff" },
  stress: { name: "压力值", icon: "💻", color: "#ffadad" }
};

const roles = [
  {
    id: "hd",
    name: "HD 冲刺型",
    description: "学习值更高，压力值略高，社交值略低。",
    modifier: { study: 15, stress: 8, social: -8 }
  },
  {
    id: "social",
    name: "社交达人型",
    description: "社交值和心情值更高，预算值和学习值略低。",
    modifier: { social: 16, mood: 10, budget: -8, study: -6 }
  },
  {
    id: "cute-poor",
    name: "精致贫穷型",
    description: "心情值较高，社交值略高，预算值较低。",
    modifier: { mood: 14, social: 8, budget: -18 }
  },
  {
    id: "deadline",
    name: "截止日前夜战神型",
    description: "压力值较高，体力值较低，但最后爆发力很强。",
    modifier: { stress: 16, energy: -12, study: 4 }
  }
];

const events = [
  {
    day: "第 1 天 / 星期一",
    icon: "📚",
    title: "早八 lecture 与睡眠危机",
    description: "新的一周开始了，早上 9 点有 lecture，但你昨晚刷手机刷到很晚。",
    options: [
      {
        text: "A. 硬着头皮去学校上课",
        resultTitle: "你坐上 tram，灵魂还在床上。",
        result: "虽然眼睛半睁半闭，但你还是记下了重点。咖啡拯救了上午，压力也稍微安静了一点。",
        delta: { study: 12, energy: -12, mood: -3, stress: -4 }
      },
      {
        text: "B. 在床上看 lecture recording",
        resultTitle: "被窝变成了临时 lecture theatre。",
        result: "你成功听完大半节课，但中途暂停了三次。学习有进展，体力也保住了一些。",
        delta: { study: 7, energy: 3, mood: 4, stress: 3 }
      },
      {
        text: "C. 直接睡到中午再说",
        resultTitle: "你和闹钟暂时断绝关系。",
        result: "睡眠质量回来了，但 Canvas 上的 recording 像未读消息一样默默发光。",
        delta: { study: -8, energy: 16, mood: 8, stress: 8 }
      }
    ]
  },
  {
    day: "第 2 天 / 星期二",
    icon: "🌧️",
    title: "墨尔本天气突然变脸",
    description: "早上出门时还晴天，中午突然降温下雨，但你下午还要去 campus。",
    options: [
      {
        text: "A. 带伞坐 tram 去学校",
        resultTitle: "Myki 哔了一声，你也哔了一声。",
        result: "你被风吹得有点怀疑人生，但还是准时到了学校。墨尔本天气没有打败你。",
        delta: { study: 9, energy: -8, budget: -5, stress: 3 }
      },
      {
        text: "B. 叫 Uber，钱包默默流泪",
        resultTitle: "车门关上的瞬间，预算值开了小差。",
        result: "你干燥、准时、体面地抵达 campus，只是银行卡余额发来了一封冷静的通知。",
        delta: { study: 7, energy: 3, budget: -18, mood: 4, stress: -6 }
      },
      {
        text: "C. 在家学习，拒绝被天气教育",
        resultTitle: "你把窗外的雨声当白噪音。",
        result: "没有通勤，没有淋雨，也没有 campus 氛围。效率还行，但社交值稍微掉线。",
        delta: { study: 6, energy: 4, social: -5, stress: 2 }
      }
    ]
  },
  {
    day: "第 3 天 / 星期三",
    icon: "💻",
    title: "Group assignment 队友失踪",
    description: "小组作业快到 deadline，但队友已读不回，Google Doc 还是空白。",
    options: [
      {
        text: "A. 主动开文档整理分工",
        resultTitle: "你成为了 Google Doc 的临时项目经理。",
        result: "文档终于有了标题、目录和任务表。你累了一点，但整个小组看起来像是重新开机了。",
        delta: { study: 14, energy: -10, social: 6, stress: 5 }
      },
      {
        text: "B. 在群里发一句“大家有什么进展吗？”",
        resultTitle: "群聊出现短暂心跳。",
        result: "有人回了一个 thumbs up，有人继续沉默。至少你试图召唤队友了。",
        delta: { study: 4, social: 5, stress: 7, mood: -2 }
      },
      {
        text: "C. 假装没看见，晚上再处理",
        resultTitle: "你把焦虑放进了稍后再说文件夹。",
        result: "下午很轻松，晚上很刺激。Google Doc 依然像一片雪地。",
        delta: { study: -5, energy: 5, mood: 6, stress: 12 }
      }
    ]
  },
  {
    day: "第 4 天 / 星期四",
    icon: "🧋",
    title: "奶茶、超市与预算危机",
    description: "你路过奶茶店，又想起冰箱里已经没什么吃的了。",
    options: [
      {
        text: "A. 买奶茶奖励自己",
        resultTitle: "珍珠很 Q，预算很脆。",
        result: "第一口确实治愈，但你回家打开冰箱时，现实也很清爽。",
        delta: { budget: -10, mood: 11, social: 3, energy: 2 }
      },
      {
        text: "B. 去 Coles/Woolworths 买食材做饭",
        resultTitle: "你获得了生活稳定感。",
        result: "今晚有热饭，明天也有饭盒。做饭有点累，但你感觉自己是个成熟留学生。",
        delta: { budget: 8, energy: -8, mood: 7, stress: -5 }
      },
      {
        text: "C. 只买泡面和速冻食品",
        resultTitle: "效率很高，营养在门外等候。",
        result: "你用最短时间解决了吃饭问题，预算勉强守住，但心情没有被认真照顾。",
        delta: { budget: 3, energy: 3, mood: -5, stress: 3 }
      }
    ]
  },
  {
    day: "第 5 天 / 星期五",
    icon: "🚋",
    title: "City 邀约与 quiz 压力",
    description: "朋友约你去 city 玩，但下周有 quiz，Canvas 上的提醒非常刺眼。",
    options: [
      {
        text: "A. 去 city 放松一下",
        resultTitle: "你在 city 找回了一点人类感。",
        result: "朋友、brunch、街景都很好。只是回家打开 Canvas 时，心跳也很有存在感。",
        delta: { mood: 14, social: 13, budget: -16, study: -7, stress: 5 }
      },
      {
        text: "B. 留在图书馆复习",
        resultTitle: "图书馆灯光照亮了你的 quiz 命运。",
        result: "你刷完了重点，也错过了一些快乐。学习值稳稳上升，心情小声叹气。",
        delta: { study: 15, energy: -9, mood: -5, stress: -2 }
      },
      {
        text: "C. 先学习两小时再出去",
        resultTitle: "你选择了成年人的折中方案。",
        result: "复习有推进，朋友也见到了。虽然有点赶，但这一天总体还算漂亮。",
        delta: { study: 8, energy: -7, mood: 9, social: 8, budget: -9, stress: -3 }
      }
    ]
  },
  {
    day: "第 6 天 / 星期六",
    icon: "📱",
    title: "本来想学习，但手机太好玩",
    description: "你打开电脑准备学习，结果 TikTok、小红书和 Netflix 同时向你招手。",
    options: [
      {
        text: "A. 严格番茄钟学习",
        resultTitle: "你把手机放远，世界恢复秩序。",
        result: "25 分钟一轮的节奏意外有效。你甚至短暂相信自己可以掌控人生。",
        delta: { study: 14, energy: -8, mood: -2, stress: -4 }
      },
      {
        text: "B. 刷手机“只看十分钟”",
        resultTitle: "十分钟在时间里迷路了。",
        result: "你获得了很多快乐碎片，也失去了一个下午。算法很懂你，deadline 也很懂你。",
        delta: { study: -10, energy: -2, mood: 9, stress: 12 }
      },
      {
        text: "C. 去散步或健身恢复心情",
        resultTitle: "你让大脑重新通风。",
        result: "运动后整个人清醒了一些。学习进度不算多，但状态明显回来了。",
        delta: { energy: 8, mood: 12, stress: -7, study: 2 }
      }
    ]
  },
  {
    day: "第 7 天 / 星期日",
    icon: "✨",
    title: "Deadline 前最后一天",
    description: "作业明天截止，你终于感受到命运的重量。",
    options: [
      {
        text: "A. 提前检查 reference 和格式",
        resultTitle: "你的 reference 列表终于像样了。",
        result: "你发现了三个格式问题和一个小 typo。现在提交按钮看起来没那么可怕。",
        delta: { study: 12, energy: -6, mood: 5, stress: -9 }
      },
      {
        text: "B. 通宵赶完",
        resultTitle: "夜晚见证了你的极限操作。",
        result: "你写完了，但代价很真实。清晨的你像一杯被喝空的咖啡。",
        delta: { study: 18, energy: -24, mood: -12, stress: 16 }
      },
      {
        text: "C. 向 ChatGPT 求救并疯狂 proofread",
        resultTitle: "你进入了 proofread 加速模式。",
        result: "你没有照搬，而是用它帮你检查逻辑、语气和错别字。最后版本明显更稳了。",
        delta: { study: 14, energy: -10, mood: 3, stress: -2 }
      }
    ]
  }
];

const endings = [
  {
    title: "燃尽型学术武器",
    badge: "🔥",
    score: "A",
    condition: stats => stats.study >= 82 && stats.energy <= 35 && stats.mood <= 38,
    description: "成绩可能不错，但你的灵魂已经被 deadline 带走了。请立刻睡觉。"
  },
  {
    title: "截止日前夜传奇",
    badge: "🌙",
    score: "A",
    condition: stats => stats.stress >= 78 && stats.study >= 78,
    description: "你在最后一天突然觉醒，用一晚完成了别人三天的进度。可怕，但有效。"
  },
  {
    title: "HD 战神",
    badge: "🏆",
    score: "S",
    condition: stats => stats.study >= 82 && stats.stress <= 70,
    description: "你成功掌控了这一周，作业按时完成，甚至还有时间检查 reference。你是 Canvas 里的传说。"
  },
  {
    title: "咖啡续命生物",
    badge: "☕️",
    score: "B",
    condition: stats => stats.energy <= 35 && stats.stress >= 70 && stats.study >= 65,
    description: "你已经不再是普通学生，而是由咖啡、deadline 和 lecture recording 组成的生物。"
  },
  {
    title: "Myki 受害者",
    badge: "🚋",
    score: "C",
    condition: stats => stats.budget <= 35 && stats.stress >= 65,
    description: "你的一周被交通、天气和预算反复攻击。墨尔本生活教育了你。"
  },
  {
    title: "精致贫穷代表",
    badge: "🧋",
    score: "B",
    condition: stats => stats.budget <= 35 && (stats.mood >= 58 || stats.social >= 55),
    description: "你过得很精致，但银行卡余额不太同意。奶茶、brunch 和 city trip 都留下了证据。"
  },
  {
    title: "墨尔本社交蝴蝶",
    badge: "🦋",
    score: "A",
    condition: stats => stats.social >= 72 && stats.mood >= 72 && stats.study <= 62,
    description: "你认识了很多朋友，也去了很多地方。只是 Canvas 上的 due date 还在安静地看着你。"
  },
  {
    title: "作业幸存者",
    badge: "📄",
    score: "B",
    condition: stats => stats.study >= 55 && stats.study < 82 && stats.stress >= 75,
    description: "你不知道自己怎么活下来的，但你确实提交了。文件名大概率叫 final_final_真的最终版.pdf。"
  },
  {
    title: "勉强活下来了",
    badge: "🩹",
    score: "活着就好",
    condition: stats => [stats.study, stats.energy, stats.budget, stats.mood, stats.social].filter(value => value <= 35).length >= 3,
    description: "你活下来了，这本身就是胜利。下周建议从睡觉和吃饭开始重新做人。"
  },
  {
    title: "平衡型留学生",
    badge: "🌈",
    score: "A",
    condition: stats => {
      const positiveStats = [stats.study, stats.energy, stats.budget, stats.mood, stats.social];
      return positiveStats.every(value => value >= 42 && value <= 82) && stats.stress <= 72;
    },
    description: "你没有完美，但你很稳定。学习、休息、社交和生活都还保持得不错。"
  }
];

let gameState = {
  playerName: "留学生",
  roleId: roles[0].id,
  currentDay: 0,
  stats: { ...baseStats },
  hasChosen: false,
  selectedEnding: null
};

const screens = {
  home: document.getElementById("home-screen"),
  game: document.getElementById("game-screen"),
  ending: document.getElementById("ending-screen")
};

const elements = {
  playerName: document.getElementById("player-name"),
  roleOptions: document.getElementById("role-options"),
  startButton: document.getElementById("start-button"),
  lastEnding: document.getElementById("last-ending"),
  dayLabel: document.getElementById("day-label"),
  roleBadge: document.getElementById("role-badge"),
  playerChip: document.getElementById("player-chip"),
  eventTitle: document.getElementById("event-title"),
  eventIcon: document.getElementById("event-icon"),
  eventDescription: document.getElementById("event-description"),
  options: document.getElementById("options"),
  resultCard: document.getElementById("result-card"),
  resultTitle: document.getElementById("result-title"),
  resultDescription: document.getElementById("result-description"),
  deltaList: document.getElementById("delta-list"),
  nextButton: document.getElementById("next-button"),
  statsList: document.getElementById("stats-list"),
  endingBadge: document.getElementById("ending-badge"),
  endingTitle: document.getElementById("ending-title"),
  endingPlayer: document.getElementById("ending-player"),
  endingDescription: document.getElementById("ending-description"),
  endingScore: document.getElementById("ending-score"),
  endingStats: document.getElementById("ending-stats"),
  shareText: document.getElementById("share-text"),
  copyTip: document.getElementById("copy-tip"),
  copyButton: document.getElementById("copy-button"),
  restartButton: document.getElementById("restart-button")
};

function clampStat(value) {
  return Math.max(0, Math.min(100, value));
}

function switchScreen(screenName) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  screens[screenName].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderRoles() {
  elements.roleOptions.innerHTML = roles.map(role => `
    <button class="role-card ${role.id === gameState.roleId ? "selected" : ""}" type="button" data-role-id="${role.id}">
      <strong>${role.name}</strong>
      <span>${role.description}</span>
    </button>
  `).join("");

  document.querySelectorAll(".role-card").forEach(button => {
    button.addEventListener("click", () => {
      gameState.roleId = button.dataset.roleId;
      renderRoles();
    });
  });
}

function renderLastEnding() {
  const saved = localStorage.getItem("melbourneStudentLastEnding");
  if (!saved) return;

  try {
    const last = JSON.parse(saved);
    elements.lastEnding.textContent = `上次结局：${last.playerName} 获得了【${last.title}】结局，评分 ${last.score}。`;
    elements.lastEnding.classList.remove("hidden");
  } catch (error) {
    localStorage.removeItem("melbourneStudentLastEnding");
  }
}

function startGame() {
  const selectedRole = roles.find(role => role.id === gameState.roleId) || roles[0];
  const name = elements.playerName.value.trim() || "留学生";

  gameState = {
    playerName: name,
    roleId: selectedRole.id,
    currentDay: 0,
    stats: { ...baseStats },
    hasChosen: false,
    selectedEnding: null
  };

  Object.entries(selectedRole.modifier).forEach(([key, value]) => {
    gameState.stats[key] = clampStat(gameState.stats[key] + value);
  });

  elements.roleBadge.textContent = selectedRole.name;
  elements.playerChip.textContent = name;
  switchScreen("game");
  renderDay();
}

function renderDay() {
  const event = events[gameState.currentDay];
  gameState.hasChosen = false;

  elements.dayLabel.textContent = event.day;
  elements.eventTitle.textContent = event.title;
  elements.eventIcon.textContent = event.icon;
  elements.eventDescription.textContent = event.description;
  elements.resultCard.classList.add("hidden");
  elements.nextButton.textContent = gameState.currentDay === events.length - 1 ? "查看我的结局" : "进入下一天";

  elements.options.innerHTML = event.options.map((option, index) => `
    <button class="option-button" type="button" data-option-index="${index}">
      <strong>${option.text}</strong>
      <span>点击选择这一项</span>
    </button>
  `).join("");

  document.querySelectorAll(".option-button").forEach(button => {
    button.addEventListener("click", () => chooseOption(Number(button.dataset.optionIndex)));
  });

  renderStats(elements.statsList, gameState.stats);
}

function chooseOption(optionIndex) {
  if (gameState.hasChosen) return;

  const event = events[gameState.currentDay];
  const option = event.options[optionIndex];
  gameState.hasChosen = true;

  document.querySelectorAll(".option-button").forEach((button, index) => {
    button.disabled = true;
    if (index === optionIndex) button.classList.add("chosen");
  });

  updateStats(option.delta);
  showResult(option);
}

function updateStats(delta) {
  Object.entries(delta).forEach(([key, value]) => {
    gameState.stats[key] = clampStat(gameState.stats[key] + value);
  });

  renderStats(elements.statsList, gameState.stats, true);
}

function renderStats(container, stats, animated = false) {
  container.innerHTML = Object.entries(statMeta).map(([key, meta]) => {
    const value = stats[key];
    return `
      <div class="stat-row">
        <div class="stat-meta">
          <span>${meta.icon} ${meta.name}</span>
          <span>${value}%</span>
        </div>
        <div class="stat-track">
          <div class="stat-fill ${animated ? "pulse" : ""}" style="width: ${value}%; background: ${meta.color};"></div>
        </div>
      </div>
    `;
  }).join("");

  if (animated) {
    window.setTimeout(() => {
      container.querySelectorAll(".stat-fill").forEach(fill => fill.classList.remove("pulse"));
    }, 360);
  }
}

function showResult(option) {
  elements.resultTitle.textContent = option.resultTitle;
  elements.resultDescription.textContent = option.result;
  elements.deltaList.innerHTML = Object.entries(option.delta).map(([key, value]) => {
    const sign = value > 0 ? "+" : "";
    const direction = value >= 0 ? "up" : "down";
    return `<span class="delta-pill ${direction}">${statMeta[key].name} ${sign}${value}</span>`;
  }).join("");
  elements.resultCard.classList.remove("hidden");
  elements.resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function goNextDay() {
  if (!gameState.hasChosen) return;

  if (gameState.currentDay >= events.length - 1) {
    renderEnding();
    return;
  }

  gameState.currentDay += 1;
  renderDay();
}

function calculateEnding() {
  return endings.find(ending => ending.condition(gameState.stats)) || endings[endings.length - 1];
}

function buildShareText(ending) {
  return `我在《澳大利亚墨尔本留学生生存模拟器》中获得了【${ending.title}】结局！我的学习值是 ${gameState.stats.study}，压力值是 ${gameState.stats.stress}。你也来试试看你能不能活过 Week 7。`;
}

function renderEnding() {
  const ending = calculateEnding();
  gameState.selectedEnding = ending;
  const share = buildShareText(ending);

  elements.endingBadge.textContent = ending.badge;
  elements.endingTitle.textContent = ending.title;
  elements.endingPlayer.textContent = `${gameState.playerName} 的一周结束了`;
  elements.endingDescription.textContent = ending.description;
  elements.endingScore.textContent = `评分 ${ending.score}`;
  elements.shareText.textContent = share;
  elements.copyTip.textContent = "";
  renderStats(elements.endingStats, gameState.stats);

  localStorage.setItem("melbourneStudentLastEnding", JSON.stringify({
    playerName: gameState.playerName,
    title: ending.title,
    score: ending.score,
    stats: gameState.stats,
    share
  }));

  switchScreen("ending");
}

async function copyResult() {
  const ending = gameState.selectedEnding || calculateEnding();
  const share = buildShareText(ending);

  try {
    if (!navigator.clipboard) throw new Error("Clipboard API 不可用");
    await navigator.clipboard.writeText(share);
    elements.copyTip.textContent = "已复制到剪贴板，可以发给朋友啦。";
  } catch (error) {
    elements.copyTip.textContent = `当前浏览器不支持自动复制，请手动复制：${share}`;
  }
}

function restartGame() {
  elements.playerName.value = "";
  gameState.currentDay = 0;
  gameState.hasChosen = false;
  renderLastEnding();
  switchScreen("home");
}

elements.startButton.addEventListener("click", startGame);
elements.nextButton.addEventListener("click", goNextDay);
elements.copyButton.addEventListener("click", copyResult);
elements.restartButton.addEventListener("click", restartGame);

renderRoles();
renderLastEnding();
