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

namespace TaskAPI.Controllers
{
    [Authorize]
    public class TasksController : ApiController
    {
        private TaskListDBContext db = new TaskListDBContext();

        // GET: api/Tasks
        public IQueryable<Tasks> GetTasks()
        {
            return db.Tasks;
        }

        // GET: api/Tasks/5
        [ResponseType(typeof(Tasks))]
        public IHttpActionResult GetTasks(int id)
        {
            Tasks tasks = db.Tasks.Find(id);
            if (tasks == null)
            {
                return NotFound();
            }

            return Ok(tasks);
        }

        // PUT: api/Tasks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTasks(int id, Tasks task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != task.id)
            {
                return BadRequest();
            }
            // altera a data da modificação
            task.modified = DateTime.Now;

            db.Entry(task).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TasksExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Tasks
        [ResponseType(typeof(Tasks))]
        public IHttpActionResult PostTasks(Tasks task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // data da modificação
            task.modified = DateTime.Now;
            // data da inclusão
            task.created = DateTime.Now;

            db.Tasks.Add(task);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = task.id }, task);
        }

        // DELETE: api/Tasks/5
        [ResponseType(typeof(Tasks))]
        public IHttpActionResult DeleteTasks(int id)
        {
            Tasks tasks = db.Tasks.Find(id);
            if (tasks == null)
            {
                return NotFound();
            }

            db.Tasks.Remove(tasks);
            db.SaveChanges();

            return Ok(tasks);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TasksExists(int id)
        {
            return db.Tasks.Count(e => e.id == id) > 0;
        }
    }
}