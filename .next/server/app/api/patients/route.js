/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/patients/route";
exports.ids = ["app/api/patients/route"];
exports.modules = {

/***/ "(rsc)/./app/api/patients/route.ts":
/*!***********************************!*\
  !*** ./app/api/patients/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\nasync function POST(req) {\n    try {\n        const patient = await req.json();\n        // Validation des données\n        if (!patient.name || !patient.age || !patient.diagnosis) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Nom, âge et diagnostic sont obligatoires'\n            }, {\n                status: 400\n            });\n        }\n        // Validation du sexe\n        const validSexes = [\n            'M',\n            'F',\n            'Autre',\n            null\n        ];\n        if (patient.sexe && !validSexes.includes(patient.sexe)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Le sexe doit être M, F, Autre ou null'\n            }, {\n                status: 400\n            });\n        }\n        // Création du patient\n        const newPatient = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].patient.create({\n            data: {\n                name: patient.name,\n                age: parseInt(patient.age),\n                sexe: patient.sexe || null,\n                diagnosis: patient.diagnosis,\n                poids: patient.poids ? parseFloat(patient.poids) : null,\n                taille: patient.taille ? parseFloat(patient.taille) : null,\n                traitement: patient.traitement || null,\n                numSecu: patient.numSecu || null,\n                medecin: patient.medecin || null,\n                ...patient.rendezvous && {\n                    rendezvous: new Date(patient.rendezvous)\n                },\n                groupeSanguin: patient.groupeSanguin || null,\n                allergies: patient.allergies || null,\n                notes: patient.notes || null\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(newPatient, {\n            status: 201\n        });\n    } catch (error) {\n        console.error('Erreur ajout patient:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Erreur lors de la création du patient'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function GET() {\n    try {\n        const patients = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].patient.findMany({\n            orderBy: {\n                createdAt: 'desc'\n            },\n            select: {\n                id: true,\n                name: true,\n                age: true,\n                sexe: true,\n                diagnosis: true,\n                poids: true,\n                taille: true,\n                traitement: true,\n                numSecu: true,\n                medecin: true,\n                rendezvous: true,\n                groupeSanguin: true,\n                allergies: true,\n                notes: true,\n                createdAt: true\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(patients);\n    } catch (error) {\n        console.error('Erreur lors du chargement des patients:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Erreur lors de la récupération des patients'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQWxkb1xcTXVzaWNcXEhhY2thdGhvbl9HTF8yMDI1LW1haW5cXGFwcFxcYXBpXFxwYXRpZW50c1xccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHByaXNtYSBmcm9tICdAL2xpYi9wcmlzbWEnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRpZW50ID0gYXdhaXQgcmVxLmpzb24oKTtcblxuICAgIC8vIFZhbGlkYXRpb24gZGVzIGRvbm7DqWVzXG4gICAgaWYgKCFwYXRpZW50Lm5hbWUgfHwgIXBhdGllbnQuYWdlIHx8ICFwYXRpZW50LmRpYWdub3Npcykge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnTm9tLCDDomdlIGV0IGRpYWdub3N0aWMgc29udCBvYmxpZ2F0b2lyZXMnIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBWYWxpZGF0aW9uIGR1IHNleGVcbiAgICBjb25zdCB2YWxpZFNleGVzID0gWydNJywgJ0YnLCAnQXV0cmUnLCBudWxsXTtcbiAgICBpZiAocGF0aWVudC5zZXhlICYmICF2YWxpZFNleGVzLmluY2x1ZGVzKHBhdGllbnQuc2V4ZSkpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ0xlIHNleGUgZG9pdCDDqnRyZSBNLCBGLCBBdXRyZSBvdSBudWxsJyB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gQ3LDqWF0aW9uIGR1IHBhdGllbnRcbiAgICBjb25zdCBuZXdQYXRpZW50ID0gYXdhaXQgcHJpc21hLnBhdGllbnQuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbmFtZTogcGF0aWVudC5uYW1lLFxuICAgICAgICBhZ2U6IHBhcnNlSW50KHBhdGllbnQuYWdlKSxcbiAgICAgICAgc2V4ZTogcGF0aWVudC5zZXhlIHx8IG51bGwsIC8vIFMnYXNzdXJlIHF1ZSBsZSBzZXhlIGVzdCBzb2l0IE0vRi9BdXRyZSBzb2l0IG51bGxcbiAgICAgICAgZGlhZ25vc2lzOiBwYXRpZW50LmRpYWdub3NpcyxcbiAgICAgICAgcG9pZHM6IHBhdGllbnQucG9pZHMgPyBwYXJzZUZsb2F0KHBhdGllbnQucG9pZHMpIDogbnVsbCxcbiAgICAgICAgdGFpbGxlOiBwYXRpZW50LnRhaWxsZSA/IHBhcnNlRmxvYXQocGF0aWVudC50YWlsbGUpIDogbnVsbCxcbiAgICAgICAgdHJhaXRlbWVudDogcGF0aWVudC50cmFpdGVtZW50IHx8IG51bGwsXG4gICAgICAgIG51bVNlY3U6IHBhdGllbnQubnVtU2VjdSB8fCBudWxsLFxuICAgICAgICBtZWRlY2luOiBwYXRpZW50Lm1lZGVjaW4gfHwgbnVsbCxcbiAgICAgICAgLi4uKHBhdGllbnQucmVuZGV6dm91cyAmJiB7IHJlbmRlenZvdXM6IG5ldyBEYXRlKHBhdGllbnQucmVuZGV6dm91cykgfSksXG4gICAgICAgIGdyb3VwZVNhbmd1aW46IHBhdGllbnQuZ3JvdXBlU2FuZ3VpbiB8fCBudWxsLFxuICAgICAgICBhbGxlcmdpZXM6IHBhdGllbnQuYWxsZXJnaWVzIHx8IG51bGwsXG4gICAgICAgIG5vdGVzOiBwYXRpZW50Lm5vdGVzIHx8IG51bGxcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihuZXdQYXRpZW50LCB7IHN0YXR1czogMjAxIH0pO1xuXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyZXVyIGFqb3V0IHBhdGllbnQ6JywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6ICdFcnJldXIgbG9ycyBkZSBsYSBjcsOpYXRpb24gZHUgcGF0aWVudCcgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRpZW50cyA9IGF3YWl0IHByaXNtYS5wYXRpZW50LmZpbmRNYW55KHtcbiAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfSxcbiAgICAgIHNlbGVjdDoge1xuICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgYWdlOiB0cnVlLFxuICAgICAgICBzZXhlOiB0cnVlLCBcbiAgICAgICAgZGlhZ25vc2lzOiB0cnVlLFxuICAgICAgICBwb2lkczogdHJ1ZSxcbiAgICAgICAgdGFpbGxlOiB0cnVlLFxuICAgICAgICB0cmFpdGVtZW50OiB0cnVlLFxuICAgICAgICBudW1TZWN1OiB0cnVlLFxuICAgICAgICBtZWRlY2luOiB0cnVlLFxuICAgICAgICByZW5kZXp2b3VzOiB0cnVlLFxuICAgICAgICBncm91cGVTYW5ndWluOiB0cnVlLFxuICAgICAgICBhbGxlcmdpZXM6IHRydWUsXG4gICAgICAgIG5vdGVzOiB0cnVlLFxuICAgICAgICBjcmVhdGVkQXQ6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24ocGF0aWVudHMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBsb3JzIGR1IGNoYXJnZW1lbnQgZGVzIHBhdGllbnRzOicsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnRXJyZXVyIGxvcnMgZGUgbGEgcsOpY3Vww6lyYXRpb24gZGVzIHBhdGllbnRzJyB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJQT1NUIiwicmVxIiwicGF0aWVudCIsImpzb24iLCJuYW1lIiwiYWdlIiwiZGlhZ25vc2lzIiwiZXJyb3IiLCJzdGF0dXMiLCJ2YWxpZFNleGVzIiwic2V4ZSIsImluY2x1ZGVzIiwibmV3UGF0aWVudCIsImNyZWF0ZSIsImRhdGEiLCJwYXJzZUludCIsInBvaWRzIiwicGFyc2VGbG9hdCIsInRhaWxsZSIsInRyYWl0ZW1lbnQiLCJudW1TZWN1IiwibWVkZWNpbiIsInJlbmRlenZvdXMiLCJEYXRlIiwiZ3JvdXBlU2FuZ3VpbiIsImFsbGVyZ2llcyIsIm5vdGVzIiwiY29uc29sZSIsIkdFVCIsInBhdGllbnRzIiwiZmluZE1hbnkiLCJvcmRlckJ5IiwiY3JlYXRlZEF0Iiwic2VsZWN0IiwiaWQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/patients/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* eslint-disable no-var */ // lib/prisma.ts\n\nconst prisma = global.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) global.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlCQUF5QixHQUN6QixnQkFBZ0I7QUFDOEI7QUFNOUMsTUFBTUMsU0FBU0MsT0FBT0QsTUFBTSxJQUFJLElBQUlELHdEQUFZQTtBQUVoRCxJQUFJRyxJQUFxQyxFQUFFRCxPQUFPRCxNQUFNLEdBQUdBO0FBRTNELGlFQUFlQSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXEFsZG9cXE11c2ljXFxIYWNrYXRob25fR0xfMjAyNS1tYWluXFxsaWJcXHByaXNtYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby12YXIgKi9cbi8vIGxpYi9wcmlzbWEudHNcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcblxuZGVjbGFyZSBnbG9iYWwge1xuICB2YXIgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IHByaXNtYSA9IGdsb2JhbC5wcmlzbWEgfHwgbmV3IFByaXNtYUNsaWVudCgpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsLnByaXNtYSA9IHByaXNtYTtcblxuZXhwb3J0IGRlZmF1bHQgcHJpc21hOyJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJnbG9iYWwiLCJwcm9jZXNzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpatients%2Froute&page=%2Fapi%2Fpatients%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpatients%2Froute.ts&appDir=C%3A%5CUsers%5CAldo%5CMusic%5CHackathon_GL_2025-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAldo%5CMusic%5CHackathon_GL_2025-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpatients%2Froute&page=%2Fapi%2Fpatients%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpatients%2Froute.ts&appDir=C%3A%5CUsers%5CAldo%5CMusic%5CHackathon_GL_2025-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAldo%5CMusic%5CHackathon_GL_2025-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Aldo_Music_Hackathon_GL_2025_main_app_api_patients_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/patients/route.ts */ \"(rsc)/./app/api/patients/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/patients/route\",\n        pathname: \"/api/patients\",\n        filename: \"route\",\n        bundlePath: \"app/api/patients/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Aldo\\\\Music\\\\Hackathon_GL_2025-main\\\\app\\\\api\\\\patients\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Aldo_Music_Hackathon_GL_2025_main_app_api_patients_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwYXRpZW50cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcGF0aWVudHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZwYXRpZW50cyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBbGRvJTVDTXVzaWMlNUNIYWNrYXRob25fR0xfMjAyNS1tYWluJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNBbGRvJTVDTXVzaWMlNUNIYWNrYXRob25fR0xfMjAyNS1tYWluJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUM0QjtBQUN6RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcQWxkb1xcXFxNdXNpY1xcXFxIYWNrYXRob25fR0xfMjAyNS1tYWluXFxcXGFwcFxcXFxhcGlcXFxccGF0aWVudHNcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3BhdGllbnRzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcGF0aWVudHNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3BhdGllbnRzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcQWxkb1xcXFxNdXNpY1xcXFxIYWNrYXRob25fR0xfMjAyNS1tYWluXFxcXGFwcFxcXFxhcGlcXFxccGF0aWVudHNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpatients%2Froute&page=%2Fapi%2Fpatients%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpatients%2Froute.ts&appDir=C%3A%5CUsers%5CAldo%5CMusic%5CHackathon_GL_2025-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAldo%5CMusic%5CHackathon_GL_2025-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpatients%2Froute&page=%2Fapi%2Fpatients%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpatients%2Froute.ts&appDir=C%3A%5CUsers%5CAldo%5CMusic%5CHackathon_GL_2025-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAldo%5CMusic%5CHackathon_GL_2025-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();