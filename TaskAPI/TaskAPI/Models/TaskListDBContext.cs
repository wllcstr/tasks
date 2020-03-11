using System.Data.Entity;

namespace TaskAPI.Models {
    public class TaskListDBContext : DbContext {
        public TaskListDBContext() : base("TaskListDBContext") { }

        public virtual DbSet<Users> Users { get; set; }

        public System.Data.Entity.DbSet<TaskAPI.Models.Tasks> Tasks { get; set; }
    }
}