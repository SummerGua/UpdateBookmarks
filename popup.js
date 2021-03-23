let btn = document.getElementById("update-btn");
function getDomain(url){
  return url.split('://')[1].split('/')[0];
};
btn.onclick = function() {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let currentUrl = "";
    let realUrl = "";
    let title = "";
    if(tabs[0]?.url){
      realUrl = tabs[0].url
      currentUrl = getDomain(tabs[0].url);
      title = tabs[0].title;
      chrome.bookmarks.getChildren("1", (children) => { // 在书签中找到与当前tab域名相同的网址
        let bookmarks = new Map();
        children.forEach( item => {
          bookmarks.set(getDomain(item.url), item);
        })
        if(bookmarks.has(currentUrl)) {
          const tipResult = window.prompt("您确定要更新名为" + bookmarks.get(currentUrl).title + "的书签吗(可更改名称)", title);
          if(tipResult) {
            chrome.bookmarks.update(bookmarks.get(currentUrl).id, {"title": title, "url": realUrl});
          }
        }else{
          const tipResult = window.prompt("书签栏中还没有“"+ title +"”，是否添加？(点击确认使用默认名称)", title);
          if(tipResult) {
            chrome.bookmarks.create({
              "parentId": "1",
              "title": title,
              "url": realUrl
            })
          }
        }
      })
    }else{
      console.log("当前url未定义");
    }
  });
};
