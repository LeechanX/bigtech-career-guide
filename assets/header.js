document.addEventListener("DOMContentLoaded", function() {
  const headerContainer = document.getElementById("site-header");
  if (!headerContainer) return;

  headerContainer.innerHTML = `
    <div class="header-inner">
      <a class="site-name" href="/">BigTechCareer</a>

      <nav>
        <details>
          <summary>大厂情报</summary>
          <div>
            <a href="/companies/">国内外大厂总览</a>
            <a href="/companies/bytedance/">字节跳动（推荐部门/风气/对标）</a>
            <a href="/companies/tencent/">腾讯</a>
            <a href="/companies/alibaba/">阿里巴巴</a>
            <a href="/companies/deepseek/">DeepSeek</a>
            <a href="/companies/kimi/">kimi月之暗面</a>
            <a href="/companies/minimax/">MiniMax</a>
            <a href="/companies/xiaohongshu/">小红书</a>
            <a href="/companies/pinduoduo/">拼多多</a>
            <a href="/companies/meituan/">美团</a>
            <a href="/companies/antgroup/">蚂蚁</a>
            <a href="/companies/apple/">Apple</a>
            <a href="/companies/google/">Google</a>
            <a href="/companies/meta/">Meta</a>
            <a href="/companies/amazon/">Amazon</a>
            <a href="/companies/kuaishou/">快手</a>
            <a href="/companies/netease/">网易</a> 
            <a href="/companies/baidu/">百度</a>            
          </div>
        </details>

        <details>
          <summary>成功上岸案例</summary>
          <div>
            <a href="/interview/backend/">后端方向 backend</a>
            <a href="/interview/client/">客户端方向 client</a>
            <a href="/interview/frontend/">前端方向 frontend</a>
            <a href="/interview/ai/">AI Agent方向</a>
          </div>
        </details>

        <details>
          <summary>求职 SOP</summary>
          <div>
            <a href="/guides/international-student-job-timeline/">留学生求职 Timeline</a>
            <a href="/guides/international-student-bigtech-job/">留学生进大厂完整指南</a>
            <a href="/guides/international-student-internship/">大厂实习投递指南</a>
          </div>
        </details>

        <details>
          <summary>1v1 辅导</summary>
          <div>
            <a href="/services/resume-refinement/">简历精修</a>
            <a href="/services/mock-interview/">1v1 模拟面试（架构 / 项目深挖）</a>
            <a href="/services/career-positioning/">投递策略与公司定位</a>
            <a href="/services/offer-negotiation/">Offer 选择与薪资谈判</a>
          </div>
        </details>
      </nav>
    </div>
  `;
});