var ip = 'http://68.183.30.44:4000/';

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

$(document).ready(function(){
    $("#run").click(()=>{
        var text = editor.getValue();
        var model = {text:text};
        console.log(model);
        $.post(`${ip}c3d/run`,model,function(result){
            console.log(result);
            consola.setValue(result.salida);
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
        });
    });
});

