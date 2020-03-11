using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskAPI.Models {
    public class Tasks {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public string title { get; set; }
        public int status { get; set; }
        public string desc { get; set; }
        public DateTime? created { get; set; }
        public DateTime? modified { get; set; }
        public DateTime? finished { get; set; }

    }
}