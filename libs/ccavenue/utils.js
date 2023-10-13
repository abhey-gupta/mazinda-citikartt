// utils.js
import crypto from 'crypto';
import qs from 'qs';

/* Payment Gateway Encryption */
export const node_encrypt_ccavenue_request = (payload, key) => {
  const method = 'aes-256-gcm';
  const initVector = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(method, key, initVector);
  let encrypted = cipher.update(payload, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');
  return initVector.toString('hex') + encrypted + tag;
};

/* Payment Gateway Decryption */
export const node_decrypt_ccavenue_response = (encResp, key) => {
  const method = 'aes-256-gcm';
  const encryptedTextBuffer = Buffer.from(encResp, 'hex');
  const iv_len = 16;
  const tag_length = 16;
  const iv = encryptedTextBuffer.slice(0, iv_len);
  const tag = encryptedTextBuffer.slice(-tag_length);
  const ciphertext = encryptedTextBuffer.slice(iv_len, -tag_length);
  const decipher = crypto.createDecipheriv(method, key, iv);
  decipher.setAuthTag(tag);
  let decrypted = decipher.update(ciphertext, 'binary', 'utf8');
  decrypted += decipher.final('utf8');
  return qs.parse(decrypted);
};
