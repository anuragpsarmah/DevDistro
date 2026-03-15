import crypto from "crypto";

const encrypt = (plainText: string, secretKey: string) => {
  const keyBuffer = Buffer.from(secretKey, "hex");
  const randomIv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", keyBuffer, randomIv);
  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");
  return `v2:${randomIv.toString("hex")}:${authTag}:${encrypted}`;
};

const decrypt = (encryptedText: string, secretKey: string) => {
  const keyBuffer = Buffer.from(secretKey, "hex");
  const [, ivHex, authTagHex, cipherHex] = encryptedText.split(":");
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    keyBuffer,
    Buffer.from(ivHex, "hex")
  );
  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));
  let decrypted = decipher.update(cipherHex, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

export { encrypt, decrypt };
