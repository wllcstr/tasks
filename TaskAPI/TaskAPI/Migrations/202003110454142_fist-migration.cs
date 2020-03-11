namespace TaskAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class fistmigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Tasks",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        title = c.String(),
                        status = c.Int(nullable: false),
                        desc = c.String(),
                        created = c.DateTime(),
                        modified = c.DateTime(),
                        finished = c.DateTime(),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Username = c.String(),
                        Password = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Users");
            DropTable("dbo.Tasks");
        }
    }
}
