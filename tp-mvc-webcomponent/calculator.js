class WCView extends HTMLElement
{
	constructor(modelInstance)
	{
		super();

		this._innerController = new WCController(this, modelInstance);

        this._display = document.createElement('input');
        this._display.setAttribute('class', 'displayResult');
        this._display.setAttribute('id', 'display');// IDs NO UTILIZADOS PARA NADA (SON PARA POSIBLE EXTENCION).
        this._display.setAttribute('type', 'text');
        this._display.setAttribute('value', '');
        this._display.setAttribute('disabled', '');

        this._button0 = document.createElement('button');
        this._button0.setAttribute('id', 'button0'); 
        this._button0.classList.add('numberButton');
        this._button0.textContent = '0';

        this._button1 = document.createElement('button');
        this._button1.setAttribute('id', 'button1');
        this._button1.classList.add('numberButton');
        this._button1.textContent = '1';

        this._button2 = document.createElement('button');
        this._button2.setAttribute('id', 'button2');
        this._button2.classList.add('numberButton');
        this._button2.textContent = '2';

        this._button3 = document.createElement('button');
        this._button3.setAttribute('id', 'button3');
        this._button3.classList.add('numberButton');
        this._button3.textContent = '3';

        this._button4 = document.createElement('button');
        this._button4.setAttribute('id', 'button4');
        this._button4.classList.add('numberButton');
        this._button4.textContent = '4';

        this._button5 = document.createElement('button');
        this._button5.setAttribute('id', 'button5');
        this._button5.classList.add('numberButton');
        this._button5.textContent = '5';

        this._button6 = document.createElement('button');
        this._button6.setAttribute('id', 'button6');
        this._button6.classList.add('numberButton');
        this._button6.textContent = '6';

        this._button7 = document.createElement('button');
        this._button7.setAttribute('id', 'button7');
        this._button7.classList.add('numberButton');
        this._button7.textContent = '7';

        this._button8 = document.createElement('button');
        this._button8.setAttribute('id', 'button8');
        this._button8.classList.add('numberButton');
        this._button8.textContent = '8';

        this._button9 = document.createElement('button');
        this._button9.setAttribute('id', 'button9');
        this._button9.classList.add('numberButton');
        this._button9.textContent = '9';

        this._buttonPlus = document.createElement('button');
        this._buttonPlus.setAttribute('id', 'buttonPlus');
        this._buttonPlus.classList.add('operatorButton');
        this._buttonPlus.textContent = '+';

        this._buttonMinus = document.createElement('button');
        this._buttonMinus.setAttribute('id', '-');
        this._buttonMinus.classList.add('operatorButton');
        this._buttonMinus.textContent = '-';

        this._buttonProduct = document.createElement('button');
        this._buttonProduct.setAttribute('id', 'buttonProduct');
        this._buttonProduct.classList.add('operatorButton');
        this._buttonProduct.textContent = 'x';

        this._buttonDivision = document.createElement('button');
        this._buttonDivision.setAttribute('id', 'buttonDivision');
        this._buttonDivision.classList.add('operatorButton');
        this._buttonDivision.textContent = '/';

		this._buttonDecimalPoint = document.createElement('button');
        this._buttonDecimalPoint.setAttribute('id', 'buttonDecimal');
        this._buttonDecimalPoint.classList.add('operatorButton');
        this._buttonDecimalPoint.textContent = '.';


        this._buttonClear = document.createElement('button');
        this._buttonClear.setAttribute('id', 'buttonClear');
        this._buttonClear.classList.add('clearButton');
        this._buttonClear.textContent = 'BORRAR';

        this._buttonCalculate = document.createElement('button');
        this._buttonCalculate.setAttribute('id', 'buttonCalculate');
        this._buttonCalculate.classList.add('calculateButton');
        this._buttonCalculate.textContent = '=';

		// Agregar elementos al WebComponent
        this.appendChild(this._display);
        this.appendChild(this._button0);
        this.appendChild(this._button1);
        this.appendChild(this._button2);
        this.appendChild(this._button3);
        this.appendChild(this._button4);
        this.appendChild(this._button5);
        this.appendChild(this._button6);
        this.appendChild(this._button7);
        this.appendChild(this._button8);
        this.appendChild(this._button9);
        this.appendChild(this._buttonPlus);
        this.appendChild(this._buttonMinus);
        this.appendChild(this._buttonProduct);
        this.appendChild(this._buttonDivision);
        this.appendChild(this._buttonDecimalPoint);
        this.appendChild(this._buttonClear);
        this.appendChild(this._buttonCalculate);
	}
	
	onButtonClick(buttonInputData)
	{
		this._innerController.onButtonClick(buttonInputData);
	}
	connectedCallback()
	{
		this._button0.onclick = () => this.onButtonClick('0');
		this._button1.onclick = () => this.onButtonClick('1');
		this._button2.onclick = () => this.onButtonClick('2');
		this._button3.onclick = () => this.onButtonClick('3');
		this._button4.onclick = () => this.onButtonClick('4');
		this._button5.onclick = () => this.onButtonClick('5');
		this._button6.onclick = () => this.onButtonClick('6');
		this._button7.onclick = () => this.onButtonClick('7');
		this._button8.onclick = () => this.onButtonClick('8');
		this._button9.onclick = () => this.onButtonClick('9');
		this._buttonPlus.onclick = () => this.onButtonClick('+');
		this._buttonMinus.onclick = () => this.onButtonClick('-');
		this._buttonProduct.onclick = () => this.onButtonClick('*');
		this._buttonDivision.onclick = () => this.onButtonClick('/');	
		this._buttonDecimalPoint.onclick = () => this.onButtonClick('.');	
		this._buttonClear.onclick = () => this.onButtonClick('clear');
		this._buttonCalculate.onclick = () => this.onButtonClick('=');
	}

	disconnectedCallback()
	{

	}

	adoptedCallback()
	{

	}

	attributeChangedCallback(oldValue, newValue)
	{

	}

	static observableAttributes()
	{
		return [];
	}
}
customElements.define('wc-view', WCView);

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

// HACER LA CUENTA CUANDO SE LE DA AL IGUAL
class WCModel
{
	constructor() {}

	calculate( ecuationAsString )
	{
		let response = eval(ecuationAsString);
		return response;
	}
}

function main()
{
	let model = new WCModel();
	let view = new WCView(model);

	document.body.appendChild(view);
}

window.onload = main;