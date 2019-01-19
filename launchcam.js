document.getElementById("scan").addEventListener("click",()=>{
    chrome.tabs.create({url:"index.html",active:false},()=>{});
});

document.getElementById("go_f").addEventListener("click",TabForward);
document.getElementById("go_b").addEventListener("click",TabBackward);
document.getElementById("newTab").addEventListener("click",newTab);
document.getElementById("removeTab").addEventListener("click",removeTab);

function removeTab() {
    chrome.tabs.query({active:true,currentWindow:true},(tab)=>{
        chrome.tabs.remove([tab[0].id]);
    })
}

function newTab() {
    chrome.tabs.create({active:true});
}

function TabForward() {
    chrome.tabs.query({currentWindow:true},(tab)=>{
        console.log(tab);
        chrome.tabs.query({currentWindow:true,active:true},(tab2)=>{
            console.log("current tab = ");
            console.log(tab2);
            let pos =0;
            while(pos<tab.length && tab[pos].id!=tab2[0].id){
                pos++;
            }
            pos++;
            pos = pos%tab.length;
            chrome.tabs.highlight({tabs:[pos]});
        });
    });
}

function TabBackward() {
    chrome.tabs.query({currentWindow:true},(tab)=>{
        console.log(tab);
        chrome.tabs.query({currentWindow:true,active:true},(tab2)=>{
            console.log("current tab = ");
            console.log(tab2);
            let pos =0;
            while(pos<tab.length && tab[pos].id!=tab2[0].id){
                pos++;
            }
            pos--;
            pos = pos+tab.length;
            pos = pos%tab.length;
            chrome.tabs.highlight({tabs:[pos]});
        });
    });
}