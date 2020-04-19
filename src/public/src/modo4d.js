CodeMirror.defineSimpleMode("modo", {
  
    start: [
      {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
      {regex: /'(?:[^\\]|\\.)*?(?:'|$)/, token: "string"},
  
      {regex: /(?:jmp|je|jne|jg|jl|jge|jlecall|begin|end|print|stack|heap|p|h|void)\b/gi,token: "keyword"},      

      {regex: /true|false|nil|undefined/gi, token: "atom"},
    
      {regex: /[T][\d]+/,token:"attribute"},
      {regex: /[L][\d]+/,token:"property"},
      
      {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i, token: "number"},
  
      {regex: /\/\/.*/, token: "comment"},

      {regex: /\/\*/, token: "comment", next: "comment"},
      {regex: /[-+\/*=<>!;]+/, token: "operator"},
      {regex: /[,]+/, token: "tag"},
      {regex: /[\[\(]/, indent: true},
      {regex: /[\]\)]/, dedent: true},
      {regex: /[a-zA-Z_$][\w$]*/, token: "variable"},
    ],
  
    comment: [
        {regex: /.*?\*\//, token: "comment", next: "start"},
        {regex: /.*/, token: "comment"}
      ],
    
      meta: {
        dontIndentStates: ["comment"],
        lineComment: "//"
      }
  });
  
  
  