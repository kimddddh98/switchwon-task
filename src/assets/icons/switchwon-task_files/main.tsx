import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=4b7ad760"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=4b7ad760"; const createRoot = __vite__cjsImport1_reactDom_client["createRoot"];
import { RouterProvider } from "/node_modules/.vite/deps/react-router_dom.js?v=4b7ad760";
import "/src/global.css?t=1768558964156";
import __vite__cjsImport4_react from "/node_modules/.vite/deps/react.js?v=4b7ad760"; const React = __vite__cjsImport4_react.__esModule ? __vite__cjsImport4_react.default : __vite__cjsImport4_react;
import { QueryClient, QueryClientProvider } from "/node_modules/.vite/deps/@tanstack_react-query.js?v=4b7ad760";
import { router } from "/src/routes/index.tsx?t=1768558964156";
import { ReactQueryDevtools } from "/node_modules/.vite/deps/@tanstack_react-query-devtools.js?v=4b7ad760";
import Toast from "/src/components/Toast.tsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDEV(React.StrictMode, { children: /* @__PURE__ */ jsxDEV(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxDEV(RouterProvider, { router }, void 0, false, {
      fileName: "/Users/gimdonghyeon/Desktop/workspace/switchwon-task/src/main.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(ReactQueryDevtools, { initialIsOpen: false }, void 0, false, {
      fileName: "/Users/gimdonghyeon/Desktop/workspace/switchwon-task/src/main.tsx",
      lineNumber: 16,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Toast, {}, void 0, false, {
      fileName: "/Users/gimdonghyeon/Desktop/workspace/switchwon-task/src/main.tsx",
      lineNumber: 17,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/gimdonghyeon/Desktop/workspace/switchwon-task/src/main.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "/Users/gimdonghyeon/Desktop/workspace/switchwon-task/src/main.tsx",
    lineNumber: 13,
    columnNumber: 3
  }, this)
);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBY007QUFkTixTQUFTQSxrQkFBa0I7QUFDM0IsU0FBU0Msc0JBQXNCO0FBQy9CLE9BQU87QUFDUCxPQUFPQyxXQUFXO0FBQ2xCLFNBQVNDLGFBQWFDLDJCQUEyQjtBQUNqRCxTQUFTQyxjQUFjO0FBQ3ZCLFNBQVNDLDBCQUEwQjtBQUNuQyxPQUFPQyxXQUFXO0FBRWxCLE1BQU1DLGNBQWMsSUFBSUwsWUFBWTtBQUVwQ0gsV0FBV1MsU0FBU0MsZUFBZSxNQUFNLENBQUUsRUFBRUM7QUFBQUEsRUFDM0MsdUJBQUMsTUFBTSxZQUFOLEVBQ0MsaUNBQUMsdUJBQW9CLFFBQVFILGFBQzNCO0FBQUEsMkJBQUMsa0JBQWUsVUFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUErQjtBQUFBLElBQy9CLHVCQUFDLHNCQUFtQixlQUFlLFNBQW5DO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBeUM7QUFBQSxJQUN6Qyx1QkFBQyxXQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBTTtBQUFBLE9BSFI7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUlBLEtBTEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQU1BO0FBQ0YiLCJuYW1lcyI6WyJjcmVhdGVSb290IiwiUm91dGVyUHJvdmlkZXIiLCJSZWFjdCIsIlF1ZXJ5Q2xpZW50IiwiUXVlcnlDbGllbnRQcm92aWRlciIsInJvdXRlciIsIlJlYWN0UXVlcnlEZXZ0b29scyIsIlRvYXN0IiwicXVlcnlDbGllbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIm1haW4udHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVJvb3QgfSBmcm9tICdyZWFjdC1kb20vY2xpZW50J1xuaW1wb3J0IHsgUm91dGVyUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXIvZG9tJ1xuaW1wb3J0ICdAL2dsb2JhbC5jc3MnXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBRdWVyeUNsaWVudCwgUXVlcnlDbGllbnRQcm92aWRlciB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSdcbmltcG9ydCB7IHJvdXRlciB9IGZyb20gJy4vcm91dGVzL2luZGV4LnRzeCdcbmltcG9ydCB7IFJlYWN0UXVlcnlEZXZ0b29scyB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeS1kZXZ0b29scydcbmltcG9ydCBUb2FzdCBmcm9tICcuL2NvbXBvbmVudHMvVG9hc3QudHN4J1xuXG5jb25zdCBxdWVyeUNsaWVudCA9IG5ldyBRdWVyeUNsaWVudCgpXG5cbmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSEpLnJlbmRlcihcbiAgPFJlYWN0LlN0cmljdE1vZGU+XG4gICAgPFF1ZXJ5Q2xpZW50UHJvdmlkZXIgY2xpZW50PXtxdWVyeUNsaWVudH0+XG4gICAgICA8Um91dGVyUHJvdmlkZXIgcm91dGVyPXtyb3V0ZXJ9IC8+XG4gICAgICA8UmVhY3RRdWVyeURldnRvb2xzIGluaXRpYWxJc09wZW49e2ZhbHNlfSAvPlxuICAgICAgPFRvYXN0IC8+XG4gICAgPC9RdWVyeUNsaWVudFByb3ZpZGVyPlxuICA8L1JlYWN0LlN0cmljdE1vZGU+LFxuKVxuIl0sImZpbGUiOiIvVXNlcnMvZ2ltZG9uZ2h5ZW9uL0Rlc2t0b3Avd29ya3NwYWNlL3N3aXRjaHdvbi10YXNrL3NyYy9tYWluLnRzeCJ9