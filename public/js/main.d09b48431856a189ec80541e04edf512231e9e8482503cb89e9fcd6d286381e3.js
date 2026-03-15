
var html = document.documentElement;
var currentTheme = 'dark', glassOn = false;

var LANG_ICONS = {
  python:       { icon: 'https://www.svgrepo.com/show/452091/python.svg',                                                                                                                  label: 'Python' },
  powershell:   { icon: 'https://gist.githubusercontent.com/Xainey/d5bde7d01dcbac51ac951810e94313aa/raw/6c858c46726541b48ddaaebab29c41c07a196394/PowerShell.svg',                          label: 'PowerShell' },
  javascript:   { icon: 'https://www.svgrepo.com/show/303206/javascript-logo.svg',                                                                                                         label: 'JavaScript' },
  typescript:   { icon: 'https://www.svgrepo.com/show/354478/typescript-icon.svg',                                                                                                         label: 'TypeScript' },
  elasticsearch:{ icon: 'https://www.svgrepo.com/show/303574/elasticsearch-logo.svg',                                                                                                      label: 'Elasticsearch' },
  awslambda:    { icon: 'https://raw.githubusercontent.com/AwesomeLogos/aws-icons/refs/heads/main/docs/images/Architecture-Service-Icons/Arch_Compute/64/Arch_AWS-Lambda_64.svg',        label: 'AWS Lambda' },
  burp:         { icon: 'https://upload.wikimedia.org/wikipedia/commons/6/61/BurpSuite_logo.svg',                                                                                          label: 'HTTP Request' },
  html:         { icon: 'https://code.benco.io/icon-collection/logos/html5.svg',                                                                                                           label: 'HTML5' },
  awsathena:    { icon: 'https://raw.githubusercontent.com/AwesomeLogos/aws-icons/refs/heads/main/docs/images/Architecture-Service-Icons/Arch_Analytics/64/Arch_Amazon-Athena_64.svg',  label: 'AWS Athena' },
  go:           { icon: 'https://go.dev/blog/go-brand/Go-Logo/SVG/Go-Logo_Blue.svg',                                                                                                      label: 'Go' },
  splunk:       { icon: 'https://logodix.com/logo/514912.jpg',                                                                                                                             label: 'Splunk SPL' },
  wireshark:    { icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Wireshark_icon.svg/3840px-Wireshark_icon.svg.png',                                                     label: 'Wireshark' },
  mysql:        { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',                                                                                    label: 'MySQL' },
  bash:         { icon: null, label: '$_ Bash' },
  shell:        { icon: null, label: '$_ Shell' },
  cmd:          { icon: null, symbol: '>_', label: 'CMD' },
  cpp:          { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',                                                                             label: 'C++' },
  csharp:       { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',                                                                                  label: 'C#' },
  php:          { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',                                                                                        label: 'PHP' },
  kql:          { icon: 'https://www.svgrepo.com/show/303574/elasticsearch-logo.svg',                                                                                                      label: 'KQL' },
  yaml:         { icon: null, symbol: '</>', label: 'YAML' },
  json:         { icon: null, symbol: '{;}', symbolColor: '#EEFABD', label: 'JSON' },
  markdown:     { icon: null, symbol: 'MD ↓', label: 'MARKDOWN' },
  yara:         { icon: null, symbol: '{}', symbolColor: '#F93827', label: 'YARA' },
  sigma:        { icon: 'https://sigmahq.io/images/logo.svg',                                                                                                                              label: 'Sigma' },
  mitre:        { icon: 'https://cdn.prod.website-files.com/6208b9b7b3a3551c72cfc1c9/6516e065f71a7f848a8f981c_mitre.png',                                                                label: 'MITRE ATT\u0026CK' },
  text:         { icon: null, label: 'Output' },
  dockerfile:   { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',                                                                                  label: 'Dockerfile' },
  azcli:        { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',                                                                                        label: 'AZ CLI', iconSize: '16px' },
  awscli:       { icon: 'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/aws-color.png',                                                    label: 'AWS CLI' },
  gcpcli:       { icon: 'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/googlecloud-color.png',                                            label: 'GCP CLI' }
};

function injectLangIcons() {
  var wrappers = document.querySelectorAll('.code-wrapper[data-lang]');
  for (var i = 0; i < wrappers.length; i++) {
    var wrapper = wrappers[i];
    var lang = wrapper.getAttribute('data-lang');
    var badge = wrapper.querySelector('.code-lang-badge');
    if (!badge) continue;
    badge.innerHTML = '';
    var def = LANG_ICONS[lang] || { icon: null, label: lang.toUpperCase() };

    var isGlassDark = document.documentElement.getAttribute('data-glass') === 'on' && document.documentElement.getAttribute('data-theme') !== 'light';
    var LABEL_COLOR = isGlassDark ? 'rgba(192,132,252,0.85)' : 'rgba(255,255,255,0.72)';

    /* ── icon image ── */
    if (def.icon) {
      var img = document.createElement('img');
      img.src = def.icon; img.alt = def.label;
      var sz = def.iconSize || '14px';
      img.style.cssText = 'width:'+sz+';height:'+sz+';object-fit:contain;opacity:0.85;margin-right:4px;vertical-align:middle;';
      img.onerror = function() { this.style.display = 'none'; };
      badge.appendChild(img);
    }

    if (def.symbol) {
      /* colored symbol prefix */
      var sym = document.createElement('span');
      sym.className = 'sym';
      sym.textContent = def.symbol;
      sym.style.color = def.symbolColor || LABEL_COLOR;
      sym.style.fontWeight = '700';
      sym.style.marginRight = '4px';
      badge.appendChild(sym);
      /* label word at uniform brightness */
      if (def.label) {
        var lbl = document.createElement('span');
        lbl.textContent = def.label;
        lbl.style.color = LABEL_COLOR;
        lbl.style.fontWeight = '700';
        badge.appendChild(lbl);
      }
    } else {
      /* plain label — same brightness as everywhere else */
      var lbl2 = document.createElement('span');
      lbl2.textContent = def.label || lang.toUpperCase();
      lbl2.style.color = LABEL_COLOR;
      lbl2.style.fontWeight = '700';
      badge.appendChild(lbl2);
    }
  }
}

function copyCode(btn) {
  var code = btn.closest('.code-wrapper').querySelector('code');
  navigator.clipboard.writeText(code.innerText).then(function() {
    btn.classList.add('copied');
    btn.querySelector('span').textContent = 'copied!';
    setTimeout(function() {
      btn.classList.remove('copied');
      btn.querySelector('span').textContent = 'copy';
    }, 1800);
  });
}

function initTOC() {
  var sections = document.querySelectorAll('.post-content h2[id]');
  var tocSections = document.querySelectorAll('.toc-section');
  if (!sections.length) return;
  tocSections.forEach(function(li, i) {
    var sub = li.querySelector('.toc-sub');
    if (sub) {
      if (i === 0) { sub.style.maxHeight = sub.scrollHeight + 'px'; sub.style.opacity = '1'; }
      else { sub.style.maxHeight = '0'; sub.style.opacity = '0'; }
    }
  });
  var activeIdx = 0;
  function setActive(idx) {
    if (idx === activeIdx) return;
    activeIdx = idx;
    tocSections.forEach(function(li, i) {
      var h2link = li.querySelector('.toc-h2');
      var sub = li.querySelector('.toc-sub');
      h2link.classList.toggle('toc-active', i === idx);
      if (sub) {
        if (i === idx) { sub.style.maxHeight = sub.scrollHeight + 'px'; sub.style.opacity = '1'; }
        else { sub.style.maxHeight = '0'; sub.style.opacity = '0'; }
      }
    });
  }
  window.addEventListener('scroll', function() {
    var current = 0;
    sections.forEach(function(s, i) {
      if (window.scrollY >= s.offsetTop - 120) current = i;
    });
    setActive(current);
  }, { passive: true });
}

/* ── Posts data ── */
var POSTS = [
  { title: "HTB Machine Writeup: Example",               tags: ["HackTheBox","GCP"],          views: 3,   hot: true,  date: "2025-03-01", summary: "Full walkthrough — recon, foothold via GCP metadata abuse, privesc and flags." },
  { title: "News: CISA KEV — Latest Critical CVEs",      tags: ["News"],                       views: 112, hot: true,  date: "2025-02-28", summary: "CISA adds 8 new vulnerabilities to the Known Exploited Vulnerabilities catalog." },
  { title: "PwnedLabs: GCP IAM Deep Dive",               tags: ["PwnedLabs","GCP"],            views: 38,  hot: true,  date: "2025-02-20", summary: "Chaining GCP IAM misconfigurations to achieve full project takeover." },
  { title: "HTB Pro Lab: RastaLabs Writeup",             tags: ["HackTheBox"],                 views: 31,  hot: true,  date: "2025-02-14", summary: "Full RastaLabs pro lab walkthrough — Active Directory attack chain from zero to DA." },
  { title: "AWS S3 Bucket Misconfiguration Cheatsheet",  tags: ["AWS","Cheatsheet"],           views: 93,  hot: false, date: "2025-02-10", summary: "Quick reference for common S3 misconfigs, detection and remediation steps." },
  { title: "CyberDefenders: REvil Ransomware Lab",       tags: ["CyberDefenders"],             views: 77,  hot: false, date: "2025-02-05", summary: "Memory forensics and IOC extraction from a live REvil ransomware infection." },
  { title: "Azure Sentinel KQL Detection Cheatsheet",   tags: ["Azure","Cheatsheet"],         views: 66,  hot: false, date: "2025-01-30", summary: "KQL queries for detecting lateral movement, persistence and exfiltration in Sentinel." },
  { title: "PortSwigger Web Security Academy Notes",     tags: ["PortSwigger","Notes"],        views: 61,  hot: false, date: "2025-01-25", summary: "Personal notes covering all Web Security Academy labs — SQLi to SSRF." },
  { title: "Azure AD Privilege Escalation Techniques",   tags: ["Azure","CyberDefenders"],     views: 54,  hot: false, date: "2025-01-20", summary: "PassRole, App Registration abuse and PIM exploitation in Azure AD environments." },
  { title: "Phishing Kit Analysis: EvilProxy v2",        tags: ["Phishing","Blog"],            views: 44,  hot: false, date: "2025-01-15", summary: "Dissecting the EvilProxy v2 AiTM kit — token theft, evasion and detection." },
  { title: "AWS IAM Privilege Escalation: 20 Techniques",tags: ["AWS","CyberDefenders"],       views: 41,  hot: false, date: "2025-01-10", summary: "PassRole abuse, Lambda injection — each technique with CloudTrail detection queries." },
  { title: "GCP Service Account Privilege Escalation",   tags: ["GCP","HackTheBox"],           views: 29,  hot: false, date: "2024-12-28", summary: "Exploiting over-permissioned service accounts to escalate privileges in GCP projects." },
  { title: "TryHackMe: Advent of Cyber 2024 Notes",      tags: ["TryHackMe","Notes"],          views: 22,  hot: false, date: "2024-12-20", summary: "Daily challenge notes and writeups for TryHackMe Advent of Cyber 2024." },
  { title: "Dissecting EvilProxy: AiTM Phishing",        tags: ["Phishing","News"],            views: 17,  hot: false, date: "2024-12-15", summary: "Token hijacking mechanics and Entra ID / Defender detection guide." },
  { title: "HackingHub CTF Writeup — Web Category",     tags: ["HackingHub"],                 views: 9,   hot: false, date: "2024-12-10", summary: "Writeup for the HackingHub CTF web challenges — XSS, IDOR and path traversal." },
  { title: "ADCS ESC8: Domain Admin via NTLM Relay",     tags: ["HackTheBox","Cheatsheet"],    views: 128, hot: false, date: "2024-12-01", summary: "Abusing ADCS ESC8 with NTLM relay to coerce authentication and obtain a DA cert." }
];
POSTS.sort(function(a,b){ return b.date > a.date ? 1 : -1; });(function(a,b){ return b.date > a.date ? 1 : -1; });



var TAG_META = {
  'HackTheBox':     {bg:'#9fef00', tc:'#000', emoji:''},
  'TryHackMe':      {bg:'#c20909', tc:'#fff', emoji:''},
  'PwnedLabs':      {bg:'#8a2be2', tc:'#fff', emoji:''},
  'PortSwigger':    {bg:'#ff6633', tc:'#fff', emoji:''},
  'HackingHub':     {bg:'#5c1a8a', tc:'#fff', emoji:''},
  'Azure':          {bg:'#0178bc', tc:'#fff', iconNormal:'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/azure.png',        iconGlass:'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/azure-color.png'},
  'CyberDefenders': {bg:'#2f58dc', tc:'#fff', emoji:''},
  'GCP':            {bg:'#4285F4', tc:'#fff', iconNormal:'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/googlecloud.png',   iconGlass:'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/googlecloud-color.png'},
  'AWS':            {bg:'#FF9900', tc:'#fff', iconNormal:'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/aws.png',            iconGlass:'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/aws-color.png', iconGlassLight:'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/aws.png', iconGlassLightFilter:'brightness(0) saturate(100%) invert(45%) sepia(90%) saturate(600%) hue-rotate(5deg) brightness(0.95)'},
  'News':           {bg:'#e53935', tc:'#fff', emoji:' \uD83D\uDCE2'},
  'Phishing':       {bg:'#3aafa9', tc:'#fff', emoji:' \uD83C\uDFA3'},
  'Blog':           {bg:'#7b4f2e', tc:'#fff', emoji:''},
  'Cheatsheet':     {bg:'#2e8b6e', tc:'#fff', emoji:''},
  'Notes':          {bg:'#6b8e9f', tc:'#fff', emoji:''},
  'Cybr':           {bg:'#89D4FF', tc:'#000', emoji:''},
  'DFIR':           {bg:'#355872', tc:'#fff', emoji:''},
  'Malware':        {bg:'#891652', tc:'#fff', emoji:''},
  'SOC':            {bg:'#6367FF', tc:'#fff', emoji:''},
  'Threat Hunt':    {bg:'#088395', tc:'#fff', emoji:''},
  'CTI':            {bg:'#36064D', tc:'#fff', emoji:''},
  'Misc':           {bg:'#F5D2D2', tc:'#333', emoji:''},
  'DevOps':         {bg:'#FFD700', tc:'#000', emoji:''},
  'Pentest':        {bg:'#ED3500', tc:'#fff', emoji:''},
  'Active Directory':{bg:'#81A6C6', tc:'#000', emoji:''},
  'Cryptohack':     {bg:'#FFA95A', tc:'#000', emoji:''}
};

function makeBadge(tag) {
  var m = TAG_META[tag] || {bg:'#555', tc:'#fff'};
  var html = document.documentElement;
  var isGlass = html.getAttribute('data-glass') === 'on';
  var isLight = html.getAttribute('data-theme') === 'light';
  var bg = m.bg;
  var glow = '';
  if (tag === 'HackTheBox') glow = ';box-shadow:0 2px 8px rgba(159,239,0,0.4)';
  var iconHtml = '';
  if (m.iconNormal || m.iconGlass) {
    var iconUrl, filterStyle = '';
    if (isGlass && isLight && m.iconGlassLight) {
      iconUrl = m.iconGlassLight;
      filterStyle = m.iconGlassLightFilter ? ' filter:' + m.iconGlassLightFilter + ';' : '';
    } else if (isGlass) {
      iconUrl = m.iconGlass || m.iconNormal;
    } else {
      iconUrl = m.iconNormal || m.iconGlass;
    }
    iconHtml = ' <img src="' + iconUrl + '" style="width:13px;height:13px;vertical-align:middle;margin-left:2px;object-fit:contain;' + filterStyle + '">';
  } else if (m.emoji) {
    iconHtml = m.emoji;
  }
  return '<span class="tech-badge" style="background:' + bg + ';color:' + m.tc + glow + '">' + tag + iconHtml + '</span>';
}

var ARROW_SVG = '<svg class="entry-arrow-icon" width="17" height="17" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d=\'M5 12l14 0\'/><path d=\'M13 18l6 -6\'/><path d=\'M13 6l6 6\'/></svg>';
var EYE_SVG = '<svg viewBox="0 0 24 24"><path d=\'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\'/><circle cx=\'12\' cy=\'12\' r=\'3\'/></svg>';

function renderSection(containerId, paginationId, filterFn, currentPage) {
  var filtered = POSTS.filter(filterFn);
  var perPage = 7;
  var totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  if (currentPage === undefined) currentPage = 1;
  var start = (currentPage - 1) * perPage;
  var slice = filtered.slice(start, start + perPage);

  var listEl = document.getElementById(containerId);
  var html2 = '';
  for (var i = 0; i < slice.length; i++) {
    var p = slice[i];
    var badges = '';
    for (var j = 0; j < p.tags.length; j++) { badges += makeBadge(p.tags[j]); }
    var hotBadge = p.hot ? '<span class="tech-badge hot-pop" style="background:#ff0b55;box-shadow:0 2px 8px rgba(255,11,85,0.5)">HOT!\uD83D\uDD25</span>' : '';
    var popover = p.summary ? '<div class="synopsis-popover"><h4>' + p.title + '</h4><p>' + p.summary + '</p></div>' : '';
    html2 += '<div class="post-entry">' +
      '<a class="entry-link-wrapper" href="#" onclick="showPage(\'writeup-single\');return false;">' +
      popover +
      '<div class="modern-hover-box">' +
      '<div class="title-left-group">' + hotBadge + '<h2 class="modern-title">' + p.title + '</h2></div>' +
      '<div class="right-group">' +
      '<span class="viewer-count">' + EYE_SVG + p.views + '</span>' +
      badges + ARROW_SVG +
      '</div></div></a></div>';
  }
  if (!html2) html2 = '<p style="opacity:0.4;font-family:Fira Code,monospace;font-size:0.8rem;padding:12px 0">No posts found.</p>';
  listEl.innerHTML = html2;

  var pgEl = document.getElementById(paginationId);
  var pgHtml = '';
  pgHtml += '<button class="pg-btn"' + (currentPage <= 1 ? ' disabled' : '') + ' onclick="goPage(\'' + containerId + '\',\'' + paginationId + '\',' + (currentPage - 1) + ')">&lt;</button>';
  for (var k = 1; k <= totalPages; k++) {
    pgHtml += '<button class="pg-btn' + (k === currentPage ? ' active' : '') + '" onclick="goPage(\'' + containerId + '\',\'' + paginationId + '\',' + k + ')">' + k + '</button>';
  }
  pgHtml += '<button class="pg-btn"' + (currentPage >= totalPages ? ' disabled' : '') + ' onclick="goPage(\'' + containerId + '\',\'' + paginationId + '\',' + (currentPage + 1) + ')">&gt;</button>';
  pgEl.innerHTML = pgHtml;
}

var sectionFilters = {
  "writeups-list":    function(p) { return p.tags.indexOf("HackTheBox") >= 0 || p.tags.indexOf("TryHackMe") >= 0 || p.tags.indexOf("PwnedLabs") >= 0 || p.tags.indexOf("PortSwigger") >= 0 || p.tags.indexOf("HackingHub") >= 0 || p.tags.indexOf("CyberDefenders") >= 0; },
  "notes-list":       function(p) { return p.tags.indexOf("Notes") >= 0; },
  "cheatsheets-list": function(p) { return p.tags.indexOf("Cheatsheet") >= 0; },
  "blogs-list":       function(p) { return p.tags.indexOf("Blog") >= 0 || p.tags.indexOf("News") >= 0; }
};

function goPage(containerId, paginationId, page) {
  renderSection(containerId, paginationId, sectionFilters[containerId], page);
}

function filterTag(tag) {
  document.getElementById("tag-page-title").innerText = "// " + tag;
  renderSection("tag-list", "tag-pagination", function(p) { return p.tags.indexOf(tag) >= 0; }, 1);
  showPage("page-tag");
}

function showPage(name) {
  document.querySelectorAll(".page").forEach(function(p) { p.classList.remove("active"); });
  var pg = document.getElementById("page-" + name);
  if (!pg) { pg = document.getElementById("page-page-" + name); }
  if (pg) pg.classList.add("active");
  if (name === "writeup-single") { setTimeout(initTOC, 50); injectLangIcons(); }
  if (name === "page-writeups")    { renderSection("writeups-list",    "writeups-pagination",    sectionFilters["writeups-list"], 1); }
  if (name === "page-notes")       { renderSection("notes-list",       "notes-pagination",       sectionFilters["notes-list"], 1); }
  if (name === "page-cheatsheets") { renderSection("cheatsheets-list", "cheatsheets-pagination", sectionFilters["cheatsheets-list"], 1); }
  if (name === "page-blogs")       { renderSection("blogs-list",       "blogs-pagination",       sectionFilters["blogs-list"], 1); }
}

/* toggleTheme: see authoritative block below */

/* toggleGlass: see authoritative block below */

window.addEventListener('scroll', function() {
  document.getElementById('scroll-to-top').style.display = window.scrollY > 200 ? 'flex' : 'none';
});
/* ═══════════════════════════════════════════════════
   HUGO THEME — AUTHORITATIVE BLOCK (single instance)
   ═══════════════════════════════════════════════════ */

/* ── Glass toggle ── */
function toggleGlass() {
  var html = document.documentElement;
  var on = html.getAttribute('data-glass') !== 'on';
  html.setAttribute('data-glass', on ? 'on' : 'off');
  try { localStorage.setItem('brs-glass', on ? 'on' : 'off'); } catch(e){}
  injectLangIcons();
  refreshBadges();
  updateTagIcons();
  /* Pop Clippy out if visible */
  var wrap = document.getElementById('clippy-wrap');
  if (wrap) {
    sessionStorage && sessionStorage.removeItem('clippy_ready');
    /* Stop JS float loop instantly before transform animation */
    stopClippyFloat();
    wrap.style.transition = 'none';
    wrap.offsetHeight;
    var start = null; var dur = 600;
    (function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var ease = p < 0.5 ? 2*p*p : -1+(4-2*p)*p;
      wrap.style.transform = 'translateY(' + (-ease*180) + 'px) rotate(' + (ease*720) + 'deg) scale(' + (1-ease*0.95) + ')';
      wrap.style.opacity = p < 0.3 ? 1 : 1 - ((p-0.3)/0.7);
      if (p < 1) { requestAnimationFrame(step); } else { wrap.remove(); }
    })(performance.now());
  }
  var dlg = document.getElementById('clippy-error-dlg');
  if (dlg) dlg.remove();
}

/* ── Theme toggle ── */
function toggleTheme() {
  var html = document.documentElement;
  var dark = html.getAttribute('data-theme') !== 'dark';
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  updateThemeIcon(dark ? 'dark' : 'light');
  try { localStorage.setItem('brs-theme', dark ? 'dark' : 'light'); } catch(e){}
  injectLangIcons();
  refreshBadges();
  updateTagIcons();
  /* Dismiss Clippy cleanly on theme switch too */
  var wrap = document.getElementById('clippy-wrap');
  if (wrap && wrap.classList.contains('clippy-in')) {
    stopClippyFloat();
    wrap.style.transition = 'none';
    wrap.offsetHeight;
    var start = null; var dur = 400;
    (function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      wrap.style.opacity = 1 - p;
      wrap.style.transform = 'translateY(' + (-p * 40) + 'px)';
      if (p < 1) { requestAnimationFrame(step); } else { wrap.style.display = 'none'; }
    })(performance.now());
  }
}


/* ── Clippy float animation — JS-driven so it can be cancelled instantly ── */
var _clippyFloatRaf = null;
function startClippyFloat() {
  stopClippyFloat();
  var wrap = document.getElementById('clippy-wrap');
  if (!wrap) return;
  var start = performance.now();
  function step(ts) {
    var wrap = document.getElementById('clippy-wrap');
    if (!wrap || !wrap.classList.contains('clippy-in')) { _clippyFloatRaf = null; return; }
    var t = (ts - start) / 1000;
    var y = Math.sin(t * (2 * Math.PI / 3.2)) * -10;
    var r = Math.sin(t * (2 * Math.PI / 3.2)) * 1;
    wrap.style.transform = 'translateY(' + y + 'px) rotate(' + r + 'deg)';
    _clippyFloatRaf = requestAnimationFrame(step);
  }
  /* delay 1.2s before starting like original */
  setTimeout(function() {
    var wrap = document.getElementById('clippy-wrap');
    if (wrap && wrap.classList.contains('clippy-in')) {
      _clippyFloatRaf = requestAnimationFrame(step);
    }
  }, 1200);
}
function stopClippyFloat() {
  if (_clippyFloatRaf) { cancelAnimationFrame(_clippyFloatRaf); _clippyFloatRaf = null; }
  var wrap = document.getElementById('clippy-wrap');
  if (wrap) wrap.style.transform = '';
}

/* Update Hugo-rendered tag icons based on current theme+glass state */
function updateTagIcons() {
  var html = document.documentElement;
  var isGlass = html.getAttribute('data-glass') === 'on';
  var isLight = html.getAttribute('data-theme') === 'light';
  var imgs = document.querySelectorAll('.tag-icon-img');
  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    var src, filter = '';
    if (isGlass && isLight) {
      src = img.getAttribute('data-glass-light') || img.getAttribute('data-normal');
      filter = img.getAttribute('data-glass-light-filter') || '';
    } else if (isGlass) {
      src = img.getAttribute('data-glass-dark') || img.getAttribute('data-normal');
    } else {
      src = img.getAttribute('data-normal');
    }
    if (src) img.src = src;
    img.style.filter = filter;
  }
}

/* Re-render any visible JS-generated badge lists so icons update on mode change */
function refreshBadges() {
  var lists = ['writeups-list','notes-list','cheatsheets-list','blogs-list','tag-list'];
  for (var i = 0; i < lists.length; i++) {
    var el = document.getElementById(lists[i]);
    if (el && el.children.length) {
      /* Re-render by re-triggering the last section filter */
      var id = lists[i];
      var pgId = id.replace('-list','-pagination');
      if (sectionFilters[id]) goPage(id, pgId, 1);
    }
  }
}

function updateThemeIcon(theme) {
  var moon = document.getElementById('icon-moon');
  var sun  = document.getElementById('icon-sun');
  if (moon) moon.style.display = (theme === 'light') ? 'block' : 'none';
  if (sun)  sun.style.display  = (theme === 'dark')  ? 'block' : 'none';
}

/* ── Restore state before paint ── */
(function() {
  var theme = 'dark', glass = 'off';
  try { theme = localStorage.getItem('brs-theme') || 'dark'; } catch(e){}
  try { glass = localStorage.getItem('brs-glass') || 'off'; } catch(e){}
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('data-glass', glass);

  document.addEventListener('DOMContentLoaded', function() {
    updateThemeIcon(theme);
    updateTagIcons();
    wrapCodeBlocks();
    buildTOC();
    initScrollTop();
  });
})();

/* ── Scroll-to-top ── */
function initScrollTop() {
  window.addEventListener('scroll', function() {
    var btn = document.getElementById('scroll-to-top');
    if (btn) btn.style.display = window.scrollY > 200 ? 'flex' : 'none';
  }, { passive: true });

  var btn = document.getElementById('scroll-to-top');
  if (!btn) return;
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ══════════════════════════════════════════════
   TOC — rebuild Hugo's output into v12 structure
   Expand/collapse H3s on scroll, active highlight
   ══════════════════════════════════════════════ */
function buildTOC() {
  var root      = document.getElementById('toc-root');
  var source    = document.getElementById('app-toc-data');
  var content   = document.querySelector('.post-content');
  if (!root || !source || !content) return;

  /* Parse Hugo's TOC: <ul><li><a href=#id>Title</a><ul><li><a>...</a></li></ul></li></ul> */
  var hugoLinks = source.querySelectorAll('a');
  if (!hugoLinks.length) return;

  /* Group: collect each H2 with its H3 children */
  var sections = [];
  var current = null;

  hugoLinks.forEach(function(a) {
    var parentLi = a.parentElement;
    var depth = 0;
    var el = parentLi;
    while (el && el !== source) { if (el.tagName === 'UL') depth++; el = el.parentElement; }

    if (depth === 1) {
      /* H2 — main TOC entry */
      current = { id: a.getAttribute('href').replace('#',''), title: a.textContent.trim(), subs: [] };
      sections.push(current);
    } else if (depth === 2 && current) {
      /* H3 — sub-item under parent H2. H4+ ignored */
      current.subs.push({ id: a.getAttribute('href').replace('#',''), title: a.textContent.trim() });
    }
  });

  if (!sections.length) return;

  /* Build DOM */
  sections.forEach(function(sec, i) {
    var li = document.createElement('li');
    li.className = 'toc-section';
    li.setAttribute('data-section', sec.id);

    var h2a = document.createElement('span');
    h2a.setAttribute('data-href', '#' + sec.id);
    h2a.className = 'toc-h2';
    h2a.style.cursor = 'pointer';
    h2a.textContent = sec.title;
    li.appendChild(h2a);

    if (sec.subs.length) {
      var ul = document.createElement('ul');
      ul.className = 'toc-sub';
      ul.style.maxHeight = '0';
      ul.style.opacity = '0';
      sec.subs.forEach(function(sub) {
        var subLi = document.createElement('li');
        var subA  = document.createElement('span');
        subA.setAttribute('data-href', '#' + sub.id);
        subA.style.cursor = 'pointer';
        subA.textContent = sub.title;
        subLi.appendChild(subA);
        ul.appendChild(subLi);
      });
      li.appendChild(ul);
    }

    root.appendChild(li);
  });

  /* Mark first H2 active, open its subs */
  var allSections = root.querySelectorAll('.toc-section');
  if (allSections[0]) {
    var firstH2 = allSections[0].querySelector('.toc-h2');
    if (firstH2) firstH2.classList.add('toc-active');
    var firstSub = allSections[0].querySelector('.toc-sub');
    if (firstSub) { firstSub.style.maxHeight = firstSub.scrollHeight + 'px'; firstSub.style.opacity = '1'; }
  }

  /* Smooth scroll on TOC link click */
  root.addEventListener('click', function(e) {
    var a = e.target.closest('[data-href]');
    if (!a) return;
    e.preventDefault();
    var dh = a.getAttribute('data-href');
    var target = document.getElementById(dh.replace('#', ''));
    if (target) {
      var top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: 'smooth' });
      history.pushState(null, '', dh);
    }
  });

  /* Hover to expand subs */
  allSections.forEach(function(li) {
    var sub = li.querySelector('.toc-sub');
    if (!sub) return;
    li.addEventListener('mouseenter', function() {
      sub.style.maxHeight = sub.scrollHeight + 'px';
      sub.style.opacity = '1';
    });
    li.addEventListener('mouseleave', function() {
      /* only collapse if not the scroll-active section */
      if (!li.querySelector('.toc-h2.toc-active')) {
        sub.style.maxHeight = '0';
        sub.style.opacity = '0';
      }
    });
  });

  /* Scroll-driven activation */
  var h2Els   = content.querySelectorAll('h2[id]');
  var h3Els   = content.querySelectorAll('h3[id]');
  var activeH2Idx = -1;
  var activeH3El  = null;

  window.addEventListener('scroll', function() {
    /* — H2: find which section we're in — */
    var curH2 = 0;
    h2Els.forEach(function(s, i) {
      if (s.getBoundingClientRect().top <= 140) curH2 = i;
    });
    if (curH2 !== activeH2Idx) {
      activeH2Idx = curH2;
      allSections.forEach(function(li, i) {
        var isActive = (i === curH2);
        li.querySelector('.toc-h2').classList.toggle('toc-active', isActive);
        var sub = li.querySelector('.toc-sub');
        if (sub) {
          sub.style.maxHeight = isActive ? sub.scrollHeight + 'px' : '0';
          sub.style.opacity   = isActive ? '1' : '0';
        }
      });
    }

    /* — H3: find which sub-heading we're past — */
    var curH3link = null;
    h3Els.forEach(function(s) {
      if (s.getBoundingClientRect().top <= 140) {
        var link = root.querySelector('.toc-sub [data-href="#' + s.id + '"]');
        if (link) curH3link = link;
      }
    });
    if (curH3link !== activeH3El) {
      if (activeH3El) activeH3El.classList.remove('toc-active');
      activeH3El = curH3link;
      if (activeH3El) activeH3El.classList.add('toc-active');
    }
  }, { passive: true });
}

/* ══════════════════════════════════════════════
   CODE BLOCKS — wrap Hugo .highlight into v12
   ══════════════════════════════════════════════ */
function wrapCodeBlocks() {
  document.querySelectorAll('.post-content .highlight').forEach(function(hl) {
    if (hl.closest('.code-wrapper')) return;
    var lang = detectLang(hl);
    var wrapper = document.createElement('div');
    wrapper.className = 'code-wrapper';
    if (lang) wrapper.setAttribute('data-lang', lang);

    var header = document.createElement('div');
    header.className = 'code-header';
    var badge = document.createElement('span');
    badge.className = 'code-lang-badge';
    var copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.title = 'Copy';
    copyBtn.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" fill="none" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>copy</span>';
    copyBtn.addEventListener('click', function() { copyCodeFrom(this); });

    header.appendChild(badge);
    header.appendChild(copyBtn);
    hl.parentNode.insertBefore(wrapper, hl);
    wrapper.appendChild(header);
    wrapper.appendChild(hl);
  });
  injectLangIcons();
}

function detectLang(hl) {
  var code = hl.querySelector('code');
  if (code) {
    for (var i = 0; i < code.classList.length; i++) {
      if (code.classList[i].startsWith('language-'))
        return code.classList[i].replace('language-','').toLowerCase();
    }
  }
  return 'bash';
}

function copyCodeFrom(btn) {
  var wrapper = btn.closest('.code-wrapper');
  var code = wrapper ? wrapper.querySelector('code') : null;
  if (!code) return;
  var text = code.innerText;
  (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
  .catch(function() {
    var ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy');
    document.body.removeChild(ta);
  })
  .finally(function() {
    btn.classList.add('copied');
    btn.querySelector('span').textContent = 'copied!';
    setTimeout(function() { btn.classList.remove('copied'); btn.querySelector('span').textContent = 'copy'; }, 1800);
  });
}

/* Legacy onclick hook */
function copyCode(btn) { copyCodeFrom(btn); }


/* ── Also wrap plain <pre> blocks Hugo outputs for unknown langs ── */
function wrapPlainPre() {
  var content = document.querySelector('.post-content');
  if (!content) return;
  content.querySelectorAll('pre').forEach(function(pre) {
    if (pre.closest('.code-wrapper') || pre.closest('.highlight')) return;
    var code = pre.querySelector('code');
    var lang = 'bash';
    if (code) {
      for (var i = 0; i < code.classList.length; i++) {
        if (code.classList[i].startsWith('language-')) {
          lang = code.classList[i].replace('language-', '').toLowerCase();
          break;
        }
      }
    }
    var wrapper = document.createElement('div');
    wrapper.className = 'code-wrapper';
    wrapper.setAttribute('data-lang', lang);

    var header = document.createElement('div');
    header.className = 'code-header';
    var badge = document.createElement('span');
    badge.className = 'code-lang-badge';
    var copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.title = 'Copy';
    copyBtn.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" fill="none" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>copy</span>';
    copyBtn.addEventListener('click', function() { copyCodeFrom(this); });
    header.appendChild(badge);
    header.appendChild(copyBtn);

    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    /* Move pre inside a .highlight div so styling applies */
    var hlDiv = document.createElement('div');
    hlDiv.className = 'highlight';
    hlDiv.appendChild(pre);
    wrapper.appendChild(hlDiv);
  });
  injectLangIcons();
}

/* Patch DOMContentLoaded to also call wrapPlainPre */
document.addEventListener('DOMContentLoaded', function() {
  wrapPlainPre();
});

/* ── Run injectLangIcons on all render-hook-created wrappers ──
   The render hook outputs .code-wrapper[data-lang] directly in HTML,
   so we just need to inject icons — no wrapping needed.             */
document.addEventListener('DOMContentLoaded', function() {
  /* Inject icons into render-hook wrappers (already in DOM) */
  injectLangIcons();
  /* Wire up copy buttons on render-hook wrappers */
  document.querySelectorAll('.code-wrapper .copy-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { copyCodeFrom(this); });
  });
});
