// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let start_btn = document.getElementById('on');
let end_btn = document.getElementById('off');

chrome.storage.sync.get('currentState', function(data) {
  if(data.currentState == 'off'){
    chrome.storage.sync.get('color', function(data) {
        end_btn.style.backgroundColor = data.color;
        end_btn.style.color = 'white';
    });
  }else{
    chrome.storage.sync.get('color', function(data) {
      start_btn.style.backgroundColor = data.color;
      start_btn.style.color = 'white';
  });
  }
});

// start event
start_btn.onclick = function(element) {
  let color = element.target.value;
  chrome.storage.sync.get('color', function(data) { // get color property
      resetBtn(end_btn);
      start_btn.style.backgroundColor = data.color;
      start_btn.setAttribute('value', data.color);
      start_btn.style.color = 'white';
  });
  chrome.storage.sync.set({currentState: 'on'});

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: `
        var timeTask;
        tiemTask = window.setInterval(function(){
          document.body.style.backgroundColor = 'green'
          let subtitle = document.getElementsByClassName('captions-display--vjs-ud-captions-cue-text--38tMf');
          console.log(subtitle[0].outerText)
          document.body.style.backgroundColor = 'green'
        },1000)
       
        `}
        
      )
  });
};

// end_btn event
end_btn.onclick = function(element) {
  let color = element.target.value;
  chrome.storage.sync.get('color', function(data) {
    resetBtn(start_btn);
    end_btn.style.backgroundColor = data.color;
    end_btn.setAttribute('value', data.color);
    end_btn.style.color = 'white';
    
  });

  chrome.storage.sync.set({currentState: 'off'});

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        // {code: 'document.body.style.backgroundColor = "' + color + '";'}
        {code: `
          window.clearInterval(timeTask)
        `}  // stop func here
        
      )
  });
};

function resetBtn(dom){
  dom.style.color = '';
  dom.style.backgroundColor = ''
}





