document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     Sidebar
     ========================= */

  const sidebar = document.getElementById("site-sidebar");

  if (sidebar) {
    sidebar.innerHTML = `
      <div class="sidebar-card">
        <h2>联系我，获取更多求职资源</h2>
        <p>如果你正在准备大厂求职，欢迎添加微信，获取更多求职信息与经验。</p>
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
        <a href="/guides/international-student-bigtech-job/">留学生进大厂完整指南</a>
        <a href="/guides/return-to-china-job/">留学生回国求职</a>
        <a href="/guides/international-student-domestic-bigtech/">留学生如何进入国内大厂</a>
        <a href="/resume/cs-international-student-resume/">CS 留学生简历怎么写</a>
        <a href="/interview/bigtech-technical-interview/">大厂技术面试完整指南</a>
        <a href="/companies/bytedance/international-student/">字节跳动留学生求职指南</a>
      </div>
    `;
  }

  /* =========================
     顶部导航

     目标：
     - 点击一级导航：打开
     - 点击另一个一级导航：切换
     - 鼠标离开当前一级导航及其二级菜单：关闭
     - 鼠标离开整个 nav：全部关闭
     - 点击页面其他地方：全部关闭
     ========================= */

  const nav = document.querySelector("header nav");

  if (!nav) return;

  const menus = Array.from(nav.querySelectorAll("details"));

  function closeAll(exceptMenu) {
    menus.forEach(function (menu) {
      if (menu !== exceptMenu) {
        menu.removeAttribute("open");
        menu.classList.remove("is-open");
      }
    });
  }

  menus.forEach(function (menu) {
    const summary = menu.querySelector("summary");

    if (!summary) return;

    summary.addEventListener("click", function () {
      const wasOpen = menu.classList.contains("is-open");

      closeAll();

      if (!wasOpen) {
        menu.setAttribute("open", "");
        menu.classList.add("is-open");
      } else {
        menu.removeAttribute("open");
        menu.classList.remove("is-open");
      }
    });

    /*
     * 这里使用 mouseleave，而不是 mouseout。
     * mouseleave 不会因为鼠标从 summary 移到二级菜单
     * 而误触发，因此可以正常进入二级菜单。
     */
    menu.addEventListener("mouseleave", function () {
      menu.removeAttribute("open");
      menu.classList.remove("is-open");
    });

    /*
     * 鼠标进入另一个一级导航时，关闭其他菜单。
     */
    menu.addEventListener("mouseenter", function () {
      closeAll(menu);
    });
  });

  /*
   * 鼠标彻底离开顶部导航区域：全部收起。
   */
  nav.addEventListener("mouseleave", function () {
    closeAll();
  });

  /*
   * 点击导航外部：全部收起。
   */
  document.addEventListener("click", function (event) {
    if (!nav.contains(event.target)) {
      closeAll();
    }
  });

  /*
   * ESC：关闭全部菜单。
   */
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeAll();
    }
  });
});
