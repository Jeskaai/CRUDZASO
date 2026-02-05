(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=JSON.parse(localStorage.getItem(`cz_registered_users`))||[],t=JSON.parse(localStorage.getItem(`cz_user`))||null,n=JSON.parse(localStorage.getItem(`cz_tasks`))||[{id:`CZ-701`,title:`Update Documentation`,assignee:`Sarah Lin`,category:`Documentation`,status:`In Progress`,priority:`Medium`,dueDate:`2023-10-26`},{id:`CZ-702`,title:`Fix Login Auth`,assignee:`Raj Patel`,category:`Development`,status:`Pending`,priority:`High`,dueDate:`2023-10-26`},{id:`CZ-703`,title:`Quarterly Review`,assignee:`Michelle O.`,category:`Management`,status:`Completed`,priority:`Low`,dueDate:`2023-10-20`}],r=()=>{localStorage.setItem(`cz_registered_users`,JSON.stringify(e)),localStorage.setItem(`cz_user`,JSON.stringify(t)),localStorage.setItem(`cz_tasks`,JSON.stringify(n))};window.navigate=e=>{let n=document.getElementById(`app`);n.style.opacity=`0`,setTimeout(()=>{!t&&e!==`login`&&e!==`signup`?i():t&&!t.onboardingComplete&&e!==`onboarding`?o():e===`login`?i():e===`signup`?a():e===`onboarding`?o():s(e===`newTask`?`newTask`:e),n.style.opacity=`1`},200)};var i=()=>{document.getElementById(`app`).innerHTML=`
    <div class="access-container">
      <div class="access-card">
        <div class="sidebar-logo" style="text-align:center; margin-bottom:24px;">💼 CRUDZASO</div>
        <h2 class="access-title">Welcome back</h2>
        <p style="text-align:center; color:gray; margin-bottom:20px; font-size:14px;">Enter your credentials to access the platform</p>
        <form id="l-form" class="access-form">
          <div class="input-group"><label>Email or username</label><input type="email" id="l-email" required placeholder="student@university.edu"></div>
          <div class="input-group"><label>Password</label><input type="password" required placeholder="••••••••"></div>
          <button type="submit" class="btn-submit">Sign in</button>
        </form>
        <p class="access-footer">Don't have an account? <span class="link" onclick="navigate('signup')">Register</span></p>
      </div>
    </div>`,document.getElementById(`l-form`).onsubmit=n=>{n.preventDefault();let i=document.getElementById(`l-email`).value,a=e.find(e=>e.email===i);a?(t=a,r(),navigate(`dashboard`)):alert(`Usuario no encontrado. Por favor, regístrate primero.`)}},a=()=>{document.getElementById(`app`).innerHTML=`
    <div class="access-container">
      <div class="access-card">
        <h2 class="access-title">Create account</h2>
        <p style="text-align:center; color:gray; margin-bottom:20px; font-size:14px;">Join the academic performance platform today</p>
        <form id="s-form" class="access-form">
          <div class="input-group"><label>Full Name</label><input type="text" id="s-name" required placeholder="John Doe"></div>
          <div class="input-group"><label>Email address</label><input type="email" id="s-email" required placeholder="student@university.edu"></div>
          <div class="input-group"><label>Password</label><input type="password" id="s-pw" required placeholder="Create a password"></div>
          <button type="submit" class="btn-submit">Register</button>
        </form>
        <p class="access-footer">Already have an account? <span class="link" onclick="navigate('login')">Sign in</span></p>
      </div>
    </div>`,document.getElementById(`s-form`).onsubmit=n=>{n.preventDefault();let i={name:document.getElementById(`s-name`).value,email:document.getElementById(`s-email`).value,password:document.getElementById(`s-pw`).value,onboardingComplete:!1};e.push(i),t=i,r(),navigate(`onboarding`)}},o=()=>{document.getElementById(`app`).innerHTML=`
    <div class="access-container">
      <div class="access-card">
        <h2 class="access-title">Configura tu Perfil</h2>
        <form id="o-form" class="access-form">
          <div class="photo-setup">
            <div class="preview-box">
              <img id="o-preview" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">
              <label for="f-up" class="upload-icon">📸</label>
            </div>
            <input type="file" id="f-up" accept="image/*" hidden>
          </div>
          <div class="input-group"><label>Cargo / Rol</label><input type="text" id="o-role" required placeholder="Ej: Product Designer"></div>
          <div class="input-group"><label>ID Empleado</label><input type="text" id="o-id" required placeholder="CZ-882103"></div>
          <button type="submit" class="btn-submit">Finalizar Registro</button>
        </form>
      </div>
    </div>`,document.getElementById(`f-up`).onchange=e=>{let t=new FileReader;t.onload=e=>document.getElementById(`o-preview`).src=e.target.result,t.readAsDataURL(e.target.files[0])},document.getElementById(`o-form`).onsubmit=e=>{e.preventDefault(),t={...t,role:document.getElementById(`o-role`).value,id:document.getElementById(`o-id`).value,avatar:document.getElementById(`o-preview`).src,onboardingComplete:!0,joinDate:new Date().toLocaleDateString(`en-US`,{month:`long`,day:`numeric`,year:`numeric`})},r(),navigate(`dashboard`)}},s=e=>{document.getElementById(`app`).innerHTML=`
    <div class="layout-grid">
      <aside class="sidebar">
        <div class="sidebar-logo">💼 CRUDZASO</div>
        <nav class="sidebar-nav">
          <button class="nav-btn ${e===`dashboard`?`active`:``}" onclick="navigate('dashboard')">📊 Dashboard</button>
          <button class="nav-btn ${e===`tasks`?`active`:``}" onclick="navigate('tasks')">✅ My Tasks</button>
          <button class="nav-btn ${e===`profile`?`active`:``}" onclick="navigate('profile')">👤 Profile</button>
        </nav>
        <div class="sidebar-footer">
          <button class="logout-btn" onclick="logout()">🚪 Logout</button>
        </div>
      </aside>
      <main class="main-content">
        <header class="topbar">
          <div class="breadcrumb">🏠 > ${e.toUpperCase()}</div>
          <div class="profile-pill" onclick="navigate('profile')" style="cursor:pointer; display:flex; align-items:center; gap:12px;">
            <div class="profile-info" style="text-align:right;">
                <p style="margin:0; font-size:14px; font-weight:600;">${t.name}</p>
                <small style="display:block; color:gray; font-size:12px;">${t.role}</small>
            </div>
            <img src="${t.avatar}" style="width:32px; height:32px; border-radius:50%; object-fit:cover; border: 1px solid #ddd; flex-shrink:0;">
          </div>
        </header>
        <div id="dynamic-content" class="view-content"></div>
      </main>
    </div>`;let n=document.getElementById(`dynamic-content`);e===`tasks`?l(n):e===`profile`?d(n):e===`newTask`?u(n):c(n)},c=e=>{let t=n.filter(e=>e.status===`Completed`).length,r=n.filter(e=>e.status===`Pending`).length,i=n.length>0?Math.round(t/n.length*100):0;e.innerHTML=`
    <div class="header-row">
        <div>
            <h1>Task Manager</h1>
            <p style="color:gray;">Overview of your current academic performance tasks.</p>
        </div>
        <button class="btn-primary" onclick="navigate('newTask')">+ New Task</button>
    </div>
    <div class="stats-grid">
      <div class="stat-card"><h3>Total Tasks</h3><div class="value">${n.length}</div><small style="color:green">↑ 12% from last week</small></div>
      <div class="stat-card"><h3>Completed</h3><div class="value">${t}</div><small style="color:green">✓ On track</small></div>
      <div class="stat-card"><h3>Pending</h3><div class="value">${r}</div><small style="color:red">⚠ ${r} High Priority</small></div>
      <div class="stat-card"><h3>Overall Progress</h3><div class="value">${i}%</div><small style="color:blue">Keep it up!</small></div>
    </div>
    <div class="table-container">${f(n)}</div>`},l=e=>{e.innerHTML=`
    <div class="header-row">
        <div>
            <h1>Task Management</h1>
            <p style="color:gray;">View, edit, and organize all academic tasks in one place.</p>
        </div>
        <button class="btn-primary" onclick="navigate('newTask')">+ New Task</button>
    </div>
    <div class="table-container">${f(n)}</div>`},u=e=>{e.innerHTML=`
    <div class="header-row">
        <div onclick="navigate('tasks')" style="cursor:pointer; color:var(--primary); font-weight:600;">← Back to Tasks</div>
    </div>
    <h1 style="margin-bottom:20px;">Create New Task</h1>
    <div class="access-card" style="max-width:100%; border-radius:12px;">
        <form id="task-form">
            <div class="input-group">
                <label>Task Title <span style="color:red">*</span></label>
                <input type="text" id="t-title" required placeholder="e.g., Complete Quarter 3 Report">
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                <div class="input-group">
                    <label>Category</label>
                    <select id="t-category" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--border);">
                        <option>Development</option>
                        <option>Mathematics</option>
                        <option>Design</option>
                        <option>Management</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>Priority</label>
                    <select id="t-priority" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--border);">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                <div class="input-group">
                    <label>Status</label>
                    <select id="t-status" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--border);">
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>Due Date</label>
                    <input type="date" id="t-date" required>
                </div>
            </div>
            <div class="input-group">
                <label>Description</label>
                <textarea id="t-desc" rows="4" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--border);" placeholder="Add details about this task..."></textarea>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:12px;">
                <button type="button" class="nav-btn" style="width:auto;" onclick="navigate('tasks')">Cancel</button>
                <button type="submit" class="btn-primary">💾 Save Task</button>
            </div>
        </form>
    </div>`,document.getElementById(`task-form`).onsubmit=e=>{e.preventDefault();let i={id:`CZ-${Math.floor(100+Math.random()*900)}`,title:document.getElementById(`t-title`).value,assignee:t.name,category:document.getElementById(`t-category`).value,status:document.getElementById(`t-status`).value,priority:document.getElementById(`t-priority`).value,dueDate:document.getElementById(`t-date`).value};n.push(i),r(),navigate(`tasks`)}},d=e=>{e.innerHTML=`
    <h1 class="view-title" style="margin-bottom:30px;">My Profile</h1>
    <div class="profile-flex-wrapper">
      <div class="identity-card">
        <div class="avatar-header"></div>
        <div class="identity-body">
            <img src="${t.avatar}" class="large-avatar" style="width:120px; height:120px; border-radius:50%; object-fit:cover; margin-top:-60px; border:4px solid white;">
            <h2>${t.name}</h2>
            <p style="color:var(--primary); font-weight:700;">${t.role}</p>
            <div style="background:#eff6ff; color:var(--primary); display:inline-block; padding:4px 12px; border-radius:20px; font-size:12px; margin-top:10px;">User Account</div>
        </div>
        <div style="margin-top:20px; border-top:1px solid var(--border); padding-top:20px;">
            <div style="font-size:24px; font-weight:800;">${n.length}</div>
            <div style="color:gray; font-size:12px;">Tasks</div>
        </div>
      </div>
      <div class="details-card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3>Personal Information</h3>
            <button class="nav-btn" style="width:auto; font-size:12px; border:1px solid var(--border);">Edit Profile</button>
        </div>
        <div class="details-grid">
          <div class="item"><label>Full Name</label><p>${t.name}</p></div>
          <div class="item"><label>Employee ID</label><p>${t.id}</p></div>
          <div class="item"><label>Email</label><p>${t.email}</p></div>
          <div class="item"><label>Join Date</label><p>${t.joinDate}</p></div>
        </div>
      </div>
    </div>`},f=e=>`
  <table class="my-tasks-table">
    <thead><tr><th>TASK NAME</th><th>ASSIGNEE</th><th>STATUS</th><th>PRIORITY</th><th>DUE DATE</th></tr></thead>
    <tbody>
      ${e.map(e=>`
        <tr>
          <td><b>${e.title}</b><br><small style="color:gray">${e.id}</small></td>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
                <img src="https://ui-avatars.com/api/?name=${e.assignee}&background=random" style="width:24px; height:24px; border-radius:50%; object-fit:cover;">
                ${e.assignee}
            </div>
          </td>
          <td><span class="badge-${e.status.toLowerCase().replace(/\s+/g,``)}">${e.status}</span></td>
          <td><span class="dot dot-${e.priority.toLowerCase()}"></span> ${e.priority}</td>
          <td>${e.dueDate}</td>
        </tr>`).join(``)}
    </tbody>
  </table>`;window.logout=()=>{confirm(`Are you sure you want to sign out?`)&&(localStorage.removeItem(`cz_user`),t=null,navigate(`login`))};