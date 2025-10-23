import * as crypto from 'crypto-js';

const secret = process.env.CIPHER_KEY || 'default_secret_key';

export default {
    encrypt: (str) : string => {
        if (typeof str !== 'string' || str == '') {
            return str;
        } 
        return crypto.AES.encrypt(str, secret).toString();
    },
    decrypt: (str) : string => {
        if (typeof str !== 'string' || str == '') {
            return str;
        }
        return crypto.AES.decrypt(str, secret).toString(crypto.enc.Utf8);
    },
}