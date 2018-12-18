/** @license
  Simple Auto Scroll | MIT License
  Copyright 2013 Jose Pablo Barrantes

  Permission is hereby granted, free of charge, to any person obtaining a copy of
  this software and associated documentation files (the "Software"), to deal in
  the Software without restriction, including without limitation the rights to
  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
  of the Software, and to permit persons to whom the Software is furnished to do
  so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

 */


function slowLabel(tab) {
  chrome.browserAction.setBadgeBackgroundColor({color: [0,180,255,255]});
  doScroll(tab, (localStorage["slow"] || "100"), 'slow');
};

function mediumLabel(tab) {
  chrome.browserAction.setBadgeBackgroundColor({color: [0,125,255,255]});
  doScroll(tab, (localStorage["medium"] || "40"), 'medium');
};

function fastLabel(tab) {
  chrome.browserAction.setBadgeBackgroundColor({color: [0, 55, 255, 255]});
  doScroll(tab, (localStorage["fast"] || "1"), 'fast');
};

chrome.extension.getVersion = function() {
  if (!chrome.extension.version_) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", chrome.extension.getURL('manifest.json'), true);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4) {
        var manifest = JSON.parse(this.responseText);
        chrome.extension.version_ = manifest.version;
      }
    };
    xhr.send();
  }
  return chrome.extension.version_;
};

document.addEventListener('DOMContentLoaded',  function(e) {
  var old_ver = (localStorage["version"] || "" ).split(".");
  var new_ver = (chrome.extension.getVersion() + "").split(".");

  if(old_ver[0]+'.'+old_ver[1]+'.'+old_ver[2] != new_ver[0]+'.'+new_ver[1]+'.'+new_ver[2]){
    chrome.tabs.getAllInWindow(undefined, function(tabs) {
      for (var i = 0, tab; tab = tabs[i]; i++) {
	var str = tab.url;
	if (str.match('http://github.com/jpablobr/simple-auto-scroll')) {
	  chrome.tabs.update(tab.id, {selected: true});
	  return;
	}
      }
      chrome.tabs.create({url:'http://github.com/jpablobr/simple-auto-scroll'});
    });
    localStorage["version"] = chrome.extension.getVersion();
  }
}, false);

var scrollbar = 0;
var wN2scRl;

function resetScroll(tab) {
  chrome.browserAction.setBadgeText({text:""});
  var upUrl = "javascript:var wN2scRl;Sa5gNA9k=new Function('clearTimeout(wN2scRl)');document.onkeydown=Sa5gNA9k;Sa5gNA9k();void(wN2scRl=setInterval('if(pageYOffset<document.height-innerHeight){window.scrollBy(0,0)}else{Sa5gNA9k()}',0))";
  if(upUrl != tab.url) {
    chrome.tabs.update(tab.id, {'url': upUrl});
  }
}

function doScroll(tab, speed, badge) {
  chrome.browserAction.setBadgeText({text:badge});
  wN2scRl = setInterval(function(){
    upurl(tab.id);
  }, speed);
}

function upurl(id){
  chrome.tabs.update(id, {'url': 'javascript:document.documentElement.scrollTop+=1;'});
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if(scrollbar != 0){
    chrome.tabs.getSelected(null, function(tab){
      clearInterval(wN2scRl);
      resetScroll(tab);
    });
    scrollbar = 0;
  }
  sendResponse();
});

chrome.browserAction.onClicked.addListener(function(tab) {
  clearInterval(wN2scRl);

  if(scrollbar == 0) {
    scrollbar +=1;
    slowLabel(tab);
  } else if(scrollbar == 1) {
    scrollbar +=1;
    mediumLabel(tab);
  } else if(scrollbar == 2) {
    scrollbar +=1;
    fastLabel(tab);
  } else if(scrollbar == 3) {
    scrollbar = 0;
    resetScroll(tab);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabid, selectinfo) {
  clearInterval(wN2scRl);
  chrome.browserAction.setBadgeText({text:""});
  scrollbar=0;
});
