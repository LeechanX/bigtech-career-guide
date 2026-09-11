const fs = require('fs');
const path = require('path');

// 1. 定义需要自动构建的所有岗位方向配置
const TRACKS = [
  {
    id: 'backend',
    title: '后端工程师高频面试题库｜系统设计与高并发八股 SOP',
    desc: '汇集字节、腾讯、阿里、拼多多高并发架构、存储底层与分布式真题。',
    keywords: '后端工程师面试题, 高并发系统设计, Redis HotKey, MySQL MVCC',
    categories: ['高并发', '数据库', '分布式', '网络底层']
  },
  {
    id: 'frontend',
    title: '前端工程师高频面试题库｜渲染性能与异步架构 SOP',
    desc: '汇总字节、小红书、美团等大厂前端渲染优化、JS底层与 Web 架构真题。',
    keywords: '前端工程师面试题, React源码, Vue响应式, 前端性能优化',
    categories: ['框架原理', '性能优化', 'JS底层', '工程化']
  },
  {
    id: 'client',
    title: '客户端工程师高频面试题库｜iOS / Android 性能调优 SOP',
    desc: '汇总 Apple、字节、腾讯等大厂客户端内存治理、渲染帧率与 Native 架构真题。',
    keywords: '客户端面试题, iOS开发, Android底层, Swift, Kotlin, 性能调优',
    categories: ['iOS/Swift', 'Android/Kotlin', '性能优化', '跨端架构']
  },
  {
    id: 'ai',
    title: 'AI / Agent 工程师高频面试题库｜RAG / LLM 与微调 SOP',
    desc: '汇总 DeepSeek、月之暗面、字节 AI 团队大模型推理、RAG 检索与 Agent 状态机真题。',
    keywords: 'AI工程师面试题, Agent状态机, RAG检索, LLM微调, vLLM优化',
    categories: ['RAG检索', 'Agent架构', '模型推理', 'Post-Training']
  },
  {
    id: 'algorithm-project',
    title: '算法与项目深挖高频题库｜LeetCode 频次与系统防守 SOP',
    desc: '精选各大厂算法高频真题与项目深挖防守模版，提供 ACM 模式代码范式。',
    keywords: '大厂算法真题, LeetCode高频, 项目深挖, ACM模式',
    categories: ['ACM手撕', '图论DP', '项目深挖', '架构防守']
  }
];

// 2. 核心通用构建逻辑
function buildTrack(track) {
  const trackDir = path.join(__dirname, `../interview/${track.id}`);
  const itemsDir = path.join(trackDir, 'items');
  const outputIndexFile = path.join(trackDir, 'index.html');

  if (!fs.existsSync(itemsDir)) {
    fs.mkdirSync(itemsDir, { recursive: true });
  }

  const files = fs.readdirSync(itemsDir).filter(f => f.endsWith('.html'));

  const questions = files.map(file => {
    const content = fs.readFileSync(path.join(itemsDir, file), 'utf8');

    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/i);
    const keywordsMatch = content.match(/<meta\s+name="keywords"\s+content="(.*?)"/i);

    const rawKeywords = keywordsMatch ? keywordsMatch[1].split(',').map(k => k.trim()) : [];
    
    let difficulty = 'Medium';
    const tags = [];

    rawKeywords.forEach(kw => {
      if (['Hard', 'Medium', 'Easy'].includes(kw)) {
        difficulty = kw;
      } else if (kw) {
        tags.push(kw);
      }
    });

    return {
      filename: file,
      url: `/interview/${track.id}/items/${file}`,
      title: titleMatch ? titleMatch[1].replace(' - BigTechCareer', '') : file,
      desc: descMatch ? descMatch[1] : '点击查看详细技术攻防 SOP 与代码实现。',
      difficulty,
      tags
    };
  }).reverse();

  // 动态生成按钮分类标签
  const filterButtonsHTML = track.categories.map(cat => 
    `<button class="filter-btn" onclick="filterCategory('${cat}')">${cat}</button>`
  ).join('\n            ');

  const indexHtmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${track.title} - BigTechCareer</title>
  <meta name="description" content="${track.desc}">
  <meta name="keywords" content="${track.keywords}">
  <link rel="canonical" href="https://bigtechcareer.com/interview/${track.id}/">
  <link rel="stylesheet" href="/assets/style.css">
</head>

<body>

<header id="site-header"></header>

<main>
  <div class="page-layout">
    <div class="page-main">

      <section class="hero">
        <div class="container">
          <h1>${track.title.split('｜')[0]}</h1>
          <p>${track.desc}</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <style>
            .filter-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
            .filter-btn { padding: 8px 16px; font-size: 14px; font-weight: 600; border: 1px solid #e5e7eb; background: #f8fafc; color: #475569; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
            .filter-btn:hover { background: #f1f5f9; }
            .filter-btn.active { background: #2563eb; color: #ffffff; border-color: #2563eb; }

            .q-card-list { display: flex; flex-direction: column; gap: 16px; min-height: 300px; }
            .q-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px; background: #ffffff; transition: all 0.2s; }
            .q-card:hover { border-color: #2563eb; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

            .q-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 8px; }
            .q-title { font-size: 18px; font-weight: 700; color: #0f172a; text-decoration: none; }
            .q-title:hover { color: #2563eb; }

            .diff-badge { font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 12px; white-space: nowrap; }
            .diff-Hard { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
            .diff-Medium { background: #fefce8; color: #ca8a04; border: 1px solid #fef08a; }
            .diff-Easy { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }

            .q-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
            .q-tag { font-size: 12px; background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 4px; font-weight: 600; }

            .q-desc { font-size: 14px; color: #475569; line-height: 1.6; margin: 0; }

            .pagination-bar { display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 30px; }
            .page-btn { padding: 6px 12px; font-size: 14px; font-weight: 600; border: 1px solid #e5e7eb; background: #ffffff; color: #334155; border-radius: 4px; cursor: pointer; }
            .page-btn.disabled { opacity: 0.5; cursor: not-allowed; }
            .page-btn.active { background: #2563eb; color: #ffffff; border-color: #2563eb; }
          </style>

          <div class="filter-tabs">
            <button class="filter-btn active" onclick="filterCategory('all')">全部考题</button>
            ${filterButtonsHTML}
          </div>

          <div id="q-card-container" class="q-card-list"></div>
          <div id="pagination-container" class="pagination-bar"></div>
        </div>
      </section>

    </div>

    <aside id="site-sidebar" class="page-sidebar"></aside>
  </div>
</main>

<footer>
  <div class="container">
    © 2026 BigTechCareer · 大厂求职与职业发展指南
  </div>
</footer>

<script>
  const ALL_QUESTIONS = ${JSON.stringify(questions, null, 2)};
  const PAGE_SIZE = 10;
  let currentCategory = 'all';
  let currentPage = 1;

  function filterCategory(cat) {
    currentCategory = cat;
    currentPage = 1;
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.innerText.includes(cat) || (cat === 'all' && btn.innerText.includes('全部')));
    });
    render();
  }

  function goToPage(p) {
    currentPage = p;
    render();
  }

  function render() {
    const container = document.getElementById('q-card-container');
    const pagination = document.getElementById('pagination-container');

    const filtered = ALL_QUESTIONS.filter(q => {
      if (currentCategory === 'all') return true;
      return q.tags.some(t => t.includes(currentCategory));
    });

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    if (pageItems.length === 0) {
      container.innerHTML = '<div style="text-align:center; padding:40px; color:#94a3b8;">暂无符合条件的相关考题</div>';
    } else {
      container.innerHTML = pageItems.map(q => \`
        <div class="q-card">
          <div class="q-header">
            <a href="\${q.url}" class="q-title">\${q.title}</a>
            <span class="diff-badge diff-\${q.difficulty}">\${q.difficulty}</span>
          </div>
          <div class="q-tags">
            \${q.tags.map(t => \`<span class="q-tag">\${t}</span>\`).join('')}
          </div>
          <p class="q-desc">\${q.desc}</p>
        </div>
      \`).join('');
    }

    if (totalPages <= 1) {
      pagination.innerHTML = '';
      return;
    }

    let pageBtnsHTML = \`<button class="page-btn \${currentPage === 1 ? 'disabled' : ''}" \${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(\${currentPage - 1})">上一页</button>\`;
    for (let i = 1; i <= totalPages; i++) {
      pageBtnsHTML += \`<button class="page-btn \${i === currentPage ? 'active' : ''}" onclick="goToPage(\${i})">\${i}</button>\`;
    }
    pageBtnsHTML += \`<button class="page-btn \${currentPage === totalPages ? 'disabled' : ''}" \${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(\${currentPage + 1})">下一页</button>\`;

    pagination.innerHTML = pageBtnsHTML;
  }

  document.addEventListener("DOMContentLoaded", render);
</script>

<script src="/assets/header.js"></script>
<script src="/assets/sidebar.js"></script>
</body>
</html>
`;

  fs.writeFileSync(outputIndexFile, indexHtmlContent, 'utf8');
  console.log(`[Success] Track [${track.id}] indexed ${questions.length} questions -> ${outputIndexFile}`);
}

// 3. 执行全量构建
TRACKS.forEach(buildTrack);
console.log('\nAll track indexes built successfully!');