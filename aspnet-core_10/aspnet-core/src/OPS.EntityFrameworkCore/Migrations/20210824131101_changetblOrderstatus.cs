using Microsoft.EntityFrameworkCore.Migrations;

namespace OPS.Migrations
{
    public partial class changetblOrderstatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "OrdersStatus");

            migrationBuilder.AddColumn<int>(
                name: "DisplaySequence",
                table: "OrdersStatus",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisplaySequence",
                table: "OrdersStatus");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "OrdersStatus",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
