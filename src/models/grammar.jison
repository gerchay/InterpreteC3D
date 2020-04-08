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
	const GoTo = require('./GoTo');
	const Label = require('./Label');
	const If = require('./If');
	const Call = require('./Call');
	const Begin = require('./Begin');
	const EndMetodo = require('./EndMetodo');
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
		$$[$2.linea] = $2;

		if($2.instructions){
			for(let i = 0; i < $2.instructions.length; i++){
				if($2.instructions[i])
					$$[$2.instructions[i].linea] = $2.instructions[i];
			}
			$$[$2.end] = new EndMetodo.default($2.end);
		}
	}
	| instruccion					
	{ 
		$$ = new Array();
		$$[$1.linea] = $1;
		if($1.instructions){
			for(let i = 0; i < $1.instructions.length; i++){
				if($1.instructions[i])
					$$[$1.instructions[i].linea] = $1.instructions[i];
			}
			$$[$1.end] = new EndMetodo.default($1.end);
		}
	}
;

instruccion
	: Salto				    
	{ 
		$$ = $1;
	}
	| SaltoCondicional	    
	{ 
		$$ = $1;
	}
	| Asignacion			
	{ 
		$$ = $1;
	}
	| Function              
	{
		$$ = $1;
	}
	| LlamadaMetodo			
	{ 
		$$ = $1;
	}
	| Print					
	{ 
		$$ = $1; 
	}
	| Etiqueta TWO_POINTS	
	{ 
		$$ = new Label.default($1,@1.first_line);
	}
	| COM					{ }
;

Salto
	: GO ETIQUETA SEMI
    {
		$$ = new GoTo.default( Number.parseInt($2.replace('L','').replace('l','')), @1.first_line);
	}
;

SaltoCondicional
	: IF L_PARENT Term OptionIf Term R_PARENT GO ETIQUETA SEMI	
    {
		$$ = new If.default($3,$5,$4,Number.parseInt($8.replace('L','').replace('l','')),@1.first_line);
	}
;

OptionIf
    : EQU 
	{
		$$ = 0;
	}
    | N_EQU 
	{
		$$ = 1;
	}
    | LSS 
	{
		$$ = 2;
	}
    | LSS_EQ 
	{
		$$ = 3;
	}
    | GRT 
	{
		$$ = 4;
	}
    | GRT_EQ 
	{
		$$ = 5;
	}
;

Asignacion
	: Term ASG Term OptionAsig Term SEMI
	{
		$$ = new Asignacion.default($4,$3,$5,$1,@1.first_line);
	}
	| Term ASG Term SEMI 
	{
		$$ = new Asignacion.default(0,$3,null,$1,@1.first_line);
	}
	| Term ASG STACK L_BRACKET Term R_BRACKET SEMI
	{
		$$ = new AccesoHS.default($1,$5,0,@1.first_line);
	}
	| Term ASG HEAP L_BRACKET Term R_BRACKET SEMI
	{
		$$ = new AccesoHS.default($1,$5,1,@1.first_line);
	}
	| STACK L_BRACKET Term R_BRACKET ASG Term SEMI
	{
		$$ = new AccesoHS.default($3,$6,2,@1.first_line);
	}
	| HEAP L_BRACKET Term R_BRACKET ASG Term SEMI
	{
		$$ = new AccesoHS.default($3,$6,3,@1.first_line);
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
		$$ = new Call.default($2,@1.first_line);
	}
;

Print
	: PRINT L_PARENT VALCHAR COMMA Term R_PARENT SEMI
	{
		$$ = new Print.default(2,$5,@1.first_line);
	}
	| PRINT L_PARENT VALDEC COMMA Term R_PARENT SEMI		
	{
		$$ = new Print.default(1,$5,@1.first_line);
	}
	| PRINT L_PARENT VALNUM COMMA Term R_PARENT SEMI		
	{
		$$ = new Print.default(0,$5,@1.first_line);
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
		interprete.label[$3.replace('L','').replace('l') - 0] = @3.first_line;
		$$ = $1;
		$$.push(@3.first_line);
	}
	| ETIQUETA 
	{
		interprete.label[$1.replace('L','').replace('l') - 0] = @1.first_line;
		$$ = [@1.first_line];
	}
;

Function
	: VOID ID L_PARENT R_PARENT L_BRACE instrucciones R_BRACE
	{
		interprete.functions.set($2,@1.first_line);
		$$ = new Begin.default($2,@7.first_line,$6,@1.first_line);
	}
;