document.addEventListener("DOMContentLoaded", function () {
  /*
   * =========================
   * Sidebar
   * =========================
   */

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

  /*
   * =========================
   * Top navigation
   *
   * Behavior:
   * 1. Click a category -> open it.
   * 2. Click another category -> close the previous one.
   * 3. Move pointer outside the category -> close it.
   * 4. Move from summary into submenu -> keep it open.
   * 5. Click a submenu link -> normal navigation.
   * =========================
   */

  const nav = document.querySelector("header nav");

  if (!nav) return;

  const menus = Array.from(nav.querySelectorAll("details"));

  menus.forEach(function (menu) {
    const summary = menu.querySelector("summary");

    if (!summary) return;

    summary.addEventListener("click", function () {
      menus.forEach(function (otherMenu) {
        if (otherMenu !== menu) {
          otherMenu.removeAttribute("open");
        }
      });

      /*
       * <details> toggles itself automatically after this event.
       * No manual preventDefault is needed.
       */
    });

    menu.addEventListener("mouseleave", function () {
      menu.removeAttribute("open");
    });
  });

  /*
   * If the user clicks anywhere outside the navigation,
   * close every open menu immediately.
   */
  document.addEventListener("click", function (event) {
    if (!nav.contains(event.target)) {
      menus.forEach(function (menu) {
        menu.removeAttribute("open");
      });
    }
  });

  /*
   * Keyboard accessibility:
   * Escape closes all menus and returns focus to the active summary.
   */
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;

    let activeMenu = null;

    menus.forEach(function (menu) {
      if (menu.open) {
        activeMenu = menu;
        menu.removeAttribute("open");
      }
    });

    if (activeMenu) {
      const activeSummary = activeMenu.querySelector("summary");
      if (activeSummary) activeSummary.focus();
    }
  });
});
