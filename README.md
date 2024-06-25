<h1 align="center">
   Quixo
</h1>
<p align="center">Modul Node.js yang ringan untuk mengambil data secara efisien dengan pendekatan sederhana.</p>
<p align="center">Modul ini dirancang untuk memudahkan pengguna berinteraksi dengan API atau mendownload file dari server dengan konfigurasi sederhana.</p>

## Fitur

- Pengambilan Data Sederhana: Mudah mengambil data dari sumber yang ditentukan menggunakan HTTP.
- Antarmuka Pengguna Intuitif: Antarmuka yang ramah pengguna memudahkan konfigurasi dan penggunaan tanpa memerlukan pengetahuan teknis yang mendalam.

## Konfigurasi

- `url`: URL endpoint yang ingin diakses.
- `method`: Methot HTTP yang digunakan (misalnya, `get`, `post`, `put`, `delete`, `patch`, `head`, `options`, `downloadFile`).

## Instalasi

npm:

```bash
npm install quixo
```

## Penggunaan

### Import Modul

```js
const quixo = require('quixo');
const path = require('path'); // impor modul path jika Anda ingin mendownload file
```

### Contoh Penggunaan Method Quixo

GET:

```js
// Contoh penggunaan methot GET
quixo
  .get('https://raw.githubusercontent.com/salmanpripender/foo/main/posts/1')
  .then((response) => {
    console.log('GET Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

POST:

```js
// Contoh penggunaan methot POST
quixo
  .post(
    'https://raw.githubusercontent.com/salmanpripender/foo/main/posts/',
    JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
    }),
    { 'Content-Type': 'application/json' }
  )
  .then((response) => {
    console.log('POST Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

PUT:

```js
// Contoh penggunaan methot PUT
quixo
  .put(
    'https://raw.githubusercontent.com/salmanpripender/foo/main/posts/1',
    JSON.stringify({
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1,
    }),
    { 'Content-Type': 'application/json' }
  )
  .then((response) => {
    console.log('PUT Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

DELETE:

```js
// Contoh penggunaan methot DELETE
quixo
  .delete('https://raw.githubusercontent.com/salmanpripender/foo/main/posts/1')
  .then((response) => {
    console.log('DELETE Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

PATCH:

```js
// Contoh penggunaan methot PATCH
quixo
  .patch(
    'https://raw.githubusercontent.com/salmanpripender/foo/main/posts/1',
    JSON.stringify({
      title: 'foo',
    }),
    { 'Content-Type': 'application/json' }
  )
  .then((response) => {
    console.log('PATCH Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

HEAD:

```js
// Contoh penggunaan methot HEAD
quixo
  .head('https://raw.githubusercontent.com/salmanpripender/foo/main/posts/1')
  .then((response) => {
    console.log('HEAD Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

OPTIONS:

```js
// Contoh penggunaan methot OPTIONS
quixo
  .options('https://raw.githubusercontent.com/salmanpripender/foo/main/posts/1')
  .then((response) => {
    console.log('OPTIONS Response:', response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

DOWNLOAD FILE:

```js
// Contoh penggunaan methot downloadFile tanpa menentukan nama file
quixo
  .downloadFile(
    'https://raw.githubusercontent.com/salmanpripender/foo/main/images/image.jpg',
    path.join(__dirname, 'downloads')
  )
  .then((filePath) => {
    console.log(`File downloaded to: ${filePath}`);
  })
  .catch((error) => {
    console.error('Download error:', error);
  });
```

```js
// Contoh penggunaan methot downloadFile dengan menentukan nama file
quixo
  .downloadFile(
    'https://raw.githubusercontent.com/salmanpripender/foo/main/images/image.jpg',
    path.join(__dirname, 'downloads'),
    'my_custom_name.jpg'
  )
  .then((filePath) => {
    console.log(`File downloaded to: ${filePath}`);
  })
  .catch((error) => {
    console.error('Download error:', error);
  });
```

## Kontribusi

Anda bisa berkontribusi dengan mengirimkan pull request untuk perbaikan bug, peningkatan fitur, atau dokumentasi tambahan.

## Lisensi

[MIT](LICENSE)
