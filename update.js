//右键功能 
chrome.contextMenus.create({
  id: "command",
  title: "更新收藏",
  contexts: ["all"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "command") {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      let url = '';
      if(tabs[0]?.url){
        url = tabs[0].url;
        chrome.bookmarks.getChildren('1', (children) => {
          children.forEach( i => console.log(i))
        })
        // chrome.bookmarks.create({
        //   'parentId': '1',
        //   'title': 'mi',
        //   'url': url
        // })
      }else{
        console.log("当前url为定义");
      }
    });
      
  }
});