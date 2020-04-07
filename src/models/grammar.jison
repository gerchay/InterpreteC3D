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

"%c"					return 'VALCHAR';
"%e"					return 'VALNUM';
"%d"					return 'VALDEC';

"%"						return 'MOD';
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
	const Print = require('./Print');
	const Literal = require('./Literal');
	const Asignacion = require('./Asignacion');
	const AccesoHS = require('./AccesoHS');
	const principal = require('./principal');
	var interprete = new principal.default();
%}

%start init
%%

init
	: instrucciones EOF 
    {
		interprete.instrucciones = $1;
		return interprete;
	}
;

instrucciones
	: instrucciones instruccion 	
	{  
		$$ = $1;
		$$.push($2);
	}
	| instruccion					
	{  
		$$ = new Array();
		$$.push($1);
	}
;

instruccion
	: Salto				    { }
	| SaltoCondicional	    { }
	| Asignacion			
	{ 
		$$ = $1;
	}
	| Function              { }
	| LlamadaMetodo			{ }
	| Print					
	{ 
		$$ = $1; 
	}
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
		$$ = new Asignacion.default($4,$3,$5,$1);
	}
	| Term ASG Term SEMI 
	{
		$$ = new Asignacion.default(0,$3,null,$1);
	}
	| Term ASG STACK L_BRACKET Term R_BRACKET SEMI
	{
		$$ = new AccesoHS.default($1,$5,0);
	}
	| Term ASG HEAP L_BRACKET Term R_BRACKET SEMI
	{
		$$ = new AccesoHS.default($1,$5,1);
	}
	| STACK L_BRACKET Term R_BRACKET ASG Term SEMI
	{
		$$ = new AccesoHS.default($3,$6,2);
	}
	| HEAP L_BRACKET Term R_BRACKET ASG Term SEMI
	{
		$$ = new AccesoHS.default($3,$6,3);
	}
;

OptionAsig
	: PLS 
	{
		$$ = 1;
	}
	| MINUS
	{
		$$ = 2;
	}
	| TMS
	{
		$$ = 3;
	}
	| DIV
	{
		$$ = 4;
	}
	| MOD
	{
		$$ = 5;
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
		$$ = new Print.default(2,$5);
	}
	| PRINT L_PARENT VALDEC COMMA Term R_PARENT SEMI		
	{
		$$ = new Print.default(1,$5);
	}
	| PRINT L_PARENT VALNUM COMMA Term R_PARENT SEMI		
	{
		$$ = new Print.default(0,$5);
	}
;

Term
	:TEMPORAL
	{
		$$ = new Literal.default(1,Number.parseInt($1.replace('T','').replace('t','')));
	}
	|PTR_HEAP			
	{
		$$ = new Literal.default(3,0);
	}
	|PTR_STACK			
	{
		$$ = new Literal.default(2,0);
	}
	|DECIMAL				
	{
		$$ = new Literal.default(0,Number.parseFloat($1));
	}
	|ENTERO					
	{
		$$ = new Literal.default(0,Number.parseInt($1));
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