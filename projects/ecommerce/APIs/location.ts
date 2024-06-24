import countries  from './../fakedata/countries.json'

interface CountryData {
    [key: string]: string;
  }

  export const getCountries = async (): Promise<CountryData> => { 
    try {
        console.log('api countries call')
        const arrayDePares = Object.entries(countries);
            arrayDePares.sort((a, b) => a[1].localeCompare(b[1]));
            const sorted = Object.fromEntries(arrayDePares);
        return sorted
    } catch (error:any) {
        console.error('Error fetching country data:', error);
        throw error; 
    }
};