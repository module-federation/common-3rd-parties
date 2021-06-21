# common-3rd-parties
Common Third party scripts provided as federated modules


Allows for importing of third parties via module federation 

## Configuring the consumer
```js
new ModuleFederationPlugin({
  name: "app1",
  remotes: {
    "@module-federation/common-3rd-libs": `moduleFederationCommon_3rdLibs@https://unpkg.com/@module-federation/common-3rd-libs@1.0.4/dist/browser/remote-entry.js`,
  },
  shared: { react: { singleton: true }, "react-dom": { singleton: true } },
})
```


## Examples: 
```js
import("@module-federation/common-3rd-libs/google-analytics").then((ga) => {
  ga("create", "UA-XXXXX-Y", "auto");
  ga("send", "pageview");
});
import("@module-federation/common-3rd-libs/facebook").then((fbq) => {
  console.log(fbq);
  fbq("init", "12341234");
  fbq("track", "PageView");
});
import("@module-federation/common-3rd-libs/bing").then((UET) => {
  console.log(UET);
  var o = { ti: "TAG_ID_HERE" };
  window.uetq = new UET(o);
  window.uetq.push("pageLoad");
});
```
