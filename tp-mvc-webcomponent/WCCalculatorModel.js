class WCModel
{
	constructor() {}

	calculate( ecuationAsString )
	{
		let response = eval(ecuationAsString);
		return response;
	}
}