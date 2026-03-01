import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BcUxZLwa.mjs';
import { manifest } from './manifest_D8uvESGl.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin.astro.mjs');
const _page2 = () => import('./pages/api/admin/certifications.astro.mjs');
const _page3 = () => import('./pages/api/admin/login.astro.mjs');
const _page4 = () => import('./pages/api/admin/messages.astro.mjs');
const _page5 = () => import('./pages/api/admin/profile.astro.mjs');
const _page6 = () => import('./pages/api/admin/projects.astro.mjs');
const _page7 = () => import('./pages/api/admin/skills.astro.mjs');
const _page8 = () => import('./pages/api/admin/upload.astro.mjs');
const _page9 = () => import('./pages/api/certifications.astro.mjs');
const _page10 = () => import('./pages/api/contact.astro.mjs');
const _page11 = () => import('./pages/api/projects.astro.mjs');
const _page12 = () => import('./pages/api/skills.astro.mjs');
const _page13 = () => import('./pages/certifications.astro.mjs');
const _page14 = () => import('./pages/projects.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/admin/index.astro", _page1],
    ["src/pages/api/admin/certifications.ts", _page2],
    ["src/pages/api/admin/login.ts", _page3],
    ["src/pages/api/admin/messages.ts", _page4],
    ["src/pages/api/admin/profile.ts", _page5],
    ["src/pages/api/admin/projects.ts", _page6],
    ["src/pages/api/admin/skills.ts", _page7],
    ["src/pages/api/admin/upload.ts", _page8],
    ["src/pages/api/certifications.ts", _page9],
    ["src/pages/api/contact.ts", _page10],
    ["src/pages/api/projects.ts", _page11],
    ["src/pages/api/skills.ts", _page12],
    ["src/pages/certifications.astro", _page13],
    ["src/pages/projects.astro", _page14],
    ["src/pages/index.astro", _page15]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///home/jhammil/Proyectos/Me/Portafolio/dist/client/",
    "server": "file:///home/jhammil/Proyectos/Me/Portafolio/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
{
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
