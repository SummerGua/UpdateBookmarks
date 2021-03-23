let btn = document.getElementById("update-btn");
let btn2 = document.getElementById("save");
let text = document.getElementById("text");
btn.onclick = function() {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    text.innerText = url
    // use `url` here inside the callback because it's asynchronous!
  });
};
btn2.onclick = function() {
  chrome.bookmarks.create({
    'parentId': '1',
    'title': 'mi',
    'url': 'https://www.mi.com'
  })
  
};
const options = {
  title: 'demo',
  visible: true,
  onclick:function(){alert('您点击了右键菜单！')}
}
chrome.contextMenus.create(options)