export default class Servise{
    state = {
        _apiBase: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    }

    getResource = async () => {
        const {_apiBase} = this.state;
        const result = await fetch(_apiBase);

        if (!result.ok) {throw new Error(`Could not fetch ${_apiBase}, status: ${result.status}`);}

        return await result.json();
    }
}