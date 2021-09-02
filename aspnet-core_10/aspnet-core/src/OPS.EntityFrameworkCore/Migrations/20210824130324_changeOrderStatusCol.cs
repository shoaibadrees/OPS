using Microsoft.EntityFrameworkCore.Migrations;

namespace OPS.Migrations
{
    public partial class changeOrderStatusCol : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "description",
                table: "OrdersStatus",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "OrdersStatus",
                newName: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "OrdersStatus",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "OrdersStatus",
                newName: "Title");
        }
    }
}
