using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TaskAPI.Models;
using TaskAPI.Providers;

namespace TaskAPI.Controllers
{
    public class UsersController : ApiController
    {
        private TaskListDBContext db = new TaskListDBContext();

        // POST: api/Users
        /// <summary>
        /// Cadastro de novo usuário
        /// </summary>
        /// <param name="users">Objeto do modelo Users</param>
        /// <returns>httpresult</returns>
        [ResponseType(typeof(Users))]
        public IHttpActionResult PostUsers(Users user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // passa a hashzinha na senha
            user.Password = Helper.GetHash(user.Password);
            user.Username = user.Username.ToLower();

            // ver primeiro se nao tem usuário registrado com o mesmo login
            if (UsersExists(user.Username))
                return StatusCode(HttpStatusCode.Conflict);

            db.Users.Add(user);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        // Mudando aqui, vamos verificar se o cara existe pelo username
        private bool UsersExists(string username)
        {
            return db.Users.Count(e => e.Username == username) > 0;
        }
    }
}