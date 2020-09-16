export default class Servise{

    getResource = async (quantity) => {
        const _apiBase = `http://www.filltext.com/?rows=${quantity}&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
        const result = await fetch(_apiBase);

        if (!result.ok) {throw new Error(`Could not fetch ${_apiBase}, status: ${result.status}`);}

        return await result.json();
    }

}