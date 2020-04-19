CodeMirror.defineSimpleMode("modo", {
  
    start: [
      {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
      {regex: /'(?:[^\\]|\\.)*?(?:'|$)/, token: "string"},
  
      {regex: /(?:and|array|uses|begin|case|const|div|do|downto|else|end|for|function|if|in|label|mod|not|of|or|packed|procedure|program|record|repeat|set|then|to|type|until|var|while|with)\b/gi,
        token: "keyword"},      
  
      {regex: /true|false|nil|undefined/gi, token: "atom"},
    
      {regex: /(?:integer|real|string|char|word|boolean|record)\b/gi,token:"attribute"},

      {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i, token: "number"},
  
      {regex: /\(\*.*\*\)/, token: "comment"},
  
      {regex: /\{/, token: "comment", next: "comment"},
      {regex: /[-+\/*=<>!,;]+/, token: "operator"},
  
      {regex: /[\[\(]/, indent: true},
      {regex: /[\]\)]/, dedent: true},
      {regex: /[a-zA-Z$][\w$]*/, token: "variable"},
    ],
  
    comment: [
      {regex: /.*?}/, token: "comment", next: "start"},
      {regex: /.*/, token: "comment"}
    ],
  
    meta: {
      dontIndentStates: ["comment"],
      lineComment: "(*"
    }
  });
  
  
  