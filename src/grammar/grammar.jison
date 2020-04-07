/**
 * Ejemplo Intérprete Sencillo con Jison utilizando Nodejs en Ubuntu
 */

/* Definición Léxica */
%lex

%options case-insensitive

%%
\s+											// se ignoran espacios en blanco
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas
"//".*					return 'COM';		// comentario simple línea

"=="					return 'EQU';
"!="					return 'N_EQU';
">"					    return 'GRT';
"<"					    return 'LSS';
">="					return 'GRT_EQ';
"<="					return 'LSS_EQ';

"+"						return 'PLS';
"*"						return 'TMS';
"/"						return 'DIV';
"%"						return 'MOD';
","						return 'COMMA';
":"						return 'TWO_POINTS';
";"						return 'SEMI';
"("						return 'L_PARENT';
")"						return 'R_PARENT';
"="						return 'ASG';
"{"						return 'L_BRACE';
"}"						return 'R_BRACE';
"["						return 'L_BRACKET';
"]"						return 'R_BRACKET';


"goto"					return 'GO';
"void"                  return "VOID";
"if"                    return "IF";

"call"					return 'CALL';
"print"					return 'PRINT';

"stack"					return 'STACK';
"P"						return 'PTR_STACK'

"heap"					return 'HEAP';
"H"						return 'PTR_HEAP';

"%c"					return 'PRINTCHR';
"%e"					return 'PRINTNUM';
"%d"					return 'PRINTDEC';

"-"?[0-9]+("."[0-9]+)?\b  	return 'DECIMAL';
"-"?[0-9]+\b				return 'ENTERO';
"T"[0-9]+				    return 'TEMPORAL';
"L"[0-9]+				    return 'ETIQUETA';
([a-zA-Z_])[a-zA-Z0-9_]*	return 'ID';
"-"						    return 'MINUS';

<<EOF>>				return 'EOF';
.	{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex


%{

%}

%start init
%%

init
	: instrucciones EOF 
    {
	}
;

instrucciones
	: instrucciones instruccion 	
	{  
	}
	| instruccion					
	{  
	}
;

instruccion
	: Salto				    { }
	| SaltoCondicional	    { }
	| Asignacion			{ }
	| Function              { }
	| LlamadaMetodo			{ }
	| Print					{ }
	| Etiqueta TWO_POINTS	{ }
	| COM					{ }
;

Salto
	: GO ETIQUETA SEMI
    {
	}
;

SaltoCondicional
	: IF L_PARENT Term OptionIf Term R_PARENT GO ETIQUETA SEMI	
    {
	}
;

OptionIf
    : EQU {}
    | N_EQU {}
    | LSS {}
    | LSS_EQ {}
    | GRT {}
    | GRT_EQ {}
;

Asignacion
	: Term ASG Term OptionAsig Term SEMI
	{
	}
	| Term ASG Term SEMI 
	{
	}
	| Term ASG STACK L_BRACKET Term R_BRACKET SEMI
	{
	}
	| Term ASG HEAP L_BRACKET Term R_BRACKET SEMI
	{
	}
	| STACK L_BRACKET Term R_BRACKET ASG Term SEMI
	{
	}
	| HEAP L_BRACKET Term R_BRACKET ASG Term SEMI
	{
	}
;

OptionAsig
	: PLS 
	{
	}
	| MINUS
	{
	}
	| TMS
	{
	}
	| DIV
	{
	}
	| MOD
	{
	}
;

LlamadaMetodo
	: CALL ID L_PARENT R_PARENT SEMI
	{
	}
;

Print
	: PRINT L_PARENT VALCHAR COMMA Term R_PARENT SEMI
	{
	}
	| PRINT L_PARENT VALDEC COMMA Term R_PARENT SEMI		
	{
	}
	| PRINT L_PARENT VALNUM COMMA Term R_PARENT SEMI		
	{
	}
;

Term
	:TEMPORAL
	{
	}
	|PTR_HEAP			
	{
	}
	|PTR_STACK			
	{
	}
	|DECIMAL				
	{
	}
	|ENTERO					
	{
	}
;

Etiqueta
	: Etiqueta COMMA ETIQUETA 
	{
	}
	| ETIQUETA 
	{
	}
;

Function
	: VOID ID L_PARENT R_PARENT L_BRACE instrucciones R_BRACE 
	{
	}
;