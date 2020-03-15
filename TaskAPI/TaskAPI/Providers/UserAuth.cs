using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskAPI.Models;

namespace TaskAPI.Providers {
    public class UserAuth {
        public static bool Login(string login, string password) {
            using (TaskListDBContext db = new TaskListDBContext()) {
                string hashpw = Helper.GetHash(password);
                login = login.ToLower();
                return db.Users.Any(user => user.Username == login && user.Password == hashpw);
            }
        }
    }
}