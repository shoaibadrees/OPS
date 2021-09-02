using Microsoft.EntityFrameworkCore.Migrations;

namespace OPS.Migrations
{
    public partial class addEmployeeTypeCol_In_EmployeeTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmployeeType",
                table: "AddEmployee",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmployeeType",
                table: "AddEmployee");
        }
    }
}
