import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_diJWzety.mjs';
import 'es-module-lexer';
import { n as decodeKey } from './chunks/astro/server_Cq_iU0aJ.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/jhammil/Proyectos/Me/Portafolio/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/certifications.B4_YnCMV.css"}],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/certifications","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/certifications\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"certifications","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/certifications.ts","pathname":"/api/admin/certifications","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/login","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/login\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/login.ts","pathname":"/api/admin/login","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/messages","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/messages\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"messages","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/messages.ts","pathname":"/api/admin/messages","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/profile","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/profile\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/profile.ts","pathname":"/api/admin/profile","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/projects","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/projects\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/projects.ts","pathname":"/api/admin/projects","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/skills","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/skills\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"skills","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/skills.ts","pathname":"/api/admin/skills","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/upload","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/upload\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"upload","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/upload.ts","pathname":"/api/admin/upload","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/certifications","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/certifications\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"certifications","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/certifications.ts","pathname":"/api/certifications","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/projects","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/projects\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/projects.ts","pathname":"/api/projects","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/skills","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/skills\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"skills","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/skills.ts","pathname":"/api/skills","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DW-9yefA.js"}],"styles":[{"type":"external","src":"/_astro/certifications.B4_YnCMV.css"}],"routeData":{"route":"/certifications","isIndex":false,"type":"page","pattern":"^\\/certifications\\/?$","segments":[[{"content":"certifications","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/certifications.astro","pathname":"/certifications","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.ojoH_jcI.js"}],"styles":[{"type":"external","src":"/_astro/certifications.B4_YnCMV.css"}],"routeData":{"route":"/projects","isIndex":false,"type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects.astro","pathname":"/projects","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BPLEwtdu.js"}],"styles":[{"type":"inline","content":".text-stroke-dynamic[data-astro-cid-anhloy43]{-webkit-text-stroke:1px #000000;color:transparent}.dark .text-stroke-dynamic[data-astro-cid-anhloy43]{-webkit-text-stroke:1px #ffffff;color:transparent}@keyframes marqueeLeft{0%{transform:translate(0)}to{transform:translate(-50%)}}@keyframes marqueeRight{0%{transform:translate(-50%)}to{transform:translate(0)}}.animate-marquee-left[data-astro-cid-sye7xtqh]{animation:marqueeLeft 80s linear infinite}.animate-marquee-right[data-astro-cid-sye7xtqh]{animation:marqueeRight 80s linear infinite}.hover\\:pause[data-astro-cid-sye7xtqh]:hover{animation-play-state:paused}\n"},{"type":"external","src":"/_astro/certifications.B4_YnCMV.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/jhammil/Proyectos/Me/Portafolio/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["/home/jhammil/Proyectos/Me/Portafolio/src/pages/certifications.astro",{"propagation":"none","containsHead":true}],["/home/jhammil/Proyectos/Me/Portafolio/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/jhammil/Proyectos/Me/Portafolio/src/pages/projects.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/admin/index@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/api/admin/certifications@_@ts":"pages/api/admin/certifications.astro.mjs","\u0000@astro-page:src/pages/api/admin/login@_@ts":"pages/api/admin/login.astro.mjs","\u0000@astro-page:src/pages/api/admin/messages@_@ts":"pages/api/admin/messages.astro.mjs","\u0000@astro-page:src/pages/api/admin/profile@_@ts":"pages/api/admin/profile.astro.mjs","\u0000@astro-page:src/pages/api/admin/projects@_@ts":"pages/api/admin/projects.astro.mjs","\u0000@astro-page:src/pages/api/admin/skills@_@ts":"pages/api/admin/skills.astro.mjs","\u0000@astro-page:src/pages/api/admin/upload@_@ts":"pages/api/admin/upload.astro.mjs","\u0000@astro-page:src/pages/api/certifications@_@ts":"pages/api/certifications.astro.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/api/projects@_@ts":"pages/api/projects.astro.mjs","\u0000@astro-page:src/pages/api/skills@_@ts":"pages/api/skills.astro.mjs","\u0000@astro-page:src/pages/certifications@_@astro":"pages/certifications.astro.mjs","\u0000@astro-page:src/pages/projects@_@astro":"pages/projects.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","/home/jhammil/Proyectos/Me/Portafolio/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_D8uvESGl.mjs","/home/jhammil/Proyectos/Me/Portafolio/src/lib/db.ts":"chunks/db_DC8ZIcEa.mjs","/home/jhammil/Proyectos/Me/Portafolio/src/components/sections/ProjectsGrid":"_astro/ProjectsGrid.Bf_2-bMD.js","/home/jhammil/Proyectos/Me/Portafolio/src/components/sections/ContactForm":"_astro/ContactForm.Ce82-xv5.js","/astro/hoisted.js?q=1":"_astro/hoisted.BPLEwtdu.js","/home/jhammil/Proyectos/Me/Portafolio/src/components/admin/AdminApp":"_astro/AdminApp.Dy2nEatW.js","@astrojs/react/client.js":"_astro/client.BuOr9PT5.js","/astro/hoisted.js?q=0":"_astro/hoisted.DW-9yefA.js","/astro/hoisted.js?q=2":"_astro/hoisted.ojoH_jcI.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/certifications.B4_YnCMV.css","/_astro/AdminApp.Dy2nEatW.js","/_astro/ContactForm.Ce82-xv5.js","/_astro/ProjectsGrid.Bf_2-bMD.js","/_astro/client.BuOr9PT5.js","/_astro/hoisted.BPLEwtdu.js","/_astro/hoisted.DW-9yefA.js","/_astro/hoisted.ojoH_jcI.js","/_astro/index.CVf8TyFT.js","/_astro/jsx-runtime.TBa3i5EZ.js","/uploads/1771773270580-dk7wai.jpg","/uploads/1771782310213-2hhbju.jpg","/uploads/1771782326942-g2qdjf.jpeg","/uploads/1771782368535-jn57c.jpeg"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"RTw+JOMmIDXhTQ+X9qczaWDGqdC3oKWLVYCBR5A0yco=","experimentalEnvGetSecretEnabled":false});

export { manifest };
