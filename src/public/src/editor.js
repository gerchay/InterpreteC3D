var ip = 'http://localhost:4000/';

var consola = CodeMirror.fromTextArea($(".codemirror-textarea")[0],{
    lineNumbers : true,
    mode: "modo",
    theme : "dracula"
});

consola.setSize(null,710);

function exec(){
    var text = consola.getValue();
    client.send(text);
}

function save(){
    var text = consola.getValue();
    var filename = prompt("File name:","");
    if(filename!= null){
        download(filename,text); 
    }
}

function Send4D(data){
    console.log(data);
    $("#errors").html(data.errores);
    if(data.errores == 0){
        alert("compiled successfully");
    }
    $.post(`${ip}Editor`,{data:JSON.stringify(data)},function(result){
    });
}

function download(filename,text){
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}
//chip dcp

function dispFile(contents) {
    document.getElementById('contents').innerHTML=contents
  }
  function clickElem(elem) {
      // Thx user1601638 on Stack Overflow (6/6/2018 - https://stackoverflow.com/questions/13405129/javascript-create-and-save-file )
      var eventMouse = document.createEvent("MouseEvents")
      eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      elem.dispatchEvent(eventMouse)
  }
  function openFile(func) {
      consola.setValue("");
      readFile = function(e) {
          var file = e.target.files[0];
          if (!file) {
              return;
          }
          var reader = new FileReader();
          reader.onload = function(e) {
              //var contents = e.target.result;
              //fileInput.func(contents)
              consola.setValue(consola.getValue() + e.target.result);
          }
          reader.readAsText(file)
      }
      fileInput = document.createElement("input")
      fileInput.type='file'
      fileInput.style.display='none'
      fileInput.onchange=readFile
      fileInput.func=func
      //document.body.appendChild(fileInput)
      clickElem(fileInput)
  }