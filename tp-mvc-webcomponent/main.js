

function main()
{
	let model = new WCModel();
	let view = new WCView(model);

	document.body.appendChild(view);
}

window.onload = main;