using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskAPI.Models {
    public class Tasks {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public int Status { get; set; }
        public string Desc { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }
        public DateTime? Finished { get; set; }

    }
}