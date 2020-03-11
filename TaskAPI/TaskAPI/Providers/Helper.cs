using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
namespace TaskAPI.Providers {
    public class Helper {
        /// <summary>
        /// "Critprografa a senha do cidadão"
        /// </summary>
        /// <param name="input">senha do cidadão</param>
        /// <returns>senha "criptografada"</returns>
        public static string GetHash(string input) {
            HashAlgorithm hashAlgorithm = new SHA256CryptoServiceProvider();
            byte[] byteValue = Encoding.UTF8.GetBytes(input);
            byte[] byteHash = hashAlgorithm.ComputeHash(byteValue);
            return Convert.ToBase64String(byteHash);
        }
    }
}