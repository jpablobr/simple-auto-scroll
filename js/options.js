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

var background = chrome.extension.getBackgroundPage();
document.addEventListener('DOMContentLoaded',  function(e) {
  document.getElementById("version").innerHTML = background.chrome.extension.getVersion();
  init();
  document.getElementById("save_settings").addEventListener('click', save_settings);
}, false);

function viewStatus(id, msg){
  var status = document.getElementById(id);
  status.innerHTML = msg;
  setTimeout(function() { status.innerHTML = ""; }, 1 * 1000);
}

function init(){
  document.getElementById("slow").value = (localStorage["slow"] || "80");
  document.getElementById("medium").value = (localStorage["medium"] || "30");
  document.getElementById("fast").value = (localStorage["fast"] || "1");
}

function save_settings() {
  localStorage["slow"] = document.getElementById("slow").value + "";
  localStorage["medium"] = document.getElementById("medium").value + "";
  localStorage["fast"] = document.getElementById("fast").value + "";
  viewStatus("status_settings","Options Saved.");
}
