document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("site-sidebar");

  if (!sidebar) {
    return;
  }

  sidebar.innerHTML = `
    <div class="sidebar-card">

      <h2>联系我，获取更多求职资源</h2>

      <p>
        如果你正在准备大厂求职，
        欢迎添加微信，获取更多求职信息与经验。
      </p>

      <ul class="sidebar-benefits">
        <li>大厂求职经验</li>
        <li>简历修改建议</li>
        <li>模拟面试</li>
        <li>IT 求职规划</li>
        <li>最新招聘信息</li>
      </ul>

      <img
        src="/assets/contact-card.png"
        alt="BigTechCareer 求职咨询微信联系方式"
        class="contact-card-image"
      >

      <p class="sidebar-note">
        长按二维码添加微信 · 获取更多大厂求职资源
      </p>

    </div>

    <div class="sidebar-card related-card">

      <h2>相关阅读</h2>

      <a href="/guides/international-student-bigtech-job/">
        留学生进大厂完整指南
      </a>

      <a href="/guides/international-student-domestic-bigtech/">
        留学生如何进入国内大厂
      </a>

      <a href="/resume/cs-international-student-resume/">
        CS 留学生简历怎么写
      </a>

      <a href="/interview/bigtech-technical-interview/">
        大厂技术面试完整指南
      </a>

      <a href="/companies/bytedance/international-student/">
        字节跳动留学生求职指南
      </a>

    </div>
  `;
});
