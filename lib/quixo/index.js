const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const path = require('path');

/**
 * Kelas Quixo yang mendukung berbagai metode HTTP dan pengunduhan file.
 */
class Quixo {
  constructor() {}

  /**
   * Melakukan permintaan HTTP.
   * @param {Object} options - Opsi permintaan termasuk URL, metode, dan header.
   * @param {string|null} postData - Data opsional yang dikirimkan dengan permintaan POST.
   * @returns {Promise<Object>} - Promise yang resolve ke objek respons dengan status, header, dan data.
   */
  request(options, postData = null) {
    return new Promise((resolve, reject) => {
      const parsedUrl = url.parse(options.url);
      const isHttps = parsedUrl.protocol === 'https:';
      const lib = isHttps ? https : http;

      const reqOptions = {
        ...parsedUrl,
        method: options.method || 'GET',
        headers: options.headers || {},
      };

      const req = lib.request(reqOptions, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: data,
          });
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      if (postData) {
        req.write(postData);
      }

      req.end();
    });
  }

  /**
   * Melakukan permintaan HTTP GET.
   * @param {string} url - URL untuk melakukan permintaan GET.
   * @param {Object} headers - Header opsional yang ingin disertakan dalam permintaan.
   * @returns {Promise<Object>} - Promise yang resolve ke objek respons dengan status, header, dan data.
   */
  get(url, headers = {}) {
    return this.request({ url, method: 'GET', headers });
  }

  /**
   * Melakukan permintaan HTTP POST.
   * @param {string} url - URL untuk melakukan permintaan POST.
   * @param {Object|string} data - Data yang akan dikirimkan dalam tubuh permintaan.
   * @param {Object} headers - Header opsional yang ingin disertakan dalam permintaan.
   * @returns {Promise<Object>} - Promise yang resolve ke objek respons dengan status, header, dan data.
   */
  post(url, data, headers = {}) {
    return this.request({ url, method: 'POST', headers }, data);
  }

  /**
   * Melakukan permintaan HTTP PUT.
   * @param {string} url - URL untuk melakukan permintaan PUT.
   * @param {Object|string} data - Data yang akan dikirimkan dalam tubuh permintaan.
   * @param {Object} headers - Header opsional yang ingin disertakan dalam permintaan.
   * @returns {Promise<Object>} - Promise yang resolve ke objek respons dengan status, header, dan data.
   */
  put(url, data, headers = {}) {
    return this.request({ url, method: 'PUT', headers }, data);
  }

  /**
   * Melakukan permintaan HTTP DELETE.
   * @param {string} url - URL untuk melakukan permintaan DELETE.
   * @param {Object} headers - Header opsional yang ingin disertakan dalam permintaan.
   * @returns {Promise<Object>} - Promise yang resolve ke objek respons dengan status, header, dan data.
   */
  delete(url, headers = {}) {
    return this.request({ url, method: 'DELETE', headers });
  }

  /**
   * Melakukan permintaan HTTP PATCH.
   * @param {string} url - URL untuk melakukan permintaan PATCH.
   * @param {Object|string} data - Data yang akan dikirimkan dalam tubuh permintaan.
   * @param {Object} headers - Header opsional yang ingin disertakan dalam permintaan.
   * @returns {Promise<Object>} - Promise yang resolve ke objek respons dengan status, header, dan data.
   */
  patch(url, data, headers = {}) {
    return this.request({ url, method: 'PATCH', headers }, data);
  }

  /**
   * Melakukan permintaan HTTP HEAD.
   * @param {string} url - URL untuk melakukan permintaan HEAD.
   * @param {Object} headers - Header opsional yang ingin disertakan dalam permintaan.
   * @returns {Promise<Object>} - Promise yang resolve ke objek respons dengan status, header, dan data.
   */
  head(url, headers = {}) {
    return this.request({ url, method: 'HEAD', headers });
  }

  /**
   * Melakukan permintaan HTTP OPTIONS.
   * @param {string} url - URL untuk melakukan permintaan OPTIONS.
   * @param {Object} headers - Header opsional yang ingin disertakan dalam permintaan.
   * @returns {Promise<Object>} - Promise yang resolve ke objek respons dengan status, header, dan data.
   */
  options(url, headers = {}) {
    return this.request({ url, method: 'OPTIONS', headers });
  }

  /**
   * Mengunduh file dari URL yang diberikan dan menyimpannya ke direktori tujuan yang ditentukan.
   * @param {string} fileUrl - URL file yang akan diunduh.
   * @param {string} destDir - Direktori tujuan untuk menyimpan file yang diunduh.
   * @param {string|null} filename - Nama file opsional untuk file yang diunduh.
   * @returns {Promise<string>} - Promise yang resolve ke path lengkap dari file yang diunduh.
   */
  downloadFile(fileUrl, destDir, filename = null) {
    return new Promise((resolve, reject) => {
      const parsedUrl = url.parse(fileUrl);
      const isHttps = parsedUrl.protocol === 'https:';
      const lib = isHttps ? https : http;

      // Gunakan nama file yang disediakan atau ekstrak nama file dari URL
      const finalFilename = filename || path.basename(parsedUrl.pathname);

      // Gabungkan direktori tujuan dengan nama file
      const dest = path.join(destDir, finalFilename);

      const req = lib.get(parsedUrl, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Gagal mengunduh '${fileUrl}' (${res.statusCode})`));
          return;
        }

        // Pastikan direktori tujuan ada
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        const file = fs.createWriteStream(dest);
        res.pipe(file);

        file.on('finish', () => {
          file.close(() => resolve(dest));
        });

        file.on('error', (err) => {
          fs.unlink(dest, () => reject(err));
        });
      });

      req.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    });
  }
}

const quixo = new Quixo();
module.exports = quixo;
