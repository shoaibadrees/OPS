using Microsoft.EntityFrameworkCore.Migrations;

namespace OPS.Migrations
{
    public partial class AddColumnIn_OrderDetailTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ItemUnitPrice",
                table: "OrdersDetails",
                newName: "SalePrice");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "OrdersDetails",
                type: "nvarchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "OrdersDetails",
                type: "nvarchar(255)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "OrdersDetails");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "OrdersDetails");

            migrationBuilder.RenameColumn(
                name: "SalePrice",
                table: "OrdersDetails",
                newName: "ItemUnitPrice");
        }
    }
}
