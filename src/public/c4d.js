var ip = 'http://localhost:3000/';

var consola = CodeMirror.fromTextArea($(".codemirror-textarea")[1],{
    lineNumbers : true,
    mode: "modo",
    theme : "dracula"
});

consola.setSize(null,300);

var editor = CodeMirror.fromTextArea($(".codemirror-textarea")[0],{
    lineNumbers : true,
    mode: "modo",
    theme : "dracula"
});

editor.setSize(null,700);

function siguiente(){
    var model = {breakpoints : JSON.stringify([])}
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
            alert("Ingrese texto");
        }
    });
  }

$(document).ready(function(){
    $.get(`${ip}4D/text`,function(result){
        editor.setValue(result.c4d);
    });
    $("#run").click(()=>{
        var text = editor.getValue();
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
        });
    });
    $("#assembly").click(()=>{
        var text = editor.getValue();
        var model = {text:text};
        $.post(`${ip}4D/genasm`,model,function(result){
            alert("Ensamblador generado");
            editor.setValue(result.assm);
        })
    });

    $("#readbtn").click(()=>{
        var input = $("#read").val();
        $("#read").val("");    
        var model = {text:input};
        $.post(`${ip}4D/sendtext`,model,function(result){ siguiente();});
    });

    $("#mirilla").click(()=>{
        var text = editor.getValue();
        var model = {text:text};
        $.post(`${ip}4D/mirilla`,model,function(result){
            alert("Codigo Optimizado");
            editor.setValue(result.c4d);
        })
    });

});

