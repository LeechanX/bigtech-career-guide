const fs = require('fs');
const path = require('path');

// 1. 严格保留你原有的多目录架构，统一使用痛点分类作为筛选标签
const TRACKS = [
  {
    id: 'backend',
    title: '后端开发 backend 1v1 辅导真实案例库',
    desc: '从高并发死局、中间件灾难到架构重构，揭秘大厂后端真实面评与辅导逆转实录。',
    categories: ['简历重构', '面评逆向', '薪资博弈', '职级跨越', '赛道转型']
  },
  {
    id: 'frontend',
    title: '前端开发 1v1 辅导真实案例库',
    desc: '从渲染性能瓶颈到前端基建重构，揭秘字节、美团前端核心岗真实面评与诊断实录。',
    categories: ['简历重构', '面评逆向', '薪资博弈', '职级跨越', '赛道转型']
  },
  {
    id: 'client',
    title: '客户端工程师 1v1 辅导真实案例库',
    desc: 'iOS/Android 内存泄漏、帧率调优实战复盘，突破 Native 架构师晋升瓶颈。',
    categories: ['简历重构', '面评逆向', '薪资博弈', '职级跨越', '赛道转型']
  },
  {
    id: 'ai',
    title: 'AI / Agent 工程师 1v1 辅导真实案例库',
    desc: '从 CRUD 逃顶转型到 RAG / Agent 架构重构，揭秘 AI 新锐大厂高薪 Offer 逆袭实录。',
    categories: ['简历重构', '面评逆向', '薪资博弈', '职级跨越', '赛道转型']
  }
];

// 2. 核心通用构建逻辑
function buildTrack(track) {
  // 严格映射到你指定的目录：interview/ai/items, interview/backend/items 等
  const trackDir = path.join(__dirname, `../interview/${track.id}`);
  const itemsDir = path.join(trackDir, 'items');
  const outputIndexFile = path.join(trackDir, 'index.html');

  if (!fs.existsSync(itemsDir)) {
    fs.mkdirSync(itemsDir, { recursive: true });
  }

  const files = fs.readdirSync(itemsDir).filter(f => f.endsWith('.html'));

  const cases = files.map(file => {
    const content = fs.readFileSync(path.join(itemsDir, file), 'utf8');

    // 提取常规与新增的专属 Meta
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/i);
    const keywordsMatch = content.match(/<meta\s+name="keywords"\s+content="(.*?)"/i);
    
    // 案例核心两项：客户画像、拿到的 Offer
    const profileMatch = content.match(/<meta\s+name="client-profile"\s+content="(.*?)"/i);
    const resultMatch = content.match(/<meta\s+name="result-offer"\s+content="(.*?)"/i);

    const rawKeywords = keywordsMatch ? keywordsMatch[1].split(',').map(k => k.trim()) : [];
    
    return {
      filename: file,
      url: `/interview/${track.id}/items/${file}`,
      title: titleMatch ? titleMatch[1].replace(' - BigTechCareer', '') : file,
      desc: descMatch ? descMatch[1] : '点击查看深度复盘诊断报告。',
      clientProfile: profileMatch ? profileMatch[1] : '大厂在职工程师 / 遭遇求职瓶颈',
      resultOffer: resultMatch ? resultMatch[1] : '成功打破黑盒，拿下高薪 Offer',
      tags: rawKeywords.filter(k => k)
    };
  }).reverse();

  // 动态生成按钮分类标签
  const filterButtonsHTML = track.categories.map(cat => 
    `<button class="filter-btn" onclick="filterCategory('${cat}')">${cat}</button>`
  ).join('\n            ');

  // 3. 高转化率 Case UI HTML 模板
  const indexHtmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${track.title} - BigTechCareer</title>
  <meta name="description" content="${track.desc}">
  <link rel="canonical" href="https://bigtechcareer.com/interview/${track.id}/">
  <link rel="stylesheet" href="/assets/style.css">
</head>

<body>
<header id="site-header"></header>

<main>
  <div class="page-layout">
    <div class="page-main">

      <section class="hero" style="background: linear-gradient(135deg, #0f172a, #1e1b4b); color: #fff; padding: 48px 0;">
        <div class="container">
          <h1 style="color: #fff; margin-bottom: 12px; font-size: 32px;">${track.title.split(' 1v1')[0]}</h1>
          <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6; margin: 0;">
            放弃八股文死记硬背。用咨询公司的上帝视角，深度拆解 <strong>真实例子</strong><br>
            是如何跨越系统设计考核黑盒，实现 <span style="color: #facc15; font-weight: bold;">Offer 薪资与职级越级</span> 的。
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <style>
            .filter-tabs { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; }
            .filter-btn { padding: 8px 18px; font-size: 14px; font-weight: 600; border: none; background: transparent; color: #64748b; cursor: pointer; transition: all 0.2s; border-radius: 20px; }
            .filter-btn:hover { color: #0f172a; background: #f1f5f9; }
            .filter-btn.active { background: #0f172a; color: #ffffff; }

            .case-list { display: flex; flex-direction: column; gap: 24px; min-height: 300px; }
            
            .case-card { border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff; transition: all 0.3s; padding: 24px; position: relative; overflow: hidden; }
            .case-card:hover { border-color: #94a3b8; box-shadow: 0 10px 25px rgba(0,0,0,0.05); transform: translateY(-2px); }
            .case-card::before { content: ""; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: #3b82f6; }
            
            .case-title { font-size: 20px; font-weight: 800; color: #0f172a; text-decoration: none; display: block; margin-bottom: 12px; line-height: 1.4; }
            .case-title:hover { color: #2563eb; }
            
            .case-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
            .case-tag { font-size: 12px; background: #f8fafc; border: 1px solid #e2e8f0; color: #475569; padding: 4px 10px; border-radius: 6px; font-weight: 600; }
            
            .case-meta { background: #f8fafc; padding: 12px 16px; border-radius: 8px; margin-bottom: 16px; display: flex; flex-direction: column; gap: 8px; }
            .meta-row { font-size: 14px; color: #334155; }
            .meta-label { font-weight: 700; color: #64748b; display: inline-block; width: 85px; }
            
            .case-desc { font-size: 15px; color: #475569; line-height: 1.7; margin-bottom: 16px; }
            
            .read-more { font-size: 14px; font-weight: 700; color: #2563eb; text-decoration: none; display: inline-flex; align-items: center; }
            .read-more:hover { text-decoration: underline; }

            .pagination-bar { display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 40px; }
            .page-btn { padding: 8px 14px; font-size: 14px; font-weight: 600; border: 1px solid #e2e8f0; background: #ffffff; color: #334155; border-radius: 6px; cursor: pointer; }
            .page-btn.disabled { opacity: 0.5; cursor: not-allowed; }
            .page-btn.active { background: #0f172a; color: #ffffff; border-color: #0f172a; }
          </style>

          <div class="filter-tabs">
            <button class="filter-btn active" onclick="filterCategory('全部案例')">全部案例</button>
            ${filterButtonsHTML}
          </div>

          <div id="case-list-container" class="case-list"></div>
          <div id="pagination-container" class="pagination-bar"></div>
        </div>
      </section>

    </div>
    <aside id="site-sidebar" class="page-sidebar"></aside>
  </div>
</main>

<footer>
  <div class="container">© 2026 BigTechCareer · 大厂求职与职业发展指南</div>
</footer>

<script>
  const ALL_CASES = ${JSON.stringify(cases, null, 2)};
  const PAGE_SIZE = 8;
  let currentCategory = '全部案例';
  let currentPage = 1;

  function filterCategory(cat) {
    currentCategory = cat;
    currentPage = 1;
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.innerText === cat);
    });
    render();
  }

  function goToPage(p) {
    currentPage = p;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
  }

  function render() {
    const container = document.getElementById('case-list-container');
    const pagination = document.getElementById('pagination-container');

    const filtered = ALL_CASES.filter(c => {
      if (currentCategory === '全部案例') return true;
      return c.tags.some(t => t.includes(currentCategory));
    });

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    if (pageItems.length === 0) {
      container.innerHTML = '<div style="text-align:center; padding:60px; color:#94a3b8; font-size:16px;">正在撰写最新的高阶辅导复盘，敬请期待。</div>';
    } else {
      container.innerHTML = pageItems.map(c => \`
        <div class="case-card">
          <a href="\${c.url}" class="case-title">\${c.title}</a>
          <div class="case-tags">
            \${c.tags.map(t => \`<span class="case-tag">\${t}</span>\`).join('')}
          </div>
          <div class="case-meta">
            <div class="meta-row"><span class="meta-label">👤 画像：</span> \${c.clientProfile}</div>
            <div class="meta-row"><span class="meta-label">🏆 战果：</span> <strong style="color: #059669;">\${c.resultOffer}</strong></div>
          </div>
          <p class="case-desc">\${c.desc}</p>
          <a href="\${c.url}" class="read-more">深度查阅复盘与防守细节 →</a>
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
</html>`;

  fs.writeFileSync(outputIndexFile, indexHtmlContent, 'utf8');
  console.log(`[Success] Track [${track.id}] indexed ${cases.length} cases -> ${outputIndexFile}`);
}

// 4. 执行全量构建
TRACKS.forEach(buildTrack);
console.log('\nAll track indexes built successfully!');