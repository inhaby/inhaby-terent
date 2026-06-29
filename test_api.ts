import http from 'http';

function testAPI() {
  const url = 'http://localhost:3000/api/properties?city=Bengaluru&area=HSR+Layout&category=all';
  console.log('Fetching:', url);
  
  http.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('STATUS:', res.statusCode);
      console.log('HEADERS:', res.headers);
      try {
        const json = JSON.parse(data);
        console.log('TOTAL MATCHES:', json.total);
        console.log('ITEMS COUNT:', json.items?.length);
        if (json.items && json.items.length > 0) {
          console.log('SAMPLE ITEM RAW:', JSON.stringify(json.items[0], null, 2));
        } else {
          console.log('RESPONSE:', data);
        }
      } catch (e: any) {
        console.error('PARSE ERROR:', e.message);
        console.log('RAW DATA:', data);
      }
    });
  }).on('error', (err) => {
    console.error('FETCH ERROR:', err.message);
  });
}

testAPI();
