class WCController
{
	constructor(viewInstance, modelInstance)
	{		
		this.innerView = viewInstance;
		this.innerModel = modelInstance;
		this.lastCharacterIsASymbol = true; // Se inicializa como true para que no se puedan ingresar simbolos en un principio
	}
	//FORMATEAR EL DISPLAY
	onButtonClick(buttonInputData)
	{
		// Evaluar si es un numero
		for (let i = 0; i < 10; i++) {
			if (buttonInputData == i.toString()) 
			{
				this.innerView._display.value += i.toString();
				this.lastCharacterIsASymbol = false;
				return;	
			}
		}
		// Evaluar si es un simbolo a menos que no haya caracteres escritos en el display:
		if (this.lastCharacterIsASymbol && this.innerView._display.value.length != 0)
		{
			//Borrar el ultimo caracter para evitar error.
			this.innerView._display.value = this.innerView._display.value.slice(0, -1);
		}
		
		// ENVIAR AL MODELO CUANDO SE OPRIME EL IGUAL
		if (buttonInputData == '=')
		{
			this.innerView._display.value = this.innerModel.calculate(this.innerView._display.value);
		}
		else if (buttonInputData == 'clear')
		{
			this.innerView._display.value = '';
		}
		else if (this.innerView._display.value.length != 0)
		{
			// Si es otro simbolo se lo agrega a la ecuacion
			this.innerView._display.value += buttonInputData;
			this.lastCharacterIsASymbol = true;
		}
	}

}