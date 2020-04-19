var ip = 'http://68.183.30.44:4000/';
var periodica;

var consola = CodeMirror.fromTextArea($(".codemirror-textarea")[1],{
    lineNumbers : true,
    mode: "modo",
    theme : "dracula"
});

consola.setSize(null,300);

let marcas = [];
var editor = CodeMirror.fromTextArea($(".codemirror-textarea")[0],{
    lineNumbers : true,
    mode: "modo",
    theme : "dracula",
    gutters: ["CodeMirror-linenumbers", "breakpoints"],
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    autofocus:false
});

editor.setSize(null,700);
editor.on("gutterClick", function(cm, n) {
  var info = cm.lineInfo(n);
  console.log(info);
  cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
  let numerolineas = n +1;
  if (typeof marcas[numerolineas]==='undefined') {
    marcas[numerolineas] =numerolineas;
    console.log(marcas[numerolineas] + " agregando");
  }else {
    delete marcas[numerolineas];
    console.log(marcas[numerolineas]+" elimina")
  }
});

  function makeMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#822";
    marker.innerHTML = "●";
    return marker;
  }

  function siguiente(){
    var model = {breakpoints : JSON.stringify(marcas)}
    $.post(`${ip}Debug/pause`,model,function(result){
        consola.setValue(result.console);
        var strh = '';
        for (let index = 0; index < result.stack.length; index++) {
            const element = result.stack[index];
            strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-success">${element == null ? -1 : element}<span class="badge badge-danger">${index}</span></li>\n`;
        }
        $("#stack").html(strh);
        strh = '';
        for (let index = 0; index < result.heap.length; index++) {
            const element = result.heap[index];
            strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${element == null ? -1 : element}<span class="badge badge-danger">${index}</span></li>\n`;
        }
        $("#heap").html(strh);
        strh = '';
        strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${result.h}<span class="badge badge-danger">H</span></li>\n`;
        strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${result.p}<span class="badge badge-danger">P</span></li>\n`;
        for (let index = 0; index < result.temps.length; index++) {
            const element = result.temps[index];
            strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${element == null ? -1 : element}<span class="badge badge-danger">Temp${index}</span></li>\n`;
        }
        $("#temps").html(strh);
        $("#actual").html(result.actual+1);
        editor.focus();
        editor.setCursor({line: result.actual - 1, ch: 5});
        if(result.status == false){
           /* while(true){
                var input = prompt("Ingrese el valor", "");
                if(!result.tipo && isNaN(input)){
                    alert("Tipo incorrecto");
                    continue;
                }
                var model1 = {text:input};
                $.post(`${ip}4D/sendtext`,model1,function(result){ });
                break;
            }*/
            alert("Ingrese texto");
        }
    });
  }

$(document).ready(function(){
    $.get(`${ip}4D/text`,function(result){
        editor.setValue(result.c4d);
    });
    $("#run").click(()=>{
        /*var text = editor.getValue();
        var model = {text:text};
        $.post(`${ip}4D/run`,model,function(result){
            console.log(result);
            consola.setValue(result.console);
            var strh = '';
            for (let index = 0; index < result.stack.length; index++) {
                const element = result.stack[index];
                strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-success">${element == null ? -1 : element}<span class="badge badge-danger">${index}</span></li>\n`;
            }
            $("#stack").html(strh);
            strh = '';
            for (let index = 0; index < result.heap.length; index++) {
                const element = result.heap[index];
                strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${element == null ? -1 : element}<span class="badge badge-danger">${index}</span></li>\n`;
            }
            $("#heap").html(strh);
            strh = '';
            strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${result.h}<span class="badge badge-danger">H</span></li>\n`;
            strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${result.p}<span class="badge badge-danger">P</span></li>\n`;
            for (let index = 0; index < result.temps.length; index++) {
                const element = result.temps[index];
                strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${element == null ? -1 : element}<span class="badge badge-danger">Temp${index}</span></li>\n`;
            }
            $("#temps").html(strh);
            if(result.status == false){
                alert("Ingrese Texto");
            }
        });*/
        var velocidad = $("#velocidad").val();

        periodica = setInterval(function(){  
            $.get(`${ip}Debug/next`,function(result){
                consola.setValue(result.console);
                var strh = '';
                for (let index = 0; index < result.stack.length; index++) {
                    const element = result.stack[index];
                    strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-success">${element == null ? -1 : element}<span class="badge badge-danger">${index}</span></li>\n`;
                }
                $("#stack").html(strh);
                strh = '';
                for (let index = 0; index < result.heap.length; index++) {
                    const element = result.heap[index];
                    strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${element == null ? -1 : element}<span class="badge badge-danger">${index}</span></li>\n`;
                }
                $("#heap").html(strh);
                strh = '';
                strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${result.h}<span class="badge badge-danger">H</span></li>\n`;
                strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${result.p}<span class="badge badge-danger">P</span></li>\n`;
                for (let index = 0; index < result.temps.length; index++) {
                    const element = result.temps[index];
                    strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${element == null ? -1 : element}<span class="badge badge-danger">Temp${index}</span></li>\n`;
                }
                $("#temps").html(strh);
                $("#actual").html(result.actual+1);
                editor.focus();
                editor.setCursor({line: result.actual, ch: 5});
                if(result.status == false){
                    clearInterval(periodica);
                    alert("Ingrese texto");
                }
            });
        }, velocidad);
    });

    $("#parar").click(()=>{
        clearInterval(periodica);
    });

    $("#compile").click(()=>{
        var text = editor.getValue();
        var model = {text};
        $.post(`${ip}Debug/compile`,model,function(result){
            console.log(result);
        });
    });

    $("#pause").click(()=>{
        var model = {breakpoints : JSON.stringify(marcas)}
        $.post(`${ip}Debug/pause`,model,function(result){
            consola.setValue(result.console);
            var strh = '';
            for (let index = 0; index < result.stack.length; index++) {
                const element = result.stack[index];
                strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-success">${element == null ? -1 : element}<span class="badge badge-danger">${index}</span></li>\n`;
            }
            $("#stack").html(strh);
            strh = '';
            for (let index = 0; index < result.heap.length; index++) {
                const element = result.heap[index];
                strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${element == null ? -1 : element}<span class="badge badge-danger">${index}</span></li>\n`;
            }
            $("#heap").html(strh);
            strh = '';
            strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${result.h}<span class="badge badge-danger">H</span></li>\n`;
            strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${result.p}<span class="badge badge-danger">P</span></li>\n`;
            for (let index = 0; index < result.temps.length; index++) {
                const element = result.temps[index];
                strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${element == null ? -1 : element}<span class="badge badge-danger">Temp${index}</span></li>\n`;
            }
            $("#temps").html(strh);
            $("#actual").html(result.actual+1);
            editor.focus();
            editor.setCursor({line: result.actual - 1, ch: 5});
            if(result.status == false){
               /* while(true){
                    var input = prompt("Ingrese el valor", "");
                    if(!result.tipo && isNaN(input)){
                        alert("Tipo incorrecto");
                        continue;
                    }
                    var model1 = {text:input};
                    $.post(`${ip}4D/sendtext`,model1,function(result){ });
                    break;
                }*/
                alert("Ingrese texto");
            }
        });
    });

    $("#next").click(()=>{
        $.get(`${ip}Debug/next`,function(result){
            consola.setValue(result.console);
            var strh = '';
            for (let index = 0; index < result.stack.length; index++) {
                const element = result.stack[index];
                strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-success">${element == null ? -1 : element}<span class="badge badge-danger">${index}</span></li>\n`;
            }
            $("#stack").html(strh);
            strh = '';
            for (let index = 0; index < result.heap.length; index++) {
                const element = result.heap[index];
                strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${element == null ? -1 : element}<span class="badge badge-danger">${index}</span></li>\n`;
            }
            $("#heap").html(strh);
            strh = '';
            strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${result.h}<span class="badge badge-danger">H</span></li>\n`;
            strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${result.p}<span class="badge badge-danger">P</span></li>\n`;
            for (let index = 0; index < result.temps.length; index++) {
                const element = result.temps[index];
                strh += `<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">${element == null ? -1 : element}<span class="badge badge-danger">Temp${index}</span></li>\n`;
            }
            $("#temps").html(strh);
            $("#actual").html(result.actual+1);
            editor.focus();
            editor.setCursor({line: result.actual, ch: 5});
            if(result.status == false){
               /* while(true){
                    var input = prompt("Ingrese el valor", "");
                    if(!result.tipo && isNaN(input)){
                        alert("Tipo incorrecto");
                        continue;
                    }
                    var model1 = {text:input};
                    $.post(`${ip}4D/sendtext`,model1,function(result){ });
                    break;
                }*/
                alert("Ingrese texto");
            }
        });
    });

    $("#readbtn").click(()=>{
        var input = $("#read").val();
        $("#read").val("");    
        var model = {text:input};
        $.post(`${ip}4D/sendtext`,model,function(result){ siguiente();});
    });
});

